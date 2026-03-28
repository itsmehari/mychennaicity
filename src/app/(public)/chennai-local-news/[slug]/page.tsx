import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialArticle } from "@/components/news/editorial-article";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  clipCrumbTitle,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import {
  getPublishedArticleBySlug,
  getPublishedSlugsForChennai,
} from "@/domains/news";
import { getSiteUrl } from "@/lib/env";
import {
  buildArticleSectionItemListJsonLd,
  buildArticleTocEntries,
  extractMarkdownOutline,
  shouldShowArticleToc,
} from "@/lib/markdown-outline";
import { categoryToTopicSlug } from "@/lib/news-topics";
import { buildInteractiveExtraJsonLd } from "@/lib/seo/article-interactive-jsonld";
import {
  buildBreadcrumbJsonLd,
  buildNewsArticleJsonLd,
} from "@/lib/seo/news-article-jsonld";
import { defaultOgImageAbsoluteUrl } from "@/lib/seo/site-defaults";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

function clipMetaDescription(raw: string, max = 155): string {
  const t = raw.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export async function generateStaticParams() {
  try {
    const slugs = await getPublishedSlugsForChennai();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let article: Awaited<ReturnType<typeof getPublishedArticleBySlug>> = null;
  try {
    article = await getPublishedArticleBySlug(slug);
  } catch {
    return { title: "Story" };
  }
  if (!article) {
    return { title: "Story" };
  }
  const base = getSiteUrl();
  const url = `${base}/chennai-local-news/${article.slug}`;
  const desc = clipMetaDescription(
    article.summary ??
      article.dek ??
      article.title,
  );
  /** Root layout template adds " · mychennaicity.in" → full SERP title per SEO plan. */
  const titleSegment = `${article.title} · Chennai local news`;
  const hero = article.heroImageUrl?.trim();
  const ogImage = hero
    ? [{ url: hero }]
    : [{ url: defaultOgImageAbsoluteUrl(), width: 1200, height: 630 }];
  return {
    title: titleSegment,
    description: desc,
    alternates: { canonical: url },
    robots: {
      "max-image-preview": "large",
      googleBot: { "max-image-preview": "large" },
    },
    openGraph: {
      title: `${article.title} · Chennai local news · mychennaicity.in`,
      description: desc,
      url,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} · Chennai local news · mychennaicity.in`,
      description: desc,
      images: hero ? [hero] : [defaultOgImageAbsoluteUrl()],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  if (!article) {
    notFound();
  }
  const summaryLead = article.summary?.trim();
  const dekTrim = article.dek?.trim();
  const speakableSummaryLead = Boolean(
    summaryLead && summaryLead !== dekTrim,
  );
  const newsLd = buildNewsArticleJsonLd(article, {
    speakableSummaryLead,
  });
  const crumbLd = buildBreadcrumbJsonLd(article.slug, article.title);
  const extraLd = buildInteractiveExtraJsonLd(
    article.slug,
    article.interactiveJson ?? undefined,
  );

  const reportBody = article.reportBody ?? article.body;
  const analysisBody = article.analysisBody ?? "";
  const showToc = shouldShowArticleToc(reportBody, analysisBody);
  const tocEntries = buildArticleTocEntries(reportBody, analysisBody);
  const reportAnchors = extractMarkdownOutline(reportBody).map((o) => ({
    level: o.level,
    id: `report-${o.baseId}`,
  }));
  const analysisAnchors = extractMarkdownOutline(analysisBody).map((o) => ({
    level: o.level,
    id: `analysis-${o.baseId}`,
  }));
  const articleUrl = `${getSiteUrl()}/chennai-local-news/${article.slug}`;
  const tocItemListLd =
    showToc && tocEntries.length > 0
      ? buildArticleSectionItemListJsonLd(articleUrl, tocEntries)
      : null;

  const crumbs: { label: string; href?: string }[] = [
    { label: "Home", href: "/" },
    { label: "Chennai local news", href: "/chennai-local-news" },
  ];
  if (article.category) {
    crumbs.push({
      label: article.category,
      href: `/chennai-local-news/topic/${categoryToTopicSlug(article.category)}`,
    });
  }
  crumbs.push({ label: clipCrumbTitle(article.title) });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }}
      />
      {tocItemListLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tocItemListLd) }}
        />
      ) : null}
      {extraLd.map((doc, i) => {
        const t =
          doc &&
          typeof doc === "object" &&
          "@type" in doc &&
          typeof (doc as { "@type": unknown })["@type"] === "string"
            ? (doc as { "@type": string })["@type"]
            : "jsonld";
        return (
          <script
            key={`${t}-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(doc) }}
          />
        );
      })}
      <div className={interiorMainClassName}>
        <PageBreadcrumbs items={crumbs} />
        <EditorialArticle
          article={article}
          onThisPage={showToc ? tocEntries : null}
          reportHeadingAnchors={showToc ? reportAnchors : undefined}
          analysisHeadingAnchors={showToc ? analysisAnchors : undefined}
        />
        <InteriorCrossNav />
      </div>
    </>
  );
}
