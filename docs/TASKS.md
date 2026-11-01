# VasuPrint — Build Tasks

Work top to bottom. Each task is sized for one agent session and one PR. A task is done only when its acceptance criteria pass **and** the Definition of Done in `AGENTS.md` is met. Tick the box in the PR that completes it.

Phases map to `PRD.md` §3: **P1 Showcase** (M0–M4) → **P2 Quote pipeline** (M5) → **P3 Admin** (M6) → **P4 Launch** (M7).

Legend: `Dep:` tasks that must be merged first · `Docs:` sections to read before starting.

---

## M0 — Repository bootstrap (P1)

- [ ] **T-001 Scaffold Next.js app**
  Create Next.js 16 App Router project with TypeScript strict, `src/` dir, pnpm 10, Node 22 (`.nvmrc`, `engines`), `output: 'standalone'`, `trailingSlash: false`, `poweredByHeader: false`. Add path alias `@/*`. Commit `pnpm-lock.yaml`.
  *Accept:* `pnpm dev` serves a blank page; `pnpm build && node .next/standalone/server.js` works.
  *Docs:* ARCHITECTURE §2–3.

- [ ] **T-002 Tooling**
  ESLint flat config (`eslint-config-next`, `@typescript-eslint/strict`, `eslint-plugin-jsx-a11y`), Prettier + `prettier-plugin-tailwindcss`, `lint-staged` + `simple-git-hooks` (pre-commit: lint-staged; commit-msg: Conventional Commits check). Scripts: `dev, build, start, lint, typecheck, test, test:e2e, format, check:placeholders, db:seed, admin:hash, build:scripts`.
  *Accept:* `pnpm lint && pnpm typecheck` pass on a clean tree. *Dep:* T-001.

- [ ] **T-003 Testing setup**
  Vitest (jsdom for components, node for lib) + Testing Library; Playwright with projects `chromium-desktop` (1280×800) and `webkit-mobile` (iPhone 13); axe via `@axe-core/playwright`. One smoke test each.
  *Accept:* `pnpm test` and `pnpm test:e2e` green. *Dep:* T-001.

- [ ] **T-004 CI workflow**
  `.github/workflows/ci.yml` as in DEPLOYMENT §5.3 (reusable `workflow_call` + `pull_request`). Dependabot config.
  *Accept:* CI passes on a PR. *Dep:* T-002, T-003.

- [ ] **T-005 Env and config modules**
  `src/config/env.ts` (zod; conditional requirements per ARCHITECTURE §9.2; `server-only`), `src/config/business.ts` with `PLACEHOLDER`, `src/config/site.ts` (SITE_URL, nav built later from catalog), `.env.example`. `scripts/check-placeholders.ts` + wire into `build` when `NODE_ENV=production && ALLOW_PLACEHOLDERS!=='true'`.
  *Accept:* unit tests: missing secret throws when required; placeholder checker exits 1 on a placeholder and 0 when clean. *Dep:* T-002.

## M1 — Design system and layout shell (P1)

- [ ] **T-010 Tokens, fonts, globals**
  Implement `src/styles/globals.css` exactly as DESIGN-SYSTEM §10; Manrope + Inter via `next/font`; `cn()` helper.
  *Accept:* a `/_dev/tokens` page (dev only, excluded from build) shows the palette and type scale; contrast pairs match §2.2. *Docs:* DESIGN-SYSTEM §2–6.

- [ ] **T-011 UI primitives**
  shadcn/ui (copied, restyled to tokens): Button (all variants/sizes/loading), Input, Textarea, Select, Checkbox, Label, FormField (label/help/error wiring), Dialog, Sheet, Accordion, Badge, Tooltip, Skeleton, Separator. Storybook is **not** used; add a dev-only `/_dev/ui` gallery page.
  *Accept:* keyboard and focus states verified; Vitest render tests for Button and FormField a11y attributes. *Dep:* T-010. *Docs:* DESIGN-SYSTEM §9.

- [ ] **T-012 Motifs and icons**
  `components/site/motifs/{CropMarks,DielineFrame,RegistrationMark,FoldLine}.tsx` (SVG, `aria-hidden`, colour via `currentColor`), `icons/WhatsApp.tsx`, `useReveal` hook (IntersectionObserver, once, reduced-motion aware).
  *Accept:* rendered in `/_dev/ui`. *Dep:* T-010.

