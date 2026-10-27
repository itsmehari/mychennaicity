/**
 * Madras Day 2026 — Chennai-to-Madras photo exhibition, Anna Centenary Library
 * (22–31 Aug 2026). Source: organiser poster (TN Tourism / TTDC; L Ramachandran).
 *
 * Dev:  `npm run db:seed:event:madras-day-chennai-to-madras`
 * Live: `npm run db:seed:event:madras-day-chennai-to-madras:live`
 *
 * Poster: `public/images/events/madras-day-chennai-to-madras-photo-exhibition-august-2026.png`
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

export const MADRAS_DAY_CHENNAI_TO_MADRAS_SLUG =
  "madras-day-chennai-to-madras-photo-exhibition-august-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Presented with:** Tamil Nadu Tourism / Tamil Nadu Tourism Development Corporation (TTDC), as listed on the Madras Day 2026 poster. **Photo exhibition by** L Ramachandran. Supporting marks on the same poster: Super Chennai · Made of Chennai — The Hindu.

**Chennai-to-Madras** is a **photo exhibition** of Chennai landmarks and historic buildings, staged for **Madras Day 2026**.

**When:** **Saturday 22 – Monday 31 August 2026**. Opening hours are **not printed on the poster** — confirm gallery / library hours at the venue before you travel.

**Where:** **Anna Centenary Library**, Gandhi Mandapam Road, Kotturpuram, Chennai 600085

### What to expect

- A Madras Day display of photographs of the city’s well-known civic and heritage buildings
- Work by photographer **L Ramachandran**, whose *Chennai to Madras* photobook (2020) documented the same city-to-Madras theme
- A public library venue — plan for reading-hall rules (quiet floors, bag checks) alongside the exhibition space

### Admission

The poster does **not** print a ticket price. Treat this as a public library exhibition unless the desk at Anna Centenary Library says otherwise.

### Nearby listing

Venue note on this site: [Anna Centenary Library](/directory/government_office/anna-centenary-library-kotturpuram). Other Madras Month programmes: [themadrasday.in](https://themadrasday.in/).

This listing is compiled from the organiser poster. It is not an official TTDC or library notice. Confirm dates, hall, and hours at the library before you go.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: MADRAS_DAY_CHENNAI_TO_MADRAS_SLUG,
    title:
      "Madras Day 2026: Chennai-to-Madras Photo Exhibition — Anna Centenary Library",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 8, 22, 0, 0),
    endsAt: istToUtcDate(2026, 8, 31, 23, 59),
    allDay: true,
    venueName: "Anna Centenary Library",
    venueAddress: "Gandhi Mandapam Road, Kotturpuram, Chennai 600085",
    localityLabel: "Kotturpuram",
    featured: true,
  });
  console.log("[seed-event-madras-day-chennai-to-madras]", result, MADRAS_DAY_CHENNAI_TO_MADRAS_SLUG);
  await finishListingSeedLive({
    eventSlug: MADRAS_DAY_CHENNAI_TO_MADRAS_SLUG,
    label: "seed-event-madras-day-chennai-to-madras",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
