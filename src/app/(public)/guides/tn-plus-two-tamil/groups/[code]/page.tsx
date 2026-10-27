import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EducationGroupPage } from "@/components/education/education-group-page";
import { getHseGroup, HSE_GROUP_CODES } from "@/content/education/hse-groups";
import { getHseGroupTa } from "@/content/education/hse-tamil";
import { educationGroupPath, educationHreflang } from "@/content/education/paths";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

type Props = { params: Promise<{ code: string }> };

export function generateStaticParams() {
  return HSE_GROUP_CODES.map((code) => ({ code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const ta = getHseGroupTa(code);
  const group = getHseGroup(code);
  if (!ta || !group) return { title: "குழு இல்லை" };
  return {
    title: ta.seoTitle,
    description: ta.seoDescription,
    alternates: educationHreflang(
      educationGroupPath(code),
      educationGroupPath(code, "ta"),
      getSiteUrl(),
    ),
    openGraph: {
      title: fullSiteTitle(ta.seoTitle),
      description: ta.seoDescription,
      url: `${getSiteUrl()}${educationGroupPath(code, "ta")}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function TamilGroupPage({ params }: Props) {
  const { code } = await params;
  const group = getHseGroup(code);
  const ta = getHseGroupTa(code);
  if (!group || !ta) notFound();
  return <EducationGroupPage group={group} locale="ta" ta={ta} />;
}
