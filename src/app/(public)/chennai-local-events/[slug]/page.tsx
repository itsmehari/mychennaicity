import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetailStandard } from "@/components/events/event-detail-standard";
import {
  getPublicEventBySlug,
  getEventUniqueReaderViewCount,
  resolveEventPresentation,
} from "@/domains/events";
import { getSiteUrl } from "@/lib/env";
import {
  buildEventBreadcrumbJsonLd,
  buildEventJsonLd,
} from "@/lib/seo/event-jsonld";
import {
  buildFaqPageJsonLdFromItems,
  buildFestivalRichEventJsonLd,
} from "@/lib/seo/festival-event-jsonld";
import {
  buildClippedTitleSegment,
  fullSiteTitle,
} from "@/lib/seo/site-titles";
import { eventPosterAbsoluteUrl } from "@/lib/events/event-poster-image";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

function standardMetadataForEvent(
  ev: NonNullable<Awaited<ReturnType<typeof getPublicEventBySlug>>>,
): Metadata {
  const base = getSiteUrl();
  const url = `${base}/chennai-local-events/${ev.slug}`;
  const desc = (ev.description ?? ev.title).slice(0, 155);
  const titleSegment = buildClippedTitleSegment(
    ev.title,
    " · Chennai local events",
  );
  const docTitle = fullSiteTitle(titleSegment);
  const posterUrl = eventPosterAbsoluteUrl(ev.slug);
  const ogImages = posterUrl
    ? [{ url: posterUrl, width: 1200, height: 1600 }]
    : [{ url: "/opengraph-image", width: 1200, height: 630 }];
  return {
    title: titleSegment,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: docTitle,
      description: desc,
      url,
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      description: desc,
      images: posterUrl ? [posterUrl] : ["/twitter-image"],
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let ev: Awaited<ReturnType<typeof getPublicEventBySlug>> = null;
  try {
    ev = await getPublicEventBySlug(slug);
  } catch {
    return { title: { absolute: fullSiteTitle("Event not found") } };
  }
  if (!ev) return { title: { absolute: fullSiteTitle("Event not found") } };

  const rich = resolveEventPresentation(ev);
  if (rich) {
    const { content } = rich;
    const base = getSiteUrl();
    const url = `${base}/chennai-local-events/${ev.slug}`;
    const docTitle = fullSiteTitle(content.seo.metaTitle);
    return {
      title: content.seo.metaTitle,
      description: content.seo.metaDescription.slice(0, 160),
      alternates: { canonical: url },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title: docTitle,
        description: content.seo.metaDescription,
        url,
        type: "website",
        images: [
          {
            url: content.seo.ogImageUrl,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: docTitle,
        description: content.seo.metaDescription,
        images: [content.seo.ogImageUrl],
      },
    };
  }

  return standardMetadataForEvent(ev);
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const ev = await getPublicEventBySlug(slug);
  if (!ev) notFound();

  const uniqueReaderViews = await getEventUniqueReaderViewCount(ev.id);

  const rich = resolveEventPresentation(ev);
  if (rich) {
    const { entry, content } = rich;
    const Page = entry.Page;
    const eventLd = buildFestivalRichEventJsonLd(ev, content);
    const crumbLd = buildEventBreadcrumbJsonLd(ev.slug, ev.title);
    const faqLd = buildFaqPageJsonLdFromItems(content.faq);

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <Page event={ev} content={content} uniqueReaderViews={uniqueReaderViews} />
      </>
    );
  }

  const eventLd = buildEventJsonLd(ev);
  const crumbLd = buildEventBreadcrumbJsonLd(ev.slug, ev.title);

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
      <EventDetailStandard ev={ev} uniqueReaderViews={uniqueReaderViews} />
    </>
  );
}
