/**
 * Carnatic Vocal Concert — Kalaimamani S. J. Jananiy at Narada Gana Sabha (15 Aug 2026).
 *
 * Dev:  `npm run db:seed:event:sj-jananiy-carnatic`
 * Live: `npm run db:seed:event:sj-jananiy-carnatic:live`
 *
 * Poster: `public/images/events/sj-jananiy-carnatic-narada-gana-sabha-august-2026.jpg`
 * (registered in `src/lib/events/event-poster-image.ts`)
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

export const SJ_JANANIY_CARNATIC_SLUG =
  "sj-jananiy-carnatic-vocal-narada-gana-sabha-august-2026";

const ARTIST_SHOWS = "https://sjjananiy.com/shows";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `Classical Carnatic vocal kutcheri by **Kalaimamani S. J. Jananiy** at **Narada Gana Sabha** Main Hall — featuring compositions by **Papanasam Dr. Smt. Rukmini Ramani**.

**Music & culture** in **Teynampet / Alwarpet, Chennai**

**When:** Saturday, **15 August 2026** · **6:00 PM IST** (arrive ~15 minutes early)

**Where:** Narada Gana Sabha Main Hall, TTK Road, Teynampet, Chennai 600018

**Tickets / schedule:** Confirm on the [artist shows page](${ARTIST_SHOWS}) (also listed on Bandsintown concert listings)

### Line-up

- **Vocal:** Kalaimamani Ms. S. J. Jananiy
- **Violin:** Kalaimamani Smt. Dr. Usha Rajagopalan
- **Mridangam:** Sri. Nellai A. Balaji
- **Kanjira:** Sri. Sivaramakrishnan
- **Tambura:** Smt. Girija

### Before you go

- Formal sabha kutcheri — seated indoor hall with acoustic violin and percussion accompaniment
- Occupying seats before the opening piece helps the concert start on time
- Confirm hall access and any entry notes with the sabha / artist listing before you travel

Details from the artist schedule (August 2026). Verify timing on the official shows page.`;

async function main() {
  const cityId = await getChennaiCityId(db);
  await upsertEvent(db, cityId, {
    slug: SJ_JANANIY_CARNATIC_SLUG,
    title:
      "Carnatic Vocal Concert by Kalaimamani S. J. Jananiy — Narada Gana Sabha (15 Aug 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 8, 15, 18, 0),
    endsAt: istToUtcDate(2026, 8, 15, 20, 30),
    allDay: false,
    venueName: "Narada Gana Sabha Main Hall",
    venueAddress: "TTK Road, Teynampet, Chennai 600018",
    localityLabel: "Teynampet",
    featured: true,
  });
  await finishListingSeedLive({
    eventSlug: SJ_JANANIY_CARNATIC_SLUG,
    label: "event-seed",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
