import type { Metadata } from "next";
import { AcBillPredictor } from "@/components/compulsive/ac-bill-predictor";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { AC_BILL_PATH } from "@/content/compulsive/ac-bill";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const TA_PATH = "/guides/chennai-ac-bill-predictor-tamil";

const FAQ = [
  {
    q: "இது அதிகாரப்பூர்வ TNPDCL பில்லா?",
    a: "இல்லை. AC அலகுகளுக்கான திசை காட்டி மட்டும். உண்மையான ஸ்லாப்களுக்கு உங்கள் பில்லையும் TNPDCL விளக்கத்தையும் பாருங்கள்.",
  },
  {
    q: "டன் × மணிநேரம் ஏன்?",
    a: "எளிய வீட்டுத் திட்டம். இன்வெர்ட்டர் திறன், அறை அளவு, வெப்பம் உண்மையான இழுவை மாற்றும்.",
  },
];

export const metadata: Metadata = {
  title: "சென்னை AC பில் கணிப்பான்",
  description:
    "டன் மற்றும் மணிநேரத்திலிருந்து மாத அலகுகள் — சென்னை கோடை பழக்கத்தை சோதிக்க. அதிகாரப்பூர்வ பில் அல்ல.",
  alternates: {
    canonical: `${getSiteUrl()}${TA_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${AC_BILL_PATH}`,
      "ta-IN": `${getSiteUrl()}${TA_PATH}`,
      "x-default": `${getSiteUrl()}${AC_BILL_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle("சென்னை AC பில் கணிப்பான்"),
    locale: "ta_IN",
    url: `${getSiteUrl()}${TA_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function AcBillPredictorTamilPage() {
  return (
    <div lang="ta">
      <ReachGuideShell
        crumbs={[
          { label: "முகப்பு", href: "/" },
          { label: "வழிகாட்டிகள்" },
          { label: "AC பில்" },
        ]}
        eyebrow="செலவு மேசை · EB"
        title="AC பில் கணிப்பான்"
        dek="சென்னை கோடைக்கான தோராய அலகுகள் — TNPDCL விலைப்பட்டியல் அல்ல."
        related={[
          { href: compulsivePath("petrol-vs-ev"), label: "பெட்ரோல் vs EV" },
          { href: "/civic-tools/power-feeder-desk", label: "பவர் / ஃபீடர் மேசை" },
        ]}
      >
        <BilingualToggle enHref={AC_BILL_PATH} taHref={TA_PATH} current="ta" />
        <GuideDisclaimer kind="money" extra="அதிகாரப்பூர்வ TANGEDCO / TNPDCL மதிப்பீடு அல்ல." />
        <AcBillPredictor />
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
