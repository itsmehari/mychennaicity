import { Fraunces } from "next/font/google";

/** Italic offer line. Imported only by the photo slide, so pages without a photo banner skip it. */
export const partnerAdOfferFont = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: "italic",
  weight: "600",
  display: "swap",
  variable: "--font-partner-ad-offer",
  preload: false,
  adjustFontFallback: true,
});
