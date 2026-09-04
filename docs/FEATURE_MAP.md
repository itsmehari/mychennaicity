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
| Civic interactive tools (hub + live apps) | Zone/ward finder, maps, router | **P0** | `/civic-tools/*` — 15 in registry; preview shells (`area-sabha`, dashboards) are `noindex` and off sitemap. |
| TN Plus Two education desk | Group selection + textbook finders | **P1** | **In repo (Wave A)** — confirm production HEAD 200 before claiming live. Plan: `.cursor/plans/tn-plus-two-education-desk.plan.md`. |
| TN Council of Ministers desk | State cabinet roster + Chennai lookup | **P1** | **In repo; confirm production HEAD 200** — `/guides/tn-council-of-ministers`. Sitemap lists 8 hubs only; minister/IAS pages are `noindex`. Plan: `.cursor/plans/tn-council-of-ministers.plan.md`. |

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
| Civic tools: hub + 15 apps (`/civic-tools/*`; 3 preview `noindex`) | **Done in repo** — `src/components/civic-tools/`, `public/data/civic-geo/` |
| Area hubs | **4 custom packs** (OMR, Adyar, T. Nagar, Ambattur); six others remain default factory |
| TN Plus Two education desk | **Wave A in repo** — hub + 6 groups + compare/structure/choose. Confirm production HEAD 200. Later waves: [`.cursor/plans/tn-plus-two-education-desk.plan.md`](../.cursor/plans/tn-plus-two-education-desk.plan.md) |
| TN Council of Ministers desk | **Ships with this deploy** — hub, departments, Chennai shelf, official PDFs, Tamil twin. Minister pages stay `noindex` and off sitemap. IAS shelf expanded and indexed. [`.cursor/plans/tn-council-of-ministers.plan.md`](../.cursor/plans/tn-council-of-ministers.plan.md) |
| Guides: BWG readiness checklist 2026 | **Done** — `/guides/bulk-waste-generator-readiness-checklist-2026` (`/chennai-guides/...` redirects); localStorage assessment |
| Events & jobs: hub + detail from DB when rows exist; mock editorial fallback when hub would be empty; hub JSON-LD only when DB-backed | **Done** — `src/domains/events/`, `src/domains/jobs/`, `/chennai-jobs` routes (legacy `/jobs` → 301) |
| Sitemap / news sitemap / recent sitemap / robots | **Done** — `src/app/sitemap.ts`, `src/app/news-sitemap.xml/`, `src/app/sitemap-recent.xml/`, `src/app/robots.ts` |
| Static pages: about, contact, editorial standards, glossary | **Done** — under `src/app/(public)/` |
| Newsletter signup UI | **Partial** — modal + config (`src/components/newsletter/`, `src/config/newsletter-modal.ts`); wire to provider when chosen |
| Admin CRUD (articles, events, jobs, directory) | **Partial** — `/admin/articles` publish/unpublish/feature; events/jobs/directory still seed scripts. See [ADMIN_SYSTEM_PLAN.md](ADMIN_SYSTEM_PLAN.md) |
| GitHub remote / Vercel / Neon / DNS / GA / GSC | **Operator** completes using [DEPLOY.md](DEPLOY.md) |
