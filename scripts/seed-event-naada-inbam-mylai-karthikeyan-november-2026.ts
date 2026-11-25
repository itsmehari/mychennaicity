/**
 * Naada Inbam — Dr (Smt) Andal Ananthanarayanan & Sri V. Ananthanarayanan
 * memorial nadaswaram concert. Mylai Karthikeyan, Ragasudha Hall,
 * Wednesday 25 November 2026, 6:15 PM.
 * Source: Naada Inbam notice supplied for this listing.
 * The notice does not print a fare, a booking link, or a closing time.
 *
 * Dev:  `npm run db:seed:event:naada-inbam-mylai-karthikeyan`
 * Live: `npm run db:seed:event:naada-inbam-mylai-karthikeyan:live`
 *
 * Hall address is the one Naada Inbam prints on its festival stationery
 * (Ragasudha Hall, 85/2, Luz Avenue, Mylapore, Chennai 600004), not a line
 * from this evening's notice.
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

export const NAADA_INBAM_MYLAI_KARTHIKEYAN_SLUG =
  "naada-inbam-mylai-karthikeyan-nadaswaram-ragasudha-november-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `Wednesday nadaswaram concert at Ragasudha Hall, Mylapore, 25 November 2026, from 6:15 PM.

**Organiser:** Naada Inbam

Naada Inbam presents the Dr (Smt) Andal Ananthanarayanan and Sri V. Ananthanarayanan memorial nadaswaram concert. The family of Smt Andal and Sri V. Ananthanarayanan asked the sabha to arrange an evening by Mylai Karthikeyan in their memory, and he agreed. Rasikas are welcome.

The notice spells the instrument **Nagaswaram** on the artist line and **Nadaswaram** in the concert title. Karthikeyan plays with violin, mridangam, and kanjira. That is a concert-hall team, not the customary nadaswaram-and-thavil pair the instrument usually travels with. Naada Inbam’s note says he has taken this format through several concerts, and that this evening continues a long association with the sabha.

**When:** Wednesday, **25 November 2026**, **6:15 PM IST**. The notice does not print a closing time. This listing keeps the calendar open until **9:15 PM**, a three-hour hold so a listener can block the evening. That finish is our hold, not a time the sabha printed. Confirm it at the hall before you plan the ride home.

**Where:** **Ragasudha Hall**, 85/2, Luz Avenue (5th Street), near Nageswara Rao Park, Mylapore, Chennai 600004. The street and door number come from Naada Inbam’s own festival header. This evening’s notice names the hall and says rasikas are welcome; it does not repeat the street.

**Tickets:** not printed. The notice does not give a fare, a free-entry line, or a booking link. Ask at Ragasudha Hall before you treat the evening as open or ticketed.

### Who is named

- **Nagaswaram:** Vidwan Mylai Karthikeyan
- **Violin:** Vidwan B. Ananthakrishnan
- **Mridangam:** Vidwan Vijay Ganesh
- **Kanjira:** Vidwan S. Sunil Kumar
- **In memory of:** Dr (Smt) Andal Ananthanarayanan and Sri V. Ananthanarayanan
- **Presented by:** Naada Inbam

No song list is printed.

This note is a Chennai listing written from the Naada Inbam notice for this memorial evening. It is not the sabha’s own page. Check the hall for any change of time, artists, or entry before you leave.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: NAADA_INBAM_MYLAI_KARTHIKEYAN_SLUG,
    title:
      "Mylai Karthikeyan — Naada Inbam memorial nadaswaram, Ragasudha Hall (25 Nov 2026)",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 11, 25, 18, 15),
    endsAt: istToUtcDate(2026, 11, 25, 21, 15),
    allDay: false,
    venueName: "Ragasudha Hall",
    venueAddress:
      "85/2, Luz Avenue (5th Street), near Nageswara Rao Park, Mylapore, Chennai 600004",
    localityLabel: "Mylapore",
    featured: false,
  });
  console.log(
    "[seed-event-naada-inbam-mylai-karthikeyan]",
    result,
    NAADA_INBAM_MYLAI_KARTHIKEYAN_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: NAADA_INBAM_MYLAI_KARTHIKEYAN_SLUG,
    label: "seed-event-naada-inbam-mylai-karthikeyan",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
