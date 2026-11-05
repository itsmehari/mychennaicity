import { getSiteUrl } from "@/lib/env";
import { CHENNAI_PLACE_GRAPH } from "@/lib/seo/chennai-place";
import { buildFaqPageJsonLdFromItems, type FaqItem } from "@/lib/seo/faq-jsonld";

export function buildExamTimetableJsonLd(input: {
  path: string;
  title: string;
  description: string;
  crumbs: { name: string; path: string }[];
  faq: FaqItem[];
}) {
  const base = getSiteUrl().replace(/\/$/, "");
  const pageUrl = `${base}${input.path}`;
  const faq = buildFaqPageJsonLdFromItems(input.faq, {
    pageUrl,
    fragment: "exam-faq",
  });
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: input.title,
        description: input.description,
        isPartOf: { "@id": `${base}/#website` },
        inLanguage: "en-IN",
        about: [
          CHENNAI_PLACE_GRAPH,
          { "@type": "CollegeOrUniversity", name: "University of Madras", url: "https://www.unom.ac.in/" },
        ],
        contentLocation: CHENNAI_PLACE_GRAPH,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["[data-speakable=\"exam-answer\"]"],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: base },
          ...input.crumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 2,
            name: crumb.name,
            item: `${base}${crumb.path}`,
          })),
        ],
      },
      ...(faq ? [faq] : []),
    ],
  };
}
