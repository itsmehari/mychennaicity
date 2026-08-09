# Agent learnings, project updates, and SOPs

This file distills recurring themes from Cursor agent chats on **mychennaicity.in**. Use it to align implementation style, ops, and plan hygiene. It does not replace feature-specific plans under `.cursor/plans/`.

---

## 1. Project update narrative (what we have been building)

Workstreams that appear repeatedly across chats:

| Area | Direction |
|------|-----------|
| **Home & brand** | Hero carousel, seasonal hub (election band, GSAP), typography aligned to hero (Geist-style system), clearer section demarcation, fat footer, mega nav. |
| **News** | DB-backed articles, newspaper-style hub at `/chennai-local-news`, editorial template (report / analysis / interactive), thumbnails, SEO (metadata, JSON-LD, TOC, Speakable where appropriate). |
| **Events** | Route `chennai-local-events`, DB-backed listings, **discovery hub** (portrait cards + category chips), **mobile-first detail** (summary card, sticky actions, share/calendar/maps), **generic “special event” presentation** (`presentation_key` + content resolver) for Panguni-style pages. Ops: **`docs/prompts/ADD_CHENNAI_EVENT.md`**, **`docs/CHENNAI_EVENTS.md`**, **`scripts/lib/seed-event-shared.ts`**. |
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
- **News articles:** always include a short **Disclaimer** (civic journalism / source scope / not official agency copy) near the top of the report, and a separate **Fine print — AI-assisted authoring** block (2–3 lines) at the end stating AI-assisted drafting, that AI can err, and that readers should verify with primary sources. Use headings that map to the disclaimer skin (`Disclaimer`, `Fine print`, Tamil `பொறுப்புத்துறப்பு` / `நுண்ணெழுத்து`, etc.).

### Technical

- **Next.js in this repo may differ from training cutoffs.** Before unfamiliar APIs, check `node_modules/next/dist/docs/` (see `AGENTS.md`).
- **`DATABASE_URL` at build time vs runtime:** Production empty home/news was traced to static generation without DB at build. Routes that list DB content should use **`dynamic = "force-dynamic"`** where the codebase already does—do not reintroduce static shells for those pages.
- **News list freshness:** Home bulletin and article pages read Neon **per request** (no `unstable_cache` on article lists). After live seeds, optional **`REVALIDATE_SECRET`** + `POST /api/revalidate/news` busts edge HTML; see `scripts/lib/revalidate-news-after-seed.ts`.
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

**Chennai events only:** follow **`docs/prompts/ADD_CHENNAI_EVENT.md`** — idempotent `scripts/seed-event-*.ts` via **`scripts/lib/seed-event-shared.ts`**, then verify hub + `/chennai-local-events/[slug]`.

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

### SOP I — Capture activities into existing docs (mandatory)

When a chat produces a **repeatable practice**, **live publish**, or **policy** (disclaimers, bilingual news, social CTA style, seed scripts, etc.):

1. Update **`docs/AGENT_LEARNINGS_AND_SOPS.md`** (learning bullet and/or new SOP) in the same work session.
2. If agents must always obey it: add or extend **`.cursor/rules/*.mdc`** (`alwaysApply: true` for site-wide; globs for scoped).
3. Add a one-line pointer in **`AGENTS.md`** non-negotiables when the rule is site-wide.
4. Domain prompts stay in place: events → `docs/prompts/ADD_CHENNAI_EVENT.md`; news pipeline design → `docs/prompts/NEWS_PUBLISHING_PIPELINE_SYSTEM_DESIGN.md`.
5. Append a short line under **§6 Changelog** (date + what was codified).
6. For **cross-chat day summaries**, add or update **§7 Daily work logs** (do not invent a separate work-log folder).
7. Do **not** invent parallel “activity log” folders — use this doc tree only.

Cursor rule: **`.cursor/rules/activity-capture-and-news-ops.mdc`**.

### SOP J — Publish a Chennai local news article

1. Idempotent `scripts/seed-*.ts` + `package.json` `db:seed:…` / `:live` scripts.
2. **Disclaimer** near top of `reportBody`; separate **Fine print — AI-assisted authoring** (2–3 lines) at end — headings that hit disclaimer skin in `article-prose-blocks.tsx`.
3. Hero under `public/images/articles/` when possible; commit + push so Vercel serves it.
4. Live: `npm run db:seed:…:live` with `.env.production.local`; confirm URLs on **https://mychennaicity.in**.
5. Bilingual when asked: separate EN/TA slugs, cross-links, natural Tamil.
6. Social when asked: X/Twitter (etc.) with live URL CTA + hashtags.
7. Then run **SOP I** so any new habit is written into docs/rules.

