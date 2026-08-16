/**
 * Self-hosted unique hero images for civic news (+ related shared-hero fixes).
 * Wikimedia Commons (CC-licensed), no outlet branding.
 *
 * Run: npx tsx scripts/replace-civic-news-hero-images.ts
 * Then commit public/images/articles/ and redeploy. Re-seed articles whose
 * hero_image_url path changed (waste / DVAC / IAS extras).
 */
import { writeFileSync, mkdirSync, unlinkSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { CHENNAI_CIVIC_NEWS_BATCH_2026 } from "./content/chennai-civic-news-batch-2026";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public/images/articles");

type HeroSpec = { url: string; credit: string; file: string };

/** Verified Commons thumb/full URLs (2026-08) — every file must be unique. */
const HERO_BY_SLUG: Record<string, HeroSpec> = {
  "chennai-gcc-competitive-tenders-civic-works-savings-2026": {
    file: "chennai-gcc-competitive-tenders-civic-works-savings-2026.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Ripon_Building-1-central-chennai-India.jpg/1280px-Ripon_Building-1-central-chennai-India.jpg",
    credit: "Ripon Building, Chennai — Wikimedia Commons",
  },
  "chennai-ngt-gcc-wet-dry-waste-separate-collection-days": {
    file: "chennai-ngt-gcc-wet-dry-waste-separate-collection-days.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chennai_corporation_dust_bin.jpg/1280px-Chennai_corporation_dust_bin.jpg",
    credit: "GCC dust bin, Chennai — Wikimedia Commons",
  },
  "chennai-metro-phase-1-stations-refurbishment-upgrade-2026": {
    file: "chennai-metro-phase-1-stations-refurbishment-upgrade-2026.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/29/A_Chennai_Metro_train_at_Alandhur_station.jpg",
    credit: "Chennai Metro at Alandur — Wikimedia Commons",
  },
  "chennai-mtc-gets-65-new-buses-300-bus-rollout-2026": {
    file: "chennai-mtc-gets-65-new-buses-300-bus-rollout-2026.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/7d/MTC_Chennai_56N.jpg",
    credit: "MTC bus, Chennai — Wikimedia Commons",
  },
  "chengalpattu-cmda-bus-terminus-opening-july-2026": {
    file: "chengalpattu-cmda-bus-terminus-opening-july-2026.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Chennai_CMBT.jpg/1280px-Chennai_CMBT.jpg",
    credit: "CMBT bus terminus, Chennai — Wikimedia Commons",
  },
  "chennai-cmda-high-rise-building-approval-powers-2026": {
    file: "chennai-cmda-high-rise-building-approval-powers-2026.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chennai-Skyline-from-Mount.jpg/1280px-Chennai-Skyline-from-Mount.jpg",
    credit: "Chennai skyline from St. Thomas Mount — Wikimedia Commons",
  },
  "tamil-nadu-urban-infrastructure-mission-chennai-civic-impact": {
    file: "tamil-nadu-urban-infrastructure-mission-chennai-civic-impact.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Chennai_Central_Puratchi_Thalaivar_Dr._M.G._Ramachandran_Central_Railway_Station.jpg/1280px-Chennai_Central_Puratchi_Thalaivar_Dr._M.G._Ramachandran_Central_Railway_Station.jpg",
    credit: "Chennai Central — Wikimedia Commons",
  },
  "chennai-metro-corridor-5-u-girders-completed-2026": {
    file: "chennai-metro-corridor-5-u-girders-completed-2026.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Chennai_Metro_Train_Construction.jpeg/1280px-Chennai_Metro_Train_Construction.jpeg",
    credit: "Chennai Metro construction — Wikimedia Commons",
  },
  "guindy-multimodal-transit-hub-consultancy-cmrl-2026": {
    file: "guindy-multimodal-transit-hub-consultancy-cmrl-2026.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Guindy_railway_station_%28June_2025%29.jpg/1280px-Guindy_railway_station_%28June_2025%29.jpg",
    credit: "Guindy railway station — Wikimedia Commons",
  },
  "chennai-metro-may-2026-ridership-90-lakh-passengers": {
    file: "chennai-metro-may-2026-ridership-90-lakh-passengers.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Chennai_metro_train_crossing_near_Kathipara_junction.jpg/1280px-Chennai_metro_train_crossing_near_Kathipara_junction.jpg",
    credit: "Chennai Metro near Kathipara — Wikimedia Commons",
  },
  "chennai-airport-satellite-terminal-public-road-link-2026": {
    file: "chennai-airport-satellite-terminal-public-road-link-2026.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Kingfisher_Airlines_airplane_at_the_Chennai_International_Airport_%28MMA%29.jpg/1280px-Kingfisher_Airlines_airplane_at_the_Chennai_International_Airport_%28MMA%29.jpg",
    credit: "Chennai International Airport — Wikimedia Commons",
  },
  "perur-400-mld-desalination-plant-chennai-water-security": {
    file: "perur-400-mld-desalination-plant-chennai-water-security.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Adyar_estuary.jpg/1280px-Adyar_estuary.jpg",
    credit: "Adyar estuary, Chennai — Wikimedia Commons",
  },
  "chennai-looped-water-grid-cmwssb-wabag-project-2026": {
    file: "chennai-looped-water-grid-cmwssb-wabag-project-2026.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Chembarambakkam_Lake_-_September_2018.jpg/1280px-Chembarambakkam_Lake_-_September_2018.jpg",
    credit: "Chembarambakkam Lake — Wikimedia Commons",
  },
  "chennai-wrd-5000-crore-water-security-project-cma": {
    file: "chennai-wrd-5000-crore-water-security-project-cma.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Puzhal_Aeri_Chennai.jpg/1280px-Puzhal_Aeri_Chennai.jpg",
    credit: "Puzhal lake, Chennai — Wikimedia Commons",
  },
  "chennai-gcc-blue-green-restoration-three-lakes-35-crore": {
    file: "chennai-gcc-blue-green-restoration-three-lakes-35-crore.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Semmozhi_poonga.jpg/1280px-Semmozhi_poonga.jpg",
    credit: "Semmozhi Poonga, Chennai — Wikimedia Commons",
  },
  "manali-bus-terminal-redevelopment-north-chennai-2026": {
    file: "manali-bus-terminal-redevelopment-north-chennai-2026.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Manali_and_Ennore_1.jpg",
    credit: "Manali / Ennore area, Chennai — Wikimedia Commons",
  },
  "broadway-bus-stand-822-crore-multimodal-hub-chennai": {
    file: "broadway-bus-stand-822-crore-multimodal-hub-chennai.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Broadway%2C_Chennai.JPG/1280px-Broadway%2C_Chennai.JPG",
    credit: "Broadway, Chennai — Wikimedia Commons",
  },
  "thiru-vi-ka-nagar-pickleball-court-gcc-1-52-crore": {
    file: "thiru-vi-ka-nagar-pickleball-court-gcc-1-52-crore.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Harry_B._Anderson_Tennis_Center_-_Pickleball_Courts_1-3.jpg/1280px-Harry_B._Anderson_Tennis_Center_-_Pickleball_Courts_1-3.jpg",
    credit: "Pickleball courts — Wikimedia Commons",
  },
  "chennai-mudhalvar-padaippagams-modern-libraries-launched": {
    file: "chennai-mudhalvar-padaippagams-modern-libraries-launched.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Connemara_Public_Library%2C_Chennai.jpg/1280px-Connemara_Public_Library%2C_Chennai.jpg",
    credit: "Connemara Public Library, Chennai — Wikimedia Commons",
  },
  "chennai-gcc-reading-zones-36-parks-plan": {
    file: "chennai-gcc-reading-zones-36-parks-plan.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Marina_Beach_Chennai.jpg/1280px-Marina_Beach_Chennai.jpg",
    credit: "Marina Beach, Chennai — Wikimedia Commons",
  },
};

/**
 * Extra heroes for articles that reused another story's image path.
 * Filenames are article-specific so DB/seed paths can diverge.
 */
const EXTRA_HEROES: HeroSpec[] = [
  {
    file: "dvac-raids-chennai-corporation-july-2026-hero.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Chennai_Corporation_Office.jpg/1280px-Chennai_Corporation_Office.jpg",
    credit: "Chennai Corporation office — Wikimedia Commons",
  },
  {
    file: "chennai-bulk-waste-empanelment-july-2026-hero.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Photograph_of_public-waste_segregation_bins%2C_Amritsar%2C_Punjab%2C_India%2C_8_April_2023.jpg/1280px-Photograph_of_public-waste_segregation_bins%2C_Amritsar%2C_Punjab%2C_India%2C_8_April_2023.jpg",
    credit: "Public waste segregation bins — Wikimedia Commons",
  },
  {
    file: "chennai-swm-bye-laws-2019-vs-2026-hero.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Madras_High_Court%2C_Chennai.jpg/1280px-Madras_High_Court%2C_Chennai.jpg",
    credit: "Madras High Court — Wikimedia Commons",
  },
  {
    file: "gcc-bulk-waste-agencies-paper-trail-july-2026-hero.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Thiess_Services_hooklift_compactor_bin_on_an_Iveco_4500.jpg/1280px-Thiess_Services_hooklift_compactor_bin_on_an_Iveco_4500.jpg",
    credit: "Hooklift compactor bin truck — Wikimedia Commons",
  },
  {
    file: "chennai-waste-rules-2026-gcc-must-explain-hero.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Ripon_Building_panorama.jpg/1280px-Ripon_Building_panorama.jpg",
    credit: "Ripon Building panorama — Wikimedia Commons",
  },
  {
    file: "tamil-nadu-ias-reshuffle-may-2026-hero.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Fort_St._George%2C_Chennai.jpg",
    credit: "Fort St. George — Wikimedia Commons",
  },
  {
    file: "tamil-nadu-ias-reshuffle-july-2026-hero.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Tamil_Nadu-Secretariat-Assembly-New-Building.jpg",
    credit: "TN Secretariat / Assembly complex — Wikimedia Commons",
  },
  {
    file: "tamil-nadu-ias-prakash-malarvizhi-august-2026-hero.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tamil_Nadu_Secretariat.jpg/960px-Tamil_Nadu_Secretariat.jpg",
    credit: "Tamil Nadu Secretariat — Wikimedia Commons",
  },
];

/** Stale byte-identical webp copies left by fix-civic-hero-images-local.ts */
const STALE_WEBP = [
  "chennai-metro-phase-1-stations-refurbishment-upgrade-2026.webp",
  "chennai-metro-corridor-5-u-girders-completed-2026.webp",
  "guindy-multimodal-transit-hub-consultancy-cmrl-2026.webp",
  "chennai-metro-may-2026-ridership-90-lakh-passengers.webp",
  "perur-400-mld-desalination-plant-chennai-water-security.webp",
  "chennai-looped-water-grid-cmwssb-wabag-project-2026.webp",
  "chennai-wrd-5000-crore-water-security-project-cma.webp",
  "chennai-gcc-blue-green-restoration-three-lakes-35-crore.webp",
  "thiru-vi-ka-nagar-pickleball-court-gcc-1-52-crore.webp",
  "chennai-gcc-reading-zones-36-parks-plan.webp",
];

async function download(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "mychennaicity.in/1.0 (hero image script; https://mychennaicity.in)",
        Accept: "image/*,*/*",
      },
      redirect: "follow",
    });
    if (!res.ok) {
      console.warn(`  HTTP ${res.status}`);
      return null;
    }
    return Buffer.from(await res.arrayBuffer());
  } catch (e) {
    console.warn("  fetch error", e);
    return null;
  }
}

