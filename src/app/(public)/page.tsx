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
import { HomeJsonLd } from "@/components/seo/home-json-ld";
import {
  featuredArticlesForHome,
  latestArticlesForHome,
} from "@/domains/news";
import { getSiteUrl } from "@/lib/env";

/** Load news from Neon on every request — build-time static HTML had empty bulletin when DATABASE_URL was missing at Vercel build. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Chennai-wide local news, jobs, events, listings, and interactive Greater Chennai area hubs.",
  alternates: { canonical: getSiteUrl() },
  openGraph: {
    title: "mychennaicity.in — Chennai news, jobs, events & listings",
    description:
      "Discover Greater Chennai by area: news, directory, jobs, and events.",
    url: getSiteUrl(),
    siteName: "mychennaicity.in",
    locale: "en_IN",
    type: "website",
  },
};

export default async function Home() {
  let featured: Awaited<ReturnType<typeof featuredArticlesForHome>> = [];
  let latest: Awaited<ReturnType<typeof latestArticlesForHome>> = [];
  try {
    featured = await featuredArticlesForHome(3);
    latest = await latestArticlesForHome(10);
  } catch {
    /* DATABASE_URL unset or DB unreachable — home still renders */
  }

  const editorPicks =
    featured.length > 0 ? featured : latest.slice(0, 3);

  return (
    <>
      <HomeJsonLd />
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:py-14">
        <HomeHero />
        <HomeSectionFrame>
          <HomeTrustStrip />
        </HomeSectionFrame>
        <HomeSectionFrame>
          <div className="flex flex-col gap-12 sm:gap-14">
            <HomeCategoryMosaic />
            <HomeZoneShortcuts />
          </div>
        </HomeSectionFrame>
        <HomeSectionFrame id="areas">
          <Section
            eyebrow="Neighbourhoods"
            title="Greater Chennai area map"
            subtitle="Click a tile to open its hub — listings and filters wire in as the database goes live."
            action={{ href: "/directory", label: "Browse all listings" }}
          >
            <HomeAreaMap />
          </Section>
        </HomeSectionFrame>
        <HomeSectionFrame>
          <HomeStatsRibbon />
        </HomeSectionFrame>
        <HomeSectionFrame>
          <HomeJobsSpotlight />
          <HomeSectionInnerRule>
            <HomeEventsFeatured />
          </HomeSectionInnerRule>
          <HomeSectionInnerRule>
            <HomeMarketplaceTeaser />
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
          <HomeCommunityBand />
        </HomeSectionFrame>
      </div>
    </>
  );
}
