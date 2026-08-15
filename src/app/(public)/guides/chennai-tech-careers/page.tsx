import type { Metadata } from "next";
import Link from "next/link";
import { AdvertisePanel } from "@/components/ads";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import { HubCommunityStrip } from "@/components/community/hub-community-strip";
import {
  ChennaiJobsGuideHero,
  ChennaiJobsGuideResources,
} from "@/components/jobs/chennai-jobs-guide-parts";
import { ChennaiJobsHubSafety } from "@/components/jobs/chennai-jobs-hub-sections";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai tech jobs — reading job ads";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Simple guide for anyone looking for Chennai tech work: what job ads really mean on hybrid, pay, and safety. Links to our jobs-in-Chennai page.",
  alternates: {
    canonical: `${getSiteUrl()}/guides/chennai-tech-careers`,
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Straight talk on Chennai tech job ads — hybrid rules, pay, and how to apply safely.",
    url: `${getSiteUrl()}/guides/chennai-tech-careers`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    description:
      "Chennai tech jobs: reading ads, hybrid clauses, and our local list.",
    images: ["/twitter-image"],
  },
};

export default function ChennaiTechCareersGuidePage() {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides" },
          { label: "Chennai tech careers" },
        ]}
      />

      <ChennaiJobsGuideHero />

      <HubCommunityStrip businessVariant="jobs" className="mt-6" />

      <article className="prose prose-sm mcc-jobs-guide__article text-[var(--muted)] prose-p:leading-relaxed prose-headings:text-[var(--foreground)] prose-strong:text-[var(--foreground)]">
        <h2>Why “Chennai” in the headline matters</h2>
        <p>
          Candidates type <em>Chennai jobs</em>, not “Greater Chennai jobs.” The
          metro (OMR, GST Road, Sriperumbudur orbit) is implied. Good employers
          still spell out base office, hybrid cadence, and whether Tamil Nadu
          payroll is required — read for that in the first screen of the JD.
        </p>

        <h2>Hybrid and “Bengaluru rotation” clauses</h2>
        <p>
          Many Chennai listings allow remote days but anchor legal employment
          in Tamil Nadu. Watch for mandatory travel to another city, on-call
          windows in IST, and whether the role is tied to a specific campus
          (Guindy, TIDEL, Sholinganallur, etc.).
        </p>

        <h2>Salary bands and equity</h2>
        <p>
          India tech compensation moved quickly post-2024. When a post
          discloses INR ranges in structured data, treat it as directional;
          final offers depend on level, stock, and competing offers. If a
          listing has no numbers, use public benchmarks and peer networks — not
          random DMs from unverified recruiters.
        </p>

        <h2>What “checked by us” means</h2>
        <p>
          When we can, we mark an employer as <strong>checked by us</strong> after
          a basic look at the company. That is not a guarantee — still apply only
          on the official careers site or form linked from the post, and never pay
          random people a “processing fee.”
        </p>

        <h2>More reading</h2>
        <p>
          Hiring and the wider economy are on the{" "}
          <Link
            href="/chennai-local-news/topic/economy"
            className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Economy
          </Link>{" "}
          section of Chennai local news. For current openings, see{" "}
          <Link
            href={CHENNAI_JOBS_HUB_PATH}
            className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            jobs in Chennai
          </Link>
          .
        </p>
      </article>

      <ChennaiJobsHubSafety />
      <ChennaiJobsGuideResources />

      <AdvertisePanel
        variant="jobs"
        layout="section"
        className="mt-10"
        source="guides_tech_careers"
      />

      <div className="mt-12">
        <PageAdSlot shape="rectangle" placement="tech_careers" />
      </div>

      <InteriorCrossNav />
    </div>
  );
}
