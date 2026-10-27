import type { Metadata } from "next";
import { ListingPitchPage } from "@/components/advertise/listing-pitch-page";
import { loadJobPitchSamples } from "@/lib/advertise-listing-samples";
import { getSiteUrl } from "@/lib/env";
import {
  ADVERTISE_JOBS_PATH,
  ADVERTISE_JOBS_TAMIL_PATH,
} from "@/lib/routes/advertise-listings";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "சென்னையில் வேலை விளம்பரம் போட";
const description =
  "பதவி விவரத்தை அனுப்புங்கள். MyChennaiCity வேலைப் பலகையில் வைக்கும். முதலாளி உள்நுழைவு இல்லை. விண்ணப்பம் உங்கள் இணைப்பில்.";

export const metadata: Metadata = {
  title: titleSegment,
  description,
  alternates: {
    canonical: `${getSiteUrl()}${ADVERTISE_JOBS_TAMIL_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${ADVERTISE_JOBS_PATH}`,
      "ta-IN": `${getSiteUrl()}${ADVERTISE_JOBS_TAMIL_PATH}`,
      "x-default": `${getSiteUrl()}${ADVERTISE_JOBS_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description,
    url: `${getSiteUrl()}${ADVERTISE_JOBS_TAMIL_PATH}`,
    locale: "ta_IN",
    alternateLocale: ["en_IN"],
  },
};

export const dynamic = "force-dynamic";

export default async function AdvertiseJobsTamilPage() {
  const samples = await loadJobPitchSamples();
  return <ListingPitchPage kind="jobs" locale="ta" samples={samples} />;
}
