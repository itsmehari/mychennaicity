/**
 * Kolkata Padmavathi Saranathan — vocal.
 * The Music Academy Madras, 100th Annual Conference & Concerts.
 * Monday 21 December 2026, 1:30 PM–3:30 PM, T.T. Krishnamachari Auditorium.
 * The poster prints the finish. It does not print a fare.
 *
 * Dev:  `npm run db:seed:event:kolkata-padmavathi-saranathan`
 * Live: `npm run db:seed:event:kolkata-padmavathi-saranathan:live`
 *
 * Poster: `public/images/events/kolkata-padmavathi-saranathan-music-academy-december-2026.png`
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

export const PADMAVATHI_SARANATHAN_SLUG =
  "kolkata-padmavathi-saranathan-music-academy-december-2026";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

const DESCRIPTION = `Vocal concert by Kolkata Padmavathi Saranathan at The Music Academy Madras, Monday 21 December 2026, 1:30 PM to 3:30 PM.

**Organiser:** The Music Academy Madras

The poster is for the Academy’s 100th Annual Conference & Concerts. It names Kolkata Padmavathi Saranathan as vocal, with Visvesh Chandrasekar (violin), G.S.Nagaraj (mridangam), and Manjesh Mohanan (ghatam).

**When:** Monday, **21 December 2026**, **1:30 PM to 3:30 PM IST**. The poster prints that finish.

**Where:** **T.T. Krishnamachari Auditorium, The Music Academy Madras**, Chennai. The poster names the auditorium and the Academy. It does not print a street or a PIN.

**Tickets:** The poster does not print a fare. It points further details of all concerts and lecture demonstrations to the Academy site.

**Further details:** [www.musicacademymadras.in](https://www.musicacademymadras.in)

The poster says to follow The Music Academy Madras, Madras Music Academy, and madrasmusicacademy. It does not print profile links.

This note is a Chennai listing written from the organiser poster. It is not the ticket page. Check musicacademymadras.in before you travel.`.trim();

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: PADMAVATHI_SARANATHAN_SLUG,
    title:
      "Kolkata Padmavathi Saranathan — vocal, Music Academy, 21 Dec 2026",
    description: DESCRIPTION,
    startsAt: istToUtcDate(2026, 12, 21, 13, 30),
    endsAt: istToUtcDate(2026, 12, 21, 15, 30),
    allDay: false,
    venueName: "T.T. Krishnamachari Auditorium, The Music Academy Madras",
    venueAddress:
      "T.T. Krishnamachari Auditorium, The Music Academy Madras, Chennai",
    localityLabel: "Chennai",
    featured: false,
  });
  console.log(
    "[seed-event-kolkata-padmavathi-saranathan]",
    result,
    PADMAVATHI_SARANATHAN_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: PADMAVATHI_SARANATHAN_SLUG,
    label: "seed-event-kolkata-padmavathi-saranathan",
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
