# Execution roadmap

## Phase 0 — Foundation (complete)

- Repo layout: `src/app/(public)`, `src/app/admin`, `src/db`, `src/domains`, `src/components`, `src/lib`, `src/config`
- Drizzle schema + `drizzle.config.ts`; `.env.example`
- `sitemap.ts`, `news-sitemap.xml`, `robots.ts`; layouts and public chrome (header, footer, mega nav)
- Auth.js (NextAuth v5) + Drizzle adapter; middleware for `/admin`
- GA4 (optional env), Vercel Analytics + Speed Insights; CI workflow (`.github/workflows/ci.yml`)
- Scripts: `db:push`, `db:seed`, `db:check`, live variants, `gsc:submit-sitemap`, `geo:build` (Chennai map data)
- Operations: [docs/DEPLOY.md](DEPLOY.md), [docs/DATABASE_AND_VERCEL.md](DATABASE_AND_VERCEL.md), [docs/SEARCH_CONSOLE.md](SEARCH_CONSOLE.md)
- Documentation: `MIGRATION_ANALYSIS.md`, `docs/*`, `MIGRATION_LOG.md`

## Phase 1 — Content MVP

- **Done (public):** Articles schema; published article queries; news hub, topic desks, detail, `generateMetadata`, JSON-LD, RSS; home sections fed from DB when available; `force-dynamic` on key routes so production DB is visible without rebuild-for-content.
- **Remaining:** Admin CRUD for articles (draft/publish, preview), moderation hooks — see [ADMIN_SYSTEM_PLAN.md](ADMIN_SYSTEM_PLAN.md).

## Phase 2 — Engagement

- **Done (public surface):** `events` and `job_postings` (+ `employers`) in schema; domain queries; `/chennai-local-events`, `/jobs` hubs and `[slug]` details; sitemap inclusion for eligible rows; mock fallback when DB has no public rows (with structured-data rules in [CONTENT_ARCHITECTURE.md](CONTENT_ARCHITECTURE.md)).
- **Remaining:** Event/job submission flows, employer accounts, email alerts, moderation queues.

## Phase 3 — Listings

- **Schema:** `directory_entries` and listing-oriented domain stubs exist.
- **Remaining:** Unified listings API, area-scoped filters, verified detail pages, expiry/cron if time-limited listings.

## Phase 4 — Hardening

- Rate limits on public forms, spam controls
- Search (Postgres full-text or external provider — TBD)
- Performance audit and cache tuning

## Dependencies

- Neon project + `DATABASE_URL` on Vercel
- Domain DNS for mychennaicity.in
- Search Console / GA4 properties for the brand

## Exit criteria per phase

- Phase 1: LCP acceptable on news detail; sitemap lists article URLs; editorial can publish without redeploy (runtime DB + admin when built)
- Phase 2: Event/job publish flow audited; no orphan drafts in public index; submission path documented
- Phase 3: Listing expiry job documented and running where applicable
