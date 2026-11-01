# VasuPrint — Product Requirements Document (PRD)

| Field    | Value                                                 |
| -------- | ----------------------------------------------------- |
| Product  | vasuprint.com — B2B printing & packaging website      |
| Version  | 1.0 (MVP)                                             |
| Market   | India only (v1). International is a v2 consideration. |
| Language | English                                               |
| Builder  | Owner + AI coding agents (see `AGENTS.md`)            |
| Status   | Approved for build                                    |

---

## 1. Problem

VasuPrint makes custom packaging boxes, stickers, DTF / UV DTF transfers and tags for businesses. Bulk B2B buyers judge a supplier in seconds by its website. Today there is no website that:

1. Presents VasuPrint as a credible, premium manufacturing partner rather than a local print shop.
2. Lets a buyer send a **complete, quotable specification** (product, size, quantity, material, finishing, delivery city, artwork files) in one go.
3. Ranks on Google for product-intent searches such as "mono carton box manufacturer" or "UV DTF stickers".

## 2. Goals and non-goals

### 2.1 Goals (v1)

| #   | Goal                                                                                                              | Measure                                                                                                   |
| --- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| G1  | **Look premium.** The site must visually outclass typical Indian print-shop sites. This is the #1 priority of v1. | Owner sign-off against the `UI-UX.md` quality bar; mobile Lighthouse Performance ≥ 90, Accessibility ≥ 95 |
| G2  | **Capture quotable enquiries.** Every page leads to a quote request.                                              | Quote form completion works end-to-end; lead saved + admin email sent                                     |
| G3  | **Be found.** One indexable, server-rendered page per category and product.                                       | All 5 categories + 13 products in sitemap and indexed in Search Console                                   |
| G4  | **Be easy to run.** One admin can update products and handle leads without a developer.                           | Admin can create/edit/publish a product and change a lead's status without touching code                  |

### 2.2 Non-goals (v1)

- No online ordering, cart, checkout, payments or public prices.
- No currency switcher (no prices are shown anywhere).
- No customer accounts or login for buyers.
- No multi-language or international shipping content.
- No blog, gallery, reviews/testimonials page (v2).
- No CRM integration; leads live in the admin panel + email.
- No paid WhatsApp Business API — click-to-chat links only.

## 3. Phasing

The owner's stated priority: **v1 must first be a beautiful website; full functionality follows.** The build is phased so a polished, deployable site exists before the backend is complete.

| Phase  | Name             | Outcome                                                                                                                                                                                                                                                                                            | Ships publicly?   |
| ------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| **P1** | Showcase         | Every public page built to final design with final copy and AI-generated imagery. Catalog served from typed static content files. Quote form UI complete with client validation; while the backend is off, submission hands the buyer a pre-filled WhatsApp / email message so no enquiry is lost. | Yes (can go live) |
| **P2** | Quote pipeline   | Quote submissions saved to MongoDB, artwork uploads (≤ 3 files × 100 MB) stored on the VPS, admin notification + customer acknowledgement emails, spam protection.                                                                                                                                 | Yes               |
| **P3** | Admin panel      | Single-admin login; leads list/detail/status/notes/CSV export/file download; product & category CRUD with images and per-page SEO fields; catalog switches from static files to MongoDB.                                                                                                           | Yes               |
| **P4** | Launch hardening | GA4, Search Console, structured data audit, redirects, backups verified, placeholder check passes, performance budget met.                                                                                                                                                                         | Final launch      |

Detailed tasks live in `TASKS.md`.

## 4. Users and actors

| Actor                 | Description                                                                                                                                    | Primary needs                                                                                           |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **B2B buyer**         | Brand owner, procurement manager, D2C founder, garment manufacturer, distributor, retailer — anywhere in India. Mostly on mobile, often on 4G. | Understand what VasuPrint makes, trust it, send specs + artwork quickly, get a reply on WhatsApp/email. |
| **Apparel decorator** | Small/medium garment brand or print shop buying DTF / UV DTF transfers.                                                                        | Know which transfer suits which fabric/surface; upload artwork; order repeatably.                       |
| **Admin (1 person)**  | VasuPrint staff member who handles enquiries and keeps the catalog current. Non-developer.                                                     | Get notified instantly; see full spec + download artwork; track status; edit products without code.     |
| **Search engines**    | Google (primary), Bing.                                                                                                                        | Fast, server-rendered, unique, well-structured pages.                                                   |

