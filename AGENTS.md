# AGENTS.md — VasuPrint

Instructions for every AI coding agent working in this repository. Read this file fully before any task. When a rule here conflicts with a habit or a generic best practice, this file wins. When it conflicts with an explicit instruction from the owner in the task, the owner wins — then update this file in the same PR.

## 1. What we're building

**vasuprint.com** — a premium B2B website for VasuPrint, an Indian manufacturer of custom packaging boxes, stickers, DTF / UV DTF transfers and tags. Buyers browse categories and products and send a **quote request** (with artwork upload). There are no prices, no cart and no checkout. One admin manages leads and the catalog.

**v1 priority: the site must look beautiful and premium first.** Functionality is phased (Showcase → Quote pipeline → Admin → Launch). Never ship UI that fails the quality bar in `docs/UI-UX.md` §9, even if it "works".

**Repository:** https://github.com/nishant-kumar-yadav/vasu-prints (default branch `main`). All docs live in this repo; clone it to start work.

## 2. Read before you code

| Doc                     | When                                                              |
| ----------------------- | ----------------------------------------------------------------- |
| `docs/TASKS.md`         | Always — find your task, its dependencies and acceptance criteria |
| `docs/PRD.md`           | Scope questions, form fields, acceptance criteria                 |
| `docs/ARCHITECTURE.md`  | Structure, stack, data flow, env vars                             |
| `docs/UI-UX.md`         | Any UI work — page layouts, behaviour, states, quality bar        |
| `docs/DESIGN-SYSTEM.md` | Any UI work — tokens and components                               |
| `docs/CONTENT.md`       | Any copy — **never write marketing copy yourself**                |
| `docs/SCHEMA.md`        | Models, zod schemas, content files                                |
| `docs/API.md`           | Route handlers, Server Actions, emails                            |
| `docs/SECURITY.md`      | Auth, uploads, input handling, headers                            |
| `docs/SEO.md`           | Metadata, JSON-LD, sitemap, URLs                                  |
| `docs/ASSET-PROMPTS.md` | Generating images or the logo                                     |
| `docs/DEPLOYMENT.md`    | Server, CI/CD, backups                                            |
| `docs/adr/`             | Why key decisions were made — don't re-litigate without a new ADR |

## 3. Stack (do not substitute)

Node 22 · pnpm 10 · Next.js 16 App Router · React 19 · TypeScript strict · Tailwind CSS 4 · shadcn/ui (Radix) · lucide-react · react-hook-form + zod · Mongoose 8 (MongoDB Atlas) · busboy · Nodemailer + React Email · Cloudinary (product images only) · Cloudflare Turnstile · jose + argon2 · pino · Vitest · Playwright · PM2 + Nginx on a Hostinger VPS.

Adding a dependency requires: a one-line justification in the PR description, an actively maintained package, and no overlap with an existing one. Never add: Express, axios, lodash (use native), moment/dayjs unless needed for IST formatting (prefer `Intl.DateTimeFormat` with `timeZone: 'Asia/Kolkata'`), Redux/Zustand, styled-components/emotion, Bootstrap, jQuery, Framer Motion on public pages, any analytics other than GA4.

## 4. Commands

```bash
pnpm install            # install
pnpm dev                # http://localhost:3000
pnpm lint               # ESLint
pnpm typecheck          # tsc --noEmit
pnpm test               # Vitest (unit + integration)
pnpm test:e2e           # Playwright (needs `pnpm build` first in CI mode)
pnpm build              # production build (fails on placeholders unless ALLOW_PLACEHOLDERS=true)
pnpm format             # Prettier write
pnpm db:seed            # static content → MongoDB
pnpm admin:hash         # generate ADMIN_PASSWORD_HASH
pnpm check:placeholders # scan for unfilled business details
```

Local services for P2+: `docker run -d -p 8025:8025 -p 1025:1025 axllent/mailpit` (SMTP catcher). Tests use mongodb-memory-server; no local Mongo needed. Turnstile test keys: site `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`.

## 5. Code rules

### 5.1 TypeScript

- `strict: true`, `noUncheckedIndexedAccess: true`. No `any`; use `unknown` + narrowing. No `@ts-ignore` (use `@ts-expect-error` with a reason, only in tests).
- Types for data come from zod: `type Product = z.infer<typeof productSchema>`. Do not hand-write duplicate interfaces.
- Named exports everywhere except Next.js files that require default exports (`page`, `layout`, etc.).

