import { listPublishedArticlesForChennai } from "@/domains/news";
import { loadLlmsLiveCatalog } from "@/lib/seo/llms-live-catalog";
import { buildAeoChennaiMarkdown, type LlmsDigestItem } from "@/lib/seo/llms-txt";

export const dynamic = "force-dynamic";

/** Answer-first Markdown digest for Chennai news / jobs / events. */
export async function GET() {
  let news: LlmsDigestItem[] = [];
  let jobs: LlmsDigestItem[] = [];
  let events: LlmsDigestItem[] = [];
  let seekers: LlmsDigestItem[] = [];

  try {
    const articles = await listPublishedArticlesForChennai(8);
    news = articles.map((article) => ({
      title: article.title,
      url: `/chennai-local-news/${article.slug}`,
      summary: article.summary ?? article.dek,
    }));
  } catch {
    news = [];
  }

  try {
    const catalog = await loadLlmsLiveCatalog();
    jobs = catalog.jobs;
    events = catalog.events;
    seekers = catalog.seekers;
  } catch {
    jobs = [];
    events = [];
    seekers = [];
  }

  return new Response(buildAeoChennaiMarkdown({ news, jobs, events, seekers }), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      "X-Robots-Tag": "all",
    },
  });
}
