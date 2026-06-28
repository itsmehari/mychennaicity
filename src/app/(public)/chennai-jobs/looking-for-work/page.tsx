import type { Metadata } from "next";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { ChennaiJobsHubTabs } from "@/components/jobs/chennai-jobs-hub-tabs";
import { AdvertisePanel } from "@/components/ads/advertise-panel";
import { HubCommunityStrip } from "@/components/community/hub-community-strip";
import { ChennaiSeekersHubHero } from "@/components/jobs/chennai-seekers-hub-hero";
import { ChennaiSeekersHubListing } from "@/components/jobs/chennai-seekers-hub-listing";
import {
  ChennaiSeekersHubEmployerCta,
  ChennaiSeekersHubResources,
  ChennaiSeekersHubSafety,
} from "@/components/jobs/chennai-seekers-hub-sections";
import { countOpenJobPostingsForChennaiHub } from "@/domains/jobs";
import {
  countOpenJobSeekerPostsForChennaiHub,
  listOpenJobSeekerPostsForChennaiHub,
} from "@/domains/job-seekers";
import { getSiteUrl } from "@/lib/env";
import {
  CHENNAI_JOBS_HUB_PATH,
  CHENNAI_JOBS_LOOKING_PATH,
} from "@/lib/routes/chennai-jobs";
import { buildJobSeekersHubJsonLd } from "@/lib/seo/job-seeker-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import {
  buildChennaiSeekerHubCards,
  countAccommodationSeekers,
  countImmediateSeekers,
} from "@/lib/jobs/chennai-seekers-hub-helpers";

const hubTitleSegment = "Looking for work in Chennai";

const ALL_SEEKERS_LIMIT = 200;

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  const hubUrl = `${base}${CHENNAI_JOBS_LOOKING_PATH}`;
  let total = 0;
  try {
    total = await countOpenJobSeekerPostsForChennaiHub();
  } catch {
    total = 0;
  }
  const description =
    total > 0
      ? `${total} people in Chennai looking for work — watchmen, caretakers, household help, and more. Employers can reach out directly on mychennaicity.in.`
      : "Chennai residents posting that they are available for hire — watchman, caretaker, and household roles with stay when needed.";

  return {
    title: hubTitleSegment,
    description,
    alternates: { canonical: hubUrl },
    openGraph: {
      title: fullSiteTitle(hubTitleSegment),
      description,
      url: hubUrl,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullSiteTitle(hubTitleSegment),
      description,
      images: ["/twitter-image"],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function ChennaiJobsLookingForWorkPage() {
  let openingsTotal = 0;
  let total = 0;
  let posts: Awaited<ReturnType<typeof listOpenJobSeekerPostsForChennaiHub>> =
    [];

  try {
    openingsTotal = await countOpenJobPostingsForChennaiHub();
    total = await countOpenJobSeekerPostsForChennaiHub();
    posts = await listOpenJobSeekerPostsForChennaiHub(ALL_SEEKERS_LIMIT, 0);
  } catch {
    posts = [];
    total = 0;
    openingsTotal = 0;
  }

  const useDb = total > 0;
  const hubLd = useDb ? buildJobSeekersHubJsonLd(posts) : null;
  const hubCards = buildChennaiSeekerHubCards(posts);

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
          { label: "Jobs in Chennai", href: CHENNAI_JOBS_HUB_PATH },
          { label: "Looking for work" },
        ]}
      />

      <ChennaiSeekersHubHero totalProfiles={total} hasLiveProfiles={useDb} />

      <ChennaiJobsHubTabs
        active="seeking"
        openingsCount={openingsTotal}
        seekingCount={total}
      />

      <AdvertisePanel
        variant="jobs"
        layout="section"
        className="mt-8"
        source="jobs_seeking_hub"
      />

      <HubCommunityStrip businessVariant="jobs" className="mt-6" />

      <ChennaiSeekersHubListing
        cards={hubCards}
        totalProfiles={total}
        accommodationCount={countAccommodationSeekers(hubCards)}
        immediateCount={countImmediateSeekers(hubCards)}
      />

      {useDb ? (
        <ul className="sr-only" aria-label="All Chennai seeker profiles">
          {hubCards.map((card) => (
            <li key={card.id}>
              <a href={card.href}>{card.title}</a>
            </li>
          ))}
        </ul>
      ) : null}

      <ChennaiSeekersHubSafety />
      <ChennaiSeekersHubEmployerCta />
      <ChennaiSeekersHubResources />

      <InteriorCrossNav />
    </div>
  );
}
