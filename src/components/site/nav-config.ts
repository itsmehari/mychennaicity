import { chennaiZones } from "@/lib/chennai-zones";
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
        ],
      },
      {
        heading: "On the map",
        links: [
          {
            href: "/#areas",
            label: "Area explorer",
            description: "Jump to the bento map on the home page.",
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
    columns: [
      {
        heading: "Happening",
        links: [
          {
            href: "/chennai-local-events",
            label: "Chennai local events",
            description: "Temple festivals, meetups, culture, and civic dates.",
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
