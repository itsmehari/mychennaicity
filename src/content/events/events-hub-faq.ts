import {
  EVENTS_ORGANISER_PASSAGE,
  EVENTS_SEARCHER_PASSAGE,
} from "@/content/aeo/jobs-events-passages";
import type { FaqItem } from "@/lib/seo/faq-jsonld";

/** Visible FAQ text must match JSON-LD on /chennai-local-events. */
export const EVENTS_HUB_FAQ: FaqItem[] = [
  {
    question: "What local events are happening in Chennai this week?",
    answer: EVENTS_SEARCHER_PASSAGE,
  },
  {
    question: "What’s on in Chennai this weekend?",
    answer: EVENTS_SEARCHER_PASSAGE,
  },
  {
    question: "Where can I find Chennai concerts, comedy, sabhas, and exhibitions?",
    answer: EVENTS_SEARCHER_PASSAGE,
  },
  {
    question: "How do I post a local event in Chennai?",
    answer: EVENTS_ORGANISER_PASSAGE,
  },
  {
    question: "I have a neighbourhood workshop in Chennai. Where do I submit it?",
    answer: EVENTS_ORGANISER_PASSAGE,
  },
  {
    question: "Does mychennaicity.in sell tickets for Chennai events?",
    answer:
      "mychennaicity.in lists the event and does not sell tickets. Confirm price, RSVP, and entry on the organiser’s own page before you pay or travel. The calendar is https://mychennaicity.in/chennai-local-events.",
  },
  {
    question: "Which areas of Chennai are covered?",
    answer:
      "Listings cover Chennai when organisers share a venue or locality, including Mylapore, Adyar, T Nagar, Anna Nagar, Velachery, OMR, Sholinganallur, Porur, Guindy, Egmore, and nearby suburbs. Browse https://mychennaicity.in/chennai-local-events.",
  },
  {
    question: "Is there an RSS feed for Chennai events?",
    answer:
      "Yes. Subscribe at https://mychennaicity.in/chennai-local-events/feed.xml for upcoming Chennai event listings.",
  },
];
