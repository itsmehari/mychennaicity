import { JOB_CATEGORIES, jobCategoryBySlug, jobMatchesCategory } from "@/content/jobs/job-categories";
import { JOB_LOCALITIES, jobLocalityBySlug, type JobLocality } from "@/content/jobs/job-localities";
import { summarizeJobsMatchingLocationPatterns } from "@/domains/areas/queries";
import { jobSliceIsIndexable } from "@/lib/jobs/job-slice";
import {
  chennaiJobsCategoryPath,
  chennaiJobsLocationPath,
} from "@/lib/routes/chennai-jobs";
import {
  listOpenJobPostingsForChennaiHub,
  type JobPostingWithEmployer,
} from "./queries";

export type JobLanding = {
  path: string;
  lastModified: Date;
};

function latestUpdate(rows: JobPostingWithEmployer[], fallback: Date): Date {
  return rows.reduce((latest, row) => {
    const stamp = row.job.updatedAt;
    return stamp > latest ? stamp : latest;
  }, fallback);
}

export async function loadLocalityLanding(slug: string): Promise<{
  locality: JobLocality;
  rows: JobPostingWithEmployer[];
  total: number;
  employers: number;
  indexable: boolean;
} | null> {
  const locality = jobLocalityBySlug(slug);
  if (!locality) return null;
  const summary = await summarizeJobsMatchingLocationPatterns(
    locality.patterns,
    24,
  );
  return {
    locality,
    rows: summary.rows,
    total: summary.total,
    employers: summary.employers,
    indexable: jobSliceIsIndexable(summary.total, summary.employers),
  };
}

export async function loadCategoryLanding(slug: string): Promise<{
  category: (typeof JOB_CATEGORIES)[number];
  rows: JobPostingWithEmployer[];
  total: number;
  employers: number;
  indexable: boolean;
} | null> {
  const category = jobCategoryBySlug(slug);
  if (!category) return null;
  const open = await listOpenJobPostingsForChennaiHub(500, 0);
  const matched = open.filter((row) =>
    jobMatchesCategory(category.slug, {
      title: row.job.title,
      body: row.job.body,
      employmentType: row.job.employmentType,
    }),
  );
  const employers = new Set(matched.map((row) => row.employer.id)).size;
  return {
    category,
    rows: matched.slice(0, 24),
    total: matched.length,
    employers,
    indexable: jobSliceIsIndexable(matched.length, employers),
  };
}

export async function listIndexableJobLandings(
  now = new Date(),
): Promise<JobLanding[]> {
  const landings: JobLanding[] = [];
  for (const locality of JOB_LOCALITIES) {
    const summary = await summarizeJobsMatchingLocationPatterns(
      locality.patterns,
      1,
    );
    if (!jobSliceIsIndexable(summary.total, summary.employers)) continue;
    landings.push({
      path: chennaiJobsLocationPath(locality.slug),
      lastModified: latestUpdate(summary.rows, now),
    });
  }

  const open = await listOpenJobPostingsForChennaiHub(500, 0);
  for (const category of JOB_CATEGORIES) {
    const matched = open.filter((row) =>
      jobMatchesCategory(category.slug, {
        title: row.job.title,
        body: row.job.body,
        employmentType: row.job.employmentType,
      }),
    );
    const employers = new Set(matched.map((row) => row.employer.id)).size;
    if (!jobSliceIsIndexable(matched.length, employers)) continue;
    landings.push({
      path: chennaiJobsCategoryPath(category.slug),
      lastModified: latestUpdate(matched, now),
    });
  }
  return landings;
}
