import type { Metadata } from "next";
import { EducationExplainerRoute, explainerMetadata } from "@/components/education/education-explainer-route";
import { HSE_MEDICINE } from "@/content/education/hse-pathways";

export const metadata: Metadata = explainerMetadata(HSE_MEDICINE);

export default function Page() {
  return <EducationExplainerRoute page={HSE_MEDICINE} />;
}
