# VasuPrint — UI/UX Specification

v1's first job is to be **beautiful**. This document tells an agent exactly what each screen looks like and how it behaves. Tokens and components come from `DESIGN-SYSTEM.md`; copy comes from `CONTENT.md`; images from `ASSET-PROMPTS.md`.

---

## 1. UX principles

1. **Every scroll ends at a quote.** Every page has one primary action — *Get a Quote* — reachable within one thumb tap on mobile (sticky bar) and visible in the header on desktop.
2. **Specifics build trust.** Show materials, board types, finishes, formats and process, not adjectives. A buyer should learn something on every product page.
3. **Calm confidence.** Whitespace, a strict grid, two typefaces, one accent colour. If a section feels busy, remove an element.
4. **Mobile first, desktop impressive.** Design at 360 px first; at ≥ 1280 px use the extra space for larger imagery and asymmetric layouts, not more content.
5. **No dead ends.** 404, thank-you and policy pages all offer a next step.
6. **Fast is a feature.** Server-rendered HTML, one hero image prioritised, no carousels, no layout shift.

## 2. Information architecture

```
/
├── /packaging-boxes                    (category)
│   ├── /mono-carton-boxes
│   ├── /sbs-boxes
│   └── /duplex-boxes
├── /custom-stickers                    (category)
│   ├── /paper-gumming-stickers
│   ├── /vinyl-gumming-stickers
│   ├── /pvc-gumming-stickers
│   └── /die-cut-stickers
├── /dtf-stickers                       (category)
│   ├── /dtf-transfer-stickers
│   └── /dtf-heat-transfer-stickers
├── /uv-dtf-stickers                    (category)
│   ├── /uv-dtf-sticker-printing
│   └── /custom-uv-transfer-stickers
├── /custom-tags                        (category)
│   ├── /custom-hang-tags
│   └── /plastic-tags
├── /about
├── /contact
├── /get-a-quote  →  /get-a-quote/thank-you
├── /privacy-policy · /terms-and-conditions · /shipping-policy · /refund-policy
└── /admin/** (noindex)
```

Navigation (brief §7): Home · Packaging Boxes · Stickers · DTF Stickers · UV DTF Stickers · Tags · About Us · Contact Us · **Get a Quote**. On desktop the five product items live under one **Products** mega-menu trigger *plus* the brief's direct items are reachable in one click inside it; this keeps the header uncluttered (see §3.1).

## 3. Global layout

### 3.1 Header

**Desktop (≥ 1024 px)** — height 76 px, white, bottom border appears after 8 px scroll; condenses to 64 px with `shadow-sm` after 120 px.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ [VasuPrint logo]     Products ▾   About Us   Contact Us        ☏ +91 …   [ Get a Quote → ]│
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

**Products mega-menu** (opens on hover with 120 ms intent delay, and on click/Enter; closes on Esc, outside click, or route change):

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│  PACKAGING BOXES        STICKERS                 DTF STICKERS          ┌───────────────┐ │
│  Mono Carton Boxes      Paper Gumming Stickers   DTF Transfer Stickers │  [image]      │ │
│  SBS Boxes              Vinyl Gumming Stickers   DTF Heat Transfer     │ Not sure what │ │
│  Duplex Boxes           PVC Gumming Stickers                           │ you need?     │ │
│  View all →             Die-Cut Stickers         UV DTF STICKERS       │ Share your    │ │
│                         View all →               UV DTF Stickers       │ requirement → │ │
│  TAGS                                            Custom UV Transfer    └───────────────┘ │
│  Hang Tags · Plastic Tags · View all →           View all →                              │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```
Category headings are links (eyebrow style, teal-700). Built from the catalog, so new products appear automatically. `shadow-lg`, `radius-lg`, 8 px below header, max 1240 px.

**Mobile (< 1024 px)** — height 64 px: logo left; right side: `Get a Quote` (primary, `sm` 40 px) + menu button (44 px). Menu opens a full-height **Sheet** from the right: product categories as accordion groups (tap category name → category page; chevron → expands products), then About, Contact, divider, phone and WhatsApp rows, policy links small at bottom. Body scroll locked; focus trapped; Esc/close returns focus.

### 3.2 Mobile action bar

On category and product pages at < 1024 px, a fixed bottom bar (64 px + safe-area inset) appears after the hero scrolls out of view:

```
┌────────────────────────────────────────────┐
│  [ WhatsApp ]        [   Get a Quote →   ] │   (1 : 2 width ratio)
└────────────────────────────────────────────┘
```
White, top border, `shadow-md` upward. Page gets bottom padding so the footer is never covered. Hidden on `/get-a-quote`.

### 3.3 Floating WhatsApp button

Desktop only (≥ 1024 px), bottom-right 24 px, 56 px circle, white bg + WhatsApp glyph in `whatsapp` green, `shadow-md`, tooltip "Chat on WhatsApp". Hidden on `/get-a-quote` and admin. No pulsing animation.

### 3.4 Footer

navy-900 background, white text, 80 px top padding.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ [logo-white]                    QUICK LINKS     OUR PRODUCTS       CONTACT                 │
│ Your destination for            Home            Packaging Boxes    ☏ +91 …                 │
│ customized printing,            About Us        Stickers           ✉ …                     │
│ packaging, stickers and         Products        DTF Stickers       ⌂ Address …             │
│ branding solutions.             Contact Us      UV DTF Stickers    [WhatsApp us]           │
│ [ Get a Quote → ]               Get a Quote     Tags                                       │
│ ─────────────────────────────────────────────────────────────────────────────────────────── │
│ © 2026 VasuPrint. All Rights Reserved.   Privacy · Terms · Shipping · Refund   GSTIN: …    │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```
Mobile: brand block, then two-column link groups, then contact, then legal row stacked. Column headings use eyebrow style in teal-300. Links white/80 → white on hover. A faint dieline `CropMarks` motif sits in the top-right corner at 15 % opacity.

