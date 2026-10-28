/**
 * Classified: 3.5 BHK premium luxury apartments for sale — Radha Nagar, Chromepet.
 * Category `property` so the row is on all classifieds and the property filter.
 *
 * Dev:  `npm run db:seed:luxury-apartments-radha-nagar-chromepet`
 * Live: `npm run db:seed:luxury-apartments-radha-nagar-chromepet:live`
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

const SLUG = "luxury-apartments-sale-radha-nagar-chromepet-october-2026";

const PHONE = "9176691715";
const PHONE_DISPLAY = "91766 91715";
const PHONE_WA = "https://wa.me/919176691715";

const POSTER_IMAGE =
  "/images/classifieds/luxury-apartments-radha-nagar-chromepet-october-2026.jpg";

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

  const body = `## 3.5 BHK premium luxury apartments for sale — Radha Nagar, Chromepet

**Newly constructed** apartments on a **40 feet wide road** in **Radha Nagar, Chromepet, Chennai**.

### Building
- **Stilt parking** with residential floors from **1st to 3rd**
- **6 apartments** in the block; **2 units available** (as on the poster)
- **Land area:** 4,479 sq ft (building plot)

### Available units (both north facing)

**1st floor** and **2nd floor** — same layout:

- **Plinth area:** 1,700 sq ft
- **3 BHK** plus **study room**
- **2 attached bathrooms** and **1 common bathroom**
- **Balcony**
- **Furnished** with complete interior work: **3 cots**, **modular kitchen**, **3 air conditioners**, **geyser in all bathrooms**
- **2 reserved car parking** spaces per unit
- **Undivided share (UDS):** 750 sq ft; **common area:** 344 sq ft (as stated on the flyer)
- **Two-wheeler parking** available in the building

### Amenities and connectivity
- **Water:** Metro Water sump and **2 borewells**
- **Sewage:** underground drainage
- **Chromepet railway station:** about **1.5 km** away

### Price
**₹9,000 per sq ft** (on plinth area, as printed). **Price negotiable.** MyChennaiCity does not verify the rate or title — confirm the all-in price, UDS, and approvals before you pay a token.

### Contact
For enquiries and site visits, call or WhatsApp **[${PHONE_DISPLAY}](${PHONE_WA})**. Mention that you saw this listing on MyChennaiCity.

### Before you visit or pay a token
- MyChennaiCity does not inspect the property or broker the sale.
- Confirm the exact floor, facing, furnished inclusions, parking slots, and registered documents with the seller directly.

More property ads: [Chennai property classifieds](/chennai-classifieds?category=property).`.trim();

  const values = {
    cityId: city.id,
    slug: SLUG,
    title:
      "3.5 BHK luxury apartments for sale — Radha Nagar, Chromepet (2 units left)",
    body,
    category: "property",
    posterName: "Seller",
    posterUrl: null,
    locationLabel: "Radha Nagar, Chromepet, Chennai",
    contactPhone: PHONE,
    contactPhoneGated: false,
    areaHubSlug: "tambaram-pallavaram-medavakkam",
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

  await finishListingSeedLive({
    classifiedSlug: SLUG,
    label: "seed-luxury-apartments-radha-nagar-chromepet",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
