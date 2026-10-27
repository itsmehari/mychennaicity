import type { Metadata } from "next";
import { ListingPitchPage } from "@/components/advertise/listing-pitch-page";
import { loadJobPitchSamples } from "@/lib/advertise-listing-samples";
import { getSiteUrl } from "@/lib/env";
import {
  ADVERTISE_JOBS_PATH,
  ADVERTISE_JOBS_TAMIL_PATH,
} from "@/lib/routes/advertise-listings";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Post a job in Chennai";
const description =
  "Send a Chennai job and MyChennaiCity places it on the jobs board. No employer login. Candidates apply on your link.";

export const metadata: Metadata = {
  title: titleSegment,
  description,
  alternates: {
    canonical: `${getSiteUrl()}${ADVERTISE_JOBS_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${ADVERTISE_JOBS_PATH}`,
      "ta-IN": `${getSiteUrl()}${ADVERTISE_JOBS_TAMIL_PATH}`,
      "x-default": `${getSiteUrl()}${ADVERTISE_JOBS_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description,
    url: `${getSiteUrl()}${ADVERTISE_JOBS_PATH}`,
    locale: "en_IN",
    alternateLocale: ["ta_IN"],
  },
};

export const dynamic = "force-dynamic";

export default async function AdvertiseJobsPage() {
  const samples = await loadJobPitchSamples();
  return <ListingPitchPage kind="jobs" locale="en" samples={samples} />;
}
