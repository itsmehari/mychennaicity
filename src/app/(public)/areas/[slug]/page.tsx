import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichAreaHubPage } from "@/components/areas/rich-area-hub-page";
import { getRichAreaHubContent } from "@/content/area-hubs";
import {
  listArticlesByAreaHubForChennai,
  listClassifiedsByAreaHubForChennai,
  listOmrCorridorJobsForChennai,
} from "@/domains/areas";
import { chennaiZones } from "@/lib/chennai-zones";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { fullSiteTitle } from "@/lib/seo/site-titles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return chennaiZones.map((z) => ({ slug: z.slug }));
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const zone = chennaiZones.find((z) => z.slug === slug);
  if (!zone) {
    return { title: { absolute: fullSiteTitle("Chennai area not found") } };
  }
  const rich = getRichAreaHubContent(slug);
  const base = getSiteUrl();
  const titleSegment = `${zone.label} — Chennai area guide`;
  const docTitle = fullSiteTitle(titleSegment);
  const description =
    rich?.metaDescription ??
    `${zone.blurb} News, events, jobs, and directory links for this part of Chennai.`;
  return {
    title: titleSegment,
    description,
    alternates: { canonical: `${base}/areas/${zone.slug}` },
    openGraph: {
      title: docTitle,
      description,
      url: `${base}/areas/${zone.slug}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      images: ["/twitter-image"],
    },
    other: { ...CHENNAI_GEO_META },
  };
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const zone = chennaiZones.find((z) => z.slug === slug);
  if (!zone) notFound();

  const richContent = getRichAreaHubContent(slug);
  if (!richContent) notFound();

  let articles: Awaited<ReturnType<typeof listArticlesByAreaHubForChennai>> = [];
  let classifieds: Awaited<
    ReturnType<typeof listClassifiedsByAreaHubForChennai>
  > = [];
  let jobs: Awaited<ReturnType<typeof listOmrCorridorJobsForChennai>> = [];

  try {
    [articles, classifieds, jobs] = await Promise.all([
      listArticlesByAreaHubForChennai(slug, 6),
      listClassifiedsByAreaHubForChennai(slug, 6),
      slug === "omr-perungudi-sholinganallur"
        ? listOmrCorridorJobsForChennai(6)
        : Promise.resolve([]),
    ]);
  } catch {
    articles = [];
    classifieds = [];
    jobs = [];
  }

  return (
    <RichAreaHubPage
      zone={zone}
      content={richContent}
      articles={articles}
      classifieds={classifieds}
      jobs={jobs}
    />
  );
}
