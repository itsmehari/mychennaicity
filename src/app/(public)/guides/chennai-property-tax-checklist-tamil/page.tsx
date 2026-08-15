import type { Metadata } from "next";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { PropertyTaxChecklist } from "@/components/compulsive/property-tax-checklist";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  PROPERTY_TAX_OFFICIAL_NOTE,
  PROPERTY_TAX_PATH,
} from "@/content/compulsive/property-tax";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const TA_PATH = "/guides/chennai-property-tax-checklist-tamil";

const FAQ = [
  {
    q: "இது GCC வரிக் கணிப்பானா?",
    a: "இல்லை. அதிகாரப்பூர்வ போர்ட்டலில் நீங்கள் சரிபார்க்க வேண்டிய பொதுவான பிழைகளின் பட்டியல்.",
  },
  {
    q: "ஆகஸ்ட் 2026 மறுமதிப்பீடு நிறுத்தம்?",
    a: "GCC மறுமதிப்பீட்டை நிறுத்தியதாக செய்தி மேசை எழுதியது. உங்கள் கோரிக்கை பழைய தொகைக்கு திரும்பியதா என்பதை போர்ட்டலில் பாருங்கள் — இங்கே ஊகிக்க வேண்டாம்.",
  },
];

export const metadata: Metadata = {
  title: "சென்னை சொத்து வரி அதிகக் கட்டணப் பட்டியல்",
  description:
    "GCC சொத்து வரி — தவறான வகைப்பாடு, காலி நிலம், பெயர் பொருத்தமின்மை. அதிகாரப்பூர்வ போர்ட்டலில் உறுதிப்படுத்துங்கள்.",
  alternates: {
    canonical: `${getSiteUrl()}${TA_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${PROPERTY_TAX_PATH}`,
      "ta-IN": `${getSiteUrl()}${TA_PATH}`,
      "x-default": `${getSiteUrl()}${PROPERTY_TAX_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle("சென்னை சொத்து வரி அதிகக் கட்டணப் பட்டியல்"),
    locale: "ta_IN",
    url: `${getSiteUrl()}${TA_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function PropertyTaxChecklistTamilPage() {
  return (
    <div lang="ta">
      <ReachGuideShell
        crumbs={[
          { label: "முகப்பு", href: "/" },
          { label: "வழிகாட்டிகள்" },
          { label: "சொத்து வரி" },
        ]}
        eyebrow="பண மேசை · GCC வரி"
        title="சொத்து வரி அதிகக் கட்டணப் பட்டியல்"
        dek="GCC போர்ட்டலில் சரிபார்க்க நான்கு பொதுவான பிழைகள். முன்னேற்றம் இந்த உலாவியில் மட்டும்."
        related={[
          { href: CIVIC_TOOL_PATHS.zoneWardFinder, label: "மண்டலம் / வார்டு" },
          { href: compulsivePath("address-fixer"), label: "முகவரி சரிசெய்தி" },
        ]}
      >
        <BilingualToggle enHref={PROPERTY_TAX_PATH} taHref={TA_PATH} current="ta" />
        <GuideDisclaimer
          kind="money"
          extra={`${PROPERTY_TAX_OFFICIAL_NOTE} வரி அல்லது சட்ட ஆலோசனை அல்ல.`}
        />
        <PropertyTaxChecklist />
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
