/**
 * Beach–Tambaram late-night cancellations, Guindy block, 26 Sep–4 Oct 2026.
 * Dates follow the Chennai Division list. A blank cell means the list did not
 * cancel that train on that date — it is not a promise the train will run.
 */

export const BEACH_TAMBARAM_CANCELLATIONS_SLUG =
  "chennai-suburban-train-cancellations-beach-tambaram-guindy-september-2026";

export const BEACH_TAMBARAM_CANCELLATIONS_H1 =
  "Chennai suburban train alert: Beach–Tambaram late-night services cancelled on select days till 4 October";

export const BEACH_TAMBARAM_CANCELLATIONS_DEK =
  "Southern Railway’s Chennai Division has listed selected late-night EMUs for cancellation while Guindy station is under a night engineering block. The list is not the same train every night.";

export const BEACH_TAMBARAM_CANCELLATIONS_SUMMARY =
  "Selected late-night Beach–Tambaram EMUs are cancelled through 3 October for Guindy station work. Check the train and the date before you travel.";

export const BEACH_TAMBARAM_PUBLISHED_LABEL = "27 September 2026";

/** End of the last published engineering block: 4 Oct 2026, 2:45 a.m. IST. */
export const MAINTENANCE_ENDS_AT = "2026-10-04T02:45:00+05:30";

export const MAINTENANCE_WINDOW = "12:15 a.m. to 2:45 a.m.";

export type ServiceId = "beach-2359" | "tambaram-2045" | "tambaram-2340";
export type Direction = "south" | "north";
export type CellState = "cancelled" | "not-listed" | "na";

export type ServiceDef = {
  id: ServiceId;
  direction: Direction;
  from: string;
  to: string;
  hour: number;
  minute: number;
  clock: string;
  short: string;
  cancelledOn: readonly string[];
};

const EIGHT_NIGHTS_EXCEPT_SEP_27 = [
  "2026-09-26",
  "2026-09-28",
  "2026-09-29",
  "2026-09-30",
  "2026-10-01",
  "2026-10-02",
  "2026-10-03",
] as const;

const SEP_26_THROUGH_OCT_3 = [
  "2026-09-26",
  "2026-09-27",
  "2026-09-28",
  "2026-09-29",
  "2026-09-30",
  "2026-10-01",
  "2026-10-02",
  "2026-10-03",
] as const;

export const SERVICES: readonly ServiceDef[] = [
  {
    id: "tambaram-2045",
    direction: "north",
    from: "Tambaram",
    to: "Chennai Beach",
    hour: 20,
    minute: 45,
    clock: "8:45 p.m.",
    short: "8:45 PM Tambaram → Beach",
    cancelledOn: EIGHT_NIGHTS_EXCEPT_SEP_27,
  },
  {
    id: "tambaram-2340",
    direction: "north",
    from: "Tambaram",
    to: "Chennai Beach",
    hour: 23,
    minute: 40,
    clock: "11:40 p.m.",
    short: "11:40 PM Tambaram → Beach",
    cancelledOn: ["2026-09-27"],
  },
  {
    id: "beach-2359",
    direction: "south",
    from: "Chennai Beach",
    to: "Tambaram",
    hour: 23,
    minute: 59,
    clock: "11:59 p.m.",
    short: "11:59 PM Beach → Tambaram",
    cancelledOn: SEP_26_THROUGH_OCT_3,
  },
];

export const CALENDAR_DATES = [
  ...SEP_26_THROUGH_OCT_3,
  "2026-10-04",
] as const;

export type StationInfo = {
  id: string;
  name: string;
  maintenance?: boolean;
  position: string;
  note: string;
  metro: string | null;
};

