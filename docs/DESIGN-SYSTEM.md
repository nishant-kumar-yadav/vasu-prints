# VasuPrint — Design System

Direction from the brief: **Modern · Minimal · Premium · Trustworthy.** Navy, teal and white; generous whitespace; real product imagery; clear calls to action; no clutter and no "local print shop" look.

This file defines tokens and components. Page layouts and behaviour are in `UI-UX.md`. All values are implemented as Tailwind v4 `@theme` tokens in `src/styles/globals.css`. **Raw hex values are not allowed in components** — use tokens.

---

## 1. Brand personality

| We are                                                     | We are not                                               |
| ---------------------------------------------------------- | -------------------------------------------------------- |
| Precise, engineered, calm                                  | Loud, discount-driven, cluttered                         |
| Confident through specifics (materials, finishes, process) | Confident through superlatives ("No.1", "Best in India") |
| Industrial craft — dielines, paper, ink                    | Generic stock-photo corporate                            |
| Helpful and direct                                         | Pushy (no pop-ups, no countdowns)                        |

**Signature motif — "dieline" lines.** Thin (1–1.5 px) teal or navy-200 strokes drawn like packaging die-cut lines: dashed fold lines, corner crop marks and registration marks (⊕). Used sparingly: behind hero images, as section dividers, on the 404 page. Provided as SVG components in `src/components/site/motifs/` (`CropMarks`, `DielineFrame`, `RegistrationMark`, `FoldLine`).

## 2. Colour

### 2.1 Palette

| Token            | Hex                    | Use                                                                        |
| ---------------- | ---------------------- | -------------------------------------------------------------------------- |
| `navy-50`        | `#F2F5F9`              | Tinted surfaces                                                            |
| `navy-100`       | `#E3E9F1`              | Borders on tinted surfaces, chips                                          |
| `navy-200`       | `#C3CFDD`              | Dividers, motif strokes, disabled borders                                  |
| `navy-300`       | `#94A6BC`              | Placeholder text on navy                                                   |
| `navy-400`       | `#5F7894`              | Secondary text on navy-50                                                  |
| `navy-500`       | `#3A5573`              | —                                                                          |
| `navy-600`       | `#23405F`              | Hover on navy buttons                                                      |
| `navy-700`       | `#173452`              | —                                                                          |
| **`navy-800`**   | **`#102B46`**          | **Brand navy.** Dark sections, secondary buttons, header text              |
| `navy-900`       | `#0B1F33`              | Headings & body text, footer background                                    |
| `navy-950`       | `#07141F`              | Overlays                                                                   |
| `teal-50`        | `#E6F7F7`              | Highlight backgrounds, selected rows                                       |
| `teal-100`       | `#C2EDED`              | Focus halos                                                                |
| `teal-200`       | `#8EDEDE`              | —                                                                          |
| `teal-300`       | `#4FCACA`              | Accent text on navy backgrounds                                            |
| `teal-400`       | `#1AB6B6`              | Primary button hover                                                       |
| **`teal-500`**   | **`#00A6A6`**          | **Brand teal.** Primary button fill, icons, motif lines, active indicators |
| `teal-600`       | `#008F8F`              | Primary button active                                                      |
| `teal-700`       | `#007A7A`              | **Teal text/links on white** (contrast 5.2:1)                              |
| `teal-800`       | `#006262`              | Link hover                                                                 |
| `white`          | `#FFFFFF`              | Page background                                                            |
| `surface`        | `#F6F8FA`              | Alternate section background                                               |
| `surface-2`      | `#EEF2F6`              | Image wells, input backgrounds on surface                                  |
| `border`         | `#E2E8F0`              | Card and input borders                                                     |
| `text`           | `#0B1F33` (= navy-900) | Body and headings                                                          |
| `text-secondary` | `#475569`              | Supporting copy (7.6:1)                                                    |
| `text-muted`     | `#64748B`              | Captions, meta ≥ 14 px only (4.8:1)                                        |
| `success`        | `#15803D`              | Upload complete, success states                                            |
| `warning`        | `#B45309`              | Warnings                                                                   |
| `danger`         | `#B91C1C`              | Errors, destructive actions                                                |
| `whatsapp`       | `#25D366`              | WhatsApp **icon only**, never large fills                                  |

