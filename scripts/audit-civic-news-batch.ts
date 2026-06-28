/**
 * Post-seed audit for the 20-article civic news batch.
 * Run: npx tsx scripts/audit-civic-news-batch.ts [--live]
 */
import { config as loadEnv } from "dotenv";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";
import { CHENNAI_CIVIC_NEWS_BATCH_2026 } from "./content/chennai-civic-news-batch-2026";

const live = process.argv.includes("--live");
if (live) {
  loadEnv({ path: ".env.production.local" });
} else {
  loadEnv({ path: "secrets/database.local.env" });
  loadEnv({ path: ".env.local" });
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL missing");
  process.exit(1);
}

const sql = neon(url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const VALID_CATEGORIES = new Set([
  "Politics",
  "Chennai",
  "Elections",
  "Economy",
  "Consumer",
  "Mobility",
]);
const BAD_LINK = /civic-infrastructure|urban-development/;

async function main() {
  const slugs = CHENNAI_CIVIC_NEWS_BATCH_2026.map((a) => a.slug);
  const rows = await sql`
    SELECT slug, status, summary, dek, report_body, analysis_body,
           hero_image_url, published_at, category, featured, source_url
    FROM articles
    WHERE slug = ANY(${slugs})
  `;

  const issues: string[] = [];
  const found = new Set(rows.map((r) => r.slug));

  for (const slug of slugs) {
    if (!found.has(slug)) issues.push(`MISSING DB row: ${slug}`);
  }

  let featuredInBatch = 0;
  for (const r of rows) {
    if (r.status !== "published") issues.push(`${r.slug}: status=${r.status}`);
    if (!r.summary?.trim()) issues.push(`${r.slug}: empty summary`);
    if (!r.report_body?.trim()) issues.push(`${r.slug}: empty report_body`);
    if (!r.analysis_body?.trim()) issues.push(`${r.slug}: empty analysis_body`);
    if (!r.published_at) issues.push(`${r.slug}: missing published_at`);
    if (!r.source_url?.trim()) issues.push(`${r.slug}: missing source_url`);
    if (!VALID_CATEGORIES.has(r.category ?? ""))
      issues.push(`${r.slug}: invalid category ${r.category}`);
    if (r.featured) featuredInBatch += 1;

    const heroPath = r.hero_image_url?.replace(/^\//, "") ?? "";
    const localHero = join(ROOT, "public", heroPath);
    if (!heroPath || !existsSync(localHero)) {
      issues.push(`${r.slug}: hero file missing locally (${heroPath})`);
    }

    const content = readFileSync(
      join(ROOT, "scripts/content/chennai-civic-news-batch-2026.ts"),
      "utf8",
    );
    if (BAD_LINK.test(content)) {
      issues.push("content module contains broken topic links");
      break;
    }
  }

  if (featuredInBatch !== 3) {
    issues.push(`featured count in batch=${featuredInBatch}, expected 3`);
  }

  const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mychennaicity.in").replace(
    /\/$/,
    "",
  );

  for (const slug of slugs.slice(0, 5)) {
    if (!live) continue;
    try {
      const res = await fetch(`${site}/chennai-local-news/${slug}`, {
        redirect: "follow",
      });
      if (res.status !== 200) {
        issues.push(`LIVE HTTP ${res.status}: /chennai-local-news/${slug}`);
      }
    } catch (e) {
      issues.push(`LIVE fetch failed ${slug}: ${e}`);
    }
  }

  if (live) {
    try {
      const sm = await fetch(`${site}/sitemap.xml`);
      if (sm.status !== 200) {
        issues.push(`LIVE sitemap.xml HTTP ${sm.status}`);
      } else {
        const text = await sm.text();
        const missingInSitemap = slugs.filter(
          (s) => !text.includes(`/chennai-local-news/${s}`),
        );
        if (missingInSitemap.length) {
          issues.push(
            `sitemap missing ${missingInSitemap.length} batch URLs (deploy may be pending)`,
          );
        }
      }
      const newsSm = await fetch(`${site}/news-sitemap.xml`);
      if (newsSm.status !== 200) {
        issues.push(`LIVE news-sitemap.xml HTTP ${newsSm.status}`);
      } else {
        const text = await newsSm.text();
        const recent = slugs.filter((s) =>
          text.includes(`/chennai-local-news/${s}`),
        );
        console.log(`News sitemap includes ${recent.length}/20 batch URLs (last 50 cap)`);
      }
    } catch (e) {
      issues.push(`sitemap check failed: ${e}`);
    }
  }

  console.log(`\nAudit (${live ? "production" : "dev"}) — ${rows.length}/20 DB rows`);
  if (issues.length === 0) {
    console.log("PASS — no issues found.");
    process.exit(0);
  }
  console.log(`FAIL — ${issues.length} issue(s):`);
  for (const i of issues) console.log(" -", i);
  process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
