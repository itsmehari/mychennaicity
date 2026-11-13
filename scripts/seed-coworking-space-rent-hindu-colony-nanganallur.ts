/**
 * Classified: co-working space for rent — Hindu Colony, Nanganallur.
 * Category `property`. Monday–Saturday, 8:00am–5:00pm. Daily, weekly, or monthly.
 * Same note on https://mynanganallur.in/properties/rent-coworking-hindu-colony-nanganallur
 *
 * Dev:  `npm run db:seed:coworking-hindu-colony-nanganallur`
 * Live: `npm run db:seed:coworking-hindu-colony-nanganallur:live`
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
const sql = neon(url);

async function ensureFeaturedImageColumns() {
  await sql`ALTER TABLE classified_listings ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false NOT NULL`;
  await sql`ALTER TABLE classified_listings ADD COLUMN IF NOT EXISTS image_urls jsonb`;
}

const SLUG = "coworking-space-rent-hindu-colony-nanganallur";
const PHONE = "9884036077";
const PHONE_DISPLAY = "98840 36077";
const PHONE_WA = "https://wa.me/919884036077";
const SISTER =
  "https://mynanganallur.in/properties/rent-coworking-hindu-colony-nanganallur";

async function main() {
  await ensureFeaturedImageColumns();

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

  const body = `## Co-working space for rent — Hindu Colony, Nanganallur

A **co-working space** is available for rent in **Hindu Colony, Nanganallur**. The advertiser says it suits **IT professionals**, **share trading**, and similar daytime desk work.

The same note is on [MyNanganallur](${SISTER}).

### Hours
- **8:00am to 5:00pm**
- **Monday to Saturday**

### Rental basis
**Daily, weekly, or monthly.** Rates, deposit, and seat count were not stated. Confirm them on the call.

### Amenities (as stated)
- Wi-Fi
- Air conditioning
- CCTV
- Power backup
- Restrooms
- Housekeeping

### Location
**Hindu Colony, Nanganallur**, Chennai. A full street address was not shared. Confirm the building and access before you visit.

### Contact
Call or WhatsApp **[${PHONE_DISPLAY}](${PHONE_WA})**.

### Before you pay
MyChennaiCity does not inspect the space or broker the deal. Visit in person, confirm hours, and get the fee in writing before you transfer any advance.

Other property ads: [Chennai property classifieds](/chennai-classifieds?category=property).`.trim();

  const values = {
    cityId: city.id,
    slug: SLUG,
    title: "Co-working space for rent — Hindu Colony, Nanganallur",
    body,
    category: "property",
    posterName: null as string | null,
    posterUrl: null as string | null,
    locationLabel: "Hindu Colony, Nanganallur, Chennai",
    contactPhone: PHONE,
    contactPhoneGated: false,
    areaHubSlug: null as string | null,
    featured: false,
    imageUrls: null as string[] | null,
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
    console.log("[seed-classified] Refreshed listing:", SLUG);
  } else {
    await db.insert(classifiedListings).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-classified] Inserted listing:", SLUG);
  }

  console.log(
    "[seed-classified] Public URL:",
    `https://mychennaicity.in/chennai-classifieds/${SLUG}`,
  );

  await finishListingSeedLive({
    classifiedSlug: SLUG,
    label: "seed-coworking-hindu-colony-nanganallur",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
