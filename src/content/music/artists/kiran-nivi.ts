import { CHENNAI_FESTIVALS_GUIDE_PATH } from "@/content/guides/chennai-festivals-calendar";
import { MARGAZHI_DESK_PATH } from "@/content/compulsive/margazhi-desk";
import type { MusicArtist, MusicConcert } from "@/content/music/types";

const POSTER = {
  src: "/images/music/kiran-nivi-margazhi-concert-schedule-2026-27.png",
  alt: "Margazhi concert schedule 2026-2027 for Kiran & Nivi, Sai Sisters, with dates from 12 December 2026 to 5 January 2027",
};

const HALL_NOTE = "The sheet does not print a street number or PIN.";

function chennaiDate(
  concert: Omit<MusicConcert, "city" | "holdHours" | "venueAddress" | "localityLabel" | "withLine"> & {
    localityLabel?: string;
  },
): MusicConcert {
  const locality = concert.localityLabel ?? "Chennai";
  const place = locality === "Chennai" ? "Chennai" : `${locality}, Chennai`;
  return {
    ...concert,
    withLine: null,
    holdHours: 3,
    venueAddress: `${concert.venueName}, ${place}`,
    localityLabel: locality,
    city: "Chennai",
    note: concert.note ? `${concert.note} ${HALL_NOTE}` : HALL_NOTE,
  };
}

function otherDate(
  concert: Omit<MusicConcert, "holdHours" | "eventSlug" | "withLine">,
): MusicConcert {
  return {
    ...concert,
    withLine: null,
    holdHours: 3,
    eventSlug: null,
  };
}

/**
 * Facts are the Margazhi Concert Schedule 2026-2027 for Kiran & Nivi, Sai Sisters.
 * The sheet does not print a role word beyond Sai Sisters, a fare, a finish,
 * accompanists, or a ticket link.
 * 12 December is NMACC Mumbai. 26 December prints MDND and Location TBD.
 */
