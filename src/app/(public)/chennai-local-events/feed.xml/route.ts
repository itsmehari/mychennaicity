import { listPublicEventsForChennaiHub } from "@/domains/events";
import { getSiteUrl } from "@/lib/env";

export const dynamic = "force-dynamic";

/** RSS 2.0 — upcoming Chennai events. */
export async function GET() {
  const base = getSiteUrl();
  let items: Awaited<ReturnType<typeof listPublicEventsForChennaiHub>> = [];
  try {
    items = await listPublicEventsForChennaiHub(40);
  } catch {
    items = [];
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>mychennaicity.in — Chennai local events</title>
    <link>${base}/chennai-local-events</link>
    <description>Upcoming concerts, comedy, exhibitions and neighbourhood events in Chennai.</description>
    <language>en-in</language>
    ${items
      .map((e) => {
        const link = `${base}/chennai-local-events/${e.slug}`;
        const pub = e.startsAt.toUTCString();
        const desc = escapeXml(
          [e.venueName, e.localityLabel, e.startsAt.toISOString()]
            .filter(Boolean)
            .join(" · ") || e.title,
        );
        return `
    <item>
      <title>${escapeXml(e.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pub}</pubDate>
      <description>${desc}</description>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
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
