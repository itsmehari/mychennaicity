/**
 * Three printed music sheets: Margazhi Maha Utsavam, Vani Mahal Isai Vizha,
 * and Kartik Fine Arts on 12 December 2026.
 *
 * Dev:  `npm run db:seed:event:music-season-sheets`
 * Live: `npm run db:seed:event:music-season-sheets:live`
 *
 * Slots marked seed:false already exist from an artist sheet and are skipped.
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import {
  listSeasonSlots,
  seasonEventDescription,
  seasonEventTitle,
} from "../src/content/music/season-concerts";
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
  let firstSlug = "";
  let inserted = 0;
  let skipped = 0;

  for (const { series, slot } of listSeasonSlots()) {
    if (!slot.seed) {
      skipped += 1;
      console.log("[seed-event-music-season-sheets] skip existing", slot.slug);
      continue;
    }
    const [year, month, day] = slot.iso.split("-").map(Number);
    const endTotal = slot.hour * 60 + slot.minute + 180;
    const result = await upsertEvent(db, cityId, {
      slug: slot.slug,
      title: seasonEventTitle(series, slot),
      description: seasonEventDescription(series, slot),
      startsAt: istToUtcDate(year, month, day, slot.hour, slot.minute),
      endsAt: istToUtcDate(
        year,
        month,
        day,
        Math.floor(endTotal / 60),
        endTotal % 60,
      ),
      allDay: false,
      venueName: series.venueName,
      venueAddress: series.venueAddress,
      localityLabel: series.localityLabel,
      featured: false,
    });
    if (!firstSlug) firstSlug = slot.slug;
    if (result === "inserted") inserted += 1;
    console.log("[seed-event-music-season-sheets]", result, slot.slug);
  }

  console.log(
    "[seed-event-music-season-sheets] inserted",
    inserted,
    "skipped",
    skipped,
  );

  await finishListingSeedLive({
    eventSlug: firstSlug,
    label: "seed-event-music-season-sheets",
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
