export type GeographyVersion =
  | "gcc-15"
  | "gcc-20-proposed"
  | "gcc-23-2022"
  | string;

export type VerificationStatus =
  | "official"
  | "verified"
  | "reported"
  | "estimated"
  | "missing";

export type ConfidenceLevel = "high" | "medium" | "low" | "none";

export type DataProvenance = {
  source: string;
  sourceDate: string;
  geographyVersion: GeographyVersion;
  verificationStatus: VerificationStatus;
  methodology: string;
  confidence: ConfidenceLevel;
};

const MEDIA_ONLY_RE = /visual media map only/i;

/** Whether a fact may be shown as authoritative in civic tools. */
export function isPublishableProvenance(p: DataProvenance): boolean {
  if (p.verificationStatus === "missing") return false;
  if (p.verificationStatus === "reported" || p.verificationStatus === "estimated") {
    return false;
  }
  if (MEDIA_ONLY_RE.test(p.methodology)) return false;
  return p.verificationStatus === "official" || p.verificationStatus === "verified";
}

export function provenanceLabel(status: VerificationStatus): string {
  switch (status) {
    case "official":
      return "Official";
    case "verified":
      return "Verified";
    case "reported":
      return "Reported";
    case "estimated":
      return "Estimated";
    case "missing":
      return "Missing";
    default:
      return status;
  }
}

export const DATAMEET_WARDS_PROVENANCE: DataProvenance = {
  source: "Datameet Municipal_Spatial_Data / Chennai / Wards.geojson",
  sourceDate: "2026-03-28",
  geographyVersion: "gcc-15",
  verificationStatus: "verified",
  methodology:
    "Community GCC ward boundaries aligned to operational 15-zone grouping in zone-meta.ts.",
  confidence: "high",
};
