import { NextRequest, NextResponse } from "next/server";
import { recordContentEngagement } from "@/domains/analytics/content-engagement";
import { isCrawlerUserAgent } from "@/lib/analytics/crawler-ua";
import {
  isContentKind,
  isEngagementEventKind,
  isTrackedSlug,
} from "@/lib/analytics/engagement-events";
import { parseBannerClickSlug } from "@/lib/partner-ads";
import { shouldSuppressGoogleMeasurementForRequest } from "@/lib/analytics-ip-exclusion";
import {
  createVisitorId,
  EVENT_VIEWER_COOKIE,
  eventViewerCookieOptions,
  isValidVisitorId,
} from "@/lib/events/event-viewer-cookie";
import { rateLimitConsume } from "@/lib/rate-limit";
import { readSuperAdminSession, SUPER_ADMIN_COOKIE } from "@/lib/super-admin/session";

export const dynamic = "force-dynamic";

function clientIp(headerList: Headers): string {
  return (
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function ok(): NextResponse {
  return NextResponse.json({ ok: true });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json({ ok: false }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ ok: false }, { status: 403 });
    }
  }

  if (isCrawlerUserAgent(request.headers.get("user-agent"))) {
    return ok();
  }
  if (readSuperAdminSession(request.cookies.get(SUPER_ADMIN_COOKIE)?.value)) {
    return ok();
  }
  if (shouldSuppressGoogleMeasurementForRequest(request.headers)) return ok();

  const limit = rateLimitConsume(`engagement:${clientIp(request.headers)}`, 40, 60_000);
  if (!limit.ok) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > 400) return NextResponse.json({ ok: false }, { status: 400 });
    body = JSON.parse(text) as unknown;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const kind = "kind" in body ? String(body.kind) : "";
  const slug = "slug" in body ? String(body.slug) : "";
  const event = "event" in body ? String(body.event) : "";
  if (!isContentKind(kind) || !isEngagementEventKind(event) || !isTrackedSlug(slug)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (kind === "banner") {
    if (event !== "banner_click" || !parseBannerClickSlug(slug)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
  } else if (event === "banner_click") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  let visitorId = request.cookies.get(EVENT_VIEWER_COOKIE)?.value ?? null;
  if (!isValidVisitorId(visitorId)) visitorId = createVisitorId();

  const response = NextResponse.json({ ok: true });
  response.cookies.set(EVENT_VIEWER_COOKIE, visitorId, eventViewerCookieOptions());

  await recordContentEngagement({ kind, slug, eventKind: event, visitorId });
  return response;
}