- [ ] **T-013 Catalog schemas + static repository**
  `src/schemas/{common,catalog}.ts` per SCHEMA §2–4; `CatalogRepository` interface; `StaticCatalog`; `src/lib/catalog/index.ts` selecting by `CATALOG_SOURCE`. Add one category + one product fixture to unblock UI work.
  *Accept:* unit tests: reserved slug rejected, duplicate slug across category/product detected, related slug integrity. *Dep:* T-005.

- [ ] **T-014 Header + mega-menu + mobile sheet**
  Per UI-UX §3.1, nav built from catalog. Scroll condense behaviour. *Accept:* Playwright: mega-menu opens on hover and Enter, Esc closes and returns focus; mobile sheet traps focus; axe clean. *Dep:* T-011, T-013.

- [ ] **T-015 Footer, floating WhatsApp, mobile action bar**
  Per UI-UX §3.2–3.4, `buildWhatsAppUrl()` in `src/lib/whatsapp.ts` (unit tested, encodes text).
  *Accept:* action bar appears after hero on product pages < 1024 px and never covers footer content. *Dep:* T-014.

- [ ] **T-016 Site layout + SEO helpers**
  `(site)/layout.tsx`, root layout (lang `en-IN`), skip link, `buildMetadata()`, `JsonLd` component, Organization JSON-LD (omits placeholder fields), `not-found.tsx`, `error.tsx`, `robots.ts`.
  *Accept:* every page has canonical + OG tags; 404 returns HTTP 404. *Dep:* T-014, T-015. *Docs:* SEO §4–6.

## M2 — Pages and content (P1)

- [ ] **T-020 Transcribe catalog content**
  All 5 categories and 13 products from CONTENT §5–6 into `src/content/**` (typed, `satisfies`). Unit test: every content file parses with zod; SEO titles/descriptions unique; lengths within limits.
  *Accept:* tests green; no copy invented beyond CONTENT.md. *Dep:* T-013.

- [ ] **T-021 Shared site sections**
  `SectionHeader`, `TrustStrip`, `FeatureCard`, `StepCard` + `ProcessSection`, `CTABand` (3 variants), `ProductCard`, `CategoryCard` (bento + standard), `SpecTable`, `OptionChips`, `FAQ` (+ FAQPage JSON-LD), `Breadcrumbs` (+ JSON-LD), `ApplicationsGrid`.
  *Accept:* all in `/_dev/ui` with real content; responsive at 360/768/1280. *Dep:* T-011, T-012.

- [ ] **T-022 Home page**
  Sections S1–S8 per UI-UX §4.1 with CONTENT §2. Hero image `priority`.
  *Accept:* matches wireframe at 4 widths; Lighthouse mobile perf ≥ 90 locally (with placeholder images). *Dep:* T-020, T-021.

- [ ] **T-023 `[slug]` resolver + category page**
  Resolver per ARCHITECTURE §4.1; `generateStaticParams`; category template per UI-UX §4.2; CollectionPage JSON-LD.
  *Accept:* all 5 category URLs render; unknown slug → 404. *Dep:* T-020, T-021.

- [ ] **T-024 Product page**
  Template per UI-UX §4.3: gallery (+ lightbox, mobile swipe), sticky sub-nav, all sections, related products, Product JSON-LD.
  *Accept:* all 13 product URLs render; Rich Results Test passes for Breadcrumb + FAQ; Playwright: thumbnail keyboard navigation. *Dep:* T-023.

- [ ] **T-025 About and Contact pages**
  Per UI-UX §4.7–4.8 and CONTENT §3–4; click-to-load map; LocalBusiness JSON-LD (omits placeholder fields).
  *Accept:* both pages pass the quality bar. *Dep:* T-021.

- [ ] **T-026 Policy pages**
  Four markdown files from CONTENT §7 with token replacement, policy template with sticky TOC per UI-UX §4.9. Unit test: token replacement, no raw `{{` left in output.
  *Accept:* all four render; † markers are **not** shown on the site (strip them). *Dep:* T-016.

- [ ] **T-027 Quote form UI + P1 hand-off**
  `/get-a-quote` per UI-UX §4.4–4.5, `quoteInputSchema` in `src/schemas/quote.ts` (shared), phone normaliser (unit tests from SCHEMA §5.1), `?product=`/`?category=` pre-selection, sessionStorage draft, error summary. With `QUOTE_BACKEND=off`: no uploads, hand-off panel with WhatsApp/mailto text.
  *Accept:* Playwright: from a product page CTA → form pre-filled → submit → hand-off panel → WhatsApp URL contains spec. axe clean. *Dep:* T-021, T-020.

