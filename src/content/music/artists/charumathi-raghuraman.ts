import { CHENNAI_FESTIVALS_GUIDE_PATH } from "@/content/guides/chennai-festivals-calendar";
import { MARGAZHI_DESK_PATH } from "@/content/compulsive/margazhi-desk";
import type { MusicArtist } from "@/content/music/types";

const POSTER = {
  src: "/images/music/charumathi-raghuraman-margazhi-concert-schedule-2026-27.png",
  alt: "Margazhi Concert Schedule 2026–27 for Charumathi Raghuraman, with Chennai dates from 23 November 2026 to 12 January 2027 and a Hyderabad date on 4 January",
};

/**
 * Facts are the artist's Margazhi Concert Schedule 2026–27 sheet.
 * The portrait shows a violin. The sheet does not print a fare or a closing time.
 * Tickets: www.charuraghu.com
 */
export const charumathiRaghuraman: MusicArtist = {
  slug: "charumathi-raghuraman",
  name: "Charumathi Raghuraman",
  role: "Violin",
  summary:
    "Margazhi concert schedule for 2026–27 from Charumathi Raghuraman’s published sheet. Eight dates are in Chennai, from 23 November 2026 to 12 January 2027. The 4 January 2027 date is Sankeertanotsav in Hyderabad, and the sheet marks that time as TBD. The portrait on the sheet shows her with a violin. The sheet does not print fares or closing times. It points ticket enquiries to www.charuraghu.com.",
  ticketUrl: "https://www.charuraghu.com",
  ticketLabel: "charuraghu.com",
  poster: POSTER,
  sourceNote:
    "Schedule, halls, start times, and accompanists are taken from the Margazhi Concert Schedule 2026–27 sheet for Charumathi Raghuraman. Confirm any change on charuraghu.com before you travel. mychennaicity.in does not sell these tickets.",
  concerts: [
    {
      id: "bhavans-margazhi",
      title: "Bhavan's Margazhi Music Festival",
      date: "2026-11-23",
      startHour: 10,
      startMinute: 30,
      holdHours: 3,
      venueName: "Bharatiya Vidya Bhavan Main Hall",
      venueAddress: "Bharatiya Vidya Bhavan Main Hall, Mylapore, Chennai",
      localityLabel: "Mylapore",
      city: "Chennai",
      eventSlug:
        "charumathi-raghuraman-bhavans-margazhi-mylapore-november-2026",
      withLine: "Anantha R. Krishnan (mridangam)",
      organiser: "Bhavan's Margazhi Music Festival",
    },
    {
      id: "carnatica-global-heritage",
      title: "Carnatica Global Heritage Fest",
      date: "2026-12-11",
      startHour: 16,
      startMinute: 30,
      holdHours: 3,
      venueName: "Sri Sankara Vidyashramam Auditorium",
      venueAddress: "Sri Sankara Vidyashramam Auditorium, Chennai",
      localityLabel: "Chennai",
      city: "Chennai",
      eventSlug:
        "charumathi-raghuraman-carnatica-global-heritage-fest-december-2026",
      withLine: "Anirudh Raj (mridangam), Prasanna Hariharan (ghatam)",
      organiser: "Carnatica Global Heritage Fest",
      note: "The sheet prints the auditorium and the city. It does not print a street or PIN.",
    },
    {
      id: "soulfest",
      title: "Soulfest 2026",
      date: "2026-12-18",
      startHour: 18,
      startMinute: 0,
      holdHours: 3,
      venueName: "M.S. Subbulakshmi Arangam, Asian College of Journalism",
      venueAddress:
        "M.S. Subbulakshmi Arangam, Asian College of Journalism, Taramani, Chennai",
      localityLabel: "Taramani",
      city: "Chennai",
      eventSlug: "charumathi-raghuraman-soulfest-taramani-december-2026",
      withLine: "Anantha R. Krishnan (mridangam), Giridhar Udupa (ghatam)",
      organiser: "Soulfest 2026",
    },
    {
      id: "arkay",
      title: "Arkay Convention Centre",
      date: "2026-12-20",
      startHour: 18,
      startMinute: 30,
      holdHours: 3,
      venueName: "Arkay Convention Centre",
      venueAddress: "Arkay Convention Centre, Royapettah High Rd, Mylapore, Chennai",
      localityLabel: "Mylapore",
      city: "Chennai",
      eventSlug:
        "charumathi-raghuraman-arkay-convention-centre-december-2026",
      withLine: "K. Vishnuvardhana (mridangam), Sumukh Karanth (kanjira)",
      organiser: null,
      note: "The sheet names the hall and the road. It does not name a separate organiser.",
    },
    {
      id: "parthasarathi-swami-sabha",
      title: "Sri Parthasarathi Swami Sabha",
      date: "2026-12-21",
      startHour: 18,
      startMinute: 30,
      holdHours: 3,
      venueName: "Madras Sanskrit College",
      venueAddress: "Madras Sanskrit College, Mylapore, Chennai",
      localityLabel: "Mylapore",
      city: "Chennai",
      eventSlug:
        "charumathi-raghuraman-parthasarathi-swami-sabha-december-2026",
      withLine: "K. Sai Giridhar (mridangam), Prasanna Hariharan (ghatam)",
      organiser: "Sri Parthasarathi Swami Sabha",
    },
    {
      id: "narada-gana-sabha",
      title: "Narada Gana Sabha",
      date: "2026-12-24",
      startHour: 15,
      startMinute: 30,
      holdHours: 3,
      venueName: "Narada Gana Sabha Main Hall",
      venueAddress: "Narada Gana Sabha Main Hall, TTK Rd, Teynampet, Chennai",
      localityLabel: "Teynampet",
      city: "Chennai",
      eventSlug: "charumathi-raghuraman-narada-gana-sabha-december-2026",
      withLine: "Anantha R. Krishnan (mridangam), Giridhar Udupa (ghatam)",
      organiser: "Narada Gana Sabha",
    },
    {
      id: "krishna-gana-sabha",
      title: "Krishna Gana Sabha",
      date: "2026-12-31",
      startHour: 16,
      startMinute: 0,
      holdHours: 3,
      venueName: "Krishna Gana Sabha",
      venueAddress:
        "Krishna Gana Sabha, 2, Maherajapuram Santhanam Salai, T. Nagar, Chennai",
      localityLabel: "T. Nagar",
      city: "Chennai",
      eventSlug: "charumathi-raghuraman-krishna-gana-sabha-december-2026",
      withLine:
        "Carnatic quartet with J.B. Sruthi Sagar (flute), Ramana Balachandhran (veena), and Anantha R. Krishnan (mridangam)",
      organiser: "Krishna Gana Sabha",
      note: "The sheet spells the street Maherajapuram Santhanam Salai and calls this a Carnatic quartet concert.",
    },
    {
      id: "sankeertanotsav-hyderabad",
      title: "Sankeertanotsav, Hyderabad",
      date: "2027-01-04",
      startHour: null,
      startMinute: null,
      holdHours: 3,
      venueName: "Sankeertanotsav",
      venueAddress: "Hyderabad",
      localityLabel: "Hyderabad",
      city: "Hyderabad",
      eventSlug: null,
      withLine: "Anantha R. Krishnan (mridangam)",
      organiser: "Sankeertanotsav",
      note: "The sheet prints TBD for the time and does not name a hall. This date is outside the Chennai events calendar.",
    },
    {
      id: "nada-sudha",
      title: "Nada Sudha",
      date: "2027-01-12",
      startHour: 18,
      startMinute: 15,
      holdHours: 3,
      venueName: "Sri Ganapathi Sachchidananda Ashram Hall",
      venueAddress:
        "Sri Ganapathi Sachchidananda Ashram Hall, Velachery, Chennai",
      localityLabel: "Velachery",
      city: "Chennai",
      eventSlug: "charumathi-raghuraman-nada-sudha-velachery-january-2027",
      withLine: "K. Sai Giridhar (mridangam), Krishna Sriram (ghatam)",
      organiser: "Nada Sudha",
    },
  ],
  related: [
    {
      href: "/music/artist/jayanthi-kumaresh",
      label: "Dr Jayanthi Kumaresh Margazhi sheet",
    },
    { href: "/chennai-local-events", label: "Chennai local events" },
    { href: MARGAZHI_DESK_PATH, label: "Margazhi kutcheri desk" },
    { href: CHENNAI_FESTIVALS_GUIDE_PATH, label: "Chennai festivals calendar" },
    {
      href: "/chennai-local-events/carnatica-parthasarathy-swami-sabha-muralidharan-ramprasad-december-2026",
      label: "Carnatica and Parthasarathy Swami Sabha, 15 Dec",
    },
    {
      href: "/chennai-local-events/kartik-fine-arts-bharat-sundar-trichur-brothers-narada-december-2026",
      label: "Kartik Fine Arts at Narada Gana Sabha, 7 Dec",
    },
    {
      href: "/chennai-local-events/roots-resonance-gems-margazhi-ms-subbulakshmi-taramani-november-2026",
      label: "Roots & Resonance, Taramani, 27–29 Nov",
    },
  ],
};
