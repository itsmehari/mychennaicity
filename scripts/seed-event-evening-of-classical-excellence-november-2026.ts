/**
 * An Evening of Classical Excellence — Yamaha Music India.
 * KM Music Conservatory, Arumbakkam, Wednesday 25 November 2026, 5:00 PM onwards.
 * Source: organiser poster plus the Yamaha Music India listing on AllEvents.
 * The listing names violinist Nandini and the KM Conservatory Orchestra.
 * It does not print a fare or a closing time.
 *
 * Dev:  `npm run db:seed:event:classical-excellence`
 * Live: `npm run db:seed:event:classical-excellence:live`
 *
 * Poster: `public/images/events/evening-of-classical-excellence-km-music-conservatory-november-2026.png`
 * Official listing: https://allevents.in/chennai/an-evening-of-classical-excellence/200030995172744
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

export const CLASSICAL_EXCELLENCE_SLUG =
  "evening-of-classical-excellence-km-music-conservatory-november-2026";

const OFFICIAL =
  "https://allevents.in/chennai/an-evening-of-classical-excellence/200030995172744";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `Wednesday classical evening at KM Music Conservatory, Arumbakkam, 25 November 2026, from 5:00 PM.

**Organiser:** Yamaha Music India

Yamaha Music India presents An Evening of Classical Excellence at the conservatory A.R. Rahman founded in Chennai. The poster carries the Yamaha Make Waves mark and the KM Music Conservatory mark, and it says the evening is powered by Big Violin Shop.

The Yamaha listing on AllEvents names the artists the flyer leaves off the type: violinist Nandini with the KM Conservatory Orchestra. The same listing also names Musee Musical beside Big Violin Shop. The poster itself prints only Big Violin Shop.

**When:** Wednesday, **25 November 2026**, **5:00 PM IST onwards**. Neither the poster nor the AllEvents page prints a closing time. This listing keeps the calendar open until **8:30 PM** so a listener can block the evening. That finish is our hold, not a time the organiser printed. Confirm it on the listing before you plan the ride home.

**Where:** **KM Music Conservatory**, 19, Vinayagapuram 2nd Street, MMDA Colony, Arumbakkam, Chennai 600106. The conservatory’s own contact page uses that street spelling and PIN. The AllEvents page writes the street as Vinayakapuram and does not print the PIN. The hall is off 100 Feet Road at the MMDA signal, a short walk from Arumbakkam Metro.

**Register:** [An Evening of Classical Excellence on AllEvents](${OFFICIAL})

That is the organiser page the poster’s Register Now button points people toward. It does not print a ticket price. The page says to use its notify control if you need to know whether tickets are required. Do not treat this note as a rate card, and do not assume the evening is free.

### Who is named

- **Presented by:** Yamaha Music India
- **Venue and orchestra:** KM Music Conservatory
- **Violin:** Nandini, as named on the AllEvents listing (the poster shows a violinist and does not print the name)
- **Powered by:** Big Violin Shop on the poster; the AllEvents text also names Musee Musical
- **Programme:** not printed. No song list, no accompanist list beyond the orchestra line, and no age rule

This note is a Chennai listing written from the organiser poster and the Yamaha Music India page on AllEvents. It is not that ticket page. Check the link for any change of time, hall, or fare before you leave.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: CLASSICAL_EXCELLENCE_SLUG,
    title:
      "An Evening of Classical Excellence — Nandini and KM Conservatory Orchestra, 25 Nov 2026",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 11, 25, 17, 0),
    endsAt: istToUtcDate(2026, 11, 25, 20, 30),
    allDay: false,
    venueName: "KM Music Conservatory",
    venueAddress:
      "19, Vinayagapuram 2nd Street, MMDA Colony, Arumbakkam, Chennai 600106",
    localityLabel: "Arumbakkam",
    featured: false,
  });
  console.log(
    "[seed-event-classical-excellence]",
    result,
    CLASSICAL_EXCELLENCE_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: CLASSICAL_EXCELLENCE_SLUG,
    label: "seed-event-classical-excellence",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
