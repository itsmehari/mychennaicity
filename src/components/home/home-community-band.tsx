import { HomeNewsletterSignup } from "@/components/newsletter/home-newsletter-signup";
import { JoinWhatsAppCommunityCard } from "@/components/community/join-whatsapp-community";
import { WhatsAppCommunityCta } from "@/components/community/whatsapp-community-cta";
import { Section } from "@/components/home/section";

export function HomeCommunityBand() {
  return (
    <Section
      id="newsletter"
      eyebrow="Community"
      title="Stay in the loop"
      subtitle="Weekly digest and our official Chennai WhatsApp community."
    >
      <div className="mb-8">
        <WhatsAppCommunityCta variant="banner" utmContent="home-banner" src="home" />
      </div>
      <div className="grid gap-6 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm lg:grid-cols-[1fr_auto] lg:items-stretch">
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            Weekly Chennai digest
          </p>
          <p className="type-lede mt-1 text-sm">
            Jobs, civic deadlines, and weekend events in one email. Tap Subscribe
            to join the list — or use WhatsApp for daily updates.
          </p>
          <HomeNewsletterSignup />
        </div>
        <div className="flex min-w-0 flex-col justify-center border-t border-[var(--border)] pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <JoinWhatsAppCommunityCard layout="card" />
          <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">
            Prefer chat? Join the official Chennai WhatsApp community linked above.
          </p>
        </div>
      </div>
    </Section>
  );
}
