/**
 * Classified: helper chef wanted — Velachery, Perungudi, Tambaram.
 * Pay printed ₹15,000–₹18,000 plus accommodation. Call 9071138799.
 *
 * Dev:  `npm run db:seed:helper-chef-velachery-perungudi-tambaram`
 * Live: `npm run db:seed:helper-chef-velachery-perungudi-tambaram:live`
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
      : "DATABASE_URL missing — add to .env.local",
  );
  process.exit(1);
}

const db = drizzle(neon(url), { schema });

const SLUG =
  "helper-chef-wanted-velachery-perungudi-tambaram-november-2026";

const PHONE = "9071138799";
const PHONE_DISPLAY = "90711 38799";
const PHONE_TEL = "tel:+919071138799";

async function main() {
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);

  if (!city) {
    console.error("City slug 'chennai' not found.");
    process.exit(1);
  }

  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + 90);

  const body = `## Helper chef required

Wanted: **helper chef** for sites in **Velachery**, **Perungudi**, and **Tambaram**, Chennai.

### Pay and stay

The notice prints **₹15,000 to ₹18,000** per month **plus accommodation**.

Hours, employer name, and kitchen type are not in the note.

### Contact

Call **[${PHONE_DISPLAY}](${PHONE_TEL})**.

More help-wanted and service ads: [Chennai services classifieds](/chennai-classifieds?category=services).`.trim();

  const values = {
    cityId: city.id,
    slug: SLUG,
    title: "Helper chef wanted — Velachery, Perungudi & Tambaram",
    body,
    category: "services",
    posterName: null,
    posterUrl: null,
    locationLabel: "Velachery, Perungudi & Tambaram",
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
    .where(
      and(eq(classifiedListings.cityId, city.id), eq(classifiedListings.slug, SLUG)),
    )
    .limit(1);

  if (existing) {
    await db
      .update(classifiedListings)
      .set(values)
      .where(eq(classifiedListings.id, existing.id));
    console.log("[seed-classified] Refreshed:", SLUG);
  } else {
    await db.insert(classifiedListings).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-classified] Inserted:", SLUG);
  }

  console.log(
    "[seed-classified] Public URL:",
    `https://mychennaicity.in/chennai-classifieds/${SLUG}`,
  );

  await finishListingSeedLive({
    classifiedSlug: SLUG,
    label: "seed-helper-chef-velachery-perungudi-tambaram",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});