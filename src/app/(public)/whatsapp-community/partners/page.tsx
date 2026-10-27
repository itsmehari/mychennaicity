import type { Metadata } from "next";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import {
  WHATSAPP_COMMUNITY_BADGE_IMAGE,
  WHATSAPP_COMMUNITY_PAGE_PATH,
  WHATSAPP_COMMUNITY_PARTNERS_PATH,
  siteWhatsappCommunityJoinUrl,
} from "@/lib/whatsapp-community";

const path = WHATSAPP_COMMUNITY_PARTNERS_PATH;
const joinUrl = siteWhatsappCommunityJoinUrl("partners");

export const metadata: Metadata = {
  title: "WhatsApp community partner badge",
  description:
    "Badge for RWAs, colleges, and neighbourhood sites. It links to the Chennai join form, not a raw group invite.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  robots: { index: true, follow: true },
};

const embedCode = `<a href="${joinUrl}" title="Request to join my chennai city on WhatsApp" rel="noopener">
  <img src="${getSiteUrl()}${WHATSAPP_COMMUNITY_BADGE_IMAGE}" alt="my chennai city WhatsApp community" width="240" height="72" loading="lazy" />
</a>`;

export default function WhatsappCommunityPartnersPage() {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "WhatsApp partners" },
        ]}
      />
      <p className="type-eyebrow text-[var(--accent)]">Partners</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        Partner badge &amp; embed
      </h1>
      <p className="type-lede mt-4 max-w-2xl text-sm text-[var(--muted)]">
        RWAs, colleges, and campus groups can embed this badge. It opens the join
        form. Rules stay on{" "}
        <a href={WHATSAPP_COMMUNITY_PAGE_PATH} className="font-semibold text-[var(--accent)] hover:underline">
          the group page
        </a>
        . Do not paste the group invite on a public site.
      </p>

      <section className="mt-10" aria-labelledby="badge-preview">
        <h2 id="badge-preview" className="text-lg font-semibold text-[var(--foreground)]">
          Badge preview
        </h2>
        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={WHATSAPP_COMMUNITY_BADGE_IMAGE}
            alt="my chennai city WhatsApp community badge"
            width={240}
            height={72}
          />
        </div>
      </section>

      <section className="mt-10" aria-labelledby="embed-code">
        <h2 id="embed-code" className="text-lg font-semibold text-[var(--foreground)]">
          Embed code
        </h2>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--foreground)_4%,var(--surface))] p-4 text-xs leading-relaxed text-[var(--foreground)]">
          {embedCode}
        </pre>
        <p className="mt-3 text-xs text-[var(--muted)]">
          Join form: <code className="text-[var(--foreground)]">{joinUrl}</code>
        </p>
      </section>

      <InteriorCrossNav />
    </div>
  );
}
