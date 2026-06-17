/**
 * Tote Bag Paint & Play — Thinnai, Madhanandapuram / Porur (13 Jun 2026).
 *
 * Dev:  `npm run db:seed:event:tote-bag-paint-play-porur`
 * Live: `npm run db:seed:event:tote-bag-paint-play-porur:live`
 *
 * Poster: `public/images/events/tote-bag-paint-and-play-thinnai-porur-june-2026.jpg`
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

export const TOTE_BAG_PAINT_PLAY_SLUG =
  "tote-bag-paint-and-play-thinnai-porur-june-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

/** First paragraph is meta description + hero intro (≤155 chars ideal). */
const DESCRIPTION = `Paint your own tote bag at Thinnai, Madhanandapuram, Porur, Chennai — Fri 13 Jun 2026, 5:30–8:30 PM. ₹299; limited to 12 seats.

**Organiser:** Thinnai

**Thinnai** presents **Tote Bag Paint & Play** — a creative social evening where you design and paint your own tote bag while enjoying board games, conversations, and complimentary beverages in a relaxed, welcoming space. No prior painting experience needed; come solo or with a friend.

**When:** Friday, 13 June 2026 · **5:30 PM – 8:30 PM IST**

**Where:** Thinnai, 11th 1 Cross Street, Annai Velankanni Nagar Phase 1, Madhanandapuram, Porur, Chennai 600125

### What's included

- Tote bag and all painting materials
- Board games access during the session
- Complimentary beverages (no meals included)
- Your finished tote bag to take home

### Fee and booking

- **₹299 per person** · **18+** · **12 participants max** (first-come, first-served)
- Book on [Kynhood](https://kynhood.com/event/6a27f1ee737c1afc7c71ccf6)
- Instagram: [@thinnaiboardgames_](https://instagram.com/thinnaiboardgames_)

### Before you book

- Registration is confirmed only after successful payment
- Tickets are non-refundable and non-transferable
- Full refund if the organiser cancels
- Arrive on time; organisers may make minor schedule changes
- By attending, you consent to photos/videos for Thinnai's promotional use

Details sourced from the organiser listing on Kynhood (June 2026). Confirm timings and availability before you travel.`;

async function main() {
  const cityId = await getChennaiCityId(db);
  const row = {
    slug: TOTE_BAG_PAINT_PLAY_SLUG,
    title:
      "Tote Bag Paint & Play — Thinnai, Madhanandapuram, Chennai (13 Jun 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 6, 13, 17, 30),
    endsAt: istToUtcDate(2026, 6, 13, 20, 30),
    allDay: false,
    venueName: "Thinnai",
    venueAddress:
      "11th 1 Cross Street, Annai Velankanni Nagar Phase 1, Madhanandapuram, Porur, Chennai 600125",
    localityLabel: "Madhanandapuram",
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
    eventSlug: TOTE_BAG_PAINT_PLAY_SLUG,
    label: "event-seed",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