export const CORRIDOR_STATIONS: readonly StationInfo[] = [
  {
    id: "beach",
    name: "Chennai Beach",
    position: "North end of this EMU run",
    note: "Starting point of the 11:59 p.m. southbound local named in this notice.",
    metro: "There is no Metro platform inside Chennai Beach station.",
  },
  {
    id: "park",
    name: "Park",
    position: "Just south of Chennai Beach",
    note: "Park Town. A short ride from the Beach terminus.",
    metro: null,
  },
  {
    id: "egmore",
    name: "Egmore",
    position: "North-central",
    note: "A main stop on the Beach–Tambaram suburban line.",
    metro: null,
  },
  {
    id: "chetpet",
    name: "Chetpet",
    position: "North-central",
    note: "Between Egmore and Nungambakkam.",
    metro: null,
  },
  {
    id: "nungambakkam",
    name: "Nungambakkam",
    position: "Central",
    note: "On the same Beach–Tambaram EMU run.",
    metro: null,
  },
  {
    id: "kodambakkam",
    name: "Kodambakkam",
    position: "Central",
    note: "On the same Beach–Tambaram EMU run.",
    metro: null,
  },
  {
    id: "mambalam",
    name: "Mambalam",
    position: "Central",
    note: "On the same Beach–Tambaram EMU run.",
    metro: null,
  },
  {
    id: "saidapet",
    name: "Saidapet",
    position: "South of Mambalam, before Guindy",
    note: "Last listed stop before the maintenance station if you are travelling south.",
    metro:
      "Saidapet Metro is in this neighbourhood. It is a separate entrance from the railway platform.",
  },
  {
    id: "guindy",
    name: "Guindy",
    maintenance: true,
    position: "Maintenance station on this notice",
    note: "Engineering work is at this station. It is also the rail point for Guindy Industrial Estate, Anna Salai and the airport side of the city.",
    metro:
      "Guindy Metro, on the Blue Line, lists Guindy railway station among its access points. One direction goes toward Chennai Airport. The other goes toward Wimco Nagar Depot. Confirm that night’s Metro hours before you leave the railway platform.",
  },
  {
    id: "st-thomas-mount",
    name: "St Thomas Mount",
    position: "First stop south of Guindy",
    note: "Still on the Beach–Tambaram suburban line.",
    metro:
      "Suburban rail, MRTS and Metro meet around St Thomas Mount. They are separate platforms. Confirm the walk on the night.",
  },
  {
    id: "pazhavanthangal",
    name: "Pazhavanthangal",
    position: "South of St Thomas Mount",
    note: "On the way toward the airport-side stations and Pallavaram.",
    metro: null,
  },
  {
    id: "meenambakkam",
    name: "Meenambakkam",
    position: "Airport side of the corridor",
    note: "Suburban stop near the airport district.",
    metro:
      "Chennai Airport Metro is at the airport terminal. It is not on this railway platform.",
  },
  {
    id: "tirusulam",
    name: "Tirusulam",
    position: "Airport side of the corridor",
    note: "Further south, still short of Pallavaram.",
    metro: null,
  },
  {
    id: "pallavaram",
    name: "Pallavaram",
    position: "Southern suburbs",
    note: "Between the airport-side stations and Chromepet.",
    metro: null,
  },
  {
    id: "chromepet",
    name: "Chromepet",
    position: "Southern suburbs, GST Road side",
    note: "A usual stop for passengers who continue toward Tambaram.",
    metro: null,
  },
  {
    id: "tambaram-sanatorium",
    name: "Tambaram Sanatorium",
    position: "One stop before Tambaram",
    note: "The last intermediate stop on this list before Tambaram.",
    metro: null,
  },
  {
    id: "tambaram",
    name: "Tambaram",
    position: "South end of this EMU run",
    note: "Terminus of the Beach–Tambaram locals named in this notice, and a major bus point for the southern suburbs.",
    metro: null,
  },
];

