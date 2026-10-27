/**
 * Classified ad: 2015 Hero Pleasure, single owner, K.K. Nagar, Chennai.
 *
 * Dev:  `npm run db:seed:hero-pleasure-2015-kk-nagar`
 * Live: `npm run db:seed:hero-pleasure-2015-kk-nagar:live`
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

const SLUG = "hero-pleasure-2015-single-owner-kk-nagar";

const PHONE = "8838922250";
const PHONE_DISPLAY = "88389 22250";
const PHONE_TEL = "tel:+918838922250";
const PHONE_WA = "https://wa.me/918838922250";

const FRONT_IMAGE =
  "/images/classifieds/hero-pleasure-2015-kk-nagar-front.png";
const SIDE_IMAGE =
  "/images/classifieds/hero-pleasure-2015-kk-nagar-side.png";

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

  const body = `## 2015 Hero Pleasure — K.K. Nagar

White **Hero Pleasure** scooter, **2015** model, listed from **K.K. Nagar, Chennai**.

### Ownership
- **Single owner**
- **Lady-driven**
- **Original RC** and remaining documents with the seller

### Condition
Good running condition for a used 2015 scooter. Photos show chrome crash guards, oval mirrors, and a patterned seat cover. There are normal scuffs on the lower panels from city use — inspect in daylight and take a test ride.

Asking price was **not stated** in the source note. Confirm the price, kilometres, insurance, and hypothecation status with the seller.

### Location
**K.K. Nagar**, Chennai. Viewing by appointment.

### Contact
Call **[${PHONE_DISPLAY}](${PHONE_TEL})** or WhatsApp **[${PHONE_DISPLAY}](${PHONE_WA})**. Mention that you saw the listing on MyChennaiCity.

### Before you buy
- Match engine and chassis numbers to the **RC**
- Check insurance, pollution, and any bank hypothecation
- Get a mechanic to look at the scooter before you pay

Planning bands for Chennai used scooters (not this listing’s price): [used vehicle price pulse](/guides/chennai-used-vehicle-price-pulse).

This is a reader-submitted classified. MyChennaiCity does not inspect the vehicle or broker the sale.`.trim();

  const values = {
    cityId: city.id,
    slug: SLUG,
    title: "2015 Hero Pleasure for sale — single owner, K.K. Nagar",
    body,
    category: "vehicles",
    posterName: "Owner",
    posterUrl: null,
    locationLabel: "K.K. Nagar, Chennai",
    contactPhone: PHONE,
    areaHubSlug: "kodambakkam-t-nagar",
    featured: true,
    imageUrls: [FRONT_IMAGE, SIDE_IMAGE],
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

  console.log("[seed-classified] Public URL:", `/chennai-classifieds/${SLUG}`);
  console.log(
    "[seed-classified] Vehicles hub:",
    "/chennai-classifieds?category=vehicles",
  );
  console.log("[seed-classified] All classifieds:", "/chennai-classifieds");

  await finishListingSeedLive({
    classifiedSlug: SLUG,
    label: "seed-hero-pleasure-2015-kk-nagar",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
