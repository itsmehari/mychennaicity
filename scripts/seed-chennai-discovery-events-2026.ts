/**
 * Bulk seed — Chennai discovery events (June–October 2026).
 *
 * Dev:  `npm run db:seed:chennai-discovery-events`
 * Live: `npm run db:seed:chennai-discovery-events:live`
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import {
  CHENNAI_DISCOVERY_EVENTS_2026,
  buildDiscoveryEventDescription,
  type ChennaiDiscoveryEvent,
} from "../src/content/events/chennai-discovery-events-2026";
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
  const bit = (which === "end" && parts.length > 1 ? parts[1] : parts[0])!.trim();
  const [h, min] = bit.split(":").map(Number);
  return { hour: h ?? 0, minute: min ?? 0 };
}

function defaultEndTime(startHour: number, startMin: number): {
  hour: number;
  minute: number;
} {
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
  const startsAt = istToUtcDate(
    startDate.y,
    startDate.m,
    startDate.d,
    startTime.hour,
    startTime.minute,
  );
  const endsAt = istToUtcDate(
    endDate.y,
    endDate.m,
    endDate.d,
    endTime.hour,
    endTime.minute,
  );

  return {
    slug: e.slug,
    title: e.title,
    description: buildDiscoveryEventDescription(e),
    startsAt,
    endsAt,
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

  for (const e of CHENNAI_DISCOVERY_EVENTS_2026) {
    const row = toSeedRow(e);
    const result = await upsertEvent(db, cityId, row);
    if (result === "inserted") inserted += 1;
    else updated += 1;
  }

  console.log(
    `[seed-chennai-discovery] Done — ${inserted} inserted, ${updated} refreshed (${CHENNAI_DISCOVERY_EVENTS_2026.length} total).`,
  );
  console.log("[seed-chennai-discovery] Hub: /chennai-local-events");

  await finishListingSeedLive({ label: "chennai-discovery-events" });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
