import type { JobPostingWithEmployer } from "@/domains/jobs";
import { CHENNAI_JOBS_HUB_FAQ } from "@/content/jobs/chennai-jobs-hub-faq";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH, chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";
import { CHENNAI_PLACE_GRAPH } from "@/lib/seo/chennai-place";
import { buildFaqPageJsonLdFromItems } from "@/lib/seo/faq-jsonld";

export function buildJobsHubJsonLd(rows: JobPostingWithEmployer[]) {
  const base = getSiteUrl();
  const pageUrl = `${base}${CHENNAI_JOBS_HUB_PATH}`;
  const slice = rows.slice(0, 40);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Jobs in Chennai — local openings & walk-ins",
      description:
        "Open jobs in Chennai: walk-ins, office roles, field jobs, fresher openings and internships across Greater Chennai on mychennaicity.in.",
      isPartOf: { "@id": `${base}/#website` },
      inLanguage: "en-IN",
      about: CHENNAI_PLACE_GRAPH,
      contentLocation: CHENNAI_PLACE_GRAPH,
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      mainEntity: { "@id": `${pageUrl}#joblist` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [
          ".mcc-jobs-hub__hero-title",
          ".mcc-jobs-hub__hero-lede",
          '[data-speakable="hub-aeo-answer"]',
          "#jobs-hub-faq",
        ],
      },
    },
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#collection`,
      url: pageUrl,
      name: "Jobs in Chennai",
      isPartOf: { "@id": `${pageUrl}#webpage` },
      inLanguage: "en-IN",
      about: CHENNAI_PLACE_GRAPH,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: base,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Jobs in Chennai",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#joblist`,
      name: "Open Chennai jobs",
      numberOfItems: slice.length,
      itemListElement: slice.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: r.job.title,
        url: `${base}${chennaiJobsDetailPath(r.job.slug)}`,
      })),
    },
  ];

  const faq = buildFaqPageJsonLdFromItems(CHENNAI_JOBS_HUB_FAQ, {
    pageUrl,
    fragment: "jobs-hub-faq",
  });
  if (faq) {
    const { "@context": _c, ...faqNode } = faq as Record<string, unknown>;
    graph.push({ ...faqNode, "@id": `${pageUrl}#faq` });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
