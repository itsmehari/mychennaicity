import {
  GOVERNMENT_HUB_FAQ,
  faqToJsonLdItems,
  type GovernmentFaqItem,
} from "@/content/government/faq";
import { GOVERNMENT_PAGES } from "@/content/government/index";
import {
  GOVERNMENT_HUB_PATH,
  GOVERNMENT_HUB_TA_PATH,
} from "@/content/government/paths";
import type { MinisterRow } from "@/content/government/ministers-may-2026";
import { ministerDisplayName } from "@/content/government/ministers-may-2026";
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

export function buildGovernmentHubJsonLd(locale: "en" | "ta" = "en") {
  const base = getSiteUrl();
  const hubPath = locale === "ta" ? GOVERNMENT_HUB_TA_PATH : GOVERNMENT_HUB_PATH;
  const pageUrl = `${base}${hubPath}`;
  const children = GOVERNMENT_PAGES.filter(
    (p) => p.wave !== "E" || locale === "ta",
  ).filter((p) => p.id !== "hub" && p.id !== "hub-ta");

  const faq = buildFaqPageJsonLdFromItems(
    faqToJsonLdItems(GOVERNMENT_HUB_FAQ),
    { pageUrl, fragment: "tn-council-faq" },
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name:
          locale === "ta"
            ? "தமிழ்நாடு அமைச்சரவை — portfolios"
            : "Tamil Nadu Council of Ministers — portfolios",
        description:
          "35 ministers and portfolios as of May 2026 — Lok Bhavan Press Release No. 40.",
        isPartOf: { "@id": `${base}/#website` },
        inLanguage: locale === "ta" ? "ta-IN" : "en-IN",
        about: [CHENNAI_PLACE_GRAPH, ABOUT_TN],
        contentLocation: CHENNAI_PLACE_GRAPH,
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [
            '[data-speakable="hub-aeo-answer"]',
            "#tn-council-hub-aeo-heading",
          ],
        },
      },
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        url: pageUrl,
        name: "TN Council of Ministers desk",
        isPartOf: { "@id": `${pageUrl}#webpage` },
        inLanguage: locale === "ta" ? "ta-IN" : "en-IN",
        about: ABOUT_TN,
      },
      breadcrumbs(pageUrl, [
        {
          name: locale === "ta" ? "அமைச்சரவை" : "Council of Ministers",
          path: hubPath,
        },
      ]),
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#ministers`,
        name: "Minister pages",
        numberOfItems: children.length,
        itemListElement: children.slice(0, 40).map((p, i) => ({
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

export function buildGovernmentMinisterJsonLd(
  minister: MinisterRow,
  locale: "en" | "ta" = "en",
) {
  const base = getSiteUrl();
  const path =
    locale === "ta"
      ? `${GOVERNMENT_HUB_TA_PATH}/ministers/${minister.slug}`
      : `${GOVERNMENT_HUB_PATH}/ministers/${minister.slug}`;
  const pageUrl = `${base}${path}`;
  const name = ministerDisplayName(minister);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${name} — ${minister.ministryTitle}`,
        description: minister.portfolios.join("; "),
        isPartOf: { "@id": `${base}/#website` },
        inLanguage: locale === "ta" ? "ta-IN" : "en-IN",
        about: ABOUT_TN,
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      breadcrumbs(pageUrl, [
        {
          name: locale === "ta" ? "அமைச்சரவை" : "Council of Ministers",
          path: locale === "ta" ? GOVERNMENT_HUB_TA_PATH : GOVERNMENT_HUB_PATH,
        },
        { name, path },
      ]),
    ],
  };
}

export function buildGovernmentExplainerJsonLd(opts: {
  path: string;
  name: string;
  description: string;
  faq?: GovernmentFaqItem[];
  faqFragment?: string;
  locale?: "en" | "ta";
}) {
  const base = getSiteUrl();
  const pageUrl = `${base}${opts.path}`;
  const locale = opts.locale ?? "en";
  const faq = opts.faq?.length
    ? buildFaqPageJsonLdFromItems(faqToJsonLdItems(opts.faq), {
        pageUrl,
        fragment: opts.faqFragment,
      })
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
        inLanguage: locale === "ta" ? "ta-IN" : "en-IN",
        about: ABOUT_TN,
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      breadcrumbs(pageUrl, [
        {
          name: locale === "ta" ? "அமைச்சரவை" : "Council of Ministers",
          path: locale === "ta" ? GOVERNMENT_HUB_TA_PATH : GOVERNMENT_HUB_PATH,
        },
        { name: opts.name, path: opts.path },
      ]),
      ...(faq ? [faq] : []),
    ],
  };
}
