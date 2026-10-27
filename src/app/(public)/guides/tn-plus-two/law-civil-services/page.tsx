import type { Metadata } from "next";
import { EducationExplainerRoute, explainerMetadata } from "@/components/education/education-explainer-route";
import { HSE_LAW_CIVIL } from "@/content/education/hse-pathways";

export const metadata: Metadata = explainerMetadata(HSE_LAW_CIVIL);

export default function Page() {
  return <EducationExplainerRoute page={HSE_LAW_CIVIL} />;
}
