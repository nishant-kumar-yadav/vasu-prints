# ADR-0001: Next.js single application instead of SPA + Express API

- **Status:** Accepted
- **Date:** 2026-11-01

## Context

The site's commercial value depends on Google ranking each product page. A client-rendered single-page app with a catch-all rewrite serves an empty HTML shell, so crawlers depend on JavaScript execution, meta tags arrive late, and every route returns HTTP 200 even when the page does not exist. A previous internal project built on Vite + React Router + a separate Express API showed exactly these problems, plus duplicated validation between client and server and two deployables to keep in sync.

## Decision

Build one Next.js 16 (App Router, TypeScript) application that serves:

- public pages as Server Components, statically generated with on-demand revalidation;
- the admin panel under `/admin` with Server Actions for mutations;
- the few true HTTP endpoints (streaming uploads, quote submission, file downloads, CSV export, health) as Route Handlers.

## Consequences

- Real HTML, correct status codes (404/301) and per-page metadata out of the box.
- One codebase, one process, one deploy; zod schemas shared by client and server.
- Agents must respect the Server/Client Component boundary (rules in `AGENTS.md`).
- Admin and public site scale together; acceptable at the expected traffic.
