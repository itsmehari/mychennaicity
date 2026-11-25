# Chennai classifieds growth — PRD, phases, checklist

Status: **Phase 1 shipped in repo** (22 Nov 2026). Live URLs need deploy + seeds.  
Canonical site: https://mychennaicity.in

## Executive summary

Readers already browse `/chennai-classifieds`, but supply CTAs were weak (mostly Contact). Competitors (Locanto, Click.in, Yalu, TN45) own “post classified ad Chennai” SERPs with category landings and self-serve forms. We keep the **editorial desk model** (no poster login) but need **dedicated supply landings**, **AEO/GEO passages**, and a **four-phase roadmap** to indexed category/area slices and optional self-serve submit.

## Current state (audit)

| Area | Status | Gap |
| --- | --- | --- |
| Board | `GET /chennai-classifieds` + `?category=` | No stable indexable category paths (query is filtered only) |
| Detail | `GET /chennai-classifieds/[slug]` | Phone gate, media — solid |
| Admin | `/super-admin` classifieds shell | Seeds primary intake; no public create |
| Property pitch | `/advertise/property` (+ Tamil) | Property only, not general classifieds |
| Jobs pitch | `/advertise/jobs` (+ Tamil) | Separate funnel; hirer vs wanted rules in SOP M |
| Expiry | `expires_at` on rows | **Public queries do not hide expired** `open` rows (known debt) |
| SEO hub title | Was “Chennai classified ads” | Phase 1 renames to “local classified ads” + supply links |
| llms / AEO | Jobs + events passages | Classifieds passages added Phase 1 |
| Sitemap | Open classified slugs + advertise paths | Guide URLs added Phase 1 |

## Target keywords (SEO / AEO / GEO)

Primary (English):

- post classified ad in Chennai
- Chennai classified ads / Chennai local classifieds
- free classified ads Chennai
- post wanted ad Chennai
- local classifieds Tamil Nadu (secondary)

Primary (Tamil, surface on TA twins):

- சென்னை வகை விளம்பரம் போட
- சென்னை உள்ளூர் விளம்பரங்கள்

Competitor SERP pattern: city + “post classified” + category nouns (property, services, jobs). We answer with **stable URLs** on `.in`, **FAQPage** on pitch + guide, **geo meta** on Chennai landings, and **llms.txt** citations.

## User journeys

### Poster (supply)

1. Land on `/advertise/classifieds` or `/guides/post-classified-ad-chennai` (organic or WhatsApp share).
2. Read workflow + category fit.
3. WhatsApp prefill → desk → seed → shareable `/chennai-classifieds/[slug]`.

### Reader (demand)

1. Land on hub or Google result → category filter → detail → call / gated phone.

### Editor (you)

1. Seed script or super-admin (future) → set `expires_at` → optional featured.

## Phase plan

### Phase 1 — Supply landings + SEO foundation (shipped)

- [x] `/advertise/classifieds` + `/advertise/classifieds-tamil` pitch pages with FAQ JSON-LD
- [x] `/guides/post-classified-ad-chennai` (+ Tamil) with FAQ + hreflang
- [x] `CLASSIFIEDS_POSTER_PASSAGE` / `CLASSIFIEDS_BROWSE_PASSAGE` in `src/content/aeo/classifieds-passages.ts`
- [x] Hub CTAs → advertise classifieds; contact channel `classifieds`
- [x] Sitemap + llms.txt pointers
- [x] Example live ad: helper chef (services)

### Phase 2 — Indexable slices + hub richness (4–6 weeks)

1. Route `/chennai-classifieds/categories/[slug]` with intro copy (mirror jobs pattern).
2. `noindex` until ≥5 open ads + ≥3 distinct posters per category; then self-canonical.
3. Fix `openClassifiedConditions` to exclude `expires_at < now()`.
4. Featured classified campaigns file (like `featured-job-campaigns.ts`).
5. Classifieds hub FAQ block + `ItemList` refresh (real rows only).
6. Homepage strip: “Post a classified” when ≥3 open ads.
7. Area hub modules: pull matching classifieds on relevant belts (OMR, Guindy, etc.).
8. `POST /api/classifieds/reveal-phone` analytics on pitch referrers.
9. Tamil titles for high-traffic categories.
10. Internal links from flatmate / PG guides → classifieds pitch.

### Phase 3 — Self-serve submit (8–10 weeks)

11. `/chennai-classifieds/submit` draft form (like events submit) → `status=draft`.
12. Super-admin publish queue for classified drafts.
13. Rate limit by IP + phone hash.
14. Optional `contact_phone_gated` default for sensitive categories.
15. Email acknowledgement template (no poster phone in email subject).
16. UTM + `content_engagement_events` for submit funnel.
17. Revalidation hook on publish (already partial via `finishListingSeedLive`).
18. Moderation checklist doc in super-admin UI.

### Phase 4 — Growth + measurement (ongoing)

19. GSC weekly: impressions for “post classified ad chennai” cluster.
20. Indexing API ping on new classified slugs (when credentials set).
21. Partner band A/B on classifieds hub only (SOP K).
22. WhatsApp community pin: weekly “new on the board”.
23. Outreach pack for brokers / tuition desks / PG agents (reuse `CHENNAI_JOBS_OUTREACH` format).
24. Compare snippet refresh vs Locanto (FAQ diffs).
25. Optional paid boost tier for property (existing package) — do not invent fee until decided.

## Pre-publish checklist (every new classified)

- [ ] Category matches poster intent (jobs vs services vs property).
- [ ] Phone is poster’s; privacy takedown path if wrong number (SOP M).
- [ ] Salary/price only if printed; no invented employer name.
- [ ] `expires_at` set (default 90d).
- [ ] Slug includes month-year for batch ads.
- [ ] `package.json` `:live` script wired.
- [ ] After live seed: HEAD 200 on detail + category hub.
- [ ] Changelog line in `docs/AGENT_LEARNINGS_AND_SOPS.md`.

## Pre-ship checklist (Phase 2+ features)

- [ ] Public query hides expired rows.
- [ ] Category slice gate tests (5 ads / 3 posters).
- [ ] No `FAQPage` with stale fees.
- [ ] Tamil + English hreflang on new landings.
- [ ] `docs/CHENNAI_CLASSIFIEDS_GROWTH_PRD.md` phase todos updated.

## Success metrics

| Metric | Baseline | Phase 2 target |
| --- | --- | --- |
| Indexed supply URLs | 2 pitch + 2 guides | +7 category paths when gated |
| GSC clicks “chennai classified” | TBD | +30% QoQ |
| WhatsApp `advertise_classifieds` sends | 0 tracked | visible in desk |
| Open ads on board | DB count | +20% MoM |

## Files (Phase 1)

| Path | Role |
| --- | --- |
| `src/app/(public)/advertise/classifieds/page.tsx` | Primary supply landing |
| `src/components/advertise/classifieds-pitch-page.tsx` | Pitch UI |
| `src/content/guides/post-classified-ad-chennai.ts` | FAQ + workflow copy |
| `scripts/seed-helper-chef-wanted-velachery-perungudi-tambaram.ts` | Sample services ad |

Rule: **Hirer notes without company name** → classifieds `services`. **Named employer + role** → jobs desk (see changelog 2026-11-20 A.S. Associates vs vehicle cleaning).