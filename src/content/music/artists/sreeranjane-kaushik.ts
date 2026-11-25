import { CHENNAI_FESTIVALS_GUIDE_PATH } from "@/content/guides/chennai-festivals-calendar";
import { MARGAZHI_DESK_PATH } from "@/content/compulsive/margazhi-desk";
import type { MusicArtist, MusicConcert } from "@/content/music/types";

const POSTER = {
  src: "/images/music/sreeranjane-kaushik-music-season-2025-26.jpg",
  alt: "Music season 2025–26 concert schedule for Sreeranjane Kaushik, with dates from 4 December 2025 to 5 January 2026",
};

const HALL_NOTE =
  "The sheet names the hall and does not print a street or PIN.";

function chennaiDate(
  concert: Omit<MusicConcert, "city" | "holdHours" | "venueAddress" | "localityLabel"> & {
    localityLabel?: string;
    venueAddress?: string;
  },
): MusicConcert {
  const locality = concert.localityLabel ?? "Chennai";
  return {
    ...concert,
    holdHours: 3,
    venueAddress:
      concert.venueAddress ??
      (locality === "Chennai"
        ? `${concert.venueName}, Chennai`
        : `${concert.venueName}, ${locality}, Chennai`),
    localityLabel: locality,
    city: "Chennai",
    note: concert.note ? `${concert.note} ${HALL_NOTE}` : HALL_NOTE,
  };
}

/**
 * Facts are Sreeranjane Kaushik’s Music season 2025–26 sheet.
 * The portrait shows a veena. Every row prints a finish.
 * The sheet does not print a fare or a ticket link.
 * Weekdays on the sheet match December 2025 and January 2026.
 */
