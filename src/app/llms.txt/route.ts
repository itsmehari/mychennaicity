import { loadLlmsLiveCatalog } from "@/lib/seo/llms-live-catalog";
import { buildLlmsTxtMarkdown, type LlmsLiveCatalog } from "@/lib/seo/llms-txt";

export const dynamic = "force-dynamic";

const emptyCatalog = (): LlmsLiveCatalog => ({
  jobs: [],
  seekers: [],
  events: [],
});

/** Curated AI discovery index plus the live jobs and events catalog. */
export async function GET() {
  let catalog = emptyCatalog();
  try {
    catalog = await loadLlmsLiveCatalog();
  } catch {
    catalog = emptyCatalog();
  }

  return new Response(buildLlmsTxtMarkdown({ catalog }), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      "X-Robots-Tag": "all",
    },
  });
}
