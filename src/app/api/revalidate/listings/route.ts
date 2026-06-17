import { NextRequest, NextResponse } from "next/server";
import { revalidateListingsSurfaces } from "@/lib/revalidate-listings-surfaces";

/**
 * Bust cached sitemap + jobs/events hubs (and optional detail slugs) after DB seeds.
 * POST /api/revalidate/listings?secret=…&jobSlug=…&eventSlug=…
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expected = process.env.REVALIDATE_SECRET?.trim();
  if (!expected || secret !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const jobSlug = request.nextUrl.searchParams.get("jobSlug")?.trim();
  const eventSlug = request.nextUrl.searchParams.get("eventSlug")?.trim();
  revalidateListingsSurfaces({
    jobSlug: jobSlug || undefined,
    eventSlug: eventSlug || undefined,
  });

  return NextResponse.json({
    ok: true,
    jobSlug: jobSlug ?? null,
    eventSlug: eventSlug ?? null,
  });
}
