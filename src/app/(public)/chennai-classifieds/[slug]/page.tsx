import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/ads/render-ad-slot";
import { AdvertisePanel } from "@/components/ads/advertise-panel";
import { ClassifiedAdDetail } from "@/components/classifieds/classified-ad-detail";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getOpenClassifiedListingBySlug } from "@/domains/classifieds";
import { getSiteUrl } from "@/lib/env";
import {
  CHENNAI_CLASSIFIEDS_HUB_PATH,
  chennaiClassifiedDetailPath,
} from "@/lib/routes/chennai-classifieds";
import {
  buildClassifiedAdJsonLd,
  buildClassifiedBreadcrumbJsonLd,
} from "@/lib/seo/classified-jsonld";
import {
  buildClippedTitleSegment,
  fullSiteTitle,
} from "@/lib/seo/site-titles";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

function clipDesc(s: string, max = 155): string {
  const t = s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let listing: Awaited<ReturnType<typeof getOpenClassifiedListingBySlug>> =
    null;
  try {
    listing = await getOpenClassifiedListingBySlug(slug);
  } catch {
    return { title: { absolute: fullSiteTitle("Ad not found") } };
  }
  if (!listing) return { title: { absolute: fullSiteTitle("Ad not found") } };
  const base = getSiteUrl();
  const url = `${base}${chennaiClassifiedDetailPath(slug)}`;
  const desc = clipDesc(listing.body) || listing.title;
  const titleSegment = buildClippedTitleSegment(listing.title, " · Classified");
  const docTitle = fullSiteTitle(titleSegment);
  return {
    title: titleSegment,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: docTitle,
      description: desc,
      url,
      type: "article",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      description: desc,
      images: ["/twitter-image"],
    },
  };
}

export default async function ChennaiClassifiedDetailPage({ params }: Props) {
  const { slug } = await params;
  const listing = await getOpenClassifiedListingBySlug(slug);
  if (!listing) notFound();

  const pageLd = buildClassifiedAdJsonLd(listing);
  const crumbLd = buildClassifiedBreadcrumbJsonLd(listing.slug, listing.title);

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
            { label: "Chennai classifieds", href: CHENNAI_CLASSIFIEDS_HUB_PATH },
            { label: listing.title },
          ]}
        />
        <div className="mt-8">
          <AdSlot slotId="classified-ads-detail-mid" size="300x250" />
        </div>
        <div className="mt-8">
          <ClassifiedAdDetail listing={listing} />
        </div>
        <div className="mt-10 max-w-2xl">
          <AdvertisePanel variant="classifieds" layout="strip" />
        </div>
        <InteriorCrossNav />
      </div>
    </>
  );
}