- [ ] **T-028 Thank-you and 404 pages**
  Per UI-UX §4.6, §4.10. Thank-you reads `?ref=`, validates format, `noindex`.
  *Dep:* T-016.

- [ ] **T-029 Sitemap**
  `src/app/sitemap.ts` per SEO §6.
  *Accept:* sitemap lists 5 categories + 13 products + pages, no thank-you/admin. *Dep:* T-023.

## M3 — Brand and imagery (P1)

- [ ] **T-030 Logo and favicon set**
  Build SVG logo per ASSET-PROMPTS §2.2 (or chosen concept), white variant, mark, favicons, apple-touch icon, manifest icons, default OG image.
  *Accept:* crisp at 20 px mark and 120 px horizontal; renders in header/footer. *Dep:* T-014.

- [ ] **T-031 Generate and optimise imagery**
  Generate hero, 5 category, 4 page and 52 product images with ASSET-PROMPTS §3–4; `scripts/optimize-images.ts` (sharp) produces WebP/card/OG crops; review checklist §5; update alt texts in content if images differ.
  *Accept:* all image paths referenced by content exist; each ≤ 220 KB; visual consistency review passed. *Dep:* T-020.

- [ ] **T-032 Visual QA pass**
  Playwright screenshots at 360/390/768/1024/1280/1440 for Home, every category, 3 products, quote, about, contact; fix every UI-UX §9 quality-bar issue.
  *Accept:* owner sign-off on screenshots. *Dep:* T-022…T-031.

## M4 — Showcase deployment (P1)

- [ ] **T-040 VPS provisioning**
  Execute DEPLOYMENT §2–4 (user, firewall, Node, PM2, Nginx, TLS, DNS).
  *Accept:* `https://vasuprint.com` serves Nginx with valid TLS; www/http redirect. *(Owner + agent; needs VPS access.)*

- [ ] **T-041 Deploy pipeline**
  `scripts/deploy.sh`, `ecosystem.config.cjs`, `.github/workflows/deploy.yml`, health endpoint (`/api/health`).
  *Accept:* merge to `main` deploys automatically; failed health check rolls back. *Dep:* T-040, T-004.

- [ ] **T-042 Go live as showcase**
  Production env with `CATALOG_SOURCE=static`, `QUOTE_BACKEND=off`, `ALLOW_PLACEHOLDERS=true` only if owner details are still missing (otherwise fill `business.ts`).
  *Accept:* all pages live; hand-off flow works on a real phone; Lighthouse thresholds met on production. *Dep:* T-041, T-032.

## M5 — Quote pipeline (P2)

- [ ] **T-050 Database connection + models**
  `src/lib/db/connect.ts` (cached connection, `sanitizeFilter`), Mongoose models for Lead, Upload, Counter (SCHEMA §5–7) with `strict: 'throw'` and indexes.
  *Accept:* integration tests with mongodb-memory-server; index sync script. *Dep:* T-005.

- [ ] **T-051 Security utilities**
  `src/lib/security/{rate-limit,origin,ip,turnstile}.ts`; signed form-start timestamp; IP hashing with salt.
  *Accept:* unit tests for origin check, rate limiter windows, Turnstile verify (mocked). *Dep:* T-005. *Docs:* SECURITY §6.

- [ ] **T-052 Upload endpoint + FileStore**
  `LocalFileStore`, signature sniffing (`sniff.ts`) per SCHEMA §6, `POST /api/uploads`, `DELETE /api/uploads/:id`, orphan cleanup script.
  *Accept:* SECURITY §13 cases 3 pass; 100 MB file streams with flat memory usage (< 150 MB RSS during upload, measured in a test). *Dep:* T-050, T-051.

- [ ] **T-053 Quote endpoint**
  `POST /api/quotes` per API §1.3: honeypot, min-fill time, Turnstile, zod, upload ownership, counter reference, file promotion, lead save.
  *Accept:* SECURITY §13 cases 4–6, 9; reference increments atomically under 20 concurrent submissions. *Dep:* T-052.

