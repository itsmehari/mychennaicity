/**
 * Crawl key production URLs from sitemap + static list; report non-200 responses.
 * Usage: npm run links:verify:live
 */
const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mychennaicity.in").replace(
  /\/$/,
  "",
);

const STATIC_PATHS = [
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/chennai-local-news",
  "/chennai-jobs",
  "/chennai-local-events",
  "/directory",
  "/ads.txt",
  "/robots.txt",
];

function extractLocUrls(xml: string): string[] {
  const urls: string[] = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    urls.push(m[1].trim());
  }
  return urls;
}

async function checkUrl(url: string): Promise<{ url: string; status: number }> {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "mychennaicity-link-crawl/1.0" },
  });
  return { url, status: res.status };
}

async function main() {
  const sitemapRes = await fetch(`${SITE}/sitemap.xml`);
  if (!sitemapRes.ok) {
    console.error(`Could not fetch sitemap: HTTP ${sitemapRes.status}`);
    process.exit(1);
  }
  const sitemapXml = await sitemapRes.text();
  const sitemapUrls = extractLocUrls(sitemapXml);
  const staticUrls = STATIC_PATHS.map((p) => `${SITE}${p}`);
  const all = [...new Set([...staticUrls, ...sitemapUrls])].slice(0, 120);

  console.log(`Link crawl — ${all.length} URLs (cap 120)\n`);
  const bad: { url: string; status: number }[] = [];
  for (const url of all) {
    const result = await checkUrl(url);
    if (result.status >= 400) bad.push(result);
    process.stdout.write(result.status < 400 ? "." : "F");
  }
  console.log("\n");
  if (bad.length === 0) {
    console.log("No broken URLs in sample.");
    return;
  }
  console.error(`${bad.length} URL(s) returned 4xx/5xx:`);
  for (const b of bad) console.error(`  ${b.status}  ${b.url}`);
  process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

export {};
