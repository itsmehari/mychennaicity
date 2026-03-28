import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/home/section";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { HomeTrustStrip } from "@/components/home/home-content";
import { categoryTiles, mockListings } from "@/lib/home-mock";
import { getSiteUrl } from "@/lib/env";

export const metadata: Metadata = {
  title: "Directory",
  description:
    "Schools, hospitals, food, transit, and civic desks across Greater Chennai — browse verticals and sample listings on mychennaicity.in.",
  alternates: { canonical: `${getSiteUrl()}/directory` },
  openGraph: {
    title: "Chennai directory | mychennaicity.in",
    description:
      "Places, services, and neighbourhood listings — organised by vertical.",
    url: `${getSiteUrl()}/directory`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chennai directory | mychennaicity.in",
    description:
      "Browse schools, services, food, transit, and civic verticals for Greater Chennai.",
    images: ["/twitter-image"],
  },
};

export default function DirectoryPage() {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Directory" }]}
      />
      <p className="type-eyebrow text-[var(--accent)]">Directory</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        Explore places and services
      </h1>
      <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed">
        We are wiring a single Chennai-wide directory so schools, hospitals,
        food, parks, transit, and civic desks no longer live in separate
        silos. Below is how browsing will work: pick a vertical, filter by
        area, then open verified detail pages. Live counts appear once the
        listings API connects.
      </p>

      <Section
        className="mt-12"
        eyebrow="Verticals"
        title="Browse by category"
        subtitle="Same tiles as the home page — everything lands here with room to grow into subcategories."
        action={{ href: "/#areas", label: "Pick an area on the map" }}
      >
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categoryTiles.map((c) => (
            <li key={c.label}>
              <div className="flex h-full flex-col rounded-2xl border border-[var(--border)] border-t-4 border-t-[var(--accent)] bg-[var(--surface)] p-4 shadow-sm">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent)_10%,var(--surface))] text-2xl"
                  aria-hidden
                >
                  {c.emoji}
                </span>
                <span className="mt-3 text-sm font-bold text-[var(--foreground)]">
                  {c.label}
                </span>
                <span className="mt-1 text-xs font-medium text-[var(--muted)]">
                  {c.count === "—" ? "Listings syncing soon" : `${c.count} listings`}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        className="mt-14"
        eyebrow="Sample listings"
        title="What a neighbourhood row will look like"
        subtitle="Illustrative snapshots — not live inventory. Prices and availability must be confirmed with the poster."
      >
        <ul className="grid gap-4 md:grid-cols-3">
          {mockListings.map((m) => (
            <li
              key={m.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 shadow-sm"
            >
              <p className="text-sm font-semibold text-[var(--foreground)]">
                {m.title}
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                {m.price} · {m.area}
              </p>
              <span className="mt-3 inline-block text-xs font-medium text-[var(--muted)]">
                Claim / edit flow — coming soon
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <div className="mt-14">
        <Section
          eyebrow="For businesses and residents"
          title="List with us"
          subtitle="When submissions open you will be able to add a place, mark hours, and link to maps — with basic verification to reduce spam."
        >
          <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_96%,var(--accent))] px-5 py-6 text-sm text-[var(--muted)]">
            <p>
              Planning a launch queue: GCC-adjacent civic desks first, then
              food and health, then retail and services. Follow{" "}
              <Link
                href="/chennai-local-news"
                className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
              >
                Chennai local news
              </Link>{" "}
              for the announcement.
            </p>
          </div>
        </Section>
      </div>

      <div className="mt-12">
        <HomeTrustStrip />
      </div>

      <InteriorCrossNav />
    </div>
  );
}
