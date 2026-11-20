import type { Metadata } from "next";
import Link from "next/link";
import { WhatsappJoinForm } from "@/components/community/whatsapp-join-form";
import { WhatsappJoinSuccessExtras } from "@/components/community/whatsapp-join-success-extras";
import { WhatsAppDeskButton } from "@/components/contact/whatsapp-desk-button";
import {
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import {
  WHATSAPP_COMMUNITY_GROUP_NAME,
  WHATSAPP_COMMUNITY_JOIN_PATH,
  WHATSAPP_COMMUNITY_OG_IMAGE,
  WHATSAPP_COMMUNITY_PAGE_PATH,
  sanitizeWhatsappJoinSource,
  whatsappCommunityJoinHref,
} from "@/lib/whatsapp-community";
import {
  whatsappApprovalHours,
  whatsappCommunityAccepting,
} from "@/lib/whatsapp-community-flags";
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
    ? "சென்னை வாட்ஸ்அப் குழுவில் சேர கோரிக்கை"
    : "Request to join the Chennai WhatsApp group";
  const description = ta
    ? "பெயர், வாட்ஸ்அப் எண், சென்னை பகுதியைப் பதிவு செய்யுங்கள். பிறகு எங்களுக்கு மெசேஜ் அனுப்புங்கள். குழு இணைப்பு அந்தப் பதிலில் மட்டுமே வரும்."
    : "Share your name, WhatsApp number, and Chennai area. Then message us on WhatsApp. The group link comes only in that reply.";
  return {
    title,
    description,
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

  return (
    <div className={interiorMainClassName}>
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
      <p className="type-eyebrow text-[#128C7E]">
        {ta ? "வாட்ஸ்அப் சமூகம்" : "WhatsApp community"}
      </p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        {unlocked
          ? waitlist
            ? ta
              ? "குழு நிறைந்துள்ளது"
              : "The group is full"
            : alreadyApproved
              ? ta
                ? "நீங்கள் ஏற்கனவே உள்ளீர்கள்"
                : "You are already in"
              : ta
                ? "குழு இணைப்புக்கு மெசேஜ் அனுப்புங்கள்"
                : "Message us for the group link"
          : ta
            ? whatsappCommunityAccepting()
              ? "சென்னை குழுவில் சேர கோரிக்கை"
              : "சென்னை குழு காத்திருப்பு பட்டியல்"
            : whatsappCommunityAccepting()
              ? "Request to join the Chennai group"
              : "Join the Chennai WhatsApp waitlist"}
      </h1>
      <p id="wa-join-lede" className="type-lede mt-4 max-w-2xl text-base text-[var(--muted)]">
        {unlocked ? (
          waitlist ? (
            ta ? (
              <>
                வணக்கம் {unlocked.name}. குழு இப்போது நிறைந்துள்ளது. உங்கள் எண்
                காத்திருப்பு பட்டியலில் உள்ளது. இடம் கிடைத்ததும் நிர்வாகி தொடர்பு
                கொள்வார்.
              </>
            ) : (
              <>
                Hello {unlocked.name}. The group is full right now. Your number is
                on the waitlist. An admin will write when a seat opens.
              </>
            )
          ) : ta ? (
            <>
              வணக்கம் {unlocked.name}. இந்தப் படி கட்டாயம். கீழே உள்ள பொத்தானைத்
              தட்டி, திறக்கும் செய்தியை அனுப்புங்கள். குழு இணைப்பு அந்த அரட்டையில்
              மட்டுமே வரும். பிறகு Join தட்டவும். நிர்வாகி வாட்ஸ்அப்பில் அனுமதிப்பார்.
            </>
          ) : (
            <>
              Hello {unlocked.name}. This step is required. Tap the button, send
              the message that opens, and keep the chat open. The group link
              comes only in our reply. Then tap Join. An admin approves you
              inside WhatsApp.
            </>
          )
        ) : ta ? (
          <>
            <strong className="text-[var(--foreground)]">{WHATSAPP_COMMUNITY_GROUP_NAME}</strong>{" "}
            குழு இணைப்பு இந்தப் பக்கத்தில் வராது. பெயர், எண், பகுதியை அனுப்பிய
            பிறகு எங்கள் எண்ணுக்கு மெசேஜ் அனுப்ப வேண்டும்.
          </>
        ) : (
          <>
            The{" "}
            <strong className="text-[var(--foreground)]">{WHATSAPP_COMMUNITY_GROUP_NAME}</strong>{" "}
            link is not on this page. After you send your name, number, and area,
            you must message us on WhatsApp. Admins approve real neighbours. This
            page does not approve you by itself.
          </>
        )}
      </p>

      {unlocked ? (
        <div className="mt-8 max-w-xl rounded-2xl border border-[color-mix(in_srgb,#25D366_35%,var(--border))] bg-[color-mix(in_srgb,var(--surface)_88%,#25D366_8%)] p-5 sm:p-6">
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
        />
      )}
    </div>
  );
}
