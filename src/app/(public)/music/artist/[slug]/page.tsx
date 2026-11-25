import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtistStage } from "@/components/music/artist-schedule";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getMusicArtist, listMusicArtists } from "@/content/music";
import { musicArtistMetadata } from "@/content/music/search-copy";
import {
  buildMusicArtistBreadcrumbJsonLd,
  buildMusicArtistFaqJsonLd,
  buildMusicArtistJsonLd,
} from "@/lib/seo/music-artist-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listMusicArtists().map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = getMusicArtist(slug);
  if (!artist) return { title: { absolute: fullSiteTitle("Artist not found") } };

  return musicArtistMetadata(artist);
}

export default async function MusicArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = getMusicArtist(slug);
  if (!artist) notFound();

  const jsonLd = buildMusicArtistJsonLd(artist);
  const faqLd = buildMusicArtistFaqJsonLd(artist);
  const breadcrumbLd = buildMusicArtistBreadcrumbJsonLd(artist);

  return (
    <div className={interiorMainClassName}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Music season", href: "/music/artist" },
          { label: artist.name },
        ]}
      />
      <ArtistStage artist={artist} />
      <div className="mt-10">
        <InteriorCrossNav />
      </div>
    </div>
  );
}
