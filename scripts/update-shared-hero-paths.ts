/**
 * Update published articles whose hero paths changed (waste / DVAC / IAS).
 * Civic batch paths are unchanged — only file bytes were replaced.
 *
 * Run: npx tsx scripts/update-shared-hero-paths.ts
 * Live: npx tsx scripts/update-shared-hero-paths.ts --live
 */
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles } from "../src/db/schema/tables";

const live =
  process.env.SEED_LIVE === "1" || process.argv.includes("--live");

if (live) loadEnv({ path: ".env.production.local" });
else {
  loadEnv({ path: "secrets/database.local.env" });
  loadEnv({ path: ".env.local" });
}

const UPDATES: { slug: string; heroImageUrl: string }[] = [
  {
    slug: "dvac-raids-chennai-corporation-officials-suspended-corruption-probe",
    heroImageUrl: "/images/articles/dvac-raids-chennai-corporation-july-2026-hero.jpg",
  },
  {
    slug: "chennai-bulk-waste-empanelment-two-vendors-four-zones-july-2026",
    heroImageUrl: "/images/articles/chennai-bulk-waste-empanelment-july-2026-hero.jpg",
  },
  {
    slug: "chennai-solid-waste-bye-laws-2019-swm-rules-2026-update",
    heroImageUrl: "/images/articles/chennai-swm-bye-laws-2019-vs-2026-hero.jpg",
  },
  {
    slug: "tamil-nadu-ias-reshuffle-collectors-may-2026",
    heroImageUrl: "/images/articles/tamil-nadu-ias-reshuffle-may-2026-hero.jpg",
  },
  {
    slug: "tamil-nadu-ias-reshuffle-july-2026",
    heroImageUrl: "/images/articles/tamil-nadu-ias-reshuffle-july-2026-hero.jpg",
  },
  {
    slug: "tamil-nadu-ias-prakash-malarvizhi-august-2026",
    heroImageUrl:
      "/images/articles/tamil-nadu-ias-prakash-malarvizhi-august-2026-hero.jpg",
  },
];

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL missing");
  const db = drizzle(neon(url), { schema });

  for (const u of UPDATES) {
    const result = await db
      .update(articles)
      .set({ heroImageUrl: u.heroImageUrl, updatedAt: new Date() })
      .where(eq(articles.slug, u.slug))
      .returning({ slug: articles.slug, heroImageUrl: articles.heroImageUrl });
    if (result.length === 0) {
      console.log(`[skip] not in DB: ${u.slug}`);
    } else {
      console.log(`[ok] ${u.slug} → ${u.heroImageUrl}`);
    }
  }
  console.log(live ? "Updated production DB." : "Updated local/dev DB.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
