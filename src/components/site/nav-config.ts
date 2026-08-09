import { chennaiZones } from "@/lib/chennai-zones";
import { WHATSAPP_COMMUNITY_PAGE_PATH } from "@/lib/whatsapp-community";
import { TOPIC_SLUG_TO_CATEGORY } from "@/lib/news-topics";

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
  columns: MegaNavColumn[];
  featured?: MegaNavFeatured;
  /** When true, panel shows a live upcoming-events rail (Local events). */
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

/** Split zones into two balanced columns for the bento grid */
function splitAreas(): [MegaNavLink[], MegaNavLink[]] {
  const mid = Math.ceil(areaLinks.length / 2);
  return [areaLinks.slice(0, mid), areaLinks.slice(mid)];
}

const [areasColA, areasColB] = splitAreas();

export const MEGA_NAV_SECTIONS: MegaNavSection[] = [
  {
    id: "news",
    label: "News",
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
        ],
      },
      {
        heading: "Topics",
        links: topicLinks,
      },
    ],
  },
  {
    id: "explore",
    label: "Explore",
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
            description: "Reader-submitted tuition, services, and wanted posts.",
          },
          {
            href: "/chennai-gold-rate",
            label: "Chennai gold rate",
            description: "Today's 24K and 22K per gram plus jewellery calculator.",
          },
          {
            href: WHATSAPP_COMMUNITY_PAGE_PATH,
            label: "WhatsApp community",
            description: "Official my chennai city reader group.",
          },
        ],
      },
      {
        heading: "On the map",
        links: [
          {
            href: "/civic-tools",
            label: "Civic tools",
            description: "Zone & ward finder, boundary maps, complaint router, and civic card.",
          },
          {
            href: "/civic-tools/zone-ward-finder",
            label: "Zone & Ward Finder",
            description: "What is my current GCC zone and ward?",
          },
          {
            href: "/elections-2026",
            label: "Elections 2026 map",
            description: "Chennai metro+ assembly constituencies and curated candidates.",
          },
          {
            href: "/chennai-map",
            label: "Interactive map explorer",
            description: "Ward map and Corporation zone map — overlays, search, area guides.",
          },
          {
            href: "/chennai-map?view=zones",
            label: "Corporation zone map",
            description: "GCC 15-zone interactive map with ward and locality search.",
          },
        ],
      },
    ],
  },
  {
    id: "jobs",
    label: "Jobs",
    columns: [
      {
        heading: "Work",
        links: [
          {
            href: "/chennai-jobs",
            label: "Chennai jobs",
            description: "Jobs in Chennai, OMR, and nearby tech areas.",
          },
        ],
      },
    ],
  },
  {
    id: "chennai-local-events",
    label: "Local events",
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
            href: "/chennai-local-events#events-next-up",
            label: "Next up",
            description: "Soonest dates at a glance.",
          },
          {
            href: "/chennai-local-events#browse-events",
            label: "Culture & arts",
            description: "Concerts, theatre, music and comedy.",
          },
          {
            href: "/chennai-local-events#browse-events",
            label: "Workshops & meetups",
            description: "Tech talks, baking, networking circles.",
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
