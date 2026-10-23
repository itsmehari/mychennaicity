/**
 * Classified: Sreevaidhya Organics wants a cloud kitchen space around Sholinganallur.
 * Category `property` so the row is on all classifieds and the property filter.
 * Flyer plus a later note: east or north facing, and space sharing is welcome.
 *
 * Dev:  `npm run db:seed:sreevaidhya-cloud-kitchen-space-wanted`
 * Live: `npm run db:seed:sreevaidhya-cloud-kitchen-space-wanted:live`
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

const SLUG =
  "cloud-kitchen-space-wanted-sreevaidhya-organics-sholinganallur-october-2026";

const PHONE = "9840504346";
const PHONE_DISPLAY = "98405 04346";
const PHONE_WA = "https://wa.me/919840504346";

const POSTER_IMAGE =
  "/images/classifieds/sreevaidhya-organics-cloud-kitchen-space-wanted-sholinganallur-october-2026.jpg";

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

  const body = `## Cloud kitchen space wanted — Sreevaidhya Organics

**Sreevaidhya Organics** is looking for a **cloud kitchen** space. This is a requirement, not a kitchen offered for rent.

### Areas
In and around **Sholinganallur**, or places close by:

- Sholinganallur
- Thoraipakkam
- Perungudi
- Karapakkam
- Uthandi
- Kanathur
- Medavakkam
- Perumbakkam

### Space
- **Minimum 250 sq ft**
- **Ground floor**
- **Kitchen and bathroom**
- **East facing or north facing**
- **Space sharing** is welcome

Rent, deposit, and a preferred move-in date were not stated.

### Contact
**Geethalatha** — call or WhatsApp **[${PHONE_DISPLAY}](${PHONE_WA})**. Mention that you saw this requirement on MyChennaiCity.

Genuine leads are welcome. They look forward to positive contacts.

### Before you share keys or a deposit
- MyChennaiCity does not inspect the space or broker the deal.
- Confirm the rent, the street, and what is included before you hand over keys or a token.

Other property ads: [Chennai property classifieds](/chennai-classifieds?category=property). Area notes: [OMR — Perungudi to Sholinganallur](/areas/omr-perungudi-sholinganallur).`.trim();

  const values = {
    cityId: city.id,
    slug: SLUG,
    title:
      "Cloud kitchen space wanted — Sholinganallur, Thoraipakkam and nearby",
    body,
    category: "property",
    posterName: "Geethalatha, Sreevaidhya Organics",
    posterUrl: null,
    locationLabel:
      "Sholinganallur, Thoraipakkam, Perungudi, Karapakkam, Uthandi, Kanathur, Medavakkam, Perumbakkam",
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
    label: "seed-sreevaidhya-cloud-kitchen-space-wanted",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
