import { WHATSAPP_COMMUNITY_FAQ } from "@/content/whatsapp-community/faq";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_PLACE_GRAPH } from "@/lib/seo/chennai-place";
import { buildFaqPageJsonLdFromItems } from "@/lib/seo/faq-jsonld";
import {
  orgPostalAddressJsonLd,
  orgSameAsUrls,
} from "@/lib/seo/site-defaults";
import {
  WHATSAPP_COMMUNITY_OG_IMAGE,
  WHATSAPP_COMMUNITY_PAGE_PATH,
  WHATSAPP_COMMUNITY_PAGE_PATH_TAMIL,
  siteWhatsappCommunityPageUrl,
} from "@/lib/whatsapp-community";

export function WhatsAppCommunityJsonLd({
  page = "en",
}: {
  page?: "en" | "ta";
}) {
  const base = getSiteUrl();
  const pagePath =
    page === "ta" ? WHATSAPP_COMMUNITY_PAGE_PATH_TAMIL : WHATSAPP_COMMUNITY_PAGE_PATH;
  const pageUrl = `${base}${pagePath}`;
  const sameAs = [
    ...orgSameAsUrls(),
    siteWhatsappCommunityPageUrl(),
  ];
  const address = orgPostalAddressJsonLd();

  const org: Record<string, unknown> = {
    "@type": "Organization",
    "@id": `${base}/#org`,
    name: "mychennaicity.in",
    url: base,
    logo: {
      "@type": "ImageObject",
      url: `${base}/opengraph-image`,
      width: 1200,
      height: 630,
    },
  };
  if (sameAs.length) org.sameAs = sameAs;
  if (address) org.address = address;

  const faq = buildFaqPageJsonLdFromItems(WHATSAPP_COMMUNITY_FAQ);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${base}/#website`,
      url: base,
      name: "mychennaicity.in",
      publisher: { "@id": `${base}/#org` },
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${base}/chennai-local-news?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    org,
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name:
        page === "ta"
          ? "சென்னை வாட்ஸ்அப் குழு — my chennai city"
          : "Chennai WhatsApp Group – Join My Chennai City Local Community",
      description:
        "Join the official my chennai city WhatsApp group. Free city-wide community for local news, jobs, events and updates across Chennai.",
      inLanguage: page === "ta" ? "ta-IN" : "en-IN",
      isPartOf: { "@id": `${base}/#website` },
      about: CHENNAI_PLACE_GRAPH,
      dateModified: "2026-06-18",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${base}${WHATSAPP_COMMUNITY_OG_IMAGE}`,
        width: 1200,
        height: 630,
      },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#wa-hero-lede", "#wa-faq-panel-0"],
      },
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
          name: page === "ta" ? "சென்னை வாட்ஸ்அப் குழு" : "Chennai WhatsApp group",
          item: pageUrl,
        },
      ],
    },
  ];

  if (faq) graph.push(faq);

  const payload = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
