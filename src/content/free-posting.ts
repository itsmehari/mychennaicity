/**
 * Indexable free-posting guides. Public actions open WhatsApp.
 * The desk number is not stored here.
 */

export const FREE_POST_BRAND_PREFIX = "[MyChennaiCity]";

export const FREE_POST_HUB_PATH = "/post-free";

export const FREE_POST_KINDS = [
  "job",
  "home",
  "classified",
  "event",
  "sell",
  "pg",
] as const;

export type FreePostKind = (typeof FREE_POST_KINDS)[number];

/** Localities already used on area hubs and the WhatsApp landing. */
export const FREE_POST_AREAS = [
  "T. Nagar",
  "Velachery",
  "Adyar",
  "Anna Nagar",
  "Tambaram",
  "OMR",
  "Porur",
  "Chrompet",
  "Sholinganallur",
  "Perungudi",
  "Nungambakkam",
  "Guindy",
  "Ambattur",
  "Royapuram",
  "Madhavaram",
] as const;

export const FREE_POST_AREA_SENTENCE = `Name the area in the message: ${FREE_POST_AREAS.slice(0, 6).join(", ")}, or another place in Chennai such as ${FREE_POST_AREAS.slice(6, 10).join(", ")}.`;

export type FreePostFaq = { question: string; answer: string };

export type FreePostGuide = {
  kind: FreePostKind;
  path: string;
  /** Short label on the hub and sibling lists. */
  navLabel: string;
  cardTitle: string;
  cardBody: string;
  title: string;
  description: string;
  kicker: string;
  h1: string;
  lede: string;
  sendLine: string;
  who: string[];
  get: string[];
  starterTail: string;
  faqs: FreePostFaq[];
};

const published =
  "MyChennaiCity checks the message and publishes it on mychennaicity.in. There is no public form and no fee for a standard listing.";

