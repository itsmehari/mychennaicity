/**
 * Classified ad: female flatmate required — Arihant Escapade, Thoraipakkam.
 *
 * Dev:  `npm run db:seed:thoraipakkam-female-flatmate-arihant-escapade`
 * Live: `npm run db:seed:thoraipakkam-female-flatmate-arihant-escapade:live`
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

const SLUG = "female-flatmate-required-arihant-escapade-thoraipakkam-aug-2026";

const POSTER_URL =
  "https://www.facebook.com/groups/1300041970868444/user/100050411561130/";

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

  const body = `## Female flatmate required — fully furnished 3 BHK

*Posting on behalf of a female friend.*

Looking for an **easy-going female flatmate** for a room in a **fully furnished 3 BHK** in gated society **Arihant Escapade, Dew Block, Thoraipakkam**, Chennai.

### Room features

- **Attached washroom**
- **Bed & mattress**
- **Wardrobe / cupboard**
- **Air conditioner (AC)**

### Flat & society

- **Fully furnished 3 BHK** in a **gated society**
- **Club house** with **swimming pool**, **gym**, and other amenities

### Rent and charges

- **Rent:** ₹10,000/month
- **Security deposit:** ₹40,000
- **One-time setup charge:** ₹5,000 — covers shared appliances and essentials including **fridge**, **washing machine**, **utensils**, and **stove**

### Availability

**From 1 August 2026** — early move-in can be arranged.

### Preference

**Non-vegetarian** · **North Indian** flatmate preferred.

### Contact

Message via [Facebook](${POSTER_URL}) for more details or to schedule a visit. Mention that you saw the listing on MyChennaiCity.

Confirm rent, deposit, setup charge, and house rules directly with the poster before you pay or visit.`.trim();

  const values = {
    cityId: city.id,
    slug: SLUG,
    title:
      "Female flatmate required — Arihant Escapade, Thoraipakkam (3 BHK)",
    body,
    category: "flatmates-roommates",
    posterName: "Posted on behalf of friend",
    posterUrl: POSTER_URL,
    locationLabel: "Arihant Escapade, Thoraipakkam, Chennai",
    contactPhone: null,
    areaHubSlug: "omr-perungudi-sholinganallur",
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
    "/chennai-classifieds?category=flatmates-roommates",
  );

  await finishListingSeedLive({
    classifiedSlug: SLUG,
    label: "seed-thoraipakkam-female-flatmate-arihant-escapade",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
