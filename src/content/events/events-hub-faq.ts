import type { FaqItem } from "@/lib/seo/faq-jsonld";

/** Visible FAQ text must match JSON-LD on /chennai-local-events. */
export const EVENTS_HUB_FAQ: FaqItem[] = [
  {
    question: "Where can I find Chennai events this week?",
    answer:
      "mychennaicity.in/chennai-local-events lists upcoming concerts, stand-up comedy, exhibitions, and meetups across Greater Chennai — from Mylapore and T Nagar to OMR, Porur, and Egmore. Use Browse listings for filters, or read the Next up and plain-list sections for a quick scan. Open any event for venue, time, and booking links.",
  },
  {
    question: "How do I find concerts and comedy nights in Chennai?",
    answer:
      "On the Chennai local events hub, choose the Culture & arts filter to surface concerts, comedy, theatre and music listings. Each card links to a detail page with venue and organiser notes — confirm tickets on the organiser or aggregator page before you pay.",
  },
  {
    question: "Are Chennai event listings on mychennaicity.in free to browse?",
    answer:
      "Yes. Browsing the calendar and event detail pages is free. Ticket prices and registration are set by each organiser — always confirm on their booking page before you pay.",
  },
  {
    question: "How do I post my event on mychennaicity.in?",
    answer:
      "Use the contact page to suggest a listing. We publish Chennai-relevant events with venue, date, and organiser details. Submission is free for qualifying local events.",
  },
  {
    question: "Do you sell tickets for Chennai events?",
    answer:
      "No. We link to organiser or aggregator booking pages (for example BookMyShow or Ticket9) when provided. We are not the ticket seller.",
  },
  {
    question: "Which areas of Chennai are covered?",
    answer:
      "Listings cover Greater Chennai including Mylapore, Adyar, T Nagar, Anna Nagar, Velachery, OMR, Sholinganallur, Porur, Guindy, Egmore, Nungambakkam, Kodambakkam, Royapettah, Alwarpet, and nearby suburbs.",
  },
  {
    question: "Is there an RSS feed for Chennai events?",
    answer:
      "Yes. Subscribe at mychennaicity.in/chennai-local-events/feed.xml for upcoming Chennai event listings.",
  },
];
