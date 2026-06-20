import Image from "next/image";
import Link from "next/link";
import type { PublicArticleRow } from "@/domains/news";
import { relatedArticlesForChennai } from "@/domains/news";
import { chennaiZones } from "@/lib/chennai-zones";
import type { ArticleTocEntry } from "@/lib/markdown-outline";
import type { ArticleLayoutVariant } from "@/lib/news-article-layout";
import { areaHubSlugForArticle } from "@/lib/news-area-hint";
import { categoryToTopicSlug } from "@/lib/news-topics";
import {
  articleHeroUsesNextImage,
  resolveArticleHeroSrc,
} from "@/lib/article-hero-image";
import type { ArticleHeadingAnchor } from "./article-prose";
import { ArticleProse } from "./article-prose";
import { ArticleAdRegion } from "@/ads/article-ad-region";
import { ArticleCommunityBand } from "@/components/community/article-community-band";
import { ArticleDetailLayout } from "./article-detail-layouts";
import { ArticleHeroImage } from "./article-hero-image";
import {
  extractGoMetadata,
  GoMetadataStrip,
} from "./go-metadata-strip";
import { InteractiveBlock } from "./interactive-block";
import { OfficialDocumentBanner } from "./official-document-banner";

function tocLinkLabel(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1");
}

function RelatedNav({
  related,
  layoutVariant,
}: {
  related: PublicArticleRow[];
  layoutVariant: ArticleLayoutVariant;
}) {
  if (related.length === 0) return null;

  if (layoutVariant === "editorial-grid") {
    return (
      <nav
        className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[color-mix(in_srgb,var(--foreground)_4%,transparent)]"
        aria-label="Related"
      >
        <h2 className="text-center text-sm font-semibold text-[var(--foreground)] sm:text-left">
          Related in Chennai
        </h2>
        <ul className="mt-6 flex flex-wrap justify-center gap-8 sm:justify-start">
          {related.map((r) => {
            const src = resolveArticleHeroSrc(r);
            const useNext = articleHeroUsesNextImage(src);
            return (
              <li key={r.id} className="w-[132px]">
                <Link
                  href={`/chennai-local-news/${r.slug}`}
                  className="group flex flex-col items-center text-center"
                >
                  <span className="relative block h-[72px] w-[72px] overflow-hidden rounded-full ring-2 ring-[var(--border)] transition ring-offset-2 ring-offset-[var(--background)] group-hover:ring-[var(--accent)]">
                    {useNext ? (
                      <Image
                        src={src}
                        alt=""
                        width={72}
                        height={72}
                        className="h-full w-full object-cover"
                        sizes="72px"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    )}
                  </span>
                  <span className="mt-2 line-clamp-3 text-xs font-medium leading-snug text-[var(--accent)] underline-offset-4 group-hover:underline">
                    {r.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav
      className="mt-12 rounded-2xl bg-[var(--surface)] p-6 ring-1 ring-[var(--border)]"
      aria-label="Related"
    >
      <h2 className="text-sm font-semibold text-[var(--foreground)]">
        Related in Chennai
      </h2>
      <ul className="mt-3 space-y-2">
        {related.map((r) => (
          <li key={r.id}>
            <Link
              href={`/chennai-local-news/${r.slug}`}
              className="text-sm font-medium text-[var(--accent)] hover:underline"
            >
              {r.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
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
  try {
    relatedRows = await relatedArticlesForChennai(
      article.slug,
      article.category,
      4,
    );
  } catch {
    relatedRows = [];
  }
  const report = article.reportBody ?? article.body;
  const analysis = article.analysisBody ?? "";
  const summaryLead = article.summary?.trim();
  const dek = article.dek?.trim();
  const showSummaryLead = Boolean(summaryLead && summaryLead !== dek);
  const rawInteractive = article.interactiveJson;
  const interactiveType =
    rawInteractive &&
    typeof rawInteractive === "object" &&
    "type" in rawInteractive
      ? String((rawInteractive as { type: unknown }).type)
      : null;
  const takeawaysAtTop = interactiveType === "takeaways";
  const areaSlug = areaHubSlugForArticle(article);
  const areaZone = areaSlug
    ? chennaiZones.find((z) => z.slug === areaSlug)
    : undefined;

  const heroAspect =
    layoutVariant === "feature-ribbon"
      ? "relative aspect-[2/1] w-full sm:aspect-[21/9]"
      : layoutVariant === "editorial-grid"
        ? "relative aspect-[4/3] w-full"
        : "relative aspect-[16/10] w-full";

  const heroSizes =
    layoutVariant === "editorial-grid"
      ? "(max-width: 768px) 100vw, 340px"
      : "(max-width: 768px) 100vw, min(1100px, 96vw)";

  const hero = (
    <ArticleHeroImage
      article={article}
      priority
      sizes={heroSizes}
      aspectWrapperClass={heroAspect}
      className={
        layoutVariant === "editorial-grid"
          ? "rounded-2xl"
          : "rounded-xl sm:rounded-2xl"
      }
    />
  );

  const categoryLink = article.category ? (
    <Link
      href={`/chennai-local-news/topic/${categoryToTopicSlug(article.category)}`}
      className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)] hover:underline"
    >
      {article.category}
    </Link>
  ) : null;

  const title = (
    <h1
      className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl"
      data-speakable="article-title"
    >
      {article.title}
    </h1>
  );

  const dekBlock = article.dek ? (
    <p className="mt-4 text-lg text-[var(--muted)]">{article.dek}</p>
  ) : null;

  const summaryBlock = showSummaryLead ? (
    <p
      className="type-lede mt-4 border-l-2 border-[var(--accent)] pl-4 text-base leading-relaxed text-[var(--foreground)]"
      data-speakable="article-lead"
    >
      {summaryLead}
    </p>
  ) : null;

  const takeawaysBlock = takeawaysAtTop ? (
    <div className="mt-6">
      <InteractiveBlock data={rawInteractive ?? undefined} />
    </div>
  ) : null;

  const goMeta = extractGoMetadata(`${report}\n${article.title}`);
  const reportSectionTitle = goMeta ? "Transfers and postings" : "What we know";
  const showOfficialPdf =
    article.sourceUrl?.toLowerCase().includes(".pdf") ?? false;

  const officialBanner = showOfficialPdf && article.sourceUrl ? (
    <OfficialDocumentBanner
      href={article.sourceUrl}
      label={article.sourceName ?? "Official document (PDF)"}
      meta={
        goMeta
          ? `G.O. (Rt.) No. ${goMeta.number} · ${goMeta.date}`
          : undefined
      }
    />
  ) : null;

  const goStrip = goMeta ? <GoMetadataStrip meta={goMeta} /> : null;

  const areaBlock = areaZone ? (
    <p className="type-lede mt-4 text-sm text-[var(--muted)]">
      <span className="text-[var(--foreground)]">Local area: </span>
      <Link
        href={`/areas/${areaZone.slug}`}
        className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
      >
        More in {areaZone.label}
      </Link>
      <span> — neighbourhood page with news and links for this part of Chennai.</span>
    </p>
  ) : null;

  const publishedRow = (
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
      <span>
        Updated{" "}
        {article.updatedAt.toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Asia/Kolkata",
        })}
      </span>
    </div>
  );

  const toc =
    onThisPage && onThisPage.length > 0 ? (
      <nav
        className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 ring-1 ring-[color-mix(in_srgb,var(--foreground)_6%,transparent)]"
        aria-label="On this page"
      >
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
          On this page
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--foreground)]">
          {onThisPage.map((e) => (
            <li
              key={e.domId}
              className={e.level === 3 ? "ml-5 list-[lower-alpha]" : ""}
            >
              <a
                href={`#${e.domId}`}
                className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
              >
                {tocLinkLabel(e.text)}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    ) : null;

  const main = (
    <>
      <section
        className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-8 ring-1 ring-[color-mix(in_srgb,var(--foreground)_5%,transparent)]"
        aria-labelledby="report-heading"
      >
        <div className="flex flex-wrap items-center gap-3 border-b border-[var(--border)] pb-5">
          <span className="rounded-full bg-[color-mix(in_srgb,var(--accent)_12%,var(--surface))] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
            Report
          </span>
          <h2
            id="report-heading"
            className="text-lg font-semibold text-[var(--foreground)] sm:text-xl"
          >
            {reportSectionTitle}
          </h2>
        </div>
        {goStrip ? <div className="mt-6">{goStrip}</div> : null}
        <div className="mt-6">
          <ArticleProse
            content={report}
            headingAnchors={reportHeadingAnchors}
          />
        </div>
      </section>

      {analysis ? (
        <section
          className="rounded-2xl border border-[color-mix(in_srgb,var(--accent-warm)_22%,var(--border))] bg-[color-mix(in_srgb,var(--accent-warm)_4%,var(--surface))] p-5 sm:p-8"
          aria-labelledby="analysis-heading"
        >
          <div className="border-b border-[color-mix(in_srgb,var(--accent-warm)_20%,var(--border))] pb-5">
            <span className="rounded-full bg-[color-mix(in_srgb,var(--accent-warm)_14%,var(--surface))] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--accent-warm)]">
              Chennai desk
            </span>
            <h2
              id="analysis-heading"
              className="mt-3 text-lg font-semibold text-[var(--foreground)] sm:text-xl"
            >
              What this means in Chennai
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Local impact, institutions, and what residents should watch next.
            </p>
          </div>
          <div className="mt-6">
            <ArticleProse
              content={analysis}
              headingAnchors={analysisHeadingAnchors}
            />
          </div>
        </section>
      ) : null}

      {!takeawaysAtTop && article.interactiveJson ? (
        <section
          id="interactive-heading"
          className="scroll-mt-28 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
          aria-labelledby="interactive-heading-title"
        >
          <InteractiveBlock data={article.interactiveJson ?? undefined} />
        </section>
      ) : null}
    </>
  );

  const attribution = (
    <footer className="border-t border-[var(--border)] pt-8">
      <h2 className="text-sm font-semibold text-[var(--foreground)]">
        Source and attribution
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
        This page is an editorial rephrase and analysis based on publicly
        reported information. It is not a verbatim reproduction of any
        publisher. Read the original for full context.
      </p>
      {article.sourceUrl && article.sourceName ? (
        <p className="mt-3 text-sm">
          <span className="font-semibold text-[var(--foreground)]">
            Primary source:{" "}
          </span>
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            {article.sourceName}
          </a>
          <span className="text-[var(--muted)]">
            {" "}
            — open the original for full context.
          </span>
        </p>
      ) : null}
    </footer>
  );

  const relatedNav = (
    <RelatedNav related={relatedRows} layoutVariant={layoutVariant} />
  );

  const back = (
    <p className="pb-2">
      <Link
        href="/chennai-local-news"
        className="text-sm font-semibold text-[var(--accent)] hover:underline"
      >
        Back to Chennai local news
      </Link>
    </p>
  );

  const adTop = (
    <div className="flex w-full justify-center">
      <ArticleAdRegion
        slotId="article-top"
        size="728x90"
        adsenseSlotEnvKey="ARTICLE_TOP"
      />
    </div>
  );

  const adMid = (
    <div className="flex w-full justify-center">
      <ArticleAdRegion
        slotId="article-mid"
        size="300x250"
        adsenseSlotEnvKey="ARTICLE_MID"
      />
    </div>
  );

  const communityBand = <ArticleCommunityBand />;

  const adEnd = (
    <div className="flex w-full justify-center">
      <ArticleAdRegion
        slotId="article-end"
        size="320x50"
        adsenseSlotEnvKey="ARTICLE_END"
      />
    </div>
  );

  return (
    <ArticleDetailLayout
      variant={layoutVariant}
      slots={{
        categoryLink,
        title,
        dek: dekBlock,
        summaryLead: summaryBlock,
        takeaways: takeawaysBlock,
        areaZone: areaBlock,
        publishedRow,
        hero,
        officialPdf: officialBanner,
        adTop,
        toc,
        main,
        adMid,
        attribution,
        communityBand,
        related: relatedNav,
        adEnd,
        back,
      }}
    />
  );
}
