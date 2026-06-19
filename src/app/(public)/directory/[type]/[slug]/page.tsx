import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BusinessWhatsAppCta } from "@/components/community/business-whatsapp-cta";
import { DirectoryEntryDetail } from "@/components/directory/directory-entry-detail";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getDirectoryEntryByTypeAndSlug } from "@/domains/directory";
import { directoryTypeLabel } from "@/lib/directory/type-labels";
import { getSiteUrl } from "@/lib/env";
import {
  DIRECTORY_HUB_PATH,
  directoryDetailPath,
} from "@/lib/routes/directory";
import {
  buildDirectoryBreadcrumbJsonLd,
  buildDirectoryEntryJsonLd,
} from "@/lib/seo/directory-entry-jsonld";
import {
  buildClippedTitleSegment,
  fullSiteTitle,
} from "@/lib/seo/site-titles";

type Props = { params: Promise<{ type: string; slug: string }> };

export const dynamic = "force-dynamic";

function clipDesc(s: string, max = 155): string {
  const t = s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, slug } = await params;
  let entry: Awaited<ReturnType<typeof getDirectoryEntryByTypeAndSlug>> = null;
  try {
    entry = await getDirectoryEntryByTypeAndSlug(type, slug);
  } catch {
    return { title: { absolute: fullSiteTitle("Listing not found") } };
  }
  if (!entry) return { title: { absolute: fullSiteTitle("Listing not found") } };

  const base = getSiteUrl();
  const url = `${base}${directoryDetailPath(entry.type, entry.slug)}`;
  const desc =
    clipDesc(entry.meta.summary ?? entry.meta.reportBody ?? entry.body) ||
    entry.name;
  const titleSegment = buildClippedTitleSegment(
    entry.name,
    ` · ${directoryTypeLabel(entry.type)}`,
  );
  const docTitle = fullSiteTitle(titleSegment);

  return {
    title: titleSegment,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: docTitle,
      description: desc,
      url,
      type: "website",
      images: entry.meta.heroImageUrl
        ? [{ url: entry.meta.heroImageUrl, width: 1200, height: 630 }]
        : [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      description: desc,
      images: entry.meta.heroImageUrl
        ? [entry.meta.heroImageUrl]
        : ["/twitter-image"],
    },
  };
}

export default async function DirectoryEntryPage({ params }: Props) {
  const { type, slug } = await params;
  const entry = await getDirectoryEntryByTypeAndSlug(type, slug);
  if (!entry) notFound();

  const pageLd = buildDirectoryEntryJsonLd(entry);
  const crumbLd = buildDirectoryBreadcrumbJsonLd(entry);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }}
      />
      <div className={interiorMainClassName}>
        <PageBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Directory", href: DIRECTORY_HUB_PATH },
            { label: entry.name },
          ]}
        />
        <DirectoryEntryDetail entry={entry} />
        <div className="mt-10">
          <BusinessWhatsAppCta variant="directory" />
        </div>
        <InteriorCrossNav />
      </div>
    </>
  );
}