### 2.2 Contrast rules (verified)

| Pair                  | Ratio     | Allowed for                                                                  |
| --------------------- | --------- | ---------------------------------------------------------------------------- |
| navy-900 on white     | 16.7:1    | All text                                                                     |
| navy-800 on white     | 14.4:1    | All text                                                                     |
| white on navy-800     | 14.4:1    | All text                                                                     |
| navy-900 on teal-500  | 4.8:1     | Button labels (≥ 15 px, weight 600)                                          |
| teal-700 on white     | 5.2:1     | Links, eyebrow text                                                          |
| **teal-500 on white** | **3.0:1** | **Icons, lines, large display text ≥ 24 px only — never body text or links** |
| **white on teal-500** | **3.0:1** | **Not allowed** for button labels                                            |
| teal-300 on navy-800  | ~6.5:1    | Accent text on dark sections                                                 |

### 2.3 Colour proportions

Per page roughly **70 % white/surface, 20 % navy, 10 % teal**. Teal is the accent — if more than one teal-filled element is visible in a viewport (besides small icons), remove one.

## 3. Typography

| Role               | Family                                          | Weights       |
| ------------------ | ----------------------------------------------- | ------------- |
| Display & headings | **Manrope**                                     | 600, 700, 800 |
| Body & UI          | **Inter**                                       | 400, 500, 600 |
| Numerals in specs  | Inter with `font-variant-numeric: tabular-nums` | 500           |

Loaded with `next/font/google` (`display: 'swap'`, `subsets: ['latin']`), exposed as `--font-display` and `--font-sans`.

### 3.1 Type scale (fluid, 360 → 1440 px)

| Token     | Size                                               | Line height | Weight  | Tracking          | Use                       |
| --------- | -------------------------------------------------- | ----------- | ------- | ----------------- | ------------------------- |
| `display` | `clamp(2.25rem, 1.6rem + 2.9vw, 4rem)` (36→64)     | 1.05        | 800     | -0.03em           | Home hero H1              |
| `h1`      | `clamp(2rem, 1.55rem + 2vw, 3.25rem)` (32→52)      | 1.1         | 800     | -0.025em          | Page H1                   |
| `h2`      | `clamp(1.625rem, 1.35rem + 1.2vw, 2.5rem)` (26→40) | 1.15        | 700     | -0.02em           | Section titles            |
| `h3`      | `clamp(1.25rem, 1.15rem + 0.45vw, 1.5rem)` (20→24) | 1.25        | 700     | -0.015em          | Card titles               |
| `h4`      | 1.125rem (18)                                      | 1.35        | 600     | -0.01em           | Sub-headings              |
| `lead`    | `clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)` (17→20)  | 1.6         | 400     | 0                 | Intro paragraphs          |
| `body`    | 1rem (16)                                          | 1.65        | 400     | 0                 | Default text              |
| `small`   | 0.875rem (14)                                      | 1.5         | 400/500 | 0                 | Meta, captions            |
| `eyebrow` | 0.75rem (12)                                       | 1.2         | 600     | 0.14em, uppercase | Section labels (teal-700) |

