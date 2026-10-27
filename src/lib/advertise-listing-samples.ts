import type { ListingPitchSample } from "@/content/advertise-listings";
import { listOpenClassifiedListingsForChennaiHub } from "@/domains/classifieds";
import { listOpenJobPostingsForChennaiHub } from "@/domains/jobs";
import { chennaiClassifiedDetailPath } from "@/lib/routes/chennai-classifieds";
import { chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";

export async function loadJobPitchSamples(): Promise<ListingPitchSample[]> {
  try {
    const rows = await listOpenJobPostingsForChennaiHub(3, 0);
    return rows.map(({ job, employer }) => ({
      href: chennaiJobsDetailPath(job.slug),
      title: job.title,
      meta: [employer.name, job.locationLabel].filter(Boolean).join(" · "),
    }));
  } catch {
    return [];
  }
}

export async function loadPropertyPitchSamples(): Promise<ListingPitchSample[]> {
  try {
    const rows = await listOpenClassifiedListingsForChennaiHub(3, 0, "property");
    return rows.map((row) => ({
      href: chennaiClassifiedDetailPath(row.slug),
      title: row.title,
      meta: row.locationLabel?.trim() || "Chennai",
    }));
  } catch {
    return [];
  }
}
