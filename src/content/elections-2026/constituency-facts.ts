/**
 * Administrative facts per AC (reservation, district). Cross-check official rolls before legal use.
 */

export type ReservationKind = "General" | "SC" | "ST" | "UNKNOWN";

export type ConstituencyFactRow = {
  reservation: ReservationKind;
  districtName: string;
  sourceUrl?: string;
  asOf?: string;
  notes?: string;
};

export const CONSTITUENCY_FACTS_BY_AC: Partial<
  Record<number, ConstituencyFactRow>
> = {
  11: {
    reservation: "General",
    districtName: "Chennai",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
  },
  12: {
    reservation: "General",
    districtName: "Chennai",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
  },
  13: {
    reservation: "General",
    districtName: "Chennai",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
  },
  14: {
    reservation: "General",
    districtName: "Chennai",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
  },
  15: {
    reservation: "SC",
    districtName: "Chennai",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
    notes: "Listed as Thiru-Vi-Ka Nagar (SC) on district listing.",
  },
  16: {
    reservation: "SC",
    districtName: "Chennai",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
    notes: "Listed as Egmore (SC) on district listing.",
  },
  17: {
    reservation: "General",
    districtName: "Chennai",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
  },
  18: {
    reservation: "General",
    districtName: "Chennai",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
  },
  19: {
    reservation: "General",
    districtName: "Chennai",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
  },
  20: {
    reservation: "General",
    districtName: "Chennai",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
  },
  21: {
    reservation: "General",
    districtName: "Chennai",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
  },
  22: {
    reservation: "General",
    districtName: "Chennai",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
    notes: "Official spelling may appear as Virugampakkam on district sites.",
  },
  23: {
    reservation: "General",
    districtName: "Chennai",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
  },
  24: {
    reservation: "General",
    districtName: "Chennai",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
    notes: "Official spelling: Thiyagarayanagar.",
  },
  25: {
    reservation: "General",
    districtName: "Chennai",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
  },
  26: {
    reservation: "General",
    districtName: "Chennai",
    sourceUrl: "https://chennai.nic.in/elected-representatives-er/",
    asOf: "2026-03-26",
  },
  27: {
    reservation: "UNKNOWN",
    districtName: "Chengalpattu",
    sourceUrl: "https://chengalpattu.nic.in/departments/election/",
    asOf: "2026-03-29",
    notes: "Reservation not explicit on linked page; verify on ECI roll.",
  },
  28: {
    reservation: "General",
    districtName: "Kancheepuram",
    sourceUrl:
      "https://kancheepuram.nic.in/departments/new-election/list-of-mlas-tn-legislative-assembly/",
    asOf: "2026-03-28",
  },
  29: {
    reservation: "SC",
    districtName: "Kancheepuram",
    sourceUrl:
      "https://kancheepuram.nic.in/departments/new-election/list-of-mlas-tn-legislative-assembly/",
    asOf: "2026-03-28",
    notes: "Listed as Sriperumbudur (SC).",
  },
  30: {
    reservation: "UNKNOWN",
    districtName: "Chengalpattu",
    sourceUrl: "https://chengalpattu.nic.in/departments/election/",
    asOf: "2026-03-29",
    notes: "Reservation not explicit on linked page; verify on ECI roll.",
  },
  31: {
    reservation: "UNKNOWN",
    districtName: "Chengalpattu",
    sourceUrl: "https://chengalpattu.nic.in/departments/election/",
    asOf: "2026-03-29",
    notes: "Reservation not explicit on linked page; verify on ECI roll.",
  },
  32: {
    reservation: "UNKNOWN",
    districtName: "Chengalpattu",
    sourceUrl: "https://chengalpattu.nic.in/departments/election/",
    asOf: "2026-03-29",
    notes: "Reservation not explicit on linked page; verify on ECI roll.",
  },
};
