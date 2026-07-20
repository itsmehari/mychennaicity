import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/client";
import { boundaryFeedback } from "@/db/schema/tables";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES = new Set([
  "incorrect_locality",
  "road_divided",
  "inaccessible_office",
  "neighbourhood_split",
  "flood_response",
  "duplicate_jurisdiction",
  "incorrect_ward",
]);

type Body = {
  type?: string;
  lat?: number;
  lng?: number;
  wardHint?: string | null;
  note?: string | null;
};

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 10_000) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type = body.type?.trim();
  if (!type || !ALLOWED_TYPES.has(type)) {
    return NextResponse.json({ error: "Invalid feedback type" }, { status: 400 });
  }

  const lat = body.lat;
  const lng = body.lng;
  if (
    typeof lat !== "number" ||
    typeof lng !== "number" ||
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    lat < 12.7 ||
    lat > 13.4 ||
    lng < 80.0 ||
    lng > 80.5
  ) {
    return NextResponse.json(
      { error: "Location must be within the Greater Chennai area" },
      { status: 400 },
    );
  }

  const rawWardHint = body.wardHint?.trim() || "";
  const wardHint = /^\d{1,3}$/.test(rawWardHint)
    ? rawWardHint.slice(0, 3)
    : null;
  const note = body.note?.trim().slice(0, 2000) || null;

  try {
    const db = getDb();
    await db.insert(boundaryFeedback).values({
      type,
      lat,
      lng,
      wardHint,
      note,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[boundary-feedback]", err);
    return NextResponse.json(
      {
        error:
          "Could not save report. Database may be unavailable — try again later.",
      },
      { status: 503 },
    );
  }
}
