/**
 * Kathakali — Tamil solo play at reStore, Kottivakkam (27 Jun 2026).
 *
 * Dev:  `npm run db:seed:event:kathakali-restore-kottivakkam`
 * Live: `npm run db:seed:event:kathakali-restore-kottivakkam:live`
 *
 * Poster: `public/images/events/kathakali-restore-kottivakkam-june-2026.png`
 * (registered in `src/lib/events/event-poster-image.ts`)
 */
import { neon } from "@neondatabase/serverless";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { events } from "../src/db/schema/tables";
import {
  getChennaiCityId,
  insertEventIfMissing,
  istToUtcDate,
  isLiveSeed,
  loadEventSeedEnv,
  requireDatabaseUrl,
  finishListingSeedLive,
} from "./lib/seed-event-shared";

export const KATHAKALI_RESTORE_SLUG =
  "kathakali-tamil-solo-play-restore-kottivakkam-june-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `Tamil solo play **Kathakali** at reStore, Kottivakkam — Sat 27 Jun 2026, 5:00 PM. 30 minutes · 16+ · gift economy. Seetha Lakshmi performs; play by Karthik.

**Theatre & performance** in **Kottivakkam, Chennai**

**Organiser:** reStore — Health · Livelihoods · Nature

**reStore** presents **Kathakali**, a Tamil solo play performed by **Seetha Lakshmi**, written by **Karthik**. The piece invites you to ponder simple questions of life — can love be spoken of beyond the bedroom? Can reflections create ripples? Can conversations reimagine community? — with gentle and deep curiosity.

**When:** Saturday, 27 June 2026 · **5:00 PM – 5:30 PM IST** (30 minutes)

**Where:** reStore, 150/3 East Coast Road, Kottivakkam, Chennai 600041

**Tickets:** Gift economy — contribute what feels right on the day

**For:** Ages **16+**

**Contact:** Call **9840571842** to confirm your seat or ask about accessibility

### Before you go

- Gift-economy events: arrive on time; seating may be limited
- Confirm date and timing by phone before you travel
- Poster and listing details from the organiser (June 2026)`;

async function main() {
  const cityId = await getChennaiCityId(db);
  const row = {
    slug: KATHAKALI_RESTORE_SLUG,
    title:
      "Kathakali — Tamil solo play by Seetha Lakshmi at reStore, Kottivakkam (27 Jun 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 6, 27, 17, 0),
    endsAt: istToUtcDate(2026, 6, 27, 17, 30),
    allDay: false,
    venueName: "reStore",
    venueAddress: "150/3, East Coast Road, Kottivakkam, Chennai 600041",
    localityLabel: "Kottivakkam",
    featured: false,
  };

  const result = await insertEventIfMissing(db, cityId, row);
  if (result === "exists") {
    await db
      .update(events)
      .set({
        title: row.title,
        description: row.description,
        startsAt: row.startsAt,
        endsAt: row.endsAt,
        allDay: row.allDay,
        venueName: row.venueName,
        venueAddress: row.venueAddress,
        localityLabel: row.localityLabel,
        featured: row.featured,
        status: "scheduled",
        updatedAt: new Date(),
      })
      .where(and(eq(events.cityId, cityId), eq(events.slug, row.slug)));
    console.log("Refreshed event:", row.slug);
  }
  await finishListingSeedLive({
    eventSlug: KATHAKALI_RESTORE_SLUG,
    label: "event-seed",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
