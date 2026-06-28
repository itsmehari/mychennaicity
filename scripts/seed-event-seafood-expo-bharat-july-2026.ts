/**
 * Seafood Expo Bharat 2026 — Chennai Trade Centre (1–3 Jul 2026).
 *
 * Dev:  `npm run db:seed:event:seafood-expo-bharat`
 * Live: `npm run db:seed:event:seafood-expo-bharat:live`
 *
 * Poster: `public/images/events/seafood-expo-bharat-chennai-trade-centre-july-2026.png`
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

export const SEAFOOD_EXPO_BHARAT_SLUG =
  "seafood-expo-bharat-chennai-trade-centre-july-2026";

const REGISTRATION_URL = "https://www.seafoodexpobharat.com/";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `Premier seafood industry expo — global buyers, industry leaders, and business opportunities at Chennai Trade Centre, 1–3 Jul 2026.

**Organiser:** Marine Products Export Development Authority (MPEDA) · Ministry of Commerce & Industry, Government of India

**Seafood Expo Bharat 2026** — *Connect. Discover. Grow.* Asia's premier platform for India's seafood sector, bringing together producers, processors, exporters, innovators, and global buyers.

**When:** **Wednesday – Friday, 1–3 July 2026** · trade fair hours (confirm on site)

**Where:** **Chennai Trade Centre**, Mount Poonamallee Road, Nandambakkam, Chennai 600089

### What to expect

- **Global buyers** and international trade connections
- **Industry leaders** across aquaculture and seafood processing
- **Innovation** in traceability, quality, and sustainability
- **Business opportunities** for exporters, farmers, hatcheries, and technology providers

### Registration

[Register at seafoodexpobharat.com](${REGISTRATION_URL}) — delegate categories include Indian and overseas delegates, students, farmers/hatcheries, and visitor passes. MPEDA members can verify via e-MPEDA credentials.

Details from the organiser poster (July 2026). Confirm fees, timings, and hall access on the official site before you travel.`;

async function main() {
  const cityId = await getChennaiCityId(db);
  const row = {
    slug: SEAFOOD_EXPO_BHARAT_SLUG,
    title: "Seafood Expo Bharat 2026 — Chennai Trade Centre (1–3 Jul)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 7, 1, 10, 0),
    endsAt: istToUtcDate(2026, 7, 3, 19, 0),
    allDay: false,
    venueName: "Chennai Trade Centre",
    venueAddress: "Mount Poonamallee Road, Nandambakkam, Chennai 600089",
    localityLabel: "Nandambakkam",
    featured: true,
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
    eventSlug: SEAFOOD_EXPO_BHARAT_SLUG,
    label: "event-seed",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
