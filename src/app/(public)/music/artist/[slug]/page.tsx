import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArtistPoster,
  ArtistSchedule,
} from "@/components/music/artist-schedule";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getMusicArtist, listMusicArtists, musicArtistPath } from "@/content/music";
import { getSiteUrl } from "@/lib/env";
import {
  buildMusicArtistBreadcrumbJsonLd,
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

  const base = getSiteUrl();
  const url = `${base}${musicArtistPath(artist.slug)}`;
  const titleSegment = `${artist.name} concert schedule`;
  const description = artist.summary.slice(0, 160);
  return {
    title: titleSegment,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullSiteTitle(titleSegment),
      description,
      url,
      type: "website",
      images: [
        {
          url: artist.poster.src,
          alt: artist.poster.alt,
        },
      ],
    },
  };
}

export default async function MusicArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = getMusicArtist(slug);
  if (!artist) notFound();

  const jsonLd = buildMusicArtistJsonLd(artist);
  const breadcrumbLd = buildMusicArtistBreadcrumbJsonLd(artist);

  return (
    <div className={interiorMainClassName}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Music artists", href: "/music/artist" },
          { label: artist.name },
        ]}
      />
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-warm)]">
        {artist.role}
      </p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        {artist.name}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
        {artist.summary}
      </p>
      <p className="mt-4 text-sm">
        <a
          href={artist.ticketUrl}
          className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          rel="noopener noreferrer"
        >
          Tickets on {artist.ticketLabel}
        </a>
      </p>
      <ArtistPoster artist={artist} />
      <h2 className="mt-10 text-2xl font-semibold text-[var(--foreground)]">
        Dates
      </h2>
      <ArtistSchedule artist={artist} />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        {artist.sourceNote} Closing times on the Chennai listings are calendar
        holds of three hours after the printed start.
      </p>
      <h2 className="mt-10 text-xl font-semibold text-[var(--foreground)]">
        Related pages
      </h2>
      <ul className="mt-3 flex flex-col gap-2 text-sm">
        {artist.related.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <InteriorCrossNav />
      </div>
    </div>
  );
}
