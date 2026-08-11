import type { Metadata } from "next";
import Link from "next/link";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  WA_ADMIN_LINKS,
  WA_ADMIN_PLAYBOOK,
  WHATSAPP_ADMINS_TOOLKIT_PATH,
} from "@/content/whatsapp-community/admins-toolkit";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import { WHATSAPP_SPAMMERS_PAGE_PATH } from "@/lib/whatsapp-community";

const titleSegment = "WhatsApp group admin toolkit — Chennai";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Toolkit for Chennai neighbourhood WhatsApp admins — join approval, spam patterns, pin rules, and links to our flagged numbers list.",
  alternates: { canonical: `${getSiteUrl()}${WHATSAPP_ADMINS_TOOLKIT_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Run a cleaner apartment or locality WhatsApp group in Chennai — practical admin playbook.",
    url: `${getSiteUrl()}${WHATSAPP_ADMINS_TOOLKIT_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function WhatsAppAdminsToolkitPage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "WhatsApp community", href: "/chennai-whatsapp-group" },
        { label: "Admin toolkit" },
      ]}
      eyebrow="Community · Admins"
      title="Chennai WhatsApp group admin toolkit"
      dek="For apartment, street, and ward admins who want fewer spam joins and clearer rules — without turning your group into a shouting match."
      related={[
        { href: WHATSAPP_SPAMMERS_PAGE_PATH, label: "Flagged spam numbers" },
        { href: "/chennai-whatsapp-community-guide", label: "Community join guide" },
        { href: "/chennai-whatsapp-group", label: "Join mychennaicity group" },
      ]}
    >
      <p>
        <strong>Disclaimer:</strong> This is operational guidance for volunteer admins. Flagged
        numbers on our list are public-interest notes from join-request patterns — not criminal
        findings.
      </p>

      <h2>Playbook</h2>
      <ol>
        {WA_ADMIN_PLAYBOOK.map((step) => (
          <li key={step.title}>
            <strong>{step.title}.</strong> {step.body}
          </li>
        ))}
      </ol>

      <h2>Quick links</h2>
      <ul>
        {WA_ADMIN_LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>

      <h2>Share with other admins</h2>
      <p>
        Forward this page URL plus the{" "}
        <Link href={WHATSAPP_SPAMMERS_PAGE_PATH}>spammers list</Link> to neighbouring society
        admins when an invite-flood hits. Consistency across groups is what stops the same
        numbers hopping street to street.
      </p>
    </ReachGuideShell>
  );
}
