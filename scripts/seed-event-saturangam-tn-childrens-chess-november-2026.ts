/**
 * Saturangam 360 Academy — 4th Tamil Nadu State Level Children's Chess Tournament.
 * BVM Global Perungudi, Sunday 15 November 2026. Save the date; entry is not open.
 * Source: academy save-the-date page (October 2026).
 *
 * Dev:  `npm run db:seed:event:saturangam-tn-childrens-chess`
 * Live: `npm run db:seed:event:saturangam-tn-childrens-chess:live`
 *
 * Poster: `public/images/events/saturangam-360-tn-state-childrens-chess-perungudi-november-2026.jpg`
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

export const SATURANGAM_TN_CHILDRENS_CHESS_SLUG =
  "saturangam-360-tn-state-childrens-chess-perungudi-november-2026";

const VIDYA_DISPLAY = "63806 06143";
const JAYANTHI_DISPLAY = "90256 01304";
const WA_VIDYA = `https://wa.me/916380606143?text=${encodeURIComponent(
  "Hi, I saw the Saturangam 360 4th Tamil Nadu State Level Children's Chess Tournament (15 Nov 2026) on MyChennaiCity. Please share when entry opens.",
)}`;
const WA_JAYANTHI = `https://wa.me/919025601304?text=${encodeURIComponent(
  "Hi, I saw the Saturangam 360 4th Tamil Nadu State Level Children's Chess Tournament (15 Nov 2026) on MyChennaiCity. Please share when entry opens.",
)}`;

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `**Organiser:** Saturangam 360 Academy

Save the date for the **4th Tamil Nadu State Level Children's Chess Tournament**. A Saturangam 360 Academy children's event, hosted at BVM Global Perungudi. **Entry is not open yet.** The academy page says registration opens soon.

**When:** Sunday, **15 November 2026**. **Reporting time 8.30 am**. **First round 9.00 am**. The flyer does not print a finish time.

**Where:** **BVM Global Perungudi**, 144, Corporation Road, Seevaram, Perungudi, Chennai, Tamil Nadu 600096 (next to Perungudi D Mart).

### Contact

- **Ms. B. Vidya** — [${VIDYA_DISPLAY}](${WA_VIDYA})
- **Ms. Jayanthi K** — [${JAYANTHI_DISPLAY}](${WA_JAYANTHI})
- Email: [saturangam360@hotmail.com](mailto:saturangam360@hotmail.com)

### Academy

Saturangam 360 Academy, 4/13, Bhaskarapuram, Mylapore, Chennai 600004.

This listing is a save-the-date compiled from the academy page (October 2026). It is not an entry form. Age groups, fees, and the registration link were not on the flyer. Confirm those with Saturangam 360 before you travel.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: SATURANGAM_TN_CHILDRENS_CHESS_SLUG,
    title:
      "Saturangam 360 — 4th Tamil Nadu State Level Children's Chess Tournament (15 Nov 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 11, 15, 8, 30),
    endsAt: istToUtcDate(2026, 11, 15, 23, 59),
    allDay: false,
    venueName: "BVM Global Perungudi",
    venueAddress:
      "144, Corporation Road, Seevaram, Perungudi, Chennai, Tamil Nadu 600096",
    localityLabel: "Perungudi",
    featured: false,
  });
  console.log(
    "[seed-event-saturangam-tn-childrens-chess]",
    result,
    SATURANGAM_TN_CHILDRENS_CHESS_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: SATURANGAM_TN_CHILDRENS_CHESS_SLUG,
    label: "seed-event-saturangam-tn-childrens-chess",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
