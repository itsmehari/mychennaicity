# Agent learnings, project updates, and SOPs

This file distills recurring themes from Cursor agent chats on **mychennaicity.in**. Use it to align implementation style, ops, and plan hygiene. It does not replace feature-specific plans under `.cursor/plans/`.

---

## 1. Project update narrative (what we have been building)

Workstreams that appear repeatedly across chats:

| Area | Direction |
|------|-----------|
| **Home & brand** | Hero carousel, seasonal hub (election band, GSAP), typography aligned to hero (Geist-style system), clearer section demarcation, fat footer, mega nav. |
| **News** | DB-backed articles, newspaper-style hub at `/chennai-local-news`, editorial template (report / analysis / interactive), thumbnails, SEO (metadata, JSON-LD, TOC, Speakable where appropriate). |
| **Events** | Route `chennai-local-events`, DB-backed listings, **generic “special event” presentation** (`presentation_key` + content resolver) so Panguni-style pages do not fork the normal events workflow. |
| **Jobs** | `src/domains/jobs/`, JobPosting JSON-LD where data is real, hub copy tuned for “Chennai jobs” intent without corporate “desk” jargon where users asked for plainer language. |
| **Maps** | Interactive Chennai ward/map explorer (GeoJSON build pipeline); parallel **elections-2026** constituency map (separate content + build script). |
| **Monetization & trust** | Registry-driven display ads (`src/ads/`), AdSense readiness (legal pages, cookies disclosure, optional `ads.txt`, env-gated scripts). |
| **Platform** | Next.js App Router, Neon + Drizzle, Vercel, Auth.js; force-dynamic on routes that must read **runtime** `DATABASE_URL`. |

When unsure what “done” means for a thread, check the matching plan file in `.cursor/plans/` and reconcile todos with the repo.

---

## 2. Agent learnings (behavior that worked or failed)

### Product and copy

- Users often want **plain, searcher-aligned language** (“Chennai jobs”, “local news”) rather than internal marketing labels (“curated hiring desk”). Audit hub and news strings when asked.
- **Greater Chennai** nuance belongs in supporting copy; **headlines and SEO-visible text** often should lead with **Chennai**.

### Technical

- **Next.js in this repo may differ from training cutoffs.** Before unfamiliar APIs, check `node_modules/next/dist/docs/` (see `AGENTS.md`).
- **`DATABASE_URL` at build time vs runtime:** Production empty home/news was traced to static generation without DB at build. Routes that list DB content should use **`dynamic = "force-dynamic"`** where the codebase already does—do not reintroduce static shells for those pages.
- **External images:** Add hosts to `next.config.ts` `images.remotePatterns` (or self-host under `public/`) before using `next/image`.
- **Structured data:** Emit Event / JobPosting / rich article extras only when **data is stable and real**; avoid fake schema for mocks (user explicitly called this out in SEO plans).

### Plans and todos

- Users want **plan files to reflect reality**: mark items complete/pending as work lands; expand todos to **WBS/PRD depth** when asked.
- **One plan file per initiative** is preferred over many loose markdown files; merge WBS into the existing plan when requested.

### Security and secrets

- **Never commit** live `DATABASE_URL`, API keys, or Search Console service account JSON.
- If a secret appears in chat, advise **rotation** and updating Vercel + local files (`AGENTS.md`).

### Browser-assisted ops

- For GitHub, Vercel, BigRock, Neon, GA4, GSC: the user often **logs in manually**; the agent uses **browser tools** after the user has the right tab open. **Coordinate explicitly** (“open X, then say when ready”).

---

## 3. Agent instructions (short checklist)

Use these on every substantial task:

