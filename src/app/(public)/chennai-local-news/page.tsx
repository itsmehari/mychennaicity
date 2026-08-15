import type { Metadata } from "next";
import Link from "next/link";
import { AdvertisePanel } from "@/components/ads/advertise-panel";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
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
import { ChennaiNewsHubFaq } from "@/components/news/chennai-news-hub-faq";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
} from "@/components/site/interior-chrome";
import { listPublicEventsForChennaiHub } from "@/domains/events";
import { listPublishedArticlesForChennai } from "@/domains/news";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { buildNewsHubJsonLdGraph } from "@/lib/seo/news-hub-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const PAGE_PATH = "/chennai-local-news";
const titleSegment = "Chennai news today — local civic & neighbourhood reports";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  const canonical = `${base}${PAGE_PATH}`;

  let latestTitle: string | null = null;
  try {
    const rows = await listPublishedArticlesForChennai(3);
    latestTitle = rows[0]?.title?.trim() || null;
  } catch {
    latestTitle = null;
  }

  const description = latestTitle
    ? `Chennai local news: civic updates, neighbourhood developments, transport and consumer reports for Greater Chennai. Latest: ${latestTitle}. Browse Adyar, OMR, Anna Nagar, T. Nagar and more on mychennaicity.in.`
    : "Chennai local news: civic updates, neighbourhood developments, government announcements and public-interest reports for Greater Chennai on mychennaicity.in.";

  const ogDescription = latestTitle
    ? `Latest Chennai civic and neighbourhood reporting on mychennaicity.in — ${latestTitle}`
    : "Chennai-area news with local context and clear takeaways — mychennaicity.in.";

  return {
    title: titleSegment,
    description,
    alternates: {
      canonical,
      types: {
        "application/rss+xml": `${base}${PAGE_PATH}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: fullSiteTitle(titleSegment),
      description: ogDescription,
      url: canonical,
      type: "website",
      locale: "en_IN",
      siteName: "mychennaicity.in",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullSiteTitle(titleSegment),
      description:
        "Chennai civic and neighbourhood news — reports you can read in a few minutes.",
      images: ["/twitter-image"],
    },
    other: { ...CHENNAI_GEO_META },
  };
}

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

  const hubLd = all.length > 0 ? buildNewsHubJsonLdGraph(all) : null;

  if (!all.length) {
    return (
      <div className="mcc-news-hub-page">
        <div className="mcc-news-hub">
          <PageBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Chennai local news" },
            ]}
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
          <ChennaiNewsHubFaq />
          <InteriorCrossNav />
        </div>
      </div>
    );
  }

  const [lead, ...afterLead] = all;
  const secondary = afterLead.slice(0, 2);
  const latest = afterLead.slice(2, 14);
  const trending = (
    all.filter((a) => a.featured).length >= 3
      ? all.filter((a) => a.featured)
      : all
  ).slice(0, 5);

  const usedIds = new Set([lead, ...secondary, ...latest].map((a) => a.id));

  const byCategory = (cat: string) =>
    all.filter((a) => a.category === cat && !usedIds.has(a.id)).slice(0, 5);

  const civicShelf = byCategory("Chennai");
  const politicsShelf = byCategory("Politics");
  const consumerShelf = byCategory("Consumer");

  return (
    <div className="mcc-news-hub-page">
      {hubLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hubLd) }}
        />
      ) : null}
      <div className="mcc-news-hub">
        <PageBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Chennai local news" },
          ]}
        />

        {shouldShowBreaking(lead) ? <NewsBreakingStrip article={lead} /> : null}

        <NewsHubHero
          latestPublishedAt={all[0]?.publishedAt ?? null}
          storyCountToday={countStoriesPublishedToday(all)}
        />

        <NewsCategoryNav />

        <NewsFeaturedBand lead={lead} secondary={secondary} />

        <div className="mt-8">
          <PageAdSlot shape="rectangle" placement="news_hub_mid" />
        </div>

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

        <ChennaiNewsHubFaq />

        {/* Crawlable index of stories shown on this hub (beyond the featured grid). */}
        <ul className="sr-only" aria-label="All Chennai local news on this page">
          {all.map((a) => (
            <li key={`crawl-${a.id}`}>
              <a href={`/chennai-local-news/${a.slug}`}>{a.title}</a>
            </li>
          ))}
        </ul>

        <InteriorCrossNav />
      </div>
    </div>
  );
}
