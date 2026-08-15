import type { Metadata } from "next";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { SlangDecoderTool } from "@/components/compulsive/slang-decoder-tool";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { SLANG_DECODER_PATH } from "@/content/compulsive/slang-decoder";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const TA_PATH = "/guides/chennai-slang-decoder-tamil";

const FAQ = [
  {
    q: "இது “சரியான” தமிழா?",
    a: "இல்லை — இது இலக்கண பாடம் அல்ல. சென்னை தெரு, அலுவலகம், வாட்ஸ்அப் ஆகியவற்றில் பயன்படும் தமிழ்–ஆங்கில கலவை.",
  },
  {
    q: "தொனி பொருளை மாற்றுமா?",
    a: "எப்போதும். da / machan நண்பர்களிடம் அன்பு; உறவு இல்லையென்றால் முரட்டுத்தனம். தெரியாவிட்டால் anna / akka மற்றும் மரியாதையே பாதுகாப்பானது.",
  },
];

export const metadata: Metadata = {
  title: "சென்னை ஸ்லாங் டிகோடர்",
  description:
    "சென்னை தமிழ்–ஆங்கில ஸ்லாங் — machan, filter coffee, current, only போன்ற சொற்களின் பொருள் மற்றும் எடுத்துக்காட்டு.",
  alternates: {
    canonical: `${getSiteUrl()}${TA_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${SLANG_DECODER_PATH}`,
      "ta-IN": `${getSiteUrl()}${TA_PATH}`,
      "x-default": `${getSiteUrl()}${SLANG_DECODER_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle("சென்னை ஸ்லாங் டிகோடர்"),
    locale: "ta_IN",
    url: `${getSiteUrl()}${TA_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function ChennaiSlangDecoderTamilPage() {
  return (
    <div lang="ta">
      <ReachGuideShell
        crumbs={[
          { label: "முகப்பு", href: "/" },
          { label: "வழிகாட்டிகள்" },
          { label: "ஸ்லாங் டிகோடர்" },
        ]}
        eyebrow="கலாச்சார மேசை · மொழி"
        title="சென்னை ஸ்லாங் டிகோடர்"
        dek="நகரின் தமிழ்–ஆங்கில கலவை — தெரு பேச்சு, அலுவலக இந்திய ஆங்கிலம், பகுதி சுருக்கம். தேடிப் பாருங்கள்."
        related={[
          { href: compulsivePath("which-chennai"), label: "நீங்கள் எந்த சென்னை?" },
          { href: "/chennai-today-tamil", label: "சென்னை இன்று" },
        ]}
      >
        <BilingualToggle enHref={SLANG_DECODER_PATH} taHref={TA_PATH} current="ta" />
        <GuideDisclaimer kind="culture" />
        <SlangDecoderTool />
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