1. **Scope:** Match `src/domains/*` and existing route groups; avoid drive-by refactors outside the request.
2. **Env:** After schema or seed changes, remind that **Vercel needs `DATABASE_URL` + redeploy** for production to match.
3. **SEO surface:** New public routes get **metadata**, **canonical** via existing helpers, **breadcrumbs** where the site pattern uses them, and **sitemap** entries when appropriate.
4. **Migrations:** Schema changes go through **Drizzle** (`drizzle/`, journal); do not hand-edit production DB without a migration path.
5. **Plans:** If the user attached `.cursor/plans/*.plan.md`, **update todo status** when finishing chunks of work.
6. **Execution:** Prefer running **git / npm / scripts** in the environment rather than only describing steps—unless blocked by missing credentials.

---

## 4. Standard operating procedures (SOPs)

### SOP A — New environment variable (app behavior)

1. Add key to `.env.example` with a short comment (no real values).
2. Document in the relevant doc (e.g. `docs/DATABASE_AND_VERCEL.md` for DB, or features doc for product flags).
3. User sets the value in **Vercel → Environment Variables** (Production / Preview as needed).
4. **Redeploy** so serverless/SSR picks it up.

### SOP B — Production database schema + seed

Full detail: **`docs/DATABASE_AND_VERCEL.md`**.

Abbreviated:

1. Confirm **which Neon project** Vercel’s `DATABASE_URL` points at (avoid two-project confusion).
2. `vercel env pull .env.production.local --environment=production` (or paste URI only in local gitignored file—never commit).
3. Run **`npm run db:push:live`** (or migrate) then **`npm run db:seed:live`** / targeted seed script.
4. **`npm run db:check:live`** to verify counts.
5. Hit live **home** and **hub** pages; **redeploy** if you changed `dynamic` or env-dependent behavior.

### SOP C — “Home/news shows nothing on live site”

1. Verify **`DATABASE_URL`** on Vercel and **redeploy**.
2. Confirm route uses **runtime** data (`force-dynamic` for affected pages).
3. Run **`db:check:live`**; seed if zero rows.
4. Hard-reload; check Vercel deployment logs for DB errors.

### SOP D — New imagery from third-party URLs

1. Check license/usage; prefer **self-host** under `public/images/` for long-lived assets when possible.
2. Register domain in **`next.config.ts`** for `next/image`, or use static `<img>` only if intentional.

### SOP E — AdSense / ads.txt / legal

1. Ensure **Privacy**, **Terms**, **Cookies**, **Community guidelines** (or equivalent) are live and linked from **footer**.
2. **`ads.txt`:** env-driven publisher line; **404 or empty** when unset (do not invent IDs).
3. AdSense script: **env-gated**; no EU CMP required if product decision is **non-EU focus**—still use honest cookie/third-party copy globally.

### SOP F — Election or candidate content

1. Prefer **versioned content** (JSON/TS under `src/content/`) with **editorial and legal disclaimers**.
2. Do not present **scraped live news** as verified candidate lists unless sourced and maintained.

### SOP G — Git push to GitHub (release hygiene)

1. `git status` — review unintended files (secrets, `.env*`, huge binaries).
2. Run **lint/tests** if the change touches critical paths (`package.json` scripts).
3. Commit with a **clear message**; push; confirm **Vercel build** succeeds.

### SOP H — Parallel features (merge conflict avoidance)

1. Isolate by **domain** (`src/domains/events` vs `src/lib/election-map`, etc.).
2. One **migration series** per schema change; avoid conflicting edits to same route file across branches when possible.
3. Update **sitemap** and **nav** in the same PR as new public routes when they ship together.

---

## 5. Where to look next

| Topic | Doc / path |
|-------|------------|
| DB + Vercel + seeding | `docs/DATABASE_AND_VERCEL.md` |
| Feature inventory | `docs/MYCHENNAICITY_FEATURES.md` |
| Content IA | `docs/CONTENT_ARCHITECTURE.md` |
| Agent rules (short) | `AGENTS.md` |
| Initiative plans | `.cursor/plans/*.plan.md` |

---

## 6. Changelog

- **2026-03-30:** Initial synthesis from multi-thread agent transcripts (AdSense/legal, elections map, Panguni special events, hero/home, jobs SERP copy, SEO/JSON-LD, portable ads, map explorer, ops/browser handoffs).
