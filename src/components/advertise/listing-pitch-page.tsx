import Link from "next/link";
import { WhatsAppDeskButton } from "@/components/contact/whatsapp-desk-button";
import {
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import {
  propertyPackageSentence,
  type ListingPitchSample,
} from "@/content/advertise-listings";
import { CONTACT_CHANNELS } from "@/lib/contact-channels";
import {
  ADVERTISE_JOBS_PATH,
  ADVERTISE_JOBS_TAMIL_PATH,
  ADVERTISE_PROPERTY_PATH,
  ADVERTISE_PROPERTY_TAMIL_PATH,
} from "@/lib/routes/advertise-listings";
import { getBusinessWhatsAppCopy } from "@/lib/whatsapp-cta-copy";

type PitchKind = "jobs" | "property";
type PitchLocale = "en" | "ta";

const jobsChannel = CONTACT_CHANNELS.find((c) => c.id === "jobs");
const propertyChannel = CONTACT_CHANNELS.find((c) => c.id === "property");

export function ListingPitchPage({
  kind,
  locale,
  samples,
}: {
  kind: PitchKind;
  locale: PitchLocale;
  samples: ListingPitchSample[];
}) {
  const ta = locale === "ta";
  const channel = kind === "jobs" ? jobsChannel : propertyChannel;
  const wa = getBusinessWhatsAppCopy(kind === "jobs" ? "jobs" : "property");
  const twin =
    kind === "jobs"
      ? ta
        ? { href: ADVERTISE_JOBS_PATH, label: "English" }
        : { href: ADVERTISE_JOBS_TAMIL_PATH, label: "தமிழ்" }
      : ta
        ? { href: ADVERTISE_PROPERTY_PATH, label: "English" }
        : { href: ADVERTISE_PROPERTY_TAMIL_PATH, label: "தமிழ்" };
  const board =
    kind === "jobs"
      ? { href: "/chennai-jobs", label: ta ? "வேலைப் பட்டியல்" : "Open jobs" }
      : {
          href: "/chennai-classifieds?category=property",
          label: ta ? "சொத்து விளம்பரங்கள்" : "Property ads",
        };
  const contactHref = kind === "jobs" ? "/contact#jobs" : "/contact#property";

  const title =
    kind === "jobs"
      ? ta
        ? "சென்னையில் வேலை விளம்பரம் போட"
        : "Post a job in Chennai"
      : ta
        ? "சென்னையில் சொத்து விளம்பரம் போட"
        : "Post a property in Chennai";
  const titleLead =
    kind === "jobs"
      ? ta
        ? "வேலை விளம்பரம் போட"
        : "Post a job in"
      : ta
        ? "சொத்து விளம்பரம் போட"
        : "Post a property in";
  const titleAccent = ta ? "சென்னையில்" : "Chennai";

  const lede =
    kind === "jobs"
      ? ta
        ? "பதவி, நிறுவனம், பகுதி, விண்ணப்ப இணைப்பு ஆகியவற்றை அனுப்புங்கள். நாங்களே பதிவை வைக்கிறோம். முதலாளி உள்நுழைவு இல்லை. விண்ணப்பம் உங்கள் இணைப்பிலேயே நடக்கும்."
        : "Send the role, company, area, and the link where candidates should apply. We place the listing. There is no employer login. Candidates apply on your link."
      : ta
        ? "விற்பனை, வாடகை, மனை, வணிக இடம். புகைப்படம், பகுதி, விலை, அளவு, தொலைபேசி எண் அனுப்புங்கள். நாங்களே விளம்பரத்தை வைக்கிறோம். உள்நுழைவு இல்லை."
        : "Sale, rent, plot, or commercial. Send photos, area, price, size, and a phone number. We place the ad. There is no login.";

  const checklist = ta
    ? kind === "jobs"
      ? [
          "பதவிப் பெயரும் நிறுவனப் பெயரும்",
          "பகுதி / வேலை முறை (அலுவலகம், கலப்பு, தொலைதூரம்)",
          "விண்ணப்ப இணைப்பு அல்லது மின்னஞ்சல்",
          "சம்பள வரம்பு, காட்ட விரும்பினால்",
        ]
      : [
          "விற்பனை, வாடகை, மனை, அல்லது வணிகம்",
          "பகுதியும் அடையாளமும்",
          "விலையும் அளவும்",
          "தொலைபேசி எண்",
          "அதே WhatsApp அரட்டையில் புகைப்படங்கள்",
        ]
    : (channel?.checklist ?? []);

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: ta ? "முகப்பு" : "Home", href: "/" },
          { label: title },
        ]}
      />
      <section className="mt-6 overflow-hidden rounded-[28px] bg-[#0e1324] px-5 py-8 text-white shadow-[0_24px_60px_rgba(14,19,36,0.18)] sm:px-8 sm:py-10">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#b7b4ff] uppercase">
          {kind === "jobs" ? (ta ? "வேலைகள்" : "Jobs") : ta ? "சொத்து" : "Property"}
        </p>
        <h1 className="mt-3 max-w-xl text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">
          {ta ? (
            <>
              <span className="text-[#7aa2ff] italic">{titleAccent}</span> {titleLead}
            </>
          ) : (
            <>
              {titleLead} <span className="text-[#7aa2ff] italic">{titleAccent}</span>
            </>
          )}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">{lede}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <WhatsAppDeskButton
            text={wa.prefill}
            source={kind === "jobs" ? "advertise_jobs" : "advertise_property"}
            className="mcc-supply-cta mcc-supply-cta--on-dark"
          >
            {ta ? "WhatsApp-ல் அனுப்பு" : "Send on WhatsApp"}
          </WhatsAppDeskButton>
          <Link
            href={contactHref}
            className="inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/60"
          >
            {ta ? "தொடர்பு பக்கம்" : "Contact page"}
          </Link>
          <Link
            href={board.href}
            className="inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/60"
          >
            {board.label}
          </Link>
          <Link
            href={twin.href}
            className="text-sm font-semibold text-[#c9c2ff] underline-offset-4 hover:underline"
          >
            {twin.label}
          </Link>
        </div>
      </section>

      <section
        className="mt-8 rounded-[22px] border border-[#eceaf3] bg-white px-5 py-5 sm:px-6"
        aria-labelledby="pitch-offer"
      >
        <h2 id="pitch-offer" className="text-2xl font-semibold tracking-tight text-[#16161d]">
          {ta ? "என்ன கிடைக்கும்" : "What you get"}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5c5872]">
          {kind === "jobs"
            ? ta
              ? "பொதுப் பக்கமும் பகிரக்கூடிய இணைப்பும். விண்ணப்பம் உங்கள் தளத்திலோ படிவத்திலோ. பலகை ஏற்கனவே இலவசப் பதிவைச் சொல்கிறது."
              : "A public page and a link you can share. Applications stay on your site or form. The jobs board already invites employers to list for free."
            : propertyPackageSentence(locale)}
        </p>
        <h3 className="mt-5 text-[11px] font-semibold tracking-[0.14em] text-[#8b87a8] uppercase">
          {ta ? "அனுப்ப வேண்டியவை" : "What to send"}
        </h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {checklist.map((item) => (
            <li
              key={item}
              className="rounded-2xl bg-[#f6f4ff] px-4 py-3 text-sm font-medium text-[#2a2640]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="pitch-samples">
        <h2 id="pitch-samples" className="text-2xl font-semibold tracking-tight text-[#16161d]">
          {ta ? (
            "ஏற்கனவே உள்ள பதிவுகள்"
          ) : (
            <>
              Already on the <span className="text-[#5b4dff] italic">site</span>
            </>
          )}
        </h2>
        {samples.length > 0 ? (
          <ul className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2">
            {samples.map((sample) => (
              <li key={sample.href} className="w-[260px] shrink-0 snap-start">
                <Link
                  href={sample.href}
                  className="flex h-full flex-col rounded-[22px] border border-[#eceaf3] bg-white p-4 shadow-[0_10px_30px_rgba(22,22,29,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(22,22,29,0.08)]"
                >
                  <span className="text-base leading-snug font-semibold text-[#16161d]">
                    {sample.title}
                  </span>
                  <span className="mt-2 text-sm text-[#5c5872]">{sample.meta}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-[#5c5872]">
            {ta
              ? "மாதிரிப் பதிவு இன்னும் இல்லை. பலகையையே பாருங்கள்."
              : "No sample listing is up yet. The board is the proof."}{" "}
            <Link href={board.href} className="font-semibold text-[#5b4dff] underline-offset-4 hover:underline">
              {board.label}
            </Link>
          </p>
        )}
      </section>
    </div>
  );
}
