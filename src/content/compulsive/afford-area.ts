import { compulsivePath } from "@/content/compulsive/index";

export const AFFORD_AREA_PATH = compulsivePath("afford-area");

export type RentBand = {
  id: string;
  label: string;
  areaSlug?: string;
  /** Monthly 2BHK-ish mid rent, illustrative 2026 */
  rentMid: number;
  rentLow: number;
  rentHigh: number;
  note: string;
};

export const AFFORD_AREA_BANDS: RentBand[] = [
  {
    id: "adyar",
    label: "Adyar",
    areaSlug: "adyar-thiruvanmiyur",
    rentLow: 35000,
    rentMid: 55000,
    rentHigh: 85000,
    note: "Premium south — older independents vs gated towers swing wide",
  },
  {
    id: "besant",
    label: "Besant Nagar / Elliot’s",
    areaSlug: "adyar-thiruvanmiyur",
    rentLow: 32000,
    rentMid: 52000,
    rentHigh: 80000,
    note: "Beach premium; parking and society rules matter",
  },
  {
    id: "velachery",
    label: "Velachery",
    areaSlug: "omr-perungudi-sholinganallur",
    rentLow: 22000,
    rentMid: 35000,
    rentHigh: 55000,
    note: "Metro + lake belt; strong mid-market density",
  },
  {
    id: "omr",
    label: "OMR / Sholinganallur",
    areaSlug: "omr-perungudi-sholinganallur",
    rentLow: 25000,
    rentMid: 40000,
    rentHigh: 65000,
    note: "IT corridor — gated communities common; check EB status",
  },
  {
    id: "anna-nagar",
    label: "Anna Nagar",
    areaSlug: "ambattur-annanagar",
    rentLow: 28000,
    rentMid: 45000,
    rentHigh: 70000,
    note: "West classic; schools and planned layout premium",
  },
  {
    id: "porur",
    label: "Porur / Arcot Road orbit",
    areaSlug: "valasaravakkam-porur",
    rentLow: 18000,
    rentMid: 28000,
    rentHigh: 45000,
    note: "Value west — hospital + Outer Ring access",
  },
  {
    id: "tambaram",
    label: "Tambaram / south suburbs",
    rentLow: 15000,
    rentMid: 24000,
    rentHigh: 38000,
    note: "Longer rail/road commute trade-off for lower rent",
  },
];

export const AFFORD_AREA_FAQ = [
  {
    q: "What rent % is “comfortable”?",
    a: "A common thumb rule is keeping rent near or under ~30% of take-home, with commute and school fees in mind. Households differ — treat the verdict as a conversation starter.",
  },
  {
    q: "CTC or take-home?",
    a: "Prefer monthly take-home. If you only know CTC, we apply a rough ~70% conversion for planning — replace it with your payslip number.",
  },
];

export function takeHomeFromCtcMonthly(ctcAnnual: number, takeHomePct: number) {
  return (ctcAnnual * (takeHomePct / 100)) / 12;
}

export function affordVerdict(rentSharePct: number): "comfortable" | "ok" | "stretch" {
  if (rentSharePct <= 28) return "comfortable";
  if (rentSharePct <= 38) return "ok";
  return "stretch";
}
