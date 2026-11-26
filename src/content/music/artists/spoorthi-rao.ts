import { CHENNAI_FESTIVALS_GUIDE_PATH } from "@/content/guides/chennai-festivals-calendar";
import { MARGAZHI_DESK_PATH } from "@/content/compulsive/margazhi-desk";
import type { MusicArtist, MusicConcert } from "@/content/music/types";

const POSTER = {
  src: "/images/music/spoorthi-rao-margazhi-concert-schedule-2026-27.png",
  alt: "Margazhi 2026 concert schedule cover for Spoorthi Rao, November 2026 to January 2027. The portrait shows her with a veena.",
};

/**
 * The Margazhi Maha Utsavam poster already lists this slot as Vaishnavam
 * at Youth Hostel Auditorium, Indra Nagar, with free entry.
 * Her own sheet prints Adyar and does not print the programme.
 */
export const SPOORTHI_MAHA_UTSAVAM_EVENT_SLUG =
  "spoorthi-rao-vaishnavam-indra-nagar-3-dec-2026";

const HALL_NOTE = "The sheet does not print a street number or PIN.";

function chennaiDate(
  concert: Omit<MusicConcert, "city" | "holdHours" | "venueAddress" | "localityLabel" | "withLine"> & {
    localityLabel?: string;
  },
): MusicConcert {
  const locality = concert.localityLabel ?? "Chennai";
  const place =
    locality === "Chennai" ? "Chennai" : `${locality}, Chennai`;
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
 * Facts are Spoorthi Rao’s Margazhi 2026–27 concert schedule.
 * Cover: November 2026 – January 2027. The portrait shows a veena.
 * The sheet does not print a role word, a fare, a finish, accompanists, or a ticket link.
 * A city or region is printed only when the date is outside Chennai.
 * 3 December is also on the Margazhi Maha Utsavam poster.
 */
export const spoorthiRao: MusicArtist = {
  slug: "spoorthi-rao",
  name: "Spoorthi Rao",
  role: "Veena",
  summary:
    "Margazhi 2026–27 concert schedule from Spoorthi Rao’s sheet. The cover prints November 2026 – January 2027. The portrait shows her with a veena. The sheet does not print a role word, accompanists, a fare, a closing time, or a ticket link. Dates that name Kerala, Bangalore, Moodbidri, or Kumbakonam stay on this page, as do two awards that name no hall. The 3 December line prints Youth Hostel Auditorium, Adyar. The Margazhi Maha Utsavam poster for that slot names the programme Vaishnavam and the hall in Indra Nagar.",
  ticketUrl: null,
  ticketLabel: null,
  poster: POSTER,
  sourceNote:
    "Dates, halls, and start times are taken from Spoorthi Rao’s Margazhi 2026–27 concert schedule. The cover prints November 2026 – January 2027. Spellings are kept as printed, including Kasargod, Kartik, Vidya Bharathi, Paddhathi, Bangalore, and Thumbai. The 3 December listing keeps the Margazhi Maha Utsavam poster’s programme and Indra Nagar address. mychennaicity.in does not sell these tickets.",
  concerts: [
    chennaiDate({
      id: "arkay",
      title: "Arkay Convention Centre",
      date: "2026-11-29",
      startHour: 16,
      startMinute: 15,
      venueName: "Arkay Convention Centre",
      eventSlug: "spoorthi-rao-arkay-convention-centre-november-2026",
      organiser: "Arkay Convention Centre",
      note: "The sheet names the hall and does not name a separate programme.",
    }),
    chennaiDate({
      id: "margazhi-maha-utsavam",
      title: "Margazhi Maha Utsavam",
      date: "2026-12-03",
      startHour: 16,
      startMinute: 45,
      venueName: "Youth Hostel Auditorium",
      localityLabel: "Adyar",
      eventSlug: SPOORTHI_MAHA_UTSAVAM_EVENT_SLUG,
      organiser: "Margazhi Maha Utsavam",
      note: "The sheet prints Youth Hostel Auditorium, Adyar, and does not print a programme title. The Margazhi Maha Utsavam poster for this slot names Vaishnavam and prints the hall in Indra Nagar. This card links that listing.",
    }),
    otherDate({
      id: "kasargod-edneer-mutt",
      title: "Kasargod Edneer Mutt",
      date: "2026-12-12",
      startHour: null,
      startMinute: null,
      venueName: "Kasargod Edneer Mutt",
      venueAddress: "Kasargod Edneer Mutt, Kerala",
      localityLabel: "Kerala",
      city: "Kerala",
      organiser: "Kasargod Edneer Mutt",
      note: "The sheet prints Kerala and does not print a start time. This date stays off the Chennai events calendar.",
    }),
    chennaiDate({
      id: "soulfest",
      title: "SoulFest",
      date: "2026-12-13",
      startHour: 22,
      startMinute: 30,
      venueName: "MS Subbulakshmi Arangam",
      eventSlug: "spoorthi-rao-soulfest-ms-subbulakshmi-arangam-december-2026",
      organiser: "SoulFest",
      note: "The sheet prints MS Subbulakshmi Arangam, ACJ. It does not expand ACJ.",
    }),
    chennaiDate({
      id: "kartik-fine-arts",
      title: "Kartik Fine Arts",
      date: "2026-12-15",
      startHour: 17,
      startMinute: 0,
      venueName: "Bharatiya Vidya Bhavan (BVB) Main Hall",
      eventSlug: "spoorthi-rao-kartik-fine-arts-bvb-december-2026",
      organiser: "Kartik Fine Arts",
      note: "The sheet prints Bharatiya Vidya Bhavan (BVB) Main Hall.",
    }),
    chennaiDate({
      id: "meenakshi-college",
      title: "Meenakshi College",
      date: "2026-12-18",
      startHour: 16,
      startMinute: 0,
      venueName: "Meenakshi College",
      eventSlug: "spoorthi-rao-meenakshi-college-december-2026",
      organiser: "Meenakshi College",
      note: "The sheet names the college and does not name a separate hall.",
    }),
    chennaiDate({
      id: "mega-isai-vizha",
      title: "Mega Isai Vizha",
      date: "2026-12-19",
      startHour: 14,
      startMinute: 0,
      venueName: "Image Auditorium",
      localityLabel: "RA Puram",
      eventSlug: "spoorthi-rao-mega-isai-vizha-ra-puram-december-2026",
      organiser: "Mega Isai Vizha",
      note: "The sheet prints Image Auditorium, RA Puram.",
    }),
    otherDate({
      id: "whitefield",
      title: "Whitefield",
      date: "2026-12-20",
      startHour: null,
      startMinute: null,
      venueName: "Whitefield",
      venueAddress: "Whitefield, Bangalore",
      localityLabel: "Bangalore",
      city: "Bangalore",
      organiser: null,
      note: "The sheet prints Bangalore and does not print a start time or a hall. This date stays off the Chennai events calendar.",
    }),
    chennaiDate({
      id: "chennaiyil-thiruvaiyaru",
      title: "Chennaiyil Thiruvaiyaru",
      date: "2026-12-22",
      startHour: 14,
      startMinute: 45,
      venueName: "Kamarajar Arangam",
      eventSlug: "spoorthi-rao-chennaiyil-thiruvaiyaru-kamarajar-arangam-december-2026",
      organiser: "Chennaiyil Thiruvaiyaru",
      note: "The sheet prints Kamarajar Arangam.",
    }),
    chennaiDate({
      id: "parthasarathy-swami-sabha",
      title: "Parthasarathy Swami Sabha",
      date: "2026-12-23",
      startHour: 14,
      startMinute: 45,
      venueName: "Vidya Bharathi Kalyana Mandapam",
      eventSlug: "spoorthi-rao-parthasarathy-swami-sabha-december-2026",
      organiser: "Parthasarathy Swami Sabha",
      note: "The sheet prints Vidya Bharathi Kalyana Mandapam.",
    }),
    chennaiDate({
      id: "krishna-gana-sabha",
      title: "Krishna Gana Sabha",
      date: "2026-12-24",
      startHour: 11,
      startMinute: 0,
      venueName: "Krishna Gana Sabha Main Hall",
      eventSlug: "spoorthi-rao-krishna-gana-sabha-december-2026",
      organiser: "Krishna Gana Sabha",
      note: "The sheet prints Main Hall.",
    }),
    otherDate({
      id: "madhuradhwani-trendsetter",
      title: "Award - Madhuradhwani Trendsetter 2026",
      date: "2026-12-24",
      startHour: null,
      startMinute: null,
      venueName: "Madhuradhwani Trendsetter 2026",
      venueAddress: "Madhuradhwani Trendsetter 2026",
      localityLabel: "Madhuradhwani Trendsetter 2026",
      city: "",
      organiser: null,
      note: "The sheet marks this date with an event label. It names the award and does not print a hall, a city, or a start time. The sheet does not print a street number or PIN.",
    }),
    chennaiDate({
      id: "vani-mahal",
      title: "Vani Mahal",
      date: "2026-12-25",
      startHour: 16,
      startMinute: 0,
      venueName: "Sri P. Obul Reddy Hall",
      localityLabel: "T. Nagar",
      eventSlug: "spoorthi-rao-vani-mahal-t-nagar-december-2026",
      organiser: "Vani Mahal",
      note: "The sheet prints Sri P. Obul Reddy Hall, T. Nagar.",
    }),
    chennaiDate({
      id: "brahma-gana-sabha",
      title: "Brahma Gana Sabha",
      date: "2026-12-26",
      startHour: 16,
      startMinute: 0,
      venueName: "RR Sabha",
      eventSlug: "spoorthi-rao-brahma-gana-sabha-rr-sabha-december-2026",
      organiser: "Brahma Gana Sabha",
      note: "The sheet prints RR Sabha (Rasika Ranjani Sabha).",
    }),
    otherDate({
      id: "sciart-fellowship",
      title: "Award - SciArt Services Early Career Fellowship",
      date: "2026-12-27",
      startHour: null,
      startMinute: null,
      venueName: "SciArt Services Early Career Fellowship",
      venueAddress: "SciArt Services Early Career Fellowship",
      localityLabel: "SciArt Services Early Career Fellowship",
      city: "",
      organiser: null,
      note: "The sheet marks this date with an event label. It names the award and does not print a hall, a city, or a start time. The sheet does not print a street number or PIN.",
    }),
    chennaiDate({
      id: "carnatica-paddhathi",
      title: "Carnatica Paddhathi Fest",
      date: "2026-12-27",
      startHour: 17,
      startMinute: 0,
      venueName: "Vedanta Desikar Hall",
      eventSlug: "spoorthi-rao-carnatica-paddhathi-fest-december-2026",
      organiser: "Carnatica Paddhathi Fest",
      note: "The sheet prints Vedanta Desikar Hall and spells the festival Paddhathi.",
    }),
    chennaiDate({
      id: "live4you-jyotirgamaya",
      title: "Live4You Jyotirgamaya",
      date: "2026-12-31",
      startHour: 15,
      startMinute: 30,
      venueName: "Egmore Museum Theatre",
      localityLabel: "Egmore",
      eventSlug: "spoorthi-rao-live4you-jyotirgamaya-egmore-december-2026",
      organiser: "Live4You Jyotirgamaya",
      note: "The sheet prints Egmore Museum Theatre.",
    }),
    chennaiDate({
      id: "kaveri-hospitals",
      title: "Kaveri Hospitals Margazhi",
      date: "2027-01-04",
      startHour: 17,
      startMinute: 30,
      venueName: "Kaveri Hospitals Margazhi",
      eventSlug: "spoorthi-rao-kaveri-hospitals-margazhi-january-2027",
      organiser: "Kaveri Hospitals Margazhi",
      note: "The sheet names Kaveri Hospitals Margazhi and does not name a separate hall.",
    }),
    chennaiDate({
      id: "charsur",
      title: "Charsur Arts Foundation",
      date: "2027-01-06",
      startHour: 18,
      startMinute: 0,
      venueName: "My Bungalow",
      localityLabel: "Eldams Road",
      eventSlug: "spoorthi-rao-charsur-eldams-road-january-2027",
      organiser: "Charsur Arts Foundation",
      note: "The sheet prints My Bungalow, Eldams Road.",
    }),
    otherDate({
      id: "alvas-nudisiri",
      title: "Alva's Nudisiri Virasat",
      date: "2027-01-09",
      startHour: 6,
      startMinute: 0,
      venueName: "Alva's Nudisiri Virasat",
      venueAddress: "Alva's Nudisiri Virasat, Moodbidri, Karnataka",
      localityLabel: "Moodbidri",
      city: "Moodbidri",
      organiser: "Alva's Nudisiri Virasat",
      note: "The sheet prints 6:00 AM, Moodbidri, Karnataka. This date stays off the Chennai events calendar. The sheet does not print a street number or PIN.",
    }),
    chennaiDate({
      id: "chennaiyil-sangeet-utsav",
      title: "Chennaiyil Sangeet Utsav",
      date: "2027-01-09",
      startHour: 18,
      startMinute: 30,
      venueName: "AMRK Convention Centre",
      localityLabel: "ECR",
      eventSlug: "spoorthi-rao-chennaiyil-sangeet-utsav-ecr-january-2027",
      organiser: "Chennaiyil Sangeet Utsav",
      note: "The sheet prints AMRK Convention Centre, ECR.",
    }),
    otherDate({
      id: "manjakkudi",
      title: "Manjakkudi",
      date: "2027-01-19",
      startHour: 16,
      startMinute: 30,
      venueName: "Manjakkudi",
      venueAddress: "Manjakkudi, near Kumbakonam",
      localityLabel: "near Kumbakonam",
      city: "Manjakkudi",
      organiser: null,
      note: "The sheet prints near Kumbakonam and does not name a hall. This date stays off the Chennai events calendar. The sheet does not print a street number or PIN.",
    }),
    chennaiDate({
      id: "thumbai",
      title: "Thumbai Centre for Arts",
      date: "2027-01-24",
      startHour: 16,
      startMinute: 15,
      venueName: "Srinivasa Sastri Hall",
      localityLabel: "Mylapore",
      eventSlug: "spoorthi-rao-thumbai-srinivasa-sastri-hall-january-2027",
      organiser: "Thumbai Centre for Arts",
      note: "The sheet prints Srinivasa Sastri Hall, Mylapore.",
    }),
  ],
  related: [
    { href: "/chennai-local-events", label: "Chennai local events" },
    { href: MARGAZHI_DESK_PATH, label: "Margazhi kutcheri desk" },
    { href: CHENNAI_FESTIVALS_GUIDE_PATH, label: "Chennai festivals calendar" },
    { href: "/music#margazhi-maha-utsavam", label: "Margazhi Maha Utsavam sheet" },
  ],
};
