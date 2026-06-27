import type { Metadata } from "next";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import {
  countOpenJobPostingsForChennaiHub,
  listOpenJobPostingsForChennaiHub,
} from "@/domains/jobs";
import { countOpenJobSeekerPostsForChennaiHub } from "@/domains/job-seekers";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { buildJobsHubJsonLd } from "@/lib/seo/jobs-hub-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import { ChennaiJobsPartnerBanner } from "@/components/ads/chennai-jobs-partner-banner";
import { HubCommunityStrip } from "@/components/community/hub-community-strip";
import { ChennaiJobsHubTabs } from "@/components/jobs/chennai-jobs-hub-tabs";
import { ChennaiJobsHubHero } from "@/components/jobs/chennai-jobs-hub-hero";
import { ChennaiJobsHubListing } from "@/components/jobs/chennai-jobs-hub-listing";
import {
  ChennaiJobsHubEmployerCta,
  ChennaiJobsHubResources,
  ChennaiJobsHubSafety,
} from "@/components/jobs/chennai-jobs-hub-sections";
import {
  buildChennaiJobsHubCards,
  countFresherJobs,
  countWalkInJobs,
} from "@/lib/jobs/chennai-jobs-hub-helpers";

const hubTitleSegment = "Jobs in Chennai";

const ALL_JOBS_LIMIT = 200;

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  const hubUrl = `${base}${CHENNAI_JOBS_HUB_PATH}`;
  let total = 0;
  try {
    total = await countOpenJobPostingsForChennaiHub();
  } catch {
    total = 0;
  }
  const hasLive = total > 0;
  const description = hasLive
    ? `${total} open jobs in Chennai — curated local openings, walk-ins, office roles and internships on mychennaicity.in. Read the full post here; apply only on the employer’s own page or form.`
    : "Jobs in Chennai: a community job notice board for local hiring, walk-ins, internships and office roles. Employers can list for free — always read the ad and apply on the employer’s site.";

  const canonical = hubUrl;

  return {
    title: hubTitleSegment,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullSiteTitle(hubTitleSegment),
      description: hasLive
        ? `${total} open roles in Chennai — double-check every detail on the company’s site before you apply.`
        : "A Chennai-focused job board — confirm on the employer’s site before you apply.",
      url: canonical,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullSiteTitle(hubTitleSegment),
      description: hasLive
        ? `${total} jobs in Chennai — confirm on the employer’s site before you apply.`
        : "Chennai job listings — confirm on the employer’s site.",
      images: ["/twitter-image"],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function ChennaiJobsHubPage() {
  let total = 0;
  let seekingTotal = 0;
  let dbJobs: Awaited<ReturnType<typeof listOpenJobPostingsForChennaiHub>> =
    [];

  try {
    total = await countOpenJobPostingsForChennaiHub();
    seekingTotal = await countOpenJobSeekerPostsForChennaiHub();
    dbJobs = await listOpenJobPostingsForChennaiHub(ALL_JOBS_LIMIT, 0);
  } catch {
    dbJobs = [];
    total = 0;
    seekingTotal = 0;
  }

  const useDb = total > 0;
  const hubLd = useDb ? buildJobsHubJsonLd(dbJobs) : null;
  const hubCards = buildChennaiJobsHubCards(dbJobs);

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
        items={[{ label: "Home", href: "/" }, { label: "Jobs in Chennai" }]}
      />

      <ChennaiJobsHubHero totalJobs={total} hasLiveJobs={useDb} />

      <ChennaiJobsHubTabs
        active="openings"
        openingsCount={total}
        seekingCount={seekingTotal}
      />

      <HubCommunityStrip businessVariant="jobs" className="mt-6" />

      <ChennaiJobsHubListing
        cards={hubCards}
        totalOpen={total}
        fresherCount={countFresherJobs(hubCards)}
        walkInCount={countWalkInJobs(hubCards)}
      />

      {useDb ? (
        <ul className="sr-only" aria-label="All Chennai job listings">
          {hubCards.map((card) => (
            <li key={card.id}>
              <a href={card.href}>{card.title}</a>
            </li>
          ))}
        </ul>
      ) : null}

      <ChennaiJobsHubSafety />
      <ChennaiJobsHubEmployerCta />
      <ChennaiJobsHubResources />

      <ChennaiJobsPartnerBanner slotId="jobs-index-mid" className="mt-14" />

      <InteriorCrossNav />
    </div>
  );
}
