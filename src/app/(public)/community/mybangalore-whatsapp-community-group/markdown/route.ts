import { buildMybangaloreCommunityMarkdown } from "@/content/community/mybangalore-whatsapp";
import { getSiteUrl } from "@/lib/env";

/** Plain-text twin of the Bengaluru community discovery page. HTML stays canonical. */
export function GET() {
  return new Response(buildMybangaloreCommunityMarkdown(getSiteUrl()), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      "X-Robots-Tag": "all",
      Vary: "Accept",
    },
  });
}
