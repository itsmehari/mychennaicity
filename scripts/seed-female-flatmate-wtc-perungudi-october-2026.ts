/**
 * Classified: female flatmate required, 2BHK, 4-minute walk from WTC, Perungudi.
 *
 * Poster: Kriti Singh. Her mobile is gated. The public page must not print it.
 * The form stores the enquirer's name and mobile, then returns her number.
 *
 * Dev:  `npm run db:seed:female-flatmate-wtc-perungudi`
 * Live: `npm run db:seed:female-flatmate-wtc-perungudi:live`
 *
 * Video: `public/videos/classifieds/female-flatmate-wtc-perungudi-october-2026.mp4`
 * Stills: `public/images/classifieds/female-flatmate-wtc-perungudi-october-2026-*.jpg`
 */
import { readFileSync } from "node:fs";
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

const sql = neon(url);
const db = drizzle(sql, { schema });

async function ensureRevealSchema() {
  const file = readFileSync("drizzle/0015_classified_reveal_name_video.sql", "utf8");
  for (const part of file.split("--> statement-breakpoint")) {
    const q = part.trim();
    if (q) await sql.query(q);
  }
}

const SLUG = "female-flatmate-required-wtc-perungudi-october-2026";
/** Gated. Do not copy this into the ad body, JSON-LD, or the public HTML. */
const CONTACT_PHONE = "8899210247";

const IMAGE_URLS = [
  "/images/classifieds/female-flatmate-wtc-perungudi-october-2026-corridor.jpg",
  "/images/classifieds/female-flatmate-wtc-perungudi-october-2026-washbasin.jpg",
  "/images/classifieds/female-flatmate-wtc-perungudi-october-2026-bathroom.jpg",
  "/images/classifieds/female-flatmate-wtc-perungudi-october-2026-kitchen.jpg",
];

const VIDEO_URL =
  "/videos/classifieds/female-flatmate-wtc-perungudi-october-2026.mp4";

const BODY = `## Female flatmate required near World Trade Center, Perungudi

A **2BHK** in a gated, standalone building near **World Trade Center (WTC), Perungudi**, is looking for a **female working professional**.

### The flat

- **2BHK** in a gated, standalone building
- **One private room** per person
- **Attached washroom** for each room
- About a **4-minute walk** from WTC
- **Immediate move-in**

The note does not name the building or the street.

### Cost per person

- **Monthly rent:** ₹12,500
- **Deposit:** ₹50,000
- **Shared amenities and setup:** about ₹2,000–₹3,000 a month
- **Estimated monthly cost:** ₹15,000–₹16,000 per person

### Move-in

**31 October or 1 November 2026**, and not later than **1 November 2026**.

### Who can enquire

A neat, clean, and responsible **female working professional** who can move in immediately.

### Contact

**Kriti Singh.** Her mobile stays off this page until you enter your name and mobile on the form. Both are stored for this ad. Mention that you saw the listing on MyChennaiCity.

A walkthrough video and stills from that video are on this page.

Agree the rent, deposit, and house rules before you pay or move in.`.trim();

async function main() {
  await ensureRevealSchema();

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
  const expiresAt = new Date("2026-11-30T23:59:00+05:30");

  const values = {
    cityId: city.id,
    slug: SLUG,
    title: "Female flatmate required, 4-minute walk from WTC, Perungudi",
    body: BODY,
    category: "flatmates-roommates",
    posterName: "Kriti Singh",
    posterUrl: null,
    locationLabel: "Perungudi, near World Trade Center",
    contactPhone: CONTACT_PHONE,
    contactPhoneGated: true,
    areaHubSlug: "omr-perungudi-sholinganallur",
    featured: false,
    imageUrls: IMAGE_URLS,
    videoUrl: VIDEO_URL,
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
    await db.update(classifiedListings).set(values).where(eq(classifiedListings.id, existing.id));
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
    label: "seed-female-flatmate-wtc-perungudi",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
