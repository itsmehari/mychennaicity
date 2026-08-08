import { buildLlmsTxtMarkdown } from "@/lib/seo/llms-txt";

export const dynamic = "force-dynamic";

/** Curated AI discovery index — https://llmstxt.org */
export async function GET() {
  const body = buildLlmsTxtMarkdown();
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      "X-Robots-Tag": "all",
    },
  });
}
