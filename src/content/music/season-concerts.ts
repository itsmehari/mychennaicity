/**
 * Concerts read from three printed sheets on 2026-11-26.
 * Spellings stay as printed. A missing finish is a three-hour calendar hold.
 * Two slots already have event rows from artist sheets and are not reseeded.
 */

export const MUSIC_SCHEDULE_PATH = "/music";
export const MUSIC_LLMS_PATH = "/music/llms.txt";
export const MUSIC_SITEMAP_PATH = "/music-sitemap.xml";

export type SeasonSlot = {
  slug: string;
  /** False when an artist sheet already owns this date and hall. */
  seed: boolean;
  iso: string;
  hour: number;
  minute: number;
  artist: string;
  programme: string;
  withLine: string;
  printedDate: string;
  note: string;
};

export type SeasonSeries = {
  id: string;
  title: string;
  organiser: string;
  venueName: string;
  venueAddress: string;
  localityLabel: string;
  ticketNote: string;
  freeEntry: boolean;
  slots: SeasonSlot[];
};

function slot(
  slug: string,
  iso: string,
  hour: number,
  minute: number,
  artist: string,
  programme: string,
  printedDate: string,
  withLine = "",
  seed = true,
  note = "",
): SeasonSlot {
  return {
    slug,
    seed,
    iso,
    hour,
    minute,
    artist,
    programme,
    withLine,
    printedDate,
    note,
  };
}

