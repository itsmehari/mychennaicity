# Feature map — legacy patterns → mychennaicity v1

Legend: **P0** ship first, **P1** next, **Later** backlog.

| Capability | Legacy inspiration | P0/P1 | Notes |
|------------|-------------------|-------|--------|
| Article publishing | DB `articles` + slug URLs | **P0** | Single pipeline; no static-PHP hybrid. |
| Topic / category taxonomy | `category`, tags in articles | **P0** | Indexed for SEO and filters. |
| Events listing + detail | `event_listings`, status filters | **P0** | City-scoped; locality as filter. |
| Event submission | Public post flow | **P1** | Moderation queue required. |
| Jobs browse + detail | `job_postings`, employers | **P0** | Structured salary, experience, remote. |
| Employer accounts | Employers table + plans | **P1** | Auth + plan caps in Postgres. |
| Job applications | `job_applications` uniqueness | **P1** | Dedupe by user + job. |
| Unified directory | Multiple `omr_*` tables | **P1** | `directory_entries` (+ typed enum) in schema; public UI still mock-first. |
| Buy/sell | `omr_buy_sell_*` | **P1** | Images JSON → structured media table preferred. |
| Classifieds | `omr_classified_ads_*` | **Later** | Expiry + reports + optional OTP. |
| Property (hostels / rent / coworking) | Module pattern | **Later** | Same listing core with `vertical` enum. |
| GA4 in app | gtag + optional Data API | **P1** | Measurement ID in env; Data API for internal dashboards only. |
| Elections / campaign hubs | `elections-2026` | **Later** | Only if editorial priority. |

## Explicitly out of v1

- Corridor-only IA and copy.
- cPanel cron PHP scripts — use Vercel Cron or a queue worker when needed.

## Implementation status (this repo)

| Area | Status |
|------|--------|
| Infra, CI, Auth.js shell, analytics, env docs | **Done** — [DEPLOY.md](DEPLOY.md), [DATABASE_AND_VERCEL.md](DATABASE_AND_VERCEL.md), [EXECUTION_ROADMAP.md](EXECUTION_ROADMAP.md) |
| Drizzle schema: `articles`, `events`, `job_postings`, `employers`, `directory_entries`, `cities`, auth tables | **Done** — `src/db/schema/` |
| Public news: hub, topic desks, detail, RSS, dynamic rendering, JSON-LD | **Done** — `src/app/(public)/chennai-local-news/`, `src/domains/news/` |
| Home: DB news sections + map/explore + mock-backed jobs/events/directory previews | **Done** — `src/app/(public)/page.tsx`, `src/components/home/` |
| Events & jobs: hub + detail from DB when rows exist; mock editorial fallback when hub would be empty; hub JSON-LD only when DB-backed | **Done** — `src/domains/events/`, `src/domains/jobs/`, matching routes |
| Sitemap / news sitemap / robots | **Done** — `src/app/sitemap.ts`, `src/app/news-sitemap.xml/`, `src/app/robots.ts` |
| Static pages: about, contact, editorial standards, glossary | **Done** — under `src/app/(public)/` |
| Newsletter signup UI | **Partial** — modal + config (`src/components/newsletter/`, `src/config/newsletter-modal.ts`); wire to provider when chosen |
| Admin CRUD (articles, events, jobs, directory) | **Not started** — `/admin` placeholder; see [ADMIN_SYSTEM_PLAN.md](ADMIN_SYSTEM_PLAN.md) |
| GitHub remote / Vercel / Neon / DNS / GA / GSC | **Operator** completes using [DEPLOY.md](DEPLOY.md) |
