import Link from "next/link";
import type { PublicArticleRow } from "@/domains/news";
import {
  latestArticlesForHome,
  relatedArticlesForChennai,
} from "@/domains/news";
import { chennaiZones } from "@/lib/chennai-zones";
import type { ArticleTocEntry } from "@/lib/markdown-outline";
import type { ArticleLayoutVariant } from "@/lib/news-article-layout";
import { areaHubSlugForArticle } from "@/lib/news-area-hint";
import { categoryToTopicSlug } from "@/lib/news-topics";
import {
  buildGenericKeyDetails,
  extractFactBoxDetails,
  extractTakeawaysBullets,
  removeExtractedSections,
} from "@/lib/article-content-extract";
import {
  estimateReadingTimeMinutes,
  formatReadingTime,
} from "@/lib/article-reading-time";
import {
  articleHeroAlt,
} from "@/lib/article-hero-image";
import type { ArticleHeadingAnchor } from "./article-prose";
import { ArticleProse } from "./article-prose";
import { ArticleAdRegion } from "@/ads/article-ad-region";
import { ArticleCommunityBand } from "@/components/community/article-community-band";
import { ArticleDetailLayout } from "./article-detail-layouts";
import { ArticleHeroImage } from "./article-hero-image";
import {
  ArticleIdentityHeader,
  ArticleKeyDetailsStrip,
  ArticleLocationTag,
  ArticleQuickSummary,
  ArticleRelatedGrid,
  ArticleRightSidebar,
  ArticleTocNav,
  CivicEditorialLayout,
  OfficialSourcesBlock,
} from "./civic-editorial";
import {
  extractGoMetadata,
  GoMetadataStrip,
} from "./go-metadata-strip";
import { InteractiveBlock } from "./interactive-block";
import {
  ArticleCountdown,
  readArticleCountdown,
} from "./article-countdown";
import { OfficialDocumentBanner } from "./official-document-banner";
import { SwmRulesAeoSection } from "./swm-rules-aeo-section";
import { isSwmRulesArticleSlug } from "@/content/civic-swm/swm-rules-aeo";

function LegacyRelatedNav({
  related,
  layoutVariant,
}: {
  related: PublicArticleRow[];
  layoutVariant: ArticleLayoutVariant;
}) {
  if (related.length === 0) return null;
  if (layoutVariant === "editorial-grid") {
    return <ArticleRelatedGrid articles={related} />;
  }
  return <ArticleRelatedGrid articles={related} />;
}

