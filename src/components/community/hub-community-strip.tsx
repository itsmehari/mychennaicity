import { BusinessWhatsAppCta } from "@/components/community/business-whatsapp-cta";
import { JoinWhatsAppCommunityCard } from "@/components/community/join-whatsapp-community";
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
      <BusinessWhatsAppCta variant={businessVariant} />
    </section>
  );
}
