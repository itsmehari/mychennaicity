import { compulsivePath } from "@/content/compulsive/index";

export const PETROL_VS_EV_PATH = compulsivePath("petrol-vs-ev");

/** Editable defaults — illustrative Chennai 2026 planning figures. */
export const PETROL_VS_EV_DEFAULTS = {
  kmPerDay: 40,
  petrolInrPerLitre: 102,
  petrolKmPerLitre: 15,
  evKwhPer100Km: 15,
  evInrPerKwh: 18,
};

export const PETROL_VS_EV_FAQ = [
  {
    q: "Is public DC charging always cheaper than petrol?",
    a: "Often yes on a ₹/km basis for efficient EVs, but app tariffs, idle fees, and home vs public rates change the math. Edit the fields to match your apps.",
  },
  {
    q: "Does this include battery degradation or insurance?",
    a: "No — energy cost of the day/month only. Ownership TCO is wider.",
  },
];
