/**
 * Classified ad: female bachelor seeking room — Perungudi, Adyar belt.
 *
 * Dev:  `npm run db:seed:female-bachelor-room-wanted-south-chennai`
 * Live: `npm run db:seed:female-bachelor-room-wanted-south-chennai:live`
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

const SLUG =
  "female-bachelor-room-wanted-perungudi-adyar-thiruvanmiyur-june-2026";

const PHONE = "9307313435";
const PHONE_DISPLAY = "93073 13435";
const PHONE_TEL = "tel:+919307313435";

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

  const body = `## Room wanted — female bachelor, South Chennai

A **female bachelor** is looking for a **single occupancy room** or **shared accommodation** in South Chennai.

### Preferred areas
- **Perungudi** (near World Trade Center)
- **Kandanchawadi**
- **Adyar**
- **Thiruvanmiyur**

### Open to
**1 RK**, **1 BHK**, **2 BHK**, or **3 BHK** — single room or shared flat with flatmates.

### About the seeker
- Easy-going and friendly
- Maintains cleanliness and respects shared spaces

### Budget
- **Rent:** ₹7,000–₹12,000 per month
- **Advance:** Up to one month's rent

### Contact
Call **[${PHONE_DISPLAY}](${PHONE_TEL})** or DM the advertiser. If you have a room or are looking for a flatmate in these areas, please reach out. Mention that you saw the listing on MyChennaiCity.

Confirm rent, advance, move-in date, and house rules directly before you pay or visit.`.trim();

  const values = {
    cityId: city.id,
    slug: SLUG,
    title:
      "Room wanted — female bachelor, Perungudi / Adyar / Thiruvanmiyur (₹7k–₹12k)",
    body,
    category: "flatmates-roommates",
    posterName: null,
    posterUrl: null,
    locationLabel:
      "Perungudi, Kandanchawadi, Adyar & Thiruvanmiyur, Chennai",
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
    "[seed-classified] Flatmates hub:",
    "/chennai-classifieds?category=flatmates-roommates",
  );
  console.log("[seed-classified] All classifieds:", "/chennai-classifieds");

  await finishListingSeedLive({
    classifiedSlug: SLUG,
    label: "seed-female-bachelor-room-wanted-south-chennai",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
