import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MinisterPageContent } from "@/components/government/minister-page-content";
import {
  getMinister,
  MINISTER_SLUGS,
  ministerDisplayName,
} from "@/content/government/ministers-may-2026";
import {
  GOVERNMENT_HUB_PATH,
  GOVERNMENT_HUB_TA_PATH,
  ministerPath,
} from "@/content/government/paths";
import { getSiteUrl } from "@/lib/env";
import { buildGovernmentMinisterJsonLd } from "@/lib/seo/government-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return MINISTER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const minister = getMinister(slug);
  if (!minister) return { title: "Minister not found" };
  const url = `${getSiteUrl()}${ministerPath(slug, "en")}`;
  const title = `${ministerDisplayName(minister)} — ${minister.ministryTitle}`;
  return {
    title,
    description: minister.portfolios.join(". "),
    alternates: {
      canonical: url,
      languages: {
        "en-IN": url,
        "ta-IN": `${getSiteUrl()}${ministerPath(slug, "ta")}`,
        "x-default": url,
      },
    },
    robots: { index: false, follow: true },
    openGraph: {
      title: fullSiteTitle(title),
      description: minister.ministryTitle,
      url,
    },
  };
}

export default async function MinisterPage({ params }: Props) {
  const { slug } = await params;
  const minister = getMinister(slug);
  if (!minister) notFound();
  const jsonLd = buildGovernmentMinisterJsonLd(minister, "en");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MinisterPageContent minister={minister} locale="en" />
    </>
  );
}
