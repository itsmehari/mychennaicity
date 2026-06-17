import type { Metadata } from "next";
import { WhatsAppCommunityJsonLd } from "@/components/community/whatsapp-community-json-ld";
import { WhatsAppCommunityLanding } from "@/components/community/whatsapp-community-landing";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import {
  WHATSAPP_COMMUNITY_GEO_META,
  WHATSAPP_COMMUNITY_OG_IMAGE,
  WHATSAPP_COMMUNITY_PAGE_PATH,
  WHATSAPP_COMMUNITY_PAGE_PATH_TAMIL,
  siteWhatsappCommunityPageUrl,
  siteWhatsappCommunityTamilPageUrl,
} from "@/lib/whatsapp-community";

const path = WHATSAPP_COMMUNITY_PAGE_PATH;
const titleSegment = "Chennai WhatsApp Group – Join My Chennai City Local Community";
const description =
  "Join the official my chennai city WhatsApp group. Free city-wide community for local news, jobs, events and updates across OMR, Adyar, T Nagar, Anna Nagar and all Chennai.";

export const metadata: Metadata = {
  title: titleSegment,
  description,
  alternates: {
    canonical: `${getSiteUrl()}${path}`,
    languages: {
      "en-IN": siteWhatsappCommunityPageUrl(),
      "ta-IN": siteWhatsappCommunityTamilPageUrl(),
      "x-default": siteWhatsappCommunityPageUrl(),
    },
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description,
    url: `${getSiteUrl()}${path}`,
    locale: "en_IN",
    alternateLocale: ["ta_IN"],
    images: [
      {
        url: WHATSAPP_COMMUNITY_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Join my chennai city WhatsApp community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    description,
    images: [WHATSAPP_COMMUNITY_OG_IMAGE],
  },
  other: { ...WHATSAPP_COMMUNITY_GEO_META },
};

export default function ChennaiWhatsappGroupPage() {
  return (
    <>
      <WhatsAppCommunityJsonLd page="en" />
      <WhatsAppCommunityLanding />
    </>
  );
}
