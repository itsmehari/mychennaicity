import { listPublishedArticlesForChennai } from "@/domains/news";
import { getSiteUrl } from "@/lib/env";

export const dynamic = "force-dynamic";

const NEWS_NS = "http://www.google.com/schemas/sitemap-news/0.9";

/**
 * Google News XML sitemap (last ~50 published). Submit in Search Console if you
 * pursue Google News / Publisher surfaces; keep titles and dates accurate.
 */
export async function GET() {
  const base = getSiteUrl();
  let items: Awaited<ReturnType<typeof listPublishedArticlesForChennai>> = [];
  try {
    items = await listPublishedArticlesForChennai(50);
  } catch {
    items = [];
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="${NEWS_NS}">
${items
  .map((a) => {
    const loc = `${base}/chennai-local-news/${a.slug}`;
    const pub = a.publishedAt ?? a.createdAt;
    const pubDate = pub.toISOString().slice(0, 19) + "Z";
    const title = escapeXml(a.title);
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <news:news>
      <news:publication>
        <news:name>mychennaicity.in</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate",
    },
  });
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
