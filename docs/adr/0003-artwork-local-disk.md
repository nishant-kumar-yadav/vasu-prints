# ADR-0003: Store artwork files on VPS local disk behind a FileStore interface

- **Status:** Accepted
- **Date:** 2026-11-01

## Context

Buyers upload up to 3 artwork files of up to 100 MB each (CDR, AI, EPS, PDF, PSD, SVG, PNG, JPG, TIFF, ZIP). The owner keeps all artwork indefinitely. Files are only ever downloaded by the single admin. Cloudinary's raw-file limits are below 100 MB on lower plans; email attachments cannot carry these sizes.

## Decision

Stream uploads with busboy directly to `UPLOAD_DIR` on the VPS (outside the web root), validate by size and content signature, and serve them only through an authenticated download route. Access goes through a `FileStore` interface (`LocalFileStore` now). Uploads are synced nightly to an off-site rclone remote.

## Alternatives considered

- **Cloudflare R2 / S3 with presigned URLs:** better durability and no VPS disk pressure, but adds a service, CORS config and presign endpoints; unnecessary while the app runs on a VPS without request-size limits.
- **Email attachments:** impossible at these sizes.

## Consequences

- No extra service or cost; simple implementation.
- Disk usage must be monitored (alert at 70 %). Worst case is ~300 MB per lead; at 500 leads/month with one third including artwork, expect up to ~15 GB/month in the worst case — realistic usage is far lower. Revisit when disk passes 50 %.
- Migration to R2 means implementing `R2FileStore` and copying files; callers do not change.
