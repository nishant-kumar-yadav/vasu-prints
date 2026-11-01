# ADR-0004: Self-host on the existing Hostinger VPS (Nginx + PM2)

- **Status:** Accepted
- **Date:** 2026-11-01

## Context
The owner already pays for a Hostinger VPS. Vercel's free Hobby plan does not allow commercial use and its serverless request body limit (4.5 MB) conflicts with 100 MB uploads.

## Decision
Run the Next.js `standalone` build as a single Node 22 process under PM2 (fork mode), behind Nginx terminating TLS with Let's Encrypt (Certbot). Deploy from GitHub Actions over SSH using release directories and an atomic `current` symlink switch. Canonical host: `https://vasuprint.com` (www redirects to apex).

## Consequences
- No additional hosting cost; full control over upload limits and disk.
- The team owns OS patching, firewall, backups and monitoring (runbook in `DEPLOYMENT.md`).
- Single instance means in-memory rate limiting and caching are valid; do not switch PM2 to cluster mode without moving rate limits to MongoDB/Redis.
- No global CDN by default; optional Cloudflare proxy in front of the VPS can be added later without code changes.
