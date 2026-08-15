import {
  listRecentSitemapUrls,
  recentSitemapXml,
  RECENT_SITEMAP_WINDOW_DAYS,
} from "@/lib/seo/sitemap-recent";

export const dynamic = "force-dynamic";

/**
 * Rolling last-20-days sitemap for Google Search Console recrawl.
 * Submit: https://mychennaicity.in/sitemap-recent.xml
 */
export async function GET() {
  let urls: Awaited<ReturnType<typeof listRecentSitemapUrls>> = [];
  try {
    urls = await listRecentSitemapUrls();
  } catch (err) {
    console.warn("[sitemap-recent] failed to build URL list", err);
    urls = [];
  }

  const body = recentSitemapXml(urls);
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
      "X-Sitemap-Window-Days": String(RECENT_SITEMAP_WINDOW_DAYS),
      "X-Sitemap-Url-Count": String(urls.length),
    },
  });
}
