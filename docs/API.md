# VasuPrint — API & Server Actions

Public pages read the catalog directly in Server Components (no HTTP API). HTTP endpoints exist only where a browser must send or receive raw data. Admin mutations are Server Actions.

Conventions for all Route Handlers:

- JSON responses use `Content-Type: application/json; charset=utf-8`.
- Errors: `{ "error": { "code": "<UPPER_SNAKE>", "message": "<human readable>", "fields"?: { "<field>": "<message>" } } }`.
- State-changing requests require an `Origin` header equal to `SITE_URL` (or `http://localhost:3000` in dev); otherwise `403 ORIGIN_MISMATCH`.
- Rate-limited responses: `429 RATE_LIMITED` with `Retry-After` seconds.
- All handlers run on the Node.js runtime (`export const runtime = 'nodejs'`).

---

## 1. Public endpoints

### 1.1 `POST /api/uploads` (P2)

Upload **one** artwork file. Called once per file by the quote form (XHR for progress events).

|               |                                                                                  |
| ------------- | -------------------------------------------------------------------------------- |
| Content-Type  | `multipart/form-data` with a single part named `file`                            |
| Max body      | 100 MB + 1 MB overhead (Nginx `client_max_body_size 101m` on this location only) |
| Rate limit    | 10 uploads / hour / IP; 2 concurrent per IP                                      |
| Disabled when | `QUOTE_BACKEND=off` → `404`                                                      |

Processing: stream with busboy (`limits: { files: 1, fileSize: 104857600, fields: 0 }`) → reject on limit → sniff first 4 KB → write to `tmp/` while hashing → save `Upload{status:'pending'}`.

**201 Created**

```json
{
  "uploadId": "1b5e8f0e-3c0a-4c47-9d2f-0f6a0b8e2a11",
  "name": "carton-dieline-v3.cdr",
  "bytes": 48213344,
  "ext": "cdr"
}
```

| Status | code                  | When                                                         |
| ------ | --------------------- | ------------------------------------------------------------ |
| 400    | `NO_FILE`             | no `file` part                                               |
| 400    | `TOO_MANY_PARTS`      | more than one file or extra fields                           |
| 413    | `FILE_TOO_LARGE`      | > 100 MB (stream aborted, temp file removed)                 |
| 415    | `UNSUPPORTED_TYPE`    | extension not allowed, or signature does not match extension |
| 429    | `RATE_LIMITED`        |                                                              |
| 503    | `STORAGE_UNAVAILABLE` | disk write failed / disk > 95 %                              |

### 1.2 `DELETE /api/uploads/:uploadId` (P2)

Remove a **pending** upload the buyer discarded before submitting.

- Only allowed if the upload is `pending` and its `ipHash` matches the requester.
- **204** on success; **404** `NOT_FOUND` otherwise (no distinction, to avoid probing).

### 1.3 `POST /api/quotes` (P2)

|              |                                 |
| ------------ | ------------------------------- |
| Content-Type | `application/json`              |
| Max body     | 64 KB                           |
| Rate limit   | 5 / hour / IP and 20 / day / IP |

**Request**

```json
{
  "name": "Ananya Rao",
  "company": "Rao Naturals Pvt Ltd",
  "phone": "+91 98765 43210",
  "email": "ananya@raonaturals.in",
  "categorySlug": "packaging-boxes",
  "productSlug": "mono-carton-boxes",
  "size": "120 × 80 × 40 mm",
  "quantity": "5,000 boxes",
  "material": "350 GSM SBS",
  "finishing": "Matte lamination, spot UV on logo",
  "deliveryCity": "Pune",
  "deliveryState": "Maharashtra",
  "additional": "Need samples before bulk run.",
  "uploadIds": ["1b5e8f0e-3c0a-4c47-9d2f-0f6a0b8e2a11"],
  "consent": true,
  "turnstileToken": "<token>",
  "website": "",
  "source": {
    "landingPage": "/mono-carton-boxes",
    "submitPage": "/mono-carton-boxes",
    "utmSource": "google",
    "utmMedium": "cpc",
    "utmCampaign": "cartons-nov"
  }
}
```

