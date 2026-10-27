import type { Metadata } from "next";
import { EducationExplainerRoute, explainerMetadata } from "@/components/education/education-explainer-route";
import { HSE_2502_VS_2503 } from "@/content/education/hse-pathways";

export const metadata: Metadata = explainerMetadata(HSE_2502_VS_2503);

export default function Page() {
  return <EducationExplainerRoute page={HSE_2502_VS_2503} />;
}
