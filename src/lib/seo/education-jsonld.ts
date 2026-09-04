import { HSE_HUB_FAQ, faqToJsonLdItems, type EducationFaqItem } from "@/content/education/hse-faq";
import { EDUCATION_PAGES } from "@/content/education/index";
import { EDUCATION_HUB_PATH } from "@/content/education/paths";
import type { HseGroup } from "@/content/education/hse-groups";
import { HSE_CHOOSE_STEPS } from "@/content/education/hse-choose";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_PLACE_GRAPH } from "@/lib/seo/chennai-place";
import { buildFaqPageJsonLdFromItems } from "@/lib/seo/faq-jsonld";

const ABOUT_TN = {
  "@type": "Place" as const,
  name: "Tamil Nadu",
  containedInPlace: { "@type": "Country" as const, name: "India" },
};

function breadcrumbs(
  pageUrl: string,
  trail: { name: string; path: string }[],
) {
  const base = getSiteUrl();
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      ...trail.map((t, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: t.name,
        item: `${base}${t.path}`,
      })),
    ],
  };
}

export function buildEducationHubJsonLd() {
  const base = getSiteUrl();
  const pageUrl = `${base}${EDUCATION_HUB_PATH}`;
  const children = EDUCATION_PAGES.filter((p) => p.id !== "hub");

  const faq = buildFaqPageJsonLdFromItems(faqToJsonLdItems(HSE_HUB_FAQ), {
    pageUrl,
    fragment: "tn-plus-two-faq",
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Tamil Nadu Higher Secondary group selection guide",
        description:
          "Choose a Tamil Nadu Plus Two group after Class 10: current DGE codes 2502, 2503, 2702, 2708 and 2800-series humanities.",
        isPartOf: { "@id": `${base}/#website` },
        inLanguage: "en-IN",
        about: [CHENNAI_PLACE_GRAPH, ABOUT_TN],
        contentLocation: CHENNAI_PLACE_GRAPH,
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["[data-speakable=\"hub-aeo-answer\"]", "#tn-plus-two-hub-aeo-heading"],
        },
      },
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name: "TN Plus Two group guide",
        isPartOf: { "@id": `${pageUrl}#webpage` },
        inLanguage: "en-IN",
        about: ABOUT_TN,
      },
      breadcrumbs(pageUrl, [
        { name: "TN Plus Two", path: EDUCATION_HUB_PATH },
      ]),
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#groups`,
        name: "Higher Secondary group pages",
        numberOfItems: children.length,
        itemListElement: children.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.title,
          url: `${base}${p.path}`,
        })),
      },
      ...(faq ? [faq] : []),
    ],
  };
}

export function buildEducationGroupJsonLd(group: HseGroup) {
  const base = getSiteUrl();
  const path = `${EDUCATION_HUB_PATH}/groups/${group.code}`;
  const pageUrl = `${base}${path}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: group.seoTitle,
        description: group.seoDescription,
        isPartOf: { "@id": `${base}/#website` },
        inLanguage: "en-IN",
        about: ABOUT_TN,
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      breadcrumbs(pageUrl, [
        { name: "TN Plus Two", path: EDUCATION_HUB_PATH },
        { name: `Group ${group.code}`, path },
      ]),
    ],
  };
}

export function buildEducationExplainerJsonLd(opts: {
  path: string;
  name: string;
  description: string;
  faq?: EducationFaqItem[];
  faqFragment?: string;
  howTo?: boolean;
}) {
  const base = getSiteUrl();
  const pageUrl = `${base}${opts.path}`;
  const faq = opts.faq?.length
    ? buildFaqPageJsonLdFromItems(faqToJsonLdItems(opts.faq), {
        pageUrl,
        fragment: opts.faqFragment,
      })
    : null;

  const howTo = opts.howTo
    ? {
        "@type": "HowTo",
        name: "How to choose a Tamil Nadu Higher Secondary group",
        description: opts.description,
        step: HSE_CHOOSE_STEPS.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      }
    : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: opts.name,
        description: opts.description,
        isPartOf: { "@id": `${base}/#website` },
        inLanguage: "en-IN",
        about: ABOUT_TN,
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      breadcrumbs(pageUrl, [
        { name: "TN Plus Two", path: EDUCATION_HUB_PATH },
        { name: opts.name, path: opts.path },
      ]),
      ...(faq ? [faq] : []),
      ...(howTo ? [howTo] : []),
    ],
  };
}
