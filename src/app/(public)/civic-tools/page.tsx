import type { Metadata } from "next";
import { CivicToolsHub } from "@/components/civic-tools/civic-tools-hub";
import { CivicToolPageShell } from "@/components/civic-tools/civic-tool-page-shell";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOLS_HUB_PATH } from "@/lib/routes/civic-tools";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Civic interactive tools";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Ten civic tools for Greater Chennai: zone & ward finder, boundary maps, complaint routing, zonal office access, and more.",
  alternates: { canonical: `${getSiteUrl()}${CIVIC_TOOLS_HUB_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Find your GCC zone and ward, compare reorganisation maps, route complaints, and track civic updates.",
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
