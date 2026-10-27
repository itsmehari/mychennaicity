import type { Metadata } from "next";
import { EducationExplainerRoute, explainerMetadata } from "@/components/education/education-explainer-route";
import { HSE_AFTER_12TH } from "@/content/education/hse-pathways";

export const metadata: Metadata = explainerMetadata(HSE_AFTER_12TH);

export default function Page() {
  return <EducationExplainerRoute page={HSE_AFTER_12TH} />;
}
