# vasuprint.com

Premium B2B website for **VasuPrint** — custom packaging boxes, stickers, DTF and UV DTF transfers, and tags. Built with Next.js 16, TypeScript, Tailwind CSS 4 and MongoDB Atlas; self-hosted on a VPS with Nginx and PM2.

Repository: https://github.com/nishant-kumar-yadav/vasu-prints

## Getting started

```bash
corepack enable
git clone https://github.com/nishant-kumar-yadav/vasu-prints.git
cd vasu-prints
pnpm install
cp .env.example .env.local   # CATALOG_SOURCE=static, QUOTE_BACKEND=off works with no other values
pnpm dev
```

## Documentation

| | |
|---|---|
| [AGENTS.md](./AGENTS.md) | Rules for AI agents and contributors |
| [docs/PRD.md](./docs/PRD.md) | Product requirements and phases |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System design, stack, structure |
| [docs/UI-UX.md](./docs/UI-UX.md) | Page layouts, behaviour, quality bar |
| [docs/DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) | Tokens and components |
| [docs/CONTENT.md](./docs/CONTENT.md) | All website copy, products and policies |
| [docs/SCHEMA.md](./docs/SCHEMA.md) | Data models |
| [docs/API.md](./docs/API.md) | Endpoints, Server Actions, emails |
| [docs/SECURITY.md](./docs/SECURITY.md) | Security and privacy (DPDP Act) |
| [docs/SEO.md](./docs/SEO.md) | URLs, metadata, structured data |
| [docs/ASSET-PROMPTS.md](./docs/ASSET-PROMPTS.md) | AI prompts for logo and imagery |
| [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) | VPS runbook, CI/CD, backups |
| [docs/TASKS.md](./docs/TASKS.md) | Build plan |
| [docs/adr/](./docs/adr/) | Architecture decision records |
