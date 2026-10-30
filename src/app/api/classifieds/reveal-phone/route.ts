import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { classifiedListings, classifiedPhoneReveals, cities } from "@/db/schema/tables";
import { getDb } from "@/db/client";
import { normalizeEnquirerName, normalizeIndianMobile } from "@/lib/classifieds/phone-gate";
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

  const contentType = request.headers.get("content-type") ?? "";
  let slugRaw: unknown;
  let phoneRaw: unknown;
  let nameRaw: unknown;
  try {
    if (contentType.includes("application/json")) {
      const body = (await request.json()) as {
        slug?: unknown;
        phone?: unknown;
        name?: unknown;
      };
      slugRaw = body.slug;
      phoneRaw = body.phone;
      nameRaw = body.name;
    } else {
      const form = await request.formData();
      slugRaw = form.get("slug");
      phoneRaw = form.get("phone");
      nameRaw = form.get("name");
    }
  } catch {
    return NextResponse.json({ error: "Send your name and mobile number." }, { status: 400, headers: NO_STORE });
  }

  const slug = typeof slugRaw === "string" ? slugRaw.trim() : "";
  const enquirer = typeof phoneRaw === "string" ? normalizeIndianMobile(phoneRaw) : null;
  const name = typeof nameRaw === "string" ? normalizeEnquirerName(nameRaw) : null;
  if (!slug || slug.length > 180 || !name) {
    return NextResponse.json(
      { error: "Enter your name." },
      { status: 400, headers: NO_STORE },
    );
  }
  if (!enquirer) {
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

  if (!row || row.status !== "open" || !row.gated) {
    return NextResponse.json(
      { error: "This contact is not available." },
      { status: 404, headers: NO_STORE },
    );
  }

  await db
    .insert(classifiedPhoneReveals)
    .values({ listingId: row.id, enquirerPhone: enquirer, enquirerName: name })
    .onConflictDoUpdate({
      target: [classifiedPhoneReveals.listingId, classifiedPhoneReveals.enquirerPhone],
      set: { enquirerName: name },
    });

  const poster = row.contactPhone ? normalizeIndianMobile(row.contactPhone) : null;
  if (!poster) {
    return NextResponse.json({ requested: true }, { headers: NO_STORE });
  }

  return NextResponse.json({ phone: poster }, { headers: NO_STORE });
}
