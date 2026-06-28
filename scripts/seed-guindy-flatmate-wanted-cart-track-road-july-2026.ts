/**
 * Classified ad: flatmate wanted — fully furnished 2 BHK, Cart Track Road, Guindy.
 *
 * Dev:  `npm run db:seed:guindy-flatmate-wanted-cart-track-road`
 * Live: `npm run db:seed:guindy-flatmate-wanted-cart-track-road:live`
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

const SLUG = "flatmate-wanted-2bhk-cart-track-road-guindy-july-2026";

const POSTER_URL =
  "https://www.facebook.com/groups/1300041970868444/user/100000766637786/";

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

  const body = `## Flatmate wanted — fully furnished 2 BHK

**Cart Track Road, Guindy** — about **1.5 km from Guindy Metro station**. Brand-new, **fully furnished 2 BHK** with all modern amenities in a **well-ventilated, peaceful, and calm** home.

### Rent and charges
- **₹21,000 per person/month**
- **Advance:** ₹63,000
- **Electricity (EB)** and **gas** charges shared equally among flatmates

### Available from
**7 July 2026**

### Amenities
- **Car and bike parking**
- **CCTV surveillance** — safe neighbourhood

### Who we're looking for
Someone **clean, responsible**, and who takes good care of the home. A **Telugu-speaking female** is preferred.

### Contact
Message via [Facebook](${POSTER_URL}) for more details or to schedule a visit. Mention that you saw the listing on MyChennaiCity.

Confirm rent, advance, move-in date, and house rules directly with the poster before you pay or visit.`.trim();

  const values = {
    cityId: city.id,
    slug: SLUG,
    title:
      "Flatmate wanted — fully furnished 2 BHK, Cart Track Road, Guindy",
    body,
    category: "flatmates-roommates",
    posterName: null,
    posterUrl: POSTER_URL,
    locationLabel: "Cart Track Road, Guindy, Chennai",
    contactPhone: null,
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

  await finishListingSeedLive({
    classifiedSlug: SLUG,
    label: "seed-guindy-flatmate-wanted-cart-track-road",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