export const sreeranjaneKaushik: MusicArtist = {
  slug: "sreeranjane-kaushik",
  name: "Sreeranjane Kaushik",
  role: "Veena",
  summary:
    "Music season 2025–26 concert schedule from Sreeranjane Kaushik’s sheet. Ten dates are in Chennai, from 4 December 2025 to 5 January 2026. Each row prints a start and a finish. The portrait shows her with a veena. The sheet does not print a fare or a ticket link. Spellings are kept as printed, including PSBB Millenium, Sree Sarvah Banquets hall, and Paddhathi.",
  ticketUrl: null,
  ticketLabel: null,
  poster: POSTER,
  sourceNote:
    "Schedule, halls, start times, finish times, and accompanists are taken from the Music season 2025–26 sheet for Sreeranjane Kaushik. The printed weekdays match December 2025 and January 2026. mychennaicity.in does not sell these tickets.",
  concerts: [
    chennaiDate({
      id: "air-sangeeta-saral",
      title: "All India Radio Chennai Sangeeta Saral",
      date: "2025-12-04",
      startHour: 12,
      startMinute: 0,
      printedEndHour: 12,
      printedEndMinute: 40,
      venueName: "All India Radio Chennai",
      eventSlug: "sreeranjane-kaushik-air-sangeeta-saral-december-2025",
      withLine: "M. Vijay | A. S. Ranganathan",
      organiser: "All India Radio Chennai",
    }),
    chennaiDate({
      id: "swaranjali-delhi-parampara",
      title: "Swaranjali Delhi Parampara - 2025",
      date: "2025-12-09",
      startHour: 17,
      startMinute: 0,
      printedEndHour: 18,
      printedEndMinute: 30,
      venueName: "PSBB Millenium",
      localityLabel: "Gerugambakkam",
      eventSlug: "sreeranjane-kaushik-swaranjali-gerugambakkam-december-2025",
      withLine: "Karaikal Venkatasubramaniam | Puttur Nikshith",
      organiser: "Swaranjali Delhi Parampara",
      note: "The sheet prints PSBB Millenium, Gerugambakkam.",
    }),
    chennaiDate({
      id: "kauvery-margazhi",
      title: "Kauvery Margazhi Maha Uthsavam",
      date: "2025-12-11",
      startHour: 17,
      startMinute: 0,
      printedEndHour: 18,
      printedEndMinute: 30,
      venueName: "Kauvery Hospital",
      localityLabel: "Vadapalani",
      eventSlug: "sreeranjane-kaushik-kauvery-vadapalani-december-2025",
      withLine: "M Vijay | B Ganapathyraman | Giridara Prasad",
      organiser: "Kauvery Margazhi Maha Uthsavam",
    }),
    chennaiDate({
      id: "ms-subramanian-centenary",
      title: "Shri. MS Subramanian Centenary",
      date: "2025-12-20",
      startHour: 18,
      startMinute: 15,
      printedEndHour: 20,
      printedEndMinute: 15,
      venueName: "Sree Sarvah Banquets hall",
      localityLabel: "T Nagar",
      eventSlug: "sreeranjane-kaushik-sree-sarvah-t-nagar-december-2025",
      withLine: "M Vijay | B Ganapathyraman | Sai Bharath",
      organiser: "Shri. MS Subramanian Centenary",
    }),
    chennaiDate({
      id: "ra-puram-bhakta-jana-sabha",
      title: "RA Puram Bhakta Jana Sabha",
      date: "2025-12-26",
      startHour: 18,
      startMinute: 15,
      printedEndHour: 20,
      printedEndMinute: 15,
      venueName: "Sringeri mutt",
      localityLabel: "Mandaveli",
      eventSlug: "sreeranjane-kaushik-sringeri-mutt-mandaveli-december-2025",
      withLine: "Durai Srinivasan | Mumbai Rohit Prasad",
      organiser: "RA Puram Bhakta Jana Sabha",
    }),
    chennaiDate({
      id: "indian-fine-arts",
      title: "Indian Fine Arts Society",
      date: "2025-12-27",
      startHour: 15,
      startMinute: 0,
      printedEndHour: 16,
      printedEndMinute: 30,
      venueName: "Ethiraja Kalyana Mandapam",
      eventSlug: "sreeranjane-kaushik-ethiraja-kalyana-mandapam-december-2025",
      withLine: null,
      organiser: "Indian Fine Arts Society",
      note: "The sheet does not name accompanists.",
    }),
    chennaiDate({
      id: "kartik-fine-arts",
      title: "Kartik Fine Arts",
      date: "2025-12-28",
      startHour: 12,
      startMinute: 0,
      printedEndHour: 13,
      printedEndMinute: 30,
      venueName: "Bharatiya Vidya Bhavan Mini Hall",
      eventSlug: "sreeranjane-kaushik-bhavan-mini-hall-december-2025",
      withLine: "Madurai M. Vijayaganesh | Puttur Nikshith",
      organiser: "Kartik Fine Arts",
    }),
    chennaiDate({
      id: "naadabrahmam",
      title: "Naadabrahmam Vaikunta Ekadashi Festival",
      date: "2025-12-30",
      startHour: 22,
      startMinute: 0,
      printedEndHour: 0,
      printedEndMinute: 0,
      printedEndNextDay: true,
      venueName: "Sudarshan Mahal",
      localityLabel: "Nanganallur",
      eventSlug: "sreeranjane-kaushik-sudarshan-mahal-nanganallur-december-2025",
      withLine: null,
      organiser: "Naadabrahmam Vaikunta Ekadashi Festival",
      note: "The sheet prints 10:00 pm to 12:00 am and does not name accompanists.",
    }),
    chennaiDate({
      id: "thyaga-brahma",
      title: "Thyaga Brahma Gana Sabha",
      date: "2026-01-04",
      startHour: 14,
      startMinute: 15,
      printedEndHour: 15,
      printedEndMinute: 30,
      venueName: "Vani Mahal",
      localityLabel: "T Nagar",
      eventSlug: "sreeranjane-kaushik-vani-mahal-t-nagar-january-2026",
      withLine: null,
      organiser: "Thyaga Brahma Gana Sabha",
      note: "The sheet does not name accompanists.",
    }),
    chennaiDate({
      id: "parthasarathy-sabha",
      title: "Parthasarathy Sabha",
      date: "2026-01-05",
      startHour: 9,
      startMinute: 0,
      printedEndHour: 10,
      printedEndMinute: 30,
      venueName: "Paddhathi, Vedanta Desikar hall",
      localityLabel: "Mylapore",
      eventSlug: "sreeranjane-kaushik-paddhathi-mylapore-january-2026",
      withLine: "M. Muthuswamy | AV Manikandan",
      organiser: "Parthasarathy Sabha",
    }),
  ],
  related: [
    { href: "/chennai-local-events", label: "Chennai local events" },
    { href: MARGAZHI_DESK_PATH, label: "Margazhi kutcheri desk" },
    { href: CHENNAI_FESTIVALS_GUIDE_PATH, label: "Chennai festivals calendar" },
  ],
};
