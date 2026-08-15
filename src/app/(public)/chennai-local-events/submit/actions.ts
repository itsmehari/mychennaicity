"use server";

import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { cities, events } from "@/db/schema/tables";
import { clientIpFromHeaders } from "@/lib/analytics-ip-exclusion";
import { rateLimitConsume } from "@/lib/rate-limit";

function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return base || "chennai-event";
}

export type EventSubmitState = {
  ok: boolean;
  message: string;
};

export async function submitChennaiEvent(
  _prev: EventSubmitState | null,
  formData: FormData,
): Promise<EventSubmitState> {
  const title = String(formData.get("title") ?? "").trim();
  const venueName = String(formData.get("venueName") ?? "").trim();
  const localityLabel = String(formData.get("locality") ?? "").trim();
  const startsLocal = String(formData.get("startsAt") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const contact = String(formData.get("contact") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();
  const hp = String(formData.get("company") ?? "").trim();

  if (hp) {
    return { ok: true, message: "Thanks — we will review this listing." };
  }

  if (title.length < 8 || description.length < 40 || !startsLocal) {
    return {
      ok: false,
      message: "Need a title (8+ chars), date/time, and a 40+ character description.",
    };
  }

  const headerList = await headers();
  const ip = clientIpFromHeaders(headerList) ?? "unknown";
  const limit = rateLimitConsume(`event-submit:${ip}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return {
      ok: false,
      message: `Too many submissions from this network. Try again in ${limit.retryAfterSec} seconds.`,
    };
  }

  const iso =
    startsLocal.length === 16 ? `${startsLocal}+05:30` : startsLocal;
  const startsAt = new Date(iso);
  if (Number.isNaN(startsAt.getTime())) {
    return { ok: false, message: "Could not parse the start date/time." };
  }

  const db = getDb();
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);
  if (!city) {
    return { ok: false, message: "City record missing — email Contact instead." };
  }

  const day = startsAt.toISOString().slice(0, 10);
  let slug = `${slugify(title)}-${day}`;
  const [clash] = await db
    .select({ id: events.id })
    .from(events)
    .where(and(eq(events.cityId, city.id), eq(events.slug, slug)))
    .limit(1);
  if (clash) slug = `${slug}-${Date.now().toString(36)}`;

  const body = [
    description,
    contact ? `\n\n**Organiser contact:** ${contact}` : "",
    website ? `\n\n**Link:** ${website}` : "",
    "\n\n_Submitted via /chennai-local-events/submit — draft until editors schedule it._",
  ].join("");

  await db.insert(events).values({
    cityId: city.id,
    slug,
    title,
    description: body,
    startsAt,
    endsAt: null,
    allDay: false,
    venueName: venueName || null,
    venueAddress: null,
    localityLabel: localityLabel || null,
    status: "draft",
    featured: false,
  });

  return {
    ok: true,
    message:
      "Received as a draft. It will not appear on the public hub until an editor schedules it. We may email or WhatsApp the contact you left.",
  };
}