export const SEASON_SERIES: SeasonSeries[] = [
  {
    id: "margazhi-maha-utsavam",
    title: "Margazhi Maha Utsavam",
    organiser: "Margazhi Maha Utsavam",
    venueName: "Youth Hostel Auditorium",
    venueAddress: "Youth Hostel Auditorium, Hamsadwani, Indra Nagar, Chennai.",
    localityLabel: "Indra Nagar",
    ticketNote:
      "The poster prints free entry (ENTRY FREE) and ALL ARE WELCOME. It does not print a ticket link or a closing time.",
    freeEntry: true,
    slots: [
      slot("vishnudev-mylai-karthikeyan-mangala-naadham-indra-nagar-1-dec-2026", "2026-12-01", 16, 45, "Vishnudev & Mylai Karthikeyan", "Mangala Naadham, a grand invocation concert", "DEC 1, 2026 TUESDAY"),
      slot("gayathri-venkatraghavan-thamizh-tehllamudhu-indra-nagar-1-dec-2026", "2026-12-01", 18, 45, "Gayathri Venkatraghavan", "MSS 110 - Thamizh Tehllamudhu", "DEC 1, 2026 TUESDAY"),
      slot("s-mahathi-varnamalika-indra-nagar-2-dec-2026", "2026-12-02", 16, 45, "S Mahathi", "Varnamalika", "DEC 2, 2026 WEDNESDAY"),
      slot("vignesh-ishwar-ore-ragam-indra-nagar-2-dec-2026", "2026-12-02", 18, 45, "Vignesh Ishwar", "Ore Ragam Orayiram Bhaavam", "DEC 2, 2026 WEDNESDAY"),
      slot("spoorthi-rao-vaishnavam-indra-nagar-3-dec-2026", "2026-12-03", 16, 45, "Spoorthi Rao", "Vaishnavam", "DEC 3, 2026 THURSDAY", "", true, "Spoorthi Rao’s own sheet lists this date at Youth Hostel Auditorium, Adyar, at 4:45 PM, and does not print a programme. This poster row keeps Vaishnavam, Indra Nagar, and free entry."),
      slot("trichur-brothers-aval-indra-nagar-3-dec-2026", "2026-12-03", 18, 45, "Trichur Brothers", "அவள் - The all powerful women", "DEC 3, 2026 THURSDAY"),
      slot("ramana-balachandar-one-with-sivan-indra-nagar-4-dec-2026", "2026-12-04", 16, 45, "Ramana Balachandar", "One with Sivan, a tribute to Papananasam Sivan", "DEC 4, 2026 FRIDAY"),
      slot("sikkil-gurucharan-indra-nagar-4-dec-2026", "2026-12-04", 18, 45, "Sikkil Gurucharan", "தென்மேற்கு பக்தி காற்று", "DEC 4, 2026 FRIDAY"),
      slot("balamuralikrishna-indra-nagar-5-dec-2026", "2026-12-05", 16, 45, "Balamuralikrishna", "பின்னே வரும் முன்னே !!", "DEC 5, 2026 SATURDAY", "", true, "A smaller line under the title was not readable."),
      slot("sudha-ragunathan-guru-mahima-indra-nagar-5-dec-2026", "2026-12-05", 18, 45, "Sudha Ragunathan", "Guru Mahima", "DEC 5, 2026 SATURDAY"),
      slot("bharat-sundar-indra-nagar-6-dec-2026", "2026-12-06", 16, 45, "Bharat Sundar", "எது(வும்) பக்தி", "DEC 6, 2026 SUNDAY"),
      slot("sowmya-navaratnam-indra-nagar-6-dec-2026", "2026-12-06", 18, 45, "Dr S Sowmya", "Navaratnam", "DEC 6, 2026 SUNDAY"),
      slot("amrutha-venkatesh-chandiran-indra-nagar-7-dec-2026", "2026-12-07", 16, 45, "Amrutha Venkatesh", "Chandiran : The Moon , Moods and Musings", "DEC 7, 2026 MONDAY"),
      slot("vijay-siva-om-shanthi-indra-nagar-7-dec-2026", "2026-12-07", 18, 45, "Vijay Siva", "Om Shanthi Shanthi Shanthihi", "DEC 7, 2026 MONDAY"),
      slot("carnatica-brothers-sangeetha-numerology-indra-nagar-8-dec-2026", "2026-12-08", 16, 45, "Carnatica Brothers", "Sangeetha Numerology", "DEC 8, 2026 TUESDAY"),
      slot("sriranjani-tapasya-santhanagopalan-love-indra-nagar-8-dec-2026", "2026-12-08", 18, 45, "Sriranjani Tapasya Santhanagopalan", "Love", "DEC 8, 2026 TUESDAY"),
      slot("jayant-ja-maaliyin-mahimai-indra-nagar-9-dec-2026", "2026-12-09", 16, 45, "Jayant J A", "Maaliyin Mahimai", "DEC 9, 2026 WEDNESDAY"),
      slot("sandeep-narayan-umaiyor-indra-nagar-9-dec-2026", "2026-12-09", 18, 45, "Sandeep Narayan", "Umaiyor Baganum-Umaiyor Pillaiyum", "DEC 9, 2026 WEDNESDAY"),
      slot("kruthi-bhat-raga-ratnamalika-indra-nagar-10-dec-2026", "2026-12-10", 16, 45, "Kruthi Bhat", '"Raga Ratnamalika"', "DEC 10, 2026 THURSDAY"),
      slot("dushyant-sridhar-silapathigaram-indra-nagar-10-dec-2026", "2026-12-10", 18, 45, "Dushyant Sridhar", "'Silapathigaram'", "DEC 10, 2026 THURSDAY", "Adhithya Madhavan"),
      slot("vk-manimaran-chozham-indra-nagar-11-dec-2026", "2026-12-11", 16, 45, "V K Manimaran & Madhusudhanan Kalaichelvan", "Chozham", "DEC 11, 2026 FRIDAY"),
      slot("subhasree-thanikachalam-bharathee-indra-nagar-11-dec-2026", "2026-12-11", 18, 45, "Subhasree Thanikachalam", 'BHARA"THEE", The Multifacets of Mahakavi', "DEC 11, 2026 FRIDAY", "Vidya, Vinaya & Saindhavi"),
    ],
  },
  {
    id: "vani-mahal-isai-vizha",
    title: "Sri Thyaga Brahma Gana Sabha Isai Vizha",
    organiser: "Sri Thyaga Brahma Gana Sabha",
    venueName: "Vani Mahal",
    venueAddress: "Vani Mahal, T-Nagar, Chennai",
    localityLabel: "T-Nagar",
    ticketNote:
      'The sheet prints TICKETS ON MDnD and "VANI MAHAL" (Regd.). It does not print a price, a ticket link, or a closing time. Every concert on this sheet is at 6.30 PM.',
    freeEntry: false,
    slots: [
      slot("g-ravikiran-vani-mahal-10-dec-2026", "2026-12-10", 18, 30, "G. Ravikiran", "Vocal", "10th Dec. 2026"),
      slot("sikkil-c-gurucharan-vani-mahal-11-dec-2026", "2026-12-11", 18, 30, "Sikkil C Gurucharan", "Vocal", "11th Dec. 2026"),
      slot("sandeep-narayan-vani-mahal-12-dec-2026", "2026-12-12", 18, 30, "Sandeep Narayan", "Vocal", "12th Dec. 2026"),
      slot("ranjani-gayatri-vani-mahal-13-dec-2026", "2026-12-13", 18, 30, "Ranjani & Gayatri", "Vocal", "13th Dec. 2026"),
      slot("sanjay-subramaniam-vani-mahal-14-dec-2026", "2026-12-14", 18, 30, "Sanjay Subramaniam", "Vocal", "14th Dec. 2026"),
      slot("gayathri-venkataraghavan-vani-mahal-15-dec-2026", "2026-12-15", 18, 30, "Gayathri Venkataraghavan", "Vocal", "15th Dec. 2026"),
      slot("kunnakkudi-balamuralikrishna-vani-mahal-16-dec-2026", "2026-12-16", 18, 30, "Kunnakkudi M Balamuralikrishna", "Vocal", "16th Dec. 2026"),
      slot("k-bharat-sundar-vani-mahal-17-dec-2026", "2026-12-17", 18, 30, "K. Bharat Sundar", "Vocal", "17th Dec. 2026"),
      slot("trichur-brothers-vani-mahal-18-dec-2026", "2026-12-18", 18, 30, "Trichur Brothers (Srikrishna Mohan & Ramkumar Mohan)", "Vocal", "18th Dec. 2026"),
      slot("ramana-balachandran-vani-mahal-december-2026", "2026-12-19", 18, 30, "Ramana Balachandhran", "Veena", "19th Dec. 2026", "", false, "This date already has an event from Ramana Balachandran’s own sheet, including accompanists that this sabha sheet does not print. That listing is not overwritten."),
      slot("palaghat-ramprasad-vani-mahal-20-dec-2026", "2026-12-20", 18, 30, "Palaghat Dr. R. Ramprasad", "Vocal", "20th Dec. 2026"),
      slot("s-saketharaman-vani-mahal-21-dec-2026", "2026-12-21", 18, 30, "S. Saketharaman", "Vocal", "21st Dec. 2026"),
      slot("n-vijay-siva-vani-mahal-22-dec-2026", "2026-12-22", 18, 30, "N. Vijay Siva", "Vocal", "22nd Dec. 2026"),
      slot("dushyanth-sridhar-upanyasam-vani-mahal-23-dec-2026", "2026-12-23", 18, 30, "U.Ve Dushyanth Sridhar & Party", "Upanyasam", "23rd Dec. 2026"),
      slot("ks-vishnudev-vani-mahal-24-dec-2026", "2026-12-24", 18, 30, "K.S.Vishnudev", "Vocal", "24th Dec. 2026"),
      slot("rajhesh-vaidhya-u-rajesh-vani-mahal-25-dec-2026", "2026-12-25", 18, 30, "Rajhesh Vaidhya & U Rajesh", "Veena & Mandolin", "25th Dec. 2026"),
      slot("s-mahathi-vani-mahal-26-dec-2026", "2026-12-26", 18, 30, "S.Mahathi", "Vocal", "26th Dec. 2026"),
      slot("ramakrishnan-murthy-vani-mahal-27-dec-2026", "2026-12-27", 18, 30, "Ramakrishnan Murthy", "Vocal", "27th Dec. 2026"),
      slot("malladi-brothers-vani-mahal-28-dec-2026", "2026-12-28", 18, 30, "Malladi Brothers (Sreerama Prasad & Dr.Ravikumar)", "Vocal", "28th Dec. 2026"),
      slot("akkarai-sisters-vani-mahal-29-dec-2026", "2026-12-29", 18, 30, "Akkarai Sisters (S Subhalakshmi & S Sornlatha)", "Vocal", "29th Dec. 2026"),
      slot("vishaka-hari-eppadi-paadinaro-vani-mahal-30-dec-2026", "2026-12-30", 18, 30, "Vishaka Hari", 'Sangeetha upanyasam on "EPPADI PAADINARO"', "30th Dec. 2026"),
      slot("abhishek-raghuram-vani-mahal-31-dec-2026", "2026-12-31", 18, 30, "Abhishek Raghuram", "Vocal", "31st Dec. 2026"),
      slot("ja-jayant-vani-mahal-1-jan-2027", "2027-01-01", 18, 30, "J.A.Jayant", "Flute", "01st Jan. 2027"),
      slot("jayanthi-kumaresh-strings-attached-vani-mahal-january-2027", "2027-01-02", 18, 30, "Dr. Jayanthi Kumaresh & R. Kumaresh", "Strings Attached", "02nd Jan. 2027", "", false, "This date already has an event from Jayanthi Kumaresh’s own sheet. That listing does not name R. Kumaresh and is not overwritten."),
      slot("sid-sriram-vani-mahal-3-jan-2027", "2027-01-03", 18, 30, "Vid. Sid Sriram", "Vocal", "03rd Jan. 2027"),
      slot("sridevi-nrithyalaya-kanda-guru-kavasam-vani-mahal-4-jan-2027", "2027-01-04", 18, 30, "Sridevi Nrithyalaya", "Kanda Guru Kavasam - Dance Drama", "04th Jan. 2027"),
      slot("srekala-bharat-moksha-margam-vani-mahal-5-jan-2027", "2027-01-05", 18, 30, "Srekala Bharat and Thejus", '"MOKSHA MARGAM", a group bharathanatyam', "05th Jan. 2027"),
      slot("nada-gurukulam-sakthi-prabhavam-vani-mahal-6-jan-2027", "2027-01-06", 18, 30, "Nada Gurukulam", '"SAKTHI PRABHAVAM" Dance Drama', "06th Jan. 2027"),
      slot("nrithyakshethra-sri-krishna-leela-vani-mahal-7-jan-2027", "2027-01-07", 18, 30, "Nrithyakshethra Dance Academy", 'Madurai R Muralidharan\'s "Sri Krishna Leela", a dance musical', "07th Jan. 2027"),
      slot("saila-sudha-azhagan-murugan-vani-mahal-8-jan-2027", "2027-01-08", 18, 30, "Saila Sudha", '"AZHAGAN MURUGAN" - Bharathanatyam', "08th Jan. 2027"),
      slot("sudha-raghunathan-vani-mahal-9-jan-2027", "2027-01-09", 18, 30, "Sudha Raghunathan", "Vocal", "09th Jan. 2027"),
      slot("nritya-nama-sankeerthanam-vani-mahal-10-jan-2027", "2027-01-10", 18, 30, "Dr Rajeswari Sainath & Dr Yashnavi Sainath prabhu", '"Nritya - Nama sankeerthanam", a dance ballet in Bhajan sampradaya', "10th Jan. 2027"),
      slot("narayana-teertha-krishna-leela-tarangam-vani-mahal-11-jan-2027", "2027-01-11", 18, 30, "Smt Jayanthi Subramaniam", "Narayana Teertha's Krishna Leela Tarangam", "11th Jan. 2027"),
      slot("sri-sai-nrithyalaya-hari-hara-nandhan-vani-mahal-12-jan-2027", "2027-01-12", 18, 30, "Sri Sai Nrithyalaya", '"Hari Hara Nandhan" by H N Nandhini Suresh, bharathanatyam dance drama', "12th Jan. 2027"),
      slot("kripa-centre-munma-oru-kaalaththula-vani-mahal-13-jan-2027", "2027-01-13", 18, 30, "Kripa's centre for fine arts", "Munma oru kaalaththula (once upon a time..), a thematic natya presentation", "13th Jan. 2027"),
      slot("kathadi-sri-ramamurthy-pillayar-pidikka-vani-mahal-14-jan-2027", "2027-01-14", 18, 30, "Stage creations", "Kathadi Sri Ramamurthy in Pillayar Pidikka by Sri SL Naanu", "14th Jan. 2027"),
      slot("crazy-creations-madhil-mel-maadhu-vani-mahal-15-jan-2027", "2027-01-15", 18, 30, "Crazy Creations", 'Maadhu Balaji & his Crazy Team in "Madhil Mel Maadhu"', "15th Jan. 2027"),
      slot("y-gee-mahendra-varadu-kutty-vani-mahal-16-jan-2027", "2027-01-16", 18, 30, "Y Gee Mahendra", 'in and as "VARADU KUTTY PARITCHAIKKU NERAMACHU 2"', "16th Jan. 2027"),
      slot("dummies-drama-kaanal-neero-vani-mahal-17-dec-2026", "2026-12-17", 18, 30, "Dummies Drama", '"KAANAL NEERO" by Sreevathson', "17th Dec. 2026", "", true, "The date cell prints 17th Dec. 2026. The cell above it prints Jan. 2027. The year is left as printed."),
    ],
  },
  {
    id: "kartik-fine-arts-12-dec-2026",
    title: "Kartik Fine Arts 52nd Year Art Festival",
    organiser: "Kartik Fine Arts",
    venueName: "Narada Gana Sabha Main Hall",
    venueAddress: "Narada Gana Sabha, Main Hall, Chennai",
    localityLabel: "Chennai",
    ticketNote:
      "The poster prints TICKETS ON MDnD. It does not print a price, a ticket link, a weekday, or a closing time. The associate sponsor line prints SHRIRAM Finance. The main-sponsor seal’s upper ring reads NEELAMAI FOUNDATION.",
    freeEntry: false,
    slots: [
      slot("nandini-kartik-fine-arts-narada-gana-sabha-12-dec-2026", "2026-12-12", 16, 30, "Dr.N.J. Nandini", "'Isai Chudar'", "12 DEC 2026", "Mysore V. Srikanth, Praveen Sparsh, Guru Prasanna (Kanjira)"),
      slot("sudha-ragunathan-kartik-fine-arts-narada-gana-sabha-12-dec-2026", "2026-12-12", 18, 45, "Dr. Sudha Ragunathan", "'Isai Peroli'", "12 DEC 2026", "H.N. Smitha, K.V. Prasad, R. Raman (Morsing)"),
    ],
  },
];

