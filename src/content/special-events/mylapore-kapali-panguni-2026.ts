import type { FestivalRichContent } from "./types";

export const MYLAPORE_KAPALI_PANGUNI_2026_REF = "mylapore-kapali-panguni-2026";

/** Official programme PDF — static file under `public/documents/Mylapore-Panguni-Festival-2026/`. */
export const MYLAPORE_PANGUNI_PDF_PATH =
  "/documents/Mylapore-Panguni-Festival-2026/Mylapore-Panugni-Uthiram-Kabaleeswarar-Temple-2026-Programme-Schedule-daywise.pdf";

export const mylaporeKapaliPanguni2026Content: FestivalRichContent = {
  answerFirstParagraphs: [
    "The Panguni Peruvizha (spring festival) at Sri Kapaleeshwarar Temple in Mylapore, Chennai, is one of the city’s landmark temple utsavams, with processions, vahanams, and the chariot (ther).",
    "In 2026 the main festival activities run from 22 March through 2 April, with Thirukalyanam and related rituals around 1 April. Vidaiyatri-related observances are listed for 3–12 April 2026.",
    "Always confirm exact timings, road closures, and ticketed areas with the temple office or the official programme PDF before you travel.",
  ],
  officialPdf: {
    url: MYLAPORE_PANGUNI_PDF_PATH,
    label: "Official temple programme (PDF)",
    subtitle:
      "Day-wise schedule released by the temple — use it as the primary reference alongside this page.",
  },
  gallery: [
    {
      src: "https://pbs.twimg.com/media/GnvTuumWgAAxbDE.jpg",
      alt: "Kapaleeshwarar temple festival procession and crowd in Mylapore",
      caption: "Festival atmosphere at Mylapore Kapaleeshwarar (photo: social/X)",
    },
    {
      src: "https://www.adotrip.com/public/images/festivals/master_images/5bc03460d9589.jpg",
      alt: "Colourful temple chariot or procession during a South Indian utsavam",
      caption: "Temple utsavam imagery (credit: Adotrip festival guide)",
    },
    {
      src: "https://dc-cdn.s3-ap-southeast-1.amazonaws.com/dc-Cover-ac4586j1nclh0ui1g0i1gqook0-20160322064726.Medi.jpeg",
      alt: "Mylapore Kapaleeshwarar temple gopuram",
      caption: "Kapaleeshwarar Temple, Mylapore (archive photo)",
    },
  ],
  scheduleDays: [
    {
      isoDate: "2026-03-22",
      label: "Sunday 22 March 2026",
      items: [
        { text: "Grama Devatha Sri Kolavizhi Amman Vazhipadu" },
        { text: "Mrithsangrihanam, Angurarpanam" },
        { time: "9:00 PM", text: "Sri Narthana Vinayagar — Velli Mooshika Vahanam" },
      ],
    },
    {
      isoDate: "2026-03-23",
      label: "Monday 23 March 2026",
      items: [
        { text: "Morning — Kodiyetra Mandapam Ezhuntharulal" },
        {
          time: "6:20–6:50 AM",
          text: "Kodiyetram (flag hoisting) — Velli Pavazhakaal Vimanam",
        },
        { time: "10:00 PM", text: "Ambal Mayil Vadivil Siva Pujai Kaatchi" },
      ],
    },
    {
      isoDate: "2026-03-24",
      label: "Tuesday 24 March 2026",
      items: [
        { time: "8:30 AM", text: "Suriya Vattam" },
        { time: "9:00 PM", text: "Chandira Vattam" },
      ],
    },
    {
      isoDate: "2026-03-25",
      label: "Wednesday 25 March 2026",
      items: [
        { time: "6:00 AM", text: "Adhikara Nandi" },
        { time: "9:00 PM", text: "Bhootan, Bhutanki Vahanam" },
      ],
    },
    {
      isoDate: "2026-03-26",
      label: "Thursday 26 March 2026",
      items: [
        { time: "8:30 AM", text: "Purushamirugam, Singam Vahanam" },
        { time: "9:00 PM", text: "Nagam, Kamadhenu Vahanam" },
      ],
    },
    {
      isoDate: "2026-03-27",
      label: "Friday 27 March 2026",
      items: [
        { time: "8:30 AM", text: "Sowdal Vimanam" },
        {
          time: "~10:30 PM",
          text: "Vellividai Vahanam (Silver Rishaba Vahanam)",
        },
      ],
    },
    {
      isoDate: "2026-03-28",
      label: "Saturday 28 March 2026",
      items: [
        { text: "Morning — Pallakku Vizha" },
        { time: "9:00 PM", text: "Yaanai Vahanam" },
      ],
    },
    {
      isoDate: "2026-03-29",
      label: "Sunday 29 March 2026",
      items: [
        { text: "Morning — Therottam; Thiruther Ezhuntharulal; Thiruther Vadam Pidithal" },
        { text: "Evening — Therilirinthu Thirukovil Ezhuntharulal" },
      ],
    },
    {
      isoDate: "2026-03-30",
      label: "Monday 30 March 2026",
      items: [
        { time: "~2:45 PM", text: "Arupathu Moovar Thiruvizha — Velli Vimanam" },
        { text: "Night — Sri Chandrasekarar Paar Vettai Vizha" },
      ],
    },
    {
      isoDate: "2026-03-31",
      label: "Tuesday 31 March 2026",
      items: [
        { text: "Morning — Pancha Moorthi Vizha" },
        { time: "~6:00 PM", text: "Bikshadanar (Iraivan Iravalar Kolam)" },
      ],
    },
    {
      isoDate: "2026-04-01",
      label: "Wednesday 1 April 2026 (Panguni Uthiram / Thirukalyanam)",
      items: [
        { text: "Morning — Thirukootha Peruman (Shri Natarajar) Thirukatchi" },
        { time: "~6:00 PM", text: "Punnai Marathadiyil Mayil Uruvil Siva Poojai" },
        {
          time: "~7:30 PM",
          text: "Thirukalyanam; Kailaya Voorthi, Kodiyirakkam, Chandikeshvarar Thiruvizha",
        },
      ],
    },
    {
      isoDate: "2026-04-02",
      label: "Thursday 2 April 2026",
      items: [
        { text: "Morning — Uma Maheshwarar Darisanam" },
        { text: "Evening — Pandam Pari Vizha" },
      ],
    },
  ],
  scheduleExtra: {
    title: "Vidaiyatri Vizha (10 days)",
    paragraphs: [
      "Vidaiyatri Vizha is listed for 10 days from Friday 3 April 2026 through Sunday 12 April 2026. Timings and processions are published separately — check the official temple PDF or notice boards.",
    ],
  },
  practicalTips: [
    "Crowds peak on ther day and around Thirukalyanam — arrive early or use Metro + last-mile cab.",
    "Dress modestly; follow temple notices for darshan queues and mobile restrictions.",
    "Mylapore lanes may be one-way or closed around processions — check local police and ward updates.",
    "Parking is limited; consider Lighthouse Mylapore / nearby paid lots and walk in.",
  ],
  faq: [
    {
      question: "When is Thirukalyanam at Kapaleeshwarar in 2026?",
      answer:
        "The schedule lists Thirukalyanam on the evening of 1 April 2026 (around 7:30 PM) with related rituals the same day. Confirm with the temple’s official programme PDF.",
    },
    {
      question: "When is Panguni Uthiram 2026 in Mylapore?",
      answer:
        "Key Panguni Uthiram observances align with 1 April 2026 on this schedule, with the broader Panguni festival running from late March into early April. Always verify with the temple.",
    },
    {
      question: "Where is Sri Kapaleeshwarar Temple?",
      answer:
        "It is in Mylapore (Thirumayilai), Chennai, Tamil Nadu — a short distance from the Mylapore tank and Luz corner.",
    },
    {
      question: "Is this schedule official?",
      answer:
        "This page summarises published programme details for planning. The linked PDF and temple notice boards are the authoritative sources.",
    },
    {
      question: "What is Vidaiyatri Vizha?",
      answer:
        "Vidaiyatri is a closing / farewell phase of the utsavam. This edition is listed as 10 days from 3 April through 12 April 2026 — confirm dates with the temple.",
    },
    {
      question: "Can I photograph the processions?",
      answer:
        "Follow on-site rules; many temples restrict flash or inner sanctum photography even when public streets allow photos.",
    },
  ],
  seo: {
    metaTitle:
      "Mylapore Panguni Festival 2026 — Kapaleeshwarar Temple schedule & dates",
    metaDescription:
      "Mylapore Sri Kapaleeshwarar Panguni Peruvizha 2026: day-wise utsavam schedule, Thirukalyanam on 1 Apr, ther and vahanam dates, official PDF, Mylapore Chennai.",
    ogImageUrl: "https://pbs.twimg.com/media/GnvTuumWgAAxbDE.jpg",
  },
  placeGeo: { lat: 13.0336, lng: 80.2689 },
  organizerName: "Sri Kapaleeshwarar Temple, Mylapore",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Sri+Kapaleeshwarar+Temple+Mylapore",
};
