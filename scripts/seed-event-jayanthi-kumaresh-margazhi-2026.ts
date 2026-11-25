/**
 * Dr Jayanthi Kumaresh — Margazhi 2026–27 veena schedule.
 * Nine Chennai dates from the artist's sheet.
 *
 * Dev:  `npm run db:seed:event:jayanthi-kumaresh-margazhi`
 * Live: `npm run db:seed:event:jayanthi-kumaresh-margazhi:live`
 *
 * Poster: `public/images/music/jayanthi-kumaresh-margazhi-concert-schedule-2026-27.png`
 * Tickets: https://www.jayanthikumaresh.com/schedule (no fare printed)
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { jayanthiKumaresh } from "../src/content/music/artists/jayanthi-kumaresh";
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
  const artist = jayanthiKumaresh;
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
    console.log("[seed-event-jayanthi-kumaresh]", result, concert.eventSlug);
  }

  await finishListingSeedLive({
    eventSlug: firstSlug,
    label: "seed-event-jayanthi-kumaresh",
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