export const kiranNivi: MusicArtist = {
  slug: "kiran-nivi",
  name: "Kiran & Nivi",
  role: "Sai Sisters",
  summary:
    "Margazhi concert schedule 2026-2027 from the sheet for Kiran & Nivi, Sai Sisters. Eight dates name a Chennai hall or festival, from 14 December 2026 to 5 January 2027. The 12 December line is NMACC Mumbai at the Cube Auditorium. The 26 December line prints MDND and Location TBD and does not name a hall. The sheet does not print accompanists, a fare, a closing time, or a ticket link. Spellings are kept as printed, including Vani mahal, Umadri, Shollinganallur, and Chrompet.",
  ticketUrl: null,
  ticketLabel: null,
  poster: POSTER,
  sourceNote:
    "Dates, halls, and start times are taken from the Margazhi Concert Schedule 2026-2027 for Kiran & Nivi, Sai Sisters. Spellings are kept as printed, including Vani mahal, Umadri, Shollinganallur, Sastra Satsangh, and Chrompet. mychennaicity.in does not sell these tickets.",
  concerts: [
    otherDate({
      id: "nmacc-mumbai",
      title: "NMACC Mumbai at the Cube Auditorium",
      date: "2026-12-12",
      startHour: 19,
      startMinute: 30,
      venueName: "Cube Auditorium",
      venueAddress: "NMACC Mumbai at the Cube Auditorium",
      localityLabel: "Mumbai",
      city: "Mumbai",
      organiser: null,
      note: "The sheet prints NMACC Mumbai at the Cube Auditorium. This date stays off the Chennai events calendar. The sheet does not print a street number or PIN.",
    }),
    chennaiDate({
      id: "rr-sabha-brahma-gana-sabha",
      title: "RR Sabha & Brahma Gana Sabha",
      date: "2026-12-14",
      startHour: 13,
      startMinute: 0,
      venueName: "RR Sabha & Brahma Gana Sabha",
      eventSlug: "kiran-nivi-rr-sabha-brahma-gana-sabha-december-2026",
      organiser: null,
      note: "The sheet prints RR Sabha & Brahma Gana Sabha on one line and does not say which name is the hall.",
    }),
    chennaiDate({
      id: "vani-mahal",
      title: "Vani mahal (mini hall)",
      date: "2026-12-15",
      startHour: 14,
      startMinute: 15,
      venueName: "Vani mahal (mini hall)",
      eventSlug: "kiran-nivi-vani-mahal-mini-hall-december-2026",
      organiser: "Vani mahal",
      note: "The sheet prints Vani mahal (mini hall).",
    }),
    chennaiDate({
      id: "omr-margazhi",
      title: "OMR Margazhi",
      date: "2026-12-18",
      startHour: 16,
      startMinute: 30,
      venueName: "Umadri Kalyana Mandapam",
      localityLabel: "Shollinganallur",
      eventSlug: "kiran-nivi-omr-margazhi-shollinganallur-december-2026",
      organiser: "OMR Margazhi",
      note: "The sheet prints OMR Margazhi, Umadri Kalyana Mandapam, Shollinganallur.",
    }),
    chennaiDate({
      id: "sastra-satsangh",
      title: "Sastra Satsangh",
      date: "2026-12-19",
      startHour: 17,
      startMinute: 0,
      venueName: "Sastra Satsangh",
      eventSlug: "kiran-nivi-sastra-satsangh-december-2026",
      organiser: "Sastra Satsangh",
      note: "The sheet names Sastra Satsangh and does not name a separate hall.",
    }),
    otherDate({
      id: "mdnd",
      title: "MDND",
      date: "2026-12-26",
      startHour: 15,
      startMinute: 0,
      venueName: "Location TBD",
      venueAddress: "MDND — Location TBD",
      localityLabel: "Location TBD",
      city: "",
      organiser: null,
      note: "The sheet prints MDND — Location TBD. It does not name a hall or a city, so this date stays off the Chennai events calendar. The sheet does not print a street number or PIN.",
    }),
    chennaiDate({
      id: "narada-gana-sabha",
      title: "Narada Gana Sabha",
      date: "2026-12-27",
      startHour: 14,
      startMinute: 0,
      venueName: "Narada Gana Sabha",
      eventSlug: "kiran-nivi-narada-gana-sabha-december-2026",
      organiser: "Narada Gana Sabha",
      note: "The sheet names Narada Gana Sabha and does not name a separate hall.",
    }),
    chennaiDate({
      id: "lasya-fine-arts",
      title: "Lasya Fine Arts",
      date: "2026-12-30",
      startHour: 18,
      startMinute: 0,
      venueName: "Lasya Fine Arts",
      localityLabel: "Thoraipakkam",
      eventSlug: "kiran-nivi-lasya-fine-arts-thoraipakkam-december-2026",
      organiser: "Lasya Fine Arts",
      note: "The sheet prints Lasya Fine Arts, Thoraipakkam.",
    }),
    chennaiDate({
      id: "chrompet-margazhi",
      title: "Chrompet Margazhi Festival",
      date: "2027-01-03",
      startHour: 16,
      startMinute: 30,
      venueName: "Chrompet Margazhi Festival",
      eventSlug: "kiran-nivi-chrompet-margazhi-festival-january-2027",
      organiser: "Chrompet Margazhi Festival",
      note: "The sheet names Chrompet Margazhi Festival and does not name a separate hall.",
    }),
    chennaiDate({
      id: "carnatica",
      title: "Carnatica",
      date: "2027-01-05",
      startHour: 17,
      startMinute: 0,
      venueName: "Vedanta Desikar Hall",
      eventSlug: "kiran-nivi-carnatica-vedanta-desikar-hall-january-2027",
      organiser: "Carnatica",
      note: "The sheet prints Carnatica, Vedanta Desikar Hall.",
    }),
  ],
  related: [
    { href: "/chennai-local-events", label: "Chennai local events" },
    { href: MARGAZHI_DESK_PATH, label: "Margazhi kutcheri desk" },
    { href: CHENNAI_FESTIVALS_GUIDE_PATH, label: "Chennai festivals calendar" },
  ],
};
