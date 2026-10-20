/**
 * Classified: buyer wants an independent house on OMR or Vandalur–Kelambakkam Road.
 * Category `property` so the row is on all classifieds and the property filter.
 *
 * Dev:  `npm run db:seed:independent-house-wanted-omr-kelambakkam`
 * Live: `npm run db:seed:independent-house-wanted-omr-kelambakkam:live`
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

const SLUG = "independent-house-wanted-omr-vandalur-kelambakkam-october-2026";

const PHONE = "9176691715";
const PHONE_DISPLAY = "91766 91715";
const PHONE_TEL = "tel:+919176691715";
const PHONE_WA = "https://wa.me/919176691715";

const POSTER_IMAGE =
  "/images/classifieds/independent-house-wanted-omr-vandalur-kelambakkam-october-2026.jpg";

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

  const body = `## Urgent requirement — independent house for purchase

A buyer is looking to **purchase** an independent house. This is a requirement, not a house offered for sale.

### Preferred locations
- **OMR**, Chennai
- **Vandalur–Kelambakkam Road**

### Property requirements
- **Ground floor + first floor** construction
- **Ready to occupy**
- For a resale house, the building must be **less than 10 years** old

### Budget
**Up to ₹90 lakh.** No minimum was stated.

### Contact
Call **[${PHONE_DISPLAY}](${PHONE_TEL})** or WhatsApp **[${PHONE_DISPLAY}](${PHONE_WA})**. Mention that you saw this requirement on MyChennaiCity.

If you have a suitable house, or know someone selling one, genuine leads are welcome.

### Before you share papers
- MyChennaiCity does not inspect the house or broker the sale.
- Confirm the budget, the street, and how payment will be made before you share title documents or accept a token.

Other property ads: [Chennai property classifieds](/chennai-classifieds?category=property). Corridor notes: [OMR — Perungudi to Sholinganallur](/areas/omr-perungudi-sholinganallur).`.trim();

  const values = {
    cityId: city.id,
    slug: SLUG,
    title: "Urgent: independent house wanted — OMR or Vandalur–Kelambakkam Road",
    body,
    category: "property",
    posterName: "Buyer",
    posterUrl: null,
    locationLabel: "OMR and Vandalur–Kelambakkam Road, Chennai",
    contactPhone: PHONE,
    contactPhoneGated: false,
    areaHubSlug: "omr-perungudi-sholinganallur",
    featured: true,
    imageUrls: [POSTER_IMAGE],
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
    "[seed-classified] Property hub:",
    "/chennai-classifieds?category=property",
  );
  console.log("[seed-classified] All classifieds:", "/chennai-classifieds");

  await finishListingSeedLive({
    classifiedSlug: SLUG,
    label: "seed-independent-house-wanted-omr-kelambakkam",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