export const FREE_POST_GUIDES: Record<FreePostKind, FreePostGuide> = {
  job: {
    kind: "job",
    path: "/post-a-job-in-chennai",
    navLabel: "Post a job",
    cardTitle: "Post a job",
    cardBody:
      "Free job post for Chennai. Send the role, company, area, and contact on WhatsApp.",
    title: "Post a job for free in Chennai",
    description:
      "Post a job for free in Chennai. Send a WhatsApp message to MyChennaiCity with the role, company, and area. No form. We publish it on the jobs board.",
    kicker: "Jobs · Chennai",
    h1: "Post a job for free in Chennai",
    lede:
      "Employers post a job on MyChennaiCity by sending a WhatsApp message. The role goes on the Chennai jobs board for people who live and work in the city, from T. Nagar and Anna Nagar to Velachery, Adyar, Tambaram, and OMR. There is no public form and no fee.",
    sendLine:
      "Send the role, company name, area, and how candidates should reach you. WhatsApp opens with a starter message.",
    who: [
      "Shops, clinics, schools, and apartments that need local staff",
      "Companies hiring in Guindy, Ambattur, OMR, and other work areas",
      "Teams that want candidates who already live in Chennai",
    ],
    get: [
      "A public job page on mychennaicity.in",
      "Readers across T. Nagar, Velachery, Adyar, Anna Nagar, Tambaram, OMR, and the rest of the city",
      "Applications stay on your own link, call, or WhatsApp",
    ],
    starterTail:
      "I want to post a job on MyChennaiCity. Role, company, area, and how people should reach me:",
    faqs: [
      {
        question: "How do I post a job in Chennai?",
        answer:
          "Open this page and send a WhatsApp message to the MyChennaiCity desk. Include the role, company, area, and contact. The desk checks it and publishes it on the jobs board.",
      },
      {
        question: "Is posting a job on MyChennaiCity free?",
        answer:
          "Yes. A standard job post is free. Signed-in employers can still use the job form. There is no fee taken from candidates for a standard listing.",
      },
      {
        question: "Who sees the job?",
        answer:
          "People looking for work in Chennai, including T. Nagar, Velachery, Adyar, Anna Nagar, Tambaram, OMR, Porur, and Guindy.",
      },
    ],
  },
  home: {
    kind: "home",
    path: "/list-a-home-in-chennai",
    navLabel: "List a home",
    cardTitle: "Rent / lease a home",
    cardBody:
      "List a house or flat in Chennai. Send the type, area, rent, and deposit.",
    title: "List a home for free in Chennai",
    description:
      "List a house or flat in Chennai for free. Send a WhatsApp message to MyChennaiCity with the type, area, rent, and deposit. No form.",
    kicker: "Homes · Chennai",
    h1: "List a home for free in Chennai",
    lede:
      "Owners and agents list a house or flat on MyChennaiCity by sending a WhatsApp message. The notice goes on the Chennai classifieds board for people already searching in neighbourhoods such as Adyar, Velachery, Anna Nagar, Tambaram, and OMR. There is no public form.",
    sendLine:
      "Send the home type, area, monthly rent, deposit, and a phone number. WhatsApp opens with a starter message.",
    who: [
      "Owners with a flat or house to rent in Chennai",
      "Families moving between areas such as Velachery, Adyar, and Tambaram",
      "Anyone who can name the locality and a number buyers or tenants can use",
    ],
    get: [
      "A public listing on the Chennai classifieds board",
      "Readers who already look in that area",
      "Enquiries come back on the phone number you send",
    ],
    starterTail:
      "I want to list a home on MyChennaiCity. Type, area, rent, deposit, and contact:",
    faqs: [
      {
        question: "How do I list a house for rent in Chennai?",
        answer:
          "Open this page. WhatsApp opens with a starter message. Send the home type, area, monthly rent, deposit, and a phone number. The desk publishes it after a check.",
      },
      {
        question: "Do I need an account to list a home?",
        answer: `No. A WhatsApp message is enough. ${published}`,
      },
      {
        question: "Which areas can I name?",
        answer: FREE_POST_AREA_SENTENCE,
      },
    ],
  },
  classified: {
    kind: "classified",
    path: "/post-a-classified-in-chennai",
    navLabel: "Post a classified",
    cardTitle: "Classified ad",
    cardBody:
      "Free classified for T. Nagar, Velachery, Adyar, and the rest of Chennai. Send what it is, the area, and the price.",
    title: "Post a classified ad for free in Chennai",
    description:
      "Post a classified ad in Chennai for free. Send a WhatsApp message to MyChennaiCity with what it is, the area, and the price. No form.",
    kicker: "Classifieds · Chennai",
    h1: "Post a classified ad for free in Chennai",
    lede:
      "A classified on MyChennaiCity is a local notice: a service, a wanted post, tuition, or a neighbourhood offer. Send a WhatsApp message. The desk checks it and places it on the Chennai classifieds board. There is no public form.",
    sendLine:
      "Send what it is, the area, the price if there is one, and how people should reach you. WhatsApp opens with a starter message.",
    who: [
      "People offering a local service in one Chennai area",
      "Neighbours with a wanted note, tuition, or a small offer",
      "Anyone who can name the locality and a contact number",
    ],
    get: [
      "A public ad on mychennaicity.in/chennai-classifieds",
      "A stable link you can share",
      "Readers contact you directly. The site does not take a cut",
    ],
    starterTail:
      "I want to post a classified on MyChennaiCity. What it is, area, price, and contact:",
    faqs: [
      {
        question: "How do I post a classified ad in Chennai?",
        answer:
          "Choose Classified ad on the free-posting page, or open this page. Send what it is, the area (such as T. Nagar, Velachery, Adyar, Anna Nagar, Tambaram, or OMR), the price, and how people should reach you.",
      },
      {
        question: "Is a classified ad free?",
        answer:
          "Yes. A standard wanted post, service, tuition, or neighbourhood listing is free. A named employer hiring staff uses the job page. A house or flat uses the home page.",
      },
      {
        question: "Where do readers find the ad?",
        answer:
          "On https://mychennaicity.in/chennai-classifieds after the desk check. The older category guide is https://mychennaicity.in/guides/post-classified-ad-chennai.",
      },
    ],
  },
  event: {
    kind: "event",
    path: "/list-an-event-in-chennai",
    navLabel: "List an event",
    cardTitle: "List an event",
    cardBody:
      "Free event listing for Chennai. Send the name, date, place, and contact on WhatsApp.",
    title: "List an event for free in Chennai",
    description:
      "List a Chennai event for free. Send a WhatsApp message to MyChennaiCity with the name, date, place, and contact. No form. We publish it on the events calendar.",
    kicker: "Events · Chennai",
    h1: "List an event for free in Chennai",
    lede:
      "Organisers list a public Chennai event by sending a WhatsApp message. Workshops, markets, school programmes, and neighbourhood gatherings go on the events calendar after a check. There is no public form. Tickets stay with the organiser.",
    sendLine:
      "Send the name, date and time in India Standard Time, the place, and a contact or booking link. WhatsApp opens with a starter message.",
    who: [
      "Schools, halls, and associations with a public date",
      "Markets, meetups, and workshops in a named Chennai area",
      "Organisers who can say when it starts and where people should confirm",
    ],
    get: [
      "A public event page on the Chennai calendar",
      "Readers who already check what is on in the city",
      "Tickets and entry stay on your own link",
    ],
    starterTail:
      "I want to list an event on MyChennaiCity. Name, date, place, and contact:",
    faqs: [
      {
        question: "How do I list an event in Chennai?",
        answer:
          "Open this page and send a WhatsApp message. Include the name, date and time, venue or locality, and how people should confirm. The desk publishes a qualifying public event.",
      },
      {
        question: "Does MyChennaiCity sell tickets?",
        answer:
          "No. The site lists the event. Booking and entry stay with the organiser.",
      },
      {
        question: "Which places should I name?",
        answer: FREE_POST_AREA_SENTENCE,
      },
    ],
  },
  sell: {
    kind: "sell",
    path: "/sell-in-chennai",
    navLabel: "Sell an item",
    cardTitle: "Sell an item",
    cardBody:
      "Sell furniture, electronics, vehicles, and household goods in Chennai. Send the item, price, area, and contact.",
    title: "Sell an item for free in Chennai",
    description:
      "Sell an item in Chennai for free. Send a WhatsApp message to MyChennaiCity with the item, price, area, and contact. No form.",
    kicker: "Buy and sell · Chennai",
    h1: "Sell an item for free in Chennai",
    lede:
      "Offer furniture, electronics, a vehicle, or a household item to people in Chennai by sending a WhatsApp message. The desk checks it and places it on the classifieds board. There is no public form and no payment handled by the site.",
    sendLine:
      "Send the item, the price, the area, and how buyers should reach you. WhatsApp opens with a starter message.",
    who: [
      "Households clearing furniture or electronics",
      "People selling a vehicle in a named Chennai area",
      "Neighbours who want a local buyer, not a national listing site",
    ],
    get: [
      "A public notice on the Chennai classifieds board",
      "Buyers who can see the area and the price",
      "The conversation stays on your own number",
    ],
    starterTail:
      "I want to sell something on MyChennaiCity. Item, price, area, and contact:",
    faqs: [
      {
        question: "How do I sell something in Chennai on this site?",
        answer:
          "Open this page and send a WhatsApp message with the item, price, area, and contact. The desk publishes it after a check.",
      },
      {
        question: "Does the site take a commission?",
        answer:
          "No. MyChennaiCity does not broker the sale or hold the payment. Buyers contact you directly.",
      },
      {
        question: "Where should I say the item is?",
        answer: FREE_POST_AREA_SENTENCE,
      },
    ],
  },
  pg: {
    kind: "pg",
    path: "/list-a-pg-in-chennai",
    navLabel: "List a PG",
    cardTitle: "List a PG",
    cardBody:
      "Reach students and working people looking for a PG or hostel in Chennai. Send the area, rent, and sharing.",
    title: "List a PG for free in Chennai",
    description:
      "List a PG or hostel in Chennai for free. Send a WhatsApp message to MyChennaiCity with the area, rent, sharing, and contact. No form.",
    kicker: "PG and hostel · Chennai",
    h1: "List a PG for free in Chennai",
    lede:
      "PG and hostel owners list a room on MyChennaiCity by sending a WhatsApp message. Students and working people searching in areas such as OMR, Guindy, Tambaram, Adyar, and Anna Nagar can find it on the classifieds board after a check. There is no public form.",
    sendLine:
      "Send the area, monthly rent, sharing (single, double, or dorm), and a phone number. WhatsApp opens with a starter message.",
    who: [
      "PG and hostel owners with a vacant bed or room",
      "Apartment owners offering a room to a working person",
      "Anyone who can say the area, the rent, and who the room is for",
    ],
    get: [
      "A public listing on the Chennai classifieds board",
      "Readers looking near OMR, Guindy, Tambaram, Velachery, and other named areas",
      "Enquiries on the number you send",
    ],
    starterTail:
      "I want to list a PG on MyChennaiCity. Area, rent, sharing, and contact:",
    faqs: [
      {
        question: "How do I list a PG in Chennai?",
        answer:
          "Open this page and send a WhatsApp message with the area, rent, sharing, and contact. The desk publishes it on the classifieds board.",
      },
      {
        question: "Is a PG listing free?",
        answer: `Yes. A standard PG or hostel notice is free. ${published}`,
      },
      {
        question: "What should I include?",
        answer:
          "Area, monthly rent, whether it is single or shared, who it is for, and a phone number. Photos can follow in the same WhatsApp chat.",
      },
    ],
  },
};

