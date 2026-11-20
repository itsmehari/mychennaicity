/**
 * Roots & Resonance — Gems of Margazhi (music, dance, traditions).
 * M S Subbulakshmi Auditorium, Taramani; Fri 27 – Sun 29 November 2026.
 * Source: organiser poster (Meenu Subbiah · Adithi Ganeshan).
 * Daily start times, fares, and a ticket URL are not on the poster.
 *
 * Dev:  `npm run db:seed:event:roots-resonance-gems-margazhi`
 * Live: `npm run db:seed:event:roots-resonance-gems-margazhi:live`
 *
 * Poster: `public/images/events/roots-resonance-gems-margazhi-taramani-november-2026.png`
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

export const ROOTS_RESONANCE_SLUG =
  "roots-resonance-gems-margazhi-ms-subbulakshmi-taramani-november-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Gems of Margazhi** presents **Roots & Resonance** — an annual celebration of **music, dance, and artistic traditions**. The poster credits **Meenu Subbiah** and is from the house of **Adithi Ganeshan**.

**When:** **Friday 27, Saturday 28, and Sunday 29 November 2026**. The poster does not print curtain time for any day. Confirm doors and show time with the organiser or at the venue before you travel.

**Where:** **M S Subbulakshmi Auditorium, Taramani, Chennai**

### Three-day line-up (as printed)

| Day | Date | Artist / company | Theme |
| --- | --- | --- | --- |
| **Day 1** | Fri **27 Nov** | **Saindhavi**, **Sai Vignesh** & **Gurupriya Atreya** | **Bhajan Clubbing** |
| **Day 2** | Sat **28 Nov** | **Aayana Dance Company** | **Classical Expressions** |
| **Day 3** | Sun **29 Nov** | **Indosoul by Karthick Iyer** | **Raga & Rhythm** |

The poster shows a collage of performers and traditional motifs. It does not list a separate programme sheet, fare, or registration link. An **MDND** mark appears at the foot of the flyer; this listing does not attach a ticket URL because none is printed.

This note is a Chennai events listing written from the organiser poster. It is not the organiser’s own ticket page. Check with **Gems of Margazhi** or at the auditorium before you assume a single pass covers all three evenings.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: ROOTS_RESONANCE_SLUG,
    title:
      "Roots & Resonance — Gems of Margazhi, 27–29 Nov 2026, M S Subbulakshmi Auditorium",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 11, 27, 0, 0),
    endsAt: istToUtcDate(2026, 11, 29, 23, 59),
    allDay: true,
    venueName: "M S Subbulakshmi Auditorium",
    venueAddress: "M S Subbulakshmi Auditorium, Taramani, Chennai",
    localityLabel: "Taramani",
    featured: false,
  });
  console.log(
    "[seed-event-roots-resonance]",
    result,
    ROOTS_RESONANCE_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: ROOTS_RESONANCE_SLUG,
    label: "seed-event-roots-resonance-gems-margazhi",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});