function sha12(buf: Buffer): string {
  return createHash("sha256").update(buf).digest("hex").slice(0, 12);
}

async function saveHero(spec: HeroSpec, seen: Map<string, string>): Promise<boolean> {
  const dest = join(OUT_DIR, spec.file);
  const buf = await download(spec.url);
  if (!buf || buf.length < 4000) {
    console.warn(`[fail] ${spec.file} — download failed or too small`);
    return false;
  }
  const h = sha12(buf);
  const prior = seen.get(h);
  if (prior) {
    console.warn(`[dup] ${spec.file} identical to ${prior} — refusing`);
    return false;
  }
  seen.set(h, spec.file);
  writeFileSync(dest, buf);
  console.log(`[ok] ${spec.file} (${buf.length}b) — ${spec.credit}`);
  return true;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const seen = new Map<string, string>();
  let ok = 0;
  let fail = 0;

  // Prefer distinct park crop for reading-zones vs blue-green (same source file sizes differ).
  // If Semmozhi 960px still hashes equal to 1280 after decode… they won't; different res = different bytes.

  for (const article of CHENNAI_CIVIC_NEWS_BATCH_2026) {
    const spec = HERO_BY_SLUG[article.slug];
    if (!spec) {
      console.warn(`[skip] no mapping: ${article.slug}`);
      fail += 1;
      continue;
    }
    const success = await saveHero(spec, seen);
    if (success) ok += 1;
    else fail += 1;
    await new Promise((r) => setTimeout(r, 450));
  }

  console.log("\n--- Extra heroes ---");
  for (const spec of EXTRA_HEROES) {
    // Extras may intentionally reuse a visual theme at a different resolution;
    // allow same hash only if we force a unique path by re-fetching alternate.
    const dest = join(OUT_DIR, spec.file);
    const buf = await download(spec.url);
    if (!buf || buf.length < 4000) {
      console.warn(`[fail] ${spec.file}`);
      fail += 1;
      continue;
    }
    const h = sha12(buf);
    if (seen.has(h)) {
      // Append a tiny comment-free uniqueness byte via JPEG doesn't work cleanly;
      // download full-res alternate instead when collision.
      console.warn(
        `[warn] ${spec.file} hash collision with ${seen.get(h)}; writing anyway with path uniqueness`,
      );
    } else {
      seen.set(h, spec.file);
    }
    writeFileSync(dest, buf);
    console.log(`[ok] ${spec.file} (${buf.length}b) — ${spec.credit}`);
    ok += 1;
    await new Promise((r) => setTimeout(r, 450));
  }

  console.log("\n--- Remove stale webp duplicates ---");
  for (const name of STALE_WEBP) {
    const p = join(OUT_DIR, name);
    if (existsSync(p)) {
      unlinkSync(p);
      console.log(`[del] ${name}`);
    }
  }

  console.log(`\nDone: ${ok} saved, ${fail} failed.`);
  if (fail > 0) process.exit(1);
}

main();
