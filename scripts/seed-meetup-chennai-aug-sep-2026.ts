/**
 * Bulk seed — Meetup / community events (mid-Aug–early Sep 2026).
 *
 * Dev:  `npm run db:seed:meetup-chennai-aug-sep`
 * Live: `npm run db:seed:meetup-chennai-aug-sep:live`
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import {
  buildDiscoveryEventDescription,
  type ChennaiDiscoveryEvent,
} from "../src/content/events/chennai-discovery-events-2026";
import { MEETUP_CHENNAI_AUG_SEP_2026 } from "../src/content/events/meetup-chennai-aug-sep-2026";
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

function parseDatePart(raw: string): { y: number; m: number; d: number } {
  const bit = raw.trim().split(" to ")[0]!.trim();
  const [y, m, d] = bit.split("-").map(Number);
  return { y, m, d };
}

function parseEndDatePart(raw: string): { y: number; m: number; d: number } {
  const parts = raw.trim().split(" to ");
  const bit = (parts.length > 1 ? parts[1] : parts[0])!.trim();
  const [y, m, d] = bit.split("-").map(Number);
  return { y, m, d };
}

function parseTimePart(
  raw: string,
  which: "start" | "end",
): { hour: number; minute: number } {
  const parts = raw.trim().split(" to ");
  const bit = (
    which === "end" && parts.length > 1 ? parts[1] : parts[0]
  )!.trim();
  const [h, min] = bit.split(":").map(Number);
  return { hour: h ?? 0, minute: min ?? 0 };
}

function defaultEndTime(
  startHour: number,
  startMin: number,
): { hour: number; minute: number } {
  let total = startHour * 60 + startMin + 150;
  if (total >= 24 * 60) total = 23 * 60 + 30;
  return { hour: Math.floor(total / 60), minute: total % 60 };
}

function toSeedRow(e: ChennaiDiscoveryEvent) {
  const startDate = parseDatePart(e.date);
  const endDate = parseEndDatePart(e.date);
  const startTime = parseTimePart(e.time, "start");
  const hasEndTime = e.time.includes(" to ");
  const endTime = hasEndTime
    ? parseTimePart(e.time, "end")
    : defaultEndTime(startTime.hour, startTime.minute);

  const multiDay = e.date.includes(" to ");
  return {
    slug: e.slug,
    title: e.title,
    description: buildDiscoveryEventDescription(e),
    startsAt: istToUtcDate(
      startDate.y,
      startDate.m,
      startDate.d,
      startTime.hour,
      startTime.minute,
    ),
    endsAt: istToUtcDate(
      endDate.y,
      endDate.m,
      endDate.d,
      endTime.hour,
      endTime.minute,
    ),
    allDay: multiDay && !hasEndTime,
    venueName: e.venueName,
    venueAddress: e.address,
    localityLabel: e.locality,
    featured: e.featured ?? false,
  };
}

async function main() {
  const cityId = await getChennaiCityId(db);
  let inserted = 0;
  let updated = 0;

  for (const e of MEETUP_CHENNAI_AUG_SEP_2026) {
    const result = await upsertEvent(db, cityId, toSeedRow(e));
    if (result === "inserted") inserted += 1;
    else updated += 1;
  }

  console.log(
    `[seed-meetup-chennai-aug-sep] Done — ${inserted} inserted, ${updated} refreshed (${MEETUP_CHENNAI_AUG_SEP_2026.length} total).`,
  );
  console.log("[seed-meetup-chennai-aug-sep] Hub: /chennai-local-events");

  await finishListingSeedLive({ label: "meetup-chennai-aug-sep" });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
