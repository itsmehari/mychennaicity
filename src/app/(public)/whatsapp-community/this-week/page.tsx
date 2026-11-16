import type { Metadata } from "next";
import Link from "next/link";
import {
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { WHATSAPP_THIS_WEEK } from "@/content/whatsapp-community/this-week";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import {
  WHATSAPP_COMMUNITY_OG_IMAGE,
  WHATSAPP_COMMUNITY_THIS_WEEK_PATH,
  whatsappCommunityJoinHref,
} from "@/lib/whatsapp-community";
import { WhatsAppCommunityJoinLink } from "@/components/community/whatsapp-community-join-link";
import { whatsappRequestCtaLabel } from "@/lib/whatsapp-link";

const path = WHATSAPP_COMMUNITY_THIS_WEEK_PATH;

export const metadata: Metadata = {
  title: "This week in the Chennai WhatsApp group",
  description:
    "Five site links shared in the my chennai city WhatsApp group this week — news, jobs, and events worth opening again.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: fullSiteTitle("This week in the Chennai WhatsApp group"),
    url: `${getSiteUrl()}${path}`,
    images: [{ url: WHATSAPP_COMMUNITY_OG_IMAGE, width: 1200, height: 630 }],
  },
};

export default function WhatsappThisWeekPage() {
  const edition = WHATSAPP_THIS_WEEK;
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "WhatsApp this week" },
        ]}
      />
      <p className="type-eyebrow text-[#128C7E]">WhatsApp community</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        This week in the group
      </h1>
      <p className="type-lede mt-4 max-w-2xl text-sm text-[var(--muted)]">
        Week of {edition.weekOf}. These are site pages that were worth sharing
        again. Updated {edition.updated}.
      </p>
      {edition.items.length === 0 ? (
        <p className="mt-8 max-w-2xl text-sm text-[var(--muted)]">
          The editor has not pinned this week&apos;s five links yet. Request to
          join the group, then check back on Sunday.
        </p>
      ) : (
        <ol className="mt-8 max-w-2xl space-y-5">
          {edition.items.map((item, index) => (
            <li key={item.href}>
              <p className="text-xs text-[var(--muted)]">{index + 1}</p>
              <Link
                href={item.href}
                className="text-base font-semibold text-[var(--foreground)] hover:underline"
              >
                {item.title}
              </Link>
              <p className="mt-1 text-sm text-[var(--muted)]">{item.blurb}</p>
            </li>
          ))}
        </ol>
      )}
      <p className="mt-10">
        <WhatsAppCommunityJoinLink
          utmContent="this-week"
          className="inline-flex min-h-12 items-center rounded-full bg-[#25D366] px-6 text-sm font-bold text-white"
        >
          {whatsappRequestCtaLabel("en")}
        </WhatsAppCommunityJoinLink>
      </p>
      <p className="mt-4 text-xs text-[var(--muted)]">
        Join form: {whatsappCommunityJoinHref("this-week")}
      </p>
    </div>
  );
}
