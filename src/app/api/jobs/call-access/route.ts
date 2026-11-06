import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import {
  cities,
  jobPhoneReveals,
  jobPostings,
  jobSeekerPhoneReveals,
  jobSeekerPosts,
} from "@/db/schema/tables";
import { getDb } from "@/db/client";
import { normalizeIndianMobile } from "@/lib/classifieds/phone-gate";
import {
  extractEmployerPhoneFromApplyUrl,
  extractSeekerContactPhone,
} from "@/lib/jobs/job-call-phone";
import { rateLimitConsume } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const NO_STORE = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
} as const;

type ListingKind = "job" | "job_seeker";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const limit = rateLimitConsume(`job-call-access:${ip}`, 12, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { ...NO_STORE, "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  let slugRaw: unknown;
  let phoneRaw: unknown;
  let kindRaw: unknown;
  try {
    const body = (await request.json()) as {
      slug?: unknown;
      phone?: unknown;
      kind?: unknown;
    };
    slugRaw = body.slug;
    phoneRaw = body.phone;
    kindRaw = body.kind;
  } catch {
    return NextResponse.json(
      { error: "Enter your mobile number." },
      { status: 400, headers: NO_STORE },
    );
  }

  const slug = typeof slugRaw === "string" ? slugRaw.trim() : "";
  const kind: ListingKind =
    kindRaw === "job_seeker" ? "job_seeker" : "job";
  const enquirer =
    typeof phoneRaw === "string" ? normalizeIndianMobile(phoneRaw) : null;

  if (!slug || slug.length > 180 || !enquirer) {
    return NextResponse.json(
      { error: "Enter a valid 10-digit Indian mobile number." },
      { status: 400, headers: NO_STORE },
    );
  }

  const db = getDb();

  if (kind === "job_seeker") {
    const [row] = await db
      .select({
        id: jobSeekerPosts.id,
        status: jobSeekerPosts.status,
        contactPhone: jobSeekerPosts.contactPhone,
        contactWhatsApp: jobSeekerPosts.contactWhatsApp,
      })
      .from(jobSeekerPosts)
      .innerJoin(cities, eq(cities.id, jobSeekerPosts.cityId))
      .where(and(eq(cities.slug, "chennai"), eq(jobSeekerPosts.slug, slug)))
      .limit(1);

    if (!row || row.status !== "open") {
      return NextResponse.json(
        { error: "This listing is not available." },
        { status: 404, headers: NO_STORE },
      );
    }

    const posterPhone = extractSeekerContactPhone(row);
    if (!posterPhone) {
      return NextResponse.json(
        { error: "No call number on this listing." },
        { status: 404, headers: NO_STORE },
      );
    }

    await db
      .insert(jobSeekerPhoneReveals)
      .values({
        jobSeekerPostId: row.id,
        enquirerPhone: enquirer,
      })
      .onConflictDoNothing();

    return NextResponse.json({ phone: posterPhone }, { headers: NO_STORE });
  }

  const [row] = await db
    .select({
      id: jobPostings.id,
      status: jobPostings.status,
      applicationUrl: jobPostings.applicationUrl,
    })
    .from(jobPostings)
    .innerJoin(cities, eq(cities.id, jobPostings.cityId))
    .where(and(eq(cities.slug, "chennai"), eq(jobPostings.slug, slug)))
    .limit(1);

  if (!row || row.status !== "open") {
    return NextResponse.json(
      { error: "This listing is not available." },
      { status: 404, headers: NO_STORE },
    );
  }

  const employerPhone = extractEmployerPhoneFromApplyUrl(row.applicationUrl);
  if (!employerPhone) {
    return NextResponse.json(
      { error: "No call number on this listing." },
      { status: 404, headers: NO_STORE },
    );
  }

    await db
      .insert(jobPhoneReveals)
      .values({
        jobId: row.id,
        enquirerPhone: enquirer,
      })
      .onConflictDoNothing();

  return NextResponse.json({ phone: employerPhone }, { headers: NO_STORE });
}
