import { JoinWhatsAppCommunityCard } from "@/components/community/join-whatsapp-community";
import { Section } from "@/components/home/section";

export function HomeCommunityBand() {
  return (
    <Section
      id="newsletter"
      eyebrow="Community"
      title="Stay in the loop"
      subtitle="Weekly digest and neighbourhood channels — we are finishing email and moderation first."
    >
      <div className="grid gap-6 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm lg:grid-cols-[1fr_auto] lg:items-stretch">
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            Weekly Chennai digest
          </p>
          <p className="type-lede mt-1 text-sm">
            Jobs, civic deadlines, and weekend events in one email — not live yet;
            join once we open sign-ups.
          </p>
          <form
            className="mt-4 flex max-w-md flex-col gap-2 sm:flex-row"
            aria-label="Newsletter (not yet active)"
            action="#newsletter"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              disabled
              placeholder="you@example.com"
              className="flex-1 cursor-not-allowed rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] opacity-70 placeholder:text-[var(--muted)]"
            />
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--muted)]"
            >
              Coming soon
            </button>
          </form>
        </div>
        <div className="flex min-w-0 flex-col justify-center border-t border-[var(--border)] pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <JoinWhatsAppCommunityCard layout="card" />
          <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">
            <span className="font-semibold text-[var(--foreground)]">
              Instagram &amp; YouTube:
            </span>{" "}
            Public handles are not linked here yet — they will appear in this
            band once the channels are ready for readers.
          </p>
        </div>
      </div>
    </Section>
  );
}