## 4. Page specifications

Wireframes show desktop; the "Mobile" notes describe the 360–767 px layout. Copy keys refer to `CONTENT.md`.

### 4.1 Home (`/`)

**S1 — Hero** (white, with a `surface` panel behind the media)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  CUSTOM PRINTING & PACKAGING                 ┌────────────────────────────┐  │
│                                              │                            │  │
│  Printing & Packaging                        │   hero composition image   │  │
│  Solutions That Make                         │   (cartons, label rolls,   │  │
│  Your Brand Stand Out.                       │    DTF sheet, hang tags)   │  │
│                                              │  ⌐ crop marks in corners ¬ │  │
│  At VasuPrint, we provide customized …       │                            │  │
│                                              └────────────────────────────┘  │
│  [ Get a Quote → ]  [ Explore Products ]                                     │
│                                                                              │
│  ✓ Custom sizes  ✓ Bulk orders  ✓ Artwork support  ✓ Pan-India dispatch      │
└──────────────────────────────────────────────────────────────────────────────┘
```
- 12-col grid: copy cols 1–6, media cols 7–12; media `radius-xl`, 4:3 (desktop) `priority`.
- H1 uses `display` token, max 14ch per line. "Stand Out." may be wrapped in a teal-500 underline stroke (SVG, 3 px) — the only decorative flourish on the page.
- Mobile: eyebrow → H1 → paragraph → buttons full width stacked (primary first) → media below (16:11) → trust ticks as 2×2 grid.

**S2 — Introduction** (white): two columns — left `SectionHeader` (eyebrow "WHO WE ARE", h2 "Your Trusted Partner for Custom Printing & Packaging"), right two paragraphs + inline link "About VasuPrint →". Mobile stacks.

**S3 — Product categories** (`surface` background) — bento grid:

```
┌───────────────────────────────┬──────────────────────┐
│                               │   STICKERS           │
│   PACKAGING BOXES (large)     │   image + tagline    │
│   full-bleed image, navy      ├──────────┬───────────┤
│   gradient bottom, white text │ DTF      │ UV DTF    │
│                               │          │           │
├───────────────────────────────┴──────────┴───────────┤
│  TAGS (wide, image right, text left)                 │
└──────────────────────────────────────────────────────┘
```
- Each tile: name, tagline, product names as small chips (max 3 + "+2"), arrow. Large tiles use white text over `navy-950/70 → transparent` bottom gradient; small tiles use white card with image top.
- Mobile: single column, each tile 4:3 image card, in brief order.

**S4 — Why choose VasuPrint** (white): `SectionHeader` left-aligned ("Printing Solutions Designed Around Your Business"), 3×2 grid of `FeatureCard` (6 items from content). Mobile: 1 column with 24 px gaps; tablet 2 columns.

**S5 — Our process** (`navy-800` section, white text): centred header; 5 `StepCard`s in a row connected by a dashed teal fold line; mobile becomes a vertical timeline (line on the left, numbers on the line).

**S6 — Featured products** (white): header + "View all products" link right; 4 `ProductCard`s (featured flag) in a row; tablet 2×2; mobile horizontal scroll-snap row (cards 80 % width, visible next-card peek, no dots, no autoplay).

**S7 — Capabilities** (`surface`): two columns. Left: h2 "Materials, finishes and formats we work with" + paragraph. Right: three chip groups — *Boards & papers* (SBS, Duplex, Art card, Kraft, Chromo paper), *Films* (Vinyl, PVC, PET transfer film, UV DTF film), *Finishes* (Matte / gloss lamination, Spot UV, Foil stamping, Embossing, Die-cutting, Varnish). Only list what `CONTENT.md` confirms.

**S8 — CTA band:** "Looking for Custom Printing & Packaging Solutions?" + text + `Request a Free Quote` (primary) + `Chat on WhatsApp` (outline-inverse).

### 4.2 Category page (`/packaging-boxes` etc.)

1. **Breadcrumbs** (Home › Packaging Boxes).
2. **Hero** (white): left eyebrow (category name) + H1 (heading) + lead + buttons (Get a Quote → `/get-a-quote?category=<slug>`, WhatsApp); right category image 4:3 `radius-xl` with crop marks. Mobile: image after buttons.
3. **Products grid** (`surface`): h2 "Our {category} range", `ProductCard` grid 3 columns desktop / 2 tablet / 1 mobile.
4. **Highlights** (white): 3–4 `FeatureCard`s from `category.highlights`.
5. **How ordering works**: compact 5-step horizontal strip (same content as home process, smaller, white background).
6. **FAQ** (white, narrow container): accordion; emits FAQPage JSON-LD.
7. **CTA band** with category-aware heading: "Need custom {category name lowercased}?" + "Share your size, material and quantity — we'll send a quotation."

### 4.3 Product page (`/mono-carton-boxes` etc.) — the most important template

```
Home › Packaging Boxes › Mono Carton Boxes
┌───────────────────────────────────────┬─────────────────────────────────────┐
│ ┌───────────────────────────────────┐ │ PACKAGING BOXES                     │
│ │                                   │ │ Mono Carton Boxes for Retail,       │
│ │        main image 4:3             │ │ Pharma & FMCG Brands                │
│ │                                   │ │                                     │
│ └───────────────────────────────────┘ │ summary (lead)                      │
│ [thumb][thumb][thumb][thumb]          │                                     │
│                                       │ ✓ feature 1  ✓ feature 2  ✓ feat 3  │
│                                       │                                     │
│                                       │ [ Get a Quote for this product → ]  │
│                                       │ [ WhatsApp ]   [ ☏ Call ]           │
│                                       │                                     │
│                                       │ ┌ Quick specs ────────────────────┐ │
│                                       │ │ Board      │ 250–400 GSM …      │ │
│                                       │ │ Printing   │ Offset CMYK + …    │ │
│                                       │ │ Finishes   │ Matte/Gloss …      │ │
│                                       │ └─────────────────────────────────┘ │
└───────────────────────────────────────┴─────────────────────────────────────┘
 Sticky sub-nav (desktop, appears after hero): Overview · Specifications · Options · Applications · FAQ   [Get a Quote]
