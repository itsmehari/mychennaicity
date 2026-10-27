import type { Metadata } from "next";
import { ListingPitchPage } from "@/components/advertise/listing-pitch-page";
import { loadPropertyPitchSamples } from "@/lib/advertise-listing-samples";
import { propertyPackageSentence } from "@/content/advertise-listings";
import { getSiteUrl } from "@/lib/env";
import {
  ADVERTISE_PROPERTY_PATH,
  ADVERTISE_PROPERTY_TAMIL_PATH,
} from "@/lib/routes/advertise-listings";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "சென்னையில் சொத்து விளம்பரம் போட";
const description = `விற்பனை, வாடகை, மனை, வணிக விளம்பரம். ${propertyPackageSentence("ta")}`;

export const metadata: Metadata = {
  title: titleSegment,
  description,
  alternates: {
    canonical: `${getSiteUrl()}${ADVERTISE_PROPERTY_TAMIL_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${ADVERTISE_PROPERTY_PATH}`,
      "ta-IN": `${getSiteUrl()}${ADVERTISE_PROPERTY_TAMIL_PATH}`,
      "x-default": `${getSiteUrl()}${ADVERTISE_PROPERTY_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description,
    url: `${getSiteUrl()}${ADVERTISE_PROPERTY_TAMIL_PATH}`,
    locale: "ta_IN",
    alternateLocale: ["en_IN"],
  },
};

export const dynamic = "force-dynamic";

export default async function AdvertisePropertyTamilPage() {
  const samples = await loadPropertyPitchSamples();
  return <ListingPitchPage kind="property" locale="ta" samples={samples} />;
}
