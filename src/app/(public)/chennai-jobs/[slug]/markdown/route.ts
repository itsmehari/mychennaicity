import { notFound } from "next/navigation";
import { getOpenJobPostingWithEmployerBySlug } from "@/domains/jobs";
import { getSiteUrl } from "@/lib/env";
import { isTamilJobSlug, jobEnglishSlug, jobTamilSlug } from "@/lib/jobs/job-language";
import { buildChennaiJobsHubCard } from "@/lib/jobs/chennai-jobs-hub-helpers";
import { chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";
import { buildJobMarkdown, markdownResponse } from "@/lib/seo/content-markdown";
import { formatIstDate } from "@/lib/seo/llms-live-catalog";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const row = await getOpenJobPostingWithEmployerBySlug(slug);
  if (!row) notFound();

  const card = buildChennaiJobsHubCard(row);
  const origin = getSiteUrl().replace(/\/$/, "");
  const htmlPath = chennaiJobsDetailPath(row.job.slug);
  const canonical = `${origin}${htmlPath}`;
  const tamil = isTamilJobSlug(row.job.slug);
  const twinSlug = tamil ? jobEnglishSlug(row.job.slug) : jobTamilSlug(row.job.slug);
  const twin = tamil ? null : await getOpenJobPostingWithEmployerBySlug(twinSlug);

  return markdownResponse(
    buildJobMarkdown({
      title: row.job.title,
      canonical,
      markdownUrl: `${canonical}/markdown`,
      employer: card.employerName,
      location: card.location,
      roleType: card.employmentType,
      workMode: card.workMode,
      pay: card.compensation,
      openings: row.job.openingsCount,
      applyBy: row.job.validThrough ? formatIstDate(row.job.validThrough) : null,
      applyUrl: row.job.applicationUrl,
      tamilUrl: twin ? `${origin}${chennaiJobsDetailPath(twin.job.slug)}` : null,
      body: row.job.body,
      origin,
    }),
  );
}
