/**
 * Strings of Rasa — veena evening by Ramana Balachandhran.
 * Mohamad Satak Auditorium, Siruseri, Sunday 1 November 2026, 5:30 PM.
 * Source: organiser poster (Samunnati and Rasikapriya; MDnD ticketing; FOMRRA community partner).
 * The MDnD page did not return ticket prices or a closing time when this listing was written.
 *
 * Dev:  `npm run db:seed:event:strings-of-rasa`
 * Live: `npm run db:seed:event:strings-of-rasa:live`
 *
 * Poster: `public/images/events/strings-of-rasa-ramana-balachandhran-siruseri-november-2026.png`
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

export const STRINGS_OF_RASA_SLUG =
  "strings-of-rasa-ramana-balachandhran-siruseri-november-2026";

const TICKETS =
  "https://mdnd.in/event/Strings_of_Rasa_-_An_evening_of_Ragas__Rhythm_by_Ramana_Balachandran?ci=Y2kxMDE%3D&e=ZWlkMTAzMjI%3D&show_to_public=Y";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `Sunday veena concert Strings of Rasa by Ramana Balachandhran, Mohamad Satak Auditorium, Siruseri, 1 November 2026, 5:30 PM.

**Organiser:** Rasikapriya Fine Arts with Samunnati

Samunnati and Rasikapriya present an evening of ragas and rhythm on the OMR side of Chennai. The poster shows Ramana Balachandhran with a veena. It does not name violin, mridangam, or any other accompanist, and it does not print a song list.

**When:** Sunday, **1 November 2026**, **5:30 PM IST**. The poster does not print a closing time. This listing keeps the calendar open until **8:30 PM** so a rasika can block the evening. Confirm the finish on the ticket page or with Rasikapriya before you plan the drive back.

**Where:** **Mohamad Satak Auditorium**, Siruseri. The flyer spells the hall that way and names only Siruseri. The Mohamed Sathak campus that publishes an auditorium is **No. 34, Rajiv Gandhi Salai (OMR), inside SIPCOT IT Park, Siruseri, Egattur, Chennai 603103**. Ask at the gate which hall is in use that evening.

**Booking:** [Tickets on MDnD](${TICKETS})

MDnD is the ticketing partner printed on the poster. Ticket prices were not on the flyer, and the ticket page did not show a fare when this note was written. Pay on MDnD. Do not treat this page as a rate card.

### Patron line

The poster says **Become a patron** and prints **88389 73850**. It does not say what a patron seat includes. Call that number if you are asking about patronage. It is a concert contact, not a mychennaicity.in number.

### Who is on the bill

- **Veena:** Ramana Balachandhran, as named on the poster
- **Presented by:** Samunnati and Rasikapriya
- **Community partner:** FOMRRA (Federation of OMR Resident Associations)
- **Tickets:** MDnD

### Rasikapriya, as printed

The poster prints the site **rasikapriyafinearts.in**, Facebook **rasikapriyafinearts**, YouTube **rasikapriyaOMR**, and Instagram **rasikapriyafinearts**.

This note is a Chennai listing written from the organiser poster and the public Mohamed Sathak campus address. It is not the MDnD ticket page. Check the ticket link for price, seat type, and any change of hall before you leave.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: STRINGS_OF_RASA_SLUG,
    title:
      "Strings of Rasa by Ramana Balachandhran — Siruseri veena evening, 1 Nov 2026",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 11, 1, 17, 30),
    endsAt: istToUtcDate(2026, 11, 1, 20, 30),
    allDay: false,
    venueName: "Mohamad Satak Auditorium",
    venueAddress:
      "No. 34, Rajiv Gandhi Salai (OMR), SIPCOT IT Park, Siruseri, Egattur, Chennai 603103",
    localityLabel: "Siruseri",
    featured: false,
  });
  console.log("[seed-event-strings-of-rasa]", result, STRINGS_OF_RASA_SLUG);
  await finishListingSeedLive({
    eventSlug: STRINGS_OF_RASA_SLUG,
    label: "seed-event-strings-of-rasa",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