Rules: max line length 68ch for body, 22ch for display; headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`; never centre-align more than 3 lines of body text.

## 4. Layout & spacing

- Base unit **4 px**. Allowed spacing steps: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128.
- **Container:** max-width 1240 px; side padding 16 px (< 640), 24 px (640–1023), 32 px (≥ 1024). Narrow container 760 px for policies and forms.
- **Section padding (vertical):** 64 px mobile, 96 px desktop; hero 48/80 top.
- **Grid:** 4 columns mobile, 8 tablet, 12 desktop; gutter 16 / 24 / 32.
- **Breakpoints:** `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1440`.

## 5. Shape, elevation, borders

| Token       | Value                                                            | Use                         |
| ----------- | ---------------------------------------------------------------- | --------------------------- |
| `radius-sm` | 6 px                                                             | Chips, badges, small inputs |
| `radius-md` | 10 px                                                            | Buttons, inputs             |
| `radius-lg` | 16 px                                                            | Cards, image wells          |
| `radius-xl` | 24 px                                                            | Hero media, CTA band        |
| `shadow-xs` | `0 1px 2px rgb(11 31 51 / 0.06)`                                 | Inputs                      |
| `shadow-sm` | `0 1px 3px rgb(11 31 51 / 0.06), 0 1px 2px rgb(11 31 51 / 0.04)` | Cards at rest               |
| `shadow-md` | `0 8px 24px -6px rgb(11 31 51 / 0.12)`                           | Card hover, dropdowns       |
| `shadow-lg` | `0 24px 48px -12px rgb(11 31 51 / 0.18)`                         | Mega-menu, dialogs          |
| Border      | 1 px `border` token                                              | Cards, inputs, tables       |

Prefer borders + whitespace over shadows. Never stack more than one shadow level in a component.

## 6. Motion

| Token           | Value                           |
| --------------- | ------------------------------- |
| `duration-fast` | 150 ms (hover, focus)           |
| `duration-base` | 220 ms (menus, accordions)      |
| `duration-slow` | 420 ms (section reveal)         |
| `ease-out`      | `cubic-bezier(0.16, 1, 0.3, 1)` |

Allowed motion: hover lift of cards (`translateY(-2px)` + `shadow-md`), image zoom on card hover (`scale(1.03)` inside `overflow-hidden`), section reveal once (`opacity 0→1`, `translateY 12px→0`) via a tiny IntersectionObserver hook, mega-menu fade/slide 8 px, accordion height.

Not allowed (brief: "avoid excessive animation"): auto-playing carousels, parallax, counters that count up, typewriter text, bouncing CTAs, cursor effects, page-transition animations, scroll-jacking, Lottie on public pages.

`@media (prefers-reduced-motion: reduce)` → all transitions ≤ 1 ms, no reveal transforms.

## 7. Iconography

- **lucide-react**, stroke width 1.5, sizes 16 / 20 / 24 / 32.
- Feature icons sit in a 44 px square `radius-md` tile, `teal-50` background, `teal-700` icon.
- WhatsApp uses the official glyph (inline SVG in `components/site/icons/WhatsApp.tsx`) in `whatsapp` green or white on navy.
- Do not mix icon libraries; do not use emoji in UI.

## 8. Imagery

- **Product photos:** studio look, soft daylight, seamless light-grey (`#F1F4F7`) background, 3/4 angle, natural shadows, no props clutter. Aspect ratio **4:3** for galleries and heroes, **1:1** for cards. See `ASSET-PROMPTS.md` for the generation prompts.
- **Context photos** (used in heroes/CTA bands): hands holding a carton, labels on bottles, DTF transfer on a T-shirt on a heat press, UV DTF decal on a glass jar — shallow depth of field, navy/teal tones in props where natural.
- Image wells use `surface-2` background so loading looks intentional; always set `width`/`height` or `fill` + `sizes` (no CLS).
- No stock-photo people shaking hands, no clip-art, no 3D mockups with fake brand names, no visible text other than generic "Your Brand".

## 9. Components

Components live in `src/components/ui` (primitives) and `src/components/site` (composed). Every component must have keyboard and focus states and support `className` override via `cn()`.

### 9.1 Button

