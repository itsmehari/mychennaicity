/**
 * Sriranjani Tapasya Santhanagopalan — vocal.
 * The Music Academy Madras, 100th Annual Conference & Concerts.
 * Thursday 24 December 2026, 4:00 PM–6:30 PM, T.T. Krishnamachari Auditorium.
 * The poster prints the finish and the daily ticket rates.
 *
 * Dev:  `npm run db:seed:event:sriranjani-tapasya-santhanagopalan`
 * Live: `npm run db:seed:event:sriranjani-tapasya-santhanagopalan:live`
 *
 * Poster: `public/images/events/sriranjani-tapasya-santhanagopalan-music-academy-december-2026.png`
 * Details: https://www.musicacademymadras.in
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

export const SRIRANJANI_MUSIC_ACADEMY_SLUG =
  "sriranjani-tapasya-santhanagopalan-music-academy-december-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `Vocal concert by Sriranjani Tapasya Santhanagopalan at The Music Academy Madras, Thursday 24 December 2026, 4:00 PM to 6:30 PM.

**Organiser:** The Music Academy Madras

The poster is for the Academy’s 100th Annual Conference & Concerts. It names Sriranjani Tapasya Santhanagopalan as vocal, with Kamalakiran Vinjumuri (violin), Praveen Sparsh (mridangam), and Vazhappally R.Krishnakumar (ghatam).

**When:** Thursday, **24 December 2026**, **4:00 PM to 6:30 PM IST**. The poster prints that finish.

**Where:** **T.T. Krishnamachari Auditorium, The Music Academy Madras**, Chennai. The poster names the auditorium and the Academy. It does not print a street or a PIN.

**Tickets:** Daily tickets, including GST and entertainment tax, as printed:

- Ground Floor A–F: Rs.3,000
- Ground Floor G–N: Rs.2,200
- Balcony A–I: Rs.1,000
- Balcony J–O: Rs.500

The poster says daily tickets are sold both online and at the Music Academy two days before the concert and on the day. It also says the tickets are valid for both evening concerts that day, 4:00 to 6:30 PM and 6:45 to 9:15 PM. It does not name the 6:45 PM concert on this sheet.

**Further details:** [www.musicacademymadras.in](https://www.musicacademymadras.in)

The poster says to follow The Music Academy Madras, Madras Music Academy, and madrasmusicacademy. It does not print profile links.

This note is a Chennai listing written from the organiser poster. It is not the ticket page. Check musicacademymadras.in before you travel.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: SRIRANJANI_MUSIC_ACADEMY_SLUG,
    title:
      "Sriranjani Tapasya Santhanagopalan — vocal, Music Academy, 24 Dec 2026",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 12, 24, 16, 0),
    endsAt: istToUtcDate(2026, 12, 24, 18, 30),
    allDay: false,
    venueName: "T.T. Krishnamachari Auditorium, The Music Academy Madras",
    venueAddress:
      "T.T. Krishnamachari Auditorium, The Music Academy Madras, Chennai",
    localityLabel: "Chennai",
    featured: false,
  });
  console.log(
    "[seed-event-sriranjani-tapasya-santhanagopalan]",
    result,
    SRIRANJANI_MUSIC_ACADEMY_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: SRIRANJANI_MUSIC_ACADEMY_SLUG,
    label: "seed-event-sriranjani-tapasya-santhanagopalan",
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
