/**
 * Chennai Corporation zones explainer — current 15 vs proposed 20 vs historical 23.
 *
 * Dev:  `npm run db:seed:chennai-corporation-zones-15-vs-20`
 * Live: `npm run db:seed:chennai-corporation-zones-15-vs-20:live`
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import {
  CHENNAI_ZONES_HERO_IMAGE,
  CHENNAI_ZONES_META_DESCRIPTION,
  CHENNAI_ZONES_SEO_TITLE,
  CHENNAI_ZONES_SLUG,
  CHENNAI_ZONES_VERIFIED_ON,
  current15Zones,
  zonesFaq,
} from "../src/content/special-articles/chennai-corporation-zones-15-vs-20";
import { revalidateNewsAfterSeed } from "./lib/revalidate-news-after-seed";

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

const ARTICLE_URL = `https://mychennaicity.in/chennai-local-news/${CHENNAI_ZONES_SLUG}`;

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

  const publishedAt = new Date("2026-07-14T06:30:00.000Z");
  const now = new Date();

  const zoneTableRows = current15Zones
    .map((z) => `| ${z.number} | ${z.name} | ${z.wards} |`)
    .join("\n");

  const reportBody = `## Key takeaways

- As of **${CHENNAI_ZONES_VERIFIED_ON}**, Greater Chennai Corporation public systems still operate through **15 zones and 200 wards**.
- The **20-zone** restructuring announced in 2025 is an approved future plan — not yet the operational map.
- The circulated **23-zone** graphic is a **2022 historical proposal**, different from both the current system and the 20-zone plan.
- Zone boundaries affect zonal offices, ward committees, complaint routing, sanitation and engineering jurisdictions — not just map colours.
- Residents should verify zone and ward through official GCC services until a gazette notification and updated portals go live.

## Summary

**Chennai, July 2026** — Two zone maps keep circulating online: a 2022 concept for **23** Corporation zones, and a 2025 state announcement for **20** zones. Neither is how GCC currently presents itself to the public.

Official ward-map selectors, councillor directories and zonal services continue to list Zones 1–15 — from Thiruvottiyur to Sholinganallur — with **200** wards. Mayor R. Priya has linked 20-zone implementation to the end of the present council tenure (around 2027). In May 2026, the Commissioner described the increase as a government policy decision still awaiting operationalisation.

## Fact box

| Item | Detail |
| --- | --- |
| Operational zones | 15 |
| Corporation wards | 200 |
| Approved future restructuring | 20 zones |
| Historical 2022 proposal | 23 zones |
| Verification date | ${CHENNAI_ZONES_VERIFIED_ON} |
| Civic complaint line | 1913 |
| Full interactive guide | [${CHENNAI_ZONES_SEO_TITLE}](${ARTICLE_URL}) |

## Current 15-zone ward list

| Zone | Name | Wards |
| ---: | --- | --- |
${zoneTableRows}

Note: Zone 14 (Perungudi) holds wards 168–169 and 183–191; Zone 13 (Adyar) holds 170–182. Do not infer zone only from ward order.

## What the three maps mean

1. **Current 15 zones** — live for offices, wards committees and complaints.
2. **Approved 20 zones (2025)** — planned redistribution of population, properties, roads and staff; not yet in public GCC systems.
3. **23-zone concept (2022)** — superseded Assembly-alignment idea; do not use for current addresses.

**Read the full interactive article:** [${CHENNAI_ZONES_SEO_TITLE}](${ARTICLE_URL})`.trim();

  const analysisBody = `## Why this matters

Changing a Corporation zone is not cosmetic. Each zone functions as a wards committee with a zonal office coordinating engineering, sanitation, public health, revenue and local council work. Implementation needs gazette notification, office locations, staff deployment, software updates and coordinated transition — often tied to the civic election cycle.

## Editorial note

This MyChennaiCity guide distinguishes the operational 15-zone system from the approved 20-zone plan and the historical 23-zone proposal. Figures for the proposed 20-zone map are drawn from contemporaneous reporting and should be treated as reported proposal data, not current GCC zone statistics. Always prefer the latest gazette notification and the official GCC portal when records conflict.`.trim();

  const body = `${reportBody}\n\n---\n\n${analysisBody}`;

  const [existing] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(and(eq(articles.cityId, city.id), eq(articles.slug, CHENNAI_ZONES_SLUG)))
    .limit(1);

  const values = {
    cityId: city.id,
    slug: CHENNAI_ZONES_SLUG,
    title: CHENNAI_ZONES_SEO_TITLE,
    summary: CHENNAI_ZONES_META_DESCRIPTION,
    dek: "Chennai still runs on 15 Corporation zones and 200 wards. The 20-zone plan is approved but not operational; the viral 23-zone map is a 2022 historical proposal.",
    body,
    reportBody,
    analysisBody,
    category: "Chennai",
    status: "published" as const,
    publishedAt,
    featured: true,
    heroImageUrl: CHENNAI_ZONES_HERO_IMAGE,
    sourceUrl: "https://chennaicorporation.gov.in/",
    sourceName:
      "Greater Chennai Corporation public systems; Tamil Nadu government and media reporting on 15/20/23-zone restructuring (verified July 2026)",
    authorByline: "MyChennaiCity Editorial",
    interactiveJson: {
      type: "faq",
      items: zonesFaq.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
    } as Record<string, unknown>,
    updatedAt: now,
  };

  if (existing) {
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    console.log("[seed-gcc-zones] Updated article:", CHENNAI_ZONES_SLUG);
  } else {
    await db.insert(articles).values({ ...values, createdAt: now });
    console.log("[seed-gcc-zones] Inserted article:", CHENNAI_ZONES_SLUG);
  }

  if (live) {
    await revalidateNewsAfterSeed({
      slug: CHENNAI_ZONES_SLUG,
      label: "seed-gcc-zones",
    });
  }

  console.log("[seed-gcc-zones] Public URL:", `/chennai-local-news/${CHENNAI_ZONES_SLUG}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