| Variant           | Rest                                           | Hover                       | Active      | Use                                                |
| ----------------- | ---------------------------------------------- | --------------------------- | ----------- | -------------------------------------------------- |
| `primary`         | bg teal-500, text navy-900, weight 600         | bg teal-400                 | bg teal-600 | The one main action per view (Get a Quote, Submit) |
| `secondary`       | bg navy-800, text white                        | bg navy-600                 | bg navy-900 | Secondary strong action (Explore Products)         |
| `outline`         | 1 px navy-200, text navy-800, bg white         | border navy-800, bg navy-50 | bg navy-100 | Tertiary                                           |
| `outline-inverse` | 1 px white/40, text white                      | bg white/10                 | —           | On navy sections                                   |
| `ghost`           | text navy-800                                  | bg navy-50                  | —           | Toolbar, admin                                     |
| `link`            | text teal-700, underline offset 4              | text teal-800               | —           | Inline                                             |
| `whatsapp`        | `outline` + WhatsApp icon in `whatsapp` colour | as outline                  | —           | WhatsApp actions                                   |
| `danger`          | bg danger, text white                          | darker                      | —           | Admin destructive                                  |

Sizes: `sm` 36 px (admin only), `md` 44 px, `lg` 52 px (hero, forms). Padding x: 14 / 18 / 24 px. Radius `radius-md`. Icon gap 8 px; trailing arrow icon `ArrowRight` 18 px animates `translateX(2px)` on hover. Loading state: spinner replaces leading icon, label kept, `aria-busy`. Focus: 2 px `teal-500` outline, 2 px offset.

### 9.2 Form controls

- Height 48 px (all breakpoints), `radius-md`, 1 px `border`, bg white, text 16 px (prevents iOS zoom), placeholder `text-muted`.
- Label above input, 14 px weight 500, `navy-900`. Required fields carry no marker; _optional_ fields show "(optional)" in `text-muted` after the label (most fields are required, so marking the exceptions is quieter). Inputs still set `required` / `aria-required`.
- Help text 14 px `text-secondary` below; error text 14 px `danger` with `AlertCircle` 16 px icon, linked via `aria-describedby`.
- Focus: border teal-500 + 3 px `teal-100` ring. Error: border danger + 3 px danger/15 ring.
- Select: Radix Select styled identically; native `<select>` on mobile is acceptable for state list.
- Checkbox: 20 px, radius 4, checked fill teal-500 with navy-900 check.
- **FileDropzone:** dashed 1.5 px navy-200 border (dieline style), `radius-lg`, 160 px min height, icon `UploadCloud` 32 px teal-500, text "Drag files here or **browse**", sub-text "CDR, AI, EPS, PDF, PSD, SVG, PNG, JPG, TIFF or ZIP · up to 3 files · 100 MB each". Drag-over: border teal-500, bg teal-50.
- **UploadRow:** file-type badge (e.g. `CDR`), name (truncate middle), size, progress bar 4 px (teal-500 on navy-100), status (Uploading 45 % / Uploaded ✓ success / Failed – Retry), remove button (`X`, 44 px hit area).

### 9.3 Cards

