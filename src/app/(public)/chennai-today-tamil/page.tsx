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
import { CHENNAI_TODAY_PATH } from "@/content/compulsive/chennai-today";
import {
  CHENNAI_TODAY_FAQ_TA,
  CHENNAI_TODAY_METRO_NOTE_TA,
  CHENNAI_TODAY_TA_PATH,
} from "@/content/compulsive/chennai-today-ta";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import {
  buildWhatsAppAdminDraft,
  buildWhatsAppForward,
  loadChennaiTodayCard,
} from "@/lib/compulsive/load-chennai-today";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const dynamic = "force-dynamic";

const titleSegment = "சென்னை இன்று — 60 வினாடிகள்";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "சென்னை காலை அட்டை — வானிலை, தங்கம், மெட்ரோ, ஒரு செய்தி, ஒரு நிகழ்வு. வாட்ஸ்அப்பில் பகிர.",
  alternates: {
    canonical: `${getSiteUrl()}${CHENNAI_TODAY_TA_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${CHENNAI_TODAY_PATH}`,
      "ta-IN": `${getSiteUrl()}${CHENNAI_TODAY_TA_PATH}`,
      "x-default": `${getSiteUrl()}${CHENNAI_TODAY_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "சென்னை இன்று 60 வினாடிகள் — வானிலை, தங்கம், மெட்ரோ, செய்தி, நிகழ்வு.",
    url: `${getSiteUrl()}${CHENNAI_TODAY_TA_PATH}`,
    locale: "ta_IN",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default async function ChennaiTodayTamilPage() {
  const card = await loadChennaiTodayCard();
  const forward = buildWhatsAppForward(card, "ta");
  const adminDraft = buildWhatsAppAdminDraft(card, "ta");

  return (
    <div className={interiorMainClassName} lang="ta">
      <PageBreadcrumbs
        items={[
          { label: "முகப்பு", href: "/" },
          { label: "சென்னை இன்று" },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          தினசரி மேசை · IST
        </p>
        <h1 className="type-display mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          சென்னை இன்று — 60 வினாடிகள்
        </h1>
        <p className="type-lede mt-3 text-base leading-relaxed text-[var(--muted)]">
          காலை வாட்ஸ்அப் முன்னனுப்புதலுக்கு ஒரே அட்டை — வானிலை, தங்கம், மெட்ரோ, செய்தி, நிகழ்வு.
        </p>
        <p className="mt-2 text-xs text-[var(--muted)]">புதுப்பிப்பு {card.stamp}</p>
        <BilingualToggle enHref={CHENNAI_TODAY_PATH} taHref={CHENNAI_TODAY_TA_PATH} current="ta" />
      </header>

      <HubCommunityStrip businessVariant="default" className="mt-6" />

      <div className="mt-6 max-w-3xl">
        <WeekendWatchPin lang="ta" />
      </div>

      <section className="mt-8 max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <h2 className="text-lg font-bold text-[var(--foreground)]">60 வினாடி அட்டை</h2>
        <ul className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--muted)]">
          <li>
            <strong className="text-[var(--foreground)]">வானிலை.</strong> {card.weather}
          </li>
          {card.goldLine ? (
            <li>
              <strong className="text-[var(--foreground)]">தங்கம்.</strong>{" "}
              <Link href="/chennai-gold-rate" className="font-semibold text-[var(--accent)] hover:underline">
                {card.goldLine}
              </Link>
            </li>
          ) : null}
          <li>
            <strong className="text-[var(--foreground)]">மெட்ரோ.</strong> {CHENNAI_TODAY_METRO_NOTE_TA}
          </li>
          <li>
            <strong className="text-[var(--foreground)]">செய்தி.</strong>{" "}
            <Link href={card.newsHref} className="font-semibold text-[var(--accent)] hover:underline">
              {card.newsTitle}
            </Link>
          </li>
          <li>
            <strong className="text-[var(--foreground)]">நிகழ்வு.</strong>{" "}
            <Link href={card.eventHref} className="font-semibold text-[var(--accent)] hover:underline">
              {card.eventTitle}
            </Link>
          </li>
        </ul>
        <div className="mt-5">
          <CopyShareButton hubId="chennai-today" label="வாட்ஸ்அப் முன்னனுப்புதல் நகலெடு" text={forward} />
        </div>
        <WhatsAppDraftBox
          hubId="chennai-today"
          heading="குழு நிர்வாகி வரைவு"
          hint="அண்டை குழுவில் ஒட்டிவிடலாம். அவசர அறிவிப்பு அல்ல — நேரடி இணைப்பு புதுப்பிக்கப்படும்."
          copyLabel="நிர்வாகி வரைவை நகலெடு"
          draft={adminDraft}
        />
      </section>

      <article className="prose prose-sm mt-10 max-w-3xl text-[var(--muted)] prose-p:leading-relaxed prose-headings:text-[var(--foreground)] prose-strong:text-[var(--foreground)] prose-a:text-[var(--accent)]">
        <GuideDisclaimer kind="civic" />

        <h2>கேள்விகள்</h2>
        {CHENNAI_TODAY_FAQ_TA.map((item) => (
          <div key={item.q}>
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}

        <h2>தொடர்புடையவை</h2>
        <ul>
          <li>
            <a href="/chennai-gold-rate">சென்னை தங்க விலை</a>
          </li>
          <li>
            <a href={compulsivePath("afford-area")}>இந்த பகுதி தாங்கும் செலவா?</a>
          </li>
          <li>
            <a href="/guides/which-chennai-are-you-tamil">நீங்கள் எந்த சென்னை?</a>
          </li>
          <li>
            <a href="/civic-tools">குடிமை கருவிகள்</a>
          </li>
          <li>
            <a href="/chennai-local-news/chennai-weekend-watch-independence-day-tax-rain-monday-august-2026-tamil">
              வார இறுதிப் பட்டியல் — சுதந்திர தினம், வரி, மழை
            </a>
          </li>
        </ul>

        <GuideFinePrint />
      </article>

      <InteriorCrossNav />
    </div>
  );
}
