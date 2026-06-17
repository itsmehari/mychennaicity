import Link from "next/link";
import {
  WHATSAPP_COMMUNITY_BENEFITS,
  WHATSAPP_COMMUNITY_LOCALITIES,
} from "@/content/whatsapp-community/localities";
import { WHATSAPP_COMMUNITY_RULES } from "@/content/whatsapp-community/rules";
import { getPublicContactEmail } from "@/lib/env";
import { isWhatsAppCommunityInviteConfigured } from "@/lib/whatsapp-server";
import {
  WHATSAPP_COMMUNITY_GROUP_NAME,
  WHATSAPP_COMMUNITY_LAST_UPDATED,
  WHATSAPP_COMMUNITY_PAGE_PATH_TAMIL,
  WHATSAPP_COMMUNITY_GUIDE_PATH,
} from "@/lib/whatsapp-community";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { WhatsAppCommunityFaq } from "./whatsapp-community-faq";
import { WhatsAppCommunityStickyBar } from "./whatsapp-community-sticky-bar";
import { WhatsAppCommunityJoinLink } from "./whatsapp-community-join-link";

const joinBtnClass =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:brightness-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E]";

const JOIN_STEPS = [
  "Open this page on your phone (or scan a link we share on mychennaicity.in).",
  "Tap Join on WhatsApp — you will leave the browser and open the WhatsApp app.",
  "Confirm joining the group named my chennai city.",
  "Read the pinned rules and introduce yourself with your area if you like.",
  "Turn on mute if volume is high — admins post only Chennai-relevant updates.",
];

