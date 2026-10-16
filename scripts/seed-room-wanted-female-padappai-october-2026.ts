/**
 * Classified: woman seeking a single room or a private room with a female flatmate in Padappai.
 * Phone is gated — public HTML does not include it. Reveal stores the enquirer's number first.
 *
 * Dev:  `npm run db:seed:room-wanted-female-padappai`
 * Live: `npm run db:seed:room-wanted-female-padappai:live`
 */
import { readFileSync } from "node:fs";
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { cities, classifiedListings } from "../src/db/schema/tables";
import { finishListingSeedLive } from "./lib/seed-event-shared";

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
      ? "Live: DATABASE_URL missing (.env.production.local)."
      : "DATABASE_URL missing — add to .env.local or secrets/database.local.env",
  );
  process.exit(1);
}

const sql = neon(url);
const db = drizzle(sql, { schema });

async function ensurePhoneGateSchema() {
  const file = readFileSync("drizzle/0012_classified_phone_gate.sql", "utf8");
  for (const part of file.split("--> statement-breakpoint")) {
    const q = part.trim();
    if (q) await sql.query(q);
  }
}

const SLUG = "room-wanted-female-padappai-october-2026";
const CONTACT_PHONE = "8754069017";

async function main() {
  await ensurePhoneGateSchema();

  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);

  if (!city) {
    console.error("City slug 'chennai' not found. Run db:seed or create city first.");
    process.exit(1);
  }

  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + 90);

  const body = `## Room sharing or small 1RK room needed for working woman

A working woman is looking for accommodation in **Padappai**, Chennai.

### What she needs
- **Room sharing** with a female flatmate, or
- A **small 1RK** for rent

### Contact
Her mobile number is hidden on this page. Enter your own number on the form to see it. Mention that you saw the post on MyChennaiCity.

Agree rent, deposit, and house rules directly with her before you pay or share the keys.`.trim();

  const values = {
    cityId: city.id,
    slug: SLUG,
    title: "Room sharing or small 1RK room needed for working woman",
    body,
    category: "flatmates-roommates",
    posterName: "Working woman",
    posterUrl: null,
    locationLabel: "Padappai, Chennai",
    contactPhone: CONTACT_PHONE,
    contactPhoneGated: true,
    areaHubSlug: null,
    status: "open" as const,
    publishedAt: now,
    expiresAt,
    updatedAt: now,
  };

  const [existing] = await db
    .select({ id: classifiedListings.id })
    .from(classifiedListings)
    .where(and(eq(classifiedListings.cityId, city.id), eq(classifiedListings.slug, SLUG)))
    .limit(1);

  if (existing) {
    await db.update(classifiedListings).set(values).where(eq(classifiedListings.id, existing.id));
    console.log("[seed-classified] Refreshed listing:", SLUG);
  } else {
    await db.insert(classifiedListings).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-classified] Inserted listing:", SLUG);
  }

  console.log("[seed-classified] Public URL:", `/chennai-classifieds/${SLUG}`);

  await finishListingSeedLive({
    classifiedSlug: SLUG,
    label: "seed-room-wanted-female-padappai",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