export function listSeasonSlots(): { series: SeasonSeries; slot: SeasonSlot }[] {
  return SEASON_SERIES.flatMap((series) =>
    series.slots.map((slot) => ({ series, slot })),
  );
}

export function seasonConcertPath(slug: string): string {
  return `/chennai-local-events/${slug}`;
}

export const SEASON_SCHEDULE_ANSWER =
  "Chennai music season listings from three printed sheets: Margazhi Maha Utsavam at Youth Hostel Auditorium, Indra Nagar; the Sri Thyaga Brahma Gana Sabha Isai Vizha at Vani Mahal, T-Nagar; and Kartik Fine Arts on 12 December 2026 at Narada Gana Sabha Main Hall. Each concert links to its event page. mychennaicity.in does not sell these tickets.";

function clock(hour: number, minute: number): string {
  const hour12 = hour % 12 || 12;
  const suffix = hour < 12 ? "am" : "pm";
  return `${hour12}.${String(minute).padStart(2, "0")} ${suffix}`;
}

function holdClock(hour: number, minute: number): string {
  const total = hour * 60 + minute + 180;
  return clock(Math.floor(total / 60), total % 60);
}

export function seasonEventTitle(series: SeasonSeries, slot: SeasonSlot): string {
  const [year, month, day] = slot.iso.split("-").map(Number);
  const short = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(Date.UTC(year, month - 1, day, 6, 30)));
  return `${slot.artist} - ${slot.programme} (${short})`;
}

export function seasonEventDescription(series: SeasonSeries, slot: SeasonSlot): string {
  const withLine = slot.withLine ? `\n\n**With:** ${slot.withLine}` : "";
  const extra = slot.note ? `\n\n${slot.note}` : "";
  const hold = holdClock(slot.hour, slot.minute);
  return `**Organiser:** ${series.organiser}

${slot.artist} is on the bill for **${slot.programme}** at ${series.title}.

**When:** ${slot.printedDate}, **${clock(slot.hour, slot.minute)} IST**. The poster does not print a closing time. This listing keeps the calendar open until **${hold}** so a listener can block the slot. That later time is a hold on this page, not a time the poster printed.

**Where:** ${series.venueAddress}${withLine}

**Booking:** ${series.ticketNote}

Facts are taken from the printed poster. Spellings are kept as printed. mychennaicity.in does not sell these tickets.${extra}`.trim();
}
