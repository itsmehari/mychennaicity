/**
 * Mylapore Kapaleeshwarar Panguni 2026 — rich presentation (`festival_rich`) + hub placeholders.
 *
 * Live: `tsx scripts/seed-event-mylapore-panguni-2026.ts --live`
 * Dev:  `tsx scripts/seed-event-mylapore-panguni-2026.ts`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { cities, events } from "../src/db/schema/tables";
import {
  MYLAPORE_KAPALI_PANGUNI_2026_REF,
} from "../src/content/special-events/mylapore-kapali-panguni-2026";

const live =
  process.env.SEED_LIVE === "1" || process.argv.includes("--live");

if (live) {
  loadEnv({ path: ".env.production.local" });
} else {
  loadEnv({ path: "secrets/database.local.env" });
  loadEnv({ path: ".env.local" });
  loadEnv({ path: ".env" });
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    live
      ? "Live: DATABASE_URL missing."
      : "DATABASE_URL missing — add to .env.local",
  );
  process.exit(1);
}

const db = drizzle(neon(url), { schema });

const SLUG = "mylapore-panguni-festival-kapaleeshwarar-2026";

const DESCRIPTION = `Panguni Peruvizha at Sri Kapaleeshwarar Temple, Mylapore — processions, vahanams, ther, and Thirukalyanam (see site for full day-wise schedule and official PDF).`;

/** End of Vidaiyatri window (12 Apr 2026) — keeps event listable through the period. */
const ENDS_IST = new Date("2026-04-12T18:30:00.000Z");
const STARTS_IST = new Date("2026-03-21T18:30:00.000Z"); // 22 Mar 2026 00:00 IST

const PLACEHOLDER_EVENTS = [
  {
    slug: "chennai-heritage-walk-mylapore-apr-2026",
    title: "Heritage walk — Mylapore tank & lanes (sample)",
    description:
      "Placeholder listing so the events hub stays populated when only DB rows are shown. Replace with a real organiser event when available.",
    startsAt: new Date("2026-04-05T04:30:00.000Z"),
    endsAt: new Date("2026-04-05T06:30:00.000Z"),
    venueName: "Mylapore",
    localityLabel: "Mylapore",
  },
  {
    slug: "classical-concert-sabha-chennai-apr-2026",
    title: "Kutcheri season — weekend slot (sample)",
    description:
      "Placeholder for the Chennai events hub. Confirm venue and tickets on the sabha or organiser site.",
    startsAt: new Date("2026-04-08T10:30:00.000Z"),
    endsAt: new Date("2026-04-08T12:30:00.000Z"),
    venueName: "T. Nagar / Sabha corridor",
    localityLabel: "T. Nagar",
  },
] as const;

async function insertIfMissing(
  cityId: string,
  row: {
    slug: string;
    title: string;
    description: string;
    startsAt: Date;
    endsAt: Date;
    allDay: boolean;
    venueName: string;
    venueAddress?: string;
    localityLabel: string;
    featured: boolean;
    presentationKey?: string | null;
    contentRef?: string | null;
  },
) {
  const [existing] = await db
    .select({ id: events.id })
    .from(events)
    .where(and(eq(events.cityId, cityId), eq(events.slug, row.slug)))
    .limit(1);
  if (existing) {
    console.log("Event already exists:", row.slug);
    return;
  }
  await db.insert(events).values({
    cityId,
    slug: row.slug,
    title: row.title,
    description: row.description,
    startsAt: row.startsAt,
    endsAt: row.endsAt,
    allDay: row.allDay,
    venueName: row.venueName,
    venueAddress: row.venueAddress ?? null,
    localityLabel: row.localityLabel,
    status: "scheduled",
    featured: row.featured,
    presentationKey: row.presentationKey ?? null,
    contentRef: row.contentRef ?? null,
  });
  console.log("Inserted event:", row.slug);
}

async function main() {
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);

  if (!city) {
    console.error("City slug 'chennai' not found. Seed cities first.");
    process.exit(1);
  }

  await insertIfMissing(city.id, {
    slug: SLUG,
    title: "Mylapore Panguni Festival 2026 — Sri Kapaleeshwarar Temple",
    description: DESCRIPTION,
    startsAt: STARTS_IST,
    endsAt: ENDS_IST,
    allDay: true,
    venueName: "Sri Kapaleeshwarar Temple",
    venueAddress: "Kapaleeshwarar Sannathi Street, Mylapore, Chennai – 600004",
    localityLabel: "Mylapore",
    featured: true,
    presentationKey: "festival_rich",
    contentRef: MYLAPORE_KAPALI_PANGUNI_2026_REF,
  });

  for (const p of PLACEHOLDER_EVENTS) {
    await insertIfMissing(city.id, {
      slug: p.slug,
      title: p.title,
      description: p.description,
      startsAt: p.startsAt,
      endsAt: p.endsAt,
      allDay: false,
      venueName: p.venueName,
      localityLabel: p.localityLabel,
      featured: false,
      presentationKey: null,
      contentRef: null,
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