```

Sections below the hero:
1. **Overview** — intro paragraphs (narrow column 7/12) + right column "Key features" list with icons.
2. **Specifications** — full `SpecTable`.
3. **Options** — four chip groups: Materials, Printing, Finishes, Formats/Styles. Under them: note "Don't see what you need? Mention it in your quote request — we'll confirm feasibility."
4. **Applications** — 3–4 column grid of small cards with icon + label (e.g. "Cosmetics", "Pharmaceuticals").
5. **How ordering works** — same 5-step strip.
6. **FAQ** — accordion (FAQPage JSON-LD).
7. **Related products** — up to 4 `ProductCard`s.
8. **CTA band** — "Need custom sizes, materials or printing?" / `Get Custom Quotation`.

Gallery behaviour: thumbnails are buttons (`aria-pressed`), arrow keys move between thumbnails; clicking main image opens a lightbox Dialog (pinch-zoom on mobile via native image zoom; no extra library). Mobile: main image full-bleed edge-to-edge (no radius) with horizontal swipe (CSS scroll-snap) and a "1 / 4" counter chip; thumbnails hidden.

Sticky sub-nav: desktop only, 56 px, white with bottom border, active section highlighted with teal-500 2 px underline (IntersectionObserver). Mobile uses the bottom action bar instead.

Quote CTA links to `/get-a-quote?product=<slug>`.

### 4.4 Get a Quote (`/get-a-quote`)

Two-column on desktop: form (cols 1–8) and a sticky side panel (cols 9–12). Single column on mobile, side panel content moves below the form as a compact block.

```
┌────────────────────────────────────────────────────┬─────────────────────────────┐
│ GET A QUOTE                                        │ ┌─ What happens next ─────┐ │
│ Tell us what you need                              │ │ 1 We review your specs  │ │
│ Share your specifications and our team will …      │ │ 2 Quotation on WhatsApp │ │
│                                                    │ │   / email               │ │
│ ① Product                                          │ │ 3 Artwork proof         │ │
│   Category [select]      Product [select]          │ │ 4 Production & dispatch │ │
│   Size (optional)        Quantity                  │ └─────────────────────────┘ │
│   Material (optional)                              │ Prefer to talk?             │
│   Printing & finishing (optional) [textarea]       │ [WhatsApp]  [Call]          │
│                                                    │ ✉ email                     │
│ ② Artwork (optional)                               │                             │
│   [ dashed dropzone ]                              │ 🔒 Your files stay private  │
│   ▸ carton-dieline.cdr  48 MB  ███████░░ 72%  ✕    │ and are used only for your  │
│                                                    │ order.                      │
│ ③ Your details                                     │                             │
│   Full name              Company (optional)        │                             │
│   Mobile / WhatsApp      Email                     │                             │
│   Delivery city          Delivery state [select]   │                             │
│   Additional requirements (optional) [textarea]    │                             │
│                                                    │                             │
│   ☐ I agree to VasuPrint contacting me … Privacy   │                             │
│   [ Request a Quote → ]  (full-width on mobile)    │                             │
└────────────────────────────────────────────────────┴─────────────────────────────┘
```

Behaviour:
- Fieldsets with numbered headings (①②③) as `<fieldset><legend>`. 2-column field pairs at ≥ 768 px, single column below.
- Pre-selection: `?product=` sets category + product and shows a small "Requesting a quote for **Mono Carton Boxes**" chip with an image thumbnail above the form (removable). `?category=` sets category only.
- Product select options filter by category; includes "Not sure / Other".
- Placeholders come from `product.quoteHints` when a product is selected; otherwise generic ("e.g. 100 × 50 mm").
- Validation: on blur per field, then on submit; on submit failure scroll to and focus the first invalid field; an error summary at the top lists issues as links (`role="alert"`).
- Phone input: `inputmode="tel"`, shows "+91" prefix adornment inside the input; accepts pasted formats; formats as `98765 43210` on blur.
- Uploads (P2): files start uploading immediately when added (parallel, max 2 at a time). Submit button disabled with label "Uploading files… (1 of 2)" until all uploads finish. Rejected files show inline reason and are not added.
- Submit button loading state: "Sending…" with spinner; double submit prevented.
- Turnstile widget: invisible/managed; if an interactive challenge appears, it renders directly above the submit button.
- Draft persistence: form values (not files) saved to `sessionStorage` on change, restored on return; cleared on success.

### 4.5 P1 hand-off panel (QUOTE_BACKEND=off)

After a valid submit, the form is replaced (scroll to top, focus heading) by:

```
✓ Your request is ready to send
Choose how you'd like to send it — your details are already filled in.
[ Send on WhatsApp → ]   [ Send by email ]
Have artwork files? Attach them in the WhatsApp chat or email.
[ Edit request ]
```
WhatsApp text format:
```
Hi VasuPrint, I'd like a quotation.
• Product: Mono Carton Boxes (Packaging Boxes)
• Size: 120 × 80 × 40 mm
• Quantity: 5,000 boxes
• Material: 350 GSM SBS
• Printing/finishing: Matte lamination, spot UV
• Delivery: Pune, Maharashtra
• Name: Ananya Rao (Rao Naturals Pvt Ltd)
• Phone: +91 98765 43210 · Email: ananya@raonaturals.in
• Notes: Need samples before bulk run.
```
`mailto:` uses the same text with subject "Quote request — Mono Carton Boxes".

### 4.6 Thank-you (`/get-a-quote/thank-you?ref=…`)

Centred narrow layout: success icon (teal-500 check in teal-50 circle, 64 px) → h1 "Thank you — we've received your request" → reference chip `VP-2026-000042` with copy button → paragraph "Our team will review your specifications and get back to you on WhatsApp or email, usually within one business day." (owner to confirm timing, see `CONTENT.md` §9) → 4-step "What happens next" → buttons: WhatsApp (pre-filled with reference) + "Continue browsing" → 3 product category links. `noindex`. Fires GA4 `generate_lead` event once.

### 4.7 About (`/about`)

1. Hero: eyebrow "ABOUT VASUPRINT", H1 "Your Partner in Printing, Packaging & Branding Solutions", lead; right: image of production/packaging work.
2. Story: 3 paragraphs in narrow column with a pull-quote style highlight of "Our goal is to make it easier for businesses to find suitable printing solutions under one roof."
3. Mission & Vision: two side-by-side cards on `surface` with icon tiles (`Target`, `Eye`).
4. What we make: 5 category mini-cards linking to categories.
5. How we work: 4 value cards (Customer-focused service, Product variety, Consistent quality, Clear communication).
6. CTA band.

### 4.8 Contact (`/contact`)

1. Hero: H1 "Let's Discuss Your Printing Requirements" + paragraph.
2. Two columns: left contact cards (Phone, WhatsApp, Email, Address, Business hours) each as a row with icon tile + label + value + action (Call / Chat / Email / Get directions). Right: compact enquiry form (same `QuoteForm` component in `compact` mode: name, phone, email, category, quantity, message, consent) **or** a card linking to the full quote page — v1 uses the compact form posting to the same endpoint (attachments only on the full page, with a link "Need to attach artwork? Use the full quote form").
3. Map: click-to-load placeholder (static image + "Load map" button) → Google Maps iframe (privacy + performance).

### 4.9 Policy pages

Narrow container (760 px). Header: breadcrumbs, H1, "Last updated: {date}". On desktop a sticky left table of contents (generated from h2s) in a 3/9 split. Body typographic styles: h2 24 px with 48 px top margin, lists with teal-500 bullets, tables bordered. Footer of page: "Questions about this policy?" card with contact actions.

### 4.10 404

Centred: `DielineFrame` motif illustration (an unfolded box dieline drawn in teal lines), h1 "This page didn't make the cut", paragraph, search-free: buttons "Go to homepage" + "Browse products", and the 5 category links.

## 5. Admin UX (P3)

- **Login:** centred card on `surface`, logo, email, password (show/hide toggle), submit; error inline; no other links.
- **Shell:** left sidebar 248 px (Dashboard, Leads with "new" count badge, Products, Categories, "View site ↗", Logout); collapses to top bar + drawer < 1024 px. Page header with title + primary action.
- **Dashboard:** 4 stat cards, "Latest leads" table (10 rows), "Drafts" list.
- **Leads list:** tabs by status with counts; search input (debounced 300 ms, URL-synced `?q=`); table columns: Reference, Date, Name/Company, Product, Qty, City, Files (paperclip count), Status badge. Row click → detail. Export CSV button respects filters. Empty state with illustration and "No leads yet — share your site link".
- **Lead detail:** two columns. Left: request spec table, files (name, type badge, size, Download), additional notes, source/UTM. Right sticky: customer card with Call / WhatsApp / Email buttons; status select (saves immediately, toast "Status updated"); notes timeline with add-note textarea; email delivery status with Resend; danger zone Delete (type reference to confirm).
- **Product editor:** single long form in sections with a sticky right column (Status, Save draft, Publish, Preview link, SEO preview). Sections: Basics (name, slug with lock icon and "changing creates a redirect" hint, category, heading, summary), Content (intro paragraphs as repeatable textareas), Features (repeatable, icon picker from a curated list of 24 lucide icons), Specs (repeatable label/value rows, drag reorder), Options (four tag inputs), Applications (tag input), FAQs (repeatable), Images (dropzone, grid with drag reorder, alt text required, first = cover), Quote hints, SEO (title/description with counters 60/160, turns warning colour beyond limit, Google snippet preview). Unsaved-changes guard on navigation.
- Every destructive action uses a confirmation Dialog; every save shows a toast; validation errors appear inline and in a summary at the top.

## 6. States and microcopy

| Situation | UI |
|---|---|
| Image loading | `surface-2` well, no spinner |
| Upload rejected — type | "**{name}** can't be uploaded. Use CDR, AI, EPS, PDF, PSD, SVG, PNG, JPG, TIFF or ZIP." |
| Upload rejected — size | "**{name}** is {size}. The limit is 100 MB per file — send larger files on WhatsApp or email." |
| Too many files | "You can attach up to 3 files. Remove one to add another." |
| Upload failed | "Upload failed. [Retry]" |
| Submit network error | Banner: "We couldn't send your request. Check your connection and try again — your details are saved." |
| Server unavailable (503) | Switch to hand-off panel (§4.5) with heading "Send your request on WhatsApp or email instead". |
| Rate limited | "You've sent several requests recently. Please try again in a few minutes or message us on WhatsApp." |
| Bot check failed | "We couldn't verify your request. Please refresh the page and try again." |

Voice: second person, plain English, short sentences. Spelling follows the owner-approved copy, which uses "customized", "color" and "labeling"; keep that spelling everywhere so the site is consistent. Write quantities with comma grouping ("5,000 pcs", "50,000 labels"), and avoid lakh/crore in specs.

## 7. Responsive rules

| Breakpoint | Key changes |
|---|---|
| < 640 | Single column; full-width buttons in heroes and forms; product gallery edge-to-edge; mobile action bar |
| 640–1023 | 2-column grids; header still mobile; forms 2-column pairs from 768 |
| 1024–1279 | Desktop header & mega-menu; 3-column product grids; sticky sub-nav on product pages |
| ≥ 1280 | Hero media larger (cols 7–12 bleeding to container edge); bento grid full layout |

Test widths: 360, 390, 768, 1024, 1280, 1440. No horizontal scroll at any width. Touch targets ≥ 44 × 44 px.

## 8. Accessibility checklist

- [ ] Semantic landmarks: `header`, `nav` (labelled "Main"/"Footer"), `main`, `footer`; one `h1` per page; heading levels not skipped.
- [ ] Skip link "Skip to content" as first focusable element.
- [ ] All interactive elements reachable and operable by keyboard; visible focus ring everywhere.
- [ ] Mega-menu: `button[aria-expanded]` trigger, Esc closes, focus returns.
- [ ] Form: every input has a `<label>`; errors via `aria-describedby` + `aria-invalid`; error summary `role="alert"`; upload progress announced via `aria-live="polite"`.
- [ ] Images: meaningful `alt` from content; decorative motifs `aria-hidden`.
- [ ] Contrast per `DESIGN-SYSTEM.md` §2.2; never convey status by colour alone.
- [ ] `prefers-reduced-motion` respected.
- [ ] Zoom to 200 % without loss of content; text spacing overrides don't break layout.
- [ ] axe-core run in Playwright on key pages: zero serious/critical violations.

## 9. Premium quality bar (review before every UI PR)

A page is not done until all are true:

1. **Alignment:** every element snaps to the 12-column grid and 4 px spacing scale; left edges of headings, text and buttons line up.
2. **Rhythm:** consistent section padding (64/96); no two adjacent sections share the same background unless separated by a divider.
3. **Hierarchy:** one primary (teal) button per viewport; eyebrow → heading → lead pattern used consistently.
4. **Imagery:** all images share the same lighting/background style; no stretched, pixelated or watermarked images; same aspect ratio within a grid.
5. **Copy fit:** no orphaned single words in headings (`text-wrap: balance`); no truncated text without intent; card titles equal height in a row.
6. **States:** hover, focus, active, disabled, loading, error, empty — all designed.
7. **Mobile:** looks intentional at 360 px, not just "stacked desktop".
8. **Performance:** no layout shift on load; hero image is the LCP and loads first.
9. **Restraint:** nothing blinks, bounces, auto-rotates or pops up.
10. **Consistency:** uses only tokens and components from `DESIGN-SYSTEM.md`.

**Anti-patterns (reject in review):** rainbow gradients; more than 2 font families; ALL-CAPS body text; centred long paragraphs; icon soup (> 6 icons in a row); stock handshake photos; fake counters ("5000+ happy clients"); unverified badges ("ISO certified"); pop-up modals on load; marquee tickers; dark patterns on the form; cramped cards with < 20 px padding.
