import type { Metadata } from "next";
import { Noto_Sans_Tamil, Noto_Serif_Tamil } from "next/font/google";
import { VisuIyerKolathurProfile } from "@/components/business-profiles/visu-iyer-kolathur-profile";
import {
  buildVisuIyerJsonLd,
  visuIyerPageMetadata,
} from "@/lib/seo/visu-iyer-kolathur";

const visuSans = Noto_Sans_Tamil({
  subsets: ["tamil", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-visu-sans",
  display: "swap",
});

const visuSerif = Noto_Serif_Tamil({
  subsets: ["tamil", "latin"],
  weight: ["600", "700"],
  variable: "--font-visu-serif",
  display: "swap",
});

export const metadata: Metadata = visuIyerPageMetadata();

export default function VisuIyerKolathurPage() {
  const pageLd = buildVisuIyerJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
      <VisuIyerKolathurProfile className={`${visuSans.variable} ${visuSerif.variable}`} />
    </>
  );
}
