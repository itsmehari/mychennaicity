import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { whatsappJoinVerifications } from "@/db/schema/tables";
import { readSuperAdminEmail } from "@/lib/super-admin/require";
import { loadWhatsappJoinCardExtras } from "@/lib/whatsapp-join-attribution";

export const dynamic = "force-dynamic";

function cell(value: string | null | undefined): string {
  const text = value ?? "";
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

export async function GET() {
  const email = await readSuperAdminEmail();
  if (!email) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  console.info(
    `[wa-join-csv] exported by ${email} at ${new Date().toISOString()}`,
  );
  const rows = await getDb()
    .select()
    .from(whatsappJoinVerifications)
    .orderBy(asc(whatsappJoinVerifications.createdAt));

  const header = [
    "display_name",
    "phone_raw",
    "phone_e164",
    "phone_last4",
    "locality",
    "intent",
    "intro",
    "status",
    "source",
    "first_source",
    "first_site",
    "first_page",
    "lang",
    "partner_code",
    "placement",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "verified_at",
    "declined_at",
    "created_at",
    "updated_at",
    "approved_at",
    "approved_by",
    "last_contacted_at",
    "notes",
    "ip_hash",
    "user_agent",
  ];
  const extras = await loadWhatsappJoinCardExtras(rows.map((row) => row.id));
  const lines = [header.join(",")];
  for (const row of rows) {
    const extra = extras.get(row.id);
    lines.push(
      [
        row.displayName,
        row.phoneRaw,
        row.phoneE164,
        row.phoneLast4,
        row.locality,
        row.intent,
        row.intro,
        row.status,
        row.source,
        extra?.firstSource ?? "",
        extra?.firstSite ?? "",
        extra?.firstPage ?? "",
        extra?.lang ?? "",
        extra?.partner ?? "",
        extra?.placement ?? "",
        extra?.utmSource ?? "",
        extra?.utmMedium ?? "",
        extra?.utmCampaign ?? "",
        extra?.verifiedAt?.toISOString() ?? "",
        extra?.declinedAt?.toISOString() ?? "",
        row.createdAt.toISOString(),
        row.updatedAt.toISOString(),
        row.approvedAt?.toISOString() ?? "",
        row.approvedBy,
        row.lastContactedAt?.toISOString() ?? "",
        row.notes,
        row.ipHash,
        row.userAgent,
      ]
        .map((value) => cell(value))
        .join(","),
    );
  }

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=\"whatsapp-join-requests.csv\"",
      "X-Robots-Tag": "noindex",
    },
  });
}
