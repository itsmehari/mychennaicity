import type { Metadata } from "next";
import { AbkLiaisonLlpProfile } from "@/components/business-profiles/abk-liaison-llp-profile";
import {
  abkLiaisonLlpPageMetadata,
  buildAbkLiaisonLlpJsonLd,
} from "@/lib/seo/abk-liaison-llp";

export const metadata: Metadata = abkLiaisonLlpPageMetadata();

export default function AbkLiaisonLlpBusinessProfilePage() {
  const pageLd = buildAbkLiaisonLlpJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }}
      />
      <AbkLiaisonLlpProfile />
    </>
  );
}
