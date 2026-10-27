/**
 * Made of Chennai Food and Music Festival — YMCA Nandanam, 29 Aug 2026.
 * Source: The Hindu Made of Chennai organiser poster (Casagrand presented).
 *
 * Dev:  `npm run db:seed:event:made-of-chennai-food-music`
 * Live: `npm run db:seed:event:made-of-chennai-food-music:live`
 *
 * Poster: `public/images/events/made-of-chennai-food-music-festival-august-2026.png`
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

export const MADE_OF_CHENNAI_FOOD_MUSIC_SLUG =
  "made-of-chennai-food-music-festival-august-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Organiser:** The Hindu — Made of Chennai. **Presented by** Casagrand, **in partnership with** Tamil Nadu Tourism Development Corporation (TTDC), **co-powered by** AU Small Finance Bank, as listed on the festival poster.

**Come for the feast. Stay for the beats.** The Made of Chennai Food and Music Festival is a one-evening city gathering of food stalls and live music.

**When:** **Saturday 29 August 2026**, **4:00 PM onwards** (IST). The poster does **not** print a close time.

**Where:** **YMCA Nandanam**, Nandanam, Chennai 600035

### What to expect

- **40+ food stalls** and **10+ hours of music**, as advertised on the flyer
- Featured performer: **Chinmayi Sripada**
- A public evening at YMCA Nandanam — plan for crowds, parking, and late-evening travel on Anna Salai

### Admission

The poster marks **free entry**. Confirm any bag check, vehicle, or stall-only charges at the gate; this listing is not a ticket.

### Partners on the poster

Associate and support marks printed on the same flyer include Joyalukkas, Orchids The International School, Sundaram Home, Hindustan Group of Institutions (education), Toyota (mobility), IndianOil (energy), Licious (protein), StudyIn (overseas education), NWM (curation), M Murugan 105 (food), and Big FM (radio). Names are recorded as shown — they are not endorsements by this site.

This listing is compiled from the organiser poster. It is not an official The Hindu, TTDC, or YMCA notice. Confirm time, stage plan, and entry rules before you go.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: MADE_OF_CHENNAI_FOOD_MUSIC_SLUG,
    title: "Made of Chennai Food and Music Festival — YMCA Nandanam",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 8, 29, 16, 0),
    endsAt: istToUtcDate(2026, 8, 29, 23, 59),
    allDay: false,
    venueName: "YMCA Nandanam",
    venueAddress: "Nandanam, Chennai 600035",
    localityLabel: "Nandanam",
    featured: true,
  });
  console.log(
    "[seed-event-made-of-chennai-food-music]",
    result,
    MADE_OF_CHENNAI_FOOD_MUSIC_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: MADE_OF_CHENNAI_FOOD_MUSIC_SLUG,
    label: "seed-event-made-of-chennai-food-music",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
