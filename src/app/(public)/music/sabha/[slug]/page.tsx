import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SabhaStage } from "@/components/music/sabha-schedule";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getMusicSabha, listMusicSabhas } from "@/content/music";
import { musicSabhaMetadata } from "@/content/music/sabha-copy";
import {
  buildMusicSabhaBreadcrumbJsonLd,
  buildMusicSabhaFaqJsonLd,
  buildMusicSabhaJsonLd,
} from "@/lib/seo/music-sabha-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listMusicSabhas().map((sabha) => ({ slug: sabha.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sabha = getMusicSabha(slug);
  if (!sabha) return { title: { absolute: fullSiteTitle("Sabha not found") } };
  return musicSabhaMetadata(sabha);
}

export default async function MusicSabhaPage({ params }: Props) {
  const { slug } = await params;
  const sabha = getMusicSabha(slug);
  if (!sabha) notFound();

  return (
    <div className={interiorMainClassName}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildMusicSabhaJsonLd(sabha)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildMusicSabhaFaqJsonLd(sabha)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildMusicSabhaBreadcrumbJsonLd(sabha)),
        }}
      />
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Sabhas", href: "/music/sabha" },
          { label: sabha.name },
        ]}
      />
      <SabhaStage sabha={sabha} />
      <div className="mt-10">
        <InteriorCrossNav />
      </div>
    </div>
  );
}
