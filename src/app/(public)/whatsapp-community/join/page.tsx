import type { Metadata } from "next";
import Link from "next/link";
import { WhatsappJoinForm } from "@/components/community/whatsapp-join-form";
import { WhatsappJoinGuide, WhatsappJoinStory } from "@/components/community/whatsapp-join-story";
import { WhatsappJoinSuccessExtras } from "@/components/community/whatsapp-join-success-extras";
import { WhatsAppDeskButton } from "@/components/contact/whatsapp-desk-button";
import {
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import { whatsappJoinPageFaq } from "@/content/whatsapp-community/join-page-copy";
import {
  WHATSAPP_COMMUNITY_GEO_META,
  WHATSAPP_COMMUNITY_JOIN_PATH,
  WHATSAPP_COMMUNITY_OG_IMAGE,
  WHATSAPP_COMMUNITY_PAGE_PATH,
  sanitizeWhatsappJoinSource,
  whatsappCommunityJoinHref,
} from "@/lib/whatsapp-community";
import { whatsappApprovalHours } from "@/lib/whatsapp-community-flags";
import { whatsappRequestCtaLabel } from "@/lib/whatsapp-link";
import { whatsappJoinDeskPrefill, whatsappJoinLocalities } from "@/lib/whatsapp-join";
import { readJoinUnlock } from "@/lib/whatsapp-join-session";
import { whatsappJoinQueryNoindex } from "@/lib/whatsapp-join-seo";

export const dynamic = "force-dynamic";

type Search = {
  lang?: string;
  ok?: string;
  src?: string;
  already?: string;
  waitlist?: string;
  partner?: string;
  placement?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Search>;
}): Promise<Metadata> {
  const params = await searchParams;
  const ta = params.lang === "ta";
  const queryNoindex = whatsappJoinQueryNoindex(params);
  const title = ta
    ? "சென்னை வாட்ஸ்அப் குழுவில் சேருங்கள்"
    : "Join the Chennai WhatsApp group";
  const description = ta
    ? "my chennai city இலவச சென்னை வாட்ஸ்அப் குழு. பெயர், எண், பகுதியைப் பதிவு செய்து எங்களுக்கு மெசேஜ் அனுப்புங்கள். இணைப்பு அந்தப் பதிலில் மட்டுமே."
    : "Join the free my chennai city WhatsApp group for Chennai news, jobs, and events. Save your name, number, and area, then message us. The link comes only in that reply.";
  return {
    title,
    description,
    other: WHATSAPP_COMMUNITY_GEO_META,
    alternates: { canonical: `${getSiteUrl()}${WHATSAPP_COMMUNITY_JOIN_PATH}` },
    openGraph: {
      title: fullSiteTitle(title),
      description,
      url: `${getSiteUrl()}${WHATSAPP_COMMUNITY_JOIN_PATH}`,
      locale: ta ? "ta_IN" : "en_IN",
      images: [{ url: WHATSAPP_COMMUNITY_OG_IMAGE, width: 1200, height: 630 }],
    },
    robots: queryNoindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

export default async function WhatsappCommunityJoinPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const params = await searchParams;
  const lang = params.lang === "ta" ? "ta" : "en";
  const ta = lang === "ta";
  const source = sanitizeWhatsappJoinSource(params.src);
  const unlocked = params.ok === "1" ? await readJoinUnlock() : null;
  const alreadyApproved = params.already === "1";
  const waitlist = false;
  const switchHref = whatsappCommunityJoinHref(source).replace(
    "?",
    ta ? "?lang=en&" : "?lang=ta&",
  );
  const pageUrl = `${getSiteUrl()}${WHATSAPP_COMMUNITY_JOIN_PATH}`;
  const faq = whatsappJoinPageFaq(lang);
  const showIndexableGraph = !whatsappJoinQueryNoindex(params);

  return (
    <div className={interiorMainClassName}>
      {showIndexableGraph ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebPage",
                  "@id": `${pageUrl}#webpage`,
                  url: pageUrl,
                  name: "Join the Chennai WhatsApp group",
                  description:
                    "Request page for the free my chennai city WhatsApp group. The group link is sent only after you message the desk.",
                  inLanguage: "en-IN",
                  isPartOf: { "@type": "WebSite", name: "mychennaicity.in", url: getSiteUrl() },
                  about: {
                    "@type": "Place",
                    name: "Chennai",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "Chennai",
                      addressRegion: "Tamil Nadu",
                      addressCountry: "IN",
                    },
                    geo: {
                      "@type": "GeoCoordinates",
                      latitude: 13.0827,
                      longitude: 80.2707,
                    },
                  },
                  speakable: {
                    "@type": "SpeakableSpecification",
                    cssSelector: ["#wa-join-aeo", "#wa-join-behaviour"],
                  },
                },
                {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: getSiteUrl() },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Group rules",
                      item: `${getSiteUrl()}${WHATSAPP_COMMUNITY_PAGE_PATH}`,
                    },
                    { "@type": "ListItem", position: 3, name: "Join", item: pageUrl },
                  ],
                },
                {
                  "@type": "FAQPage",
                  mainEntityOfPage: { "@id": `${pageUrl}#wa-faq-heading` },
                  mainEntity: faq.map((item) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: { "@type": "Answer", text: item.answer },
                  })),
                },
              ],
            }),
          }}
        />
      ) : null}
      <PageBreadcrumbs
        items={[
          { label: ta ? "முகப்பு" : "Home", href: "/" },
          {
            label: ta ? "விதிகள்" : "Group rules",
            href: WHATSAPP_COMMUNITY_PAGE_PATH,
          },
          { label: whatsappRequestCtaLabel(ta ? "ta" : "en") },
        ]}
      />

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-14">
        <div
          className={
            unlocked
              ? ""
              : "order-2 lg:sticky lg:top-24 lg:order-1 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain"
          }
        >
          {unlocked ? (
        <div className="rounded-3xl border border-[color-mix(in_srgb,#25D366_35%,var(--border))] bg-[color-mix(in_srgb,var(--surface)_88%,#25D366_8%)] p-5 shadow-sm sm:p-6">
          <h1 className="type-display text-3xl text-[var(--foreground)]">
            {alreadyApproved
              ? ta
                ? "நீங்கள் ஏற்கனவே உள்ளீர்கள்"
                : "You are already in"
              : ta
                ? "குழு இணைப்புக்கு மெசேஜ் அனுப்புங்கள்"
                : "Message us for the group link"}
          </h1>
          <p className="type-lede mt-4 text-base text-[var(--muted)]">
            {ta ? (
              <>
                வணக்கம் {unlocked.name}. இந்தப் படி கட்டாயம். பொத்தானைத் தட்டி,
                திறக்கும் செய்தியை அனுப்புங்கள். குழு இணைப்பு அந்த அரட்டையில் மட்டுமே
                வரும்.
              </>
            ) : (
              <>
                Hello {unlocked.name}. This step is required. Tap the button, send
                the message that opens, and keep the chat open. The group link
                comes only in our reply.
              </>
            )}
          </p>
          <p className="text-sm text-[var(--muted)]">{unlocked.phone}</p>
          {waitlist ? (
            <p className="mt-4 text-sm text-[var(--foreground)]">
              {ta
                ? "கோரிக்கை சேமிக்கப்பட்டது. இடம் திறந்ததும் பதில் வரும்."
                : "Your request is saved. We reply when a seat opens."}
            </p>
          ) : (
            <div className="mt-4">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                {ta ? "கட்டாயப் படி" : "Required step"}
              </p>
              <div className="mt-3">
                <WhatsAppDeskButton
                  source="join_required"
                  text={whatsappJoinDeskPrefill(unlocked.name, unlocked.locality)}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white"
                >
                  {ta ? "குழு இணைப்புக்கு மெசேஜ் அனுப்புங்கள்" : "Message us for the group link"}
                </WhatsAppDeskButton>
              </div>
              <p className="mt-3 text-sm text-[var(--foreground)]">
                {ta
                  ? "செய்தியை அனுப்புங்கள். அரட்டையை மூடாதீர்கள். இணைப்பை அந்தப் பதிலில் மட்டுமே அனுப்புவோம்."
                  : "Send the message. Keep the chat open. We send the link only in that reply."}
              </p>
            </div>
          )}
          <WhatsappJoinSuccessExtras
            lang={lang}
            alreadyApproved={alreadyApproved}
            waitlist={waitlist}
            name={unlocked.name}
            locality={unlocked.locality}
            approvalHours={whatsappApprovalHours()}
          />
          <p className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link
              href={`${WHATSAPP_COMMUNITY_JOIN_PATH}?ok=1&lang=${ta ? "en" : "ta"}&src=${source}`}
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              {ta ? "English" : "தமிழ்"}
            </Link>
            <Link
              href={WHATSAPP_COMMUNITY_PAGE_PATH}
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              {ta ? "குழு விதிகளைப் படிக்கவும்" : "Read the group rules"}
            </Link>
          </p>
        </div>
          ) : (
            <WhatsappJoinForm
                lang={lang}
                source={source}
                localities={whatsappJoinLocalities()}
                switchHref={switchHref}
                partner={params.partner}
                placement={params.placement}
                utmSource={params.utm_source}
                utmMedium={params.utm_medium}
                utmCampaign={params.utm_campaign}
                heading={whatsappRequestCtaLabel(ta ? "ta" : "en")}
              />
          )}
        </div>
        {unlocked ? null : (
          <div className="order-1 lg:order-2">
            <WhatsappJoinStory lang={lang} />
          </div>
        )}
      </div>
      <WhatsappJoinGuide lang={lang} />
    </div>
  );
}
