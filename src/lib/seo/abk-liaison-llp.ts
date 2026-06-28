import { getSiteUrl } from "@/lib/env";
import { CHENNAI_PLACE_GRAPH } from "@/lib/seo/chennai-place";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const ABK_LIAISON_LLP_PROFILE_PATH = "/business-profile/abk-liaison-llp";

export const ABK_LIAISON_LLP_OG_IMAGE =
  "/images/business-profile/abk-liaison-llp/abk-profile-og-share.jpg";

/** Royapettah office — 16, SPS 2nd Street */
export const ABK_LIAISON_LLP_GEO = {
  "geo.region": "IN-TN",
  "geo.placename": "Chennai, Royapettah",
  "geo.position": "13.0524;80.2644",
  ICBM: "13.0524, 80.2644",
} as const;

const TITLE_SEGMENT =
  "ABK Liaison LLP | Locations, Licenses, Liaison & Construction";

const OG_TITLE = "ABK Liaison LLP | Business Profile";

const DESCRIPTION =
  "ABK Liaison LLP is a Tamil Nadu and Pondicherry based liaison, licensing, government contracts and civil development firm led by AB Kathirravan.";

const OG_DESCRIPTION =
  "Statutory licensing, retail outlet liaison, government contracts and civil works across Tamil Nadu and Pondicherry. Chennai office: Royapettah.";

export function abkLiaisonLlpPageUrl(): string {
  return `${getSiteUrl()}${ABK_LIAISON_LLP_PROFILE_PATH}`;
}

export function abkLiaisonLlpOgImageUrl(): string {
  return `${getSiteUrl()}${ABK_LIAISON_LLP_OG_IMAGE}`;
}

export function abkLiaisonLlpPageMetadata() {
  const url = abkLiaisonLlpPageUrl();
  const image = abkLiaisonLlpOgImageUrl();

  return {
    title: TITLE_SEGMENT,
    description: DESCRIPTION,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website" as const,
      siteName: "mychennaicity.in",
      title: fullSiteTitle(OG_TITLE),
      description: OG_DESCRIPTION,
      url,
      locale: "en_IN",
      images: [
        {
          url: image,
          secureUrl: image,
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: "ABK Liaison LLP — liaison, licensing and civil works in Chennai",
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: fullSiteTitle(OG_TITLE),
      description: OG_DESCRIPTION,
      images: [image],
    },
    other: { ...ABK_LIAISON_LLP_GEO },
  };
}

export function buildAbkLiaisonLlpJsonLd() {
  const base = getSiteUrl();
  const pageUrl = abkLiaisonLlpPageUrl();
  const image = abkLiaisonLlpOgImageUrl();

  const business = {
    "@type": "ProfessionalService",
    "@id": `${pageUrl}#business`,
    name: "ABK Liaison LLP",
    url: "https://www.abkliaison.com",
    image,
    logo: `${base}/images/business-profile/abk-liaison-llp/abk-logo.png`,
    telephone: "+91-98404-04509",
    email: "abkliaison@gmail.com",
    founder: {
      "@type": "Person",
      name: "AB Kathirravan",
      jobTitle: "Director",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "16, SPS 2nd Street, Royapettah",
      addressLocality: "Chennai",
      postalCode: "600014",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.0524,
      longitude: 80.2644,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Tamil Nadu" },
      { "@type": "AdministrativeArea", name: "Puducherry" },
    ],
    containedInPlace: CHENNAI_PLACE_GRAPH,
    description:
      "Statutory licensing, liaison coordination, government contracts and civil development services across Tamil Nadu and Pondicherry.",
    knowsAbout: [
      "statutory licensing",
      "government liaison",
      "PWD contractor registration",
      "retail fuel outlet liaison",
      "civil development",
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: OG_TITLE,
        description: OG_DESCRIPTION,
        inLanguage: "en-IN",
        isPartOf: {
          "@type": "WebSite",
          name: "mychennaicity.in",
          url: base,
        },
        about: { "@id": `${pageUrl}#business` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: image,
          width: 1200,
          height: 630,
        },
      },
      business,
    ],
  };
}