## 5. User journeys

### J1 — Buyer requests a quote from a product page (primary journey)

1. Buyer lands on `/mono-carton-boxes` from Google.
2. Sees hero image, short pitch, key features, options (materials, printing, finishes), applications, FAQ.
3. Taps **Get a Quote** (sticky bar on mobile, button in hero on desktop).
4. Lands on `/get-a-quote?product=mono-carton-boxes`; category and product are pre-selected.
5. Fills size, quantity, material, finishing, delivery city, contact details; attaches up to 3 artwork files (each shows upload progress and can be removed).
6. Ticks consent to the privacy notice; Turnstile passes invisibly.
7. Submits → sees confirmation page with reference number (e.g. `VP-2026-000042`), what happens next, and a WhatsApp button.
8. Receives acknowledgement email with the reference.

**Edge cases**

- Upload fails mid-way → file row shows error + Retry; form cannot submit while any upload is in progress or failed (failed rows must be removed or retried).
- File > 100 MB or disallowed type → rejected client-side before upload with a specific message; server re-validates.
- Buyer has no artwork yet → uploads are optional.
- Network drops on submit → form keeps all values; error banner with retry.
- Unknown `?product=` slug → ignored silently, form shows empty selection.
- Bot submission → honeypot or Turnstile fails → generic error; nothing saved.
- Email provider down → lead is still saved; admin sees "email failed" badge and can resend.

### J2 — Buyer browses by category

Home → category card (e.g. **Stickers**) → `/custom-stickers` category page → product grid → product page → J1.

### J3 — Buyer contacts directly

Any page → floating WhatsApp button (desktop) / bottom bar WhatsApp action (mobile) → opens `wa.me` with pre-filled text including the current page name. Contact page also lists phone, email, address and map.

### J4 — Admin handles a new lead (P3)

