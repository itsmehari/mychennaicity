import type { Metadata } from "next";
import { EducationExplainerRoute, explainerMetadata } from "@/components/education/education-explainer-route";
import { HSE_ENGINEERING } from "@/content/education/hse-pathways";

export const metadata: Metadata = explainerMetadata(HSE_ENGINEERING);

export default function Page() {
  return <EducationExplainerRoute page={HSE_ENGINEERING} />;
}
