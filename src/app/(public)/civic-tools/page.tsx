import type { Metadata } from "next";
import { CivicToolsHub } from "@/components/civic-tools/civic-tools-hub";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { CIVIC_TOOLS } from "@/content/civic-tools/tools-config";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOLS_HUB_PATH } from "@/lib/routes/civic-tools";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Civic interactive tools";
const description = `${CIVIC_TOOLS.length} civic tools for Greater Chennai: zone and ward finder, boundary maps, complaint routing, and more. Preview tools are labelled until they have verified data.`;

export const metadata: Metadata = {
  title: titleSegment,
  description,
  alternates: { canonical: `${getSiteUrl()}${CIVIC_TOOLS_HUB_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description,
    url: `${getSiteUrl()}${CIVIC_TOOLS_HUB_PATH}`,
  },
};

export default function CivicToolsHubPage() {
  return (
    <CivicToolPageShell
      eyebrow="Civic tools"
      title="MyChennaiCity civic interactive applications"
      description="Accurate zone and ward answers, verified migration data only, and tools that route you to the right authority before you file a complaint."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Civic tools" },
      ]}
    >
      <CivicToolsHub />
    </CivicToolPageShell>
  );
}
