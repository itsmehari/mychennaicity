/**
 * Student Artists Federation — free folk arts training workshop (parai drumming).
 * Anna Nagar Tower Park, Sunday 4 October 2026, 11:00 AM–3:00 PM.
 * Source: organiser poster. Contact Mr. Prem Kumar.
 *
 * Dev:  `npm run db:seed:event:folk-arts-parai-anna-nagar`
 * Live: `npm run db:seed:event:folk-arts-parai-anna-nagar:live`
 *
 * Poster: `public/images/events/folk-arts-parai-workshop-anna-nagar-october-2026.jpg`
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import {
  finishListingSeedLive,
  getChennaiCityId,
  istToUtcDate,
  isLiveSeed,
  loadEventSeedEnv,
  requireDatabaseUrl,
  upsertEvent,
} from "./lib/seed-event-shared";

export const FOLK_ARTS_PARAI_ANNA_NAGAR_SLUG =
  "folk-arts-parai-workshop-anna-nagar-october-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Organiser:** Student Artists Federation

**Free folk arts training workshop (parai drumming).** The poster marks the workshop as free entry and closes with the line **Arts for People**.

**When:** Sunday, **4 October 2026**, **11:00 AM to 3:00 PM IST** (morning to afternoon, as printed).

**Where:** **Anna Nagar Tower Park**, Anna Nagar, Chennai. The flyer does not print a gate or landmark inside the park.

### Contact

**Mr. Prem Kumar** — **97898 49501**.

This listing is compiled from the organiser poster. It is not an official park notice. Confirm the meeting point inside Anna Nagar Tower Park before you go.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: FOLK_ARTS_PARAI_ANNA_NAGAR_SLUG,
    title:
      "Free Folk Arts Training Workshop, Parai Drumming, Anna Nagar Tower Park (4 Oct 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 10, 4, 11, 0),
    endsAt: istToUtcDate(2026, 10, 4, 15, 0),
    allDay: false,
    venueName: "Anna Nagar Tower Park",
    venueAddress: "Anna Nagar, Chennai",
    localityLabel: "Anna Nagar",
    featured: false,
  });
  console.log(
    "[seed-event-folk-arts-parai-anna-nagar]",
    result,
    FOLK_ARTS_PARAI_ANNA_NAGAR_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: FOLK_ARTS_PARAI_ANNA_NAGAR_SLUG,
    label: "seed-event-folk-arts-parai-anna-nagar",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
