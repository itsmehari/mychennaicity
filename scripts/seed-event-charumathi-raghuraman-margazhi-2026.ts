/**
 * Charumathi Raghuraman — Margazhi concert schedule 2026–27.
 * Eight Chennai dates from the artist's sheet. Hyderabad (4 Jan 2027, time TBD)
 * stays on /music/artist/charumathi-raghuraman and is not a Chennai event.
 *
 * Dev:  `npm run db:seed:event:charumathi-raghuraman-margazhi`
 * Live: `npm run db:seed:event:charumathi-raghuraman-margazhi:live`
 *
 * Poster: `public/images/music/charumathi-raghuraman-margazhi-concert-schedule-2026-27.png`
 * Tickets: https://www.charuraghu.com (no fare printed)
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { charumathiRaghuraman } from "../src/content/music/artists/charumathi-raghuraman";
import { concertEventDescription, concertEventTitle } from "../src/content/music/event-copy";
import { concertHoldEnd } from "../src/content/music/format";
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

function ymd(date: string): [number, number, number] {
  const [year, month, day] = date.split("-").map(Number);
  return [year, month, day];
}

async function main() {
  const cityId = await getChennaiCityId(db);
  const artist = charumathiRaghuraman;
  const chennaiDates = artist.concerts.filter((concert) => concert.eventSlug);
  let firstSlug = "";

  for (const concert of chennaiDates) {
    const end = concertHoldEnd(concert);
    if (
      concert.startHour == null ||
      concert.startMinute == null ||
      !end ||
      end.hour > 23 ||
      !concert.eventSlug
    ) {
      throw new Error(`Cannot seed ${concert.id}: missing start or overnight hold`);
    }
    const [year, month, day] = ymd(concert.date);
    const result = await upsertEvent(db, cityId, {
      slug: concert.eventSlug,
      title: concertEventTitle(artist, concert),
      description: concertEventDescription(artist, concert),
      startsAt: istToUtcDate(year, month, day, concert.startHour, concert.startMinute),
      endsAt: istToUtcDate(year, month, day, end.hour, end.minute),
      allDay: false,
      venueName: concert.venueName,
      venueAddress: concert.venueAddress,
      localityLabel: concert.localityLabel,
      featured: false,
    });
    if (!firstSlug) firstSlug = concert.eventSlug;
    console.log("[seed-event-charumathi-raghuraman]", result, concert.eventSlug);
  }

  await finishListingSeedLive({
    eventSlug: firstSlug,
    label: "seed-event-charumathi-raghuraman",
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
