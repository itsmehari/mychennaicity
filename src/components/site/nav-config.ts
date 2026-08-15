import { chennaiZones } from "@/lib/chennai-zones";
import {
  WHATSAPP_ADMINS_TOOLKIT_PATH,
  WHATSAPP_COMMUNITY_PAGE_PATH,
} from "@/lib/whatsapp-community";
import { TOPIC_SLUG_TO_CATEGORY } from "@/lib/news-topics";
import type { MegaNavLiveKind } from "@/lib/nav/nav-preview-types";
import { CHENNAI_FESTIVALS_GUIDE_PATH } from "@/content/guides/chennai-festivals-calendar";
import { CHENNAI_SALARY_GUIDE_PATH } from "@/content/guides/chennai-salary-guide-2026";
import { CHENNAI_EV_GUIDE_PATH } from "@/content/guides/chennai-ev-charging";
import { compulsivePath } from "@/content/compulsive/index";
import {
  CHENNAI_TOURISM_HUB_PATH,
  ECR_WEEKEND_PLAN_PATH,
} from "@/content/tourism";

export type MegaNavLink = {
  href: string;
  label: string;
  description?: string;
};

export type MegaNavColumn = {
  heading: string;
  links: MegaNavLink[];
};

export type MegaNavFeatured = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

export type MegaNavSection = {
  id: string;
  label: string;
  /** Compact header label when the full name would wrap the bar. */
  shortLabel?: string;
  columns: MegaNavColumn[];
  featured?: MegaNavFeatured;
  /** Live rail kind — fetches `/api/nav/preview`. */
  livePreview?: MegaNavLiveKind;
  /** @deprecated use livePreview: "events" */
  liveEventsPreview?: boolean;
};

const topicLinks: MegaNavLink[] = Object.entries(TOPIC_SLUG_TO_CATEGORY).map(
  ([slug, category]) => ({
    href: `/chennai-local-news/topic/${slug}`,
    label: category,
    description: `Stories filed under ${category}`,
  }),
);

const areaLinks: MegaNavLink[] = chennaiZones.map((z) => ({
  href: `/areas/${z.slug}`,
  label: z.label,
  description: z.blurb,
}));

function splitAreas(): [MegaNavLink[], MegaNavLink[]] {
  const mid = Math.ceil(areaLinks.length / 2);
  return [areaLinks.slice(0, mid), areaLinks.slice(mid)];
}

const [areasColA, areasColB] = splitAreas();

