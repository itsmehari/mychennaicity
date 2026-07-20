import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/ads/render-ad-slot";
import { AdvertisePanel } from "@/components/ads/advertise-panel";
import { HubCommunityStrip } from "@/components/community/hub-community-strip";
import {
  NewsAreaStrip,
  NewsBreakingStrip,
  NewsCategoryNav,
  NewsFeaturedBand,
  NewsHubHero,
  NewsSidebar,
  NewsStoryCard,
  NewsTopicShelf,
  countStoriesPublishedToday,
  shouldShowBreaking,
} from "@/components/news/chennai-news-hub";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
} from "@/components/site/interior-chrome";
import { listPublicEventsForChennaiHub } from "@/domains/events";
import { listPublishedArticlesForChennai } from "@/domains/news";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai news today — local reporting";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Chennai-area news with short reports, local context, and what it means for you — from mychennaicity.in.",
  alternates: {
    canonical: `${getSiteUrl()}/chennai-local-news`,
    types: {
      "application/rss+xml": `${getSiteUrl()}/chennai-local-news/feed.xml`,
    },
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Chennai-area news with reports, local angle, and clear takeaways — mychennaicity.in.",
    url: `${getSiteUrl()}/chennai-local-news`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    description:
      "Chennai-area news — reports you can read in a few minutes.",
    images: ["/twitter-image"],
  },
};

/** Same as home: avoid shipping HTML baked at build without DATABASE_URL. */
export const dynamic = "force-dynamic";

export default async function ChennaiLocalNewsPage() {
  let all: Awaited<ReturnType<typeof listPublishedArticlesForChennai>> = [];
  let events: Awaited<ReturnType<typeof listPublicEventsForChennaiHub>> = [];
  try {
    [all, events] = await Promise.all([
      listPublishedArticlesForChennai(60),
      listPublicEventsForChennaiHub(3),
    ]);
  } catch {
    /* DATABASE_URL unset or DB unreachable */
  }

  if (!all.length) {
    return (
      <div className="mcc-news-hub-page">
      <div className="mcc-news-hub">
        <PageBreadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Chennai local news" }]}
        />
        <NewsHubHero latestPublishedAt={null} storyCountToday={0} />
        <NewsCategoryNav />
        <AdvertisePanel variant="news" layout="section" className="mt-8" />
        <HubCommunityStrip businessVariant="news" />
        <div className="mcc-news-empty">
          <h1>Chennai Local News</h1>
          <p>
            Published stories will appear here as the desk files them. Have a
            tip? Send dates, locations, and links via{" "}
            <Link
              href="/contact#news"
              className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Contact → Story tips
            </Link>
            .
          </p>
        </div>
        <InteriorCrossNav />
      </div>
      </div>
    );
  }

  const [lead, ...afterLead] = all;
  const secondary = afterLead.slice(0, 2);
  const latest = afterLead.slice(2, 14);
  const trending = (all.filter((a) => a.featured).length >= 3
    ? all.filter((a) => a.featured)
    : all
  ).slice(0, 5);

  const usedIds = new Set(
    [lead, ...secondary, ...latest].map((a) => a.id),
  );

  const byCategory = (cat: string) =>
    all.filter((a) => a.category === cat && !usedIds.has(a.id)).slice(0, 5);

  const civicShelf = byCategory("Chennai");
  const politicsShelf = byCategory("Politics");
  const consumerShelf = byCategory("Consumer");

  return (
    <div className="mcc-news-hub-page">
    <div className="mcc-news-hub">
      <PageBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Chennai local news" }]}
      />

      {shouldShowBreaking(lead) ? <NewsBreakingStrip article={lead} /> : null}

      <NewsHubHero
        latestPublishedAt={all[0]?.publishedAt ?? null}
        storyCountToday={countStoriesPublishedToday(all)}
      />

      <NewsCategoryNav />

      <div className="mt-2 flex justify-center">
        <AdSlot slotId="content-top" size="728x90" />
      </div>

      <NewsFeaturedBand lead={lead} secondary={secondary} />

      <div className="mcc-news-layout">
        <div className="mcc-news-layout__main">
          <div className="mcc-news-section-head">
            <h2>Latest Chennai News</h2>
          </div>
          <div className="mcc-news-latest">
            {latest.map((a) => (
              <NewsStoryCard key={a.id} article={a} />
            ))}
          </div>

          <AdvertisePanel variant="news" layout="section" className="mt-10" />
          <HubCommunityStrip businessVariant="news" />

          <NewsTopicShelf
            title="Civic Chennai"
            href="/chennai-local-news/topic/chennai"
            articles={civicShelf}
          />
          <NewsTopicShelf
            title="Chennai Politics"
            href="/chennai-local-news/topic/politics"
            articles={politicsShelf}
          />
          <NewsTopicShelf
            title="Consumer Watch"
            href="/chennai-local-news/topic/consumer"
            articles={consumerShelf}
          />
        </div>

        <NewsSidebar trending={trending} events={events} />
      </div>

      <NewsAreaStrip articles={all} />

      <InteriorCrossNav />
    </div>
    </div>
  );
}
