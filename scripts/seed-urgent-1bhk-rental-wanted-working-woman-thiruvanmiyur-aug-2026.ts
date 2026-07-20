/**
 * Classified ad: urgent 1 RK / 1 BHK rental wanted — working woman, South Chennai.
 *
 * Dev:  `npm run db:seed:urgent-1bhk-rental-wanted-working-woman-thiruvanmiyur`
 * Live: `npm run db:seed:urgent-1bhk-rental-wanted-working-woman-thiruvanmiyur:live`
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
  "urgent-1rk-1bhk-rental-wanted-working-woman-thiruvanmiyur-aug-2026";

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

  const body = `## Urgent accommodation required — working woman, South Chennai

A **working professional** is looking for **1 RK or 1 BHK** accommodation near **Thiruvanmiyur Railway Station** (within about **10 km**).

### Preferred locations
- **Thiruvanmiyur**
- **Perungudi**
- **Kandanchavadi**
- **Adyar**
- **Velachery**
- **Guindy**
- **ECR**
- **Palavakkam**
- Any nearby locality within commuting distance

### Looking for
- Spacious **1 RK** or **1 BHK**
- **Fully furnished** or **semi-furnished**
- Well-maintained apartment or **gated community**
- **Safe and secure** environment
- **Immediate** or upcoming availability
- Friendly, non-intrusive owner

### Budget
- **Rent:** ₹10,000–₹15,000 per month
- **Deposit:** Up to ₹25,000–₹30,000

### Move-in
**2 August 2026** — urgent requirement. Also open from **9 July 2026** onwards if available earlier.

### Contact
Call **[${PHONE_DISPLAY}](${PHONE_TEL})** or DM the advertiser. If you have owner contacts, broker references, or know someone renting out a suitable place, please reach out. Mention that you saw the listing on MyChennaiCity.

Confirm rent, deposit, move-in date, and lease terms directly before you pay or visit.`.trim();

  const values = {
    cityId: city.id,
    slug: SLUG,
    title:
      "Urgent 1 RK / 1 BHK wanted — working woman, Thiruvanmiyur belt (₹10k–₹15k)",
    body,
    category: "wanted",
    posterName: null,
    posterUrl: null,
    locationLabel:
      "Thiruvanmiyur, Perungudi, Adyar, Velachery, Guindy, ECR & nearby, Chennai",
    contactPhone: PHONE,
    areaHubSlug: "adyar-thiruvanmiyur",
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
    "[seed-classified] Wanted hub:",
    "/chennai-classifieds?category=wanted",
  );
  console.log("[seed-classified] All classifieds:", "/chennai-classifieds");

  await finishListingSeedLive({
    classifiedSlug: SLUG,
    label: "seed-urgent-1bhk-rental-wanted-working-woman-thiruvanmiyur",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