`website` is the honeypot; any non-empty value → respond `201` with a fake reference and save nothing (do not reveal detection).

Validation = `quoteInputSchema` in `src/schemas/quote.ts` (same schema the client uses). Additional server checks: Turnstile `siteverify` succeeds; every `uploadId` exists, is `pending`, was uploaded by the same `ipHash`, and count ≤ 3; `productSlug` (if set) belongs to `categorySlug` and is published.

**201 Created**

```json
{ "reference": "VP-2026-000042" }
```

| Status | code                 | When                                                  |
| ------ | -------------------- | ----------------------------------------------------- |
| 400    | `VALIDATION_FAILED`  | zod errors in `fields`                                |
| 400    | `INVALID_UPLOADS`    | unknown/attached/foreign upload ids                   |
| 403    | `BOT_CHECK_FAILED`   | Turnstile failed                                      |
| 403    | `ORIGIN_MISMATCH`    |                                                       |
| 429    | `RATE_LIMITED`       |                                                       |
| 503    | `QUOTES_UNAVAILABLE` | DB unreachable — client shows WhatsApp/email hand-off |

Side effects (in `after()`): admin email to `QUOTE_NOTIFY_TO`, acknowledgement email to the customer; results written to `lead.email.*`.

### 1.4 `GET /api/health`

**200** `{ "status": "ok", "db": "ok" | "disabled", "version": "<git sha>" }` · **503** `{ "status": "degraded", "db": "down" }`. No auth, no rate limit, `Cache-Control: no-store`.

## 2. Admin endpoints (P3)

All require a valid admin session cookie (`vp_session`); otherwise **401** `UNAUTHENTICATED`. `noindex` and `Cache-Control: no-store`.

### 2.1 `GET /api/admin/files/:uploadId`

Streams the file. Headers: `Content-Type: application/octet-stream`, `Content-Disposition: attachment; filename*=UTF-8''<encoded originalName>`, `Content-Length`, `X-Content-Type-Options: nosniff`. **404** if missing on disk (logged at `error`).

### 2.2 `GET /api/admin/leads/export?status=<status|all>&from=YYYY-MM-DD&to=YYYY-MM-DD`

CSV, UTF-8 with BOM, filename `vasuprint-leads-YYYYMMDD-HHmm.csv`. Columns: Reference, Date (IST), Status, Name, Company, Phone, Email, Category, Product, Size, Quantity, Material, Finishing, City, State, Additional, Files (count), UTM Source, UTM Medium, UTM Campaign, Landing Page. Values escaped per RFC 4180; cells starting with `= + - @` prefixed with `'` to prevent CSV formula injection.

### 2.3 `POST /api/admin/media`

Upload a product/category image to Cloudinary. Multipart field `image`; ≤ 8 MB; JPEG/PNG/WebP/AVIF (sniffed). Cloudinary options: `folder: vasuprint/products`, `resource_type: image`, `transformation: [{ width: 2000, height: 2000, crop: 'limit' }]`. **201** `{ "src": "https://res.cloudinary.com/…", "width": 1600, "height": 1200, "publicId": "vasuprint/products/abc" }`.

## 3. Authentication actions (P3)

| Action   | File                               | Input                        | Behaviour                                                                                                                                                                                                                                       |
| -------- | ---------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `login`  | `src/app/admin/login/actions.ts`   | `{ email, password, next? }` | Rate limit 5 / 15 min / IP and 20 / day globally; constant-time email compare; `argon2.verify`; on success set `vp_session` and redirect to `next` (must start with `/admin`) or `/admin`; on failure generic "Email or password is incorrect". |
| `logout` | `src/app/admin/(panel)/actions.ts` | —                            | Clears cookie, redirect `/admin/login`.                                                                                                                                                                                                         |

## 4. Admin Server Actions (P3)

Every action: `await requireAdmin()` → `schema.parse(input)` → explicit field mapping → DB write → revalidate → return result.

Return type for all actions:

```ts
type ActionResult<T = void> =
  { ok: true; data: T } | { ok: false; error: string; fields?: Record<string, string> };
```

