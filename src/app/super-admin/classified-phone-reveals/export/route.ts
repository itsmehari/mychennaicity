import { asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/db/client";
import { classifiedListings, classifiedPhoneReveals } from "@/db/schema/tables";
import { csvCell } from "@/lib/super-admin/desk-format";
import { readSuperAdminEmail } from "@/lib/super-admin/require";

export const dynamic = "force-dynamic";

export async function GET() {
  const email = await readSuperAdminEmail();
  if (!email) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  const rows = await getDb()
    .select({
      name: classifiedPhoneReveals.enquirerName,
      phone: classifiedPhoneReveals.enquirerPhone,
      createdAt: classifiedPhoneReveals.createdAt,
      followedUpAt: classifiedPhoneReveals.followedUpAt,
      title: classifiedListings.title,
      slug: classifiedListings.slug,
    })
    .from(classifiedPhoneReveals)
    .innerJoin(classifiedListings, eq(classifiedListings.id, classifiedPhoneReveals.listingId))
    .orderBy(asc(classifiedPhoneReveals.createdAt));

  const header = ["created_at", "name", "phone", "followed_up_at", "ad_title", "ad_slug"];
  const lines = [header.join(",")];
  for (const row of rows) {
    lines.push(
      [
        row.createdAt.toISOString(),
        row.name,
        row.phone,
        row.followedUpAt?.toISOString() ?? "",
        row.title,
        row.slug,
      ]
        .map((value) => csvCell(value))
        .join(","),
    );
  }

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=\"classified-contact-requests.csv\"",
      "X-Robots-Tag": "noindex",
    },
  });
}
