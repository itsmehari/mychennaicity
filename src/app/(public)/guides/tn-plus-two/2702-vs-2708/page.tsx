import type { Metadata } from "next";
import { EducationExplainerRoute, explainerMetadata } from "@/components/education/education-explainer-route";
import { HSE_2702_VS_2708 } from "@/content/education/hse-pathways";

export const metadata: Metadata = explainerMetadata(HSE_2702_VS_2708);

export default function Page() {
  return <EducationExplainerRoute page={HSE_2702_VS_2708} />;
}