Example (Aug 2026): Nilgiri TBM Moolakadai — EN `/chennai-local-news/chennai-metro-nilgiri-tbm-breakthrough-moolakadai-2026`, TA `…-tamil`.

---

## 5. Where to look next

| Topic | Doc / path |
|-------|------------|
| DB + Vercel + seeding | `docs/DATABASE_AND_VERCEL.md` |
| Feature inventory | `docs/MYCHENNAICITY_FEATURES.md` |
| Content IA | `docs/CONTENT_ARCHITECTURE.md` |
| **Add / seed Chennai events** | `docs/prompts/ADD_CHENNAI_EVENT.md`, `docs/CHENNAI_EVENTS.md`, `.cursor/rules/chennai-events.mdc` |
| **Capture activities + news publish** | `.cursor/rules/activity-capture-and-news-ops.mdc`, SOP I / SOP J (this file) |
| **Daily work logs** | §7 below (cross-chat day summaries) |
| Agent rules (short) | `AGENTS.md` |
| Initiative plans | `.cursor/plans/*.plan.md` |

---

## 6. Changelog

- **2026-03-30:** Initial synthesis from multi-thread agent transcripts (AdSense/legal, elections map, Panguni special events, hero/home, jobs SERP copy, SEO/JSON-LD, portable ads, map explorer, ops/browser handoffs).
- **2026-06-10:** Events hub discovery cards + mobile detail UX; `CHENNAI_EVENTS.md`, `ADD_CHENNAI_EVENT` prompt, `seed-event-shared.ts`, Cursor rule `chennai-events.mdc`.
- **2026-08-06:** SOP I (capture activities into existing docs) + SOP J (news publish: disclaimer, AI fine print, bilingual, social); Cursor rule `activity-capture-and-news-ops.mdc`; Nilgiri TBM Moolakadai EN/TA live articles.
- **2026-08-08:** Cross-chat day — see **§7 Daily work logs** (AEO/llms.txt, WhatsApp spammers + article, site usage guide, BWG ship, civic seed batch, IAS G.O. follow-up, activity-log rule).
- **2026-08-08:** Events — Saturangam 360 chess endgame webinar (22 Aug 2026) seeded live; poster `public/images/events/saturangam-360-chess-endgame-webinar-august-2026.png` + `db:seed:event:saturangam-chess-webinar(:live)`. Zoom register: `https://us06web.zoom.us/meeting/register/325vdTMvTMCccdcke-Jpww` (description updated live).
- **2026-08-10:** Events — four music listings live: Jananiy Carnatic (`db:seed:event:sj-jananiy-carnatic:live`), Frangipani/Kaber enrich Ticket9 (`db:seed:event:frangipani-kaber-vasuki:live`), Sukoon baithak Adyar (`db:seed:event:sukoon-baithak-adyar:live`), Tabla Poetry (`db:seed:event:tabla-poetry:live`). Posters under `public/images/events/` + `event-poster-image.ts`. **Rule:** enrich existing Ticket9 slugs instead of duplicating Frangipani-style imports.
- **2026-08-10:** Events hub UX/SEO — `/chennai-local-events` reordered: hero + Next up + **Browse listings** above the fold; ads/WhatsApp/advertise moved below. New `EventsHubHero`, sticky category chips, dynamic meta count, expanded FAQ/AEO. **Rule:** never bury the event grid under promo strips on the hub.
- **2026-08-10:** Events — Meetup Aug–Sep batch (15 listings) via `db:seed:meetup-chennai-aug-sep(:live)` + `src/content/events/meetup-chennai-aug-sep-2026.ts`. Thematic posters under `public/images/events/meetup-*.jpg`. **Gaps to re-check on Meetup:** Explara URL for RPA, Cloudera floor address for KSUG.AI, TBA venues (Ronda / Women Network / Poker / Freelancers Aug), Breaking Code fee, TechNexus speakers.
- **2026-08-10:** Local events megamenu — live “Next up” rail via `/api/events/nav-preview` + richer Browse/Plan columns + featured card (`MegaNavEventsLive`). **Rule:** events nav should never be a single empty link; surface live calendar count and soonest listings.
- **2026-08-10:** All mega-nav sections (News, Explore, Jobs, Events, Areas) share `/api/nav/preview` live rails; dropdown uses scrim + elevated card so it no longer blends into the page. **Rule:** every primary nav megamenu must include a live rail + featured CTA.
- **2026-08-10:** Contact page redesign — intent rail + WhatsApp-first CTAs + per-topic checklists (`/contact`, `contact-desk.css`). Keep `#news` `#jobs` `#events` `#directory` `#advertise` `#general` anchors. **Rule:** separate desk messaging from reader community join so conversion paths stay clear.

