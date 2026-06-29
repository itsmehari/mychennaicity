/**
 * Self-hosted hero images for civic news batch — Wikimedia Commons (no outlet branding).
 * Run: npx tsx scripts/replace-civic-news-hero-images.ts
 * Then: npm run db:seed:chennai-civic-news-batch-2026:live (optional — paths unchanged)
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CHENNAI_CIVIC_NEWS_BATCH_2026 } from "./content/chennai-civic-news-batch-2026";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public/images/articles");

/** Wikimedia Commons — direct upload URLs, CC-licensed, no news outlet logos. */
const HERO_BY_SLUG: Record<string, { url: string; credit: string }> = {
  "chennai-gcc-competitive-tenders-civic-works-savings-2026": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Ripon_Building%2C_Chennai.jpg/1280px-Ripon_Building%2C_Chennai.jpg",
    credit: "Ripon Building (GCC headquarters) — Wikimedia Commons",
  },
  "chennai-ngt-gcc-wet-dry-waste-separate-collection-days": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Garbage_bins_in_Chennai.jpg/1280px-Garbage_bins_in_Chennai.jpg",
    credit: "Waste bins, Chennai — Wikimedia Commons",
  },
  "chennai-metro-phase-1-stations-refurbishment-upgrade-2026": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Chennai_Metro_train_at_Koyambedu.jpg/1280px-Chennai_Metro_train_at_Koyambedu.jpg",
    credit: "Chennai Metro train — Wikimedia Commons",
  },
  "chennai-mtc-gets-65-new-buses-300-bus-rollout-2026": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/MTC_Bus_Chennai.jpg/1280px-MTC_Bus_Chennai.jpg",
    credit: "MTC bus, Chennai — Wikimedia Commons",
  },
  "chengalpattu-cmda-bus-terminus-opening-july-2026": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/CMBT_Bus_Terminal_Chennai.jpg/1280px-CMBT_Bus_Terminal_Chennai.jpg",
    credit: "Chennai bus terminal — Wikimedia Commons",
  },
  "chennai-cmda-high-rise-building-approval-powers-2026": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chennai_skyline_from_Saint_Thomas_Mount%2C_Chennai%2C_Tamil_Nadu%2C_India.jpg/1280px-Chennai_skyline_from_Saint_Thomas_Mount%2C_Chennai%2C_Tamil_Nadu%2C_India.jpg",
    credit: "Chennai skyline — Wikimedia Commons",
  },
  "tamil-nadu-urban-infrastructure-mission-chennai-civic-impact": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Chennai_Central%2C_Egmore_and_Nungambakkam_skyline.jpg/1280px-Chennai_Central%2C_Egmore_and_Nungambakkam_skyline.jpg",
    credit: "Chennai central skyline — Wikimedia Commons",
  },
  "chennai-metro-corridor-5-u-girders-completed-2026": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Chennai_Metro_construction.jpg/1280px-Chennai_Metro_construction.jpg",
    credit: "Chennai Metro construction — Wikimedia Commons",
  },
  "guindy-multimodal-transit-hub-consultancy-cmrl-2026": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Guindy_railway_station%2C_Chennai.jpg/1280px-Guindy_railway_station%2C_Chennai.jpg",
    credit: "Guindy railway station — Wikimedia Commons",
  },
  "chennai-metro-may-2026-ridership-90-lakh-passengers": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Chennai_Metro_Aligned_platform.jpg/1280px-Chennai_Metro_Aligned_platform.jpg",
    credit: "Chennai Metro platform — Wikimedia Commons",
  },
  "chennai-airport-satellite-terminal-public-road-link-2026": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Chennai_International_Airport_%28Terminal%29.jpg/1280px-Chennai_International_Airport_%28Terminal%29.jpg",
    credit: "Chennai International Airport — Wikimedia Commons",
  },
  "perur-400-mld-desalination-plant-chennai-water-security": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Nemmeli_desalination_plant%2C_Chennai.jpg/1280px-Nemmeli_desalination_plant%2C_Chennai.jpg",
    credit: "Nemmeli desalination plant, Chennai — Wikimedia Commons",
  },
  "chennai-looped-water-grid-cmwssb-wabag-project-2026": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Chembarambakkam_Lake%2C_Chennai.jpg/1280px-Chembarambakkam_Lake%2C_Chennai.jpg",
    credit: "Chembarambakkam reservoir — Wikimedia Commons",
  },
  "chennai-wrd-5000-crore-water-security-project-cma": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Puzhal_lake%2C_Chennai.jpg/1280px-Puzhal_lake%2C_Chennai.jpg",
    credit: "Puzhal lake, Chennai — Wikimedia Commons",
  },
  "chennai-gcc-blue-green-restoration-three-lakes-35-crore": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chennai_Velachery_MRTS%2C_lake_view.jpg/1280px-Chennai_Velachery_MRTS%2C_lake_view.jpg",
    credit: "Chennai lake view — Wikimedia Commons",
  },
  "manali-bus-terminal-redevelopment-north-chennai-2026": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/MTC_Bus_Chennai.jpg/1280px-MTC_Bus_Chennai.jpg",
    credit: "MTC bus, Chennai — Wikimedia Commons",
  },
  "broadway-bus-stand-822-crore-multimodal-hub-chennai": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Broadway_bus_stand%2C_Chennai.jpg/1280px-Broadway_bus_stand%2C_Chennai.jpg",
    credit: "Broadway bus stand, Chennai — Wikimedia Commons",
  },
  "thiru-vi-ka-nagar-pickleball-court-gcc-1-52-crore": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Pickleball_court.jpg/1280px-Pickleball_court.jpg",
    credit: "Pickleball court — Wikimedia Commons",
  },
  "chennai-mudhalvar-padaippagams-modern-libraries-launched": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Connemara_Public_Library%2C_Chennai.jpg/1280px-Connemara_Public_Library%2C_Chennai.jpg",
    credit: "Connemara Public Library, Chennai — Wikimedia Commons",
  },
  "chennai-gcc-reading-zones-36-parks-plan": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Napier_Park%2C_Chennai.jpg/1280px-Napier_Park%2C_Chennai.jpg",
    credit: "Napier Park, Chennai — Wikimedia Commons",
  },
};

async function download(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "mychennaicity.in/1.0 (hero image script)" },
      redirect: "follow",
    });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const slugs = CHENNAI_CIVIC_NEWS_BATCH_2026.map((a) => a.slug);
  let ok = 0;
  let fail = 0;

  for (const slug of slugs) {
    const meta = HERO_BY_SLUG[slug];
    const dest = join(OUT_DIR, `${slug}.jpg`);
    if (!meta) {
      console.warn(`[skip] no mapping: ${slug}`);
      fail += 1;
      continue;
    }
    const buf = await download(meta.url);
    if (!buf || buf.length < 5000) {
      console.warn(`[fail] ${slug} — download failed or too small`);
      fail += 1;
      continue;
    }
    writeFileSync(dest, buf);
    console.log(`[ok] ${slug} — ${meta.credit}`);
    ok += 1;
  }

  console.log(`\nDone: ${ok} replaced, ${fail} failed. Commit public/images/articles/ and redeploy.`);
  if (fail > 0) process.exit(1);
}

main();
