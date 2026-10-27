import type { Metadata } from "next";
import { EducationExplainerRoute, explainerMetadata } from "@/components/education/education-explainer-route";
import { HSE_SCIENCE } from "@/content/education/hse-pathways";

export const metadata: Metadata = explainerMetadata(HSE_SCIENCE);

export default function Page() {
  return <EducationExplainerRoute page={HSE_SCIENCE} />;
}
