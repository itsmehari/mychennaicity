import type { JobPostingWithEmployer } from "@/domains/jobs";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH, chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";

export function buildJobsHubJsonLd(rows: JobPostingWithEmployer[]) {
  const base = getSiteUrl();
  const pageUrl = `${base}${CHENNAI_JOBS_HUB_PATH}`;
  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": pageUrl,
    url: pageUrl,
    name: "Jobs in Chennai",
    isPartOf: { "@id": `${base}/#website` },
    inLanguage: "en-IN",
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: rows.length,
    itemListElement: rows.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.job.title,
      url: `${base}${chennaiJobsDetailPath(r.job.slug)}`,
    })),
  };
  return { collectionPage, itemList };
}