---

## 7. Daily work logs

Cross-chat day summaries. Source: git commits on `main` + Cursor agent transcripts under this project. Keep entries factual; link live URLs with the `.in` host only.

### 2026-08-08

**Commits (main):** `1be09ec` · `e5d7975` · `5418823` · `536a79c`

#### Chats active this day

| Chat (short title) | Transcript id | Focus |
| --- | --- | --- |
| [AEO / llms.txt / GCC trail](23c25e22-0afc-46ab-8c94-c99b131e482d) | `23c25e22-…` | Bulk-waste agencies paper trail; AEO ranking tasks; implement llms.txt + related surfaces |
| [Savukku / WhatsApp admins](c0443c55-bdcc-4c54-8200-323fdb404b25) | `c0443c55-…` | Condolences article edits; WhatsApp spammers list page; spam-report platform news article |
| [BWG guide + ship](a0d0e45f-fbee-4716-905c-22b917741147) | `a0d0e45f-…` | Bulk Waste Generator readiness guide/tool; commit & push recent work across chats |
| [IAS G.O. follow-up](2d6f09dc-77c4-4872-9923-fef7e3b9a8ca) | `2d6f09dc-…` | Publish G.O. (Rt.) No. 2892 as follow-up to May/July IAS desks |
| [Nilgiri / ops rules](6ccc6a3a-b30d-42ab-bdbc-c98192b23337) | `6ccc6a3a-…` | (Carry-over) disclaimer/AI fine print, Twitter CTAs, activity-capture rule; **this** daily work log |

#### Shipped / live

1. **WhatsApp spammers list (admins)** — `/chennai-whatsapp-spammers`  
   Content `src/content/whatsapp-community/spammers.ts`; linked from community landing, guide, FAQ, rules, sitemap (`1be09ec`).

2. **WhatsApp spam-report platform article** — `/chennai-local-news/whatsapp-spam-report-platform-chennai-group-admins-august-2026`  
   Seed `scripts/seed-whatsapp-spam-report-platform-chennai-admins-august-2026.ts` (`e5d7975`).

3. **How to use mychennaicity + Explore bands** — `/guides/how-to-use-mychennaicity`  
   Audience guide + home/hub/article Explore conversion sections (`5418823`).

4. **AEO / GEO / discoverability batch** (`536a79c`, `docs/AEO_GEO_PLAN.md`):  
   - `/llms.txt`, `/llms-full.txt`, `/llm.txt`, `/aeo/chennai.md`, `humans.txt`, robots updates  
   - Jobs + events hub FAQ / AEO strips / digest UX; feeds for jobs & events  
   - Article Chennai-context cluster + AEO answer block components  
   - SWM AEO expansions (`src/content/civic-swm/swm-rules-aeo.ts`)

5. **Pending civic news seeds landed in repo** (same ship commit):  
   GCC bulk-waste paper trail EN/TA; Ilai banana-leaf mission; Chennai waste-rules “must explain”; Savukku son condolences seed; Nilgiri hero PNG.

6. **IAS follow-up desk** — G.O. (Rt.) No. 2892 (07.08.2026), G. Prakash ↔ S. Malarvizhi (Archives / Revenue Administration):  
   - Target slug `/chennai-local-news/tamil-nadu-ias-prakash-malarvizhi-archives-revenue-swap-august-2026`  
   - Seed `scripts/seed-tn-ias-prakash-malarvizhi-august-2026.ts` + scan `public/documents/tn-ias-prakash-malarvizhi-go-rt-2892-07-08-2026.png`  
   - **Note at log time:** seed + document were live-oriented but still **uncommitted** on working tree — commit/push if not already done after this log.

#### Ops / process

- Reinforced **SOP I/J** and always-on rule `.cursor/rules/activity-capture-and-news-ops.mdc` (started 2026-08-06; referenced again today for daily logging).
- `.cursor/rules/` tracked in git (ignore exception) so shared rules version with the repo.

#### Not in today’s commits (context only)

- Nilgiri EN/TA metro breakthrough articles were published **2026-08-06**; today’s Nilgiri chat work was policy/social/logging, not a new seed.