1. Admin receives email "New quote VP-2026-000042 — Mono Carton Boxes — 5,000 pcs — Pune".
2. Clicks link → admin login (if needed) → lead detail.
3. Reviews spec, downloads artwork, taps "WhatsApp customer" (opens chat with customer's number).
4. Changes status `new → contacted → quoted → won/lost`, adds notes.
5. Periodically exports leads as CSV.

### J5 — Admin adds a new product (P3)

Admin → Products → New → fills name (slug auto-generated, editable), category, descriptions, features, specs, options, applications, FAQs, up to 6 images with alt text, SEO title/description → saves as Draft → previews → Publishes. The page appears in the site, nav and sitemap within seconds (on-demand revalidation).

### J6 — Admin renames a product slug (P3)

Changing a published product's slug automatically creates a 301 redirect from the old URL.

## 6. Functional requirements

IDs are referenced from `TASKS.md`.

### 6.1 Public site

| ID    | Requirement                                                                                                                                                                                                           | Phase                 |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| FR-01 | Pages: Home, About, Contact, Get a Quote, Quote Thank-you, 5 category pages, 13 product pages, Privacy Policy, Terms & Conditions, Shipping Policy, Refund & Cancellation Policy, 404.                                | P1                    |
| FR-02 | Header: logo, product mega-menu (5 categories with their products), About, Contact, primary **Get a Quote** button. Sticky, condenses on scroll.                                                                      | P1                    |
| FR-03 | Footer: brand blurb, quick links, products, contact info, policies, copyright line.                                                                                                                                   | P1                    |
| FR-04 | Product page: hero (gallery up to 6 images), intro, key features, specification table, available options (materials, printing, finishes), applications, "how ordering works" strip, FAQ, related products, quote CTA. | P1                    |
| FR-05 | Category page: hero, intro, product grid, why-choose strip, FAQ, CTA.                                                                                                                                                 | P1                    |
| FR-06 | Mobile: sticky bottom action bar on product/category pages with **WhatsApp** and **Get a Quote**.                                                                                                                     | P1                    |
| FR-07 | WhatsApp click-to-chat with page-aware pre-filled text.                                                                                                                                                               | P1                    |
| FR-08 | Quote form with fields in §6.2; product pre-selection via `?product=` or `?category=`.                                                                                                                                | P1 (UI), P2 (backend) |
| FR-09 | While `QUOTE_BACKEND=off`, a valid submission shows a hand-off screen with pre-filled WhatsApp and `mailto:` options containing the full spec.                                                                        | P1                    |
| FR-10 | Artwork upload: up to **3 files**, **≤ 100 MB each**, types CDR, AI, EPS, PDF, PSD, SVG, PNG, JPG/JPEG, TIFF, ZIP. Per-file progress, remove, retry.                                                                  | P2                    |
| FR-11 | On submit: lead saved with human reference `VP-YYYY-NNNNNN`; admin notification email; customer acknowledgement email; redirect to thank-you page showing the reference.                                              | P2                    |
| FR-12 | Spam protection: Cloudflare Turnstile, honeypot field, per-IP rate limits.                                                                                                                                            | P2                    |
| FR-13 | Consent checkbox linking to the Privacy Policy (DPDP Act 2023). Stored with the lead.                                                                                                                                 | P1 (UI), P2 (stored)  |
| FR-14 | UTM parameters and landing page captured with the lead.                                                                                                                                                               | P2                    |

### 6.2 Quote form fields

| Field                             | Type                          | Required | Validation                                                                                        |
| --------------------------------- | ----------------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| Full name                         | text                          | Yes      | 2–80 chars                                                                                        |
| Company name                      | text                          | No       | ≤ 120 chars                                                                                       |
| Mobile / WhatsApp number          | tel                           | Yes      | Indian mobile: 10 digits starting 6–9, optional `+91`/`0` prefix; stored as E.164 `+91XXXXXXXXXX` |
| Email address                     | email                         | Yes      | RFC-valid, ≤ 120 chars                                                                            |
| Product category                  | select                        | Yes      | One of 5 category slugs                                                                           |
| Product                           | select (filtered by category) | No       | Published product slug in that category, or "Not sure / Other"                                    |
| Required size                     | text                          | No       | ≤ 120 chars, e.g. "4 × 3 × 6 in" or "50 × 50 mm"                                                  |
| Required quantity                 | text                          | Yes      | ≤ 40 chars, e.g. "5,000 pcs"                                                                      |
| Material preference               | text                          | No       | ≤ 120 chars; placeholder suggests options from the selected product                               |
| Printing & finishing requirements | textarea                      | No       | ≤ 1,000 chars                                                                                     |
| Upload design / artwork           | files                         | No       | §FR-10                                                                                            |
| Delivery city                     | text                          | Yes      | ≤ 80 chars                                                                                        |
| Delivery state                    | select                        | Yes      | Indian states and UTs                                                                             |
| Additional requirements           | textarea                      | No       | ≤ 2,000 chars                                                                                     |
| Consent                           | checkbox                      | Yes      | Must be checked                                                                                   |

"Delivery city / country" from the brief becomes **city + state** because v1 is India-only.

### 6.3 Admin panel (P3)

| ID    | Requirement                                                                                                                                                            |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-30 | Single admin login (email + password), session cookie, logout, rate-limited login.                                                                                     |
| FR-31 | Dashboard: counts (new leads, leads this week, total leads, published products), latest 10 leads.                                                                      |
| FR-32 | Leads list: filter by status, search by reference/name/company/phone, paginate (25), sort newest first.                                                                |
| FR-33 | Lead detail: full spec, contact actions (call, WhatsApp, email), artwork downloads, status change, timestamped notes, email delivery status with "Resend admin email". |
| FR-34 | Leads CSV export (filtered), UTF-8 with BOM for Excel.                                                                                                                 |
| FR-35 | Delete lead (with confirmation) also deletes its artwork files.                                                                                                        |
| FR-36 | Products: list, create, edit, duplicate, draft/publish, reorder within category, delete (with confirmation).                                                           |
| FR-37 | Product images: upload to Cloudinary, up to 6, drag reorder, required alt text.                                                                                        |
| FR-38 | Per-product and per-category SEO title and description with live character counters and Google-style preview.                                                          |
| FR-39 | Categories: edit name, heading, intro, image, SEO, order. (Creating/deleting categories is allowed but warns that navigation changes.)                                 |
| FR-40 | Saving any catalog item revalidates affected pages, nav and sitemap immediately.                                                                                       |
| FR-41 | Slug change on a published item creates a 301 redirect automatically.                                                                                                  |

## 7. Non-functional requirements

| Area            | Requirement                                                                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Performance     | Mobile Lighthouse Performance ≥ 90 on product and home pages; LCP < 2.5 s and CLS < 0.1 on simulated 4G; JS shipped to public pages < 120 KB gzip (excluding the quote page). |
| Accessibility   | WCAG 2.2 AA: contrast, keyboard navigation, visible focus, labelled inputs, alt text, reduced-motion support.                                                                 |
| SEO             | Server-rendered HTML for all public pages; unique title/description; canonical URLs; JSON-LD; XML sitemap; robots.txt. See `SEO.md`.                                          |
| Security        | HTTPS only, HSTS, CSP, secure admin session, upload validation, no secret defaults. See `SECURITY.md`.                                                                        |
| Privacy         | DPDP Act 2023 notice and consent; leads and artwork retained indefinitely by owner decision; deletion on request via admin.                                                   |
| Availability    | Single VPS; target 99.5 %; nightly database and upload backups off-site; external uptime monitor.                                                                             |
| Browser support | Last 2 versions of Chrome, Safari (iOS 16+), Firefox, Edge; Samsung Internet.                                                                                                 |
| Scale           | Designed for ≤ 50k page views/month and ≤ 500 leads/month on a single VPS instance.                                                                                           |

## 8. Content and brand rules

- Brand name is always **VasuPrint** (one word, capital V and P). Never "Vasu Print".
- Only verified claims. No invented certifications, client logos, testimonials, years in business, machine counts or delivery guarantees. Any number that requires owner verification is listed in `CONTENT.md` §9 "Owner verification checklist".
- All personal and business details (owner names, phone, WhatsApp, email, address, GSTIN, quote inbox) come from one config file and are placeholders until supplied. A production build fails if any placeholder remains (see `ARCHITECTURE.md` §9).
- Images in P1 are AI-generated using `ASSET-PROMPTS.md`; real photography should replace them before or soon after launch.

## 9. Acceptance criteria (MVP launch)

1. All pages in FR-01 render server-side with final copy from `CONTENT.md`, pass the `UI-UX.md` quality checklist at 360 px, 768 px, 1280 px and 1440 px.
2. A buyer can submit a quote with 3 × 100 MB files on a throttled connection; lead appears in admin with downloadable files; both emails arrive.
3. Admin can create a product and see it live at its URL, in the nav and in `/sitemap.xml` without a redeploy.
4. Lighthouse thresholds in §7 met on `/`, `/mono-carton-boxes`, `/custom-stickers`.
5. Turnstile, honeypot and rate limits block automated submissions (verified by tests).
6. `pnpm check:placeholders` passes; no placeholder text visible anywhere.
7. Backups ran successfully at least once and a restore was tested.

## 10. Out of scope / v2 backlog

- Blog / guides (DTF vs UV DTF, choosing carton board) — strong SEO value.
- Gallery of real work; testimonials once verified.
- Remaining products: Offset Stickers, Custom DTF Stickers, Ink Transfer Stickers, Die-Cut Tags (addable from admin in P3 without code).
- International: country field, currency display, export shipping content, hreflang.
- Hindi language version.
- Multiple admin users and roles; password reset by email.
- Instant price estimator for standard sizes.
- Virus scanning of uploads (ClamAV).
- WhatsApp Business API notifications.

## 11. Open items (owner to supply)

| Item                                                                                     | Needed by   |
| ---------------------------------------------------------------------------------------- | ----------- |
| Business phone, WhatsApp number, business email, quote-recipient email(s)                | P2          |
| Registered address, Google Maps link, GSTIN, legal entity name, owner/proprietor name(s) | P4 (launch) |
| SMTP credentials (Gmail app password or Hostinger mailbox)                               | P2          |
| Final logo (or approval of AI logo)                                                      | P1 end      |
| Confirmation of values in `CONTENT.md` §9 (production times, claim windows, materials)   | P4          |
| Domain DNS access for vasuprint.com                                                      | P1 deploy   |