export const FREE_POST_SITEMAP_PATHS = [
  FREE_POST_HUB_PATH,
  ...FREE_POST_KINDS.map((kind) => FREE_POST_GUIDES[kind].path),
] as const;

export function freePostStarter(kind: FreePostKind): string {
  return `${FREE_POST_BRAND_PREFIX} ${FREE_POST_GUIDES[kind].starterTail}`;
}

export function freePostGuide(kind: FreePostKind): FreePostGuide {
  return FREE_POST_GUIDES[kind];
}

export function freePostKindForLegacyPath(path: string): FreePostKind | null {
  const base = path.split("?")[0]?.replace(/\/$/, "") ?? "";
  if (base === "/advertise/jobs" || base === "/advertise/jobs-tamil") return "job";
  if (base === "/advertise/property" || base === "/advertise/property-tamil") {
    return "home";
  }
  if (
    base === "/advertise/classifieds" ||
    base === "/advertise/classifieds-tamil"
  ) {
    return "classified";
  }
  if (base === "/chennai-local-events/submit") return "event";
  return null;
}

export function postKindForClassifiedCategory(
  category: string | null | undefined,
): FreePostKind {
  if (category === "property") return "home";
  if (category === "vehicles") return "sell";
  if (category === "flatmates-roommates") return "pg";
  return "classified";
}