export const FAQ_ITEMS = [
  {
    question: "Is the 11:59 p.m. Chennai Beach–Tambaram train running tonight?",
    answer:
      "The Chennai Division list cancels the 11:59 p.m. Chennai Beach–Tambaram EMU from 26 September through 3 October 2026. On those nights, do not wait for it. Use the checker on this page for the date you are travelling. After the 4 October maintenance window, check Southern Railway before assuming the train is back.",
  },
  {
    question: "When will the Guindy maintenance work end?",
    answer:
      "The published engineering block is 12:15 a.m. to 2:45 a.m. from 27 September through 4 October 2026, at Guindy railway station. This page does not mark suburban services as restored when that clock runs out. Wait for a later Southern Railway advisory.",
  },
  {
    question: "Which Tambaram–Chennai Beach trains are cancelled?",
    answer:
      "The 8:45 p.m. Tambaram–Chennai Beach EMU is cancelled on 26, 28, 29 and 30 September and on 1, 2 and 3 October. It is not in the cancellation list for 27 September. The 11:40 p.m. Tambaram–Chennai Beach EMU is cancelled on 27 September only.",
  },
  {
    question: "Are all late-night Beach–Tambaram trains cancelled for eight days?",
    answer:
      "No. Each listed train has its own dates. The 11:59 p.m. Beach–Tambaram service is the one cancelled on every night from 26 September to 3 October. The two Tambaram–Beach trains are not.",
  },
] as const;

export function serviceById(id: ServiceId): ServiceDef {
  const service = SERVICES.find((item) => item.id === id);
  if (!service) throw new Error(`Unknown service ${id}`);
  return service;
}

export function kolkataTodayIso(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function formatDeskDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Asia/Kolkata",
  }).format(new Date(`${iso}T12:00:00+05:30`));
}

export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(`${iso}T12:00:00+05:30`));
}

export function cellState(id: ServiceId, iso: string): CellState {
  if (!(CALENDAR_DATES as readonly string[]).includes(iso)) return "na";
  const service = serviceById(id);
  if (service.cancelledOn.includes(iso)) return "cancelled";
  if (id === "tambaram-2340") return "na";
  if (iso === "2026-10-04") return "na";
  return "not-listed";
}

export function cellLabel(state: CellState): string {
  if (state === "cancelled") return "Cancelled";
  if (state === "not-listed") return "Not listed as cancelled";
  return "—";
}

export type CheckerTone = "cancel" | "clear" | "na";

export function checkerResult(
  id: ServiceId,
  iso: string,
  todayIso: string,
): { tone: CheckerTone; title: string; detail: string } {
  const service = serviceById(id);
  const state = cellState(id, iso);
  const when = formatDeskDate(iso);
  const train = `${service.clock} ${service.from} → ${service.to}`;
  const today = iso === todayIso;

  if (state === "cancelled") {
    return {
      tone: "cancel",
      title: today ? "Cancelled today" : "Cancelled on this date",
      detail: `The ${train} service is cancelled on ${when}.`,
    };
  }

  if (state === "not-listed") {
    return {
      tone: "clear",
      title: today
        ? "Not listed as cancelled today"
        : "Not listed as cancelled on this date",
      detail: `The ${train} service is not among the cancellations published for ${when}.`,
    };
  }

  return {
    tone: "na",
    title: "No cancellation announced",
    detail: `The published list does not name the ${train} service on ${when}. Absence from the list is not a guarantee that the train will run.`,
  };
}

export function tonightRows(todayIso: string): {
  inWindow: boolean;
  heading: string;
  rows: { id: ServiceId; label: string; state: CellState }[];
} {
  const inWindow = (CALENDAR_DATES as readonly string[]).includes(todayIso);
  if (!inWindow) {
    const before = todayIso < "2026-09-26";
    return {
      inWindow: false,
      heading: before
        ? "This cancellation list starts on 26 September"
        : "The dates in this notice have passed",
      rows: [],
    };
  }

  return {
    inWindow: true,
    heading: `Tonight — ${formatDeskDate(todayIso)}`,
    rows: SERVICES.map((service) => ({
      id: service.id,
      label: service.short,
      state: cellState(service.id, todayIso),
    })),
  };
}

function minutesOf(time: string): number | null {
  const match = /^(\d{2}):(\d{2})$/.exec(time);
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return null;
  return hour * 60 + minute;
}

