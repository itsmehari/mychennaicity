import type { Metadata } from "next";
import Link from "next/link";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { MovedChecklistTool } from "@/components/compulsive/moved-checklist-tool";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  MOVED_CHECKLIST_FAQ,
  MOVED_CHECKLIST_PATH,
} from "@/content/compulsive/moved-checklist";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Moved to Chennai checklist";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Moved to Chennai checklist — EB, water, ration, school, WhatsApp, GCC apps, and hospitals. Progress saves in your browser.",
  alternates: { canonical: `${getSiteUrl()}${MOVED_CHECKLIST_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "Resident onboarding ticks for Greater Chennai — civic, not legal advice.",
    url: `${getSiteUrl()}${MOVED_CHECKLIST_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function MovedToChennaiChecklistPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Moved to Chennai checklist" },
      ]}
      eyebrow="Civic desk · New residents"
      title="Moved to Chennai checklist"
      dek="Tick the boring essentials — power, water, papers, neighbourhood WhatsApp, civic apps, and emergency pins — so week two feels less like chaos."
      related={[
        { href: "/directory", label: "City directory" },
        { href: "/chennai-whatsapp-group-admins", label: "WhatsApp group admin tips" },
        { href: "/civic-tools", label: "Civic tools" },
        { href: compulsivePath("pg-red-flags"), label: "PG / flatmate red flags" },
        { href: compulsivePath("afford-area"), label: "Afford-this-area calculator" },
        { href: compulsivePath("which-chennai"), label: "Which Chennai are you?" },
      ]}
    >
      <GuideDisclaimer kind="civic" />

      <p>
        Start here, then branch out: the{" "}
        <Link href="/directory">directory</Link> for local services,{" "}
        <Link href="/chennai-whatsapp-group-admins">WhatsApp admin guidance</Link> before you
        join random invites, and{" "}
        <Link href="/civic-tools">civic tools</Link> when ward / address forms get weird.
      </p>

      <MovedChecklistTool />

      <h2>FAQ</h2>
      {MOVED_CHECKLIST_FAQ.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint />
    </ReachGuideShell>
  );
}
