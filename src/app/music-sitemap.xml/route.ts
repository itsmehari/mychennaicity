import { musicSitemapEntries } from "@/content/music";
import {
  listSeasonSlots,
  seasonConcertPath,
} from "@/content/music/season-concerts";
import { getSiteUrl } from "@/lib/env";

export const dynamic = "force-dynamic";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(loc: string, lastModified: Date): string {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastModified.toISOString()}</lastmod>
  </url>`;
}

/** Music hubs plus every concert from the printed season sheets. */
export async function GET() {
  const base = getSiteUrl().replace(/\/$/, "");
  const now = new Date();
  const hubs = musicSitemapEntries().map((entry) => entry.path);
  const concerts = listSeasonSlots().map(({ slot }) => seasonConcertPath(slot.slug));
  const paths = [...new Set([...hubs, ...concerts])];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => urlEntry(`${base}${path}`, now)).join("\n")}
</urlset>`;
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate",
    },
  });
}
