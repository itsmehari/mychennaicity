import type { Metadata } from "next";
import { Section } from "@/components/home/section";
import { HomeAreaMap } from "@/components/home/home-area-map";
import { HomeDbNewsSections } from "@/components/home/db-news-sections";
import {
  HomeSectionFrame,
  HomeSectionInnerRule,
} from "@/components/home/home-section-frame";
import {
  HomeCategoryMosaic,
  HomeCityPulse,
  HomeEventsFeatured,
  HomeHero,
  HomeJobsSpotlight,
  HomeMarketplaceTeaser,
  HomeSeasonalHub,
  HomeSponsoredRow,
  HomeStatsRibbon,
  HomeTrendingTags,
  HomeTrustStrip,
  HomeZoneShortcuts,
} from "@/components/home/home-content";
import { HomeCommunityBand } from "@/components/home/home-community-band";
import { HomeToolsStrip } from "@/components/home/home-tools-strip";
import { AdSlot } from "@/ads/render-ad-slot";
import { AdvertisePanel } from "@/components/ads/advertise-panel";
import { HomeJsonLd } from "@/components/seo/home-json-ld";
import { homeNewsBulletinCached } from "@/domains/news";
import { getSiteUrl } from "@/lib/env";
import { loadHomeFeedData } from "@/lib/home-feed";
import { fullSiteTitle } from "@/lib/seo/site-titles";

/**
 * Stay dynamic at the route so builds without `DATABASE_URL` never ship a frozen-empty bulletin.
 * Bulletin rows load from Neon on each request via `homeNewsBulletinCached` (no stale list cache).
 */
export const dynamic = "force-dynamic";

const titleSegment = "Chennai news, jobs, events & directory";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Chennai-area news, jobs, events, listings, and neighbourhood pages you can open from one home page.",
  alternates: { canonical: getSiteUrl() },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Explore Chennai by area: news, directory, jobs, and events.",
    url: getSiteUrl(),
    siteName: "mychennaicity.in",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    description:
      "Chennai local news, jobs, events, listings, and area pages.",
    images: ["/twitter-image"],
  },
};

export default async function Home() {
  const [bulletin, feed] = await Promise.all([
    homeNewsBulletinCached().catch((err) => {
      /* DATABASE_URL unset, schema drift (run db:migrate / db:push), or DB unreachable */
      console.error("[home] News query failed:", err);
      return { featured: [], latest: [] } as Awaited<
        ReturnType<typeof homeNewsBulletinCached>
      >;
    }),
    loadHomeFeedData(),
  ]);

  const { featured, latest } = bulletin;
  const editorPicks =
    featured.length > 0 ? featured : latest.slice(0, 3);

  return (
    <>
      <HomeJsonLd />
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:py-14">
        <HomeHero />
        <div className="mt-8 sm:mt-10">
          <AdvertisePanel variant="home" layout="hero" />
        </div>
        <HomeSectionFrame>
          <div className="mb-8 flex justify-center sm:mb-10">
            <AdSlot slotId="homepage-top" size="728x90" />
          </div>
          <HomeTrustStrip />
        </HomeSectionFrame>
        <HomeSectionFrame>
          <HomeToolsStrip />
        </HomeSectionFrame>
        <HomeSectionFrame>
          <div className="flex flex-col gap-12 sm:gap-14">
            <HomeCategoryMosaic />
            <HomeZoneShortcuts />
          </div>
        </HomeSectionFrame>
        <HomeSectionFrame id="areas">
          <Section
            eyebrow="Explore"
            title="Interactive Chennai Map Explorer"
            subtitle="Ward-level map from open civic datasets — hover areas, toggle overlays, and jump to macro hubs. Boundaries are editorial; confirm on official Greater Chennai Corporation materials for planning or legal use."
            action={{ href: "/directory", label: "Browse all listings" }}
          >
            <HomeAreaMap />
          </Section>
        </HomeSectionFrame>
        <HomeSectionFrame>
          <HomeStatsRibbon counts={feed.counts} />
        </HomeSectionFrame>
        <HomeSectionFrame>
          <HomeJobsSpotlight jobs={feed.jobs} total={feed.counts.jobs} />
          <HomeSectionInnerRule>
            <HomeEventsFeatured
              events={feed.events}
              total={feed.counts.events}
            />
          </HomeSectionInnerRule>
          <HomeSectionInnerRule>
            <HomeMarketplaceTeaser
              listings={feed.directory}
              total={feed.counts.directory}
            />
          </HomeSectionInnerRule>
        </HomeSectionFrame>
        <HomeSectionFrame>
          <HomeTrendingTags />
        </HomeSectionFrame>
        <HomeSectionFrame>
          <HomeDbNewsSections latest={latest} featured={editorPicks} />
        </HomeSectionFrame>
        <HomeSectionFrame>
          <HomeCityPulse />
        </HomeSectionFrame>
        <HomeSectionFrame>
          <HomeSeasonalHub />
        </HomeSectionFrame>
        <HomeSectionFrame>
          <HomeSponsoredRow />
        </HomeSectionFrame>
        <HomeSectionFrame className="border-b border-[var(--home-section-border)] pb-12 sm:pb-16">
          <div className="mb-10 flex justify-center sm:mb-12">
            <AdSlot slotId="homepage-mid" size="728x90" />
          </div>
          <HomeCommunityBand />
        </HomeSectionFrame>
      </div>
    </>
  );
}
