# VasuPrint — SEO Specification

Target: Indian B2B buyers searching for product + intent terms ("mono carton box manufacturer", "pvc gumming sticker printing", "uv dtf stickers"). SEO outcomes are not guaranteed; this document makes sure the site is technically excellent and every page is unique and useful.

---

## 1. Canonical host and URL rules

- Canonical origin: `https://vasuprint.com`. Nginx 301s `http://*` and `https://www.vasuprint.com/*` to it.
- Lowercase, hyphenated, no trailing slash (`trailingSlash: false`), no file extensions, no query strings in canonicals.
- Every indexable page outputs `<link rel="canonical">` to its own clean URL (query parameters such as `?product=` or UTM are stripped).
- Categories and products share one flat namespace (see `ARCHITECTURE.md` §4.1).
- Slug changes create 301 redirects automatically (`SCHEMA.md` §8).

## 2. URL map, titles and descriptions

Title template: `{seo.title} | VasuPrint` when the combined length ≤ 60 chars; otherwise `{seo.title}` alone. Home uses its title verbatim.

| URL | Type | Title (≤ 60) | Meta description (≤ 160) | Index |
|---|---|---|---|---|
| `/` | Home | VasuPrint – Custom Printing & Packaging Solutions | VasuPrint offers customized packaging boxes, printed stickers, DTF transfers, UV DTF stickers and product tags. Contact us for bulk orders and custom printing quotations. | ✓ |
| `/about` | Page | About VasuPrint – Printing & Packaging Partner | Learn about VasuPrint — customized printing, packaging and labeling solutions for brands, manufacturers, retailers and distributors across India. | ✓ |
| `/contact` | Page | Contact VasuPrint – Get a Printing Quote | Contact VasuPrint for custom packaging boxes, stickers, DTF transfers and product tags. Call, WhatsApp or email us your requirements for a quotation. | ✓ |
| `/get-a-quote` | Page | Get a Quote – Custom Printing & Packaging | Request a quotation for custom boxes, stickers, DTF and UV DTF transfers or tags. Share size, quantity, material and artwork — we'll reply with pricing. | ✓ |
| `/get-a-quote/thank-you` | Page | Quote Request Received | — | ✗ noindex |
| `/packaging-boxes` | Category | Custom Packaging Boxes Manufacturer & Supplier | Custom printed packaging boxes — mono cartons, SBS and duplex boxes in your size, board and finish. Bulk orders across India. Request a quote from VasuPrint. | ✓ |
| `/custom-stickers` | Category | Custom Printed Stickers & Product Labels | Custom printed stickers and labels — paper, vinyl and PVC gumming stickers and die-cut stickers for packaging, branding and product labeling. Get a quote. | ✓ |
| `/dtf-stickers` | Category | Custom DTF Transfer Stickers | Custom DTF transfer stickers for T-shirts, hoodies, uniforms and fabric branding. Vibrant full-color heat transfers printed to your artwork. Request a quote. | ✓ |
| `/uv-dtf-stickers` | Category | Custom UV DTF Transfer Stickers | Custom UV DTF stickers for glass, metal, plastic and other hard surfaces. Peel-and-stick transfers with a raised, glossy finish. Get a bulk quotation. | ✓ |
| `/custom-tags` | Category | Custom Hang Tags & Plastic Tags | Custom hang tags and plastic tags for garments and products — printed on premium card or durable PVC with foil, emboss and die-cut options. Get a quote. | ✓ |
| `/mono-carton-boxes` | Product | Mono Carton Boxes – Custom Printed Cartons | Custom printed mono carton boxes for cosmetics, pharma, FMCG and retail. Choose board, size, printing and finishes like foil and spot UV. Get a bulk quote. | ✓ |
| `/sbs-boxes` | Product | SBS Boxes – Premium Solid Bleached Sulphate | Premium SBS (solid bleached sulphate) boxes with a bright white surface for sharp printing. Ideal for cosmetics, perfume and premium products. Get a quote. | ✓ |
| `/duplex-boxes` | Product | Duplex Boxes – Printed Duplex Board Cartons | Economical printed duplex board boxes for FMCG, toys, hardware and consumer goods. Custom sizes, styles and finishes in bulk. Request a quote from VasuPrint. | ✓ |
| `/paper-gumming-stickers` | Product | Paper Gumming Stickers – Custom Paper Labels | Custom paper gumming stickers and labels in sheets or rolls for product labeling, MRP, packaging and branding. Gloss, matte and die-cut options. Get a quote. | ✓ |
| `/vinyl-gumming-stickers` | Product | Vinyl Gumming Stickers – Waterproof Labels | Waterproof vinyl gumming stickers for bottles, containers and products exposed to moisture. White and transparent vinyl, custom shapes. Request a quote. | ✓ |
| `/pvc-gumming-stickers` | Product | PVC Gumming Stickers – Durable Custom Labels | Durable PVC gumming stickers that resist water, oil and tearing — white, transparent and metallic finishes for appliances and containers. Get a bulk quote. | ✓ |
| `/die-cut-stickers` | Product | Die-Cut Stickers – Custom Shape Stickers | Custom die-cut stickers cut to the exact shape of your logo or design, on paper, vinyl or PVC. Perfect for branding, packaging and promotions. Get a quote. | ✓ |
| `/dtf-transfer-stickers` | Product | DTF Transfer Stickers – Custom Gang Sheets | Custom DTF transfer stickers and gang sheets printed in full colour with white ink for cotton, polyester and blends. Ready to press. Request a quotation. | ✓ |
| `/dtf-heat-transfer-stickers` | Product | DTF Heat Transfer Stickers – Ready-to-Press Logos | Ready-to-press DTF heat transfer stickers for logos, neck labels and garment branding. Pre-cut, full colour and durable on fabric. Get a bulk quote today. | ✓ |
| `/uv-dtf-sticker-printing` | Product | UV DTF Stickers – Custom UV DTF Printing | Custom UV DTF sticker printing for bottles, tumblers, phone cases and packaging. No heat needed — peel, stick and press onto hard surfaces. Get a quote. | ✓ |
| `/custom-uv-transfer-stickers` | Product | Custom UV Transfer Stickers – Logos & Wraps | Custom UV transfer stickers for logos, cup wraps and product branding on glass, metal, acrylic and wood. Raised glossy finish. Request a bulk quotation. | ✓ |
| `/custom-hang-tags` | Product | Custom Hang Tags – Printed Garment Tags | Custom printed hang tags for apparel and products on premium art card or kraft, with foil, emboss, eyelets and strings. Bulk orders. Get a quote. | ✓ |
| `/plastic-tags` | Product | Plastic Tags – Waterproof PVC Product Tags | Durable plastic and PVC tags for garments, outdoor products and plants — waterproof, tear-resistant and printed to your design. Request a bulk quote. | ✓ |
| `/privacy-policy` | Legal | Privacy Policy | How VasuPrint collects, uses and protects your personal data and artwork files, in line with India's Digital Personal Data Protection Act, 2023. | ✓ |
| `/terms-and-conditions` | Legal | Terms & Conditions | Terms and conditions for quotations, orders, artwork approval, payments, quality and liability when you order custom printing from VasuPrint. | ✓ |
| `/shipping-policy` | Legal | Shipping & Delivery Policy | VasuPrint's shipping and delivery policy — production timelines, pan-India dispatch, packaging, tracking and shipping charges for custom orders. | ✓ |
| `/refund-policy` | Legal | Refund & Cancellation Policy | VasuPrint's refund and cancellation policy for custom printing and packaging orders — cancellations, defects, transit damage and refunds. | ✓ |
| `/admin/**` | Admin | — | — | ✗ noindex + robots disallow |

