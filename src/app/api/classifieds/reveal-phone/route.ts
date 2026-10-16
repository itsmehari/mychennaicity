import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { classifiedListings, classifiedPhoneReveals, cities } from "@/db/schema/tables";
import { getDb } from "@/db/client";
import { normalizeIndianMobile } from "@/lib/classifieds/phone-gate";
import { rateLimitConsume } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const NO_STORE = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
} as const;

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const limit = rateLimitConsume(`classified-reveal:${ip}`, 8, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { ...NO_STORE, "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  let body: { slug?: unknown; phone?: unknown };
  try {
    body = (await request.json()) as { slug?: unknown; phone?: unknown };
  } catch {
    return NextResponse.json({ error: "Send a mobile number." }, { status: 400, headers: NO_STORE });
  }

  const slug = typeof body.slug === "string" ? body.slug.trim() : "";
  const enquirer = typeof body.phone === "string" ? normalizeIndianMobile(body.phone) : null;
  if (!slug || slug.length > 180 || !enquirer) {
    return NextResponse.json(
      { error: "Enter a valid 10-digit Indian mobile number." },
      { status: 400, headers: NO_STORE },
    );
  }

  const db = getDb();
  const [row] = await db
    .select({
      id: classifiedListings.id,
      contactPhone: classifiedListings.contactPhone,
      gated: classifiedListings.contactPhoneGated,
      status: classifiedListings.status,
    })
    .from(classifiedListings)
    .innerJoin(cities, eq(cities.id, classifiedListings.cityId))
    .where(and(eq(cities.slug, "chennai"), eq(classifiedListings.slug, slug)))
    .limit(1);

  const poster = row?.contactPhone ? normalizeIndianMobile(row.contactPhone) : null;
  if (!row || row.status !== "open" || !row.gated || !poster) {
    return NextResponse.json(
      { error: "This contact is not available." },
      { status: 404, headers: NO_STORE },
    );
  }

  await db
    .insert(classifiedPhoneReveals)
    .values({ listingId: row.id, enquirerPhone: enquirer })
    .onConflictDoNothing();

  return NextResponse.json({ phone: poster }, { headers: NO_STORE });
}
