/**
 * Classified: 2 BHK flat for rent — Nanganallur (near Lakshmi Narasimha & Dharmalingeshwar temples).
 * Category `property`. No brokers. Vegetarians only. WhatsApp for owner's number.
 *
 * Dev:  `npm run db:seed:flat-rent-2bhk-nanganallur-december-2026`
 * Live: `npm run db:seed:flat-rent-2bhk-nanganallur-december-2026:live`
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

const SLUG = "flat-rent-2bhk-nanganallur-lakshmi-narasimha-december-2026";

const PHONE = "7305710601";
const PHONE_DISPLAY = "73057 10601";
const PHONE_WA = "https://wa.me/917305710601";

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

  const body = `## Flat for rent — 2 BHK, Nanganallur

**2 BHK flat for rent** in **Nanganallur**, near **Lakshmi Narasimha** and **Dharmalingeshwar** temples. The advertiser says **brokers need not contact**.

### Rent and advance
- **Rent:** ₹25,000 per month
- **Advance:** 2 months' rent (as stated)

### Layout and size
- **2 BHK** — about **800 sq ft**
- **2 bathrooms** — both **Western** style (**1 common**, **1 attached**)
- **2nd floor** — **top floor** of the building
- **Lift** and **car park** (as stated)

### Availability and who can apply
- **Available from 1 December 2026**
- **Vegetarians only** (as stated by the advertiser)

### What was not shared
- **No photos** were provided for this listing
- **Facing** was not mentioned — confirm with the owner before you visit

### Location
**Nanganallur**, Chennai — near Lakshmi Narasimha and Dharmalingeshwar temples. A full street address was not shared. Confirm the building and access before you visit.

### Contact
**Message [${PHONE_DISPLAY}](${PHONE_WA}) on WhatsApp for the owner's number.** Mention that you saw this listing on MyChennaiCity.

### Before you pay
MyChennaiCity does not inspect the flat or broker the deal. Visit in person, confirm rent, advance, vegetarian house rules, and get terms in writing before you transfer any deposit.

More property ads: [Chennai property classifieds](/chennai-classifieds?category=property).`.trim();

  const values = {
    cityId: city.id,
    slug: SLUG,
    title:
      "Flat for rent — 2 BHK, Nanganallur (₹25k, vegetarians only, no brokers)",
    body,
    category: "property",
    posterName: "Owner",
    posterUrl: null,
    locationLabel: "Nanganallur, Chennai (near Lakshmi Narasimha Temple)",
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
    label: "seed-flat-rent-2bhk-nanganallur-december-2026",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});