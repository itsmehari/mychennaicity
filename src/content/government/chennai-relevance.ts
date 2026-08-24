import type { MinisterRow } from "@/content/government/ministers-may-2026";
import { ministerPath } from "@/content/government/paths";

export type ChennaiConcernRow = {
  concern: string;
  concernTa: string;
  ministerSlug: string;
  why: string;
  whyTa: string;
  civicToolHref?: string;
  civicToolLabel?: string;
};

export const CHENNAI_CONCERNS: ChennaiConcernRow[] = [
  {
    concern: "GCC / urban water / municipal admin",
    concernTa: "GCC / நகர்ப்புற குடிநீர் / நகராட்சி",
    ministerSlug: "c-joseph-vijay",
    why: "Municipal Administration, Urban and Water Supply with the Chief Minister.",
    whyTa: "நகராட்சி நிர்வாகம், நகர்ப்புறம் மற்றும் குடிநீர் — முதலமைச்சர்.",
    civicToolHref: "/civic-tools/metro-water-schedule",
    civicToolLabel: "Metro Water schedule desk",
  },
  {
    concern: "CMDA / housing / TNUHDB",
    concernTa: "CMDA / வீட்டுவசதி / TNUHDB",
    ministerSlug: "b-rajkumar",
    why: "Housing, CMDA, Tamil Nadu Urban Habitat Development Board.",
    whyTa: "வீட்டுவசதி, CMDA, TNUHDB.",
  },
  {
    concern: "Roads / highways / PWD",
    concernTa: "சாலைகள் / நெடுஞ்சாலை / PWD",
    ministerSlug: "aadhav-arjuna",
    why: "Public Works — buildings, highways, minor ports.",
    whyTa: "பொதுப்பணி — கட்டிடங்கள், நெடுஞ்சாலைகள்.",
  },
  {
    concern: "Floods / irrigation / WRD",
    concernTa: "வெள்ளம் / பாசனம் / WRD",
    ministerSlug: "n-anand",
    why: "Rural Development and Water Resources — irrigation and flood-season WRD work.",
    whyTa: "ஊரக வளர்ச்சி & நீர் வளங்கள் — பாசனம், வெள்ளம்.",
    civicToolHref: "/civic-tools/flood-street-score",
    civicToolLabel: "Flood street-score desk",
  },
  {
    concern: "Power cuts / TANGEDCO",
    concernTa: "மின்தடை / TANGEDCO",
    ministerSlug: "ctr-nirmal-kumar",
    why: "Electricity & Non-Conventional Energy Development.",
    whyTa: "மின்சாரம் & புதிய ஆற்றல்.",
    civicToolHref: "/civic-tools/power-feeder-desk",
    civicToolLabel: "Power feeder desk",
  },
  {
    concern: "MTC / buses / transport",
    concernTa: "MTC / பேருந்து / போக்குவரத்து",
    ministerSlug: "a-vijay-tamilan-parthiban",
    why: "Transport and nationalised transport.",
    whyTa: "போக்குவரத்து, தேசியமயமாக்கப்பட்ட போக்குவரத்து.",
  },
  {
    concern: "Air quality / TNPCB / pollution",
    concernTa: "காற்று தரம் / TNPCB",
    ministerSlug: "vk-rajeev",
    why: "Environment, Pollution Control Board, Climate Change.",
    whyTa: "சுற்றுச்சூழல், TNPCB, climate change.",
  },
  {
    concern: "Ration shops / PDS / price control",
    concernTa: "பDS / ration / விலைக் கட்டுப்பாடு",
    ministerSlug: "p-venkataramanan",
    why: "Food and Civil Supplies, Consumer Protection and Price Control.",
    whyTa: "உணவு, நுகர்வோர் பாதுகாப்பு, விலைக் கட்டுப்பாடு.",
  },
  {
    concern: "Government schools",
    concernTa: "அரசுப் பள்ளிகள்",
    ministerSlug: "rajmohan",
    why: "School Education portfolio.",
    whyTa: "பள்ளிக் கல்வி.",
  },
  {
    concern: "State budget / finance",
    concernTa: "மாநில பட்ஜெட் / நிதி",
    ministerSlug: "n-marie-wilson",
    why: "Finance, Pensions and Pensionary Benefits, Planning & Development.",
    whyTa: "நிதி, pension, planning & development.",
  },
];

export function chennaiConcernForMinister(slug: string): ChennaiConcernRow[] {
  return CHENNAI_CONCERNS.filter((c) => c.ministerSlug === slug);
}

export function ministerLink(slug: string, locale: "en" | "ta" = "en") {
  return ministerPath(slug, locale);
}

export type { MinisterRow };
