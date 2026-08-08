import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppCommunityCta } from "@/components/community/whatsapp-community-cta";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import {
  WHATSAPP_SPAMMERS,
  WHATSAPP_SPAMMERS_LAST_UPDATED,
  formatSpammerFlaggedDate,
} from "@/content/whatsapp-community/spammers";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import {
  WHATSAPP_COMMUNITY_GEO_META,
  WHATSAPP_COMMUNITY_GUIDE_PATH,
  WHATSAPP_COMMUNITY_PAGE_PATH,
  WHATSAPP_SPAMMERS_PAGE_PATH,
} from "@/lib/whatsapp-community";

const path = WHATSAPP_SPAMMERS_PAGE_PATH;
const titleSegment =
  "WhatsApp spammers list for Chennai group admins";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Phone numbers flagged from invite-link join floods on the my chennai city WhatsApp group — shared so other Chennai WhatsApp admins can reject similar requests.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Public-interest list of numbers that hit our WhatsApp admin-approval queue via invite link. Use it to stay wary — not as a court finding.",
    url: `${getSiteUrl()}${path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    description:
      "Flagged WhatsApp join-request numbers for Chennai group owners.",
    images: ["/twitter-image"],
  },
  other: { ...WHATSAPP_COMMUNITY_GEO_META },
};

const TIPS = [
  {
    title: "Turn on admin approval",
    body: "In group settings, require admin approval for new members. Invite-link floods show up as a queue you can reject in bulk.",
  },
  {
    title: "Watch mixed country codes",
    body: "A Chennai local group suddenly getting +63, +234, or other non-India dial codes via the same invite is a classic spam pattern.",
  },
  {
    title: "Reject self-added clusters",
    body: "When many numbers appear at once, each “added by” themselves from the invite link, treat the batch as hostile until proven otherwise.",
  },
  {
    title: "Rotate the invite when flooded",
    body: "Revoke and recreate the invite link after a flood. Publish the new link only from a trusted page — not in open comments.",
  },
];

export default function ChennaiWhatsappSpammersPage() {
  const count = WHATSAPP_SPAMMERS.length;

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "WhatsApp community", href: WHATSAPP_COMMUNITY_PAGE_PATH },
          { label: "Spammers list" },
        ]}
      />

      <p className="type-eyebrow text-[var(--accent)]">Group safety</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        WhatsApp spammers list
      </h1>
      <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        Numbers flagged from invite-link join requests on the{" "}
        <Link
          href={WHATSAPP_COMMUNITY_PAGE_PATH}
          className="font-semibold text-[var(--accent)] hover:underline"
        >
          my chennai city
        </Link>{" "}
        WhatsApp group. Shared so other Chennai WhatsApp group owners can stay
        wary and reject similar requests. Last updated{" "}
        <strong className="text-[var(--foreground)]">
          {WHATSAPP_SPAMMERS_LAST_UPDATED}
        </strong>
        .
      </p>

      <aside
        className="mt-8 max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm leading-relaxed text-[var(--muted)]"
        aria-label="Disclaimer"
      >
        <p className="font-semibold text-[var(--foreground)]">Disclaimer</p>
        <p className="mt-2">
          This is an editorial public-interest list based on our admin-approval
          queue. It is <strong className="text-[var(--foreground)]">not</strong>{" "}
          a police complaint, court finding, or accusation of a specific crime.
          Profile names (when shown) are as displayed on WhatsApp at the time of
          the request and may be spoofed. Use the list to inform moderation
          decisions; do not harass listed numbers.
        </p>
      </aside>

      <section className="mt-10" aria-labelledby="spammers-table-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2
            id="spammers-table-heading"
            className="type-display text-xl text-[var(--foreground)] sm:text-2xl"
          >
            Flagged numbers ({count})
          </h2>
          <p className="text-xs text-[var(--muted)]">
            Batch: invite-link flood · 8 Aug 2026
          </p>
        </div>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-[var(--border)]">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Number
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Profile
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Country
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Flagged
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Why
                </th>
              </tr>
            </thead>
            <tbody>
              {WHATSAPP_SPAMMERS.map((row) => (
                <tr
                  key={row.e164}
                  className="border-b border-[var(--border)] last:border-b-0"
                >
                  <td className="px-4 py-3 align-top">
                    <code className="font-mono text-[13px] text-[var(--foreground)]">
                      {row.displayNumber}
                    </code>
                    <span className="mt-1 block font-mono text-[11px] text-[var(--muted)]">
                      {row.e164}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top text-[var(--muted)]">
                    {row.profileName ?? "—"}
                  </td>
                  <td className="px-4 py-3 align-top text-[var(--muted)]">
                    {row.countryHint}
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap text-[var(--muted)]">
                    {formatSpammerFlaggedDate(row.flaggedOn)}
                  </td>
                  <td className="max-w-xs px-4 py-3 align-top text-[var(--muted)]">
                    {row.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 max-w-2xl" aria-labelledby="tips-heading">
        <h2
          id="tips-heading"
          className="type-display text-xl text-[var(--foreground)] sm:text-2xl"
        >
          Tips for other WhatsApp group owners
        </h2>
        <ul className="mt-6 space-y-5">
          {TIPS.map((tip) => (
            <li key={tip.title}>
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                {tip.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                {tip.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        <h2 className="type-display text-xl text-[var(--foreground)]">
          Report more numbers
        </h2>
        <p className="mt-3">
          If you admin a Chennai WhatsApp group and see the same numbers (or a
          similar invite flood), send a screenshot and the numbers via our{" "}
          <Link
            href="/contact"
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            contact page
          </Link>
          . We will review before adding anything to this list. Also read the{" "}
          <Link
            href={WHATSAPP_COMMUNITY_GUIDE_PATH}
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            trusted groups guide
          </Link>{" "}
          and our full explainer for group admins:{" "}
          <Link
            href="/chennai-local-news/whatsapp-spam-report-platform-chennai-group-admins-august-2026"
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            WhatsApp spam report platform for Chennai group admins
          </Link>
          .
        </p>
      </section>

      <div className="mt-12">
        <WhatsAppCommunityCta variant="banner" utmContent="spammers_list" />
      </div>

      <InteriorCrossNav />
    </div>
  );
}
