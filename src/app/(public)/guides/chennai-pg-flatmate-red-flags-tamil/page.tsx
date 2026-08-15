import type { Metadata } from "next";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { PgRedFlagsTool } from "@/components/compulsive/pg-red-flags-tool";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { PG_RED_FLAGS_PATH } from "@/content/compulsive/pg-red-flags";
import { compulsivePath } from "@/content/compulsive/index";
import { CHENNAI_SALARY_GUIDE_PATH } from "@/content/guides/chennai-salary-guide-2026";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const TA_PATH = "/guides/chennai-pg-flatmate-red-flags-tamil";

const FAQ = [
  {
    q: "இது சட்ட ஆலோசனையா?",
    a: "இல்லை. சென்னை PG / ரூம்மேட் தேடலுக்கு நடைமுறை குறிப்புகள். வைப்பு, ஒப்பந்தம், சர்ச்சைக்கு தகுதி பெற்றவரை அணுகுங்கள்.",
  },
  {
    q: "ஆம்பர் என்றால் வீட்டை நிராகரிக்க வேண்டுமா?",
    a: "தானாக இல்லை. எழுத்தில் தெளிவுபடுத்துங்கள். பல ஆம்பர் + ஒரு சிவப்பு என்றால் வேறு இடத்தைத் தேடுங்கள்.",
  },
];

export const metadata: Metadata = {
  title: "சென்னை PG / ரூம்மேட் எச்சரிக்கைகள்",
  description:
    "சென்னை PG மற்றும் ரூம்மேட் — வைப்பு, ஒப்பந்தம், பயன்பாடு, பாதுகாப்பு. சிவப்பு நிறுத்து; ஆம்பர் எழுத்தில் கேள். சட்ட ஆலோசனை அல்ல.",
  alternates: {
    canonical: `${getSiteUrl()}${TA_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${PG_RED_FLAGS_PATH}`,
      "ta-IN": `${getSiteUrl()}${TA_PATH}`,
      "x-default": `${getSiteUrl()}${PG_RED_FLAGS_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle("சென்னை PG / ரூம்மேட் எச்சரிக்கைகள்"),
    locale: "ta_IN",
    url: `${getSiteUrl()}${TA_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function ChennaiPgFlatmateRedFlagsTamilPage() {
  return (
    <div lang="ta">
      <ReachGuideShell
        crumbs={[
          { label: "முகப்பு", href: "/" },
          { label: "வழிகாட்டிகள்" },
          { label: "PG எச்சரிக்கைகள்" },
        ]}
        eyebrow="வீட்டு மேசை · பாதுகாப்பு"
        title="சென்னை PG / ரூம்மேட் எச்சரிக்கைகள்"
        dek="பார்த்ததை டிக் செய்யுங்கள் — சிவப்பு நிறுத்து, ஆம்பர் எழுத்தில் கேள், பச்சை நல்ல சமிக்ஞை. ஒப்பந்தத்தைப் படியுங்கள்."
        related={[
          { href: compulsivePath("afford-area"), label: "பகுதி வாடகை கணிப்பான்" },
          { href: CHENNAI_SALARY_GUIDE_PATH, label: "சம்பள வழிகாட்டி 2026" },
        ]}
      >
        <BilingualToggle enHref={PG_RED_FLAGS_PATH} taHref={TA_PATH} current="ta" />
        <GuideDisclaimer
          kind="money"
          extra="சட்ட ஆலோசனை அல்ல. வைப்பு சர்ச்சை, வாடகை உரிமை, ஒப்பந்தம் — தகுதி பெற்றவரும் அதிகாரப்பூர்வ வழிகளும் தேவை."
        />
        <PgRedFlagsTool />
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
