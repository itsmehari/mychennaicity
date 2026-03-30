/**
 * Display labels for alliance / party legend (election map sidebar).
 */

export const ALLIANCE_LABELS: Record<string, string> = {
  spa: "Secular Progressive Alliance (DMK-led)",
  nda: "NDA / AIADMK-led bloc",
  tvk: "TVK",
  ntk: "NTK",
  other: "Other / independent",
};

export const PARTY_LEGEND_ITEMS: { allianceKey: string; short: string }[] = [
  { allianceKey: "spa", short: "SPA" },
  { allianceKey: "nda", short: "NDA" },
  { allianceKey: "tvk", short: "TVK" },
  { allianceKey: "ntk", short: "NTK" },
];
