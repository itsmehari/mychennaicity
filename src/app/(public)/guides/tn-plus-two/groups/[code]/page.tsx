import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EducationGroupPage } from "@/components/education/education-group-page";
import { getHseGroup, HSE_GROUP_CODES } from "@/content/education/hse-groups";
import { educationGroupPath } from "@/content/education/paths";
import { getSiteUrl } from "@/lib/env";
import { buildEducationGroupJsonLd } from "@/lib/seo/education-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

type Props = { params: Promise<{ code: string }> };

export function generateStaticParams() {
  return HSE_GROUP_CODES.map((code) => ({ code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const group = getHseGroup(code);
  if (!group) {
    return { title: "Group not found" };
  }
  const url = `${getSiteUrl()}${educationGroupPath(group.code)}`;
  return {
    title: group.seoTitle,
    description: group.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: fullSiteTitle(group.seoTitle),
      description: group.seoDescription,
      url,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullSiteTitle(group.seoTitle),
      description: group.seoDescription,
      images: ["/twitter-image"],
    },
  };
}

export default async function TnPlusTwoGroupCodePage({ params }: Props) {
  const { code } = await params;
  const group = getHseGroup(code);
  if (!group) notFound();
  const jsonLd = buildEducationGroupJsonLd(group);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EducationGroupPage group={group} />
    </>
  );
}