Note: the home description is the owner-approved text (170 chars). Google may truncate the last few words; keep it as written. Catalog SEO fields are still validated at ≤ 160 chars by zod.

Rules: titles and descriptions are unique (unit test asserts uniqueness across catalog + pages); description lengths 120–160 preferred.

## 3. On-page structure

- One `h1` per page = `heading` field (not the SEO title) — e.g. title "Mono Carton Boxes – Custom Printed Cartons", h1 "Mono Carton Boxes for Retail, Pharma & FMCG Brands".
- Primary keyword in: slug, title, h1, first paragraph, at least one h2, first image alt.
- Product pages ≥ 450 words of unique copy (intro + features + specs + FAQs from `CONTENT.md`).
- Internal links: breadcrumbs; category ↔ products; related products (2–4); contextual links inside intro copy (e.g. SBS page links to Mono Carton page); footer product links. Every product reachable within 2 clicks from home.
- Image `alt`: descriptive ("Matte-laminated mono carton boxes with gold foil logo on a grey background"), not keyword lists. File names descriptive (`mono-carton-boxes-matte-foil.webp`) for admin uploads where possible.

## 4. Metadata implementation

`src/lib/seo/metadata.ts` exports `buildMetadata({ title, description, path, image, noindex })` returning Next.js `Metadata`:

