import type { FaqItem } from "@/lib/seo/faq-jsonld";
import {
  CLASSIFIEDS_BROWSE_PASSAGE,
  CLASSIFIEDS_POSTER_PASSAGE,
  CLASSIFIEDS_POSTER_PASSAGE_TA,
} from "@/content/aeo/classifieds-passages";

export const POST_CLASSIFIED_AD_CHENNAI_PATH =
  "/guides/post-classified-ad-chennai";
export const POST_CLASSIFIED_AD_CHENNAI_TAMIL_PATH =
  "/guides/post-classified-ad-chennai-tamil";

export const POST_CLASSIFIED_AD_GUIDE_UPDATED = "22 November 2026";

/** Target queries: post classified ad Chennai, free local classifieds, Tamil Nadu. */
export const POST_CLASSIFIED_AD_CHENNAI_KEYWORDS = [
  "post classified ad in Chennai",
  "Chennai classified ads",
  "free classified ads Chennai",
  "local classifieds Chennai",
  "post wanted ad Chennai",
  "Chennai local classifieds",
  "sell in Chennai classifieds",
] as const;

export const POST_CLASSIFIED_AD_CHENNAI_FAQ_EN: FaqItem[] = [
  {
    question: "How do I post a classified ad in Chennai on mychennaicity.in?",
    answer: CLASSIFIEDS_POSTER_PASSAGE,
  },
  {
    question: "Are Chennai classified ads on mychennaicity.in free?",
    answer:
      "Reader wanted posts, services, tuition, flatmates, and general neighbourhood listings are free when they qualify. Send them from https://mychennaicity.in/post-a-classified-in-chennai. A home uses https://mychennaicity.in/list-a-home-in-chennai. A named employer uses https://mychennaicity.in/post-a-job-in-chennai.",
  },
  {
    question: "What categories can I post under?",
    answer:
      "Open categories include services, wanted, tuition, flatmates and roommates, vehicles, partnership, and property. Pick the closest fit when you message the desk. Employer hiring with a company name usually belongs on the jobs board, not classifieds.",
  },
  {
    question: "How is this different from OLX, Quikr, or Locanto?",
    answer:
      "National apps optimise for volume across India. mychennaicity.in is a Chennai-first local desk: each ad gets a stable public URL on mychennaicity.in, sits beside Chennai news and jobs, and is checked before it goes live. You contact the advertiser directly; we do not run payments or chat escrow.",
  },
  {
    question: "Where do readers find my ad?",
    answer: CLASSIFIEDS_BROWSE_PASSAGE,
  },
  {
    question: "Can I post in Tamil?",
    answer:
      "Yes. Send Tamil copy and we can publish Tamil body text with an English title for search. The posting steps are on /post-a-classified-in-chennai. Tamil notes: /guides/post-classified-ad-chennai-tamil.",
  },
];

export const POST_CLASSIFIED_AD_CHENNAI_FAQ_TA: FaqItem[] = [
  {
    question:
      "mychennaicity.in-ல் சென்னை விளம்பரத்தை எப்படி போடுவது?",
    answer: CLASSIFIEDS_POSTER_PASSAGE_TA,
  },
  {
    question: "சென்னை விளம்பரங்கள் இலவசமா?",
    answer:
      "தகுதியான தேவை, சேவை, பயிற்சி, அறைத் தேவை பதிவுகள் இலவசம். வீடு: /list-a-home-in-chennai. வேலை: /post-a-job-in-chennai.",
  },
  {
    question: "என் விளம்பரம் எங்கே தெரியும்?",
    answer: CLASSIFIEDS_BROWSE_PASSAGE,
  },
];

export const POST_CLASSIFIED_AD_WORKFLOW_EN = [
  {
    step: "1",
    title: "Send the note",
    body: "WhatsApp the title, area (for example Velachery or T. Nagar), category, phone number, and photos if you have them. There is no public form.",
  },
  {
    step: "2",
    title: "Desk check",
    body: "We confirm spelling, category, and that contact details are yours to publish.",
  },
  {
    step: "3",
    title: "Live URL",
    body: "You receive a link on mychennaicity.in/chennai-classifieds/[slug] to share on WhatsApp groups.",
  },
] as const;