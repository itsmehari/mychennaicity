import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/home/section";
import type { HomeSpotlightClassified } from "@/lib/home-feed";
import { formatIndiaLongDate } from "@/lib/presentation-dates";
import { CHENNAI_CLASSIFIEDS_HUB_PATH } from "@/lib/routes/chennai-classifieds";

export function HomeClassifiedsSpotlight({
  listings,
  total,
}: {
  listings: HomeSpotlightClassified[];
  total: number;
}) {
  if (listings.length === 0) return null;
  const asOf = formatIndiaLongDate();

  return (
    <Section
      eyebrow="Classifieds"
      title="Featured listings"
      subtitle={`${total} open classified ad${total === 1 ? "" : "s"} in Chennai (${asOf}). Contact the advertiser directly — we do not broker deals.`}
      action={{ href: CHENNAI_CLASSIFIEDS_HUB_PATH, label: "All classified ads" }}
    >
      <ul
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Featured classified ads"
      >
        {listings.map((listing) => (
          <li key={listing.href}>
            <Link
              href={listing.href}
              className="home-bento-tile group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              {listing.imageSrc ? (
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--background)]">
                  <Image
                    src={listing.imageSrc}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                  {listing.featured ? (
                    <span className="absolute left-3 top-3 rounded-full bg-[var(--accent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent-fg)]">
                      Featured
                    </span>
                  ) : null}
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                  {listing.category}
                </p>
                <p className="mt-1 text-base font-semibold leading-snug text-[var(--foreground)]">
                  {listing.title}
                </p>
                <p className="mt-2 text-xs text-[var(--muted)]">{listing.location}</p>
                <span className="mt-4 text-xs font-semibold text-[var(--accent)]">
                  View ad →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
