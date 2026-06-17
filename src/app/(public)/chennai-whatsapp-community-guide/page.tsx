import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppCommunityCta } from "@/components/community/whatsapp-community-cta";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import {
  WHATSAPP_COMMUNITY_GEO_META,
  WHATSAPP_COMMUNITY_GUIDE_PATH,
  WHATSAPP_COMMUNITY_PAGE_PATH,
  siteWhatsappCommunityPageUrl,
} from "@/lib/whatsapp-community";

const path = WHATSAPP_COMMUNITY_GUIDE_PATH;
const titleSegment = "How to find trusted local WhatsApp groups in Chennai";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "A practical guide to finding safe, useful Chennai WhatsApp groups — verify admins, avoid spam, and join the official my chennai city community on mychennaicity.in.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Chennai neighbourhood WhatsApp groups: what to check before you join.",
    url: `${getSiteUrl()}${path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  other: { ...WHATSAPP_COMMUNITY_GEO_META },
};

const SECTIONS = [
  {
    title: "Start with a canonical landing page",
    body: "Trusted city portals publish one official join URL — not a raw chat.whatsapp.com link scattered in footers. For Chennai, mychennaicity.in/chennai-whatsapp-group is the canonical destination with rules, FAQ, and moderation contact.",
  },
  {
    title: "Verify who runs the group",
    body: "Look for a named editorial team or organisation behind the invite. Unofficial groups often copy popular names. Cross-check the site About page and whether the group links back to the same domain.",
  },
  {
    title: "Read rules before you post",
    body: "Good groups pin clear rules: Chennai-only posts, no political spam, job posts with location, and no MLM. If rules are missing or admins are anonymous, treat the group as higher risk.",
  },
  {
    title: "Watch for spam patterns",
    body: "Repeated crypto schemes, gambling links, adult content, and cold DMs are red flags. Leave or mute groups that tolerate them — WhatsApp cannot moderate content for you.",
  },
  {
    title: "Prefer one city-wide group over many splinters",
    body: "Topic splinter groups (jobs-only, buy-sell-only) multiply noise. A single moderated Chennai community with clear channels for news, jobs, and events is easier to trust and share.",
  },
  {
    title: "When the group is full",
    body: "WhatsApp member caps are real. Legitimate operators maintain a waitlist via site email or admin contact — not random secondary invites from unknown numbers.",
  },
];

export default function ChennaiWhatsappCommunityGuidePage() {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Chennai WhatsApp guide" },
        ]}
      />
      <p className="type-eyebrow text-[var(--accent)]">Guide</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        {titleSegment}
      </h1>
      <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        Neighbourhood WhatsApp groups can be genuinely useful — for civic alerts, job leads,
        and event tips. They can also be spam traps. This guide helps Chennai residents
        evaluate a group before joining, and points to our{" "}
        <Link
          href={WHATSAPP_COMMUNITY_PAGE_PATH}
          className="font-semibold text-[var(--accent)] hover:underline"
        >
          official community page
        </Link>
        .
      </p>

      <div className="mt-10 space-y-10">
        {SECTIONS.map((s, i) => (
          <section key={s.title}>
            <h2 className="type-display text-xl text-[var(--foreground)]">
              {i + 1}. {s.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
              {s.body}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-12">
        <WhatsAppCommunityCta variant="banner" utmContent="guide" />
      </div>

      <p className="mt-8 text-xs text-[var(--muted)]">
        Canonical community URL:{" "}
        <a
          href={siteWhatsappCommunityPageUrl()}
          className="font-mono text-[var(--foreground)]"
        >
          {siteWhatsappCommunityPageUrl()}
        </a>
      </p>

      <InteriorCrossNav />
    </div>
  );
}