export const MEGA_NAV_SECTIONS: MegaNavSection[] = [
  {
    id: "news",
    label: "News",
    livePreview: "news",
    featured: {
      title: "Chennai newsroom",
      description:
        "GCC beats, mobility, elections, and neighbourhood explainers — updated on a living hub.",
      href: "/chennai-local-news",
      cta: "Open latest",
    },
    columns: [
      {
        heading: "Hub",
        links: [
          {
            href: "/chennai-local-news",
            label: "All local news",
            description: "Reverse-chronological feed and signals.",
          },
          {
            href: "/chennai-local-news/feed.xml",
            label: "RSS feed",
            description: "Subscribe in your reader.",
          },
          {
            href: "/news",
            label: "News index",
            description: "Alternate entry to coverage.",
          },
          {
            href: "/contact",
            label: "Send a tip",
            description: "Civic leads and corrections welcome.",
          },
        ],
      },
      {
        heading: "Topics",
        links: topicLinks.slice(0, 8),
      },
    ],
  },
  {
    id: "explore",
    label: "Explore",
    livePreview: "explore",
    featured: {
      title: "Discover Chennai",
      description:
        "Directory, classifieds, gold rate, WhatsApp community, and civic maps — everyday city tools.",
      href: "/directory",
      cta: "Open directory",
    },
    columns: [
      {
        heading: "Directory",
        links: [
          {
            href: "/directory",
            label: "City directory",
            description: "Schools, services, and local listings.",
          },
          {
            href: "/chennai-classifieds",
            label: "Chennai classifieds",
            description: "Tuition, services, and wanted posts.",
          },
          {
            href: "/chennai-gold-rate",
            label: "Chennai gold rate",
            description: "Today's 24K and 22K plus calculator.",
          },
          {
            href: WHATSAPP_COMMUNITY_PAGE_PATH,
            label: "WhatsApp community",
            description: "Official my chennai city reader group.",
          },
          {
            href: WHATSAPP_ADMINS_TOOLKIT_PATH,
            label: "WhatsApp admin toolkit",
            description: "Spam controls and neighbourhood group tips.",
          },
          {
            href: CHENNAI_EV_GUIDE_PATH,
            label: "EV charging guide",
            description: "Public chargers + home wallbox checklist.",
          },
          {
            href: compulsivePath("chennai-today"),
            label: "Chennai today (60s)",
            description: "Morning WhatsApp card — weather, Metro, news, event.",
          },
          {
            href: compulsivePath("which-chennai"),
            label: "Which Chennai are you?",
            description: "Playful neighbourhood personality quiz.",
          },
          {
            href: compulsivePath("filter-coffee"),
            label: "Filter coffee map",
            description: "Curated cups by corridor.",
          },
          {
            href: CHENNAI_TOURISM_HUB_PATH,
            label: "Chennai tourism",
            description: "ECR weekend loops and Mamallapuram stops.",
          },
        ],
      },
      {
        heading: "On the map",
        links: [
          {
            href: "/civic-tools",
            label: "Civic tools",
            description: "Zone & ward finder, maps, complaint router.",
          },
          {
            href: "/civic-tools/zone-ward-finder",
            label: "Zone & Ward Finder",
            description: "What is my current GCC zone and ward?",
          },
          {
            href: "/elections-2026",
            label: "Elections 2026 map",
            description: "Assembly seats and curated candidates.",
          },
          {
            href: "/chennai-map",
            label: "Interactive map",
            description: "Ward and Corporation zone explorer.",
          },
        ],
      },
    ],
  },
  {
    id: "jobs",
    label: "Jobs",
    livePreview: "jobs",
    featured: {
      title: "Jobs in Chennai",
      description:
        "Open roles and looking-for-work notices — browse free; apply only on the employer’s own page.",
      href: "/chennai-jobs",
      cta: "Open jobs hub",
    },
    columns: [
      {
        heading: "Work",
        links: [
          {
            href: "/chennai-jobs",
            label: "Open jobs",
            description: "Curated Chennai openings and walk-ins.",
          },
          {
            href: "/chennai-jobs/looking-for-work",
            label: "Looking for work",
            description: "Candidate notices for hiring managers.",
          },
          {
            href: "/contact#jobs",
            label: "Post a job",
            description: "Free qualifying local listings.",
          },
          {
            href: "/chennai-jobs/feed.xml",
            label: "Jobs RSS",
            description: "Subscribe for new openings.",
          },
        ],
      },
      {
        heading: "Guides",
        links: [
          {
            href: "/guides/chennai-tech-careers",
            label: "How to read job ads",
            description: "Spot fee traps and vague roles.",
          },
          {
            href: CHENNAI_SALARY_GUIDE_PATH,
            label: "Salary guide 2026",
            description: "Directional CTC bands by role and corridor.",
          },
          {
            href: compulsivePath("afford-area"),
            label: "Afford this area",
            description: "CTC / take-home vs rent reality check.",
          },
          {
            href: "/guides/how-to-use-mychennaicity",
            label: "For job seekers",
            description: "How to use the board safely.",
          },
        ],
      },
    ],
  },
  {
    id: "chennai-local-events",
    label: "Local events",
    shortLabel: "Events",
    livePreview: "events",
    liveEventsPreview: true,
    featured: {
      title: "What's on in Chennai",
      description:
        "Concerts, Meetup workshops, comedy, temple dates and neighbourhood gatherings — free to browse; tickets stay with organisers.",
      href: "/chennai-local-events",
      cta: "Open events hub",
    },
    columns: [
      {
        heading: "Browse",
        links: [
          {
            href: "/chennai-local-events#browse-events",
            label: "All upcoming events",
            description: "Full calendar with filters and posters.",
          },
          {
            href: "/chennai-local-events#events-today",
            label: "Today",
            description: "Events starting today (IST).",
          },
          {
            href: "/chennai-local-events#events-weekend",
            label: "This weekend",
            description: "Saturday–Sunday listings.",
          },
          {
            href: "/chennai-local-events#events-next-up",
            label: "Next up",
            description: "Soonest dates at a glance.",
          },
          {
            href: CHENNAI_FESTIVALS_GUIDE_PATH,
            label: "Festivals calendar",
            description: "Pongal to Margazhi — year-round seasons.",
          },
          {
            href: ECR_WEEKEND_PLAN_PATH,
            label: "This weekend ECR plan",
            description: "TTDC coastal loop — kites, temple, biryani.",
          },
        ],
      },
      {
        heading: "Plan & share",
        links: [
          {
            href: "/chennai-local-events#events-hub-faq",
            label: "Events FAQ",
            description: "Tickets, areas covered, how to submit.",
          },
          {
            href: "/chennai-local-events/feed.xml",
            label: "Events RSS",
            description: "Subscribe for upcoming listings.",
          },
          {
            href: "/contact#events",
            label: "Submit an event",
            description: "Send date, venue and booking link.",
          },
          {
            href: "/guides/how-to-use-mychennaicity",
            label: "How to use this site",
            description: "Guides for residents and organisers.",
          },
        ],
      },
    ],
  },
  {
    id: "areas",
    label: "Areas",
    livePreview: "areas",
    featured: {
      title: "Chennai by neighbourhood",
      description:
        "Macro area guides linked to the city map — north coastal belt to OMR and Porur.",
      href: "/chennai-map",
      cta: "Open map",
    },
    columns: [
      {
        heading: "North & central",
        links: areasColA,
      },
      {
        heading: "South & west",
        links: areasColB,
      },
    ],
  },
];

export function getMegaNavSection(
  id: string | null,
): MegaNavSection | undefined {
  if (!id) return undefined;
  return MEGA_NAV_SECTIONS.find((s) => s.id === id);
}

export function resolveLivePreviewKind(
  section: MegaNavSection,
): MegaNavLiveKind | null {
  if (section.livePreview) return section.livePreview;
  if (section.liveEventsPreview) return "events";
  return null;
}
