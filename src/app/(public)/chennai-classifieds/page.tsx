import type { Metadata } from "next";
import Link from "next/link";
import { AdvertisePanel } from "@/components/ads/advertise-panel";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import { HubCommunityStrip } from "@/components/community/hub-community-strip";
import { ClassifiedHubListingCards } from "@/components/classifieds/classified-hub-cards";
import { ClassifiedsHubCategoryNav } from "@/components/classifieds/classifieds-hub-category-nav";
import { FeaturedJobsRail } from "@/components/jobs/featured-jobs-rail";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import {
  countOpenClassifiedListingsForChennaiHub,
  listOpenClassifiedListingsForChennaiHub,
} from "@/domains/classifieds";
import {
  classifiedHubCategoryMeta,
  parseClassifiedCategoryParam,
} from "@/lib/classifieds/categories";
import { getSiteUrl } from "@/lib/env";
import {
  CHENNAI_CLASSIFIEDS_HUB_PATH,
  chennaiClassifiedsHubPath,
} from "@/lib/routes/chennai-classifieds";
import { buildClassifiedsHubJsonLd } from "@/lib/seo/classified-jsonld";
import { formatIndiaLongDate } from "@/lib/presentation-dates";
import { DeskPostAnchor } from "@/components/free-posting/desk-post-context";
import { postKindForClassifiedCategory } from "@/content/free-posting";
import { POST_CLASSIFIED_AD_CHENNAI_PATH } from "@/content/guides/post-classified-ad-chennai";
import { CLASSIFIEDS_BROWSE_PASSAGE } from "@/content/aeo/classifieds-passages";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const hubTitleBase = "Chennai local classified ads";

const PAGE_SIZE = 20;

