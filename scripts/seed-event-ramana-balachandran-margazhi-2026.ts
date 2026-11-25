/**
 * Ramana Balachandran — Margazhi Music Season sheet.
 * Thirteen Chennai sabhas. Dates with a printed city, and Margazhi Maha
 * Utsavam (no city printed), stay on the artist page.
 *
 * Dev:  `npm run db:seed:event:ramana-balachandran-margazhi`
 * Live: `npm run db:seed:event:ramana-balachandran-margazhi:live`
 *
 * Poster: `public/images/music/ramana-balachandran-margazhi-concert-schedule-2026-27.png`
 * The sheet does not print a ticket link or a fare.
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { ramanaBalachandran } from "../src/content/music/artists/ramana-balachandran";
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
  const artist = ramanaBalachandran;
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
    console.log("[seed-event-ramana-balachandran]", result, concert.eventSlug);
  }

  await finishListingSeedLive({
    eventSlug: firstSlug,
    label: "seed-event-ramana-balachandran",
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
