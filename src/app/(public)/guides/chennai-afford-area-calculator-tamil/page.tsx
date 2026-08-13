import type { Metadata } from "next";
import { AffordAreaCalculator } from "@/components/compulsive/afford-area-calculator";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { AFFORD_AREA_PATH } from "@/content/compulsive/afford-area";
import {
  AFFORD_AREA_FAQ_TA,
  AFFORD_AREA_TA_PATH,
} from "@/content/compulsive/afford-area-ta";
import { compulsivePath } from "@/content/compulsive/index";
import { CHENNAI_SALARY_GUIDE_PATH } from "@/content/guides/chennai-salary-guide-2026";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "இந்த CTC-ல் அடையார் தாங்குமா?";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "சென்னை வாடகை vs டேக்-ஹோம் கணிப்பான் — அடையார், OMR, வேளச்சேரி, அண்ணா நகர் உள்ளிட்ட பகுதிகள்.",
  alternates: {
    canonical: `${getSiteUrl()}${AFFORD_AREA_TA_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${AFFORD_AREA_PATH}`,
      "ta-IN": `${getSiteUrl()}${AFFORD_AREA_TA_PATH}`,
      "x-default": `${getSiteUrl()}${AFFORD_AREA_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "சென்னை பகுதி வாடகை vs சம்பள உண்மைச் சோதனை.",
    url: `${getSiteUrl()}${AFFORD_AREA_TA_PATH}`,
    locale: "ta_IN",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function AffordAreaTamilPage() {
  return (
    <div lang="ta">
      <ReachGuideShell
        crumbs={[
          { label: "முகப்பு", href: "/" },
          { label: "வழிகாட்டிகள்" },
          { label: "இந்த பகுதி தாங்குமா?" },
        ]}
        eyebrow="செலவு மேசை · வீடு"
        title="இந்த CTC-ல் இந்த பகுதி தாங்குமா?"
        dek="அடையாரில் தொடங்குங்கள் — அல்லது தாழ்வாரத்தை மாற்றுங்கள். 2026 வாடகை நடு எண்கள் உங்கள் டேக்-ஹோமுடன் சந்திக்கும்."
        related={[
          { href: CHENNAI_SALARY_GUIDE_PATH, label: "சம்பள வழிகாட்டி 2026" },
          { href: CHENNAI_JOBS_HUB_PATH, label: "சென்னை வேலைகள்" },
          { href: compulsivePath("moved-checklist"), label: "சென்னைக்கு வந்தவர்களுக்கான பட்டியல்" },
          { href: "/areas/adyar-thiruvanmiyur", label: "அடையார் பகுதி" },
          { href: "/chennai-today-tamil", label: "சென்னை இன்று" },
        ]}
      >
        <BilingualToggle enHref={AFFORD_AREA_PATH} taHref={AFFORD_AREA_TA_PATH} current="ta" />
        <GuideDisclaimer kind="money" />
        <AffordAreaCalculator locale="ta" />
        <h2>கேள்விகள்</h2>
        {AFFORD_AREA_FAQ_TA.map((item) => (
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
