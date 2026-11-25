import { CHENNAI_FESTIVALS_GUIDE_PATH } from "@/content/guides/chennai-festivals-calendar";
import { MARGAZHI_DESK_PATH } from "@/content/compulsive/margazhi-desk";
import type { MusicArtist, MusicConcert } from "@/content/music/types";

const POSTER = {
  src: "/images/music/jayanthi-kumaresh-margazhi-concert-schedule-2026-27.png",
  alt: "Margazhi 2026–27 schedule for Dr Jayanthi Kumaresh, Saraswati veena, with nine Chennai dates from 9 December 2026 to 3 January 2027",
};

const HALL_NOTE =
  "The sheet names the hall and does not print a street or PIN.";

function chennaiHall(
  concert: Omit<MusicConcert, "city" | "holdHours" | "venueAddress" | "localityLabel"> & {
    localityLabel?: string;
  },
): MusicConcert {
  return {
    ...concert,
    holdHours: 3,
    venueAddress: `${concert.venueName}, Chennai`,
    localityLabel: concert.localityLabel ?? "Chennai",
    city: "Chennai",
  };
}

/**
 * Facts are Dr Jayanthi Kumaresh’s Margazhi 2026–27 sheet.
 * The portrait shows a Saraswati veena. The sheet does not print a fare,
 * a closing time, a street, or accompanists except Anil Srinivasan on 3 January.
 * Tickets: www.jayanthikumaresh.com/schedule
 */
export const jayanthiKumaresh: MusicArtist = {
  slug: "jayanthi-kumaresh",
  name: "Dr Jayanthi Kumaresh",
  role: "Saraswati veena",
  summary:
    "Margazhi 2026–27 schedule from Dr Jayanthi Kumaresh’s sheet, “Celebrating the Saraswati Veena across Chennai.” Nine dates are in Chennai, from 9 December 2026 to 3 January 2027. The portrait shows her with a Saraswati veena. The sheet does not print fares, closing times, or street addresses. It points timings, links, and tickets to www.jayanthikumaresh.com/schedule.",
  ticketUrl: "https://www.jayanthikumaresh.com/schedule",
  ticketLabel: "jayanthikumaresh.com/schedule",
  poster: POSTER,
  sourceNote:
    "Schedule, halls, and start times are taken from the Margazhi 2026–27 sheet for Dr Jayanthi Kumaresh. The sheet also prints Facebook Veena.JayanthiKumaresh and Instagram jayanthiveena. Confirm any change on jayanthikumaresh.com/schedule before you travel. mychennaicity.in does not sell these tickets.",
  concerts: [
    chennaiHall({
      id: "vani-kala-sudhakara",
      title: "Vani Kala Sudhakara Award",
      date: "2026-12-09",
      startHour: 18,
      startMinute: 30,
      venueName: "Vani Mahal",
      eventSlug:
        "jayanthi-kumaresh-vani-kala-sudhakara-award-vani-mahal-december-2026",
      withLine: null,
      organiser: "Vani Mahal",
      note: `The sheet marks this date with an event label. ${HALL_NOTE}`,
    }),
    chennaiHall({
      id: "music-conference",
      title: "Music Conference Inauguration",
      date: "2026-12-15",
      startHour: 16,
      startMinute: 0,
      venueName: "Music Academy",
      eventSlug:
        "jayanthi-kumaresh-music-conference-inauguration-music-academy-december-2026",
      withLine: null,
      organiser: "Music Academy",
      note: `The sheet marks this date with an event label. ${HALL_NOTE}`,
    }),
    chennaiHall({
      id: "mylapore-fine-arts",
      title: "Mylapore Fine Arts",
      date: "2026-12-20",
      startHour: 18,
      startMinute: 30,
      venueName: "Mylapore Fine Arts",
      localityLabel: "Mylapore",
      eventSlug: "jayanthi-kumaresh-mylapore-fine-arts-december-2026",
      withLine: null,
      organiser: "Mylapore Fine Arts",
      note: `The sheet names the sabha and does not name a separate programme. ${HALL_NOTE}`,
    }),
    chennaiHall({
      id: "lecture-demonstration",
      title: "Lecture Demonstration",
      date: "2026-12-24",
      startHour: 8,
      startMinute: 10,
      venueName: "Music Academy",
      eventSlug:
        "jayanthi-kumaresh-lecture-demonstration-music-academy-december-2026",
      withLine: null,
      organiser: "Music Academy",
      note: HALL_NOTE,
    }),
    chennaiHall({
      id: "music-academy-26",
      title: "Music Academy",
      date: "2026-12-26",
      startHour: 16,
      startMinute: 0,
      venueName: "Music Academy",
      eventSlug: "jayanthi-kumaresh-music-academy-december-2026",
      withLine: null,
      organiser: null,
      note: `The sheet names the hall and does not name a separate programme. ${HALL_NOTE}`,
    }),
    chennaiHall({
      id: "charsur",
      title: "Charsur",
      date: "2026-12-29",
      startHour: 18,
      startMinute: 30,
      venueName: "Charsur",
      eventSlug: "jayanthi-kumaresh-charsur-december-2026",
      withLine: null,
      organiser: "Charsur",
      note: `The sheet names the hall and does not name a separate programme. ${HALL_NOTE}`,
    }),
    chennaiHall({
      id: "sangita-kalanidhi",
      title: "Sangita Kalanidhi Award",
      date: "2027-01-01",
      startHour: 17,
      startMinute: 0,
      venueName: "Music Academy",
      eventSlug:
        "jayanthi-kumaresh-sangita-kalanidhi-award-music-academy-january-2027",
      withLine: null,
      organiser: "Music Academy",
      note: `The sheet marks this date with an event label. ${HALL_NOTE}`,
    }),
    chennaiHall({
      id: "strings-attached",
      title: "Strings Attached",
      date: "2027-01-02",
      startHour: 18,
      startMinute: 30,
      venueName: "Vani Mahal",
      eventSlug: "jayanthi-kumaresh-strings-attached-vani-mahal-january-2027",
      withLine: null,
      organiser: "Vani Mahal",
      note: HALL_NOTE,
    }),
    chennaiHall({
      id: "kalakshetra-anil-srinivasan",
      title: "Kalakshetra",
      date: "2027-01-03",
      startHour: 9,
      startMinute: 30,
      venueName: "Kalakshetra",
      eventSlug:
        "jayanthi-kumaresh-anil-srinivasan-kalakshetra-january-2027",
      withLine: "Anil Srinivasan",
      organiser: "Kalakshetra",
      note: `The sheet prints “with Anil Srinivasan” and does not name a separate programme title. ${HALL_NOTE}`,
    }),
  ],
  related: [
    {
      href: "/music/artist/charumathi-raghuraman",
      label: "Charumathi Raghuraman Margazhi sheet",
    },
    { href: "/chennai-local-events", label: "Chennai local events" },
    { href: MARGAZHI_DESK_PATH, label: "Margazhi kutcheri desk" },
    { href: CHENNAI_FESTIVALS_GUIDE_PATH, label: "Chennai festivals calendar" },
  ],
};
