import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppCommunityJsonLd } from "@/components/community/whatsapp-community-json-ld";
import { WhatsAppCommunityJoinLink } from "@/components/community/whatsapp-community-join-link";
import { WhatsAppCommunityStickyBar } from "@/components/community/whatsapp-community-sticky-bar";
import {
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { WHATSAPP_COMMUNITY_RULES } from "@/content/whatsapp-community/rules";
import { getSiteUrl } from "@/lib/env";
import { isWhatsAppCommunityInviteConfigured } from "@/lib/whatsapp-server";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import {
  WHATSAPP_COMMUNITY_GEO_META,
  WHATSAPP_COMMUNITY_GROUP_NAME,
  WHATSAPP_COMMUNITY_OG_IMAGE,
  WHATSAPP_COMMUNITY_PAGE_PATH,
  WHATSAPP_COMMUNITY_PAGE_PATH_TAMIL,
  siteWhatsappCommunityPageUrl,
  siteWhatsappCommunityTamilPageUrl,
} from "@/lib/whatsapp-community";

const path = WHATSAPP_COMMUNITY_PAGE_PATH_TAMIL;
const titleSegment = "சென்னை வாட்ஸ்அப் குழு — my chennai city";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "சென்னை முழுவதும் உள்ள my chennai city அதிகாரப்பூர்வ WhatsApp குழுவில் சேருங்கள். செய்தி, வேலை, நிகழ்வுகள் — OMR, அடையார், தி நகர், அண்ணா நகர் உள்ளிட்ட அனைத்து பகுதிகளும்.",
  alternates: {
    canonical: `${getSiteUrl()}${path}`,
    languages: {
      "en-IN": siteWhatsappCommunityPageUrl(),
      "ta-IN": siteWhatsappCommunityTamilPageUrl(),
      "x-default": siteWhatsappCommunityPageUrl(),
    },
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "சென்னை city-wide WhatsApp குழு — இலவசம், மிதமானது, spam இல்லை.",
    url: `${getSiteUrl()}${path}`,
    locale: "ta_IN",
    alternateLocale: ["en_IN"],
    images: [{ url: WHATSAPP_COMMUNITY_OG_IMAGE, width: 1200, height: 630 }],
  },
  other: { ...WHATSAPP_COMMUNITY_GEO_META },
};

const joinBtnClass =
  "inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-md";

export default function ChennaiWhatsappGroupTamilPage() {
  const enabled = isWhatsAppCommunityInviteConfigured();

  return (
    <>
      <WhatsAppCommunityJsonLd page="ta" />
      <div className={`${interiorMainClassName} pb-24 sm:pb-14`} lang="ta">
        <PageBreadcrumbs
          items={[
            { label: "முகப்பு", href: "/" },
            { label: "சென்னை வாட்ஸ்அப் குழு" },
          ]}
        />
        <p className="type-eyebrow text-[#128C7E]">WhatsApp சமூகம்</p>
        <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
          சென்னை வாட்ஸ்அப் குழுவில் சேருங்கள்
        </h1>
        <p className="type-lede mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          <strong className="text-[var(--foreground)]">{WHATSAPP_COMMUNITY_GROUP_NAME}</strong> —
          சென்னை முழுவதும் ஒரே அதிகாரப்பூர்வ குழு. செய்தி, வேலைவாய்ப்பு, நிகழ்வுகள்,
          பொதுவான அறிவிப்புகள், அண்டை உதவி. இலவசம் · மிதமானது · spam இல்லை.
        </p>
        <p className="mt-6">
          {enabled ? (
            <WhatsAppCommunityJoinLink utmContent="hero-ta" className={joinBtnClass}>
              WhatsApp-ல் சேருங்கள்
            </WhatsAppCommunityJoinLink>
          ) : (
            <Link href="/contact" className={joinBtnClass}>
              தொடர்பு கொள்ளுங்கள்
            </Link>
          )}
        </p>
        <p className="mt-4 text-sm">
          <Link
            href={WHATSAPP_COMMUNITY_PAGE_PATH}
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            Read in English →
          </Link>
        </p>

        <section className="mt-12">
          <h2 className="type-display text-xl text-[var(--foreground)]">நன்மைகள்</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
            <li>சென்னை செய்தி மற்றும் GCC அறிவிப்புகள்</li>
            <li>OMR, அடையார், அண்ணா நகர் உள்ளிட்ட வேலை வாய்ப்புகள்</li>
            <li>விழா, meetup, weekend நிகழ்வுகள்</li>
            <li>பள்ளி, மருத்துவம், சேவை பரிந்துரைகள்</li>
            <li>பகுதி அடிப்படையிலான அண்டை உதவி — மரியாதையுடன்</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="type-display text-xl text-[var(--foreground)]">விதிகள் (சுருக்கம்)</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {WHATSAPP_COMMUNITY_RULES.slice(0, 6).map((rule) => (
              <li
                key={rule}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)]"
              >
                {rule}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <Link href={WHATSAPP_COMMUNITY_PAGE_PATH} className="text-[var(--accent)] hover:underline">
              முழு விதிகள் ஆங்கிலத்தில் →
            </Link>
          </p>
        </section>

        {enabled ? <WhatsAppCommunityStickyBar /> : null}
      </div>
    </>
  );
}
