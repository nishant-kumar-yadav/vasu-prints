# VasuPrint — Architecture

This document is the technical source of truth. If code and this document disagree, fix one of them in the same PR.

---

## 1. System overview

```
                         ┌──────────────────────────── Hostinger VPS (Ubuntu 24.04) ───────────────────────────┐
                         │                                                                                      │
 Browser ──HTTPS──► Nginx (443, TLS, gzip/brotli, static cache, body limits)                                     │
                         │        │                                                                             │
                         │        └──► Next.js 16 server (node, PM2, 127.0.0.1:3000)                            │
                         │                 ├─ Public pages (Server Components, static + on-demand revalidation)   │
                         │                 ├─ /admin (Server Components + Server Actions, session-protected)      │
                         │                 ├─ Route handlers: /api/uploads, /api/quotes, /api/admin/*, /api/health │
                         │                 │                                                                     │
                         │                 ├──► /srv/vasuprint/shared/uploads  (artwork files on local disk)     │
                         │                 │                                                                     │
                         │   cron: backup.sh (mongodump + rclone) · cleanup-uploads (orphan temp files)          │
                         └─────────────────┼──────────────────────────────────────────────────────────────────────┘
                                           │
             ┌─────────────────────────────┼─────────────────────────────────┬──────────────────────┐
             ▼                             ▼                                 ▼                      ▼
   MongoDB Atlas (M0, Mumbai)     SMTP (Gmail / Hostinger mail)      Cloudinary (product      Cloudflare Turnstile
   catalog, leads, uploads meta   admin + customer emails            images, admin uploads)   (bot check)
                                                                                                    
   Off-site backup target (rclone remote: Cloudflare R2 or Google Drive)
```

Single deployable: **one Next.js application** serves the public site, the admin panel and the API. There is no separate backend service.

## 2. Technology choices

