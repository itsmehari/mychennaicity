import type { Metadata } from "next";
import { EducationExplainerRoute, explainerMetadata } from "@/components/education/education-explainer-route";
import { HSE_CA_FINANCE } from "@/content/education/hse-pathways";

export const metadata: Metadata = explainerMetadata(HSE_CA_FINANCE);

export default function Page() {
  return <EducationExplainerRoute page={HSE_CA_FINANCE} />;
}
