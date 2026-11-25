import type { MusicConcert } from "@/content/music/types";

/** Weekday and long date in IST for a YYYY-MM-DD concert date. */
export function formatConcertDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const instant = new Date(Date.UTC(year, month - 1, day, 6, 30));
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(instant);
}

export function formatConcertClock(hour: number, minute: number): string {
  const hour12 = hour % 12 || 12;
  const suffix = hour < 12 ? "AM" : "PM";
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function concertStartLabel(concert: MusicConcert): string {
  if (concert.startHour == null || concert.startMinute == null) return "TBD";
  return formatConcertClock(concert.startHour, concert.startMinute);
}

export function concertHoldEnd(
  concert: MusicConcert,
): { hour: number; minute: number } | null {
  if (concert.startHour == null || concert.startMinute == null) return null;
  const total =
    concert.startHour * 60 + concert.startMinute + concert.holdHours * 60;
  return { hour: Math.floor(total / 60), minute: total % 60 };
}

export function concertHoldEndLabel(concert: MusicConcert): string | null {
  const end = concertHoldEnd(concert);
  if (!end) return null;
  return formatConcertClock(end.hour, end.minute);
}
