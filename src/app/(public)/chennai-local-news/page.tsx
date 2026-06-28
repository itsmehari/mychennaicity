import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/ads/render-ad-slot";
import { AdvertisePanel } from "@/components/ads/advertise-panel";
import { HubCommunityStrip } from "@/components/community/hub-community-strip";
import { WhatsAppCommunityCta } from "@/components/community/whatsapp-community-cta";
import { NewspaperGrid, NewspaperMasthead } from "@/components/news/newspaper-layout";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  TopicSectionNav,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { listPublishedArticlesForChennai } from "@/domains/news";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
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
  try {
    all = await listPublishedArticlesForChennai(60);
  } catch {
    /* DATABASE_URL unset or DB unreachable */
  }

  if (!all.length) {
    return (
      <div className={interiorMainClassName}>
        <PageBreadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Chennai local news" }]}
        />
        <NewspaperMasthead />
        <div className="mt-6">
          <WhatsAppCommunityCta variant="compact" utmContent="news-hub" />
        </div>
        <TopicSectionNav />
        <AdvertisePanel variant="news" layout="section" className="mt-8" />
        <HubCommunityStrip businessVariant="news" />
        <h1 className="type-display mt-8 text-3xl text-[var(--foreground)] sm:text-4xl">
          Chennai local news
        </h1>
        <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed">
          Published stories will appear here as the desk files them. Have a tip?
          Send dates, locations, and links via{" "}
          <Link
            href="/contact#news"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Contact → Story tips
          </Link>
          .
        </p>
        <InteriorCrossNav />
      </div>
    );
  }

  const [lead, ...rest] = all;
  const featuredOnly = all.filter((a) => a.featured);
  const featuredSide = (featuredOnly.length > 0 ? featuredOnly : rest).slice(
    0,
    5,
  );

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Chennai local news" }]}
      />
      <NewspaperMasthead />
      <div className="mt-6">
        <WhatsAppCommunityCta variant="compact" utmContent="news-hub" />
      </div>
      <TopicSectionNav />
      <div className="mt-4 flex justify-center">
        <AdSlot slotId="content-top" size="728x90" />
      </div>
      <AdvertisePanel variant="news" layout="section" className="mt-8" />
      <HubCommunityStrip businessVariant="news" />
      <NewspaperGrid
        lead={lead}
        rest={rest}
        sidebar={
          <>
            <h2 className="type-display text-lg text-[var(--foreground)]">
              Featured stories
            </h2>
            <p className="type-lede mt-2 text-xs">
              Stories we&apos;re highlighting. Scroll the main page for everything else.
            </p>
            <ul className="mt-4 space-y-3">
              {featuredSide.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/chennai-local-news/${a.slug}`}
                    className="text-sm font-medium text-[var(--accent)] hover:underline"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/"
              className="mt-6 inline-block text-xs font-semibold text-[var(--muted)] hover:text-[var(--accent)]"
            >
              Back to home
            </Link>
            <p className="mt-6 border-t border-[var(--border)] pt-4 text-xs leading-relaxed text-[var(--muted)]">
              <span className="font-semibold text-[var(--foreground)]">
                Work in Chennai?
              </span>{" "}
              <Link
                href={CHENNAI_JOBS_HUB_PATH}
                className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
              >
                Jobs in Chennai
              </Link>
              {" · "}
              <Link
                href="/guides/chennai-tech-careers"
                className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
              >
                Reading job ads
              </Link>
            </p>
          </>
        }
      />
      <InteriorCrossNav />
    </div>
  );
}