| Card           | Spec                                                                                                                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CategoryCard` | `radius-lg`, border, image top 4:3 (or full-bleed with navy gradient overlay for bento large tiles), title h3, tagline 2 lines, product count "3 products", arrow link. Whole card clickable (single `<a>`), hover lift. |
| `ProductCard`  | image 1:1 in `surface-2` well, category eyebrow, name h3 (18 px on mobile), summary 2 lines clamp, two actions: "View details" (link) and "Get a Quote" (outline sm).                                                    |
| `FeatureCard`  | icon tile, title h4, body small; no border on white sections, border on surface sections.                                                                                                                                |
| `StepCard`     | number in 40 px circle (navy-800 bg, white Manrope 700), title, body; connected by a dashed `FoldLine` on desktop.                                                                                                       |

### 9.4 Other components

- **Badge / Chip:** 28 px height, `radius-sm`, navy-50 bg, navy-800 text 13 px 500. Option chips on product pages.
- **SpecTable:** 2-column definition table, label 40 % (text-secondary 14 px 500), value (navy-900 15 px), row divider `border`, zebra none, `tabular-nums`. Mobile: stacked label over value.
- **Accordion (FAQ):** Radix Accordion or `<details>`; question h4 18 px; `Plus` icon rotates 45° on open; 1 px dividers; answer 16 px text-secondary.
- **SectionHeader:** eyebrow (teal-700) → h2 → lead (text-secondary, max 60ch). Alignment left by default; centred only for CTA band and process section.
- **Breadcrumbs:** 14 px text-muted, `ChevronRight` 14 px separators, current page navy-900 500; emits BreadcrumbList JSON-LD.
- **CTABand:** navy-800 background, `radius-xl` inside container, crop-mark motif in corners (teal-500 at 40 % opacity), h2 white, lead navy-100, primary + `outline-inverse` WhatsApp button.
- **TrustStrip:** row of 4–6 icon+label items on white with dividers (e.g. "Custom sizes", "Bulk orders", "Artwork support", "Pan-India dispatch"). No numbers unless verified.
- **Toast:** bottom-centre on mobile, top-right desktop; used only in admin.
- **Skeleton:** `surface-2` blocks with 1.2 s shimmer (disabled with reduced motion).

### 9.5 Admin UI

Same tokens, denser: base text 14 px, controls 40 px (`sm` buttons 36 px), sidebar navy-900 with white/70 labels and teal-300 active indicator bar, content on `surface`, white cards. Tables: sticky header, 52 px rows, status badges (`new` teal-50/teal-800, `contacted` navy-50/navy-800, `quoted` amber-50/warning, `won` green-50/success, `lost` slate-100/text-muted).

## 10. Tailwind v4 token file (excerpt to implement verbatim)

```css
/* src/styles/globals.css */
@import 'tailwindcss';

@theme {
  --color-navy-50: #f2f5f9;
  --color-navy-100: #e3e9f1;
  --color-navy-200: #c3cfdd;
  --color-navy-300: #94a6bc;
  --color-navy-400: #5f7894;
  --color-navy-500: #3a5573;
  --color-navy-600: #23405f;
  --color-navy-700: #173452;
  --color-navy-800: #102b46;
  --color-navy-900: #0b1f33;
  --color-navy-950: #07141f;
  --color-teal-50: #e6f7f7;
  --color-teal-100: #c2eded;
  --color-teal-200: #8edede;
  --color-teal-300: #4fcaca;
  --color-teal-400: #1ab6b6;
  --color-teal-500: #00a6a6;
  --color-teal-600: #008f8f;
  --color-teal-700: #007a7a;
  --color-teal-800: #006262;
  --color-surface: #f6f8fa;
  --color-surface-2: #eef2f6;
  --color-border: #e2e8f0;
  --color-text: #0b1f33;
  --color-text-secondary: #475569;
  --color-text-muted: #64748b;
  --color-success: #15803d;
  --color-warning: #b45309;
  --color-danger: #b91c1c;
  --color-whatsapp: #25d366;

  --font-display: var(--font-manrope), ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --shadow-xs: 0 1px 2px rgb(11 31 51 / 0.06);
  --shadow-sm: 0 1px 3px rgb(11 31 51 / 0.06), 0 1px 2px rgb(11 31 51 / 0.04);
  --shadow-md: 0 8px 24px -6px rgb(11 31 51 / 0.12);
  --shadow-lg: 0 24px 48px -12px rgb(11 31 51 / 0.18);

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --breakpoint-2xl: 1440px;
}

@layer base {
  html {
    color: var(--color-text);
    background: #fff;
    -webkit-font-smoothing: antialiased;
  }
  body {
    font-family: var(--font-sans);
    font-size: 1rem;
    line-height: 1.65;
  }
  h1,
  h2,
  h3,
  h4 {
    font-family: var(--font-display);
    text-wrap: balance;
  }
  p {
    text-wrap: pretty;
  }
  :focus-visible {
    outline: 2px solid var(--color-teal-500);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition-duration: 1ms !important;
      animation-duration: 1ms !important;
    }
  }
}
```
