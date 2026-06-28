/**
 * Print Expo Chennai — Chennai Trade Centre (9–11 Jul 2026).
 *
 * Dev:  `npm run db:seed:event:print-expo-chennai`
 * Live: `npm run db:seed:event:print-expo-chennai:live`
 *
 * Poster: `public/images/events/print-expo-chennai-trade-centre-july-2026.png`
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

export const PRINT_EXPO_CHENNAI_SLUG =
  "print-expo-chennai-trade-centre-july-2026";

const REGISTRATION_URL = "https://www.printexpo.co.in";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `South India's trusted print-industry sourcing platform — live demos, expert sessions, and business connections at Chennai Trade Centre, 9–11 Jul 2026.

**Organiser:** Messe Frankfurt · Showcase Trade Fairs And Business Media Private Limited

**Print Expo Chennai** — *South India prints here.* The **16th edition** of South India's trusted sourcing platform for print businesses, co-located with **mediaexpo CHENNAI**.

**When:** **Thursday – Saturday, 9–11 July 2026** · trade fair hours (confirm on site)

**Where:** **Chennai Trade Centre**, Mount Poonamallee Road, Nandambakkam, Chennai 600089

### What to expect

- **Live demos** of print and packaging technology
- **Industry experts** and product showcases
- **Business connections** across the print supply chain
- **Future-ready solutions** — smarter workflows, stronger partnerships, better business

### Visitor registration

[Get your visitor badge at printexpo.co.in](${REGISTRATION_URL}) before you travel.

Details from the organiser poster (July 2026). Confirm timings, exhibitor list, and entry requirements on the official site.`;

async function main() {
  const cityId = await getChennaiCityId(db);
  const row = {
    slug: PRINT_EXPO_CHENNAI_SLUG,
    title: "Print Expo Chennai 2026 — Chennai Trade Centre (9–11 Jul)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 7, 9, 10, 0),
    endsAt: istToUtcDate(2026, 7, 11, 19, 0),
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
    eventSlug: PRINT_EXPO_CHENNAI_SLUG,
    label: "event-seed",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
