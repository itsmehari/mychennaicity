import { NextResponse } from "next/server";
import {
  countPublicEventsForChennaiHub,
  listPublicEventsForChennaiHub,
} from "@/domains/events";
import { formatEventDateBadge } from "@/lib/events/event-hub-helpers";
import type {
  EventsNavPreviewItem,
  EventsNavPreviewResponse,
} from "@/lib/events/nav-preview-types";

export const dynamic = "force-dynamic";

/** Compact upcoming list for the Local events megamenu — keep fresh. */
export async function GET() {
  try {
    const [rows, count] = await Promise.all([
      listPublicEventsForChennaiHub(6),
      countPublicEventsForChennaiHub(),
    ]);

    const upcoming: EventsNavPreviewItem[] = rows.map((e) => {
      const venue = [e.venueName?.trim(), e.localityLabel?.trim()]
        .filter(Boolean)
        .join(", ");
      return {
        slug: e.slug,
        title: e.title,
        href: `/chennai-local-events/${e.slug}`,
        dateBadge: formatEventDateBadge(e.startsAt),
        venueLine: venue || "Chennai",
      };
    });

    const body: EventsNavPreviewResponse = {
      count,
      upcoming,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch {
    return NextResponse.json(
      {
        count: 0,
        upcoming: [],
        updatedAt: new Date().toISOString(),
      } satisfies EventsNavPreviewResponse,
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  }
}
