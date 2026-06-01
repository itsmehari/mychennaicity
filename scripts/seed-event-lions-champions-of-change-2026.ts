/**
 * Lions Council of India — Champions of Change Award Function (1 Jun 2026, Guindy).
 *
 * Live: `tsx scripts/seed-event-lions-champions-of-change-2026.ts --live`
 * Dev:  `tsx scripts/seed-event-lions-champions-of-change-2026.ts`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { cities, events } from "../src/db/schema/tables";

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
      ? "Live: DATABASE_URL missing. Add to .env.production.local."
      : "DATABASE_URL missing — add to .env.local",
  );
  process.exit(1);
}

const db = drizzle(neon(url), { schema });

export const LIONS_CHAMPIONS_OF_CHANGE_2026_SLUG =
  "lions-council-champions-of-change-award-2026";

const DESCRIPTION = `**Lions Council of India 2025–26** presents the **Champions of Change Award Function** — an evening awards ceremony recognising individuals for civic and social impact.

**When:** Monday, 1 June 2026 · **6:00 PM** (doors and seating per organiser)

**Where:** Hotel ITC Grand Chola, GST Road, Guindy, Chennai

### Presiding

- **G. Babu Rao** — Past International Director & Chairman, Lions Council of India

### Chief guest

- **A.P. Singh** — International President, Lions International

### Guests of honour

- **Sri Magunta Sreevasulu Reddy** — Member of Parliament (Lok Sabha)
- **Sri Beeda Masthan Rao** — Member of Parliament (Rajya Sabha)
- **Sri D. Shanmugan** — Member of Legislative Assembly

### Council officials

- **Vijay Kumar Raju, PID** — Hon. Treasurer
- **Pravin Chhajed, PID** — Hon. Secretary

### Awardees

Dr. A V Anoop · Sri Rishi Raj Borah · Sri Paras Desai · Sri Harikrishna · Dr. Nilesh Jain · Dr. Shashank Joshi · Sri Sujith Kumar · CA Charanjot Singh Nanda · Dr. Mala Pandurang · Sri Rajendra Parihar · Sri Mukesh Patel · Sri Jadav Payeng · Sri Sithapathy Rao · Dr. U V Ramana Raju · Sri Surender Pal Singh Saluja · Dr. Sunil Shroff · Dr. Soundarya Manohari Velamati

---

Details transcribed from the organiser invitation (June 2026). Confirm dress code, entry passes, and any programme changes with **Lions Council of India** before you travel.`;

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

  const [existing] = await db
    .select({ id: events.id })
    .from(events)
    .where(
      and(eq(events.cityId, city.id), eq(events.slug, LIONS_CHAMPIONS_OF_CHANGE_2026_SLUG)),
    )
    .limit(1);

  if (existing) {
    console.log("Event already exists:", LIONS_CHAMPIONS_OF_CHANGE_2026_SLUG, existing.id);
    return;
  }

  /** 1 Jun 2026 6:00 PM – ~9:30 PM IST */
  const startsAt = new Date("2026-06-01T12:30:00.000Z");
  const endsAt = new Date("2026-06-01T16:00:00.000Z");

  await db.insert(events).values({
    cityId: city.id,
    slug: LIONS_CHAMPIONS_OF_CHANGE_2026_SLUG,
    title: "Champions of Change Award Function — Lions Council of India",
    description: DESCRIPTION,
    startsAt,
    endsAt,
    allDay: false,
    venueName: "Hotel ITC Grand Chola",
    venueAddress: "GST Road, Guindy, Chennai",
    localityLabel: "Guindy",
    status: "scheduled",
    featured: true,
  });

  console.log("Inserted event:", LIONS_CHAMPIONS_OF_CHANGE_2026_SLUG);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
