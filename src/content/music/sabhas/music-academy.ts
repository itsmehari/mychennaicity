import { CHENNAI_FESTIVALS_GUIDE_PATH } from "@/content/guides/chennai-festivals-calendar";
import { MARGAZHI_DESK_PATH } from "@/content/compulsive/margazhi-desk";
import type { MusicSabha, SabhaSession } from "@/content/music/types";

const POSTER = {
  src: "/images/events/music-academy-madras-academic-sessions-december-2026.jpg",
  alt: "The Music Academy Madras academic sessions, 16 December 2026 to 1 January 2027, Kasturi Srinivasan Hall",
};

function session(
  printedDate: string,
  sessionLabel: string,
  time: string,
  speaker: string,
  topic: string,
): SabhaSession {
  const id = `${printedDate}-${time}-${speaker}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
  return {
    id,
    printedDate,
    session: sessionLabel,
    time,
    speaker,
    topic,
  };
}

/**
 * Academic sessions sheet of The Music Academy Madras.
 * This is the Academy’s conference programme, not one concert.
 * The Sunday row is printed “20 Dec 2025”. That weekday matches 20 December 2026.
 * The sheet does not print a fare, a street, or a website.
 */
export const musicAcademy: MusicSabha = {
  slug: "music-academy",
  name: "The Music Academy",
  role: "Sabha",
  summary:
    "Academic sessions of The Music Academy Madras, 16 December 2026 to 1 January 2027, at Kasturi Srinivasan Hall. Presided by Vidushi Dr. Jayanthi Kumaresh. Convenor Sri.Sriram V. The sheet is the Academy’s conference programme: morning lectures and student performances, not one concert. Admission is open, first come first serve, and the rights of admission are reserved. The sheet does not print a fare or a street.",
  poster: POSTER,
  sourceNote:
    "Sessions, speakers, topics, and times are taken from The Music Academy Madras academic-sessions sheet. The header dates the season 16 December 2026–1 January 2027. The Sunday row is printed 20 Dec 2025. That weekday matches 20 December 2026, and the year is left as printed. Names are kept as printed, including Tiruvottriyur Tyagier, Patri Satishkumar, and T.K.V.Ramanujacharl.",
  matchNames: ["Music Academy", "The Music Academy", "Madras Music Academy"],
  hall: "Kasturi Srinivasan Hall",
  street: null,
  city: "Chennai",
  presidedBy: "Vidushi Dr. Jayanthi Kumaresh",
  convenor: "Sri.Sriram V",
  admission:
    "Open to all, first come first serve basis. Rights of admission reserved. Discussions are open to the audience after comments from the members of the Expert Committee.",
  concertLinks: [
    {
      href: "/chennai-local-events/kolkata-padmavathi-saranathan-music-academy-december-2026",
      label: "Kolkata Padmavathi Saranathan",
      when: "Monday, 21 December 2026, 1:30–3:30 pm",
    },
    {
      href: "/chennai-local-events/sriranjani-tapasya-santhanagopalan-music-academy-december-2026",
      label: "Sriranjani Tapasya Santhanagopalan",
      when: "Thursday, 24 December 2026, 4:00–6:30 pm",
    },
  ],
  sessions: [
    session("Wed 16 Dec 2026", "—", "8:00–8:20 AM", "Music Performance By Students of Advanced School of Carnatic Music", "—"),
    session("Wed 16 Dec 2026", "Lecdem 1", "8:30–9:15 AM", "V Sriram", "An Overview of a century in Academic Conferences"),
    session("Wed 16 Dec 2026", "Lecdem 2", "9:30–10:15 AM", "Sangita Kala Acharya Dr Ritha Rajan", "The Scholars and Musicians who Shaped the Academy"),
    session("Thu 17 Dec 2026", "—", "8:00–8:20 AM", "Music Performance By Students of Advanced School of Carnatic Music", "—"),
    session("Thu 17 Dec 2026", "Lecdem 1", "8:30–9:15 AM", "Dr Sriram Parasuram", "Kalapramana - Its Myriad Dimensions and Manifestation in Indian Classical Music"),
    session("Thu 17 Dec 2026", "Lecdem 2", "9:30–10:15 AM", "Vidvan D Srinivas", "A Mathematical approach to Swara Kalpana on the Veena"),
    session("Fri 18 Dec 2026", "Lecdem 1", "8:10–9:40 AM", "Dr Sumithra Vasudev", "The Sankirtana Ratnavali of Tiruvottriyur Tyagier"),
    session("Sat 19 Dec 2026", "Lecdem 1", "8:10–8:55 AM", "Dr V Premalatha", "Vina in Technical Literature"),
    session("Sat 19 Dec 2026", "Lecdem 2", "9:10–9:55 AM", "Dr Vidya Rao", "An Aesthetic Interpretation of Dance in Haridasa Literature"),
    session("Sun 20 Dec 2025, as printed", "Lecdem 1", "8:10–8:55 AM", "Vidushi Anuthama Murali", "Viriboni - An Investigation of its Temporal Framework and Eduppu"),
    session("Sun 20 Dec 2025, as printed", "Lecdem 2", "9:10–9:55 AM", "Dr R Hemalatha", "Pallavis - Historic and Modern"),
    session("Mon 21 Dec 2026", "Lecdem 1", "8:10–9:40 AM", "Vidushi Amritha Murali, Vidvan Bharat Sundar, Dr K Gayatri, Vidvan Rithvik Raja, Dr Aishwarya Shankar", "Articles in 100 years of the Journal"),
    session("Tue 22 Dec 2026", "Lecdem 1", "8:10–8:55 AM", "Vidvan G Narendra", "Ekaharya Lasya"),
    session("Tue 22 Dec 2026", "Lecdem 2", "9:10–9:55 AM", "Vidvan Patri Satishkumar", "Tala - Sound and Silence"),
    session("Wed 23 Dec 2026", "Lecdem 1", "8:10–8:55 AM", "Vidvan Trichur C Narendran", "Guru Samarpanam - The Legacy of Sangita Kalanidhi Vidvan Palghat Raghu"),
    session("Wed 23 Dec 2026", "Lecdem 2", "9:10–9:55 AM", "Vidvan Praveen D Rao", "The Composer's Toolkit — Timbre, Texture, Space and Silence in Indian Music"),
    session("Thu 24 Dec 2026", "Lecdem 1", "8:10–9:40 AM", "Dr Jayanthi Kumaresh", "Pathbreakers and Parampara-Vidvan S.Balchander, Smt. Padmavathy Ananthagopalan - A Journey through Veena Legacy"),
    session("Fri 25 Dec 2026", "Lecdem 1", "8:10–8:55 AM", "Vidvan Injikudi Subramanian in conversation with Ramchandran Mahadevan (Lalitha Ram)", "Enadhu Isaip Payanam"),
    session("Fri 25 Dec 2026", "Lecdem 2", "9:10–9:55 AM", "Vidushi Shobana Swaminathan with Vina Craftsperson Thiru S Selvam", "Vina Making and Fretting"),
    session("Sat 26 Dec 2026", "Lecdem 1", "8:10–8:55 AM", "Vidvan Embar Kannan", "Journey across two worlds - Carnatic and Cinema"),
    session("Sat 26 Dec 2026", "Lecdem 2", "9:10–9:55 AM", "Dr Subhashini Parthasarathy", "Women in Carnatic Music"),
    session("Sun 27 Dec 2026", "Lecdem 1", "8:10–9:40 AM", "Dr B Balasubrahmaniyan", "Centenary Tribute to Sangita Kalanidhi T Viswanathan"),
    session("Mon 28 Dec 2026", "Lecdem 1", "8:10–8:55 AM", "Dr Suresh Vaidyanathan", "The Evolving Ghatam - A Clay Pot's Journey through Tradition, Techniques and Transformation"),
    session("Mon 28 Dec 2026", "Lecdem 2", "9:10–9:55 AM", "Vidushi Sugandha Kalamegham", "Some compositions of the Trinity, a Musical Tribute"),
    session("Tue 29 Dec 2026", "Lecdem 1", "8:10–8:55 AM", "Vidvan T.K.V.Ramanujacharl", "Atma Vichara in Music"),
    session("Tue 29 Dec 2026", "Lecdem 2", "9:10–9:55 AM", "Shatavadhani Dr R Ganesh", "The concept of Sarasvati in Indian Culture, literature and art"),
    session("Wed 30 Dec 2026", "Lecdem 1", "8:10–9:40 AM", "Malladi Brothers - Sreeramaprasad & Dr Ravikumar", "Centenary Tribute to Sangita Kalanidhi Nedunuri Krishnamurthi"),
    session("Thu 31 Dec 2026", "—", "8:00–8:20 AM", "Winners in Devotional Music Competition", "Devotional Music"),
    session("Thu 31 Dec 2026", "Lecdem 1", "8:30–9:15 AM", "Sangita Kalanidhi Dr S Sowmya", "The Vina from a Music Student's Perspective"),
    session("Thu 31 Dec 2026", "Lecdem 2", "9:30–10:15 AM", "Vidvan R Parthasarathy", "Musicality of the Vina"),
    session("Fri 1 Jan 2027", "—", "8:00–8:20 AM", "Runners up in Devotional Music Competition", "Devotional Music"),
    session("Fri 1 Jan 2027", "—", "8:30–9:30 AM", "Open House", "—"),
  ],
  related: [
    { href: "/music/artist/jayanthi-kumaresh", label: "Dr Jayanthi Kumaresh concert schedule" },
    { href: "/chennai-local-events", label: "Chennai local events" },
    { href: MARGAZHI_DESK_PATH, label: "Margazhi kutcheri desk" },
    { href: CHENNAI_FESTIVALS_GUIDE_PATH, label: "Chennai festivals calendar" },
  ],
};

export const MUSIC_ACADEMY_ACADEMIC_SESSIONS_SLUG =
  "music-academy-madras-academic-sessions-december-2026";

/** Short calendar note. The session list lives on the sabha page. */
export function musicAcademyCalendarNote(): string {
  return `Academic sessions of The Music Academy Madras, 16 December 2026 to 1 January 2027, at Kasturi Srinivasan Hall. This is the Academy’s conference programme, not one concert.

The morning-by-morning list is on the [Music Academy sabha page](/music/sabha/music-academy).

**Presided by:** Vidushi Dr. Jayanthi Kumaresh. **Convenor:** Sri.Sriram V.

**Admission:** open to all, first come first serve basis (rights of admission reserved). The sheet does not print a fare.

**Where:** Kasturi Srinivasan Hall, The Music Academy Madras, Chennai. The sheet names the hall and the Academy. It does not print a street or a PIN.

The sheet’s header dates the season 16 December 2026–1 January 2027. The Sunday row is printed **20 Dec 2025**. That weekday matches 20 December 2026. The year is left as printed.`.trim();
}
