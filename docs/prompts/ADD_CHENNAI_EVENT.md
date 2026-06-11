# Prompt & checklist — add a Chennai local event (production)

**Use this file** whenever you (or an agent) add a new public event to **mychennaicity.in**.

**Also read:** [`docs/CHENNAI_EVENTS.md`](../CHENNAI_EVENTS.md) · [`docs/DATABASE_AND_VERCEL.md`](../DATABASE_AND_VERCEL.md) · [`scripts/lib/seed-event-shared.ts`](../../scripts/lib/seed-event-shared.ts)

**Cursor:** rule [`.cursor/rules/chennai-events.mdc`](../../.cursor/rules/chennai-events.mdc) should attach when editing event routes, components, or seed scripts.

---

## Agent instructions (read first)

1. **Do not guess** schema or routes — `events` columns are in `src/db/schema/tables.ts`.
2. **Do not hardcode** one event in templates; new rows go through a **seed script** (or future admin).
3. **Slug** must be unique per Chennai: `[a-z0-9-]+`, stable, derived from title + year/area.
4. **Times** are stored as UTC but must represent **Asia/Kolkata** wall clock — use `istToUtcDate()` from `scripts/lib/seed-event-shared.ts`.
5. **Public visibility** requires `status: "scheduled"` and end (or start) ≥ now.
6. **No fake pricing** in UI or JSON-LD; no fake `organizer` URL.
7. **Images:** if using `next/image`, add remote host to `next.config.ts` or self-host under `public/`.
8. **Idempotent seeds:** skip insert when `(city_id, slug)` exists; log and exit cleanly.
9. After **live** seed, verify hub card + detail page on production URL.
10. **Rich festival?** Only use `presentation_key: "festival_rich"` when you will add the full content bundle (schedule, PDF, FAQ). Otherwise use standard prose layout.

---

## Information to collect from the user

| Field | Required | Example |
|-------|----------|---------|
| Event title | Yes | Champions of Change Award Function |
| Start date & time (IST) | Yes | 1 Jun 2026, 6:00 PM |
| End date & time (IST) | If known | 1 Jun 2026, 9:30 PM |
| All-day? | If multi-day festival | false |
| Venue name | Yes | Hotel ITC Grand Chola |
| Address | Recommended | GST Road, Guindy, Chennai |
| Area / locality | Recommended | Guindy |
| Organiser | Recommended | Lions Council of India |
| Description (markdown) | Yes | Programme, guests, dress code, contact |
| Featured on hub? | Optional | true for flagship listings |
| Ticket / registration URL | Optional | Not a DB field yet — put in description or WhatsApp CTA |
| Official PDF | Optional | Upload to `public/documents/...` |
| Companion news story? | Optional | Separate article seed |
| Hero / poster image URL | Optional | Festival bundle or allowlisted CDN |

---

## Standard event (prose detail page)

### Files to create/change

1. `scripts/seed-event-{slug-short}.ts` — use `scripts/lib/seed-event-shared.ts`
2. `package.json` — add `db:seed:event:{slug-short}` and `:live` scripts
3. (Optional) `src/lib/events/event-hub-helpers.ts` — only if new category keywords needed

### Seed template (minimal)

```typescript
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import {
  getChennaiCityId,
  insertEventIfMissing,
  istToUtcDate,
  isLiveSeed,
  loadEventSeedEnv,
  requireDatabaseUrl,
} from "./lib/seed-event-shared";

export const MY_EVENT_SLUG = "my-event-slug-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Organiser:** Example Org

Short intro paragraph.

**When:** … · **Where:** …

### Details

…`;

async function main() {
  const cityId = await getChennaiCityId(db);
  await insertEventIfMissing(db, cityId, {
    slug: MY_EVENT_SLUG,
    title: "Event title",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 6, 1, 18, 0),
    endsAt: istToUtcDate(2026, 6, 1, 21, 30),
    allDay: false,
    venueName: "Venue name",
    venueAddress: "Full address, Chennai",
    localityLabel: "Area",
    featured: false,
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

### Commands

```bash
# Local / dev DB
npm run db:seed:event:{slug-short}

# Production (requires .env.production.local)
npm run db:seed:event:{slug-short}:live
```

### Verify

- [ ] `https://mychennaicity.in/chennai-local-events` — card appears with date badge + venue
- [ ] `https://mychennaicity.in/chennai-local-events/{slug}` — detail: summary, maps (if address), share, calendar
- [ ] Event JSON-LD in page source; organiser only if in description
- [ ] `sitemap.xml` includes detail URL (when DB query succeeds)
- [ ] Ended events 404 after `ends_at` passes

---

## Rich festival event (`festival_rich`)

Extra steps:

1. Create `src/content/special-events/{ref}.ts` (schedule, gallery, PDF, FAQ, SEO).
2. Register in `src/content/special-events/index.ts`.
3. Seed with `presentationKey: "festival_rich"`, `contentRef: "{ref}"`.
4. Follow `scripts/seed-event-mylapore-panguni-2026.ts` as reference.

---

## Copy-paste prompt for Cursor

```
Add a new Chennai local event to production for mychennaicity.in.

Read and follow:
- docs/prompts/ADD_CHENNAI_EVENT.md
- docs/CHENNAI_EVENTS.md
- scripts/lib/seed-event-shared.ts

Event details:
- Title: [TITLE]
- Start (IST): [DATE TIME]
- End (IST): [DATE TIME or “same day”]
- All-day: [yes/no]
- Venue: [NAME]
- Address: [FULL ADDRESS]
- Area: [LOCALITY]
- Organiser: [NAME]
- Featured: [yes/no]
- Description: [paste markdown or bullet points]
- Slug preference: [optional]
- Rich festival page: [yes/no]
- Poster image URL: [optional]
- Official PDF: [optional]
- Also publish news article: [yes/no]

Deliver:
1. Idempotent seed script + package.json scripts (dev + :live)
2. istToUtcDate for all timestamps
3. Brief note on what to run for production and URLs to verify
Do not break existing events or routes.
```

---

*End of checklist. Repository references: `src/db/schema/tables.ts` (`events`), `src/domains/events/queries.ts`, hub `src/app/(public)/chennai-local-events/page.tsx`.*
