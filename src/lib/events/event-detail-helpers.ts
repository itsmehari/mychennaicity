import type { PublicEventRow } from "@/domains/events";
import { businessWhatsAppHref, getBusinessWhatsAppCopy } from "@/lib/whatsapp-cta-copy";

/** Dedicated public submission route — not live yet; use contact/WhatsApp flow. */
export const EVENT_POST_SUBMIT_PATH = "/contact";

export type EventDetailRow = { label: string; value: string };

const IST = "Asia/Kolkata";

export function formatEventDate(
  startsAt: Date,
  endsAt: Date | null,
  allDay: boolean,
): string {
  const dateOpts: Intl.DateTimeFormatOptions = {
    dateStyle: "medium",
    timeZone: IST,
  };
  const start = startsAt.toLocaleString("en-IN", dateOpts);
  if (!endsAt || +endsAt === +startsAt) return start;
  const endDate = endsAt.toLocaleString("en-IN", dateOpts);
  if (start === endDate) return start;
  return `${start} – ${endDate}`;
}

export function formatEventTime(
  startsAt: Date,
  endsAt: Date | null,
  allDay: boolean,
): string | null {
  if (allDay) return "All day";
  const timeOpts: Intl.DateTimeFormatOptions = {
    timeStyle: "short",
    timeZone: IST,
  };
  const a = startsAt.toLocaleString("en-IN", timeOpts);
  if (!endsAt || +endsAt === +startsAt) return a;
  const b = endsAt.toLocaleString("en-IN", timeOpts);
  return `${a} – ${b}`;
}

export function getEventCategoryLabel(
  presentationKey: string | null,
): string | null {
  if (!presentationKey?.trim()) return "Local event";
  const map: Record<string, string> = {
    festival_rich: "Festival",
  };
  return map[presentationKey] ?? "Local event";
}

/** Best-effort organiser from markdown body — no dedicated DB field yet. */
export function extractOrganizerFromDescription(
  description: string | null | undefined,
): string | null {
  if (!description?.trim()) return null;
  const labelled = description.match(
    /\*\*(?:Organiser|Organizer|Hosted by|Presented by):?\*\*[:\s]*([^\n*]+)/i,
  );
  if (labelled?.[1]?.trim()) return labelled[1].trim();
  const presents = description.match(/\*\*([^*]+)\*\*\s+presents\b/i);
  if (presents?.[1]?.trim()) return presents[1].trim();
  return null;
}

/** Booking / ticket URL from `**Booking:** [label](url)` in seeded descriptions. */
export function extractBookingUrlFromDescription(
  description: string | null | undefined,
): string | null {
  if (!description?.trim()) return null;
  const m = description.match(/\*\*Booking:\*\*\s*\[[^\]]+\]\(([^)]+)\)/i);
  const url = m?.[1]?.trim();
  if (!url || !/^https?:\/\//i.test(url)) return null;
  return url;
}

/** Headliner from titles like "Vir Das — …", "… ft. Kitty Amor", "… by Aashish Solanki". */
export function extractPerformerFromTitle(title: string): string | null {
  const t = title.trim();
  if (!t) return null;
  const ft = t.match(/\bft\.?\s+([^—–\-|]+)/i);
  if (ft?.[1]?.trim()) return ft[1].trim();
  const by = t.match(/\bby\s+([A-Z][^—–\-|]+)/i);
  if (by?.[1]?.trim()) return by[1].trim();
  const live = t.match(/^([A-Z][^—–\-|]+?)\s+Live\b/i);
  if (live?.[1]?.trim()) return live[1].trim();
  const dash = t.match(/^([^—–\-|]+?)\s+[—–\-]/);
  if (dash?.[1]?.trim() && dash[1].length < 48) return dash[1].trim();
  return null;
}

/** Category line from seeded event descriptions: `**Live music & concerts** in …` */
export function extractCategoryFromDescription(
  description: string | null | undefined,
): string | null {
  if (!description?.trim()) return null;
  const m = description.match(/^\*\*([^*]+)\*\*/);
  return m?.[1]?.trim() ?? null;
}

