/**
 * Fetch OG/twitter images from article source URLs and save under public/images/articles/.
 *
 * Run: npx tsx scripts/fetch-civic-news-hero-images.ts
 */
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CHENNAI_CIVIC_NEWS_BATCH_2026 } from "./content/chennai-civic-news-batch-2026";
import { defaultArticleHeroPath } from "../src/lib/article-hero-image";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public/images/articles");

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; mychennaicity.in/1.0; +https://mychennaicity.in)",
      Accept: "text/html,application/xhtml+xml",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function extractOgImage(html: string): string | null {
  const patterns = [
    /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["']/i,
    /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return m[1].replace(/&amp;/g, "&");
  }
  return null;
}

async function downloadImage(imageUrl: string, dest: string): Promise<boolean> {
  try {
    const res = await fetch(imageUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; mychennaicity.in/1.0; +https://mychennaicity.in)",
        Accept: "image/*,*/*",
        Referer: new URL(imageUrl).origin,
      },
      redirect: "follow",
    });
    if (!res.ok) return false;
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.startsWith("image/")) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(dest, buf);
    return true;
  } catch {
    return false;
  }
}

async function copyDefaultHero(dest: string): Promise<void> {
  const defaultPath = join(ROOT, "public", defaultArticleHeroPath().replace(/^\//, ""));
  copyFileSync(defaultPath, dest);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const results: { slug: string; ok: boolean; path: string; note: string }[] =
    [];

  for (const article of CHENNAI_CIVIC_NEWS_BATCH_2026) {
    const slug = article.slug;
    const dest = join(OUT_DIR, `${slug}.jpg`);

    if (existsSync(dest)) {
      results.push({ slug, ok: true, path: dest, note: "exists" });
      continue;
    }

    let ok = false;
    let note = "fallback";

    try {
      const html = await fetchText(article.sourceUrl);
      const og = extractOgImage(html);
      // Skip outlet-branded OG images (TOI, TNIE logos) — use site default instead
      if (og && !/indiatimes|timesofindia|toi|newindianexpress|dinamani/i.test(og)) {
        ok = await downloadImage(og, dest);
        if (ok) note = "og";
      }
    } catch (err) {
      note = `fetch failed: ${err instanceof Error ? err.message : err}`;
    }

    if (!ok) {
      await copyDefaultHero(dest);
      note = `site-default (${note})`;
    }

    results.push({ slug, ok: true, path: dest, note });
    console.log(`[${slug}] ${note}`);
  }

  const ogCount = results.filter((r) => r.note === "og").length;
  console.log(`\nDone: ${ogCount}/${results.length} OG images; rest use default hero.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