export function journeyAdvice(input: {
  fromId: string;
  toId: string;
  time: string;
  isoDate: string;
}): string {
  if (input.fromId === input.toId) {
    return "Choose two different stations.";
  }

  const fromIndex = CORRIDOR_STATIONS.findIndex((s) => s.id === input.fromId);
  const toIndex = CORRIDOR_STATIONS.findIndex((s) => s.id === input.toId);
  if (fromIndex < 0 || toIndex < 0) {
    return "Pick stations on the Beach–Tambaram line.";
  }

  const minutes = minutesOf(input.time);
  if (minutes == null) {
    return "Enter a travel time in 24-hour form, such as 23:30.";
  }

  const southbound = fromIndex < toIndex;
  const touchesGuindy =
    input.fromId === "guindy" || input.toId === "guindy";
  const guindyNote = touchesGuindy
    ? " Guindy is the maintenance station. The engineering block itself is 12:15 a.m. to 2:45 a.m."
    : "";

  if (minutes < 20 * 60) {
    return `This notice covers late-night EMUs. A journey at this hour is outside the three listed cancellations.${guindyNote} Still read the platform display before you board.`;
  }

  if (southbound) {
    const last = cellState("beach-2359", input.isoDate);
    if (last === "cancelled" && minutes >= 23 * 60) {
      return `Your journey falls in the late-night window. The 11:59 p.m. Chennai Beach → Tambaram service is cancelled on this date. Do not wait for it.${guindyNote}`;
    }
    if (last === "cancelled") {
      return `You are heading toward Tambaram in the late evening. The 11:59 p.m. Beach → Tambaram local is cancelled on this date. Earlier southbound locals are not in this list.${guindyNote} Verify the last train that is actually running before you reach the platform.`;
    }
    return `The 11:59 p.m. Beach → Tambaram local is not listed as cancelled on this date.${guindyNote} Confirm on the platform. This is not a promise that every other EMU is running.`;
  }

  const lateNorth = cellState("tambaram-2340", input.isoDate);
  const earlyNorth = cellState("tambaram-2045", input.isoDate);
  if (lateNorth === "cancelled" && minutes >= 23 * 60) {
    return `The 11:40 p.m. Tambaram → Chennai Beach service is cancelled on this date.${guindyNote} Do not assume the next northbound local will be waiting.`;
  }
  if (earlyNorth === "cancelled" && minutes >= 20 * 60 && minutes < 23 * 60) {
    return `The 8:45 p.m. Tambaram → Chennai Beach service is cancelled on this date.${guindyNote} The 11:40 p.m. northbound is a separate row in the list.`;
  }
  if (earlyNorth === "cancelled" && minutes >= 23 * 60) {
    return `The 8:45 p.m. Tambaram → Beach service is cancelled on this date. The 11:40 p.m. northbound is not in the cancellation list for this date.${guindyNote} Confirm on the platform before you travel.`;
  }
  return `Neither northbound train in this notice is listed as cancelled for the time you picked.${guindyNote} Confirm on the platform. This is not a promise that every other EMU is running.`;
}

function icsStamp(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

/** Client-side calendar file for one cancelled departure. Alarm is 75 minutes before. */
export function disruptionIcs(id: ServiceId, iso: string): string | null {
  if (cellState(id, iso) !== "cancelled") return null;
  const service = serviceById(id);
  const hh = String(service.hour).padStart(2, "0");
  const mm = String(service.minute).padStart(2, "0");
  const start = new Date(`${iso}T${hh}:${mm}:00+05:30`);
  const summary = `Reminder: ${service.clock} ${service.from}–${service.to} local cancelled tonight`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MyChennaiCity//Beach Tambaram alert//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${id}-${iso}@mychennaicity.in`,
    `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(start)}`,
    `SUMMARY:${summary}`,
    "DESCRIPTION:Chennai Division cancellation list, as carried on mychennaicity.in. Confirm with Southern Railway before travel.",
    "BEGIN:VALARM",
    "TRIGGER:-PT75M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${summary}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export const SCHEDULE_NOTE =
  "Based on the Southern Railway Chennai Division cancellation list available when this page was published. A train missing from that list can still be held, short-terminated or retimed later.";
