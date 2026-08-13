import type { Metadata } from "next";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { WhichChennaiQuiz } from "@/components/compulsive/which-chennai-quiz";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { WHICH_CHENNAI_PATH } from "@/content/compulsive/which-chennai";
import {
  WHICH_CHENNAI_FAQ_TA,
  WHICH_CHENNAI_TA_PATH,
} from "@/content/compulsive/which-chennai-ta";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "நீங்கள் எந்த சென்னை?";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "சென்னை ஆளுமை வினாடி வினா — மயிலாப்பூர், OMR, வடக்கு துடிப்பு, மேற்கு திட்டமிடுபவர். பகிரக்கூடிய ஆர்க்கிடைப்புகள்.",
  alternates: {
    canonical: `${getSiteUrl()}${WHICH_CHENNAI_TA_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${WHICH_CHENNAI_PATH}`,
      "ta-IN": `${getSiteUrl()}${WHICH_CHENNAI_TA_PATH}`,
      "x-default": `${getSiteUrl()}${WHICH_CHENNAI_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "உங்கள் சென்னை ஆற்றலுக்கான இலகுவான மேசை வினாடி வினா — தரவரிசை அல்ல.",
    url: `${getSiteUrl()}${WHICH_CHENNAI_TA_PATH}`,
    locale: "ta_IN",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function WhichChennaiAreYouTamilPage() {
  return (
    <div lang="ta">
      <ReachGuideShell
        crumbs={[
          { label: "முகப்பு", href: "/" },
          { label: "வழிகாட்டிகள்" },
          { label: "நீங்கள் எந்த சென்னை?" },
        ]}
        eyebrow="கலாசார மேசை · வினாடி வினா"
        title="நீங்கள் எந்த சென்னை?"
        dek="ஒன்பது கேள்விகள், நான்கு அக்கம் ஆற்றல்கள் — பின்கோடு விசுவாசத் தேர்வு அல்ல, நகரை எப்படி வாழ்கிறீர்கள் என்பதற்கான விளையாட்டு."
        related={[
          { href: compulsivePath("rivalries"), label: "பகுதி போட்டி அட்டைகள்" },
          { href: compulsivePath("slang"), label: "சென்னை ஸ்லாங்" },
          { href: "/chennai-today-tamil", label: "சென்னை இன்று" },
          { href: "/guides/chennai-afford-area-calculator-tamil", label: "இந்த பகுதி தாங்குமா?" },
        ]}
      >
        <BilingualToggle enHref={WHICH_CHENNAI_PATH} taHref={WHICH_CHENNAI_TA_PATH} current="ta" />
        <GuideDisclaimer kind="culture" />
        <WhichChennaiQuiz locale="ta" />
        <h2>கேள்விகள்</h2>
        {WHICH_CHENNAI_FAQ_TA.map((item) => (
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
