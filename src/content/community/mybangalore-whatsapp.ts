/**
 * Chennai-to-Bengaluru discovery page for the MyBangalore WhatsApp community.
 * The Chennai city-group invite stays gated. This invite is a different city
 * community the operator asked to publish on this one page.
 */

export const MYBANGALORE_COMMUNITY_PATH =
  "/community/mybangalore-whatsapp-community-group";

export const MYBANGALORE_COVAI_PAGE_URL =
  "https://mycovai.in/community/mybangalore-whatsapp-community-group/";

export const MYBANGALORE_SITE_URL = "https://mybanglore.in";

export const MYBANGALORE_WHATSAPP_INVITE_URL =
  "https://chat.whatsapp.com/BkQWXmIcUIh8HAVZJwlib8";

export const MYBANGALORE_COMMUNITY_UPDATED = "4 November 2026";

export const MYBANGALORE_COMMUNITY_TITLE =
  "Bengaluru WhatsApp community and WhatsApp group for Chennai readers";

export const MYBANGALORE_COMMUNITY_DESCRIPTION =
  "Join the MyBangalore.in WhatsApp community — the Bengaluru WhatsApp group for city news, Namma Metro and traffic, jobs, events, and local services. Written for Chennai readers. Independent. Not a BBMP or BMRCL channel.";

export const MYBANGALORE_DIRECT_ANSWER =
  "The MyBangalore.in WhatsApp community is one Bengaluru WhatsApp group for city news, Namma Metro and traffic notes, jobs, events, and local services. Chennai readers use this page to see what the WhatsApp community group covers and to join with the operator's invite. It is an independent community, not an official BBMP, BMRCL, or Karnataka government channel. The city website at mybanglore.in is still being published.";

export const MYBANGALORE_GEO_META = {
  "geo.region": "IN-KA",
  "geo.placename": "Bengaluru",
  "geo.position": "12.9716;77.5946",
  ICBM: "12.9716, 77.5946",
} as const;

export const MYBANGALORE_TOPICS = [
  "Bengaluru news and civic notes",
  "Traffic, Namma Metro, and other transport",
  "Jobs, internships, and career posts",
  "Local events and activities",
  "Business information and everyday services",
  "Rentals, PGs, and property posts members share",
  "Education and public announcements",
  "Startups, technology, and city projects",
  "Weather, environment, and public-safety notes",
] as const;

export const MYBANGALORE_AREAS = [
  "Whitefield",
  "Electronic City",
  "Koramangala",
  "Jayanagar",
  "Yelahanka",
  "Hebbal",
] as const;

export const MYBANGALORE_FAQ = [
  {
    question: "Is the Bengaluru WhatsApp community the same as the WhatsApp group?",
    answer:
      "Yes. There is one MyBangalore.in WhatsApp group. WhatsApp community and WhatsApp group are two names for that same chat.",
  },
  {
    question: "Is this the Chennai WhatsApp group?",
    answer:
      "No. mychennaicity.in runs a separate Chennai WhatsApp group. Join that one from /whatsapp-community/join. This page is only for the Bengaluru WhatsApp community.",
  },
  {
    question: "Who runs the Bengaluru WhatsApp group?",
    answer:
      "It is an independent community information initiative under the MyBangalore.in name, from the same family of city desks as mychennaicity.in and mycovai.in. It is not the Bruhat Bengaluru Mahanagara Palike, BMRCL, BMTC, or the Karnataka government.",
  },
  {
    question: "What will I receive if I join the WhatsApp community?",
    answer:
      "Member posts and admin shares in the WhatsApp group about Bengaluru news, traffic and Metro, jobs, events, local services, rentals, education notices, and city developments. Volume depends on what members share. Treat job leads and civic alerts as leads to verify, not as official orders.",
  },
  {
    question: "Do I have to join before reading Chennai pages?",
    answer:
      "No. News, jobs, and events on mychennaicity.in stay open. Joining this Bengaluru WhatsApp group is optional.",
  },
  {
    question: "Where is the city website?",
    answer:
      "The intended public site is https://mybanglore.in. As of 4 November 2026 that website is still being published, so the working way to join today is the WhatsApp invite on this page.",
  },
  {
    question: "Can someone add my number for me?",
    answer:
      "No. Join only if you want the group. Do not forward other people's numbers for bulk adding.",
  },
] as const;

export function buildMybangaloreCommunityMarkdown(origin: string): string {
  const base = origin.replace(/\/$/, "");
  const page = `${base}${MYBANGALORE_COMMUNITY_PATH}`;
  const topics = MYBANGALORE_TOPICS.map((topic) => `- ${topic}`).join("\n");
  const faqs = MYBANGALORE_FAQ.map(
    (item) => `### ${item.question}\n\n${item.answer}`,
  ).join("\n\n");

  return `# ${MYBANGALORE_COMMUNITY_TITLE}

- Canonical: ${page}
- Updated: ${MYBANGALORE_COMMUNITY_UPDATED}
- City website: ${MYBANGALORE_SITE_URL}
- Join: ${MYBANGALORE_WHATSAPP_INVITE_URL}
- Audience: Chennai readers who live in, work in, visit, or have family in Bengaluru
- Publisher: mychennaicity.in

${MYBANGALORE_DIRECT_ANSWER}

## What the WhatsApp community group is for

${topics}

Neighbourhoods named on the page: ${MYBANGALORE_AREAS.join(", ")}, and the rest of Bengaluru.

## How to join

Open ${MYBANGALORE_WHATSAPP_INVITE_URL} and request to join. Membership is voluntary. This page does not collect phone numbers.

The Chennai group is separate: ${base}/whatsapp-community/join

A Coimbatore reader's version of this introduction is at ${MYBANGALORE_COVAI_PAGE_URL}

## FAQ

${faqs}

## Disclaimer

This is an independent community introduction, not official BBMP, BMRCL, BMTC, or Karnataka government copy. Confirm traffic, jobs, rents, and civic notices before acting.

Fine print: drafted with AI assistance and reviewed for this page. The invite was supplied by the community operator on ${MYBANGALORE_COMMUNITY_UPDATED}. The website ${MYBANGALORE_SITE_URL} was not yet published on that date.
`;
}
