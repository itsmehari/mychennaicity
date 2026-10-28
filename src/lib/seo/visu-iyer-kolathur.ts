import {
  VISU_IYER_OG_IMAGE,
  VISU_IYER_PHONE_DISPLAY,
  VISU_IYER_PHONE_E164,
  VISU_IYER_PORTRAIT_BACK,
  VISU_IYER_PORTRAIT_FRONT,
  VISU_IYER_PROFILE_PATH,
} from "@/content/business-profiles/visu-iyer-kolathur";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_PLACE_GRAPH } from "@/lib/seo/chennai-place";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const TITLE_SEGMENT = "விசு ஐயர், விஷ் அர்ச்சகர் — கொளத்தூர்";

const DESCRIPTION = `விசு ஐயர் (விஷ் அர்ச்சகர்), கொளத்தூர். சுப முகூர்த்தம், திருமணம், கிரஹப்பிரவேசம், ஹோமங்கள். செல் ${VISU_IYER_PHONE_DISPLAY}.`;

export function visuIyerPageUrl(): string {
  return `${getSiteUrl()}${VISU_IYER_PROFILE_PATH}`;
}

export function visuIyerOgImageUrl(): string {
  return `${getSiteUrl()}${VISU_IYER_OG_IMAGE}`;
}

export function visuIyerPageMetadata() {
  const url = visuIyerPageUrl();
  const image = visuIyerOgImageUrl();

  return {
    title: TITLE_SEGMENT,
    description: DESCRIPTION,
    alternates: { canonical: url },
    openGraph: {
      type: "website" as const,
      siteName: "mychennaicity.in",
      title: fullSiteTitle(TITLE_SEGMENT),
      description: DESCRIPTION,
      url,
      locale: "ta_IN",
      images: [
        {
          url: image,
          secureUrl: image,
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: "விசு ஐயர், விஷ் அர்ச்சகர், கொளத்தூர்",
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: fullSiteTitle(TITLE_SEGMENT),
      description: DESCRIPTION,
      images: [image],
    },
  };
}

export function buildVisuIyerJsonLd() {
  const base = getSiteUrl();
  const pageUrl = visuIyerPageUrl();
  const image = visuIyerOgImageUrl();

  const business = {
    "@type": "ProfessionalService",
    "@id": `${pageUrl}#business`,
    name: "Visu Iyer",
    alternateName: "விசு ஐயர்",
    url: pageUrl,
    image: [`${base}${VISU_IYER_PORTRAIT_FRONT}`, `${base}${VISU_IYER_PORTRAIT_BACK}`, image],
    telephone: VISU_IYER_PHONE_E164,
    description: DESCRIPTION,
    areaServed: [
      { "@type": "Place", name: "Kolathur, Chennai" },
      CHENNAI_PLACE_GRAPH,
    ],
    knowsAbout: [
      "சுப முகூர்த்தம்",
      "திருமணம்",
      "கிரஹப்பிரவேசம்",
      "ஹோமம்",
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: TITLE_SEGMENT,
        description: DESCRIPTION,
        inLanguage: ["ta-IN", "en-IN"],
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
