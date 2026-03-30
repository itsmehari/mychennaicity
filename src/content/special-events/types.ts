export type FestivalScheduleItem = {
  time?: string;
  text: string;
};

export type FestivalScheduleDay = {
  /** ISO date yyyy-mm-dd for anchors and “today” logic */
  isoDate: string;
  /** Display heading, e.g. "Sunday 22 March 2026" */
  label: string;
  items: FestivalScheduleItem[];
};

export type FestivalGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

export type OfficialPdfSpec = {
  url: string;
  label: string;
  subtitle?: string;
};

export type FestivalSeoSpec = {
  metaTitle: string;
  metaDescription: string;
  /** Absolute URL for og:image */
  ogImageUrl: string;
};

export type FestivalFaqItem = {
  question: string;
  answer: string;
};

export type FestivalRichContent = {
  /** Plain text paragraphs for AEO answer-first block (no HTML). */
  answerFirstParagraphs: string[];
  officialPdf: OfficialPdfSpec;
  gallery: FestivalGalleryItem[];
  scheduleDays: FestivalScheduleDay[];
  /** Shown after main schedule (e.g. Vidaiyatri) */
  scheduleExtra?: { title: string; paragraphs: string[] };
  practicalTips: string[];
  faq: FestivalFaqItem[];
  seo: FestivalSeoSpec;
  placeGeo: { lat: number; lng: number };
  /** Optional JSON-LD organizer name */
  organizerName?: string;
  mapsUrl?: string;
};
