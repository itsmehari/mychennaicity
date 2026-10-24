import {
  activeFeaturedJobCampaigns,
  formatFeaturedUntilLabel,
  featuredJobsPinnedThrough,
  type FeaturedJobCampaign,
} from "@/content/jobs/featured-job-campaigns";
import { getOpenJobPostingWithEmployerBySlug } from "@/domains/jobs";
import { formatJobCompensation } from "@/lib/jobs/format-compensation";
import { jobEnglishSlug, jobTamilSlug } from "@/lib/jobs/job-language";
import { chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";

export type FeaturedJobCard = {
  slug: string;
  href: string;
  title: string;
  company: string;
  location: string;
  pay: string | null;
  openings: number;
  context: string;
};

export type FeaturedJobsRailModel = {
  cards: FeaturedJobCard[];
  untilLabel: string;
};

function campaignSlug(campaign: FeaturedJobCampaign, language: "en" | "ta"): string {
  return language === "ta" ? jobTamilSlug(campaign.englishSlug) : campaign.englishSlug;
}

export async function loadFeaturedJobsRail(options: {
  language?: "en" | "ta";
  areaHubSlug?: string;
  excludeSlug?: string;
  now?: Date;
}): Promise<FeaturedJobsRailModel | null> {
  const language = options.language ?? "en";
  const now = options.now ?? new Date();
  const until = featuredJobsPinnedThrough(now);
  if (!until) return null;

  const excludeEnglish = options.excludeSlug
    ? jobEnglishSlug(options.excludeSlug)
    : null;

  const campaigns = activeFeaturedJobCampaigns(now).filter((campaign) => {
    if (excludeEnglish && campaign.englishSlug === excludeEnglish) return false;
    if (
      options.areaHubSlug &&
      !campaign.areaHubSlugs.includes(options.areaHubSlug)
    ) {
      return false;
    }
    return true;
  });
  if (campaigns.length === 0) return null;

  const cards: FeaturedJobCard[] = [];
  for (const campaign of campaigns) {
    const slug = campaignSlug(campaign, language);
    let row: Awaited<ReturnType<typeof getOpenJobPostingWithEmployerBySlug>>;
    try {
      row = await getOpenJobPostingWithEmployerBySlug(slug);
    } catch (err) {
      console.error("[featured-jobs] lookup failed:", slug, err);
      continue;
    }
    if (!row) continue;
    const { job, employer } = row;
    const pay =
      job.salaryDisclosed && job.salaryMin != null && job.salaryMax != null
        ? formatJobCompensation(job.salaryMin, job.salaryMax)
        : null;
    cards.push({
      slug: job.slug,
      href: chennaiJobsDetailPath(job.slug),
      title: job.title,
      company: employer.name,
      location: job.locationLabel?.trim() || "Chennai",
      pay,
      openings: job.openingsCount,
      context: language === "ta" ? campaign.contextTa : campaign.contextEn,
    });
  }

  if (cards.length === 0) return null;
  return {
    cards,
    untilLabel: formatFeaturedUntilLabel(until, language),
  };
}
