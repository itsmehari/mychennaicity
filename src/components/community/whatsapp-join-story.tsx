import Link from "next/link";
import { WhatsAppCommunityFaq } from "@/components/community/whatsapp-community-faq";
import {
  WHATSAPP_JOIN_AEO_PASSAGE,
  WHATSAPP_JOIN_AEO_PASSAGE_TA,
  WHATSAPP_JOIN_BEHAVIOUR,
  WHATSAPP_JOIN_DOORS,
  whatsappJoinPageFaq,
} from "@/content/whatsapp-community/join-page-copy";
import {
  WHATSAPP_COMMUNITY_GROUP_NAME,
  WHATSAPP_COMMUNITY_PAGE_PATH,
  WHATSAPP_COMMUNITY_PAGE_PATH_TAMIL,
} from "@/lib/whatsapp-community";

export function WhatsappJoinStory({ lang }: { lang: "en" | "ta" }) {
  const ta = lang === "ta";
  return (
    <div className="wa-join-story">
      <p className="type-eyebrow text-[#128C7E]">
        {ta ? "அதிகாரப்பூர்வ சென்னை சமூகம்" : "Official Chennai community"}
      </p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        {ta
          ? "உங்களை அறிமுகப்படுத்துங்கள். பிறகு குழு இணைப்பு வரும்."
          : "Introduce yourself. Then we send the group link."}
      </h1>
      <p id="wa-join-aeo" className="type-lede mt-4 text-base text-[var(--muted)]">
        {ta ? WHATSAPP_JOIN_AEO_PASSAGE_TA : WHATSAPP_JOIN_AEO_PASSAGE}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-[var(--foreground)]">
        {ta ? (
          <>
            <strong>{WHATSAPP_COMMUNITY_GROUP_NAME}</strong> சென்னை முழுவதும் ஒரே
            மிதமான வாட்ஸ்அப் குழு. பெயர், எண், பகுதி இருந்தால் நிர்வாகி உண்மையான
            அண்டையை அனுமதிக்க முடியும்.
          </>
        ) : (
          <>
            <strong>{WHATSAPP_COMMUNITY_GROUP_NAME}</strong> is one moderated
            WhatsApp group for Greater Chennai. A name, a number, and an area let
            an admin approve a real neighbour.
          </>
        )}
      </p>
      <ol className="mt-6 space-y-3 text-sm text-[var(--foreground)]">
        {(ta
          ? [
              "வாட்ஸ்அப் பெயர், எண், சென்னை பகுதியைப் பதிவு செய்யுங்கள்.",
              "திறக்கும் அரட்டையில் செய்தியை அனுப்புங்கள். இணைப்பு அந்தப் பதிலில் வரும்.",
              "Join தட்டவும். நிர்வாகி எண்ணைப் பொருத்தி அனுமதிப்பார்.",
            ]
          : [
              "Save your WhatsApp name, number, and Chennai area.",
              "Send the chat that opens. The group link comes only in the reply.",
              "Tap Join. An admin matches the number and approves you.",
            ]
        ).map((step, index) => (
          <li key={step} className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-xs font-bold text-white">
              {index + 1}
            </span>
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
      <ul className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-[var(--foreground)]">
        {(ta ? ["இலவசம்", "கிரிப்டோ வேண்டாம்", "முழு சென்னை"] : ["Free", "No crypto", "All Chennai"]).map(
          (chip) => (
            <li
              key={chip}
              className="rounded-full border border-[color-mix(in_srgb,#25D366_45%,var(--border))] bg-[color-mix(in_srgb,#25D366_12%,var(--surface))] px-3 py-1"
            >
              {chip}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export function WhatsappJoinGuide({ lang }: { lang: "en" | "ta" }) {
  const ta = lang === "ta";
  const rulesHref = ta ? WHATSAPP_COMMUNITY_PAGE_PATH_TAMIL : WHATSAPP_COMMUNITY_PAGE_PATH;
  return (
    <div className="mt-14 space-y-14">
      <section aria-labelledby="wa-join-behaviour">
        <h2 id="wa-join-behaviour" className="type-display text-2xl text-[var(--foreground)]">
          {ta ? "குழுவில் எதிர்பார்க்கும் நடத்தை" : "Expected behaviour in the group"}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          {ta
            ? "சேரும் முன் இதைப் படியுங்கள். முழு பட்டியல் விதிகள் பக்கத்தில் உள்ளது."
            : "Read this before you join. The full list is on the rules page."}
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {WHATSAPP_JOIN_BEHAVIOUR.map((row) => (
            <li
              key={row.en}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)]"
            >
              {ta ? row.ta : row.en}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href={rulesHref} className="font-semibold text-[var(--accent)] hover:underline">
            {ta ? "முழு குழு விதிகள்" : "Full group rules"}
          </Link>
        </p>
      </section>

      <section aria-labelledby="wa-join-doors">
        <h2 id="wa-join-doors" className="type-display text-2xl text-[var(--foreground)]">
          {ta ? "குழு ஒரு வாசல். தளம் அடுத்த வாசல்." : "The group is one door. The site is next door."}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          {ta
            ? "அனுமதி வரும் வரை இங்கே பாருங்கள். அரட்டை மனிதர்களுக்காக."
            : "Browse while you wait, so the chat stays for people."}
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {WHATSAPP_JOIN_DOORS.map((door) => (
            <li key={door.href}>
              <Link
                href={door.href}
                className="block h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[#128C7E]"
              >
                <h3 className="text-sm font-bold text-[var(--foreground)]">
                  {ta ? door.ta : door.en}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{ta ? door.taBody : door.enBody}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <WhatsAppCommunityFaq items={whatsappJoinPageFaq(lang)} lang={lang} />
    </div>
  );
}
