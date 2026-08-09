import { NextResponse } from "next/server";
import { listPublishedArticlesForChennai } from "@/domains/news";
import {
  countOpenJobPostingsForChennaiHub,
  listOpenJobPostingsForChennaiHub,
} from "@/domains/jobs";
import { countOpenJobSeekerPostsForChennaiHub } from "@/domains/job-seekers";
import {
  countPublicEventsForChennaiHub,
  listPublicEventsForChennaiHub,
} from "@/domains/events";
import {
  countOpenClassifiedListingsForChennaiHub,
  listOpenClassifiedListingsForChennaiHub,
} from "@/domains/classifieds";
import { getLatestGoldRateSnapshotForChennai } from "@/domains/gold-rate";
import { formatEventDateBadge } from "@/lib/events/event-hub-helpers";
import { chennaiZones } from "@/lib/chennai-zones";
import type {
  NavPreviewResponse,
  NavPreviewSectionPayload,
} from "@/lib/nav/nav-preview-types";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";

export const dynamic = "force-dynamic";

function emptySection(
  partial: Pick<
    NavPreviewSectionPayload,
    "eyebrow" | "title" | "ctaHref" | "ctaLabel"
  >,
): NavPreviewSectionPayload {
  return {
    ...partial,
    countLabel: "—",
    items: [],
  };
}

export async function GET() {
  try {
    const [
      articles,
      jobs,
      jobCount,
      seekerCount,
      events,
      eventCount,
      classifieds,
      classifiedCount,
      gold,
    ] = await Promise.all([
      listPublishedArticlesForChennai(5),
      listOpenJobPostingsForChennaiHub(5, 0),
      countOpenJobPostingsForChennaiHub(),
      countOpenJobSeekerPostsForChennaiHub(),
      listPublicEventsForChennaiHub(5),
      countPublicEventsForChennaiHub(),
      listOpenClassifiedListingsForChennaiHub(4),
      countOpenClassifiedListingsForChennaiHub(),
      getLatestGoldRateSnapshotForChennai().catch(() => null),
    ]);

    const news: NavPreviewSectionPayload = {
      eyebrow: "Live desk",
      title: "Latest Chennai news",
      countLabel: articles.length
        ? `${articles.length}+ recent`
        : "No stories yet",
      items: articles.map((a) => ({
        href: `/chennai-local-news/${a.slug}`,
        title: a.title,
        meta: a.publishedAt
          ? new Date(a.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              timeZone: "Asia/Kolkata",
            })
          : "Recent",
        sub: a.category?.trim() || undefined,
      })),
      ctaHref: "/chennai-local-news",
      ctaLabel: "Open news hub",
    };

    const jobsPayload: NavPreviewSectionPayload = {
      eyebrow: "Hiring board",
      title: "Open jobs in Chennai",
      countLabel: `${jobCount} open · ${seekerCount} seeking`,
      items: jobs.map(({ job, employer }) => ({
        href: `${CHENNAI_JOBS_HUB_PATH}/${job.slug}`,
        title: job.title,
        meta: employer.name?.trim() || "Employer",
        sub: [job.locationLabel, job.employmentType]
          .filter(Boolean)
          .join(" · ") || undefined,
      })),
      ctaHref: CHENNAI_JOBS_HUB_PATH,
      ctaLabel: "Browse all jobs",
    };

    const eventsPayload: NavPreviewSectionPayload = {
      eyebrow: "Live calendar",
      title: "Next up in Chennai",
      countLabel: `${eventCount} upcoming`,
      items: events.map((e) => {
        const venue = [e.venueName?.trim(), e.localityLabel?.trim()]
          .filter(Boolean)
          .join(", ");
        return {
          href: `/chennai-local-events/${e.slug}`,
          title: e.title,
          meta: formatEventDateBadge(e.startsAt),
          sub: venue || "Chennai",
        };
      }),
      ctaHref: "/chennai-local-events#browse-events",
      ctaLabel: "Browse all listings",
    };

    const goldLine = gold
      ? `24K ₹${Math.round(Number(gold.rate24kPerGram)).toLocaleString("en-IN")}/g`
      : "Gold rate desk";

    const explore: NavPreviewSectionPayload = {
      eyebrow: "City tools",
      title: "Explore right now",
      countLabel: `${classifiedCount} classifieds · ${goldLine}`,
      items: [
        {
          href: "/chennai-gold-rate",
          title: "Chennai gold rate today",
          meta: goldLine,
          sub: gold ? "24K / 22K snapshot" : "Open the calculator",
        },
        ...classifieds.slice(0, 3).map((c) => ({
          href: `/chennai-classifieds/${c.slug}`,
          title: c.title,
          meta: "Classified",
          sub: c.locationLabel?.trim() || "Greater Chennai",
        })),
      ],
      ctaHref: "/directory",
      ctaLabel: "Open directory",
    };

    const spotlight = [
      "adyar-thiruvanmiyur",
      "kodambakkam-t-nagar",
      "omr-perungudi-sholinganallur",
      "ambattur-annanagar",
      "teynampet-nungambakkam",
    ];
    const areas: NavPreviewSectionPayload = {
      eyebrow: "Neighbourhoods",
      title: "Area hubs",
      countLabel: `${chennaiZones.length} macro areas`,
      items: spotlight
        .map((slug) => chennaiZones.find((z) => z.slug === slug))
        .filter(Boolean)
        .map((z) => ({
          href: `/areas/${z!.slug}`,
          title: z!.label,
          meta: "Area guide",
          sub: z!.blurb,
        })),
      ctaHref: "/chennai-map",
      ctaLabel: "Open city map",
    };

    const body: NavPreviewResponse = {
      updatedAt: new Date().toISOString(),
      news,
      jobs: jobsPayload,
      events: eventsPayload,
      explore,
      areas,
    };

    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch {
    return NextResponse.json(
      {
        updatedAt: new Date().toISOString(),
        news: emptySection({
          eyebrow: "Live desk",
          title: "Latest Chennai news",
          ctaHref: "/chennai-local-news",
          ctaLabel: "Open news hub",
        }),
        jobs: emptySection({
          eyebrow: "Hiring board",
          title: "Open jobs in Chennai",
          ctaHref: CHENNAI_JOBS_HUB_PATH,
          ctaLabel: "Browse all jobs",
        }),
        events: emptySection({
          eyebrow: "Live calendar",
          title: "Next up in Chennai",
          ctaHref: "/chennai-local-events",
          ctaLabel: "Browse all listings",
        }),
        explore: emptySection({
          eyebrow: "City tools",
          title: "Explore right now",
          ctaHref: "/directory",
          ctaLabel: "Open directory",
        }),
        areas: emptySection({
          eyebrow: "Neighbourhoods",
          title: "Area hubs",
          ctaHref: "/chennai-map",
          ctaLabel: "Open city map",
        }),
      } satisfies NavPreviewResponse,
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  }
}