export function buildMapsSearchUrl(ev: PublicEventRow): string | null {
  const parts = [
    ev.venueName?.trim(),
    ev.venueAddress?.trim(),
    ev.localityLabel?.trim(),
    "Chennai",
  ].filter(Boolean);
  if (parts.length <= 1 && !ev.venueAddress?.trim() && !ev.venueName?.trim()) {
    return null;
  }
  const query = parts.join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function gcalParts(d: Date): {
  y: string;
  m: string;
  day: string;
  h: string;
  min: string;
  s: string;
} {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: IST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "00";
  return {
    y: get("year"),
    m: get("month"),
    day: get("day"),
    h: get("hour"),
    min: get("minute"),
    s: get("second"),
  };
}

function toGCalDateTime(d: Date): string {
  const { y, m, day, h, min, s } = gcalParts(d);
  return `${y}${m}${day}T${h}${min}${s}`;
}

function toGCalDate(d: Date): string {
  const { y, m, day } = gcalParts(d);
  return `${y}${m}${day}`;
}

/** Google Calendar “add event” URL from `starts_at` / `ends_at` (IST). */
export function buildGoogleCalendarUrl(ev: PublicEventRow): string | null {
  if (!ev.startsAt) return null;
  const end = ev.endsAt ?? ev.startsAt;
  const loc = [
    ev.venueName?.trim(),
    ev.venueAddress?.trim(),
    ev.localityLabel?.trim(),
  ]
    .filter(Boolean)
    .join(", ");
  const details = (ev.description ?? "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^#+\s+/gm, "")
    .trim()
    .slice(0, 800);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.title,
    ctz: IST,
  });
  if (ev.allDay) {
    const endDay = new Date(end);
    endDay.setDate(endDay.getDate() + 1);
    params.set(
      "dates",
      `${toGCalDate(ev.startsAt)}/${toGCalDate(endDay)}`,
    );
  } else {
    params.set("dates", `${toGCalDateTime(ev.startsAt)}/${toGCalDateTime(end)}`);
  }
  if (loc) params.set("location", loc);
  if (details) params.set("details", details);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildEventEnquireHref(): string {
  const row = getBusinessWhatsAppCopy("events");
  return businessWhatsAppHref(row);
}

export function buildEventDetailRows(ev: PublicEventRow): EventDetailRow[] {
  const rows: EventDetailRow[] = [];

  const date = formatEventDate(ev.startsAt, ev.endsAt, ev.allDay);
  if (date) rows.push({ label: "Date", value: date });

  const time = formatEventTime(ev.startsAt, ev.endsAt, ev.allDay);
  if (time) rows.push({ label: "Time", value: time });

  if (ev.venueName?.trim()) {
    rows.push({ label: "Venue", value: ev.venueName.trim() });
  }
  if (ev.venueAddress?.trim()) {
    rows.push({ label: "Address", value: ev.venueAddress.trim() });
  }
  if (ev.localityLabel?.trim()) {
    rows.push({ label: "Area", value: ev.localityLabel.trim() });
  }

  const organizer = extractOrganizerFromDescription(ev.description);
  if (organizer) rows.push({ label: "Organiser", value: organizer });

  const category = getEventCategoryLabel(ev.presentationKey);
  if (category) rows.push({ label: "Event type", value: category });

  return rows;
}

export function splitDescriptionIntro(
  description: string,
): { intro: string; rest: string | null } {
  const trimmed = description.trim();
  if (!trimmed) return { intro: "", rest: null };
  const idx = trimmed.indexOf("\n\n");
  if (idx === -1) return { intro: trimmed, rest: null };
  const intro = trimmed.slice(0, idx).trim();
  const rest = trimmed.slice(idx + 2).trim();
  return { intro, rest: rest || null };
}

const AUDIENCE_BY_CATEGORY: Record<string, string[]> = {
  festival_rich: [
    "Families",
    "Residents nearby",
    "Community members",
    "Visitors to Chennai",
  ],
  default: [
    "Entrepreneurs",
    "MSME owners",
    "Students",
    "Professionals",
    "Local business owners",
    "Community members",
    "Job seekers",
    "Families",
    "Residents nearby",
  ],
};

export function getEventAudienceTags(ev: PublicEventRow): string[] {
  const key = ev.presentationKey?.trim() || "default";
  const base = AUDIENCE_BY_CATEGORY[key] ?? AUDIENCE_BY_CATEGORY.default;
  const tags = [...base];
  if (ev.localityLabel?.trim()) {
    const nearby = `Residents in ${ev.localityLabel.trim()}`;
    if (!tags.includes(nearby)) tags.push(nearby);
  }
  return tags.slice(0, 8);
}

export function plainEventShareText(ev: PublicEventRow): string {
  const when = formatEventDate(ev.startsAt, ev.endsAt, ev.allDay);
  const where = ev.venueName ?? ev.localityLabel ?? "Chennai";
  return `${ev.title} — ${when} · ${where}`;
}