- [ ] **T-054 Emails**
  Nodemailer transport, React Email templates (API §5), `after()` sending, delivery status written to lead; dev uses a local SMTP catcher (Mailpit via Docker) or Ethereal.
  *Accept:* snapshot tests of rendered HTML; failure path sets `failed` without affecting the 201 response. *Dep:* T-053.

- [ ] **T-055 Wire form to backend**
  With `QUOTE_BACKEND=on`: dropzone + UploadRow (XHR progress, 2 parallel, retry/remove), Turnstile widget, submit to `/api/quotes`, redirect to thank-you; 503 → hand-off fallback; UTM/landing capture (first-touch in sessionStorage).
  *Accept:* Playwright: upload 3 fixture files (incl. a 60 MB generated file) → submit → thank-you shows reference → lead and files exist → both emails captured. *Dep:* T-054, T-027.

- [ ] **T-056 Deploy P2**
  Atlas cluster, SMTP credentials, Turnstile keys, `UPLOAD_DIR`, cron for cleanup; `QUOTE_BACKEND=on`.
  *Accept:* real submission from a phone on 4G with a large file reaches the inbox. *Dep:* T-055, T-042.

## M6 — Admin panel (P3)

- [ ] **T-060 Admin auth**
  `pnpm admin:hash`, session (jose), `requireAdmin()`, login page + action with rate limits and dummy-hash timing, logout, `SESSION_VERSION`.
  *Accept:* SECURITY §13 cases 1, 2, 8; automated test enumerates every exported admin action and asserts rejection without a session. *Dep:* T-050.

- [ ] **T-061 Admin shell + dashboard**
  Layout, sidebar, responsive drawer, dashboard stats and latest leads (UI-UX §5). *Dep:* T-060.

- [ ] **T-062 Leads list, detail, actions**
  Filters, search, pagination, detail page, status/notes/resend/delete actions, file download route, CSV export with formula-injection guard.
  *Accept:* Playwright: login → open lead → change status → add note → download file → export CSV. *Dep:* T-061, T-055.

- [ ] **T-063 Mongo catalog + seed**
  Category/Product/Redirect models, `MongoCatalog` with cache tags, `scripts/seed.ts` from static content, switch `CATALOG_SOURCE=mongo` in staging.
  *Accept:* site renders identically from Mongo (screenshot diff ≤ 0.1 %). *Dep:* T-050, T-020.

- [ ] **T-064 Product editor**
  Product list (by category, reorder), create/edit/duplicate/publish/delete actions, ImageManager with `/api/admin/media` → Cloudinary, SEO fields with counters and preview, unsaved-changes guard, slug-change redirects, revalidation.
  *Accept:* Playwright: create draft → publish → visible at URL, in mega-menu and sitemap without redeploy; rename slug → old URL 301s. *Dep:* T-063.

- [ ] **T-065 Category editor**
  Edit/reorder/create/delete (guarded) categories. *Dep:* T-064.

- [ ] **T-066 Deploy P3**
  Cloudinary keys, admin credentials, `CATALOG_SOURCE=mongo`, run seed on production. *Dep:* T-062, T-065.

## M7 — Launch hardening (P4)

- [ ] **T-070 Security headers + CSP nonce** per SECURITY §7; verify with securityheaders.com (A or better). *Dep:* T-016.
- [ ] **T-071 Analytics** GA4 + events per SEO §8; Search Console verification + sitemap submit. *Dep:* T-055.
- [ ] **T-072 Backups + monitoring** DEPLOYMENT §6–8 including restore drill. *Dep:* T-056.
- [ ] **T-073 Owner content verification** Walk the owner through CONTENT §9; apply corrections; fill `business.ts`; remove `ALLOW_PLACEHOLDERS`. *Dep:* T-026.
- [ ] **T-074 Final QA** Full Playwright suite on production build, Lighthouse CI budgets, axe on all templates, DEPLOYMENT §9 go-live checklist. *Dep:* all.

---

## Owner actions (not agent tasks)

| When | Action |
|---|---|
| Before T-040 | Share VPS SSH access (add agent/CI public key), domain DNS access |
| Before T-042 | Approve logo + imagery (T-030/T-031), ideally supply business details |
| Before T-056 | Phone/WhatsApp, business email, quote inbox, SMTP credentials, Cloudflare account for Turnstile, Atlas account |
| Before T-066 | Admin email + password (generated in a password manager), Cloudinary account |
| Before T-073 | Legal name, address, GSTIN, owner names, jurisdiction city, confirm CONTENT §9 values |
