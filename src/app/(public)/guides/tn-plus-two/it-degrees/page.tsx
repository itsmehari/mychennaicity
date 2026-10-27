import type { Metadata } from "next";
import { EducationExplainerRoute, explainerMetadata } from "@/components/education/education-explainer-route";
import { HSE_IT_DEGREES } from "@/content/education/hse-pathways";

export const metadata: Metadata = explainerMetadata(HSE_IT_DEGREES);

export default function Page() {
  return <EducationExplainerRoute page={HSE_IT_DEGREES} />;
}
