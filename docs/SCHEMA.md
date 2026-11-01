# VasuPrint — Data Schema

Database: MongoDB Atlas, database name `vasuprint`. ODM: Mongoose 8.

**Source of truth for shapes is zod** (`src/schemas/*.ts`). Mongoose models (`src/models/*.ts`) mirror the zod schemas and add indexes and defaults. TypeScript types are `z.infer<>` of the zod schemas. Static content in `src/content/**` must satisfy the same zod schemas (checked by a unit test), so P1 content seeds P3 directly.

Conventions:
- All collections have `createdAt` / `updatedAt` (`timestamps: true`).
- Slugs: lowercase kebab-case, `^[a-z0-9]+(?:-[a-z0-9]+)*$`, 3–80 chars, not in the reserved list (see `ARCHITECTURE.md` §4.1).
- `strict: 'throw'` on all schemas — unknown fields are a bug, not silently dropped.
- Never pass request bodies directly to `create`/`findByIdAndUpdate`; build the update object from parsed zod output.

---

## 1. Collections overview

| Collection | Purpose | Phase | Approx. size |
|---|---|---|---|
| `categories` | 5 product categories | P3 (static in P1–P2) | 5 docs |
| `products` | Product pages | P3 (static in P1–P2) | 13 → ~40 docs |
| `leads` | Quote requests | P2 | ≤ 6k/year |
| `uploads` | Artwork file metadata | P2 | ≤ 18k/year |
| `counters` | Atomic sequence for lead references | P2 | 1 doc/year |
| `redirects` | Old slug → new slug (301) | P3 | few |

## 2. Shared sub-schemas

```ts
// src/schemas/common.ts
export const slug = z.string().min(3).max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .refine((s) => !RESERVED_SLUGS.includes(s), 'This URL is reserved');

export const image = z.object({
  src: z.string().min(1),            // "/images/products/sbs-boxes/1.webp" or Cloudinary https URL
  alt: z.string().min(5).max(160),   // required, descriptive
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const seo = z.object({
  title: z.string().min(10).max(60),        // without " | VasuPrint" suffix; template adds it when it fits
  description: z.string().min(70).max(160),
  ogImage: image.optional(),                 // falls back to first product image / default OG
});

export const faq = z.object({ q: z.string().min(5).max(160), a: z.string().min(10).max(800) });
export const feature = z.object({ title: z.string().min(2).max(60), body: z.string().min(10).max(240), icon: z.string().max(40).optional() }); // lucide icon name
export const spec = z.object({ label: z.string().min(2).max(40), value: z.string().min(1).max(200) });
export const publishStatus = z.enum(['draft', 'published']);
```

## 3. `categories`

```ts
export const categorySchema = z.object({
  slug,                                        // "packaging-boxes"
  name: z.string().min(2).max(40),             // "Packaging Boxes" (nav label)
  heading: z.string().min(10).max(90),         // H1: "Custom Packaging Boxes for Every Business Need"
  tagline: z.string().min(10).max(140),        // card subtitle
  intro: z.array(z.string().min(20).max(600)).min(1).max(4), // paragraphs
  highlights: z.array(feature).max(6).default([]),
  faqs: z.array(faq).max(8).default([]),
  image: image,                                // card + hero image
  seo,
  sortOrder: z.number().int().min(0).default(0),
  status: publishStatus.default('published'),
});
```

| Index | Purpose |
|---|---|
| `{ slug: 1 }` unique | lookup |
| `{ status: 1, sortOrder: 1 }` | nav / home order |

## 4. `products`

```ts
export const productSchema = z.object({
  slug,                                         // "mono-carton-boxes"
  name: z.string().min(2).max(60),              // "Mono Carton Boxes"
  categorySlug: slug,                           // must reference an existing category
  heading: z.string().min(10).max(90),          // H1
  summary: z.string().min(40).max(220),         // card text + hero subline
  intro: z.array(z.string().min(20).max(800)).min(1).max(4),
  features: z.array(feature).min(3).max(6),
  specs: z.array(spec).min(3).max(12),          // ordered table rows
  options: z.object({
    materials: z.array(z.string().max(80)).max(12).default([]),
    printing: z.array(z.string().max(80)).max(10).default([]),
    finishes: z.array(z.string().max(80)).max(14).default([]),
    formats: z.array(z.string().max(80)).max(10).default([]),  // box styles / roll vs sheet / tag shapes
  }),
  applications: z.array(z.string().max(80)).min(3).max(12),
  faqs: z.array(faq).min(3).max(8),
  images: z.array(image).min(1).max(6),         // first = primary
  relatedSlugs: z.array(slug).max(4).default([]),
  quoteHints: z.object({                        // used as placeholders in the quote form
    size: z.string().max(80).optional(),        // "e.g. 120 × 80 × 40 mm (L × W × H)"
    quantity: z.string().max(80).optional(),    // "e.g. 5,000 boxes"
    material: z.string().max(80).optional(),
  }).default({}),
  seo,
  featured: z.boolean().default(false),         // shown on home
  sortOrder: z.number().int().min(0).default(0),
  status: publishStatus.default('draft'),
});
```