### 4.1 Leads — `src/app/admin/(panel)/leads/actions.ts`

| Action             | Input                               | Effect                                                                                          |
| ------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| `updateLeadStatus` | `{ reference, status }`             | Sets status, appends `statusHistory`.                                                           |
| `addLeadNote`      | `{ reference, body }`               | Appends note (≤ 2,000 chars).                                                                   |
| `resendAdminEmail` | `{ reference }`                     | Re-sends notification; updates `email.admin`.                                                   |
| `deleteLead`       | `{ reference, confirm: reference }` | Deletes lead, its uploads docs and files. `confirm` must equal the reference (typed in dialog). |

### 4.2 Products — `src/app/admin/(panel)/products/actions.ts`

| Action             | Input                                                          | Effect                                                                                     | Revalidates                                           |
| ------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| `createProduct`    | `productSchema` (status forced `draft` unless `publish: true`) | Insert                                                                                     | `catalog` tag                                         |
| `updateProduct`    | `{ id, ...productSchema }`                                     | Update; if published slug changed → create redirect                                        | `/{old}`, `/{new}`, `/{categorySlug}`, `/`, `catalog` |
| `setProductStatus` | `{ id, status }`                                               | Publish/unpublish                                                                          | same as above                                         |
| `duplicateProduct` | `{ id }`                                                       | Copy as draft with slug `<slug>-copy` (incrementing)                                       | `catalog`                                             |
| `reorderProducts`  | `{ categorySlug, orderedIds[] }`                               | Rewrite `sortOrder` 0..n                                                                   | `/{categorySlug}`, `catalog`                          |
| `deleteProduct`    | `{ id, confirm: slug }`                                        | Delete; removes from other products' `relatedSlugs`; Cloudinary images deleted best-effort | as update                                             |

### 4.3 Categories — `src/app/admin/(panel)/categories/actions.ts`

| Action              | Input                       | Effect                                                                  |
| ------------------- | --------------------------- | ----------------------------------------------------------------------- |
| `updateCategory`    | `{ id, ...categorySchema }` | Update; slug change → redirect + updates `categorySlug` on its products |
| `createCategory`    | `categorySchema`            | Insert (shows nav-impact warning in UI)                                 |
| `deleteCategory`    | `{ id, confirm: slug }`     | Blocked if products exist                                               |
| `reorderCategories` | `{ orderedIds[] }`          | Rewrite `sortOrder`                                                     |

## 5. Email contracts

### 5.1 Admin notification

- **To:** `QUOTE_NOTIFY_TO` · **From:** `MAIL_FROM` · **Reply-To:** customer email
- **Subject:** `New quote {reference} — {productName ?? categoryName} — {quantity} — {deliveryCity}`
- **Body:** reference, received time (IST), customer block with `tel:` and `https://wa.me/<digits>` links, full request table, file list (name + size) with "Download in admin" link, source/UTM, button "Open in admin" → `{SITE_URL}/admin/leads/{reference}`.

### 5.2 Customer acknowledgement

- **To:** customer · **From:** `MAIL_FROM` · **Reply-To:** `business.email`
- **Subject:** `We've received your quote request — {reference}`
- **Body:** greeting by first name, summary of what they asked for, "What happens next" (team reviews specs → quotation shared on WhatsApp/email → artwork proof → production), business contact block, WhatsApp button. No marketing content.

Both have plain-text alternatives. Templates: `src/lib/email/templates/AdminQuoteEmail.tsx`, `CustomerAckEmail.tsx`.

## 6. WhatsApp links

`buildWhatsAppUrl(text)` → `https://wa.me/${business.whatsappE164}?text=${encodeURIComponent(text)}`.

| Context               | Pre-filled text                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------- |
| Global button         | `Hi VasuPrint, I'd like to discuss a printing requirement.`                                  |
| Product/category page | `Hi VasuPrint, I'm interested in {name}. Please share details and a quotation.` (+ page URL) |
| P1 hand-off           | Full formatted spec (see `UI-UX.md` §6.5)                                                    |
| Admin → customer      | `Hello {firstName}, this is VasuPrint regarding your quote request {reference}.`             |
