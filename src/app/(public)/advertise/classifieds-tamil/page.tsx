import type { Metadata } from "next";
import { ClassifiedsPitchPage } from "@/components/advertise/classifieds-pitch-page";
import { PublicPostGate } from "@/components/free-posting/public-post-gate";
import { loadClassifiedPitchSamples } from "@/lib/advertise-listing-samples";
import { freePostHandoffMetadata } from "@/lib/free-posting-metadata";

export const metadata: Metadata = freePostHandoffMetadata("classified");

export const dynamic = "force-dynamic";

export default async function AdvertiseClassifiedsTamilPage() {
  const samples = await loadClassifiedPitchSamples();
  return (
    <PublicPostGate kind="classified" locale="ta">
      <ClassifiedsPitchPage locale="ta" samples={samples} />
    </PublicPostGate>
  );
}
