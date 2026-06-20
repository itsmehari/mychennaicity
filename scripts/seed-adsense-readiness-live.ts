/**
 * Batch seed live Neon for AdSense content-volume targets (articles, jobs, events).
 * Requires `.env.production.local` with DATABASE_URL (vercel env pull).
 *
 * Usage: npm run db:seed:adsense-readiness:live
 */
import { spawnSync } from "node:child_process";

const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

const STEPS: { label: string; script: string }[] = [
  { label: "Articles + Chennai city", script: "db:seed:live" },
  { label: "Chennai jobs bundle", script: "db:seed:chennai-jobs:live" },
  { label: "Discovery events 2026", script: "db:seed:chennai-discovery-events:live" },
  { label: "Mylapore Panguni festival", script: "db:seed:event:mylapore-panguni:live" },
  { label: "Lions Champions of Change", script: "db:seed:event:lions-champions-of-change:live" },
  { label: "Tote bag paint & play", script: "db:seed:event:tote-bag-paint-play-porur:live" },
  { label: "Reader listings (rent + food)", script: "db:seed:saidapet-house-rent:live" },
  { label: "Directory listing (homemade food)", script: "db:seed:pallikaranai-ms-homemade-food:live" },
];

function run(script: string): boolean {
  console.log(`\n>>> npm run ${script}`);
  const r = spawnSync(npmCmd, ["run", script], {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, SEED_LIVE: "1" },
  });
  return r.status === 0;
}

async function main() {
  console.log("AdSense readiness — live DB seed batch");
  let failed = 0;
  for (const step of STEPS) {
    console.log(`\n--- ${step.label} ---`);
    if (!run(step.script)) {
      console.error(`Failed: ${step.script}`);
      failed += 1;
    }
  }
  console.log("\n--- Post-seed article count ---");
  spawnSync(npmCmd, ["run", "db:check:live"], { stdio: "inherit" });
  if (failed > 0) process.exit(1);
  console.log("\nBatch complete. Redeploy or revalidate if hubs look stale.");
}

main();

export {};
