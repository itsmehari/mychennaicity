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
  if (!end || end.hour > 23) return null;
  return formatConcertClock(end.hour, end.minute);
}

export function concertPrintsFinish(concert: MusicConcert): boolean {
  return concert.printedEndHour != null && concert.printedEndMinute != null;
}

/** Clock label for the finish. Printed closes win over the calendar hold. */
export function concertFinishLabel(concert: MusicConcert): string | null {
  if (
    concert.printedEndHour != null &&
    concert.printedEndMinute != null
  ) {
    return formatConcertClock(concert.printedEndHour, concert.printedEndMinute);
  }
  return concertHoldEndLabel(concert);
}

/** UTC instant of the finish. Used to avoid linking a public page that has ended. */
export function concertFinishInstant(concert: MusicConcert): Date | null {
  if (concert.startHour == null || concert.startMinute == null) return null;
  const [year, month, day] = concert.date.split("-").map(Number);
  let endYear = year;
  let endMonth = month;
  let endDay = day;
  let hour = concert.startHour;
  let minute = concert.startMinute;
  if (concert.printedEndHour != null && concert.printedEndMinute != null) {
    hour = concert.printedEndHour;
    minute = concert.printedEndMinute;
    if (concert.printedEndNextDay) {
      const next = new Date(Date.UTC(year, month - 1, day + 1));
      endYear = next.getUTCFullYear();
      endMonth = next.getUTCMonth() + 1;
      endDay = next.getUTCDate();
    }
  } else {
    const hold = concertHoldEnd(concert);
    if (hold && hold.hour <= 23) {
      hour = hold.hour;
      minute = hold.minute;
    }
  }
  return new Date(Date.UTC(endYear, endMonth - 1, endDay, hour - 5, minute - 30));
}
