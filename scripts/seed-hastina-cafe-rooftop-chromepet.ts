/**
 * Directory listing: Hastina Café rooftop — Hastinapuram / Chromepet.
 *
 * Dev:  `npm run db:seed:hastina-cafe-rooftop-chromepet`
 * Live: `npm run db:seed:hastina-cafe-rooftop-chromepet:live` — uses `.env.production.local` only
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { cities, directoryEntries } from "../src/db/schema/tables";
import { serializeDirectoryEntryMetadata } from "../src/lib/directory/metadata";
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

const TYPE = "restaurant" as const;
const SLUG = "hastina-cafe-rooftop-hastinapuram-chromepet";

const PHONE = "9025279408";
const PHONE_DISPLAY = "90252 79408";
const PHONE_TEL = "tel:+919025279408";

const MAPS_URL = "https://share.google/BwKb9oofnQTGfZR8b";
const IG_REEL =
  "https://www.instagram.com/reel/Db8Ni9Jy3AA/?igsh=bmExamYzZ2Z4M3pp";
const IG_HANDLE = "https://www.instagram.com/hastina.cafe__roof_top/";

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

  const reportBody = `## Hastina Café rooftop — Hastinapuram / Chromepet

**Cozy rooftop café** near **Hastinapuram, Chromepet** — about **100 m from the bus stand**. Intimate seating, a curated menu, and a quieter alternative to crowded restaurants.

### Hosting & celebrations
Pre-book only — **limited tables**.

- Birthday celebrations
- Private movie screening
- Team get-together
- Family get-together
- **Candle-light dinner** from **7:00 PM** onwards
- **Midnight (12:00 AM) birthday surprise** celebrations

### Find us
- **Area:** Hastinapuram, Chromepet, Chennai
- **Maps:** [Open location](${MAPS_URL})
- **Instagram:** [@hastina.cafe__roof_top](${IG_HANDLE})
- **Reel:** [Watch the café video](${IG_REEL})

### Contact
Call or WhatsApp **[${PHONE_DISPLAY}](${PHONE_TEL})** to pre-book. Mention that you saw the listing on MyChennaiCity.`.trim();

  const analysisBody = `## Listing note

This page is a **local business listing** published for visibility only. **mychennaicity.in does not verify** menu prices, hygiene certificates, or booking terms. Confirm timings, package rates, and table availability directly with the café before you visit or pay a deposit.

If this listing is outdated or was posted without authorisation, use the site **Contact** page so we can review it.`.trim();

  const metadata = serializeDirectoryEntryMetadata({
    summary:
      "Rooftop café in Hastinapuram / Chromepet (near bus stand). Birthdays, private movie nights, team/family get-togethers, candle-light dinner from 7 PM. Pre-book — call 9025279408.",
    dek: "Local business listing · pre-book tables; verify packages and timings with the café.",
    reportBody,
    analysisBody,
    areaHubSlug: "tambaram-pallavaram-medavakkam",
  });

  const values = {
    cityId: city.id,
    type: TYPE,
    slug: SLUG,
    name: "Hastina Café rooftop",
    address: "Hastinapuram, Chromepet, Chennai (≈100 m from bus stand)",
    localityLabel: "Hastinapuram / Chromepet",
    phone: PHONE,
    websiteUrl: MAPS_URL,
    verified: false,
    metadata,
    updatedAt: now,
  };

  const [existing] = await db
    .select({ id: directoryEntries.id })
    .from(directoryEntries)
    .where(
      and(
        eq(directoryEntries.cityId, city.id),
        eq(directoryEntries.type, TYPE),
        eq(directoryEntries.slug, SLUG),
      ),
    )
    .limit(1);

  if (existing) {
    await db
      .update(directoryEntries)
      .set(values)
      .where(eq(directoryEntries.id, existing.id));
    console.log("[seed-directory] Refreshed listing:", `${TYPE}/${SLUG}`);
  } else {
    await db.insert(directoryEntries).values({
      ...values,
      createdAt: now,
    });
    console.log("[seed-directory] Inserted listing:", `${TYPE}/${SLUG}`);
  }

  console.log("[seed-directory] Public URL:", `/directory/${TYPE}/${SLUG}`);

  await finishListingSeedLive({
    directoryType: TYPE,
    directorySlug: SLUG,
    label: "seed-hastina-cafe-rooftop-chromepet",
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
