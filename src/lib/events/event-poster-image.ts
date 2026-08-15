import { getSiteUrl } from "@/lib/env";

export type EventPosterSpec = {
  src: string;
  alt: string;
};

/** Self-hosted event posters keyed by event slug. Add a row when a flyer is supplied. */
const POSTERS_BY_SLUG: Record<string, EventPosterSpec> = {
  "kathakali-tamil-solo-play-restore-kottivakkam-june-2026": {
    src: "/images/events/kathakali-restore-kottivakkam-june-2026.png",
    alt: "Kathakali Tamil solo play poster — Seetha Lakshmi at reStore, Kottivakkam, Chennai, 27 June 2026",
  },
  "tote-bag-paint-and-play-thinnai-porur-june-2026": {
    src: "/images/events/tote-bag-paint-and-play-thinnai-porur-june-2026.jpg",
    alt: "Tote Bag Paint and Play poster — Thinnai board games café, Madhanandapuram, Porur, Chennai, 13 June 2026",
  },
  "jolly-phonics-workshop-tweeties-online-july-2026": {
    src: "/images/events/jolly-phonics-workshop-tweeties-july-2026.jpg",
    alt: "Jolly Phonics Workshop poster — Tweeties Institute of Education and Jolly Learning, 8-day online training July 2026",
  },
  "grand-vegetable-exhibition-heirloom-seed-festival-t-nagar-july-2026": {
    src: "/images/events/grand-vegetable-exhibition-heirloom-seed-festival-t-nagar-july-2026.png",
    alt: "Grand Vegetable Exhibition and Heirloom Seed Festival poster — Thakkar Baba Vidyalaya School, T. Nagar, Chennai, 26 July 2026",
  },
  "myavtar-sheworks-career-fair-mop-vaishnav-july-2026": {
    src: "/images/events/myavtar-sheworks-career-fair-mop-vaishnav-july-2026.png",
    alt: "myAvtar SheWorks Career Fair poster — MOP Vaishnav College for Women, Nungambakkam, Chennai, 4 July 2026",
  },
  "print-expo-chennai-trade-centre-july-2026": {
    src: "/images/events/print-expo-chennai-trade-centre-july-2026.png",
    alt: "Print Expo Chennai poster — South India prints here, Chennai Trade Centre, 9–11 July 2026",
  },
  "seafood-expo-bharat-chennai-trade-centre-july-2026": {
    src: "/images/events/seafood-expo-bharat-chennai-trade-centre-july-2026.png",
    alt: "Seafood Expo Bharat 2026 poster — Connect. Discover. Grow., Chennai Trade Centre, 1–3 July 2026",
  },
  "omr-marathon-anti-drug-awareness-padur-august-2026": {
    src: "/images/events/omr-marathon-anti-drug-awareness-padur-august-2026.png",
    alt: "OMR Marathon — Anti-Drug Awareness Marathon poster, Padur OMR Chennai, 9 August 2026",
  },
  "saturangam-360-chess-endgame-webinar-august-2026": {
    src: "/images/events/saturangam-360-chess-endgame-webinar-august-2026.png",
    alt: "Saturangam 360 Academy — Game Concept Endgame Fundamentals chess webinar poster, 22 August 2026",
  },
  "sj-jananiy-carnatic-vocal-narada-gana-sabha-august-2026": {
    src: "/images/events/sj-jananiy-carnatic-narada-gana-sabha-august-2026.jpg",
    alt: "Carnatic vocal concert mood — Kalaimamani S. J. Jananiy at Narada Gana Sabha, Chennai, 15 August 2026",
  },
  "sukoon-baithak-utkarsh-sharma-mathsya-adyar-september-2026": {
    src: "/images/events/sukoon-baithak-utkarsh-sharma-adyar-september-2026.jpg",
    alt: "Sukoon Baithak mood — Utkarsh Sharma ghazals at Mathsya Adyar, Chennai, 5 September 2026",
  },
  "tabla-poetry-bhupendra-singh-music-academy-september-2026": {
    src: "/images/events/tabla-poetry-bhupendra-singh-september-2026.jpg",
    alt: "Tabla Poetry Live mood — Bhupendra Singh Khidia at Music Academy Mini Hall, Chennai, 20 September 2026",
  },
  "tamil-nadu-international-kite-festival-mamallapuram-august-2026": {
    src: "/images/events/ttdc-this-weekend-ecr-plan-august-2026.png",
    alt: "Tamil Nadu Tourism This Weekend ECR Plan poster featuring the Mamallapuram kite festival, TTDC Ocean View, 14–16 August 2026",
  },
  "shore-temple-classic-qs-2000-mamallapuram-august-2026": {
    src: "/images/events/ttdc-this-weekend-ecr-plan-august-2026.png",
    alt: "Tamil Nadu Tourism This Weekend ECR Plan poster featuring the Mamallapuram surfing championship stop, August 2026",
  },
  "meetup-baking-for-beginners-cake-mall-nungambakkam-aug-2026": {
    src: "/images/events/meetup-baking-workshop-chennai.jpg",
    alt: "Baking workshop mood — Baking for Beginners at Cake Mall, Nungambakkam, Chennai",
  },
  "meetup-data-science-essentials-rpa-iitm-research-park-aug-2026": {
    src: "/images/events/meetup-tech-workshop-chennai.jpg",
    alt: "Tech workshop mood — Data Science Essentials RPA at IITM Research Park, Chennai",
  },
  "meetup-new-business-circle-ronda-chennai-aug-2026": {
    src: "/images/events/meetup-networking-chennai.jpg",
    alt: "Networking mood — NEW BUSINESS CIRCLE by Ronda Club, Chennai",
  },
  "meetup-breaking-code-workshop-iitm-research-park-aug-2026": {
    src: "/images/events/meetup-tech-workshop-chennai.jpg",
    alt: "Coding workshop mood — Breaking Code at IITM Research Park, Chennai",
  },
  "meetup-board-games-banter-brews-funtunes-virugambakkam-aug-2026": {
    src: "/images/events/meetup-board-games-chennai.jpg",
    alt: "Board games mood — Board Games, Banter & Brews at Funtunes, Virugambakkam",
  },
  "meetup-women-network-india-ronda-chennai-aug-2026": {
    src: "/images/events/meetup-networking-chennai.jpg",
    alt: "Community networking mood — Women Network India, Chennai",
  },
  "meetup-texsas-holdem-chennai-poker-house-aug-2026": {
    src: "/images/events/meetup-board-games-chennai.jpg",
    alt: "Table games mood — Texsas Holdem poker meetup, T. Nagar, Chennai",
  },
  "meetup-silent-sufi-meditation-taj-business-hub-santhome-aug-2026": {
    src: "/images/events/meetup-meditation-chennai.jpg",
    alt: "Meditation mood — Silent Sufi Meditation at Taj Business Hub, Santhome",
  },
  "meetup-power-of-mind-self-realization-ccd-nungambakkam-aug-2026": {
    src: "/images/events/meetup-meditation-chennai.jpg",
    alt: "Self-development mood — Power of Mind meetup at CCD Ispahani Centre",
  },
  "meetup-beyond-the-hype-ai-technexus-microsoft-teynampet-aug-2026": {
    src: "/images/events/meetup-ai-cloud-chennai.jpg",
    alt: "AI meetup mood — Beyond the Hype at Microsoft Prestige Polygon, Teynampet",
  },
  "meetup-ksug-ai-india-9-cloud-native-ai-cloudera-aug-2026": {
    src: "/images/events/meetup-ai-cloud-chennai.jpg",
    alt: "Cloud native AI mood — KSUG.AI India meetup at Cloudera, Chennai",
  },
  "meetup-apache-kafka-chennai-facilio-guindy-aug-2026": {
    src: "/images/events/meetup-tech-workshop-chennai.jpg",
    alt: "Streaming tech mood — Apache Kafka Meetup at Facilio, Guindy",
  },
  "meetup-chennai-freelancers-club-makers-tribe-aug-2026": {
    src: "/images/events/meetup-networking-chennai.jpg",
    alt: "Freelancer networking mood — Chennai Freelancers Club by Makers Tribe",
  },
  "meetup-expert-talks-ai-evaluation-auth-indiqube-ekkatuthangal-aug-2026": {
    src: "/images/events/meetup-ai-cloud-chennai.jpg",
    alt: "Expert talks mood — AI evaluation and authorisation at IndiQube Alpine",
  },
  "meetup-claude-code-data-architects-pro-office-teynampet-sep-2026": {
    src: "/images/events/meetup-tech-workshop-chennai.jpg",
    alt: "Claude Code workshop mood — Data Architects at PRO Office, Teynampet",
  },
  "ticket9-chennaiyil-chinna-kuyil": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/Chennaiyil%20Chinna%20Kuyil/64711457/Chennaiyil%20Chinna%20Kuyil_bannerimage.webp",
    alt: "Chennaiyil Chinna Kuyil — Ticket9 Chennai event poster",
  },
  "ticket9-kalam-s-world-records-honour-ceremony-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/Kalam%27s%20World%20Records%20Honour%20Ceremony%202026/86657068/Kalam%27s%20World%20Records%20Honour%20Ceremony%202026_bannerimage.webp",
    alt: "Kalam's World Records Honour Ceremony 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-my-dream-stage-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/My%20Dream%20Stage%202026/16550068/My%20Dream%20Stage%202026_bannerimage.webp",
    alt: "My Dream Stage 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-thiruporur-marathon": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/Thiruporur%20marathon/70305868/Thiruporur%20marathon_bannerimage.webp",
    alt: "Thiruporur marathon — Ticket9 Chennai event poster",
  },
  "ticket9-frangipani-tour-chennai": {
    src: "/images/events/frangipani-tour-kaber-vasuki-august-2026.webp",
    alt: "Frangipani Tour with Kaber Vasuki — The Music Academy, Chennai, 22 August 2026",
  },
  "ticket9-pomblel-chennai": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/Pomblel%20%28Chennai%29/32558663/Pomblel%20%28Chennai%29_bannerimage.webp",
    alt: "Pomblel (Chennai) — Ticket9 Chennai event poster",
  },
  "ticket9-good-timing-ji-chennai": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/Good%20Timing%20Ji/58120761/Good%20Timing%20Ji_bannerimage.webp",
    alt: "Good Timing Ji - Chennai — Ticket9 Chennai event poster",
  },
  "ticket9-the-green-chase-26": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/THE%20GREEN%20CHASE%20%2726/37373103/THE%20GREEN%20CHASE%20%2726_bannerimage.webp",
    alt: "THE GREEN CHASE '26 — Ticket9 Chennai event poster",
  },
  "ticket9-bharat-option-traders-summit-chennai-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/BHARAT%20OPTION%20TRADERS%20SUMMIT%20CHENNAI%20-%202026/17185630/BHARAT%20OPTION%20TRADERS%20SUMMIT%20CHENNAI%20-%202026_bannerimage.webp",
    alt: "BHARAT OPTION TRADERS SUMMIT CHENNAI - 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-independence-day-kidzathon-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/INDEPENDENCE%20DAY%20KIDZATHON%202026/91275810/INDEPENDENCE%20DAY%20KIDZATHON%202026_bannerimage.webp",
    alt: "INDEPENDENCE DAY KIDZATHON 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-omr-marathon": {
    src: "/images/events/omr-marathon-anti-drug-awareness-padur-august-2026.png",
    alt: "OMR Marathon — Anti-Drug Awareness Marathon poster, Padur OMR Chennai, 9 August 2026",
  },
  "ticket9-chennai-kidathon-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/CHENNAI%20KIDATHON%202026/24704685/CHENNAI%20KIDATHON%202026_bannerimage.webp",
    alt: "CHENNAI KIDATHON 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-thangame-thalapathy": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/Thangame%20Thalapathy/90151354/Thangame%20Thalapathy_bannerimage.webp",
    alt: "Thangame Thalapathy — Ticket9 Chennai event poster",
  },
  "ticket9-magic-money-tn-summit-2026-chennai": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/Magic%20Money%20TN%20Summit%202026%20%E2%80%93%20Chennai/78244578/Magic%20Money%20TN%20Summit%202026%20%E2%80%93%20Chennai_bannerimage.webp",
    alt: "Magic Money TN Summit 2026 – Chennai — Ticket9 Chennai event poster",
  },
  "ticket9-love-vs-friendship-by-lea-i-sing-along-concert-chennai": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/LOVE%20vs%20FRIENDSHIP%20by%20LEA%20I%20SING-ALONG%20CONCERT%20-%20CHENNAI/88255550/LOVE%20vs%20FRIENDSHIP%20by%20LEA%20I%20SING-ALONG%20CONCERT%20-%20CHENNAI_bannerimage.webp",
    alt: "LOVE vs FRIENDSHIP by LEA I SING-ALONG CONCERT - CHENNAI — Ticket9 Chennai event poster",
  },
  "ticket9-run-for-women-empowerment-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/Run%20for%20women%20empowerment%202026/92796699/Run%20for%20women%20empowerment%202026_bannerimage.webp",
    alt: "Run for women empowerment 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-the-iconic-dream-chakras-awards-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/The%20Iconic%20Dream%20Chakras%20Awards%202026/92934528/The%20Iconic%20Dream%20Chakras%20Awards%202026_bannerimage.webp",
    alt: "The Iconic Dream Chakras Awards 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-chennai-freelancers-club-monthly-meetup-july-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/Chennai%20Freelancers%20Club%20%E2%80%93%20Monthly%20Meetup%20July%202026/69605987/Chennai%20Freelancers%20Club%20%E2%80%93%20Monthly%20Meetup%20July%202026_bannerimage.webp",
    alt: "Chennai Freelancers Club – Monthly Meetup July 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-64-gambit": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/64%20Gambit%20/98701341/64%20Gambit%20_bannerimage.webp",
    alt: "64 Gambit — Ticket9 Chennai event poster",
  },
  "ticket9-radicex": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/RadicEx/31895336/RadicEx_bannerimage.webp",
    alt: "RadicEx — Ticket9 Chennai event poster",
  },
  "ticket9-dia-diamonds-south-indian-nakshatram-awards-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/DIA%20Diamonds%20%E2%80%93%20South%20Indian%20Nakshatram%20Awards%202026/87359246/DIA%20Diamonds%20%E2%80%93%20South%20Indian%20Nakshatram%20Awards%202026_bannerimage.webp",
    alt: "DIA Diamonds – South Indian Nakshatram Awards 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-xy-cromax-go-paddie-she-miss-beauty-tamilnadu-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/XY%20Cromax%20Go%20Paddie%20%E2%80%93%20She%20Miss%20Beauty%20Tamilnadu%202026/47347361/XY%20Cromax%20Go%20Paddie%20%E2%80%93%20She%20Miss%20Beauty%20Tamilnadu%202026_bannerimage.webp",
    alt: "XY Cromax Go Paddie – She Miss Beauty Tamilnadu 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-state-level-handwriting-competition-july-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/State%20Level%20Handwriting%20Competition%20July%202026/66986487/State%20Level%20Handwriting%20Competition%20July%202026_bannerimage.webp",
    alt: "State Level Handwriting Competition July 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-chennai-clay-keychains-with-puppies-at-sage-lavender": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/Chennai%20Clay%20Keychains%20with%20Puppies%20at%20Sage%20%26%20Lavender/71959259/Chennai%20Clay%20Keychains%20with%20Puppies%20at%20Sage%20%26%20Lavender_bannerimage.webp",
    alt: "Chennai Clay Keychains with Puppies at Sage & Lavender — Ticket9 Chennai event poster",
  },
  "ticket9-galatta-digital-stars-2026-4th-edition": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/Galatta%20Digital%20Stars%202026%20-%204th%20Edition/78425128/Galatta%20Digital%20Stars%202026%20-%204th%20Edition_bannerimage.webp",
    alt: "Galatta Digital Stars 2026 - 4th Edition — Ticket9 Chennai event poster",
  },
  "ticket9-state-level-kids-drawing-carnival-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/State%20level%20kids%20drawing%20carnival%202026/46810189/State%20level%20kids%20drawing%20carnival%202026_bannerimage.webp",
    alt: "State level kids drawing carnival 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-state-level-kids-junior-badminton-tournament-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/State%20level%20kids%20%26%20junior%20badminton%20tournament%202026/29982601/State%20level%20kids%20%26%20junior%20badminton%20tournament%202026_bannerimage.webp",
    alt: "State level kids & junior badminton tournament 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-inter-school-chess-tournament-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/INTER%20SCHOOL%20CHESS%20TOURNAMENT%202026/87805828/INTER%20SCHOOL%20CHESS%20TOURNAMENT%202026_bannerimage.webp",
    alt: "INTER SCHOOL CHESS TOURNAMENT 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-state-level-drawing-carnivals-july-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/State%20Level%20Drawing%20Carnivals%20July%202026/17714985/State%20Level%20Drawing%20Carnivals%20July%202026_bannerimage.webp",
    alt: "State Level Drawing Carnivals July 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-chennai-puppy-yoga-journaling-circle-at-the-bistrograph": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/Chennai%20Puppy%20Yoga%20%2B%20Journaling%20Circle%20at%20The%20Bistrograph/41827741/Chennai%20Puppy%20Yoga%20%2B%20Journaling%20Circle%20at%20The%20Bistrograph_bannerimage.webp",
    alt: "Chennai Puppy Yoga + Journaling Circle at The Bistrograph — Ticket9 Chennai event poster",
  },
  "ticket9-pets-day-out-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/PETS%20DAY%20OUT%202026/53616067/PETS%20DAY%20OUT%202026_bannerimage.webp",
    alt: "PETS DAY OUT 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-state-level-inter-school-athletic-championship-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/State%20level%20inter%20school%20athletic%20championship%202026/99658028/State%20level%20inter%20school%20athletic%20championship%202026_bannerimage.webp",
    alt: "State level inter school athletic championship 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-founder-circle-edition-12": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/Founder%20Circle%20Edition%2012/10993337/Founder%20Circle%20Edition%2012_bannerimage.webp",
    alt: "Founder Circle Edition 12 — Ticket9 Chennai event poster",
  },
  "ticket9-madrasakka-live-tamil-sing-along-jamming-in-chennai": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/MADRASAKKA%20-%20Live%20Tamil%20Sing-Along%20%2B%20Jamming%20in%20Chennai/64096156/MADRASAKKA%20-%20Live%20Tamil%20Sing-Along%20%2B%20Jamming%20in%20Chennai_bannerimage.webp",
    alt: "MADRASAKKA - Live Tamil Sing-Along + Jamming in Chennai — Ticket9 Chennai event poster",
  },
  "ticket9-state-level-inter-school-handwriting-competition-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/State%20level%20inter%20school%20handwriting%20competition%202026/36419447/State%20level%20inter%20school%20handwriting%20competition%202026_bannerimage.webp",
    alt: "State level inter school handwriting competition 2026 — Ticket9 Chennai event poster",
  },
  "ticket9-namma-chennai-juniorthon-4th-edition": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/NAMMA%20CHENNAI%20JUNIORTHON%204TH%20EDITION/67884102/NAMMA%20CHENNAI%20JUNIORTHON%204TH%20EDITION_bannerimage.webp",
    alt: "NAMMA CHENNAI JUNIORTHON 4TH EDITION — Ticket9 Chennai event poster",
  },
  "ticket9-the-unwritten-journey-a-stranger-photowalk": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/The%20Unwritten%20Journey%20-%20%20A%20Stranger%20Photowalk/39224958/The%20Unwritten%20Journey%20-%20%20A%20Stranger%20Photowalk_bannerimage.webp",
    alt: "The Unwritten Journey - A Stranger Photowalk — Ticket9 Chennai event poster",
  },
  "ticket9-namma-besy-run-2026": {
    src: "https://storage.googleapis.com/ticket9-prod.appspot.com/images/Namma%20Bessy%20Mile%20Run%202026/51604693/Namma%20Bessy%20Mile%20Run%202026_bannerimage.webp",
    alt: "Namma Bessy Mile Run 2026 — Ticket9 Chennai event poster",
  },
};

export function getRegisteredEventPoster(slug: string): EventPosterSpec | null {
  return POSTERS_BY_SLUG[slug.trim()] ?? null;
}

/** Returns a poster only when one is explicitly registered for the slug. */
export function getEventPosterImage(
  slug: string,
  _fallbackTitle?: string,
  _description?: string | null,
): EventPosterSpec | null {
  return getRegisteredEventPoster(slug);
}

export function hasEventPosterImage(slug: string): boolean {
  return getRegisteredEventPoster(slug) !== null;
}

export function eventPosterAbsoluteUrl(
  slug: string,
  title?: string,
  description?: string | null,
): string | null {
  const poster = getEventPosterImage(slug, title, description);
  if (!poster) return null;
  return new URL(poster.src, getSiteUrl()).toString();
}
