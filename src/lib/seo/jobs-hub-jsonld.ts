import type { JobPostingWithEmployer } from "@/domains/jobs";
import { getSiteUrl } from "@/lib/env";

export function buildJobsHubJsonLd(rows: JobPostingWithEmployer[]) {
  const base = getSiteUrl();
  const pageUrl = `${base}/jobs`;
  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": pageUrl,
    url: pageUrl,
    name: "Jobs in Greater Chennai",
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
      url: `${base}/jobs/${r.job.slug}`,
    })),
  };
  return { collectionPage, itemList };
}
