import type { Metadata } from "next";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { PetrolVsEvCalculator } from "@/components/compulsive/petrol-vs-ev-calculator";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { PETROL_VS_EV_PATH } from "@/content/compulsive/petrol-vs-ev";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const TA_PATH = "/guides/chennai-petrol-vs-ev-cost-tamil";

const FAQ = [
  {
    q: "பொது DC சார்ஜிங் எப்போதும் பெட்ரோலை விட மலிவா?",
    a: "பல சமயங்களில் ₹/km அடிப்படையில் ஆம், ஆனால் ஆப் கட்டணம், idle fee, வீட்டு vs பொது கட்டணம் மாறும். உங்கள் எண்களைத் திருத்துங்கள்.",
  },
  {
    q: "பேட்டரி தேய்மானம் சேர்க்கப்பட்டுள்ளதா?",
    a: "இல்லை — நாள்/மாத ஆற்றல் செலவு மட்டும். முழு TCO வேறு.",
  },
];

export const metadata: Metadata = {
  title: "சென்னை பெட்ரோல் vs EV செலவு கணிப்பான்",
  description:
    "சென்னை பயணத்திற்கான பெட்ரோல் vs EV நாள் செலவு — கிமீ, மைலேஜ், ₹/kWh திருத்தி பகிரலாம்.",
  alternates: {
    canonical: `${getSiteUrl()}${TA_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${PETROL_VS_EV_PATH}`,
      "ta-IN": `${getSiteUrl()}${TA_PATH}`,
      "x-default": `${getSiteUrl()}${PETROL_VS_EV_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle("சென்னை பெட்ரோல் vs EV செலவு கணிப்பான்"),
    locale: "ta_IN",
    url: `${getSiteUrl()}${TA_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function PetrolVsEvTamilPage() {
  return (
    <div lang="ta">
      <ReachGuideShell
        crumbs={[
          { label: "முகப்பு", href: "/" },
          { label: "வழிகாட்டிகள்" },
          { label: "பெட்ரோல் vs EV" },
        ]}
        eyebrow="செலவு மேசை · சென்னை"
        title="பெட்ரோல் vs EV நாள் செலவு"
        dek="சென்னை கிமீக்கான தனிப்பட்ட எண் — டீலர் விளம்பரம் அல்ல. இன்றைய எரிபொருள்/சார்ஜர் விலையைத் திருத்துங்கள்."
        related={[
          { href: compulsivePath("ac-bill"), label: "AC பில் கணிப்பான்" },
          { href: "/chennai-today-tamil", label: "சென்னை இன்று" },
        ]}
      >
        <BilingualToggle enHref={PETROL_VS_EV_PATH} taHref={TA_PATH} current="ta" />
        <GuideDisclaimer kind="money" />
        <PetrolVsEvCalculator />
        <h2>கேள்விகள்</h2>
        {FAQ.map((item) => (
          <div key={item.q}>
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
        <GuideFinePrint />
      </ReachGuideShell>
    </div>
  );
}
