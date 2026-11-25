/**
 * Sreeranjane Kaushik — Music season 2025–26.
 * Ten Chennai dates. Every row prints a finish, including 30 Dec 10:00 pm to 12:00 am.
 *
 * Dev:  `npm run db:seed:event:sreeranjane-kaushik`
 * Live: `npm run db:seed:event:sreeranjane-kaushik:live`
 *
 * Poster: `public/images/music/sreeranjane-kaushik-music-season-2025-26.jpg`
 * The sheet does not print a ticket link or a fare.
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { sreeranjaneKaushik } from "../src/content/music/artists/sreeranjane-kaushik";
import { concertEventDescription, concertEventTitle } from "../src/content/music/event-copy";
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

function endParts(date: string, hour: number, minute: number, nextDay: boolean) {
  const [year, month, day] = date.split("-").map(Number);
  if (!nextDay) return { year, month, day, hour, minute };
  const next = new Date(Date.UTC(year, month - 1, day + 1));
  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day: next.getUTCDate(),
    hour,
    minute,
  };
}

async function main() {
  const cityId = await getChennaiCityId(db);
  const artist = sreeranjaneKaushik;
  const chennaiDates = artist.concerts.filter((concert) => concert.eventSlug);
  let firstSlug = "";

  for (const concert of chennaiDates) {
    if (
      concert.startHour == null ||
      concert.startMinute == null ||
      concert.printedEndHour == null ||
      concert.printedEndMinute == null ||
      !concert.eventSlug
    ) {
      throw new Error(`Cannot seed ${concert.id}: the sheet's finish is missing`);
    }
    const [year, month, day] = concert.date.split("-").map(Number);
    const end = endParts(
      concert.date,
      concert.printedEndHour,
      concert.printedEndMinute,
      Boolean(concert.printedEndNextDay),
    );
    const result = await upsertEvent(db, cityId, {
      slug: concert.eventSlug,
      title: concertEventTitle(artist, concert),
      description: concertEventDescription(artist, concert),
      startsAt: istToUtcDate(year, month, day, concert.startHour, concert.startMinute),
      endsAt: istToUtcDate(end.year, end.month, end.day, end.hour, end.minute),
      allDay: false,
      venueName: concert.venueName,
      venueAddress: concert.venueAddress,
      localityLabel: concert.localityLabel,
      featured: false,
    });
    if (!firstSlug) firstSlug = concert.eventSlug;
    console.log("[seed-event-sreeranjane-kaushik]", result, concert.eventSlug);
  }

  await finishListingSeedLive({
    eventSlug: firstSlug,
    label: "seed-event-sreeranjane-kaushik",
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