- `metadataBase: new URL(SITE_URL)`
- `alternates.canonical: path`
- `openGraph`: `type: 'website'`, `siteName: 'VasuPrint'`, `locale: 'en_IN'`, `url`, `title`, `description`, `images: [{ url, width: 1200, height: 630, alt }]`
- `twitter`: `card: 'summary_large_image'`
- `robots`: `{ index: !noindex, follow: true }`
- `verification.google: GOOGLE_SITE_VERIFICATION`
- `icons`: favicon set from `public/images/brand`

OG images: per product, the first product image cropped to 1200×630 (Cloudinary transform in P3; pre-generated `og.jpg` per product folder in P1). Default `og-default.jpg` (logo on navy with dieline motif).

## 5. Structured data (JSON-LD)

Rendered by `src/components/seo/JsonLd.tsx` (escape `<`). Fields with placeholder values are **omitted**, never output as placeholders.

| Page | Types |
|---|---|
| All pages | `Organization` (in root layout): name, url, logo, contactPoint (telephone, contactType "sales", areaServed "IN", availableLanguage "en"), sameAs (social links when supplied) |
| Home | + `WebSite` |
| Contact | + `LocalBusiness` (`@type: ["LocalBusiness", "Organization"]`): address (PostalAddress), telephone, email, openingHours, geo (if supplied), url, image |
| Category | `BreadcrumbList`, `CollectionPage` with `mainEntity` = `ItemList` of products (url, name, position), `FAQPage` |
| Product | `BreadcrumbList`, `Product` (name, description = summary, image[], brand {Organization VasuPrint}, category), `FAQPage` |
| Policies | `BreadcrumbList` |

**No `offers`, prices, `aggregateRating` or `review`** — there are no public prices and no verified reviews. (Google may show a warning for `Product` without offers/reviews in Merchant listings; that's expected — the Product markup is still valid for general rich results eligibility. If Search Console flags it as an error rather than warning, switch product pages to `Service` type.)

Validate with Google's Rich Results Test and `schema-dts` types in code.

## 6. Sitemap and robots

`src/app/sitemap.ts` (tag `catalog`): home (priority 1.0), categories (0.9), products (0.8), about/contact/get-a-quote (0.6), policies (0.3); `lastModified` from `updatedAt` (static content: a `contentUpdatedAt` constant per file). Excludes drafts, thank-you, admin.

`src/app/robots.ts`:
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /get-a-quote/thank-you
Sitemap: https://vasuprint.com/sitemap.xml
```
Non-production deployments (`SITE_URL` ≠ canonical) return `Disallow: /` and `noindex` headers (`X-Robots-Tag: noindex` from Nginx on the staging host).

## 7. Performance (Core Web Vitals)

Budgets in `PRD.md` §7. Technical rules: SSR/SSG only; `next/image` with correct `sizes`; AVIF/WebP; hero preloaded; fonts self-hosted; no render-blocking third-party scripts; GA4 deferred; Nginx brotli/gzip; immutable caching for static assets. Lighthouse CI asserts performance ≥ 0.9 and SEO ≥ 0.95.

## 8. Analytics and Search Console (P4)

- GA4 via `@next/third-parties/google` `<GoogleAnalytics gaId>` only when `NEXT_PUBLIC_GA_ID` is set and `NODE_ENV=production`.
- Events (`src/lib/analytics.ts`, no PII in params):

| Event | When | Params |
|---|---|---|
| `generate_lead` | Thank-you page view (once per reference) | `product_slug`, `category_slug`, `files_count` |
| `quote_start` | First interaction with quote form | `product_slug` |
| `quote_handoff` | P1 hand-off button clicked | `channel: whatsapp|email` |
| `whatsapp_click` | Any WhatsApp link | `location: header|fab|bar|product|contact|footer` |
| `phone_click` | `tel:` link | `location` |
| `quote_cta_click` | Any Get a Quote button | `location`, `product_slug?` |

- Mark `generate_lead` as a key event in GA4.
- Search Console: verify domain property via DNS TXT (preferred) or the `GOOGLE_SITE_VERIFICATION` meta tag; submit `sitemap.xml`; monitor Coverage and Enhancements (Breadcrumbs, FAQ).

## 9. Content roadmap (v2, for SEO growth)

Guides that target informational searches and link to product pages: "DTF vs UV DTF: which transfer do you need?", "SBS vs Duplex board for retail boxes", "How to prepare artwork for die-cut stickers", "Choosing GSM for hang tags", "Gumming sticker materials compared: paper vs vinyl vs PVC".
