import { NextRequest, NextResponse } from "next/server";
import { getPublicEventBySlug } from "@/domains/events";
import {
  getEventUniqueReaderViewCount,
  recordEventReaderView,
} from "@/domains/events/view-tracking";
import { shouldSuppressGoogleMeasurementForRequest } from "@/lib/analytics-ip-exclusion";
import {
  createVisitorId,
  EVENT_VIEWER_COOKIE,
  eventViewerCookieOptions,
  isValidVisitorId,
} from "@/lib/events/event-viewer-cookie";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ slug: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const event = await getPublicEventBySlug(slug);
  if (!event) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  let visitorId = request.cookies.get(EVENT_VIEWER_COOKIE)?.value ?? null;
  if (!isValidVisitorId(visitorId)) {
    visitorId = createVisitorId();
  }

  const suppress = shouldSuppressGoogleMeasurementForRequest(request.headers);
  let uniqueViews = await getEventUniqueReaderViewCount(event.id);

  if (!suppress) {
    const result = await recordEventReaderView(event.id, visitorId);
    uniqueViews = result.uniqueViews;
  }

  const response = NextResponse.json({ ok: true, uniqueViews });
  response.cookies.set(EVENT_VIEWER_COOKIE, visitorId, eventViewerCookieOptions());
  return response;
}
