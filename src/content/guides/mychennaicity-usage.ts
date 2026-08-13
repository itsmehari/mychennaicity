/**
 * Audience-first usage guide for mychennaicity.in — content + canonical path.
 */

export const MYCHENNAICITY_USAGE_GUIDE_PATH =
  "/guides/how-to-use-mychennaicity";

export const MYCHENNAICITY_USAGE_GUIDE_LAST_UPDATED = "8 August 2026";

export type UsageFeatureLink = {
  href: string;
  label: string;
  hint: string;
};

export type UsageAudience = {
  id: string;
  title: string;
  shortLabel: string;
  intro: string;
  startHere: UsageFeatureLink[];
  tips: string[];
};

/** Primary “Explore” destinations shown on article footers and hubs. */
export const EXPLORE_MYCHENNAICITY_LINKS: UsageFeatureLink[] = [
  {
    href: "/chennai-today",
    label: "Chennai today",
    hint: "60-second morning card",
  },
  {
    href: "/chennai-whatsapp-group",
    label: "WhatsApp community",
    hint: "Moderated Chennai updates",
  },
  {
    href: "/chennai-local-news",
    label: "Chennai local news",
    hint: "Civic desk & neighbourhood stories",
  },
  {
    href: "/guides/chennai-afford-area-calculator",
    label: "Afford this area",
    hint: "Take-home vs rent check",
  },
  {
    href: "/chennai-jobs",
    label: "Jobs in Chennai",
    hint: "Open roles across the city",
  },
  {
    href: "/guides/which-chennai-are-you",
    label: "Which Chennai are you?",
    hint: "Playful neighbourhood quiz",
  },
];

export const MYCHENNAICITY_USAGE_AUDIENCES: UsageAudience[] = [
  {
    id: "residents",
    title: "Chennai residents & neighbours",
    shortLabel: "Residents",
    intro:
      "Use the site like a city desk: local news, your area hub, gold rate, and a moderated WhatsApp group for daily tips.",
    startHere: [
      {
        href: "/chennai-today",
        label: "Chennai today",
        hint: "60-second weather, gold, Metro, news",
      },
      {
        href: "/chennai-local-news",
        label: "Chennai local news",
        hint: "Civic, mobility, consumer, elections",
      },
      {
        href: "/areas",
        label: "Area hubs",
        hint: "Neighbourhood guides on the city map",
      },
      {
        href: "/chennai-gold-rate",
        label: "Gold rate",
        hint: "Daily 24K / 22K Chennai rates",
      },
      {
        href: "/chennai-whatsapp-group",
        label: "WhatsApp community",
        hint: "Official my chennai city group",
      },
    ],
    tips: [
      "Bookmark your area hub and the news topic you care about most (civic, mobility, consumer).",
      "Join WhatsApp only from mychennaicity.in — not random invites.",
      "Use Search when you need a specific Corporation, Metro, or consumer story.",
    ],
  },
  {
    id: "job-seekers",
    title: "Job seekers",
    shortLabel: "Job seekers",
    intro:
      "Browse open roles, post that you are looking for work, and keep an eye on Chennai career guides.",
    startHere: [
      {
        href: "/chennai-jobs",
        label: "Browse Chennai jobs",
        hint: "Open vacancies we list",
      },
      {
        href: "/chennai-jobs/looking-for-work",
        label: "Looking for work",
        hint: "Post your availability",
      },
      {
        href: "/guides/chennai-tech-careers",
        label: "Reading job ads",
        hint: "Plain tips for Chennai hiring",
      },
      {
        href: "/chennai-whatsapp-group",
        label: "WhatsApp community",
        hint: "Job tips with location — no spam",
      },
    ],
    tips: [
      "Prefer listings that name role, area, and contact.",
      "Share one clear “looking for work” post instead of flooding groups.",
      "Cross-check suspicious recruiters; report WhatsApp spam patterns to admins.",
    ],
  },
  {
    id: "employers",
    title: "Employers & local businesses",
    shortLabel: "Employers",
    intro:
      "Post jobs, list your business, and reach Chennai readers without cold-spamming WhatsApp groups.",
    startHere: [
      {
        href: "/contact#jobs",
        label: "Post a job",
        hint: "Reach Chennai candidates",
      },
      {
        href: "/contact#directory",
        label: "List your business",
        hint: "Directory placement",
      },
      {
        href: "/directory",
        label: "Directory",
        hint: "See how listings appear",
      },
      {
        href: "/contact",
        label: "Advertise / contact",
        hint: "Desk and sponsorship queries",
      },
    ],
    tips: [
      "Include role + locality + how to apply — vague posts get ignored.",
      "Use the official community rules: Chennai-relevant, limited promo frequency.",
      "Never buy or blast random WhatsApp invite floods — they burn trust.",
    ],
  },
  {
    id: "whatsapp-admins",
    title: "WhatsApp group owners & admins",
    shortLabel: "Group admins",
    intro:
      "Defend your RWA, jobs, alumni, or neighbourhood group from invite-link spam — and point members to trusted city pages.",
    startHere: [
      {
        href: "/chennai-whatsapp-spammers",
        label: "WhatsApp spammers list",
        hint: "Flagged numbers for admins",
      },
      {
        href: "/chennai-local-news/whatsapp-spam-report-platform-chennai-group-admins-august-2026",
        label: "Spam-report platform guide",
        hint: "Problem-first playbook for admins",
      },
      {
        href: "/chennai-whatsapp-community-guide",
        label: "Trusted groups guide",
        hint: "How to evaluate a Chennai group",
      },
      {
        href: "/contact",
        label: "Report a flood",
        hint: "Send screenshots for review",
      },
    ],
    tips: [
      "Turn on admin approval before you share an invite widely.",
      "Reject self-added clusters; rotate the invite after a flood.",
      "Share the spammers list with co-admins — private chats alone are too slow.",
    ],
  },
  {
    id: "events",
    title: "Event-goers & organisers",
    shortLabel: "Events",
    intro:
      "Find what’s on across Chennai, or submit a public event for the local calendar.",
    startHere: [
      {
        href: "/chennai-local-events",
        label: "Chennai local events",
        hint: "Hub of upcoming programmes",
      },
      {
        href: "/contact#events",
        label: "Submit an event",
        hint: "Public listings for organisers",
      },
      {
        href: "/chennai-whatsapp-group",
        label: "WhatsApp community",
        hint: "Weekend tips from readers",
      },
    ],
    tips: [
      "Check date, venue, and area before you travel across the city.",
      "Organisers: include start time in IST and a clear venue name.",
      "Festival-rich pages may include schedules and FAQs — read those first.",
    ],
  },
  {
    id: "civic",
    title: "Civic readers & map users",
    shortLabel: "Civic / map",
    intro:
      "Follow Corporation, Metro, and ward-level context with news plus interactive civic tools.",
    startHere: [
      {
        href: "/chennai-local-news/topic/chennai",
        label: "Civic & GCC news",
        hint: "Corporation and city desk",
      },
      {
        href: "/chennai-map",
        label: "Interactive map",
        hint: "Wards and zone options",
      },
      {
        href: "/civic-tools",
        label: "Civic tools",
        hint: "Zone, ward, and responsibility helpers",
      },
      {
        href: "/glossary",
        label: "Glossary",
        hint: "GCC and Chennai terms explained",
      },
    ],
    tips: [
      "Use topic shelves (mobility, consumer, elections) instead of endless scrolling.",
      "Pair a news story with the map when boundaries or zones matter.",
      "Treat official PDFs and orders as primary; our explainers are secondary.",
    ],
  },
];