| Index | Purpose |
|---|---|
| `{ slug: 1 }` unique | lookup |
| `{ categorySlug: 1, status: 1, sortOrder: 1 }` | category grid, mega-menu |
| `{ featured: 1, status: 1 }` | home |

Integrity rules (enforced in admin actions and a unit test over static content):
- `categorySlug` must exist.
- A slug must not exist in both `categories` and `products`.
- `relatedSlugs` must reference published products and must not include itself.
- Deleting a category with products is blocked.

## 5. `leads`

```ts
export const LEAD_STATUSES = ['new', 'contacted', 'quoted', 'won', 'lost'] as const;

export const leadSchema = z.object({
  reference: z.string().regex(/^VP-\d{4}-\d{6}$/),   // "VP-2026-000042"
  status: z.enum(LEAD_STATUSES).default('new'),
  customer: z.object({
    name: z.string().min(2).max(80),
    company: z.string().max(120).default(''),
    phone: z.string().regex(/^\+91[6-9]\d{9}$/),    // normalised E.164
    email: z.string().email().max(120),
  }),
  request: z.object({
    categorySlug: slug,
    categoryName: z.string(),                         // snapshot at submit time
    productSlug: slug.nullable(),                     // null = "Not sure / Other"
    productName: z.string().nullable(),               // snapshot
    size: z.string().max(120).default(''),
    quantity: z.string().min(1).max(40),
    material: z.string().max(120).default(''),
    finishing: z.string().max(1000).default(''),
    deliveryCity: z.string().min(2).max(80),
    deliveryState: z.enum(INDIAN_STATES_AND_UTS),
    additional: z.string().max(2000).default(''),
  }),
  files: z.array(objectId).max(3).default([]),        // refs → uploads._id
  source: z.object({
    landingPage: z.string().max(300).default(''),     // first page of the session
    submitPage: z.string().max(300).default(''),      // page that opened the form (referrer path)
    utmSource: z.string().max(100).default(''),
    utmMedium: z.string().max(100).default(''),
    utmCampaign: z.string().max(100).default(''),
  }),
  consent: z.object({
    accepted: z.literal(true),
    noticeVersion: z.string(),                        // privacy policy "Last updated" date, e.g. "2026-11-01"
    at: z.date(),
  }),
  email: z.object({
    admin: emailDelivery,                             // { status: 'pending'|'sent'|'failed', at?: Date, error?: string }
    customer: emailDelivery,
  }),
  notes: z.array(z.object({ body: z.string().min(1).max(2000), at: z.date() })).default([]),
  statusHistory: z.array(z.object({ from: z.enum(LEAD_STATUSES), to: z.enum(LEAD_STATUSES), at: z.date() })).default([]),
  meta: z.object({
    ipHash: z.string(),        // sha256(ip + IP_HASH_SALT) — never the raw IP
    userAgent: z.string().max(300),
  }),
});
```

`INDIAN_STATES_AND_UTS` (36 values) lives in `src/schemas/india.ts`: Andhra Pradesh, Arunachal Pradesh, Assam, Bihar, Chhattisgarh, Goa, Gujarat, Haryana, Himachal Pradesh, Jharkhand, Karnataka, Kerala, Madhya Pradesh, Maharashtra, Manipur, Meghalaya, Mizoram, Nagaland, Odisha, Punjab, Rajasthan, Sikkim, Tamil Nadu, Telangana, Tripura, Uttar Pradesh, Uttarakhand, West Bengal, Andaman and Nicobar Islands, Chandigarh, Dadra and Nagar Haveli and Daman and Diu, Delhi, Jammu and Kashmir, Ladakh, Lakshadweep, Puducherry.

| Index | Purpose |
|---|---|
| `{ reference: 1 }` unique | lookup, URLs |
| `{ status: 1, createdAt: -1 }` | filtered list |
| `{ createdAt: -1 }` | dashboard |
| text index on `customer.name, customer.company, customer.email, reference` | admin search (phone searched by exact normalised match) |

