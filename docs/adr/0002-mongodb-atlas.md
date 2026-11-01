# ADR-0002: MongoDB Atlas as the database

- **Status:** Accepted
- **Date:** 2026-11-01

## Context

Data is small and document-shaped: ~20 catalog items with nested features/specs/FAQs, and leads with nested request details. The team already has working Mongoose models for products, categories and leads from earlier work, and wants zero database administration on the VPS.

## Decision

Use MongoDB Atlas M0 (free) in AWS Mumbai (`ap-south-1`) with Mongoose 8. Network access is restricted to the VPS IP. Nightly `mongodump` from the VPS provides backups (M0 has no automated backups).

## Alternatives considered

- **PostgreSQL (self-hosted or Neon):** stronger relational guarantees, but nested catalog content would need JSONB or many tables, and existing models would be discarded.
- **MongoDB on the VPS:** saves the network hop but adds patching, auth and disk management to a single small server.

## Consequences

- Free, managed, low-latency from an Indian VPS.
- 512 MB storage limit is ample (artwork files are not in the database).
- If Atlas limits are reached, upgrade to M10 or migrate to self-hosted with `mongodump/mongorestore`; no code change.