export async function EditorialArticle({
  article,
  layoutVariant,
  onThisPage,
  reportHeadingAnchors,
  analysisHeadingAnchors,
}: {
  article: PublicArticleRow;
  layoutVariant: ArticleLayoutVariant;
  onThisPage?: ArticleTocEntry[] | null;
  reportHeadingAnchors?: ArticleHeadingAnchor[];
  analysisHeadingAnchors?: ArticleHeadingAnchor[];
}) {
  let relatedRows: Awaited<ReturnType<typeof relatedArticlesForChennai>> = [];
  let latestRows: Awaited<ReturnType<typeof latestArticlesForHome>> = [];
  try {
    [relatedRows, latestRows] = await Promise.all([
      relatedArticlesForChennai(article.slug, article.category, 4),
      latestArticlesForHome(5),
    ]);
  } catch {
    relatedRows = [];
    latestRows = [];
  }

  const reportRaw = article.reportBody ?? article.body;
  const analysisRaw = article.analysisBody ?? "";
  const summaryLead = article.summary?.trim();
  const dek = article.dek?.trim();
  const showSummaryLead = Boolean(summaryLead && summaryLead !== dek);
  const areaSlug = areaHubSlugForArticle(article);
  const areaZone = areaSlug
    ? chennaiZones.find((z) => z.slug === areaSlug)
    : undefined;

  const takeawaysBullets = extractTakeawaysBullets(reportRaw);
  const factBoxDetails = extractFactBoxDetails(reportRaw);
  const goMeta = extractGoMetadata(`${reportRaw}\n${article.title}`);

  const reportBody = removeExtractedSections(reportRaw, ["takeaways", "factbox"]);
  const reportSectionTitle = goMeta ? "Transfers and postings" : "What we know";

  const keyDetails =
    factBoxDetails.length > 0
      ? factBoxDetails.slice(0, 8)
      : goMeta
        ? [
            { label: "Order", value: `G.O. (Rt.) No. ${goMeta.number}` },
            { label: "Date", value: goMeta.date },
            { label: "Department", value: goMeta.department },
            ...(goMeta.signatory
              ? [{ label: "Signed", value: goMeta.signatory }]
              : []),
          ]
        : buildGenericKeyDetails({
            category: article.category,
            publishedAt: article.publishedAt,
            sourceName: article.sourceName,
            areaLabel: areaZone?.label ?? null,
          });

  const readingMinutes = estimateReadingTimeMinutes(
    `${reportRaw}\n${analysisRaw}`,
  );
  const readingTime = formatReadingTime(readingMinutes);
  const shareText =
    dek || summaryLead || article.title;

  const showOfficialPdf =
    article.sourceUrl?.toLowerCase().includes(".pdf") ?? false;

  const categoryLink = article.category ? (
    <Link
      href={`/chennai-local-news/topic/${categoryToTopicSlug(article.category)}`}
      className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)] hover:underline"
    >
      {article.category}
    </Link>
  ) : (
    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
      Chennai civic update
    </span>
  );

  const hero = (
    <ArticleHeroImage
      article={article}
      priority
      sizes="(max-width: 768px) 100vw, min(720px, 70vw)"
      aspectWrapperClass="relative aspect-[16/10] w-full"
      className="rounded-xl sm:rounded-2xl"
    />
  );

  const civicHero = (
    <div className="civic-hero">
      <ArticleHeroImage
        article={article}
        priority
        sizes="(max-width: 768px) 100vw, min(720px, 70vw)"
        aspectWrapperClass="relative aspect-[16/10] w-full"
        className="rounded-xl sm:rounded-2xl ring-0"
      />
      <p className="civic-hero__caption">{articleHeroAlt(article)}</p>
    </div>
  );

  const swmAeoBlock = isSwmRulesArticleSlug(article.slug) ? (
    <SwmRulesAeoSection slug={article.slug} />
  ) : null;

  const mainBody = (
    <>
      {swmAeoBlock}
      <section className="civic-body-section" aria-labelledby="report-heading">
        <span className="civic-body-section__label">Report</span>
        <h2 id="report-heading" className="civic-body-section__title">
          {reportSectionTitle}
        </h2>
        {goMeta ? (
          <div className="mb-6">
            <GoMetadataStrip meta={goMeta} />
          </div>
        ) : null}
        <ArticleProse
          content={reportBody}
          headingAnchors={reportHeadingAnchors}
        />
      </section>

      {analysisRaw ? (
        <section
          className="civic-body-section civic-body-section--analysis"
          aria-labelledby="analysis-heading"
        >
          <span className="civic-body-section__label civic-body-section__label--warm">
            Chennai desk
          </span>
          <h2 id="analysis-heading" className="civic-body-section__title">
            What this means in Chennai
          </h2>
          <p className="civic-body-section__subtitle">
            Local impact, institutions, and what residents should watch next.
          </p>
          <ArticleProse
            content={analysisRaw}
            headingAnchors={analysisHeadingAnchors}
          />
        </section>
      ) : null}
    </>
  );

  const faqBlock =
    article.interactiveJson &&
    typeof article.interactiveJson === "object" &&
    "type" in article.interactiveJson &&
    String((article.interactiveJson as { type: unknown }).type) === "faq" ? (
      <InteractiveBlock data={article.interactiveJson ?? undefined} />
    ) : article.interactiveJson ? (
      <InteractiveBlock data={article.interactiveJson ?? undefined} />
    ) : null;

  const countdownData = readArticleCountdown(
    article.interactiveJson ?? undefined,
  );
  const countdownBlock = countdownData ? (
    <ArticleCountdown data={countdownData} />
  ) : null;

  const back = (
    <p className="mt-8 pb-2">
      <Link
        href="/chennai-local-news"
        className="text-sm font-semibold text-[var(--accent)] hover:underline"
      >
        ← Back to Chennai local news
      </Link>
    </p>
  );

  if (layoutVariant === "civic-editorial") {
    const sidebarLatest = latestRows
      .filter((a) => a.slug !== article.slug)
      .slice(0, 4);

    return (
      <CivicEditorialLayout
        slots={{
          leftRailToc: onThisPage?.length ? (
            <ArticleTocNav entries={onThisPage} variant="rail" />
          ) : null,
          shareTitle: article.title,
          shareText,
          header: (
            <ArticleIdentityHeader
              categoryLink={categoryLink}
              locationTag={
                areaZone ? (
                  <ArticleLocationTag
                    areaLabel={areaZone.label}
                    areaSlug={areaZone.slug}
                  />
                ) : undefined
              }
              title={
                <h1
                  className="type-display text-[var(--foreground)]"
                  data-speakable="article-title"
                >
                  {article.title}
                </h1>
              }
              summary={
                <>
                  {dek ? (
                    <p className="civic-article-header__deck">{dek}</p>
                  ) : null}
                  {showSummaryLead ? (
                    <p
                      className="civic-article-header__deck"
                      data-speakable="article-lead"
                    >
                      {summaryLead}
                    </p>
                  ) : null}
                </>
              }
              authorByline={article.authorByline}
              publishedAt={article.publishedAt}
              updatedAt={article.updatedAt}
              readingTime={readingTime}
              shareTitle={article.title}
              shareText={shareText}
            />
          ),
          hero: civicHero,
          quickSummary: <ArticleQuickSummary bullets={takeawaysBullets} />,
          keyDetails: <ArticleKeyDetailsStrip items={keyDetails} />,
          countdown: countdownBlock,
          officialPdf:
            showOfficialPdf && article.sourceUrl ? (
              <OfficialDocumentBanner
                href={article.sourceUrl}
                label={article.sourceName ?? "Official document (PDF)"}
                meta={
                  goMeta
                    ? `G.O. (Rt.) No. ${goMeta.number} · ${goMeta.date}`
                    : undefined
                }
              />
            ) : undefined,
          adAfterSummary: (
            <div className="civic-ad-slot">
              <ArticleAdRegion
                slotId="article-top"
                size="728x90"
                adsenseSlotEnvKey="ARTICLE_TOP"
              />
            </div>
          ),
          main: mainBody,
          adMid: (
            <div className="civic-ad-slot">
              <ArticleAdRegion
                slotId="article-mid"
                size="300x250"
                adsenseSlotEnvKey="ARTICLE_MID"
              />
            </div>
          ),
          sources: (
            <OfficialSourcesBlock
              sourceName={article.sourceName}
              sourceUrl={article.sourceUrl}
            />
          ),
          faq: faqBlock,
          communityBand: (
            <div className="civic-community-band">
              <ArticleCommunityBand />
            </div>
          ),
          related: (
            <ArticleRelatedGrid
              articles={relatedRows}
              title="More from MyChennaiCity"
            />
          ),
          adEnd: (
            <div className="civic-ad-slot">
              <ArticleAdRegion
                slotId="article-end"
                size="320x50"
                adsenseSlotEnvKey="ARTICLE_END"
              />
            </div>
          ),
          back,
          rightSidebar: (
            <ArticleRightSidebar
              latestArticles={sidebarLatest}
              relatedArticles={relatedRows.slice(0, 3)}
              category={article.category}
            />
          ),
        }}
      />
    );
  }

  const legacySlots = {
    categoryLink,
    title: (
      <h1
        className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl"
        data-speakable="article-title"
      >
        {article.title}
      </h1>
    ),
    dek: dek ? (
      <p className="mt-4 text-lg text-[var(--muted)]">{dek}</p>
    ) : null,
    summaryLead: showSummaryLead ? (
      <p
        className="type-lede mt-4 border-l-2 border-[var(--accent)] pl-4 text-base leading-relaxed text-[var(--foreground)]"
        data-speakable="article-lead"
      >
        {summaryLead}
      </p>
    ) : null,
    takeaways: null,
    areaZone: areaZone ? (
      <p className="type-lede mt-4 text-sm text-[var(--muted)]">
        <span className="text-[var(--foreground)]">Local area: </span>
        <Link
          href={`/areas/${areaZone.slug}`}
          className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          More in {areaZone.label}
        </Link>
      </p>
    ) : null,
    publishedRow: (
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-[var(--muted)]">
        {article.publishedAt ? (
          <time dateTime={article.publishedAt.toISOString()}>
            Published{" "}
            {article.publishedAt.toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
              timeZone: "Asia/Kolkata",
            })}
          </time>
        ) : null}
      </div>
    ),
    hero,
    officialPdf:
      showOfficialPdf && article.sourceUrl ? (
        <OfficialDocumentBanner
          href={article.sourceUrl}
          label={article.sourceName ?? "Official document (PDF)"}
        />
      ) : undefined,
    adTop: (
      <div className="flex w-full justify-center">
        <ArticleAdRegion
          slotId="article-top"
          size="728x90"
          adsenseSlotEnvKey="ARTICLE_TOP"
        />
      </div>
    ),
    toc: onThisPage?.length ? (
      <ArticleTocNav entries={onThisPage} variant="inline" />
    ) : null,
    main: mainBody,
    adMid: (
      <div className="flex w-full justify-center">
        <ArticleAdRegion
          slotId="article-mid"
          size="300x250"
          adsenseSlotEnvKey="ARTICLE_MID"
        />
      </div>
    ),
    attribution: (
      <OfficialSourcesBlock
        sourceName={article.sourceName}
        sourceUrl={article.sourceUrl}
      />
    ),
    communityBand: <ArticleCommunityBand />,
    related: (
      <LegacyRelatedNav
        related={relatedRows}
        layoutVariant={layoutVariant}
      />
    ),
    adEnd: (
      <div className="flex w-full justify-center">
        <ArticleAdRegion
          slotId="article-end"
          size="320x50"
          adsenseSlotEnvKey="ARTICLE_END"
        />
      </div>
    ),
    back,
  };

  return (
    <ArticleDetailLayout variant={layoutVariant} slots={legacySlots} />
  );
}
