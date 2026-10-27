import type { Metadata } from "next";
import Link from "next/link";
import { WhatsappJoinForm } from "@/components/community/whatsapp-join-form";
import { WhatsappJoinQr } from "@/components/community/whatsapp-join-qr";
import {
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import {
  WHATSAPP_COMMUNITY_GROUP_NAME,
  WHATSAPP_COMMUNITY_JOIN_PATH,
  WHATSAPP_COMMUNITY_PAGE_PATH,
  sanitizeWhatsappJoinSource,
  whatsappCommunityJoinHref,
} from "@/lib/whatsapp-community";
import { whatsappJoinLocalities } from "@/lib/whatsapp-join";
import { readJoinUnlock } from "@/lib/whatsapp-join-session";
import { trackedWhatsappCommunityInvite } from "@/lib/whatsapp-server";

export const dynamic = "force-dynamic";

type Search = { lang?: string; ok?: string; src?: string };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Search>;
}): Promise<Metadata> {
  const params = await searchParams;
  const ta = params.lang === "ta";
  const title = ta
    ? "சென்னை வாட்ஸ்அப் குழுவில் சேர கோரிக்கை"
    : "Request to join the Chennai WhatsApp group";
  const description = ta
    ? "பெயர், வாட்ஸ்அப் எண், சென்னை பகுதியைப் பதிவு செய்த பிறகு குழு இணைப்பு கிடைக்கும்."
    : "Share your name, WhatsApp number, and Chennai area. The group link appears only after you submit.";
  return {
    title,
    description,
    alternates: { canonical: `${getSiteUrl()}${WHATSAPP_COMMUNITY_JOIN_PATH}` },
    openGraph: {
      title: fullSiteTitle(title),
      description,
      url: `${getSiteUrl()}${WHATSAPP_COMMUNITY_JOIN_PATH}`,
      locale: ta ? "ta_IN" : "en_IN",
    },
    robots: { index: true, follow: true },
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
  const invite = unlocked
    ? trackedWhatsappCommunityInvite("join-verified", "join_form")
    : null;
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
          { label: ta ? "சேர கோரிக்கை" : "Request to join" },
        ]}
      />
      <p className="type-eyebrow text-[#128C7E]">
        {ta ? "வாட்ஸ்அப் சமூகம்" : "WhatsApp community"}
      </p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        {unlocked
          ? ta
            ? "குழு இணைப்பு தயார்"
            : "Your group link is ready"
          : ta
            ? "சென்னை குழுவில் சேர கோரிக்கை"
            : "Request to join the Chennai group"}
      </h1>
      <p id="wa-join-lede" className="type-lede mt-4 max-w-2xl text-base text-[var(--muted)]">
        {unlocked ? (
          ta ? (
            <>
              வணக்கம் {unlocked.name}. அடுத்து வாட்ஸ்அப்பில் Join தட்டவும். நிர்வாகி
              உங்கள் எண்ணைப் பார்த்து அனுமதிப்பார்.
            </>
          ) : (
            <>
              Hello {unlocked.name}. Open WhatsApp and tap Join. An admin matches
              your number, then approves you inside WhatsApp.
            </>
          )
        ) : ta ? (
          <>
            <strong className="text-[var(--foreground)]">{WHATSAPP_COMMUNITY_GROUP_NAME}</strong>{" "}
            குழு இணைப்பு, பெயர், எண், பகுதி ஆகியவற்றை அனுப்பிய பிறகு மட்டுமே தெரியும்.
          </>
        ) : (
          <>
            The{" "}
            <strong className="text-[var(--foreground)]">{WHATSAPP_COMMUNITY_GROUP_NAME}</strong>{" "}
            link stays hidden until you send your name, number, and area. Admins
            approve real neighbours. This page does not approve you by itself.
          </>
        )}
      </p>

      {unlocked ? (
        <div className="mt-8 max-w-xl rounded-2xl border border-[color-mix(in_srgb,#25D366_35%,var(--border))] bg-[color-mix(in_srgb,var(--surface)_88%,#25D366_8%)] p-5 sm:p-6">
          <p className="text-sm text-[var(--muted)]">{unlocked.phone}</p>
          {invite ? (
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={invite}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white"
              >
                {ta ? "வாட்ஸ்அப்பில் சேருங்கள்" : "Join on WhatsApp"}
              </a>
              <div className="hidden min-[420px]:block">
                <WhatsappJoinQr url={invite} />
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-[var(--foreground)]">
              {ta
                ? "கோரிக்கை சேமிக்கப்பட்டது. குழு இணைப்பு இன்னும் இந்தப் பக்கத்தில் இல்லை. நிர்வாகி வாட்ஸ்அப்பில் தொடர்பு கொள்வார்."
                : "Your request is saved. The group link is not on this page yet. An admin can message you on WhatsApp once it is turned on."}
            </p>
          )}
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
        />
      )}
    </div>
  );
}
