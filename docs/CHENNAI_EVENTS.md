# Chennai local events — product, UI, and ops

**Routes:** `/chennai-local-events` (hub) · `/chennai-local-events/[slug]` (detail)

**Domain code:** `src/domains/events/` · **Seeds:** `scripts/seed-event-*.ts`

For **how to add a new event to production**, start with **[`docs/prompts/ADD_CHENNAI_EVENT.md`](prompts/ADD_CHENNAI_EVENT.md)** (agent/user checklist + copy-paste prompt). Cursor also loads [`.cursor/rules/chennai-events.mdc`](../.cursor/rules/chennai-events.mdc) when working on event files.

---

## 1. Data model (`events` table)

| Column | Notes |
|--------|--------|
| `slug` | Unique per `city_id`; URL segment. Lowercase, hyphenated, stable. |
| `title` | H1 and JSON-LD `name`. |
| `description` | Markdown prose on standard detail pages. Use `**Organiser:**` or `**X** presents` if organiser should appear in UI/JSON-LD. |
| `starts_at` / `ends_at` | `timestamptz`; store UTC instants that match **IST** wall times. |
| `all_day` | When true, calendar + display use date-only formatting. |
| `venue_name`, `venue_address`, `locality_label` | Location card, maps link, hub card venue line. |
| `status` | Public site only shows `scheduled` with `COALESCE(ends_at, starts_at) >= now()`. |
| `featured` | Hub “Featured” row + filter chip. |
| `presentation_key` + `content_ref` | Optional rich layout (`festival_rich` + bundle under `src/content/special-events/`). |

There is **no** `organizer`, `category`, `price`, or `image_url` column yet — UI infers tags and images from content (see below).

Indexation rules: [`CONTENT_ARCHITECTURE.md`](CONTENT_ARCHITECTURE.md#events-and-jobs-public-indexation).

---

## 2. Hub listing UI (2026-06)

**Inspired by** clean event-marketplace card rails (e.g. portrait posters, date badges, category chips).

| Piece | Path |
|-------|------|
| Page | `src/app/(public)/chennai-local-events/page.tsx` |
| Listing (client filter) | `src/components/events/events-hub-listing.tsx` |
| Card | `src/components/events/event-hub-card.tsx` |
| Card data / tags | `src/lib/events/event-hub-helpers.ts` |
| Styles | `src/styles/events-hub.css` |

**Behaviour:**

- DB rows → discovery cards; mock list when hub would be empty (no fake `ItemList` JSON-LD on mock).
- Horizontal swipe rails on mobile; responsive grid on desktop.
- Category chips: All, Festivals, Culture & arts, Community, Business & talks, Featured (client-side filter from inferred tags).
- Card image from festival rich `gallery[0]` or `seo.ogImageUrl` when `content_ref` is set; else gradient placeholder.
- Status line: **See details** (on-site) or **Tickets ↗** (external mock rows). No fake “Free” pricing.

---

## 3. Event detail UI (2026-06)

| Layout | When | Main component |
|--------|------|----------------|
| Standard | `presentation_key` is null | `src/components/events/event-detail-standard.tsx` |
| Festival rich | e.g. `festival_rich` | `src/components/events/special/festival-rich-event-detail.tsx` |

**Standard detail additions:**

| Piece | Path |
|-------|------|
| Summary card, location, CTAs, audience | `src/components/events/event-detail-parts.tsx` |
| Mobile sticky actions (share, calendar, directions) | `src/components/events/event-mobile-actions.tsx` |
| Share (Web Share API + copy fallback) | `src/components/events/event-share-button.tsx` |
| Maps / calendar / organiser parse | `src/lib/events/event-detail-helpers.ts` |
| Styles | `src/styles/event-detail.css` |

**SEO:** `src/lib/seo/event-jsonld.ts` — Event + BreadcrumbList; `organizer` only when parsed from description. Rich festivals: `src/lib/seo/festival-event-jsonld.ts`.

**Post event CTA:** links to `/contact` until a dedicated submit route ships.

---

## 4. Rich festival events (`festival_rich`)

1. Add content bundle: `src/content/special-events/{name}.ts` + register in `src/content/special-events/index.ts`.
2. Seed row with `presentationKey: "festival_rich"`, `contentRef` matching bundle key.
3. Register page in `src/domains/events/presentations/registry.ts` if adding a new presentation key.
4. PDFs / images: prefer `public/documents/...` or allowlisted `next.config.ts` remote hosts.

Reference: `scripts/seed-event-mylapore-panguni-2026.ts`, `src/content/special-events/mylapore-kapali-panguni-2026.ts`.

---

## 5. Seeding and production

### Shared module

`scripts/lib/seed-event-shared.ts` — env load, Chennai `city_id`, idempotent `insertEventIfMissing`, `istToUtcDate()`.

### Per-event scripts

Pattern: `scripts/seed-event-{short-name}.ts` + `package.json` scripts:

```json
"db:seed:event:{name}": "tsx scripts/seed-event-{name}.ts",
"db:seed:event:{name}:live": "tsx scripts/seed-event-{name}.ts --live"
```

### Live checklist

1. Confirm Vercel `DATABASE_URL` target Neon project ([`DATABASE_AND_VERCEL.md`](DATABASE_AND_VERCEL.md)).
2. `vercel env pull .env.production.local --environment=production` (gitignored).
3. `npm run db:seed:event:{name}:live`
4. Verify: `npm run db:check:live` (if events counted) + open live hub and detail URL.
5. **Redeploy Vercel** if you changed code (not required for DB-only inserts on `force-dynamic` routes).
6. Optional: companion **news article** seed (see `scripts/seed-edii-tn-ecommerce-training-2026.ts`).
7. New remote images → add host to `next.config.ts` `images.remotePatterns`.

### IST → UTC

Use `istToUtcDate(y, m, d, hour, minute)` from `seed-event-shared.ts`, or explicit ISO with `+05:30` offset. Wrong offsets shift date badges and calendar links.

---

## 6. Existing seed scripts (reference)

| Script | npm (live) |
|--------|------------|
| `seed-event-lions-champions-of-change-2026.ts` | `db:seed:event:lions-champions-of-change:live` |
| `seed-event-mylapore-panguni-2026.ts` | `db:seed:event:mylapore-panguni:live` |
| `seed-event-panguni.ts` | `db:seed:event:panguni:live` |
| `seed-edii-tn-ecommerce-training-2026.ts` | `db:seed:edii-tn-ecommerce-training-2026:live` |

---

## 7. Roadmap (not built)

- Public **submit event** form (`/chennai-local-events/submit` or similar) + moderation ([`EXECUTION_ROADMAP.md`](EXECUTION_ROADMAP.md)).
- DB columns for organiser, category, ticket URL, hero image (would simplify hub cards and JSON-LD).
- Home “Featured events” strip reuse of hub card components.

---

## 8. Changelog

| Date | Change |
|------|--------|
| 2026-06-10 | Hub: kynhood-style discovery cards + category filter. Detail: mobile-first summary, sticky actions, share/calendar/maps. Docs + `ADD_CHENNAI_EVENT` prompt + Cursor rule + `seed-event-shared.ts`. |
