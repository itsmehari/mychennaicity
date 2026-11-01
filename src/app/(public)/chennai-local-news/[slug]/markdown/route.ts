import { notFound } from "next/navigation";
import { getPublishedArticleBySlugCached } from "@/domains/news";
import { getSiteUrl } from "@/lib/env";
import { buildNewsMarkdown, markdownResponse } from "@/lib/seo/content-markdown";
import { formatIstDate } from "@/lib/seo/llms-live-catalog";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlugCached(slug);
  if (!article) notFound();

  const origin = getSiteUrl().replace(/\/$/, "");
  const canonical = `${origin}/chennai-local-news/${article.slug}`;
  const published = article.publishedAt ?? article.createdAt;

  return markdownResponse(
    buildNewsMarkdown({
      title: article.title,
      canonical,
      markdownUrl: `${canonical}/markdown`,
      published: formatIstDate(published),
      updated: formatIstDate(article.updatedAt),
      sourceName: article.sourceName,
      sourceUrl: article.sourceUrl,
      author: article.authorByline,
      summary: article.summary ?? article.dek,
      report: article.reportBody ?? article.body,
      analysis: article.analysisBody,
      origin,
    }),
  );
}
