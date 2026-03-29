import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleProse } from "@/components/news/article-prose";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getPublicEventBySlug } from "@/domains/events";
import { getSiteUrl } from "@/lib/env";
import {
  buildEventBreadcrumbJsonLd,
  buildEventJsonLd,
} from "@/lib/seo/event-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let ev: Awaited<ReturnType<typeof getPublicEventBySlug>> = null;
  try {
    ev = await getPublicEventBySlug(slug);
  } catch {
    return { title: { absolute: fullSiteTitle("Event not found") } };
  }
  if (!ev) return { title: { absolute: fullSiteTitle("Event not found") } };
  const base = getSiteUrl();
  const url = `${base}/chennai-local-events/${ev.slug}`;
  const desc = (ev.description ?? ev.title).slice(0, 155);
  const titleSegment = `${ev.title} · Chennai local events`;
  const docTitle = fullSiteTitle(titleSegment);
  return {
    title: titleSegment,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: docTitle,
      description: desc,
      url,
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      description: desc,
      images: ["/twitter-image"],
    },
  };
}

function formatWhen(startsAt: Date, endsAt: Date | null, allDay: boolean) {
  const opts: Intl.DateTimeFormatOptions = allDay
    ? { dateStyle: "medium", timeZone: "Asia/Kolkata" }
    : { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" };
  const a = startsAt.toLocaleString("en-IN", opts);
  if (!endsAt || +endsAt === +startsAt) return a;
  const b = endsAt.toLocaleString("en-IN", opts);
  return `${a} – ${b}`;
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const ev = await getPublicEventBySlug(slug);
  if (!ev) notFound();

  const eventLd = buildEventJsonLd(ev);
  const crumbLd = buildEventBreadcrumbJsonLd(ev.slug, ev.title);
  const desc = ev.description ?? "";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }}
      />
      <div className={interiorMainClassName}>
        <PageBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Chennai local events", href: "/chennai-local-events" },
            { label: ev.title },
          ]}
        />
        <p className="type-eyebrow text-[var(--accent-warm)]">Event</p>
        <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
          {ev.title}
        </h1>
        <p className="type-lede mt-4 text-sm text-[var(--muted)]">
          {formatWhen(ev.startsAt, ev.endsAt, ev.allDay)}
          {ev.venueName ? ` · ${ev.venueName}` : null}
          {ev.localityLabel ? ` · ${ev.localityLabel}` : null}
        </p>
        {ev.venueAddress ? (
          <p className="type-lede mt-2 text-sm text-[var(--muted)]">
            {ev.venueAddress}
          </p>
        ) : null}
        {desc.trim() ? (
          <div className="mt-8">
            <ArticleProse content={desc} />
          </div>
        ) : (
          <p className="type-lede mt-8 text-sm text-[var(--muted)]">
            No detailed description on file — confirm timings with the organiser.
          </p>
        )}
        <InteriorCrossNav />
      </div>
    </>
  );
}
