/**
 * The Music Academy Madras — calendar pointer for the academic programme.
 * The session list lives on /music/sabha/music-academy.
 * This row only keeps the 16 Dec 2026–1 Jan 2027 window on the events calendar.
 *
 * Dev:  `npm run db:seed:event:music-academy-academic-sessions`
 * Live: `npm run db:seed:event:music-academy-academic-sessions:live`
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import {
  MUSIC_ACADEMY_ACADEMIC_SESSIONS_SLUG,
  musicAcademyCalendarNote,
} from "../src/content/music/sabhas/music-academy";
import {
  finishListingSeedLive,
  getChennaiCityId,
  istToUtcDate,
  isLiveSeed,
  loadEventSeedEnv,
  requireDatabaseUrl,
  upsertEvent,
} from "./lib/seed-event-shared";

const live = isLiveSeed();
loadEventSeedEnv(live);
const db = drizzle(neon(requireDatabaseUrl(live)), { schema });

async function main() {
  const cityId = await getChennaiCityId(db);
  const result = await upsertEvent(db, cityId, {
    slug: MUSIC_ACADEMY_ACADEMIC_SESSIONS_SLUG,
    title: "Music Academy Madras academic sessions, 16 Dec 2026–1 Jan 2027",
    description: musicAcademyCalendarNote(),
    startsAt: istToUtcDate(2026, 12, 16, 8, 0),
    endsAt: istToUtcDate(2027, 1, 1, 9, 30),
    allDay: false,
    venueName: "Kasturi Srinivasan Hall, The Music Academy Madras",
    venueAddress: "Kasturi Srinivasan Hall, The Music Academy Madras, Chennai",
    localityLabel: "Chennai",
    featured: false,
  });
  console.log(
    "[seed-event-music-academy-academic-sessions]",
    result,
    MUSIC_ACADEMY_ACADEMIC_SESSIONS_SLUG,
  );
  await finishListingSeedLive({
    eventSlug: MUSIC_ACADEMY_ACADEMIC_SESSIONS_SLUG,
    label: "seed-event-music-academy-academic-sessions",
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
