import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MinisterPageContent } from "@/components/government/minister-page-content";
import {
  getMinister,
  MINISTER_SLUGS,
  ministerDisplayName,
} from "@/content/government/ministers-may-2026";
import { ministerPath } from "@/content/government/paths";
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
  const url = `${getSiteUrl()}${ministerPath(slug, "ta")}`;
  const title = `${ministerDisplayName(minister)} — ${minister.ministryTitle}`;
  return {
    title,
    alternates: {
      canonical: url,
      languages: {
        "en-IN": `${getSiteUrl()}${ministerPath(slug, "en")}`,
        "ta-IN": url,
        "x-default": `${getSiteUrl()}${ministerPath(slug, "en")}`,
      },
    },
    openGraph: {
      title: fullSiteTitle(title),
      url,
      locale: "ta_IN",
    },
  };
}

export default async function MinisterTamilPage({ params }: Props) {
  const { slug } = await params;
  const minister = getMinister(slug);
  if (!minister) notFound();
  const jsonLd = buildGovernmentMinisterJsonLd(minister, "ta");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MinisterPageContent minister={minister} locale="ta" />
    </>
  );
}
