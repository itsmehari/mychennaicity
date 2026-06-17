/**
 * Chennai discovery events — June–October 2026.
 * Seeded via `scripts/seed-chennai-discovery-events-2026.ts`.
 */

export type ChennaiDiscoveryEvent = {
  slug: string;
  title: string;
  category: string;
  /** YYYY-MM-DD or YYYY-MM-DD to YYYY-MM-DD */
  date: string;
  /** HH:MM:SS or HH:MM:SS to HH:MM:SS */
  time: string;
  venueName: string;
  address: string;
  locality: string;
  description: string;
  ticketPrice: string;
  targetAudience: string;
  bookingLink?: string;
  featured?: boolean;
  /** Extra SEO / verified notes from listings */
  notes?: string;
};

function normalizeBookingUrl(raw?: string): string | undefined {
  const t = raw?.trim();
  if (!t) return undefined;
  if (/^https?:\/\//i.test(t)) return t;
  if (t.includes("bookmyshow") || t.includes("bookmy.show"))
    return "https://in.bookmyshow.com/explore/home/chennai";
  if (t.includes("instagram.com")) return "https://www.instagram.com/";
  if (t.includes("facebook.com")) return "https://www.facebook.com/";
  if (t.includes("meetup.com")) return "https://www.meetup.com/find/in--chennai/";
  if (t.includes("district.in")) return "https://www.district.in/";
  return `https://${t}`;
}

export function buildDiscoveryEventDescription(e: ChennaiDiscoveryEvent): string {
  const booking = normalizeBookingUrl(e.bookingLink);
  const when =
    e.date.includes(" to ") ? e.date.replace(/ to /g, " – ") : e.date;
  const timeBit = e.time.includes(" to ") ? e.time : e.time.slice(0, 5);

  const parts = [
    `**${e.category}** in **${e.locality}, Chennai** — ${e.description}`,
    "",
    e.notes ? `${e.notes}\n` : "",
    `**When:** ${when} · ${timeBit} IST`,
    `**Where:** ${e.venueName}`,
    `**Address:** ${e.address}`,
    `**Tickets:** ${e.ticketPrice}`,
    `**For:** ${e.targetAudience}`,
  ].filter(Boolean);

  if (booking) {
    parts.push(
      "",
      `**Booking:** [Check tickets or registration](${booking})`,
    );
  }

  parts.push(
    "",
    "*Listed on mychennaicity.in for Greater Chennai readers. Confirm date, venue, age limits, and pricing on the organiser page before you travel.*",
  );

  return parts.join("\n");
}

export const CHENNAI_DISCOVERY_EVENTS_2026: ChennaiDiscoveryEvent[] = [
  {
    slug: "tanvi-shah-live-bay146-savera-mylapore-june-2026",
    title: "Tanvi Shah Live — Grammy-winning singer at Bay 146",
    category: "Live music & concerts",
    date: "2026-06-19",
    time: "20:45:00",
    venueName: "Bay 146 — The Savera Hotel",
    address: "146, Dr. Radhakrishnan Salai, Mylapore, Chennai, Tamil Nadu 600004",
    locality: "Mylapore",
    description:
      "Grammy-winning Indian singer Tanvi Shah performs live with global rhythms, Latin beats, and popular film soundtracks — including her work with A.R. Rahman.",
    ticketPrice: "₹250 onwards (early bird tiers on organiser sites)",
    targetAudience: "Music lovers, families, and young adults",
    bookingLink: "https://allevents.in/chennai/",
    featured: true,
    notes:
      "Listings show doors around 8:45 PM IST at Bay 146 inside The Savera on RK Salai (Mylapore).",
  },
  {
    slug: "vikkals-comedy-open-mic-skygarden-porur-june-2026",
    title: "Vikkals Comedy Cafe Open Mic",
    category: "Stand-up comedy & open mics",
    date: "2026-06-20",
    time: "18:00:00",
    venueName: "Skygarden",
    address: "One Paramount, RMZ Software Park, Porur, Chennai, Tamil Nadu 600116",
    locality: "Porur",
    description:
      "High-energy stand-up open mic with seasoned pros testing new material and emerging comics from Chennai's circuit.",
    ticketPrice: "Paid — partial value redeemable on food & beverage",
    targetAudience: "16+ comedy fans",
    bookingLink: "https://in.bookmyshow.com/explore/home/chennai",
  },
  {
    slug: "saikiran-checks-in-vivanta-omr-june-2026",
    title: "Saikiran Checks In — clean English stand-up",
    category: "Stand-up comedy & open mics",
    date: "2026-06-20",
    time: "19:00:00",
    venueName: "Vivanta Chennai, IT Expressway",
    address: "309, Old Mahabalipuram Road, Sholinganallur, Chennai, Tamil Nadu 600119",
    locality: "Sholinganallur",
    description:
      "Veteran comedian Saikiran delivers observational English stand-up on family, mid-life, and corporate life.",
    ticketPrice: "₹799 onwards",
    targetAudience: "Families, professionals, English comedy fans",
    bookingLink: "https://www.instagram.com/",
  },
  {
    slug: "mismatched-tamil-comedy-trinity-kodambakkam-june-2026",
    title: "Mismatch-ed — Tamil comedy on modern relationships",
    category: "Stand-up comedy & open mics",
    date: "2026-06-20",
    time: "18:00:00",
    venueName: "Trinity Studio",
    address: "1st Main Road, United India Colony, Kodambakkam, Chennai, Tamil Nadu 600024",
    locality: "Kodambakkam",
    description:
      "Risha and Mani break down dating disasters and marital chaos in a Tamil stand-up special.",
    ticketPrice: "Paid — registration required",
    targetAudience: "Couples and young adults",
    bookingLink: "https://in.bookmyshow.com/explore/home/chennai",
  },
  {
    slug: "detap-lifestyle-exhibition-chennai-june-2026",
    title: "Detap Exhibition — designer footwear & textiles",
    category: "Lifestyle, shopping & exhibitions",
    date: "2026-06-19 to 2026-06-28",
    time: "11:00:00 to 21:00:00",
    venueName: "Campus Exhibition Grounds",
    address: "Near Central Chennai Hub, Chennai, Tamil Nadu 600001",
    locality: "Central Chennai",
    description:
      "Ten-day lifestyle market with designer footwear, summer clothing, handwoven textiles, and artisan jewellery from across India.",
    ticketPrice: "Free entry",
    targetAudience: "Shoppers, fashion enthusiasts, families",
  },
  {
    slug: "noma-sundown-society-kitty-amor-sholinganallur-june-2026",
    title: "Noma — Sundown Society ft. Kitty Amor Live",
    category: "Live music & concerts",
    date: "2026-06-21",
    time: "17:00:00",
    venueName: "Mirabilis Lounge — Bar & Kitchen",
    address: "Automotive Corridor, Sholinganallur, Chennai, Tamil Nadu 600119",
    locality: "Sholinganallur",
    description:
      "Sunset electronic session with deep melodic house and underground rhythms, headlined by Kitty Amor and local DJs.",
    ticketPrice: "₹1,500 onwards",
    targetAudience: "Nightlife and electronic music fans",
    bookingLink: "https://www.instagram.com/",
  },
  {
    slug: "whistle-podu-musical-kamarajar-teynampet-june-2026",
    title: "Whistle Podu Musical Event",
    category: "Live music & concerts",
    date: "2026-06-21",
    time: "18:00:00",
    venueName: "Kamarajar Arangam",
    address: "492, Anna Salai, Teynampet, Chennai, Tamil Nadu 600006",
    locality: "Teynampet",
    description:
      "High-energy live concert celebrating Chennai's cultural anthems and cinema music.",
    ticketPrice: "₹590 onwards",
    targetAudience: "General public and film-music fans",
  },
  {
    slug: "vaaichevi-virundhu-ymca-royapettah-june-2026",
    title: "Vaaichevi Virundhu — folk & fusion evening",
    category: "Live music & concerts",
    date: "2026-06-21",
    time: "18:30:00",
    venueName: "YMCA Royapettah",
    address: "Westcott Road, Royapettah, Chennai, Tamil Nadu 600014",
    locality: "Royapettah",
    description:
      "Open-air musical evening blending traditional folk roots with contemporary fusion.",
    ticketPrice: "₹699 onwards",
    targetAudience: "Folk and contemporary music lovers",
  },
  {
    slug: "cinema-beautiful-fraud-guna-skygarden-june-2026",
    title: "Cinema — The Beautiful Fraud (Tamil stand-up)",
    category: "Stand-up comedy & open mics",
    date: "2026-06-21",
    time: "18:00:00",
    venueName: "Skygarden",
    address: "One Paramount, RMZ Software Park, Porur, Chennai, Tamil Nadu 600116",
    locality: "Porur",
    description:
      "Guna Kannan's Tamil solo hour roasting commercial cinema melodrama, action physics, and plot holes.",
    ticketPrice: "Paid — tickets online",
    targetAudience: "Cinema fans and Tamil comedy lovers",
    bookingLink: "https://in.bookmyshow.com/explore/home/chennai",
  },
  {
    slug: "extra-ordinary-manoj-prabakar-medai-alwarpet-june-2026",
    title: "Extra Ordinary ft. Manoj Prabakar",
    category: "Stand-up comedy & open mics",
    date: "2026-06-21",
    time: "19:00:00",
    venueName: "Medai — The Stage",
    address: "Cooperative Colony, Alwarpet, Chennai, Tamil Nadu 600018",
    locality: "Alwarpet",
    description:
      "Clean Tamil observational comedy on corporate stress, engineering life, and middle-class habits.",
    ticketPrice: "₹599 onwards",
    targetAudience: "Families, students, corporate workers",
    bookingLink: "https://www.instagram.com/",
  },
  {
    slug: "giant-light-puppet-show-smvrch-chetpet-june-2026",
    title: "Giant Light Puppet Show",
    category: "Theatre & family activities",
    date: "2026-06-21",
    time: "13:00:00",
    venueName: "Sir Mutha Venkatasubba Rao Concert Hall",
    address: "1, Harrington Road, Chetpet, Chennai, Tamil Nadu 600031",
    locality: "Chetpet",
    description:
      "Wordless neon puppet theatre for all ages — glowing 3D puppets up to 8 metres, by master puppeteer Nikolai Zykov.",
    ticketPrice: "Paid — varies by seating",
    targetAudience: "Children, parents, theatre fans",
    bookingLink: "https://in.bookmyshow.com/",
  },
  {
    slug: "amethyst-annual-sale-royapettah-june-2026",
    title: "Amethyst Annual Sale",
    category: "Lifestyle, shopping & exhibitions",
    date: "2026-06-23 to 2026-06-28",
    time: "10:00:00 to 19:30:00",
    venueName: "The Folly, Amethyst",
    address: "Whites Road, Royapettah, Chennai, Tamil Nadu 600014",
    locality: "Royapettah",
    description:
      "Annual boutique sale with up to 60% off designer apparel, jewellery, and home accessories.",
    ticketPrice: "Free entry",
    targetAudience: "Luxury shoppers and fashion curators",
    bookingLink: "https://www.instagram.com/",
  },
  {
    slug: "stand-up-comedy-english-medai-alwarpet-june-2026",
    title: "Stand Up Comedy in English — international showcase",
    category: "Stand-up comedy & open mics",
    date: "2026-06-25",
    time: "20:00:00",
    venueName: "Medai — The Stage Chennai",
    address: "Cooperative Colony, Alwarpet, Chennai, Tamil Nadu 600018",
    locality: "Alwarpet",
    description:
      "Ram Arangi and touring comedian Victor Patrascan — sharp storytelling and global socio-political humour.",
    ticketPrice: "Paid — online booking",
    targetAudience: "Strictly 18+",
    bookingLink: "https://www.facebook.com/",
  },
  {
    slug: "snia-india-storage-meetup-hablis-guindy-june-2026",
    title: "SNIA India Storage Meetup",
    category: "Tech, business & community meetups",
    date: "2026-06-26",
    time: "14:30:00",
    venueName: "Hablis Hotel",
    address: "19, GST Road, Guindy, Chennai, Tamil Nadu 600032",
    locality: "Guindy",
    description:
      "Enterprise data infrastructure seminar on cloud storage, optimisation, and cybersecurity — hosted by Hitachi Systems.",
    ticketPrice: "Professional invitation / registration required",
    targetAudience: "IT professionals, DB engineers, tech managers",
  },
  {
    slug: "phulka-dots-amruta-bendre-trinity-june-2026",
    title: "Phulka Dots ft. Amruta Bendre — Musical MOMedy",
    category: "Stand-up comedy & open mics",
    date: "2026-06-27",
    time: "18:00:00",
    venueName: "Trinity Studio",
    address: "1st Main Road, United India Colony, Kodambakkam, Chennai, Tamil Nadu 600024",
    locality: "Kodambakkam",
    description:
      "Bollywood song parodies and parenting stories in a unique comedic performance.",
    ticketPrice: "Paid — tickets online",
    targetAudience: "Families, mothers, parody fans",
    bookingLink: "https://in.bookmyshow.com/explore/home/chennai",
  },
  {
    slug: "global-startups-club-mixer-anna-salai-june-2026",
    title: "Global Startups Club Networking Mixer",
    category: "Tech, business & community meetups",
    date: "2026-06-27",
    time: "10:30:00",
    venueName: "Global Startups Club — Chennai Chapter",
    address: "Co-working Hub, Anna Salai, Chennai, Tamil Nadu 600002",
    locality: "Anna Salai",
    description:
      "Structured mixer for founders, angel investors, VCs, and ecosystem operators across Chennai's startup scene.",
    ticketPrice: "Paid pass required",
    targetAudience: "Entrepreneurs, business owners, investors",
    bookingLink: "https://www.meetup.com/find/in--chennai/",
  },
  {
    slug: "phoenix-shopping-festival-velachery-june-2026",
    title: "Phoenix Shopping Festival 2026",
    category: "Lifestyle, shopping & exhibitions",
    date: "2026-06-01 to 2026-06-30",
    time: "11:00:00 to 22:00:00",
    venueName: "Phoenix Marketcity Chennai",
    address: "142, Velachery Rd, Alandur, Chennai, Tamil Nadu 600042",
    locality: "Velachery",
    description:
      "Month-long mall festival with flash discounts, brand launches, and raffle draws across fashion and electronics.",
    ticketPrice: "Free entry",
    targetAudience: "Families, weekend shoppers, bargain hunters",
    bookingLink: "https://www.instagram.com/",
    featured: true,
  },
  {
    slug: "ghar-open-mic-words-trinity-june-2026",
    title: "Ghar — An Open Mic for Words",
    category: "Community & open mics",
    date: "2026-06-28",
    time: "16:00:00",
    venueName: "Trinity Studio",
    address: "1st Main Road, United India Colony, Kodambakkam, Chennai, Tamil Nadu 600024",
    locality: "Kodambakkam",
    description:
      "Cozy poetry, spoken word, and storytelling open mic presented by Tape A Tale.",
    ticketPrice: "₹200",
    targetAudience: "Poets, writers, students, literature fans",
  },
  {
    slug: "idhu-ungal-sothu-property-expo-omr-july-2026",
    title: "Idhu Ungal Sothu Mega Property Expo",
    category: "Lifestyle, shopping & exhibitions",
    date: "2026-07-04 to 2026-07-05",
    time: "08:00:00 to 20:00:00",
    venueName: "Arul Murugan Towers",
    address: "Thoraipakkam, OMR, Chennai, Tamil Nadu 600097",
    locality: "Thoraipakkam",
    description:
      "Real-estate expo connecting buyers with developers — on-spot booking deals and bank loan desks.",
    ticketPrice: "Free entry",
    targetAudience: "Home buyers and property investors",
  },
  {
    slug: "chennai-magento-meetup-taramani-july-2026",
    title: "Chennai Magento Meetup",
    category: "Tech, business & community meetups",
    date: "2026-07-04",
    time: "10:00:00",
    venueName: "Chennai Magento Community Center",
    address: "Tech Park Hub, Taramani, Chennai, Tamil Nadu 600113",
    locality: "Taramani",
    description:
      "Developer forum on platform upgrades, e-commerce security, and modern storefront UI trends.",
    ticketPrice: "Free — prior online registration",
    targetAudience: "E-commerce developers, designers, merchants",
    bookingLink: "https://www.meetup.com/find/in--chennai/",
  },
  {
    slug: "the-cage-2-chennai-rave-nungambakkam-july-2026",
    title: "The Cage 2.0 — Chennai's Wildest Cage Rave",
    category: "Live music & concerts",
    date: "2026-07-05",
    time: "17:00:00",
    venueName: "Secret Story Chennai",
    address: "Khader Nawaz Khan Road, Nungambakkam, Chennai, Tamil Nadu 600006",
    locality: "Nungambakkam",
    description:
      "Underground electronic rave inside a custom cage dancefloor with heavy bass and industrial lighting.",
    ticketPrice: "Paid — cover charges apply",
    targetAudience: "Nightlife and techno fans",
    bookingLink: "https://www.district.in/",
  },
  {
    slug: "kayilae-aagasam-saindhavi-concert-thiruverkadu-july-2026",
    title: "Kayilae Aagasam — Saindhavi Live in Concert",
    category: "Live music & concerts",
    date: "2026-07-11",
    time: "17:15:00",
    venueName: "S.A. College of Arts & Science Campus",
    address: "Poonamallee-Avadi Main Road, Thiruverkadu, Chennai, Tamil Nadu 600077",
    locality: "Thiruverkadu",
    description:
      "Open-air concert with Saindhavi, Sridhar Sena, and the Sunshine Orchestra — classical fusion and Tamil film hits.",
    ticketPrice: "Paid — seating tiers",
    targetAudience: "Families and Tamil film-music fans",
    bookingLink: "https://in.bookmyshow.com/",
    featured: true,
  },
  {
    slug: "jagane-thandhiram-jagan-krishnan-egmore-july-2026",
    title: "Jagane Thandhiram Chennai — musical stand-up",
    category: "Stand-up comedy & open mics",
    date: "2026-07-12",
    time: "18:30:00",
    venueName: "Museum Theatre",
    address: "Pantheon Road, Egmore, Chennai, Tamil Nadu 600008",
    locality: "Egmore",
    description:
      "Jagan Krishnan's family-friendly musical comedy with roasts, original lyrics, and 90s nostalgia.",
    ticketPrice: "Paid — booking required",
    targetAudience: "Families, music fans, 90s kids",
    bookingLink: "https://in.bookmyshow.com/",
  },
  {
    slug: "little-festival-2026-museum-theatre-july-2026",
    title: "The Little Festival 2026 — children's theatre",
    category: "Theatre & family activities",
    date: "2026-07-12 to 2026-07-17",
    time: "10:30:00 to 16:00:00",
    venueName: "The Museum Theatre",
    address: "Pantheon Road, Egmore, Chennai, Tamil Nadu 600008",
    locality: "Egmore",
    description:
      "International children's theatre festival with global productions including physical-visual play Giant's Table.",
    ticketPrice: "Donor passes online",
    targetAudience: "School children, toddlers, parents",
    bookingLink: "https://www.instagram.com/",
    featured: true,
  },
  {
    slug: "karigar-bazaar-chennai-nandanam-july-2026",
    title: "Karigar Bazaar — Chennai Edition",
    category: "Lifestyle, shopping & exhibitions",
    date: "2026-07-10 to 2026-07-19",
    time: "11:00:00 to 20:00:00",
    venueName: "Mantra Gardens",
    address: "Nandanam Extension, Chennai, Tamil Nadu 600035",
    locality: "Nandanam",
    description:
      "Rajasthani craft exhibition — Jaipur blue pottery, tapestries, and rural artisan stalls.",
    ticketPrice: "Paid entry",
    targetAudience: "Home décor and handicraft enthusiasts",
    bookingLink: "https://www.instagram.com/",
  },
  {
    slug: "telling-lies-aashish-solanki-mylapore-july-2026",
    title: "Telling Lies by Aashish Solanki",
    category: "Stand-up comedy & open mics",
    date: "2026-07-25",
    time: "19:30:00",
    venueName: "Rasika Ranjani Sabha",
    address: "Sundareswarar Street, Mylapore, Chennai, Tamil Nadu 600004",
    locality: "Mylapore",
    description:
      "Animated solo stand-up on gyms, adulting, and childhood math teachers.",
    ticketPrice: "Paid — seating booking",
    targetAudience: "Young adults and comedy fans",
    bookingLink: "https://in.bookmyshow.com/explore/home/chennai",
  },
  {
    slug: "lea-singalong-tour-music-academy-july-2026",
    title: "Lea: Love vs Friendship Singalong Tour",
    category: "Live music & concerts",
    date: "2026-07-26",
    time: "18:30:00",
    venueName: "The Music Academy",
    address: "TTK Road, Royapettah, Chennai, Tamil Nadu 600014",
    locality: "Royapettah",
    description:
      "Interactive crowd singalong concert with anthems and light projections.",
    ticketPrice: "Paid passes online",
    targetAudience: "College students and young music crowds",
    bookingLink: "https://www.instagram.com/",
  },
  {
    slug: "vir-das-sounds-of-india-chetpet-sept-2026",
    title: "Vir Das — Sounds of India Tour",
    category: "Stand-up comedy & open mics",
    date: "2026-09-05",
    time: "19:30:00",
    venueName: "Sir Mutha Venkatasubba Rao Concert Hall",
    address: "1, Harrington Road, Chetpet, Chennai, Tamil Nadu 600031",
    locality: "Chetpet",
    description:
      "Emmy winner Vir Das blends audio-visual theatre and stand-up on India's shifting cultural soundscape — confirm Chennai date on official tour listings.",
    ticketPrice: "Premium ticket tiers",
    targetAudience: "Mature audiences, English stand-up fans",
    bookingLink: "https://in.bookmyshow.com/explore/home/chennai",
    featured: true,
    notes:
      "Part of Vir Das's Sounds of India tour — verify seat map and show time on BookMyShow or virdas.in before booking.",
  },
  {
    slug: "shamik-chakrabarti-live-mylapore-sept-2026",
    title: "Shamik Chakrabarti Live",
    category: "Stand-up comedy & open mics",
    date: "2026-09-13",
    time: "18:00:00",
    venueName: "Rasika Ranjani Sabha",
    address: "Sundareswarar Street, Mylapore, Chennai, Tamil Nadu 600004",
    locality: "Mylapore",
    description:
      "Dry wit and observational humour with pleasant crowd work — family-appropriate solo hour.",
    ticketPrice: "Paid — tickets online",
    targetAudience: "Families and premium comedy goers",
    bookingLink: "https://in.bookmyshow.com/explore/home/chennai",
  },
  {
    slug: "sapan-verma-live-alwarpet-oct-2026",
    title: "Sapan Verma Live — new solo tour",
    category: "Stand-up comedy & open mics",
    date: "2026-10-17",
    time: "18:00:00",
    venueName: "Medai — The Stage Chennai",
    address: "Cooperative Colony, Alwarpet, Chennai, Tamil Nadu 600018",
    locality: "Alwarpet",
    description:
      "Brand-new hour on AI weirdness, birthday parties after thirty, and everyday absurdities.",
    ticketPrice: "Paid — online booking",
    targetAudience: "Young professionals, students, comedy fans",
    bookingLink: "https://in.bookmyshow.com/explore/home/chennai",
  },
];