export function WhatsAppCommunityLanding() {
  const enabled = isWhatsAppCommunityInviteConfigured();
  const contactEmail = getPublicContactEmail();

  return (
    <div className={`${interiorMainClassName} pb-24 sm:pb-14`}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Chennai WhatsApp group" },
        ]}
      />

      {/* Hero */}
      <section aria-labelledby="wa-hero-heading">
        <p className="type-eyebrow text-[#128C7E]">WhatsApp community</p>
        <h1
          id="wa-hero-heading"
          className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl lg:text-[2.75rem]"
        >
          Join the My Chennai City WhatsApp Group
        </h1>
        <p
          id="wa-hero-lede"
          className="type-lede mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]"
        >
          Free moderated city-wide community —{" "}
          <strong className="text-[var(--foreground)]">{WHATSAPP_COMMUNITY_GROUP_NAME}</strong>.
          One official group for news, jobs, events, civic alerts, and neighbour help across
          Greater Chennai.
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-[var(--muted)]">
          {["Free", "All Chennai", "Moderated", "No spam"].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5"
            >
              {chip}
            </span>
          ))}
        </div>
        <p className="mt-6 flex flex-wrap items-center gap-4">
          {enabled ? (
            <WhatsAppCommunityJoinLink utmContent="hero" className={joinBtnClass}>
              Join on WhatsApp
            </WhatsAppCommunityJoinLink>
          ) : (
            <Link href="/contact" className={joinBtnClass}>
              Contact us — group opening soon
            </Link>
          )}
          <Link
            href={WHATSAPP_COMMUNITY_PAGE_PATH_TAMIL}
            className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            தமிழில் படிக்க →
          </Link>
        </p>
        <p className="mt-4 text-xs text-[var(--muted)]">
          Last updated {WHATSAPP_COMMUNITY_LAST_UPDATED}
        </p>
      </section>

      {/* What you get */}
      <section className="mt-14" aria-labelledby="wa-benefits-heading">
        <h2
          id="wa-benefits-heading"
          className="type-display text-2xl text-[var(--foreground)]"
        >
          What you get in the group
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHATSAPP_COMMUNITY_BENEFITS.map((b) => (
            <Link
              key={b.title}
              href={b.href}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[#128C7E]"
            >
              <h3 className="text-sm font-bold text-[var(--foreground)]">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {b.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Who should join */}
      <section className="mt-14" aria-labelledby="wa-who-heading">
        <h2 id="wa-who-heading" className="type-display text-2xl text-[var(--foreground)]">
          Who should join
        </h2>
        <ul className="type-lede mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
          <li>Residents, students, and workers anywhere in Greater Chennai</li>
          <li>People who want one trusted city-wide channel — not dozens of topic splinter groups</li>
          <li>Readers who already use mychennaicity.in for news, jobs, or events</li>
          <li>Neighbours willing to help with area-specific tips — civilly and with location context</li>
        </ul>
      </section>

      {/* Areas */}
      <section className="mt-14" aria-labelledby="wa-areas-heading">
        <h2 id="wa-areas-heading" className="type-display text-2xl text-[var(--foreground)]">
          Areas covered
        </h2>
        <p className="type-lede mt-2 max-w-2xl text-sm text-[var(--muted)]">
          City-wide means city-wide — from harbour belt and north corridors to OMR, GST Road,
          and western suburbs. Locality names readers search for:
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {WHATSAPP_COMMUNITY_LOCALITIES.map((loc) =>
            loc.href ? (
              <Link
                key={loc.label}
                href={loc.href}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
              >
                {loc.label}
              </Link>
            ) : (
              <span
                key={loc.label}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-semibold text-[var(--foreground)]"
              >
                {loc.label}
              </span>
            ),
          )}
        </div>
      </section>

      {/* How to join */}
      <section className="mt-14" aria-labelledby="wa-how-heading">
        <h2 id="wa-how-heading" className="type-display text-2xl text-[var(--foreground)]">
          How to join (5 steps)
        </h2>
        <ol className="mt-5 max-w-2xl space-y-3">
          {JOIN_STEPS.map((step, i) => (
            <li
              key={step}
              className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#128C7E] text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="text-[var(--muted)]">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Rules */}
      <section className="mt-14" aria-labelledby="wa-rules-heading">
        <h2 id="wa-rules-heading" className="type-display text-2xl text-[var(--foreground)]">
          Group rules
        </h2>
        <p className="type-lede mt-2 text-sm text-[var(--muted)]">
          Same rules are pinned in WhatsApp. Also see our{" "}
          <Link href="/community-guidelines" className="font-semibold text-[var(--accent)] hover:underline">
            community guidelines
          </Link>
          .
        </p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {WHATSAPP_COMMUNITY_RULES.map((rule) => (
            <li
              key={rule}
              className="flex gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--muted)]"
            >
              <span className="text-[#128C7E]" aria-hidden>
                ✓
              </span>
              {rule}
            </li>
          ))}
        </ul>
      </section>

      {/* Tamil summary */}
      <section
        className="mt-14 rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--accent)_6%,var(--surface))] p-6 sm:p-8"
        lang="ta"
        aria-labelledby="wa-tamil-heading"
      >
        <h2 id="wa-tamil-heading" className="type-display text-xl text-[var(--foreground)]">
          சென்னை வாட்ஸ்அப் குழு — சுருக்கம்
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          <strong className="text-[var(--foreground)]">my chennai city</strong> — சென்னை முழுவதும்
          உள்ள உறுப்பினர்களுக்கான இலவச, மிதமான WhatsApp குழு. செய்தி, வேலை, நிகழ்வுகள்,
          பொதுவான அறிவிப்புகள். English, தமிழ், Tanglish வரவேற்பு.
        </p>
        <p className="mt-4">
          <Link
            href={WHATSAPP_COMMUNITY_PAGE_PATH_TAMIL}
            className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            முழு தமிழ் பக்கம் →
          </Link>
        </p>
      </section>

      <WhatsAppCommunityFaq />

      {/* E-E-A-T */}
      <section className="mt-14" aria-labelledby="wa-team-heading">
        <h2 id="wa-team-heading" className="type-display text-2xl text-[var(--foreground)]">
          Who runs this group
        </h2>
        <p className="type-lede mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          The <strong className="text-[var(--foreground)]">mychennaicity.in</strong> editorial
          team moderates the official reader group. We are an independent Chennai local site —
          not government, not WhatsApp. Admins enforce the rules above and link back to verified
          reporting on the site. Questions:{" "}
          <Link href="/contact" className="font-semibold text-[var(--accent)] hover:underline">
            contact page
          </Link>{" "}
          or{" "}
          <Link href="/about" className="font-semibold text-[var(--accent)] hover:underline">
            about us
          </Link>
          .
        </p>
      </section>

      {/* Waitlist */}
      <section
        className="mt-14 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
        aria-labelledby="wa-waitlist-heading"
      >
        <h2 id="wa-waitlist-heading" className="type-display text-xl text-[var(--foreground)]">
          Group full? Join the waitlist
        </h2>
        <p className="type-lede mt-3 max-w-2xl text-sm text-[var(--muted)]">
          WhatsApp caps how many members a group can hold. If the join button says the group is
          full, email us
          {contactEmail ? (
            <>
              {" "}
              at{" "}
              <a
                href={`mailto:${contactEmail}?subject=Chennai%20WhatsApp%20waitlist`}
                className="font-semibold text-[var(--accent)] hover:underline"
              >
                {contactEmail}
              </a>
            </>
          ) : (
            " via the contact page"
          )}{" "}
          or message the admin WhatsApp on our{" "}
          <Link href="/contact" className="font-semibold text-[var(--accent)] hover:underline">
            contact page
          </Link>{" "}
          for 1:1 help. We will share the next opening or a vetted overflow channel.
        </p>
      </section>

      {/* Final CTA */}
      <section
        className="mt-14 rounded-2xl bg-gradient-to-r from-[#128C7E] to-[#25D366] p-8 text-center text-white"
        aria-labelledby="wa-final-cta"
      >
        <h2 id="wa-final-cta" className="type-display text-2xl">
          Ready to join Chennai&apos;s reader group?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-white/90">
          One tap opens WhatsApp. Official link only from mychennaicity.in.
        </p>
        {enabled ? (
          <p className="mt-6">
            <WhatsAppCommunityJoinLink
              utmContent="final"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-bold text-[#128C7E] shadow-md transition hover:bg-white/95"
            >
              Join on WhatsApp
            </WhatsAppCommunityJoinLink>
          </p>
        ) : null}
        <p className="mt-6 text-xs text-white/75">
          Not affiliated with WhatsApp LLC or Meta.{" "}
          <Link
            href={WHATSAPP_COMMUNITY_GUIDE_PATH}
            className="underline underline-offset-2 hover:text-white"
          >
            How to find trusted local groups
          </Link>
        </p>
      </section>

      <InteriorCrossNav />
      {enabled ? <WhatsAppCommunityStickyBar /> : null}
    </div>
  );
}
