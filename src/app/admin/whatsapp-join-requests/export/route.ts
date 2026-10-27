import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb } from "@/db/client";
import { whatsappJoinVerifications } from "@/db/schema/tables";

export const dynamic = "force-dynamic";

function cell(value: string | null | undefined): string {
  const text = value ?? "";
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

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
    "created_at",
    "updated_at",
    "approved_at",
    "approved_by",
    "last_contacted_at",
    "notes",
  ];
  const lines = [header.join(",")];
  for (const row of rows) {
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
        row.createdAt.toISOString(),
        row.updatedAt.toISOString(),
        row.approvedAt?.toISOString() ?? "",
        row.approvedBy,
        row.lastContactedAt?.toISOString() ?? "",
        row.notes,
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
