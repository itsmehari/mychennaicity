import type { Metadata } from "next";
import { AbkLiaisonLlpProfile } from "@/components/business-profiles/abk-liaison-llp-profile";

const PATH = "/business-profile/abk-liaison-llp";
const OG_IMAGE = "/images/business-profile/abk-liaison-llp/abk-profile-og.png";

export const metadata: Metadata = {
  title: "ABK Liaison LLP | Locations, Licenses, Liaison & Construction",
  description:
    "ABK Liaison LLP is a Tamil Nadu and Pondicherry based liaison, licensing, government contracts and civil development firm led by AB Kathirravan.",
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    type: "article",
    title: "ABK Liaison LLP | Business Profile",
    description:
      "A professional business profile of ABK Liaison LLP covering statutory licensing, retail outlet liaison, government contracts and civil works.",
    url: PATH,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "ABK Liaison LLP business profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABK Liaison LLP | Business Profile",
    description:
      "Statutory licensing, liaison coordination, government contracts and civil development across Tamil Nadu and Pondicherry.",
    images: [OG_IMAGE],
  },
};

export default function AbkLiaisonLlpBusinessProfilePage() {
  return <AbkLiaisonLlpProfile />;
}
