# Technical architecture

## Stack

- **Framework:** Next.js (App Router), React, TypeScript.
- **Database:** Neon Postgres.
- **ORM:** Drizzle — type-safe schema, migrations via `drizzle-kit`.
- **Hosting:** Vercel — serverless functions for Server Actions / Route Handlers.

## Layering

```
src/app/           # Routes, layouts, loading/error boundaries
src/domains/       # Domain logic (news, events, jobs, directory) — use-cases, validators
src/db/            # Drizzle client, schema, queries
src/lib/           # Shared utilities (env, cache helpers)
src/components/    # Presentational UI; prefer Server Components
```

## Data access

- **Read-heavy paths:** Prefer `unstable_cache` or `fetch` with Next cache tags; keep queries **narrow** (no `SELECT *` in hot paths).
- **Writes:** Server Actions or Route Handlers with validation (Zod recommended when adding forms).

## Caching (high level)

| Layer | Use |
|-------|-----|
| CDN | Static assets, ISR pages |
| Next Data Cache | Tagged revalidation per content type |
| Future | Vercel KV / Redis for rate limits and hot lists |

## Background work

- **Cron:** Vercel Cron → route handler for expiry sweeps (classifieds, listings), digest emails (future).
- **Queues:** Add external worker (e.g. Inngest, QStash) only when load requires — not v0.

## Observability

- Vercel Analytics / OpenTelemetry-compatible logging; structured logs on errors.
- No production secrets in client bundle.
