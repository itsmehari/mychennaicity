import type { Metadata } from "next";
import { ListingPitchPage } from "@/components/advertise/listing-pitch-page";
import { PublicPostGate } from "@/components/free-posting/public-post-gate";
import { loadPropertyPitchSamples } from "@/lib/advertise-listing-samples";
import { freePostHandoffMetadata } from "@/lib/free-posting-metadata";

export const metadata: Metadata = freePostHandoffMetadata("home");

export const dynamic = "force-dynamic";

export default async function AdvertisePropertyPage() {
  const samples = await loadPropertyPitchSamples();
  return (
    <PublicPostGate kind="home">
      <ListingPitchPage kind="property" locale="en" samples={samples} />
    </PublicPostGate>
  );
}
