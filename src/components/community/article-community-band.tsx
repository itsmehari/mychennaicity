import { AdvertisePanel } from "@/components/ads/advertise-panel";
import { BusinessWhatsAppCta } from "@/components/community/business-whatsapp-cta";
import { JoinWhatsAppCommunityCard } from "@/components/community/join-whatsapp-community";

/**
 * Placement rule: end of the reading column, after the article body and
 * attribution, before related links — one band so long reads get a predictable
 * “footer” CTA without scattering buttons through the story.
 */
export function ArticleCommunityBand() {
  return (
    <section
      className="space-y-5 rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_88%,var(--accent)_4%)] p-5 sm:p-6"
      aria-label="Community and tips"
    >
      <AdvertisePanel variant="news" layout="strip" />
      <JoinWhatsAppCommunityCard layout="inline" />
      <div className="border-t border-[var(--border)] pt-5">
        <BusinessWhatsAppCta variant="news" embedded />
      </div>
    </section>
  );
}