export const FREE_POST_HUB_FAQ: FreePostFaq[] = [
  {
    question: "How do I post on MyChennaiCity?",
    answer:
      "Send a WhatsApp message to the MyChennaiCity desk. Pick the type of listing, add the details to the starter message, and send it. The desk checks the message and publishes it. There is no public form and no fee for a standard listing.",
  },
  {
    question: "Is it free to post a job or ad in Chennai?",
    answer:
      "Yes. Posting a job, classified, event, home, PG, or item for sale on MyChennaiCity is free for Chennai.",
  },
  {
    question: "How do I list a house for rent in Chennai?",
    answer:
      "Choose Rent / lease a home on this page. WhatsApp opens with a starter message. Send the home type, area, monthly rent, deposit, and a phone number. The desk publishes it on the classifieds board.",
  },
  {
    question: "How do I post a classified ad in Velachery or T. Nagar?",
    answer:
      "Choose Classified ad. Send what it is, the area (such as T. Nagar, Velachery, Adyar, Anna Nagar, Tambaram, or OMR), the price, and how people should reach you.",
  },
  {
    question: "How do I post a job in Chennai?",
    answer:
      "Choose Post a job. Send the role, company, area, and how candidates should reach you. The desk publishes it on the jobs board.",
  },
  {
    question: "How long does a listing take to go live?",
    answer:
      "The desk checks the WhatsApp message before it goes live. A clear message with the area and contact is published after that check.",
  },
  {
    question: "Do I need an account to post?",
    answer:
      "No. A WhatsApp message is enough. Signed-in employers can still use the job form.",
  },
];

export const FREE_POST_HUB_STEPS = [
  {
    name: "Choose what to post",
    text: "Pick a job, event, classified ad, item for sale, home, or PG.",
  },
  {
    name: "Send a WhatsApp message",
    text: "WhatsApp opens with a starter message to the MyChennaiCity desk. Add the details and press send. There is no public form.",
  },
  {
    name: "MyChennaiCity publishes the listing",
    text: "The desk checks the message and publishes it on the matching page for Chennai. Posting is free.",
  },
] as const;

export const FREE_POST_HUB_LEDE =
  "To post for free on MyChennaiCity, send a WhatsApp message to the MyChennaiCity desk. Choose a job, event, classified, home, PG, or item for sale. WhatsApp opens with a starter message. Add the details and send. The desk checks the message and publishes it on mychennaicity.in for Chennai.";

export const FREE_POST_HUB_DESCRIPTION =
  "Post a job, classified, event, home, PG, or item for sale in Chennai for free. Send a WhatsApp message to MyChennaiCity. No public form. We check it and publish it on mychennaicity.in.";
