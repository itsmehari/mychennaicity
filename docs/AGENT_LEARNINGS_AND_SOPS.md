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
- **Partner ads:** reuse `PageAdSlot` + `partnerAds(placement)`. Do not invent per-page partner markup. Keep rotator UI copy-free. Site-wide band must skip pages that already have an inline slot.

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

### SOP K — Partner ad rotator (house partners)

Three layers — do **not** paste one-off partner markup on a page:

1. **Data:** `src/lib/partner-ads.ts` — `partnerAds(placement)` returns the same 2–3 creatives with UTMs (`utm_source=mychennaicity`, `utm_medium=referral`, `utm_campaign=partner_ad`, `utm_content=<placement>`). Change partners/copy/themes here only.
2. **Rotator:** `src/components/ads/partner-ad-rotator.tsx` — carousel UI (6.5s, pause on hover/focus, `prefers-reduced-motion`). No copy.
3. **Slots:** `<PageAdSlot shape="square|rectangle" placement="…" />` on the page; `<SiteWideAdBand />` in the public layout is the catch-all rectangle (`site_band`) when `shouldShowSiteWideAd(pathname)` is true.

**Shapes:** square = sticky rails / job + article sidebars; rectangle = full-width bands. Skip legal/auth/admin/contact. If a page already has `PageAdSlot`, do not also show the site-wide band.

**Do not remount IAB `AdSlot` on public pages.** House partners go through `PageAdSlot`. `ArticleAdRegion` is AdSense when slot env is set, otherwise the partner rotator. `AdvertisePanel` stays as the first-party “advertise with us” unit.

---

## 5. Where to look next