| Concern | Choice | Version | Why |
|---|---|---|---|
| Runtime | Node.js | 22 LTS | Long-term support through 2027; native fetch/streams |
| Framework | Next.js (App Router) | 16.x | Server rendering for SEO; Server Actions for admin; one deployable. See ADR-0001 |
| Language | TypeScript | 5.x, `strict: true` | Agents produce safer code with types |
| UI | React | 19.x | Bundled with Next 16 |
| Styling | Tailwind CSS | 4.x | Tokens in CSS (`@theme`), no runtime cost |
| UI primitives | Radix UI via shadcn/ui (copied into `src/components/ui`) | latest | Accessible dialogs, selects, menus; we own the code |
| Icons | lucide-react | latest | Consistent 1.5 px stroke icons |
| Fonts | `next/font/google`: **Manrope** (headings), **Inter** (body) | — | Self-hosted at build, no layout shift |
| Forms | react-hook-form + zod (`@hookform/resolvers`) | latest | Same zod schemas on client and server |
| Validation | zod | 4.x | Single source of truth for input shapes |
| Database | MongoDB Atlas M0 (AWS Mumbai `ap-south-1`) via Mongoose | Mongoose 8.x | Flexible catalog documents; free tier; see ADR-0002 |
| Product images | Cloudinary | SDK 2.x | CDN + automatic format/size; admin uploads |
| Artwork storage | VPS local disk, behind a `FileStore` interface | — | 100 MB files, no egress cost; see ADR-0003 |
| Upload parsing | busboy (streaming) | 1.x | Streams to disk; never buffers 100 MB in memory |
| File type sniffing | file-type + custom signatures for CDR/EPS/AI | latest | Validate by content, not extension |
| Email | Nodemailer over SMTP | 7.x | Works with Gmail app password or Hostinger mailbox |
| Email templates | React Email (`@react-email/components`) rendered to HTML | latest | Typed, previewable templates |
| Bot protection | Cloudflare Turnstile | — | Free, invisible, privacy-friendly |
| Rate limiting | rate-limiter-flexible (memory store) | latest | Single process → memory is sufficient |
| Auth | Custom single-admin auth: argon2 hash in env + `jose` signed session cookie | — | One user; no auth provider needed |
| Logging | pino → PM2 logs (pm2-logrotate) | latest | Structured JSON logs |
| Markdown (policies) | `react-markdown` + `remark-gfm` (server only) | latest | Policies authored as `.md` |
| Package manager | pnpm | 10.x (via corepack) | Fast, strict |
| Lint/format | ESLint (flat config, `eslint-config-next`) + Prettier + `prettier-plugin-tailwindcss` | latest | |
| Unit tests | Vitest + Testing Library + mongodb-memory-server | latest | |
| E2E tests | Playwright | latest | Quote flow, admin flow |
| CI/CD | GitHub Actions → SSH deploy to VPS | — | See `DEPLOYMENT.md` |
| Process manager | PM2 (fork mode, 1 instance) | 5.x | Restarts, logs, zero-downtime reload |
| Reverse proxy | Nginx + Certbot (Let's Encrypt) | distro | TLS, caching, upload body limits |
| Analytics | GA4 via `@next/third-parties/google` + Google Search Console | — | Brief requirement |

**Explicitly not used:** Vercel, Express, Redux, CSS-in-JS, jQuery, Bootstrap, animation libraries heavier than CSS transitions (Framer Motion is allowed only in the admin, never on public pages).

## 3. Repository layout

```
vasuprint/
├── AGENTS.md                     # Rules for AI agents (canonical)
├── CLAUDE.md                     # Points to AGENTS.md
├── README.md
├── docs/                         # All planning docs + adr/
├── .github/workflows/ci.yml      # lint, typecheck, unit, e2e, build
├── .github/workflows/deploy.yml  # deploy main → VPS
├── ecosystem.config.cjs          # PM2 config
├── next.config.ts
├── public/
│   ├── images/brand/             # logo.svg, logo-white.svg, og-default.jpg, favicon set
│   ├── images/hero/
│   ├── images/categories/        # <category-slug>.webp
│   └── images/products/<slug>/   # 1.webp … 6.webp (P1 static images)
├── scripts/
│   ├── seed.ts                   # static content → MongoDB (idempotent upsert)
│   ├── check-placeholders.ts     # fails if any PLACEHOLDER remains (prod build gate)
│   ├── cleanup-uploads.ts        # delete pending uploads older than 24 h
│   ├── backup.sh                 # mongodump + rclone sync
│   └── deploy.sh                 # release-dir deploy on the VPS
├── src/
│   ├── app/
│   │   ├── (site)/
│   │   │   ├── layout.tsx                    # Header, Footer, WhatsApp, MobileActionBar
│   │   │   ├── page.tsx                      # Home
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── get-a-quote/page.tsx
│   │   │   ├── get-a-quote/thank-you/page.tsx
│   │   │   ├── (legal)/privacy-policy/page.tsx
│   │   │   ├── (legal)/terms-and-conditions/page.tsx
│   │   │   ├── (legal)/shipping-policy/page.tsx
│   │   │   ├── (legal)/refund-policy/page.tsx
│   │   │   └── [slug]/page.tsx               # resolves category OR product OR redirect OR 404
│   │   ├── admin/
│   │   │   ├── login/page.tsx
│   │   │   └── (panel)/
│   │   │       ├── layout.tsx                # requireAdmin() + sidebar
│   │   │       ├── page.tsx                  # dashboard
│   │   │       ├── leads/page.tsx
│   │   │       ├── leads/[reference]/page.tsx
│   │   │       ├── products/page.tsx
│   │   │       ├── products/new/page.tsx
│   │   │       ├── products/[id]/page.tsx
│   │   │       ├── categories/page.tsx
│   │   │       └── categories/[id]/page.tsx
│   │   ├── api/
│   │   │   ├── uploads/route.ts              # POST (stream one file)
│   │   │   ├── uploads/[id]/route.ts         # DELETE (pending only)
│   │   │   ├── quotes/route.ts               # POST
│   │   │   ├── admin/files/[id]/route.ts     # GET (download, admin)
│   │   │   ├── admin/leads/export/route.ts   # GET CSV (admin)
│   │   │   ├── admin/media/route.ts          # POST product image → Cloudinary (admin)
│   │   │   └── health/route.ts
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   └── layout.tsx                        # <html>, fonts, GA4, metadata base
│   ├── components/
│   │   ├── ui/                   # shadcn primitives (Button, Input, Select, Dialog, Sheet, Accordion…)
│   │   ├── site/                 # Header, MegaMenu, Footer, Hero, ProductCard, SpecTable, FAQ, CTASection…
│   │   ├── quote/                # QuoteForm, FileDropzone, UploadRow, HandoffPanel
│   │   └── admin/                # DataTable, ProductForm, ImageManager, SeoFields, StatusBadge…
│   ├── config/
│   │   ├── business.ts           # ALL business/personal details (placeholders until supplied)
│   │   ├── site.ts               # nav structure, site URL, default SEO
│   │   └── env.ts                # zod-validated process.env (server only)
│   ├── content/
│   │   ├── categories.ts         # 5 categories (typed)
│   │   ├── products/*.ts         # 13 products, one file each (typed)
│   │   ├── pages/                # home.ts, about.ts, contact.ts copy
│   │   └── policies/*.md         # 4 policies
│   ├── lib/
│   │   ├── catalog/              # CatalogRepository interface + static + mongo implementations
│   │   ├── db/connect.ts         # cached Mongoose connection
│   │   ├── quotes/               # createLead(), reference generator, notifications
│   │   ├── uploads/              # FileStore interface, LocalFileStore, sniff.ts, limits.ts
│   │   ├── email/                # transport.ts, templates/*.tsx, send.ts
│   │   ├── auth/                 # session.ts, password.ts, requireAdmin.ts
│   │   ├── security/             # turnstile.ts, rate-limit.ts, origin.ts, ip.ts
│   │   ├── seo/                  # metadata builders, jsonld.ts
│   │   ├── whatsapp.ts           # buildWhatsAppUrl(text)
│   │   └── logger.ts
│   ├── models/                   # Mongoose models (Category, Product, Lead, Upload, Counter, Redirect)
│   ├── schemas/                  # zod schemas shared client/server
│   ├── styles/globals.css        # Tailwind + @theme tokens
│   └── types/
├── tests/
│   ├── unit/
│   └── e2e/
└── package.json
```

## 4. Rendering strategy

| Route | Rendering | Revalidation |
|---|---|---|
| `/`, `/about`, `/contact`, policies | Static (build time) | Redeploy, or `revalidatePath` when catalog changes (home shows categories) |
| `/[slug]` (category/product) | Static via `generateStaticParams` + `dynamicParams = true` | On-demand: admin save calls `revalidatePath('/[slug]')`, `revalidatePath('/')`, `revalidateTag('catalog')` |
| `/get-a-quote` | Static shell; form is a Client Component reading `searchParams` on the client | — |
| `/get-a-quote/thank-you` | Dynamic (reads `?ref=`), `noindex` | — |
| `/admin/**` | Dynamic, `noindex`, never cached | — |
| `/sitemap.xml` | Generated from catalog, tagged `catalog` | On-demand |

**Server Components by default.** `'use client'` only for: header mobile menu/mega-menu interactions, image gallery, FAQ accordion (or use native `<details>`), quote form, admin forms/tables, WhatsApp button analytics events.

### 4.1 The `[slug]` resolver

All categories and products share a flat URL namespace (`/packaging-boxes`, `/mono-carton-boxes`). `src/app/(site)/[slug]/page.tsx`:

1. `catalog.getCategoryBySlug(slug)` → render `CategoryPage`.
2. else `catalog.getProductBySlug(slug)` → render `ProductPage`.
3. else `catalog.getRedirect(slug)` → `permanentRedirect('/' + to)`.
4. else `notFound()`.

Reserved slugs that must never be used for catalog items (validated in zod and the admin form): `about, contact, get-a-quote, admin, api, privacy-policy, terms-and-conditions, shipping-policy, refund-policy, sitemap.xml, robots.txt, images, _next`.

## 5. Catalog data layer

```ts
// src/lib/catalog/types.ts
export interface CatalogRepository {
  listCategories(opts?: { includeDrafts?: boolean }): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  listProducts(opts?: { categorySlug?: string; includeDrafts?: boolean }): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getRelatedProducts(product: Product, limit?: number): Promise<Product[]>;
  getRedirect(fromSlug: string): Promise<string | null>;
}
```

- `StaticCatalog` (P1) reads `src/content/**`. Pure, synchronous data wrapped in Promises.
- `MongoCatalog` (P3) reads MongoDB; wrapped in `unstable_cache`/`'use cache'` with tag `catalog`.
- Selected by `CATALOG_SOURCE=static|mongo` in `src/lib/catalog/index.ts`.
- `scripts/seed.ts` upserts static content into MongoDB by slug so P1 content becomes the P3 starting data.
- The `Category` and `Product` TypeScript types are inferred from zod schemas in `src/schemas/catalog.ts` and are identical for both implementations. See `SCHEMA.md`.

## 6. Quote submission flow (P2)

```
Client (QuoteForm)                         Server                                         Disk / DB / Email
──────────────────                         ──────                                         ─────────────────
1. user selects file
2. client-side check (ext, size ≤100MB, ≤3)
3. XHR POST /api/uploads (multipart,  ───► rate-limit (uploads: 10/h/IP)
   one file, progress events)              origin check
                                           busboy stream → count bytes (abort >100MB)
                                           sniff first 4 KB → allowed type?           ──► write to uploads/tmp/<uuid>.<ext>
                                           sha256 while streaming                      ──► Upload{status:'pending'} saved
                                     ◄───  201 {uploadId, name, size, type}
4. user fills rest, Turnstile token
5. POST /api/quotes (JSON)            ───► rate-limit (quotes: 5/h/IP)
   {fields…, uploadIds[], turnstile,       origin check, honeypot empty?
    website(honeypot), utm…}               verify Turnstile (siteverify)
                                           zod parse QuoteInput
                                           uploads exist, pending, ≤3                  
                                           reference = nextLeadReference()             ──► counters.findOneAndUpdate($inc)
                                           Lead.create(...)                            ──► leads
                                           move files tmp → leads/<reference>/          ──► Upload{status:'attached', leadId}
                                     ◄───  201 {reference}
                                           after(): send admin email, customer email   ──► SMTP
                                                    update lead.email.*Status
6. router.push('/get-a-quote/thank-you?ref=VP-2026-000042')
```

Rules:
- Email sending happens in Next.js `after()` so the response is not delayed; failures are recorded on the lead (`email.admin.status = 'failed'`), never thrown to the buyer.
- The admin email contains the full spec, file names/sizes and a link to `/admin/leads/<reference>`. **Files are never attached** to email and never publicly accessible.
- Orphaned `pending` uploads (no lead within 24 h) are deleted by `scripts/cleanup-uploads.ts` (cron hourly).
- While `QUOTE_BACKEND=off` (P1), the form does not call `/api/uploads`; the file picker is replaced by a note "You can share artwork on WhatsApp or email after sending", and submission renders `HandoffPanel` with `wa.me` and `mailto:` links containing the formatted spec.

## 7. File storage

```ts
// src/lib/uploads/store.ts
export interface FileStore {
  writeTemp(id: string, ext: string, stream: Readable): Promise<{ path: string; bytes: number; sha256: string }>;
  promote(id: string, ext: string, leadReference: string): Promise<string>; // returns final relative path
  read(relativePath: string): Promise<Readable>;
  remove(relativePath: string): Promise<void>;
}
```

- `LocalFileStore` root = `UPLOAD_DIR` (prod: `/srv/vasuprint/shared/uploads`, outside the release dir and outside `public/`).
- Layout: `tmp/<uuid>.<ext>` and `leads/<reference>/<uuid>.<ext>`. Original filenames are stored only in the database.
- Downloads stream through `/api/admin/files/[id]` with `Content-Disposition: attachment; filename*=UTF-8''<original>` and `X-Content-Type-Options: nosniff`.
- The interface allows swapping to S3/R2 later without touching callers.

## 8. Admin architecture (P3)

- `src/app/admin/(panel)/layout.tsx` calls `requireAdmin()` (redirects to `/admin/login` when the session is missing/invalid).
- Every Server Action **also** calls `requireAdmin()` as its first line (layouts do not protect actions).
- Mutations are Server Actions in `src/app/admin/**/actions.ts`, each: `requireAdmin()` → zod parse → model call with explicit field picking (never spread raw input into Mongo) → `revalidate*` → return `{ ok: true } | { ok: false, errors }`.
- Product images upload through `/api/admin/media` (multipart, ≤ 8 MB, JPEG/PNG/WebP/AVIF) to Cloudinary folder `vasuprint/products/<slug>`; Cloudinary URL stored on the product.

## 9. Configuration and environment

### 9.1 `src/config/business.ts`

```ts
export const PLACEHOLDER = '__PLACEHOLDER__' as const;

export const business = {
  brandName: 'VasuPrint',
  legalName: PLACEHOLDER,            // e.g. "VasuPrint" sole proprietorship / Pvt Ltd name
  ownerNames: [PLACEHOLDER],
  phoneDisplay: PLACEHOLDER,         // "+91 98xxxxxx10"
  phoneE164: PLACEHOLDER,            // "+9198xxxxxx10"
  whatsappE164: PLACEHOLDER,         // digits only for wa.me, e.g. "9198xxxxxx10"
  email: PLACEHOLDER,                // public business email
  address: {
    line1: PLACEHOLDER, line2: '', city: PLACEHOLDER, state: PLACEHOLDER, pin: PLACEHOLDER, country: 'India',
  },
  mapsUrl: PLACEHOLDER,
  gstin: PLACEHOLDER,
  businessHours: PLACEHOLDER,        // "Mon–Sat, 10:00–19:00 IST"
  jurisdictionCity: PLACEHOLDER,     // courts for Terms §governing law
} as const;
```

- UI renders a placeholder as a neutral "—" in development and **never ships it**: `scripts/check-placeholders.ts` scans `business.ts`, `src/content/**` and env and exits non-zero; it runs in `pnpm build` when `NODE_ENV=production` and `ALLOW_PLACEHOLDERS` is not `true`. (`ALLOW_PLACEHOLDERS=true` is permitted for the P1 showcase deployment only.)
- Policies reference business values with tokens like `{{business.address}}`, replaced at render time.

### 9.2 Environment variables (`src/config/env.ts`, validated with zod at startup — the process exits if invalid)

| Variable | Required when | Example / notes |
|---|---|---|
| `SITE_URL` | always | `https://vasuprint.com` |
| `CATALOG_SOURCE` | always | `static` (P1–P2) or `mongo` (P3+) |
| `QUOTE_BACKEND` | always | `off` (P1) or `on` (P2+) |
| `ALLOW_PLACEHOLDERS` | optional | `true` only for showcase deploys |
| `MONGODB_URI` | `QUOTE_BACKEND=on` or `CATALOG_SOURCE=mongo` | Atlas SRV string, db `vasuprint` |
| `UPLOAD_DIR` | `QUOTE_BACKEND=on` | `/srv/vasuprint/shared/uploads` |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | `QUOTE_BACKEND=on` | Gmail: `smtp.gmail.com`, `465` |
| `MAIL_FROM` | `QUOTE_BACKEND=on` | `"VasuPrint <quotes@vasuprint.com>"` |
| `QUOTE_NOTIFY_TO` | `QUOTE_BACKEND=on` | comma-separated admin inbox(es) |
| `TURNSTILE_SITE_KEY` (exposed as `NEXT_PUBLIC_TURNSTILE_SITE_KEY`), `TURNSTILE_SECRET_KEY` | `QUOTE_BACKEND=on` | test keys in dev/CI |
| `IP_HASH_SALT` | `QUOTE_BACKEND=on` | `openssl rand -hex 32`; salts stored IP hashes |
| `ADMIN_EMAIL` | P3 | login identifier |
| `SESSION_VERSION` | P3 | integer, default `1`; bump to log out all sessions |
| `ADMIN_PASSWORD_HASH` | P3 | argon2id hash, generate with `pnpm admin:hash` |
| `SESSION_SECRET` | P3 | ≥ 32 random bytes, base64 |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | P3 | |
| `NEXT_PUBLIC_GA_ID` | P4 | `G-XXXXXXX`; GA omitted when unset |
| `GOOGLE_SITE_VERIFICATION` | P4 | Search Console meta tag |
| `LOG_LEVEL` | optional | `info` |
| `BACKUP_HEARTBEAT_URL`, `DISK_ALERT_URL` | optional (cron only) | healthchecks.io ping URLs used by `backup.sh` and the disk cron |

**There are no default values for secrets.** Missing required variables crash the server at boot with a clear message.

## 10. Caching and performance

- Nginx serves `/_next/static/*` and `/images/*` with `Cache-Control: public, max-age=31536000, immutable`.
- `next/image` with `sizes` on every image; local images in `public/images` (P1) and Cloudinary via a custom loader (`f_auto,q_auto,w_<width>`) for admin images (P3). `images.remotePatterns` allows only `res.cloudinary.com/<cloud>`.
- Hero image on each page: `priority` + `fetchPriority="high"`; all others lazy.
- Fonts: 2 families, `display: swap`, subsets `latin`, weights limited (Manrope 600/700/800, Inter 400/500/600).
- No client-side data fetching on public pages. TanStack Query is **not** used.
- GA4 loads after interaction (`@next/third-parties`), never blocks LCP.

## 11. Observability

- `pino` JSON logs with request id; PII (phone/email) is never logged — only lead reference.
- `/api/health` returns `{ status: 'ok', db: 'ok'|'down'|'disabled', version }` for the uptime monitor.
- PM2 restarts on crash; `pm2-logrotate` keeps 14 days.
- Email failures, upload rejections and Turnstile failures are logged at `warn` with reason codes.

## 12. Testing strategy

| Layer | Tool | What |
|---|---|---|
| Unit | Vitest | zod schemas (phone normalisation, reserved slugs), file sniffing (fixtures for each type incl. a renamed `.exe` → rejected), reference generator, WhatsApp URL builder, placeholder checker, catalog static repo |
| Integration | Vitest + mongodb-memory-server | `createLead` (counter increments, file promotion), admin actions with mocked session, redirect creation on slug change |
| E2E | Playwright (Chromium + WebKit mobile) | J1 quote flow with fixture files and Turnstile test keys, P1 hand-off flow, admin login → lead status change, product create → visible on site, 404 and redirect |
| Visual QA | Playwright screenshots at 360/768/1280/1440 for Home, a category, a product, Get a Quote | Reviewed manually against `UI-UX.md` |
| Performance | Lighthouse CI (`@lhci/cli`) in CI on built app | Budgets from PRD §7 |

## 13. Key decisions

See `docs/adr/`:
- ADR-0001 Next.js single app instead of SPA + Express API
- ADR-0002 MongoDB Atlas
- ADR-0003 Artwork on VPS local disk behind `FileStore`
- ADR-0004 Self-host on Hostinger VPS with Nginx + PM2
