import type { ReactNode } from "react";
import { Instrument_Serif, Libre_Franklin } from "next/font/google";

const corpDisplay = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-corp-display",
  display: "swap",
});

const corpSans = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-corp-sans",
  display: "swap",
});

/**
 * Contact page only — Fortune-500 / institutional visual system,
 * scoped away from the civic site chrome.
 */
export default function ContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={`${corpDisplay.variable} ${corpSans.variable} mcc-corp-root`}>
      {children}
    </div>
  );
}
