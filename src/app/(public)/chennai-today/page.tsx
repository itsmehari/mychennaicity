import type { Metadata } from "next";
import Link from "next/link";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import { WhatsAppDraftBox } from "@/components/compulsive/whatsapp-draft-box";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { HubCommunityStrip } from "@/components/community/hub-community-strip";
import { WeekendWatchPin } from "@/components/site/weekend-watch-pin";
import { CHENNAI_TODAY_FAQ, CHENNAI_TODAY_PATH } from "@/content/compulsive/chennai-today";
import { CHENNAI_TODAY_TA_PATH } from "@/content/compulsive/chennai-today-ta";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import {
  buildWhatsAppAdminDraft,
  buildWhatsAppForward,
  loadChennaiTodayCard,
} from "@/lib/compulsive/load-chennai-today";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const revalidate = 300;

const titleSegment = "Chennai today in 60 seconds";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Chennai morning card — weather, gold, Metro note, one news headline, one upcoming event. Copy for WhatsApp.",
  alternates: {
    canonical: `${getSiteUrl()}${CHENNAI_TODAY_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${CHENNAI_TODAY_PATH}`,
      "ta-IN": `${getSiteUrl()}${CHENNAI_TODAY_TA_PATH}`,
      "x-default": `${getSiteUrl()}${CHENNAI_TODAY_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "Sixty seconds on Chennai — weather, gold, Metro, news, and what’s on.",
    url: `${getSiteUrl()}${CHENNAI_TODAY_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default async function ChennaiTodayPage() {
  const card = await loadChennaiTodayCard();
  const forward = buildWhatsAppForward(card, "en");
  const adminDraft = buildWhatsAppAdminDraft(card, "en");

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Chennai today" },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          Daily desk · IST
        </p>
        <h1 className="type-display mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Chennai today in 60 seconds
        </h1>
        <p className="type-lede mt-3 text-base leading-relaxed text-[var(--muted)]">
          One morning card for the WhatsApp forward — weather, gold, Metro, news, what’s on.
        </p>
        <p className="mt-2 text-xs text-[var(--muted)]">Updated {card.stamp}</p>
        <BilingualToggle enHref={CHENNAI_TODAY_PATH} taHref={CHENNAI_TODAY_TA_PATH} current="en" />
      </header>

      <HubCommunityStrip businessVariant="default" className="mt-6" />

      <div className="mt-6 max-w-3xl">
        <WeekendWatchPin lang="en" />
      </div>

      <section className="mt-8 max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <h2 className="text-lg font-bold text-[var(--foreground)]">60-second card</h2>
        <ul className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--muted)]">
          <li>
            <strong className="text-[var(--foreground)]">Weather.</strong> {card.weather}
          </li>
          {card.goldLine ? (
            <li>
              <strong className="text-[var(--foreground)]">Gold.</strong>{" "}
              <Link href="/chennai-gold-rate" className="font-semibold text-[var(--accent)] hover:underline">
                {card.goldLine}
              </Link>
            </li>
          ) : null}
          <li>
            <strong className="text-[var(--foreground)]">Metro.</strong> {card.metro}
          </li>
          <li>
            <strong className="text-[var(--foreground)]">News cue.</strong>{" "}
            <Link href={card.newsHref} className="font-semibold text-[var(--accent)] hover:underline">
              {card.newsTitle}
            </Link>
          </li>
          <li>
            <strong className="text-[var(--foreground)]">What’s on.</strong>{" "}
            <Link href={card.eventHref} className="font-semibold text-[var(--accent)] hover:underline">
              {card.eventTitle}
            </Link>
          </li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          <CopyShareButton hubId="chennai-today" label="Copy WhatsApp forward" buildText={() => forward} />
        </div>
        <WhatsAppDraftBox
          hubId="chennai-today"
          heading="Group-admin draft"
          hint="Paste into a neighbourhood group. Not an official alert — the live link stays current."
          copyLabel="Copy admin draft"
          draft={adminDraft}
        />
      </section>

      <article className="prose prose-sm mt-10 max-w-3xl text-[var(--muted)] prose-p:leading-relaxed prose-headings:text-[var(--foreground)] prose-strong:text-[var(--foreground)] prose-a:text-[var(--accent)]">
        <GuideDisclaimer kind="civic" />

        <h2>FAQ</h2>
        {CHENNAI_TODAY_FAQ.map((item) => (
          <div key={item.q}>
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}

        <h2>Related</h2>
        <ul>
          <li>
            <a href="/chennai-gold-rate">Chennai gold rate</a>
          </li>
          <li>
            <a href="/civic-tools">Civic tools</a>
          </li>
          <li>
            <a href={compulsivePath("petrol-vs-ev")}>Petrol vs EV cost calculator</a>
          </li>
          <li>
            <a href={compulsivePath("afford-area")}>Afford-this-area calculator</a>
          </li>
          <li>
            <a href={compulsivePath("which-chennai")}>Which Chennai are you?</a>
          </li>
          <li>
            <a href="/chennai-local-news/chennai-weekend-watch-independence-day-tax-rain-monday-august-2026">
              Weekend watch — I-Day, tax portal, rain
            </a>
          </li>
        </ul>

        <GuideFinePrint />
      </article>

      <InteriorCrossNav />
    </div>
  );
}
