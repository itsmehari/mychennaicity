/**
 * Classified ad: persons wanted for vehicle cleaning at car showrooms, Chennai.
 * Contact Manikhandan — 9789354785.
 *
 * Dev:  `npm run db:seed:vehicle-cleaning-staff-car-showrooms-chennai`
 * Live: `npm run db:seed:vehicle-cleaning-staff-car-showrooms-chennai:live` — uses `.env.production.local` only
 */
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

const db = drizzle(neon(url), { schema });

const SLUG = "vehicle-cleaning-staff-wanted-car-showrooms-chennai-november-2026";

const POSTER_NAME = "Manikhandan";
const PHONE = "9789354785";
const PHONE_DISPLAY = "97893 54785";
const PHONE_TEL = "tel:+919789354785";

async function main() {
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

  const body = `## Persons wanted — vehicle cleaning (car showrooms)

**${POSTER_NAME}** is looking for **persons for vehicle cleaning** at **car showrooms in Chennai**.

### Contact

Call **[${PHONE_DISPLAY}](${PHONE_TEL})** to discuss the role, location, and pay.

More service and help-wanted ads: [Chennai services classifieds](/chennai-classifieds?category=services).`.trim();

  const values = {
    cityId: city.id,
    slug: SLUG,
    title: "Vehicle cleaning staff wanted — car showrooms, Chennai",
    body,
    category: "services",
    posterName: POSTER_NAME,
    posterUrl: null,
    locationLabel: "Car showrooms, Chennai",
    contactPhone: PHONE,
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
    await db
      .update(classifiedListings)
      .set(values)
      .where(eq(classifiedListings.id, existing.id));
    console.log("[seed-classified] Refreshed listing:", SLUG);
  } else {
    await db.insert(classifiedListings).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-classified] Inserted listing:", SLUG);
  }

  console.log("[seed-classified] Public URL:", `/chennai-classifieds/${SLUG}`);
  console.log(
    "[seed-classified] Category hub:",
    "/chennai-classifieds?category=services",
  );

  await finishListingSeedLive({
    classifiedSlug: SLUG,
    label: "seed-vehicle-cleaning-staff-car-showrooms-chennai",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});