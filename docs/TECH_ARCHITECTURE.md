# Technical architecture

## Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript.
- **Styling:** Tailwind CSS 4 (PostCSS pipeline).
- **Motion:** GSAP where scroll or staged UI needs it (e.g. home/news experiences).
- **Database:** Neon Postgres.
- **ORM:** Drizzle — type-safe schema; `drizzle-kit` for generate / migrate / push.
- **Auth:** Auth.js (NextAuth v5) with `@auth/drizzle-adapter`.
- **Hosting:** Vercel — serverless for Server Components, Server Actions, and Route Handlers.
- **Analytics:** Optional GA4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`), Vercel Analytics, Vercel Speed Insights.

## Layering

```
src/app/           # Routes, layouts, loading/error boundaries, sitemap/robots
src/domains/       # Domain modules: news, events, jobs, directory, listings (queries + exports)
src/db/            # Drizzle client, schema, migrations
src/lib/           # Shared utilities (env, SEO helpers, Chennai map/zones, home mock data)
src/components/    # UI; prefer Server Components where possible
src/config/        # Feature-oriented config (e.g. newsletter modal behaviour)
```

## Data access

- **Read-heavy paths:** Use Next.js caching patterns (`unstable_cache`, `fetch` with tags) where appropriate; keep queries **narrow** (no `SELECT *` in hot paths).
- **Public hubs:** Several pages use `export const dynamic = "force-dynamic"` so Neon is read at **request time** with production `DATABASE_URL` (avoids empty HTML when the DB was empty or env was missing at build time).
- **Writes:** Server Actions or Route Handlers with validation (Zod recommended when adding forms).

## Caching (high level)

| Layer | Use |
|-------|-----|
| CDN | Static assets, cached RSC payloads |
| Next Data Cache | Tagged revalidation per content type (expand as needed) |
| Future | Vercel KV / Redis for rate limits and hot lists |

## Background work

- **Cron:** Vercel Cron → route handler for expiry sweeps (classifieds, listings), digest emails (future).
- **Queues:** Add external worker (e.g. Inngest, QStash) only when load requires — not required for the current editorial MVP.

## Observability

- Vercel Analytics / Speed Insights; structured logs on errors.
- No production secrets in the client bundle.

## Agent note

Next.js 16 may differ from older docs. Prefer `node_modules/next/dist/docs/` and in-repo patterns over assumptions from prior Next.js versions.
