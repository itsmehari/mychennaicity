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
          <WhatsAppCommunityJoinLink utmContent="hero-ta" className={joinBtnClass}>
            சேர கோரிக்கை
          </WhatsAppCommunityJoinLink>
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

        <section className="mt-12">
          <h2 className="type-display text-xl text-[var(--foreground)]">
            WhatsApp புதிய பட்டன்கள்
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            குழு முழுவதற்கும் அறிவிப்பு அனுப்பும், அல்லது சம்மதம் இல்லாத உறுப்பினரைக்
            காட்டும் பட்டனை இங்கே பயன்படுத்த வேண்டாம். அந்த பட்டனை அழுத்தியவர்தான் அதைத்
            திரும்பப் பெற வேண்டும்.
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
            <li>
              <strong className="text-[var(--foreground)]">Status டேக்.</strong> இந்த
              குழுவையோ உறுப்பினர்களையோ உங்கள் Status-ல் mention செய்ய வேண்டாம். குழுவை
              Status audience-ல் சேர்க்க வேண்டாம். நீங்கள் போட்ட Status-ஐ நீங்கள்தான்
              அழிக்க முடியும். அட்மின் வேறொருவரின் Status-ஐ அழிக்க முடியாது. மேலும் Status
              போடுவதால் டேக் நீங்காது. கேட்டவுடன் அந்த Status-ஐ அழியுங்கள்.
            </li>
            <li>
              <strong className="text-[var(--foreground)]">அழைப்பு, @everyone, Event, poll.</strong>{" "}
              இவை எல்லா தொலைபேசிகளுக்கும் அறிவிப்பு அனுப்பும். அட்மின் போடும் உண்மையான
              சென்னை அறிவிப்பைத் தவிர வேண்டாம்.
            </li>
            <li>
              <strong className="text-[var(--foreground)]">@Meta AI, UPI, view-once.</strong>{" "}
              குழுவில் @Meta AI அனுப்ப வேண்டாம். UPI collect, payment QR, request money
              வேண்டாம். view-once மீடியா வேண்டாம். மற்றவரின் live location பகிர வேண்டாம்.
            </li>
            <li>
              <strong className="text-[var(--foreground)]">உறுப்பினர் சேர்ப்பு.</strong>{" "}
              நேரடியாக யாரையும் சேர்க்க வேண்டாம். சேர கோரிக்கை படிவத்தை அனுப்புங்கள்.
              உறுப்பினர் பட்டியலை நகலெடுக்க வேண்டாம். இந்த குழுவை வேறு Community, Channel,
              அல்லது broadcast-ல் இணைக்க வேண்டாம்.
            </li>
            <li>
              <strong className="text-[var(--foreground)]">OTP / QR.</strong> WhatsApp
              அப்டேட் வந்தாலும் அட்மின் OTP, PIN, அல்லது QR கேட்க மாட்டார். கேட்டால் அது
              மோசடி.
            </li>
            <li>
              <strong className="text-[var(--foreground)]">திருத்தம்.</strong> வேலை, விலை,
              அல்லது தொலைபேசி எண்ணைப் போட்ட பிறகு அந்த செய்தியை edit செய்ய வேண்டாம். புதிய
              திருத்தம் அனுப்புங்கள்.
            </li>
          </ul>
        </section>

        <WhatsAppCommunityStickyBar />
      </div>
    </>
  );
}