type PageProps = {
  searchParams: Promise<{ page?: string; category?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const base = getSiteUrl();
  const sp = await searchParams;
  const pageNum = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const category = parseClassifiedCategoryParam(sp.category);
  const categoryMeta = classifiedHubCategoryMeta(category);
  const hubUrl = `${base}${chennaiClassifiedsHubPath({ category, page: pageNum > 1 ? pageNum : undefined })}`;
  let total = 0;
  try {
    total = await countOpenClassifiedListingsForChennaiHub(category);
  } catch {
    total = 0;
  }
  const description =
    total > 0
      ? `${total} free local classified ads in Chennai — ${categoryMeta.description} Contact advertisers directly. Post yours at mychennaicity.in/post-a-classified-in-chennai.`
      : `${categoryMeta.description} Post a free Chennai classified ad at mychennaicity.in/post-a-classified-in-chennai.`;

  const titleSegment =
    category && categoryMeta.id !== "all"
      ? `${categoryMeta.label} — ${hubTitleBase}`
      : pageNum <= 1
        ? hubTitleBase
        : `${hubTitleBase} — Page ${pageNum}`;

  return {
    title: titleSegment,
    description,
    alternates: { canonical: hubUrl },
    openGraph: {
      title: fullSiteTitle(titleSegment),
      description,
      url: hubUrl,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullSiteTitle(titleSegment),
      description,
      images: ["/twitter-image"],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function ChennaiClassifiedsHubPage({
  searchParams,
}: PageProps) {
  const sp = await searchParams;
  const pageNum = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const category = parseClassifiedCategoryParam(sp.category);
  const categoryMeta = classifiedHubCategoryMeta(category);
  const offset = (pageNum - 1) * PAGE_SIZE;

  let total = 0;
  let listings: Awaited<
    ReturnType<typeof listOpenClassifiedListingsForChennaiHub>
  > = [];
  try {
    total = await countOpenClassifiedListingsForChennaiHub(category);
    listings = await listOpenClassifiedListingsForChennaiHub(
      PAGE_SIZE,
      offset,
      category,
    );
  } catch {
    listings = [];
    total = 0;
  }

  const useDb = total > 0;
  const hubLd = useDb ? buildClassifiedsHubJsonLd(listings) : null;
  const totalPages = useDb ? Math.max(1, Math.ceil(total / PAGE_SIZE)) : 1;
  const hasPrev = pageNum > 1;
  const hasNext = useDb && pageNum < totalPages;
  const snapshotAsOf = formatIndiaLongDate();
  const hubHeading =
    category && categoryMeta.id !== "all"
      ? categoryMeta.label
      : "Chennai classified ads";

  const postKind = postKindForClassifiedCategory(category);
  const postLabel =
    postKind === "home"
      ? "List a home"
      : postKind === "sell"
        ? "Sell an item"
        : postKind === "pg"
          ? "List a PG"
          : "Post a classified ad";

  return (
    <div className={interiorMainClassName}>
      {hubLd ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(hubLd.collectionPage),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(hubLd.itemList) }}
          />
        </>
      ) : null}

      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Chennai classifieds" },
        ]}
      />

      <header className="mt-6 flex max-w-5xl flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          <p className="type-eyebrow text-[var(--accent)]">Classifieds</p>
          <h1 className="type-display mt-2 text-[2rem] leading-tight text-[var(--foreground)] sm:text-[2.35rem]">
            {hubHeading}
          </h1>
          <p className="type-lede mt-4 text-base leading-relaxed text-[var(--muted)]">
            {categoryMeta.description} Contact the advertiser directly; we do not
            broker deals.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <DeskPostAnchor kind={postKind} className="mcc-supply-cta">
            {postLabel}
          </DeskPostAnchor>
        </div>
      </header>

      <p className="mt-4 max-w-3xl text-sm text-[var(--muted)]">
        {CLASSIFIEDS_BROWSE_PASSAGE}{" "}
        <Link
          href={POST_CLASSIFIED_AD_CHENNAI_PATH}
          className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          How to post classified ads in Chennai
        </Link>
        .{" "}
        <Link
          href={chennaiClassifiedsHubPath({ category: "property" })}
          className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          Property ads
        </Link>{" "}
        cover sale, rent, plot, commercial, and buyer requirements.
      </p>

      <HubCommunityStrip businessVariant="directory" className="mt-8" />

      <ClassifiedsHubCategoryNav activeCategory={category} />

      <FeaturedJobsRail placement="classifieds_hub" className="mt-8" />

      {useDb ? (
        <section className="mt-8" aria-label="Open classified ads">
          <p className="text-xs font-medium tracking-wide text-[var(--muted)]">
            {total} open {total === 1 ? "ad" : "ads"} · snapshot {snapshotAsOf}
          </p>
          <div className="mt-4">
            <ClassifiedHubListingCards listings={listings} />
          </div>

          {(hasPrev || hasNext) && (
            <nav
              className="mt-8 flex items-center justify-between gap-4 text-sm"
              aria-label="Pagination"
            >
              {hasPrev ? (
                <Link
                  href={chennaiClassifiedsHubPath({
                    category,
                    page: pageNum - 1,
                  })}
                  className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  ← Previous
                </Link>
              ) : (
                <span />
              )}
              <span className="text-[var(--muted)]">
                Page {pageNum} of {totalPages}
              </span>
              {hasNext ? (
                <Link
                  href={chennaiClassifiedsHubPath({
                    category,
                    page: pageNum + 1,
                  })}
                  className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  Next →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </section>
      ) : (
        <p className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-8 text-sm leading-relaxed text-[var(--muted)]">
          {category
            ? `No open ${categoryMeta.label.toLowerCase()} ads right now. Browse `
            : "No classified ads are live yet. Check back soon, or use our "}
          {category ? (
            <>
              <Link
                href={CHENNAI_CLASSIFIEDS_HUB_PATH}
                className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
              >
                all Chennai classifieds
              </Link>{" "}
              or use our{" "}
            </>
          ) : null}
          <DeskPostAnchor
            kind={postKind}
            className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            {postLabel.toLowerCase()}
          </DeskPostAnchor>{" "}
          or message the desk on{" "}
          <Link
            href="/contact#classifieds"
            className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Contact
          </Link>
          .
        </p>
      )}

      <div className="mt-10">
        <PageAdSlot shape="rectangle" placement="classifieds_index" />
      </div>

      <AdvertisePanel variant="classifieds" layout="section" className="mt-8" />

      <InteriorCrossNav />
    </div>
  );
}
