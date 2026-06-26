import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { AbkLiaisonLlpProfile } from "@/components/business-profiles/abk-liaison-llp-profile";
import {
  abkLiaisonLlpPageMetadata,
  buildAbkLiaisonLlpJsonLd,
} from "@/lib/seo/abk-liaison-llp";

const abkSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-abk-sans",
  display: "swap",
});

export const metadata: Metadata = abkLiaisonLlpPageMetadata();

export default function AbkLiaisonLlpBusinessProfilePage() {
  const pageLd = buildAbkLiaisonLlpJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
      <AbkLiaisonLlpProfile className={abkSans.variable} />
    </>
  );
}
