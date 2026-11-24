import type { Metadata } from "next";
import { ListingPitchPage } from "@/components/advertise/listing-pitch-page";
import { PublicPostGate } from "@/components/free-posting/public-post-gate";
import { loadJobPitchSamples } from "@/lib/advertise-listing-samples";
import { freePostHandoffMetadata } from "@/lib/free-posting-metadata";

export const metadata: Metadata = freePostHandoffMetadata("job");

export const dynamic = "force-dynamic";

export default async function AdvertiseJobsPage() {
  const samples = await loadJobPitchSamples();
  return (
    <PublicPostGate kind="job">
      <ListingPitchPage kind="jobs" locale="en" samples={samples} />
    </PublicPostGate>
  );
}