| Topic | Doc / path |
|-------|------------|
| DB + Vercel + seeding | `docs/DATABASE_AND_VERCEL.md` |
| Feature inventory | `docs/MYCHENNAICITY_FEATURES.md` |
| Content IA | `docs/CONTENT_ARCHITECTURE.md` |
| **Add / seed Chennai events** | `docs/prompts/ADD_CHENNAI_EVENT.md`, `docs/CHENNAI_EVENTS.md`, `.cursor/rules/chennai-events.mdc` |
| **Capture activities + news publish** | `.cursor/rules/activity-capture-and-news-ops.mdc`, SOP I / SOP J (this file) |
| **Partner ad rotator** | `src/lib/partner-ads.ts`, `PageAdSlot` / `SiteWideAdBand`, SOP K (this file) |
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
- **2026-08-10:** Contact visual system is **page-scoped institutional** (ink + gold, Instrument Serif / Libre Franklin via `contact/layout.tsx`) — deliberately not the civic teal UI. **Rule:** do not reuse `.mcc-corp-*` styles on other hubs; keep Fortune-500 desk look only on `/contact`.
- **2026-08-10:** News — TN EB bill shock desk live: `/chennai-local-news/tamil-nadu-high-electricity-bills-july-august-2026-tnpdcl-reinspection` via `db:seed:tn-electricity-bill-shock-july-august-2026:live`. Links prior slab guide; asks for TNPDCL final 3.70-lakh scorecard after 7 Aug deadline.
- **2026-08-10:** Cross-network EB desks — MCC shock + bill-calc seeds link MyOMR (`tamil-nadu-high-electricity-bills-july-august-2026-tnpdcl-omr`, TNEB slabs, EB Bill Hub). MyOMR OMR article + hub cards link back to MCC statewide desk. **Rule:** when publishing utility/news twins, interlink both directions in the same session.
- **2026-08-10:** Site modal system (MyOMR architecture → MCC) — `docs/SITE_MODAL_SYSTEM.md`; mount `SiteModalHost` in public layout; campaigns WhatsApp / newsletter / civic / events + top-story pool; `data-site-cta`; flag `NEXT_PUBLIC_SITE_MODAL_AUTO`. **Rule:** do not port OMR hire copy; cap auto-pops per session.
- **2026-08-11:** Reach hubs batch — gold footer visibility; events Today/Weekend chips; festivals / salary / EV guides; WhatsApp admin toolkit; hospital directory seed (`db:seed:chennai-hospitals-directory:live`). Routes listed in `src/content/reach/reach-hubs.ts`.
- **2026-08-12:** Jobs — female UKG shadow teacher (Orchids Pallikaranai) live via `db:seed:chennai-job:shadow-teacher-orchids-pallikaranai:live`; apply CTA is Facebook message ([profile](https://www.facebook.com/vivek.viswanathan.351/)). **Rule:** parent shadow-teacher hires are part-time onsite jobs with FB/phone apply — do not label the school as the verified employer.
- **2026-08-13:** Directory — Hastina Café rooftop (Hastinapuram / Chromepet) live via `db:seed:hastina-cafe-rooftop-chromepet:live` → `/directory/restaurant/hastina-cafe-rooftop-hastinapuram-chromepet`. **Rule:** café/venue promos with phone + Maps go in **directory `restaurant`**, not news/classifieds; dated public nights can optionally also use events.
- **2026-08-12:** Compulsive hubs Waves 0–E (18 connective pages) — registry `src/content/compulsive/index.ts`; `/chennai-today`; cost calcs (petrol/EV, AC bill, afford-area); identity (quiz, rivalries, moved checklist, PG red-flags, slang); civic (`address-form-fixer`, `streetlight-dead-spots`) + property-tax checklist; culture (filter coffee, biryani bracket, temple quiet hours, Margazhi); market pulse (used vehicle, wedding venues). Shared `GuideDisclaimer` / `GuideFinePrint` + WhatsApp copy share. **Rule:** interactive MVP first (no UGC votes/APIs); money/civic pages always carry Disclaimer + AI fine print; sitemap civic tools via `CIVIC_TOOL_PATHS`, other compulsive via `COMPULSIVE_SITEMAP_ENTRIES`.
- **2026-08-14:** Compulsive polish — GA4 `compulsive_share` / `compulsive_quiz_complete` / `compulsive_checklist_complete`; homepage **Tools Chennai uses** strip; site modal campaign `today` (`data-site-cta="today"`) in rotation; deleted root QR junk PNGs; tools funnel news desk `db:seed:chennai-tools-funnel-desk-august-2026(:live)` (AC / rent / Metro→today articles).
- **2026-08-14:** Deepen `/chennai-today` (gold line, WhatsApp forward + group-admin draft, 5-min ISR); Tamil twins `/chennai-today-tamil`, `/guides/chennai-afford-area-calculator-tamil`, `/guides/which-chennai-are-you-tamil` with `hreflang`; area-hub tools strip + article Explore band + `/aeo/chennai.md` tool answers. **Speed:** AdSense + GA4 `lazyOnload`; Geist `display: swap` + mono not preloaded; homepage hero self-hosted images; AVIF/WebP + 7-day image cache; homepage news+feed in parallel; ward map deferred until near viewport; `SiteModalHost` behind `Suspense` so it does not block HTML; cache headers for `/images` and `/data/chennai-map`. **Rule:** bilingual twins follow WhatsApp `-tamil` suffix + `alternates.languages`; never load AdSense/GA beforeInteractive; keep listing hubs `force-dynamic` (empty-home lesson) — speed those pages with parallel queries and deferred JS, not ISR shells.
- **2026-08-14:** Week desk — 20 civic articles for **8–14 Aug 2026** via `db:seed:chennai-week-desk-august-2026(:live)` (`scripts/content/chennai-week-desk-august-2026.ts`). Property-tax pause, monsoon/SWD, Water Metro study, Phase II 54%, conclave, fever, I-Day security, gold/fuel/power, Kodungaiyur canal, Keelkattalai, Urimai Thogai, airport/Chromepet. Each has Disclaimer + AI fine print, FAQ (or howto), cross-links into tools/hubs. **Rule:** multi-source week packs still use the civic-editorial slots (FAQ accordion, countdown, related reading) — do not invent a parallel article UI.
- **2026-08-14:** Lead Tamil twins + weekend watch — `db:seed:chennai-week-desk-lead-tamil-august-2026(:live)` for tax / Mayor rain / Water Metro / I-Day (EN↔TA `hreflang` via `src/lib/seo/article-language.ts`) plus Monday checkpoint desk. Social copy in `WEEK_DESK_SOCIAL_POSTS`. **Rule:** Tamil news is natural civic Tamil + `-tamil` slug + `alternates.languages`; update the Monday watch desk after 17 Aug primary reports, do not invent outcomes in advance.
- **2026-08-15:** Weekend watch Saturday morning update (I-Day is *today*) — News18 flag-hoist report + GCTP curb plan + Skymet/IMD rain forecast; tax portal and Monday rain **not invented**. Pin on home tools strip + `/chennai-today` / `-tamil` via `WeekendWatchPin`. Reseed `db:seed:chennai-week-desk-lead-tamil-august-2026:live`. GSC API submit failed (stale `GOOGLE_APPLICATION_CREDENTIALS` path) — resubmit sitemaps in the GSC UI until the SA JSON is restored. **Rule:** mid-weekend watch updates use primary reports only; keep the Monday 17 Aug checkpoint empty until those reports exist.
- **2026-08-15:** Tourism desk + TTDC ECR weekend — hub `/chennai-tourism`, itinerary `/chennai-tourism/this-weekend-ecr-plan` (poster unpack: Marundeeswarar, DakshinaChitra, Muttukkadu, ₹99 biryani, kite festival, UNESCO Shore Temple, WSL surf). News `db:seed:ttdc-ecr-weekend-plan-august-2026(:live)` → `/chennai-local-news/ttdc-this-weekend-ecr-plan-august-2026`. Events: kite festival + Shore Temple Classic via `db:seed:event:tn-international-kite-festival(:live)` and `db:seed:event:shore-temple-classic-surfing(:live)`. Poster under `public/images/tourism/` (+ articles/events copies). **Rule:** official tourism posters get a dedicated tourism page *and* a news desk; do not treat TTDC artwork as a bookable package; ₹99 biryani must stay “confirm the kitchen”.
- **2026-08-15:** Dedicated kite-festival news — `db:seed:tn-international-kite-festival-august-2026(:live)` → `/chennai-local-news/tamil-nadu-international-kite-festival-mamallapuram-august-2026` (same slug as the event, different hub). Sources: [tnikf.com](https://tnikf.com/), DT Next, The Hindu (Poikkal Kuthirai kite). Hero `public/images/articles/tamil-nadu-international-kite-festival-mamallapuram-august-2026.png`. **Rule:** when a festival already has an event + tourism loop, still write a dedicated news desk if the user supplies a festival-specific poster; flag third-party wrong venues (Thiruvidanthai / 17 Aug) against the official site.
- **2026-08-15:** Jobs — More supermarket Store Manager / Duty Manager **walk-in** (Hotel Royal Plaza Koyambedu, **24 Aug 2026**, 10 AM–5 PM) via `db:seed:chennai-job:more-supermarket-walk-in-koyambedu:live` → `/chennai-jobs/more-supermarket-store-duty-manager-walk-in-koyambedu-aug-2026`. Flyer `public/images/listings/more-supermarket-walk-in-koyambedu-aug-2026.png`. Contacts 91108 67199 / 95918 91671. **Rule:** flyer walk-ins keep venue + date in the title so the hub Walk-in filter matches; do not invent salary or documents if the flyer omits them; flyer image needs a git push before Vercel can serve it.
- **2026-08-15:** Jobs — MP Developers mega walk-in (Pallavaram interview · Guindy work; 5 roles) via `db:seed:chennai-job:mp-developers-mega-walk-in-pallavaram:live` → `/chennai-jobs/mp-developers-mega-walk-in-pallavaram-guindy`. Flyer `public/images/listings/mp-developers-mega-walk-in-pallavaram-aug-2026.png`. Apply `careers@mpdevelopers.com` / 78457 58753. **Rule:** keep flyer role names as printed (e.g. “3D Modular”); do not merge extra LinkedIn contacts that are not on the flyer.
- **2026-08-15:** Wave F habit tools + gold post-MVP + event submit + admin articles Phase A. Power/feeder, Metro Water, auto fare cards, dengue week, flood street-score; Tamil twins for petrol / AC / property-tax; gold history + buying guide + Tamil snippet; `/chennai-local-events/submit`; `/admin/articles`; civic directory batch; weekend follow-up news (I-Day wrap, TNPDCL still no scorecard, auto-fare pending). Meetup TBA notes re-checked 15 Aug — still no invented venues. **Rule:** skipped 30-list habit tools ship as editorial desks (no fake live APIs); Monday 17 Aug watch desk still waits for primary reports.
- **2026-08-15:** News — M.O.P. Vaishnav + AIMS workshop “Leaders for a Sustainable Future” (13–14 Aug 2026) via `db:seed:mop-vaishnav-leaders-sustainable-future-workshop-aug-2026(:live)` → `/chennai-local-news/mop-vaishnav-leaders-for-a-sustainable-future-workshop-august-2026`. Heroes under `public/images/articles/mop-vaishnav-leaders-sustainable-future-workshop-aug-2026-*.png`. **Rule:** campus workshop reports from organiser briefs keep Disclaimer + AI fine print; use organiser participant/session counts as attributed figures; self-host supplied event photos.
- **2026-08-16:** Partner rotator is the public house-ad path — remaining IAB `AdSlot` mounts replaced with `PageAdSlot` (one unit per page). `ArticleAdRegion` is AdSense-only. `AdvertisePanel` unchanged. Catch-all `site_band` still covers pages without an inline slot.
- **2026-08-16:** News — Chennai local job ads guide for owners/HR via `db:seed:chennai-local-job-ads-guide-business-owners-hr(:live)` → https://mychennaicity.in/chennai-local-news/chennai-local-job-ads-guide-business-owners-hr. Lists Vacancy Chennai, MyChennaiCity Jobs, MyNangnallur, MyOMR, MyCovai as **independent local blogs/desks** (not “sister network” copy); Apna + Freshersworld last. Hero Unsplash “We are hiring” (`public/images/articles/chennai-local-job-ads-guide-business-owners-hr-hero.jpg`, [photo](https://unsplash.com/photos/B3UFXwcVbc4)) — needs git push for Vercel. **Rule:** cross-site promo guides use genuine-blog framing + national boards last; keep Disclaimer + AI fine print; log backlink placements in CHENNAI_JOBS_OUTREACH.
- **2026-08-16:** News heroes — civic batch + waste/DVAC/IAS were sharing byte-identical or same-path images. Replaced with unique Wikimedia Commons assets via `scripts/replace-civic-news-hero-images.ts`; path remaps via `scripts/update-shared-hero-paths.ts`. **Rule:** never re-run `fix-civic-hero-images-local.ts` (it copies the same 3–4 files under many names); each published news hero must be a unique file hash + thematic match; bilingual twins may share one hero.
- **2026-08-16:** News — FSSAI ban then revoke on **11 Enrica liquor brands** (TASMAC stop-sale → withdraw) via `db:seed:fssai-tasmac-11-liquor-brands-ban-revoked-august-2026(:live)` → https://mychennaicity.in/chennai-local-news/fssai-tasmac-11-liquor-brands-ban-revoked-enrica-august-2026. Timeline 11–14 Aug 2026; brand list; Minister Vignesh on central FSSAI role; improvement notice ~30 days. Hero `public/images/articles/fssai-tasmac-11-liquor-brands-ban-revoked-august-2026-hero.png` (needs git push for Vercel). Sources: The Hindu, TNIE, DT Next, ToI. **Rule:** fast regulatory U-turns keep circular timeline + attributed stock figures only; do not glamorise product photography in the hero.

---

## 7. Daily work logs

Cross-chat day summaries. Source: git commits on `main` + Cursor agent transcripts under this project. Keep entries factual; link live URLs with the `.in` host only.

### 2026-08-15

**Focus:** Next-50 batch — Wave F habit tools, gold post-MVP, event submit, admin articles Phase A, civic directory + weekend follow-up seeds. Do **not** invent Monday 17 Aug watch-desk outcomes or a TNPDCL full 3.70-lakh scorecard.

#### Chats
| Chat | Transcript | Focus |
| --- | --- | --- |
| [Next 50 + ship batch](e79eb1bb-927e-475c-af3e-29adc96e0207) | `e79eb1bb-…` | Planner 50 + implement agent-owned items |
| [Week desk / Tamil / speed](7255b950-aa8f-42ea-bbca-88d717970b29) | `7255b950-…` | Saturday watch update, pin, GSC attempt |
| [MOP Vaishnav workshop news](46f12827-f8a0-4b7c-a2ca-e0e99adb9ff3) | `46f12827-…` | Leaders for a Sustainable Future article (retry after resource exhaust) |

#### Shipped in repo (live after commit/push + seeds)
1. **Habit desks** — `/civic-tools/power-feeder-desk`, `/civic-tools/metro-water-schedule`, `/guides/chennai-auto-fare`, `/guides/chennai-dengue-week`, `/civic-tools/flood-street-score`
2. **Gold** — Tamil snippet on hub; `/guides/buying-gold-in-chennai`; `/chennai-gold-rate/history`
3. **Tamil twins** — petrol, AC, property-tax, slang, PG (`-tamil` + hreflang)
4. **Event submit** — `/chennai-local-events/submit` (draft + IP rate limit)
5. **Admin** — `/admin/articles` publish / unpublish / feature
6. **Seeds** — `db:seed:chennai-civic-directory-batch(:live)`; `db:seed:chennai-weekend-followups-august-2026(:live)` (I-Day wrap; TNPDCL still no scorecard; auto-fare pending)
7. **Ops** — `contact_intent_select` GA4; WhatsApp contact redirect rate limit; Meetup TBA notes re-checked (no invented venues)
8. **Watch Saturday update** — EN/TA weekend watch reseeded with News18 I-Day hoist + unconfirmed leftover closures; tax portal / Monday rain not invented. Pin: `WeekendWatchPin` on home tools strip + `/chennai-today` (EN/TA). GSC API submit failed (stale SA JSON path).
9. **Jobs** — More supermarket walk-in (Store Manager / Duty Manager, Koyambedu 24 Aug 2026) via `db:seed:chennai-job:more-supermarket-walk-in-koyambedu:live` → https://mychennaicity.in/chennai-jobs/more-supermarket-store-duty-manager-walk-in-koyambedu-aug-2026 (flyer image needs git push)
10. **Jobs** — MP Developers mega walk-in (Pallavaram / Guindy, 5 roles) via `db:seed:chennai-job:mp-developers-mega-walk-in-pallavaram:live` → https://mychennaicity.in/chennai-jobs/mp-developers-mega-walk-in-pallavaram-guindy (flyer image needs git push)
11. **News** — M.O.P. Vaishnav + AIMS “Leaders for a Sustainable Future” (13–14 Aug 2026) via `db:seed:mop-vaishnav-leaders-sustainable-future-workshop-aug-2026(:live)` → https://mychennaicity.in/chennai-local-news/mop-vaishnav-leaders-for-a-sustainable-future-workshop-august-2026 (article images need git push)
12. **Partner ad rotator** — `PageAdSlot` is the public house-ad path (IAB `AdSlot` mounts removed); AdSense-only `ArticleAdRegion`; `AdvertisePanel` unchanged; SOP K (not live until commit/push)

#### Operator still owns
Vercel `NEXT_PUBLIC_SITE_MODAL_AUTO`, `REVALIDATE_SECRET`; WhatsApp notes already written; GSC MCP auth + restore `GOOGLE_APPLICATION_CREDENTIALS` file then `npm run gsc:submit-sitemap`; GA4 dashboards; Monday 17 Aug watch desk after primary reports.

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

### 2026-08-12 — 2026-08-13

**Focus:** Compulsive hubs Waves 0–E (18 connective pages) + job Facebook apply label + Hastina / shadow-teacher seed scripts in tree.

#### Chats
| Chat | Transcript | Focus |
| --- | --- | --- |
| [Compulsive hubs plan + ship](7255b950-aa8f-42ea-bbca-88d717970b29) | `7255b950-…` | Plan + implement 18 hubs; registry; nav/sitemap; docs |

#### Shipped / live
1. **`/chennai-today`** — 60-second morning card  
2. Cost desks — petrol vs EV, AC bill, afford-area  
3. Identity — which-Chennai quiz, rivalries, moved checklist, PG red-flags, slang  
4. Civic — address-form-fixer, streetlight-dead-spots, property-tax checklist  
5. Culture — filter coffee, biryani bracket, temple quiet hours, Margazhi  
6. Market — used vehicle pulse, wedding venue costs  
7. Registry: `src/content/compulsive/index.ts` · llms.txt flagship links  
8. **Commit/push:** `a20d713` → `main` (Vercel deploy)  
9. **Live seeds refreshed:** shadow teacher job + Hastina Café Chromepet directory listing  

#### Left untracked (junk)
- Root QR crop PNGs (`HJxkR0AaMAARitn.png`, `qr_crop*.png`) — do not commit.