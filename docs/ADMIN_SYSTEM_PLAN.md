# Admin system plan

## Problems in legacy

- Central `admin/` plus **per-module** admin folders → inconsistent UX and duplicated auth checks.
- Session-based PHP admin tied to hosting.

## Target model

- **Single admin app section** under `src/app/admin/` with shared layout (URL `/admin`).
- **Authentication:** Use a maintained solution (e.g. **Auth.js / NextAuth** with email provider, or **Clerk** / **Supabase Auth** if adopted — decision at implementation). Minimum: secure session cookies, CSRF on mutations, role in JWT/session.
- **Authorization:** RBAC — `reader`, `contributor`, `editor`, `admin` (exact roles TBD). Store in `users` or `user_roles` table.
- **Audit:** Persist mutations to `audit_log` (see `ENTITY_MODEL.md`).

## Capabilities by phase

**Phase A**

- Articles CRUD, publish/unpublish
- Moderation queue for user-submitted events/listings (if enabled)

**Phase B**

- Jobs and employer records
- Directory entries

**Phase C**

- GA4 snapshot or embedded reporting (optional; server-side Data API with service account in env — **never** in client)

## Non-goals

- Replicating PHP `migrations-runner.php` in production UI without safeguards — use Drizzle migrations in CI/CD instead.
