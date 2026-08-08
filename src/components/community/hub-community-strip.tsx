import Link from "next/link";
import { BusinessWhatsAppCta } from "@/components/community/business-whatsapp-cta";
import { JoinWhatsAppCommunityCard } from "@/components/community/join-whatsapp-community";
import { MYCHENNAICITY_USAGE_GUIDE_PATH } from "@/content/guides/mychennaicity-usage";
import type { BusinessWhatsAppCtaVariant } from "@/lib/whatsapp-cta-copy";

/**
 * Placement rule: immediately after the hub hero (title + lede), before the first
 * major list, map, or ad row — same order everywhere (community first, desk second).
 */
export function HubCommunityStrip({
  businessVariant,
  className = "",
}: {
  businessVariant: BusinessWhatsAppCtaVariant;
  className?: string;
}) {
  return (
    <section
      className={`mt-8 grid gap-5 lg:mt-10 lg:grid-cols-2 lg:items-stretch lg:gap-6 ${className}`.trim()}
      aria-label="Community and contact"
    >
      <JoinWhatsAppCommunityCard layout="card" />
      <div className="flex min-h-0 flex-col gap-4">
        <BusinessWhatsAppCta variant={businessVariant} />
        <p className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-xs leading-relaxed text-[var(--muted)]">
          New to the site?{" "}
          <Link
            href={MYCHENNAICITY_USAGE_GUIDE_PATH}
            className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
          >
            How to use mychennaicity.in
          </Link>{" "}
          — guides for residents, job seekers, WhatsApp admins, and more.
        </p>
      </div>
    </section>
  );
}