Retention: kept indefinitely (owner decision). Deleting a lead deletes its `uploads` documents and files.

### 5.1 Phone normalisation

Input accepted: `98765 43210`, `+91 98765-43210`, `09876543210`, `919876543210`. Algorithm: strip non-digits → drop leading `0` → drop leading `91` if 12 digits → must match `^[6-9]\d{9}$` → store `+91` + digits.

## 6. `uploads`

```ts
export const ALLOWED_UPLOAD_TYPES = {
  pdf:  { mime: 'application/pdf' },
  ai:   { mime: 'application/postscript' },   // PDF-compatible AI files sniff as PDF; legacy AI as PostScript
  eps:  { mime: 'application/postscript' },
  cdr:  { mime: 'application/vnd.corel-draw' },// RIFF "CDR" (≤X3) or ZIP container (X4+)
  psd:  { mime: 'image/vnd.adobe.photoshop' },
  svg:  { mime: 'image/svg+xml' },
  png:  { mime: 'image/png' },
  jpg:  { mime: 'image/jpeg' },
  jpeg: { mime: 'image/jpeg' },
  tif:  { mime: 'image/tiff' },
  tiff: { mime: 'image/tiff' },
  zip:  { mime: 'application/zip' },
} as const;

export const uploadSchema = z.object({
  _id: uuid,                                // generated server-side, used as file stem
  originalName: z.string().max(200),        // sanitised for display only
  ext: z.enum(Object.keys(ALLOWED_UPLOAD_TYPES)),
  detectedMime: z.string(),
  bytes: z.number().int().positive().max(100 * 1024 * 1024),
  sha256: z.string().length(64),
  storagePath: z.string(),                  // relative to UPLOAD_DIR
  status: z.enum(['pending', 'attached']),
  leadId: objectId.nullable(),
  ipHash: z.string(),
});
```

| Index | Purpose |
|---|---|
| `{ status: 1, createdAt: 1 }` | orphan cleanup (`pending` older than 24 h) |
| `{ leadId: 1 }` | lead detail |

Content signatures checked (first bytes):

| Ext | Accepted signature(s) |
|---|---|
| pdf, ai | `%PDF-` |
| ai, eps | `%!PS-Adobe` or DOS EPS binary header `C5 D0 D3 C6` |
| cdr | `RIFF????CDR` (bytes 8–10 = `CDR`) or ZIP `PK\x03\x04` |
| psd | `8BPS` |
| png | `89 50 4E 47 0D 0A 1A 0A` |
| jpg/jpeg | `FF D8 FF` |
| tif/tiff | `49 49 2A 00` or `4D 4D 00 2A` |
| zip | `PK\x03\x04` (also `PK\x05\x06` empty archive → reject) |
| svg | UTF-8 text whose first non-whitespace/XML-declaration element is `<svg` (no `<!ENTITY`) |

Extension and signature must agree (e.g. `.png` with `%PDF` → rejected).

## 7. `counters`

```ts
{ _id: 'lead-2026', seq: 42 }
```
`nextLeadReference()` → `findOneAndUpdate({ _id: 'lead-' + year }, { $inc: { seq: 1 } }, { upsert: true, new: true })` → `VP-${year}-${String(seq).padStart(6, '0')}`. Year is computed in `Asia/Kolkata`.

## 8. `redirects`

```ts
export const redirectSchema = z.object({
  from: slug,           // unique
  to: slug,
  createdAt: z.date(),
});
```
- Created automatically when a published category/product slug changes.
- Chains are collapsed on write (`a→b`, then `b→c` updates `a→c`).
- A redirect whose `from` becomes a live slug again is deleted.

## 9. Seed data

`pnpm db:seed` (`scripts/seed.ts`):
1. Validates every file in `src/content` with the zod schemas.
2. Upserts categories then products by `slug` (does **not** overwrite documents whose `updatedAt` is newer than the seed's `contentVersion` unless `--force`).
3. Ensures indexes (`Model.syncIndexes()`).

## 10. Static content shape (P1)

```ts
// src/content/products/mono-carton-boxes.ts
import type { ProductInput } from '@/schemas/catalog';
export default {
  slug: 'mono-carton-boxes',
  name: 'Mono Carton Boxes',
  categorySlug: 'packaging-boxes',
  // …all fields from CONTENT.md §5
  status: 'published',
} satisfies ProductInput;
```
