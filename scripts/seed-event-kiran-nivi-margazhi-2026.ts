/**
 * Kiran & Nivi — Margazhi Concert Schedule 2026-2027.
 * Chennai dates from their sheet. Mumbai and the MDND line with no hall
 * stay on the artist page and are not seeded.
 *
 * Dev:  `npm run db:seed:event:kiran-nivi-margazhi`
 * Live: `npm run db:seed:event:kiran-nivi-margazhi:live`
 *
 * Poster: `public/images/music/kiran-nivi-margazhi-concert-schedule-2026-27.png`
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { kiranNivi } from "../src/content/music/artists/kiran-nivi";
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

function endOnCalendar(date: string, hour: number, minute: number): Date {
  const [year, month, day] = ymd(date);
  if (hour <= 23) return istToUtcDate(year, month, day, hour, minute);
  const next = new Date(Date.UTC(year, month - 1, day + 1));
  return istToUtcDate(
    next.getUTCFullYear(),
    next.getUTCMonth() + 1,
    next.getUTCDate(),
    hour - 24,
    minute,
  );
}

async function main() {
  const cityId = await getChennaiCityId(db);
  const artist = kiranNivi;
  const chennaiDates = artist.concerts.filter((concert) => concert.eventSlug);
  let firstSlug = "";

  for (const concert of chennaiDates) {
    const end = concertHoldEnd(concert);
    if (
      concert.startHour == null ||
      concert.startMinute == null ||
      !end ||
      !concert.eventSlug
    ) {
      throw new Error(`Cannot seed ${concert.id}: missing start or hold`);
    }
    const [year, month, day] = ymd(concert.date);
    const result = await upsertEvent(db, cityId, {
      slug: concert.eventSlug,
      title: concertEventTitle(artist, concert),
      description: concertEventDescription(artist, concert),
      startsAt: istToUtcDate(year, month, day, concert.startHour, concert.startMinute),
      endsAt: endOnCalendar(concert.date, end.hour, end.minute),
      allDay: false,
      venueName: concert.venueName,
      venueAddress: concert.venueAddress,
      localityLabel: concert.localityLabel,
      featured: false,
    });
    if (!firstSlug) firstSlug = concert.eventSlug;
    console.log("[seed-event-kiran-nivi]", result, concert.eventSlug);
  }

  await finishListingSeedLive({
    eventSlug: firstSlug,
    label: "seed-event-kiran-nivi",
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
