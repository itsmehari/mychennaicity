import { NextResponse } from "next/server";
import { loadSuperAdminSnapshot } from "@/domains/analytics/super-admin-catalog";
import { CANONICAL_SITE_URL } from "@/lib/canonical-site";
import { csvCell } from "@/lib/super-admin/desk-format";
import { readSuperAdminEmail } from "@/lib/super-admin/require";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const email = await readSuperAdminEmail();
  if (!email) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  const url = new URL(request.url);
  const snapshot = await loadSuperAdminSnapshot({
    desk: "jobs",
    query: url.searchParams.get("q") ?? "",
    status: url.searchParams.get("status") ?? undefined,
    kind: url.searchParams.get("kind") ?? undefined,
    sort: url.searchParams.get("sort") ?? undefined,
    unpaged: true,
  });

  const header = [
    "kind",
    "title",
    "slug",
    "status",
    "employer_area",
    "published_at",
    "valid_through",
    "views",
    "views_7d",
    "readers",
    "legacy_readers",
    "calls",
    "calls_7d",
    "whatsapp",
    "whatsapp_7d",
    "public_url",
  ];
  const lines = [header.join(",")];
  for (const row of snapshot.items) {
    lines.push(
      [
        row.kind,
        row.title,
        row.slug,
        row.status,
        row.detail ?? "",
        row.when?.toISOString() ?? "",
        row.validThrough?.toISOString() ?? "",
        String(row.views),
        String(row.views7d),
        String(row.uniqueReaders),
        String(row.legacyReaders ?? 0),
        String(row.callClicks),
        String(row.callClicks7d ?? 0),
        String(row.whatsappClicks),
        String(row.whatsappClicks7d ?? 0),
        `${CANONICAL_SITE_URL}${row.href}`,
      ]
        .map((value) => csvCell(value))
        .join(","),
    );
  }

  return new NextResponse(`${lines.join("\n")}\n`, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="job-views.csv"',
      "cache-control": "no-store",
    },
  });
}
