import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialArticle } from "@/components/news/editorial-article";
import { getSpecialArticleEntry } from "@/content/special-articles";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  clipCrumbTitle,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import {
  getPublishedArticleBySlugCached,
  getPublishedSlugsForChennai,
} from "@/domains/news";
import { getSiteUrl } from "@/lib/env";
import { articleLanguageAlternates } from "@/lib/seo/article-language";
import {
  buildArticleSectionItemListJsonLd,
  buildArticleTocEntries,
  extractMarkdownOutline,
  shouldShowArticleToc,
} from "@/lib/markdown-outline";
import { articleLayoutVariantForSlug } from "@/lib/news-article-layout";
import { categoryToTopicSlug } from "@/lib/news-topics";
import { buildArticleSupplementalJsonLd } from "@/lib/seo/article-rich-snippets";
import {
  buildBreadcrumbJsonLd,
  buildNewsArticleJsonLd,
} from "@/lib/seo/news-article-jsonld";
import {
  buildReaderListingWebPageJsonLd,
  isReaderListingSlug,
} from "@/lib/seo/reader-listing-jsonld";
import {
  normalizeArticleHeroUrl,
  resolveArticleHeroAbsoluteUrl,
} from "@/lib/article-hero-image";
import { defaultOgImageAbsoluteUrl } from "@/lib/seo/site-defaults";
import {
  clipArticleHeadlineForTitle,
  fullSiteTitle,
} from "@/lib/seo/site-titles";
import {
  SWM_RULES_AEO_SECTION_ID,
  isSwmRulesArticleSlug,
} from "@/content/civic-swm/swm-rules-aeo";

type Props = { params: Promise<{ slug: string }> };

/** Route stays dynamic; per-slug reads use `getPublishedArticleBySlugCached` (fresh Neon query per request). */
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
  let article: Awaited<
    ReturnType<typeof getPublishedArticleBySlugCached>
  > = null;
  try {
    article = await getPublishedArticleBySlugCached(slug);
  } catch {
    return { title: { absolute: fullSiteTitle("Article not found") } };
  }
  if (!article) {
    return { title: { absolute: fullSiteTitle("Article not found") } };
  }
  const base = getSiteUrl();
  const url = `${base}/chennai-local-news/${article.slug}`;
  const languageAlts = articleLanguageAlternates(article.slug);
  const desc = clipMetaDescription(
    article.summary ??
      article.dek ??
      article.title,
  );
  const headline = clipArticleHeadlineForTitle(article.title);
  const titleSegment = `${headline} · Chennai local news`;
  const docTitle = fullSiteTitle(titleSegment);
  const heroAbsolute = resolveArticleHeroAbsoluteUrl(article);
  const ogImage =
    normalizeArticleHeroUrl(article.heroImageUrl) != null
      ? [{ url: heroAbsolute }]
      : [{ url: defaultOgImageAbsoluteUrl(), width: 1200, height: 630 }];
  return {
    title: titleSegment,
    description: desc,
    alternates: {
      canonical: url,
      ...(languageAlts ? { languages: languageAlts } : {}),
    },
    robots: {
      "max-image-preview": "large",
      googleBot: { "max-image-preview": "large" },
    },
    openGraph: {
      title: docTitle,
      description: desc,
      url,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      description: desc,
      images:
        normalizeArticleHeroUrl(article.heroImageUrl) != null
          ? [heroAbsolute]
          : [defaultOgImageAbsoluteUrl()],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlugCached(slug);
  if (!article) {
    notFound();
  }
  const summaryLead = article.summary?.trim();
  const dekTrim = article.dek?.trim();
  const speakableSummaryLead = Boolean(
    summaryLead && summaryLead !== dekTrim,
  );
  const swmSpeakable = isSwmRulesArticleSlug(article.slug);
  const newsLd = isReaderListingSlug(article.slug)
    ? buildReaderListingWebPageJsonLd(article)
    : buildNewsArticleJsonLd(article, {
        speakableSummaryLead,
        speakableExtraSelectors: swmSpeakable
          ? ['[data-speakable="swm-aeo-answer"]']
          : undefined,
      });
  const reportBody = article.reportBody ?? article.body;
  const analysisBody = article.analysisBody ?? "";
  const showToc = shouldShowArticleToc(reportBody, analysisBody) || swmSpeakable;
  const tocEntries = buildArticleTocEntries(reportBody, analysisBody);
  const tocEntriesWithAeo = swmSpeakable
    ? [
        {
          level: 2 as const,
          text: "Quick answers (SWM Rules)",
          domId: SWM_RULES_AEO_SECTION_ID,
        },
        ...tocEntries,
      ]
    : tocEntries;
  const reportAnchors = extractMarkdownOutline(reportBody).map((o) => ({
    level: o.level,
    id: `report-${o.baseId}`,
  }));
  const analysisAnchors = extractMarkdownOutline(analysisBody).map((o) => ({
    level: o.level,
    id: `analysis-${o.baseId}`,
  }));
  const articleUrl = `${getSiteUrl()}/chennai-local-news/${article.slug}`;
  const topicHref = article.category
    ? `/chennai-local-news/topic/${categoryToTopicSlug(article.category)}`
    : null;
  const crumbLd = buildBreadcrumbJsonLd(article.slug, article.title, {
    category: article.category,
    topicHref,
  });
  const extraLd = buildArticleSupplementalJsonLd(article, {
    articleUrl,
    reportBody,
  });
  const tocItemListLd =
    showToc && tocEntriesWithAeo.length > 0
      ? buildArticleSectionItemListJsonLd(articleUrl, tocEntriesWithAeo)
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

  const specialArticle = getSpecialArticleEntry(slug);

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
        {specialArticle ? (
          <specialArticle.Component article={article} />
        ) : (
          <EditorialArticle
            article={article}
            layoutVariant={articleLayoutVariantForSlug(article.slug)}
            onThisPage={showToc ? tocEntriesWithAeo : null}
            reportHeadingAnchors={showToc ? reportAnchors : undefined}
            analysisHeadingAnchors={showToc ? analysisAnchors : undefined}
          />
        )}
        <InteriorCrossNav />
      </div>
    </>
  );
}
