/**
 * Replace TOI/outlet-branded OG heroes with site-owned thematic images.
 * Run: npx tsx scripts/fix-civic-hero-images-local.ts
 * Then: npm run db:seed:chennai-civic-news-batch-2026:live
 */
import { config as loadEnv } from "dotenv";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { articles, cities } from "../src/db/schema/tables";
import { CHENNAI_CIVIC_NEWS_BATCH_2026 } from "./content/chennai-civic-news-batch-2026";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public/images/articles");

const ASSETS = {
  civic: join(ROOT, "public/images/explore-chennai-madras-high-court.jpg"),
  cabinet: join(ROOT, "public/images/articles/tamil-nadu-cabinet-portfolios-hero.jpg"),
  metro: join(ROOT, "public/images/articles/cmrl-shenoy-nagar-yoga-day-2026.webp"),
  marina: join(ROOT, "public/images/articles/marina-beach-sunrise-yoga-space-chennai.webp"),
  yogaDay: join(ROOT, "public/images/articles/international-yoga-day-2026-chennai-beach-yoga.webp"),
};

/** slug → local source file + public URL path (extension preserved) */
const PLAN: Record<string, { src: string; url: string }> = {
  "chennai-gcc-competitive-tenders-civic-works-savings-2026": {
    src: ASSETS.civic,
    url: "/images/articles/chennai-gcc-competitive-tenders-civic-works-savings-2026.jpg",
  },
  "chennai-ngt-gcc-wet-dry-waste-separate-collection-days": {
    src: ASSETS.civic,
    url: "/images/articles/chennai-ngt-gcc-wet-dry-waste-separate-collection-days.jpg",
  },
  "chennai-metro-phase-1-stations-refurbishment-upgrade-2026": {
    src: ASSETS.metro,
    url: "/images/articles/chennai-metro-phase-1-stations-refurbishment-upgrade-2026.webp",
  },
  "chennai-mtc-gets-65-new-buses-300-bus-rollout-2026": {
    src: ASSETS.civic,
    url: "/images/articles/chennai-mtc-gets-65-new-buses-300-bus-rollout-2026.jpg",
  },
  "chengalpattu-cmda-bus-terminus-opening-july-2026": {
    src: ASSETS.civic,
    url: "/images/articles/chengalpattu-cmda-bus-terminus-opening-july-2026.jpg",
  },
  "chennai-cmda-high-rise-building-approval-powers-2026": {
    src: ASSETS.civic,
    url: "/images/articles/chennai-cmda-high-rise-building-approval-powers-2026.jpg",
  },
  "tamil-nadu-urban-infrastructure-mission-chennai-civic-impact": {
    src: ASSETS.cabinet,
    url: "/images/articles/tamil-nadu-urban-infrastructure-mission-chennai-civic-impact.jpg",
  },
  "chennai-metro-corridor-5-u-girders-completed-2026": {
    src: ASSETS.metro,
    url: "/images/articles/chennai-metro-corridor-5-u-girders-completed-2026.webp",
  },
  "guindy-multimodal-transit-hub-consultancy-cmrl-2026": {
    src: ASSETS.metro,
    url: "/images/articles/guindy-multimodal-transit-hub-consultancy-cmrl-2026.webp",
  },
  "chennai-metro-may-2026-ridership-90-lakh-passengers": {
    src: ASSETS.metro,
    url: "/images/articles/chennai-metro-may-2026-ridership-90-lakh-passengers.webp",
  },
  "chennai-airport-satellite-terminal-public-road-link-2026": {
    src: ASSETS.civic,
    url: "/images/articles/chennai-airport-satellite-terminal-public-road-link-2026.jpg",
  },
  "perur-400-mld-desalination-plant-chennai-water-security": {
    src: ASSETS.marina,
    url: "/images/articles/perur-400-mld-desalination-plant-chennai-water-security.webp",
  },
  "chennai-looped-water-grid-cmwssb-wabag-project-2026": {
    src: ASSETS.marina,
    url: "/images/articles/chennai-looped-water-grid-cmwssb-wabag-project-2026.webp",
  },
  "chennai-wrd-5000-crore-water-security-project-cma": {
    src: ASSETS.marina,
    url: "/images/articles/chennai-wrd-5000-crore-water-security-project-cma.webp",
  },
  "chennai-gcc-blue-green-restoration-three-lakes-35-crore": {
    src: ASSETS.marina,
    url: "/images/articles/chennai-gcc-blue-green-restoration-three-lakes-35-crore.webp",
  },
  "manali-bus-terminal-redevelopment-north-chennai-2026": {
    src: ASSETS.civic,
    url: "/images/articles/manali-bus-terminal-redevelopment-north-chennai-2026.jpg",
  },
  "broadway-bus-stand-822-crore-multimodal-hub-chennai": {
    src: ASSETS.civic,
    url: "/images/articles/broadway-bus-stand-822-crore-multimodal-hub-chennai.jpg",
  },
  "thiru-vi-ka-nagar-pickleball-court-gcc-1-52-crore": {
    src: ASSETS.yogaDay,
    url: "/images/articles/thiru-vi-ka-nagar-pickleball-court-gcc-1-52-crore.webp",
  },
  "chennai-mudhalvar-padaippagams-modern-libraries-launched": {
    src: ASSETS.civic,
    url: "/images/articles/chennai-mudhalvar-padaippagams-modern-libraries-launched.jpg",
  },
  "chennai-gcc-reading-zones-36-parks-plan": {
    src: ASSETS.marina,
    url: "/images/articles/chennai-gcc-reading-zones-36-parks-plan.webp",
  },
};

async function updateDb(live: boolean) {
  if (live) loadEnv({ path: ".env.production.local" });
  else {
    loadEnv({ path: "secrets/database.local.env" });
    loadEnv({ path: ".env.local" });
  }
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL missing");

  const db = drizzle(neon(url), { schema });
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);
  if (!city) throw new Error("chennai city missing");

  for (const [slug, plan] of Object.entries(PLAN)) {
    await db
      .update(articles)
      .set({ heroImageUrl: plan.url, updatedAt: new Date() })
      .where(and(eq(articles.cityId, city.id), eq(articles.slug, slug)));
    console.log("[db] hero_image_url →", plan.url);
  }
}

function copyFiles() {
  mkdirSync(OUT, { recursive: true });
  for (const [slug, plan] of Object.entries(PLAN)) {
    if (!existsSync(plan.src)) {
      throw new Error(`Missing source asset: ${plan.src} for ${slug}`);
    }
    const dest = join(ROOT, "public", plan.url.replace(/^\//, ""));
    copyFileSync(plan.src, dest);
    console.log("[copy]", slug, "←", plan.src.split("/").pop());
  }
}

async function main() {
  const live = process.argv.includes("--live");
  copyFiles();
  await updateDb(live);
  console.log("\nDone. Redeploy so new image files are on CDN.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
