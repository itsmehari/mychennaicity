import type { Metadata } from "next";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { SlangDecoderTool } from "@/components/compulsive/slang-decoder-tool";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  SLANG_DECODER_FAQ,
  SLANG_DECODER_PATH,
} from "@/content/compulsive/slang-decoder";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai slang decoder";
const TA_PATH = "/guides/chennai-slang-decoder-tamil";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Chennai Tamil–English slang decoder — search city desk terms like machan, filter coffee, current, only, and more with meanings and examples.",
  alternates: {
    canonical: `${getSiteUrl()}${SLANG_DECODER_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${SLANG_DECODER_PATH}`,
      "ta-IN": `${getSiteUrl()}${TA_PATH}`,
      "x-default": `${getSiteUrl()}${SLANG_DECODER_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "Searchable Chennai slang for newcomers and long-timers.",
    url: `${getSiteUrl()}${SLANG_DECODER_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function ChennaiSlangDecoderPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Slang decoder" },
      ]}
      eyebrow="Culture desk · Language"
      title="Chennai slang decoder"
      dek="Search the city’s Tamil–English mix — street talk, office Indian English, and neighbourhood shorthand — with a light touch and zero mean stereotypes."
      related={[
        { href: compulsivePath("which-chennai"), label: "Which Chennai are you?" },
        { href: compulsivePath("rivalries"), label: "Area rivalry cards" },
        { href: compulsivePath("moved-checklist"), label: "Moved to Chennai checklist" },
        { href: "/chennai-whatsapp-group-admins", label: "WhatsApp admin tips" },
        { href: "/guides/how-to-use-mychennaicity", label: "How to use mychennaicity" },
      ]}
    >
      <BilingualToggle enHref={SLANG_DECODER_PATH} taHref={TA_PATH} current="en" />
      <GuideDisclaimer kind="culture" />
      <SlangDecoderTool />
      <h2>FAQ</h2>
      {SLANG_DECODER_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
