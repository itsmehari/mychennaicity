export type CivicToolStatus = "live" | "preview" | "data-pending";

export type CivicToolDef = {
  slug: string;
  title: string;
  description: string;
  status: CivicToolStatus;
  phase: "A" | "B" | "C";
};

export const CIVIC_TOOLS: CivicToolDef[] = [
  {
    slug: "zone-ward-finder",
    title: "Zone & Ward Finder",
    description:
      "What is my current Corporation zone and ward? Search by locality, ward, PIN, or map pin.",
    status: "live",
    phase: "A",
  },
  {
    slug: "zone-map",
    title: "15 vs 20 vs 23 Zone Map",
    description:
      "Compare operational, proposed, and historical zone boundaries with layer controls.",
    status: "live",
    phase: "A",
  },
  {
    slug: "ward-migration",
    title: "Ward Migration Lookup",
    description:
      "See how a ward may move under reorganisation — verified data only.",
    status: "live",
    phase: "A",
  },
  {
    slug: "responsibility-router",
    title: "Civic Responsibility Router",
    description:
      "Find the right authority before filing a complaint — GCC, Metro Water, police, and more.",
    status: "live",
    phase: "B",
  },
  {
    slug: "zonal-office-access",
    title: "Zonal Office Accessibility",
    description:
      "Distance, travel time, and access notes for GCC zonal offices.",
    status: "preview",
    phase: "C",
  },
  {
    slug: "zone-dashboard",
    title: "Zone Data Dashboard",
    description:
      "Zone-wise civic metrics with source, methodology, and missing-data flags.",
    status: "preview",
    phase: "C",
  },
  {
    slug: "reorg-tracker",
    title: "Reorganisation Update Tracker",
    description:
      "Government orders, gazette notices, and transition status for zone reform.",
    status: "live",
    phase: "C",
  },
  {
    slug: "civic-card",
    title: "My Chennai Civic Card",
    description:
      "Printable card with your zone, ward, offices, and emergency contacts.",
    status: "live",
    phase: "B",
  },
  {
    slug: "area-sabha",
    title: "Area Sabha Tracker",
    description:
      "Ward committee meetings, agendas, minutes, and project status.",
    status: "preview",
    phase: "C",
  },
  {
    slug: "boundary-feedback",
    title: "Boundary Feedback Map",
    description:
      "Report boundary issues — community reports do not change official data.",
    status: "live",
    phase: "C",
  },
];

export function civicToolPath(slug: string): string {
  return `/civic-tools/${slug}`;
}

export function civicToolStatusLabel(status: CivicToolStatus): string {
  switch (status) {
    case "live":
      return "Live";
    case "preview":
      return "Preview";
    case "data-pending":
      return "Data pending";
  }
}