### 5.2 Next.js

- **Server Components by default.** Add `'use client'` only for interactivity, at the smallest possible leaf component. Never import server-only modules (`@/lib/db`, `@/config/env`, models, email) into client components — those modules import `server-only`.
- Public pages never fetch from our own API; they call the catalog repository directly.
- Admin mutations are Server Actions; **every action starts with `await requireAdmin()`**, then zod-parses its input, then maps fields explicitly.
- Route handlers: `export const runtime = 'nodejs'`; check `Origin` on state-changing methods; return errors in the shape defined in `docs/API.md`.
- Use `next/image` for every raster image with `sizes`; `next/link` for internal links; `next/font` only.
- After catalog writes, call the revalidation set listed in `docs/API.md` §4.2.

### 5.3 Styling

- Tailwind utilities with **tokens only** (`bg-navy-800`, `text-teal-700`, `rounded-lg`). No raw hex, no arbitrary values (`w-[437px]`) unless documented in a comment why.
- Teal text on white must be `text-teal-700`, never `text-teal-500`. Button label on teal fill is `text-navy-900`.
- One primary (teal) button per viewport. Follow the motion whitelist in `docs/DESIGN-SYSTEM.md` §6 — no carousels, parallax, counters or pop-ups.
- Mobile-first classes (`base` = mobile, then `md:`, `lg:`). Check 360 px before anything else.

### 5.4 Content and brand

- Copy comes from `docs/CONTENT.md` → `src/content/**`. If you need copy that doesn't exist, stop and ask the owner (leave a clearly marked question in the PR), don't invent it.
- Brand name is always **VasuPrint**.
- **Never invent** certifications, client names, testimonials, statistics, years in business, delivery guarantees or prices.
- All personal/business details come from `src/config/business.ts`. Never hard-code a phone number, email or address anywhere else.
- Do not mention, reference or copy branding from any other company or website in code, comments, commit messages, content or docs.

### 5.5 Data and security

- Validate every external input with zod (bodies, params, search params, action args).
- Never spread request data into Mongoose (`Model.create(req.body)` is forbidden).
- Never log PII (names, phones, emails, file contents). Log references and ids.
- Never serve artwork from `public/` or any static path; only via the admin download route.
- No default values for secrets. Missing config should crash at startup, not fall back.
- Read `docs/SECURITY.md` before touching auth, uploads, headers or the quote endpoint.

### 5.6 Files and naming

- Components: `PascalCase.tsx`, one component per file, colocated `*.test.tsx`.
- Hooks: `useThing.ts`. Utilities: `kebab-case.ts`. Content files: `<slug>.ts`.
- Keep files under ~250 lines; split by responsibility.
- Comments explain _why_, not _what_. No commented-out code. No `TODO` without a linked task ID (`// TODO(T-064): …`).

## 6. Testing requirements

- New logic in `src/lib`, `src/schemas` → unit tests (Vitest).
- New route handler or Server Action → integration test covering success, validation failure and auth failure (admin).
- New page or major UI flow → Playwright test + axe check.
- Security test cases in `docs/SECURITY.md` §13 must exist and pass once their feature exists.
- Never skip, delete or `.only` a test to get green. Fix the code or the test's wrong assumption.

## 7. Git and PRs

- Branch: `feat/T-024-product-page`, `fix/…`, `chore/…`, `docs/…`.
- Commits: Conventional Commits (`feat(product): add sticky sub-nav`). Small and focused.
- One task per PR. PR title `T-024: Product page template`. PR description: what/why, screenshots at 360 and 1280 for UI, test evidence, checklist below.
- Do not push directly to `main`. CI must be green.

## 8. Definition of Done (paste into every PR)

- [ ] Acceptance criteria in `docs/TASKS.md` met
- [ ] `pnpm lint && pnpm typecheck && pnpm test` pass; e2e added/updated where required
- [ ] UI: checked at 360 / 768 / 1280 px; passes `docs/UI-UX.md` §9 quality bar; axe clean
- [ ] No hard-coded copy, colors or business details; tokens and `business.ts` used
- [ ] No new dependency without justification
- [ ] Docs updated if behaviour, schema, env vars or commands changed
- [ ] No secrets, PII or placeholder text committed

## 9. When unsure

Prefer the simplest solution that satisfies the docs. If two docs disagree, follow the more specific one and fix the other in the same PR. If a requirement is genuinely ambiguous, stop and write the question in the PR description rather than guessing at business facts.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
