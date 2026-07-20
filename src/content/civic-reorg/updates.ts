import type { DataProvenance } from "@/lib/civic-geo/provenance";

export type ReorgStatusStage =
  | "announced"
  | "draft_mapped"
  | "government_approved"
  | "gazette_notified"
  | "offices_constituted"
  | "staff_appointed"
  | "digital_systems_updated"
  | "operational";

export type ReorgUpdateType =
  | "government_order"
  | "gazette"
  | "council_resolution"
  | "ward_map"
  | "zonal_office"
  | "delimitation"
  | "public_objection"
  | "election"
  | "staff_transfer"
  | "departmental_transition";

export type ReorgUpdate = {
  id: string;
  title: string;
  type: ReorgUpdateType;
  typeLabel: string;
  date: string;
  statusStage: ReorgStatusStage;
  statusLabel: string;
  summary: string;
  sourceUrl: string | null;
  provenance: DataProvenance;
};

const baseProv: DataProvenance = {
  source: "MyChennaiCity reorganisation tracker — editorial compile",
  sourceDate: "2026-03-28",
  geographyVersion: "gcc-20-proposed",
  verificationStatus: "verified",
  methodology: "Public announcements and council coverage; verify primary documents.",
  confidence: "medium",
};

export const REORG_STATUS_LABELS: Record<ReorgStatusStage, string> = {
  announced: "Announced",
  draft_mapped: "Draft mapped",
  government_approved: "Government approved",
  gazette_notified: "Gazette notified",
  offices_constituted: "Offices constituted",
  staff_appointed: "Staff appointed",
  digital_systems_updated: "Digital systems updated",
  operational: "Operational",
};

export const REORG_UPDATES: ReorgUpdate[] = [
  {
    id: "gcc-15-operational",
    title: "Current 15-zone GCC structure operational",
    type: "zonal_office",
    typeLabel: "Zonal office structure",
    date: "2026-03-28",
    statusStage: "operational",
    statusLabel: REORG_STATUS_LABELS.operational,
    summary:
      "Greater Chennai Corporation continues to administer the city through 15 operational zones (I–XV). MyChennaiCity maps and finder tools prioritise this structure.",
    sourceUrl: "https://chennaicorporation.gov.in/gcc/about-chennai/chennai-map/",
    provenance: {
      ...baseProv,
      geographyVersion: "gcc-15",
      confidence: "high",
    },
  },
  {
    id: "20-zone-proposal-tracker",
    title: "20-zone reorganisation proposal — monitoring",
    type: "delimitation",
    typeLabel: "Delimitation notice",
    date: "2026-03-28",
    statusStage: "announced",
    statusLabel: REORG_STATUS_LABELS.announced,
    summary:
      "Proposed expansion to 20 zones is tracked here. Ward-level assignments on MyChennaiCity appear only after verified government or gazette sources — not from media map screenshots.",
    sourceUrl: null,
    provenance: baseProv,
  },
];
