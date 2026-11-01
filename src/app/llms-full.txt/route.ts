import { listPublishedArticlesForChennai } from "@/domains/news";
import { loadLlmsLiveCatalog } from "@/lib/seo/llms-live-catalog";
import {
  buildLlmsFullMarkdown,
  type LlmsDigestItem,
  type LlmsLiveCatalog,
} from "@/lib/seo/llms-txt";

export const dynamic = "force-dynamic";

const emptyCatalog = (): LlmsLiveCatalog => ({
  jobs: [],
  seekers: [],
  events: [],
});

export async function GET() {
  let news: LlmsDigestItem[] = [];
  let catalog = emptyCatalog();

  try {
    const articles = await listPublishedArticlesForChennai(15);
    news = articles.map((article) => ({
      title: article.title,
      url: `/chennai-local-news/${article.slug}`,
      summary: article.summary ?? article.dek,
      date: (article.publishedAt ?? article.createdAt)?.toISOString?.() ?? null,
    }));
  } catch {
    news = [];
  }

  try {
    catalog = await loadLlmsLiveCatalog();
  } catch {
    catalog = emptyCatalog();
  }

  return new Response(buildLlmsFullMarkdown({ news, catalog }), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      "X-Robots-Tag": "all",
    },
  });
}
