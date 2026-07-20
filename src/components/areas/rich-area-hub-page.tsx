import Image from "next/image";
import Link from "next/link";
import { AdSlot } from "@/ads/render-ad-slot";
import { AdvertisePanel } from "@/components/ads/advertise-panel";
import { HubCommunityStrip } from "@/components/community/hub-community-strip";
import { Section } from "@/components/home/section";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { InteractiveChennaiMapExplorer } from "@/components/chennai-map-explorer/interactive-chennai-map-explorer";
import type { ClassifiedListingRow } from "@/domains/classifieds";
import type { PublicArticleRow } from "@/domains/news";
import type { JobPostingWithEmployer } from "@/domains/jobs/queries";
import {
  articleHeroAlt,
  articleHeroUsesNextImage,
  resolveArticleHeroSrc,
} from "@/lib/article-hero-image";
import type { ChennaiZone } from "@/lib/chennai-zones";
import { getChennaiZoneBySlug } from "@/lib/chennai-zones";
import type { RichAreaHubContent } from "@/lib/area-hubs/types";
import { buildAreaHubJsonLd } from "@/lib/seo/area-hub-jsonld";
import { homeMapUrlForHub, relatedHubsFor } from "@/lib/area-hubs/geography";
import { chennaiClassifiedDetailPath } from "@/lib/routes/chennai-classifieds";
import { chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";
import { formatIndiaLongDate } from "@/lib/presentation-dates";

// ---------------------------------------------------------------------------
// Inline helpers
// ---------------------------------------------------------------------------

function MarkdownBoldInline({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-[var(--foreground)]">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function FactTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--border)] shadow-sm ring-1 ring-[color-mix(in_srgb,var(--foreground)_4%,transparent)]">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-t border-[var(--border)] first:border-t-0 even:bg-[color-mix(in_srgb,var(--foreground)_2%,var(--surface))]"
            >
              <th
                scope="row"
                className="w-[38%] px-4 py-3 align-top text-xs font-bold uppercase tracking-[0.06em] text-[var(--muted)]"
              >
                {row.label}
              </th>
              <td className="px-4 py-3 align-top leading-relaxed text-[var(--foreground)]">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ArticleMiniCard({ article }: { article: PublicArticleRow }) {
  const src = resolveArticleHeroSrc(article);
  const useNext = articleHeroUsesNextImage(src);
  const date = article.publishedAt
    ? formatIndiaLongDate(article.publishedAt)
    : null;

  return (
    <Link
      href={`/chennai-local-news/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--accent)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--border)]">
        {useNext ? (
          <Image
            src={src}
            alt={articleHeroAlt(article)}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={articleHeroAlt(article)}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        {article.category ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
            {article.category}
          </p>
        ) : null}
        <h3 className="mt-1 line-clamp-3 text-sm font-semibold leading-snug text-[var(--foreground)] group-hover:text-[var(--accent)]">
          {article.title}
        </h3>
        {date ? (
          <p className="mt-auto pt-3 text-xs text-[var(--muted)]">{date}</p>
        ) : null}
      </div>
    </Link>
  );
}

function ClassifiedMiniCard({ listing }: { listing: ClassifiedListingRow }) {
  return (
    <Link
      href={chennaiClassifiedDetailPath(listing.slug)}
      className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 transition hover:border-[var(--accent)]"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--accent-warm)]">
        {listing.category}
      </p>
      <h3 className="mt-1 text-sm font-semibold leading-snug text-[var(--foreground)]">
        {listing.title}
      </h3>
      {listing.locationLabel ? (
        <p className="mt-2 text-xs text-[var(--muted)]">{listing.locationLabel}</p>
      ) : null}
    </Link>
  );
}

function JobMiniCard({ row }: { row: JobPostingWithEmployer }) {
  const { job, employer } = row;
  return (
    <Link
      href={chennaiJobsDetailPath(job.slug)}
      className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 transition hover:border-[var(--accent)]"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
        {employer.name}
      </p>
      <h3 className="mt-1 text-sm font-semibold leading-snug text-[var(--foreground)]">
        {job.title}
      </h3>
      {job.locationLabel ? (
        <p className="mt-2 text-xs text-[var(--muted)]">{job.locationLabel}</p>
      ) : null}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

export function RichAreaHubPage({
  zone,
  content,
  articles,
  classifieds,
  jobs,
}: {
  zone: ChennaiZone;
  content: RichAreaHubContent;
  articles: PublicArticleRow[];
  classifieds: ClassifiedListingRow[];
  jobs: JobPostingWithEmployer[];
}) {
  const { webPage, breadcrumbs, itemList } = buildAreaHubJsonLd(zone, content);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const mapUrl = homeMapUrlForHub(zone.slug);

  // Resolve related hub zones: prefer explicit relatedHubSlugs, fall back to geography
  const relatedZones = (
    content.relatedHubSlugs.length > 0
      ? content.relatedHubSlugs
          .map((s) => getChennaiZoneBySlug(s))
          .filter((z): z is NonNullable<typeof z> => Boolean(z))
      : relatedHubsFor(zone.slug)
  ).slice(0, 6);

  const hasGuides = content.practicalGuides.length > 0 || content.partnerLinks.length > 0;

  return (
    <div className={interiorMainClassName}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumbs */}
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Areas", href: "/areas" },
          { label: zone.label },
        ]}
      />

      {/* Hero */}
      <header className="mcc-area-hero mt-2">
        {content.heroImage ? (
          <div className="relative mb-6 aspect-[21/8] w-full overflow-hidden rounded-2xl bg-[var(--border)]">
            <Image
              src={content.heroImage}
              alt={content.heroImageAlt ?? `${zone.label} — Chennai area guide`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <p className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
              {content.identityLine}
            </p>
          </div>
        ) : (
          <p className="type-eyebrow text-[var(--accent)]">
            {content.identityLine}
          </p>
        )}
        <h1 className="type-display mt-2 max-w-4xl text-3xl text-[var(--foreground)] sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
          {zone.label}
        </h1>
        <p className="type-lede mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
          {content.heroDek}
        </p>

        {/* Stat chips */}
        {content.statChips.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {content.statChips.map((chip) => (
              <li
                key={chip.label}
                className="rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--accent)_6%,var(--surface))] px-3 py-1.5 text-xs"
              >
                <span className="font-semibold text-[var(--foreground)]">
                  {chip.label}:
                </span>{" "}
                <span className="text-[var(--muted)]">{chip.value}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {/* CTA row */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={mapUrl}
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)]"
          >
            Open on city map
          </Link>
          <Link
            href="/chennai-local-news"
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
          >
            Local news
          </Link>
          <Link
            href="/chennai-jobs"
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
          >
            Jobs in Chennai
          </Link>
        </div>
      </header>

      {/* Sticky-ish section nav */}
      <nav
        className="sticky top-0 z-10 -mx-4 mt-8 overflow-x-auto bg-[color-mix(in_srgb,var(--background)_92%,transparent)] px-4 py-2 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        aria-label="On this page"
      >
        <div className="flex gap-2">
          {content.sectionNav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <AdvertisePanel
        variant="area"
        layout="section"
        className="mt-10"
        areaLabel={zone.label}
      />

      {/* Best-of */}
      {content.bestOf.length > 0 ? (
        <Section
          id="best-of"
          eyebrow="Highlights"
          title={`Best of ${zone.label}`}
          className="mcc-area-best mt-12"
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.bestOf.map((card) => {
              const inner = (
                <>
                  {card.imageSrc ? (
                    <div className="mcc-area-best__media relative w-full overflow-hidden">
                      <Image
                        src={card.imageSrc}
                        alt={card.imageAlt ?? card.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-4">
                    <p className="mcc-area-best__kicker">Highlight</p>
                    <h3 className="mt-1 text-sm font-semibold leading-snug text-[var(--foreground)] group-hover:text-[var(--accent)]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                      {card.blurb}
                    </p>
                  </div>
                </>
              );
              return (
                <li key={card.id}>
                  {card.href ? (
                    <Link
                      href={card.href}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--accent)]"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Section>
      ) : null}

      {/* About */}
      <Section
        id="about"
        eyebrow="Corridor"
        title={content.aboutTitle}
        subtitle={content.aboutSubtitle}
        className="mt-12"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 text-sm leading-relaxed text-[var(--muted)]">
            {content.aboutParagraphs.map((paragraph, i) => (
              <p key={i}>
                <MarkdownBoldInline text={paragraph} />
              </p>
            ))}
          </div>
          <FactTable rows={content.corridorFacts} />
        </div>
      </Section>

      {/* Localities */}
      <Section
        id="localities"
        eyebrow="Neighbourhoods"
        title="Localities on this hub"
        subtitle="GCC ward labels and corridor tags from our Chennai map catalog."
        className="mt-14"
      >
        {content.localityCards.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {content.localityCards.map((loc) => (
              <li
                key={loc.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 ring-1 ring-[color-mix(in_srgb,var(--foreground)_3%,transparent)]"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--accent-warm)]">
                  {loc.zone}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-[var(--foreground)]">
                  {loc.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {loc.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {loc.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md bg-[color-mix(in_srgb,var(--foreground)_5%,var(--surface))] px-2 py-0.5 text-[10px] font-medium text-[var(--muted)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-dashed border-[var(--border)] px-5 py-8 text-sm text-[var(--muted)]">
            Localities in this hub will appear here as the Chennai map catalog grows.{" "}
            <Link href={mapUrl} className="font-medium text-[var(--accent)] hover:underline">
              Open on city map →
            </Link>
          </p>
        )}
      </Section>

      {/* On the map */}
      <Section
        id="on-the-map"
        eyebrow="Ward map"
        title="Explore on the Chennai map"
        subtitle={content.mapBlurb}
        className="mt-14"
      >
        <InteractiveChennaiMapExplorer
          initialHubSlug={zone.slug}
          forceLoad
          compact
        />
        <p className="mt-4 text-sm text-[var(--muted)]">
          Tap a ward to see locality context.{" "}
          <Link
            href={mapUrl}
            className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          >
            Open full-size map →
          </Link>
        </p>
      </Section>

      {/* Local news */}
      <Section
        id="local-news"
        eyebrow="From mychennaicity.in"
        title="Local news for this area"
        subtitle="Editorial stories tagged for this hub."
        action={{ href: "/chennai-local-news", label: "All Chennai news" }}
        className="mt-14"
      >
        {articles.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.id}>
                <ArticleMiniCard article={article} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-dashed border-[var(--border)] px-5 py-8 text-sm text-[var(--muted)]">
            No area-tagged stories yet — browse{" "}
            <Link
              href="/chennai-local-news"
              className="font-medium text-[var(--accent)] hover:underline"
            >
              Chennai local news
            </Link>{" "}
            for city-wide updates.
          </p>
        )}
      </Section>

      {/* Jobs */}
      {jobs.length > 0 ? (
        <Section
          id="jobs"
          eyebrow="Hiring"
          title="Jobs in this area"
          subtitle="Open listings mentioning localities in this hub."
          action={{ href: "/chennai-jobs", label: "All Chennai jobs" }}
          className="mt-14"
        >
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((row) => (
              <li key={row.job.id}>
                <JobMiniCard row={row} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Classifieds */}
      <Section
        id="classifieds"
        eyebrow="Classifieds"
        title="Local listings"
        subtitle="Reader-submitted ads tagged for this area hub."
        action={{ href: "/chennai-classifieds", label: "All classifieds" }}
        className="mt-14"
      >
        {classifieds.length > 0 ? (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {classifieds.map((listing) => (
              <li key={listing.id}>
                <ClassifiedMiniCard listing={listing} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-dashed border-[var(--border)] px-5 py-8 text-sm text-[var(--muted)]">
            No open classifieds tagged for this hub yet. Check{" "}
            <Link
              href="/chennai-classifieds"
              className="font-medium text-[var(--accent)] hover:underline"
            >
              Chennai classifieds
            </Link>{" "}
            for tuition, services, and wanted posts.
          </p>
        )}
      </Section>

      <div className="mt-14 flex justify-center">
        <AdSlot slotId="content-mid" size="300x250" />
      </div>

      {/* Commute */}
      <Section
        id="commute"
        eyebrow="Mobility"
        title="Commute, metro, and road works"
        subtitle="Phase-2 CMRL and junction upgrades — verify dates on official CMRL / GCC channels."
        className="mt-14"
      >
        <FactTable rows={content.commuteRows} />
      </Section>

      {/* Civic watchlist */}
      <Section
        id="civic"
        eyebrow="Civic desk"
        title={content.civicTitle}
        subtitle="Recurring themes in local civic reporting — not an official bulletin."
        className="mt-14"
      >
        <ul className="max-w-3xl space-y-3 text-sm leading-relaxed text-[var(--muted)]">
          {content.civicWatchlist.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-warm)]"
                aria-hidden
              />
              <span>
                <MarkdownBoldInline text={item} />
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Lifestyle notes */}
      {content.lifestyleNotes.length > 0 ? (
        <section id="lifestyle" className="mt-14" aria-labelledby="lifestyle-heading">
          <h2
            id="lifestyle-heading"
            className="type-display text-xl text-[var(--foreground)]"
          >
            Living here
          </h2>
          <ul className="mt-4 max-w-3xl space-y-3 text-sm leading-relaxed text-[var(--muted)]">
            {content.lifestyleNotes.map((note, i) => (
              <li key={i} className="flex gap-2">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                  aria-hidden
                />
                <MarkdownBoldInline text={note} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Guides & partner links */}
      {hasGuides ? (
        <Section
          id="guides"
          eyebrow="Shortcuts"
          title="Useful links for residents"
          subtitle="mychennaicity.in pages and local community resources for this hub."
          className="mt-14"
        >
          {content.practicalGuides.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {content.practicalGuides.map((guide) => (
                <li key={guide.href}>
                  {guide.external ? (
                    <a
                      href={guide.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 transition hover:border-[var(--accent)]"
                    >
                      <span className="text-sm font-semibold text-[var(--foreground)]">
                        {guide.label}
                      </span>
                      <span className="mt-2 block text-xs leading-relaxed text-[var(--muted)]">
                        {guide.hint}
                      </span>
                    </a>
                  ) : (
                    <Link
                      href={guide.href}
                      className="block h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 transition hover:border-[var(--accent)]"
                    >
                      <span className="text-sm font-semibold text-[var(--foreground)]">
                        {guide.label}
                      </span>
                      <span className="mt-2 block text-xs leading-relaxed text-[var(--muted)]">
                        {guide.hint}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ) : null}

          {content.partnerLinks.length > 0 ? (
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {content.partnerLinks.map((partner) => (
                <a
                  key={partner.href}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-[color-mix(in_srgb,var(--accent)_22%,var(--border))] bg-[color-mix(in_srgb,var(--accent)_5%,var(--surface))] p-5 transition hover:border-[var(--accent)]"
                >
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {partner.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {partner.description}
                  </p>
                </a>
              ))}
            </div>
          ) : null}
        </Section>
      ) : null}

      {/* Related hubs */}
      {relatedZones.length > 0 ? (
        <Section
          id="related"
          eyebrow="Nearby"
          title="Related area hubs"
          className="mcc-area-related mt-14"
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedZones.map((z) => (
              <li key={z.slug}>
                <Link
                  href={`/areas/${z.slug}`}
                  className="group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)]"
                >
                  <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)]">
                    {z.label}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--muted)]">
                    {z.blurb}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* FAQ */}
      <Section
        id="faq"
        eyebrow="FAQ"
        title="Common questions"
        className="mt-14"
      >
        <div className="max-w-3xl divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          {content.faq.map((item) => (
            <details key={item.question} className="group px-5 py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--foreground)] marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-3">
                  {item.question}
                  <span
                    className="mt-0.5 shrink-0 text-[var(--accent)] transition group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <HubCommunityStrip businessVariant="default" className="mt-14" />

      <p className="mt-10">
        <Link
          href="/areas"
          className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          ← All Chennai areas
        </Link>
      </p>

      <InteriorCrossNav />
    </div>
  );
}
