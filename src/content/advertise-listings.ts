/**
 * Paid property package. Leave null until the fee and duration are decided.
 * Pitch pages read this module so English and Tamil cannot diverge.
 */
export const propertyAdPackage: {
  feeInr: number | null;
  durationDays: number | null;
} = {
  feeInr: null,
  durationDays: null,
};

export type ListingPitchSample = {
  href: string;
  title: string;
  meta: string;
};

export function propertyPackageSentence(locale: "en" | "ta"): string {
  const { feeInr, durationDays } = propertyAdPackage;
  if (feeInr != null && durationDays != null) {
    const fee = feeInr.toLocaleString("en-IN");
    return locale === "ta"
      ? `₹${fee}, ${durationDays} நாட்கள். இந்தப் பக்கமே விளம்பரத்தை வெளியிடாது.`
      : `₹${fee} for ${durationDays} days. This page does not publish the ad.`;
  }
  return locale === "ta"
    ? "கட்டணமும் விளம்பரம் எத்தனை நாள் இருக்கும் என்பதும் WhatsApp-ல் உறுதி செய்யப்படும். இந்தப் பக்கம் விளம்பரத்தை வெளியிடாது."
    : "The fee and how many days the ad stays up are confirmed on WhatsApp before you pay. This page does not publish the ad.";
}
