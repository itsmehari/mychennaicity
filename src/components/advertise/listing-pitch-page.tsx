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
      <header className="mt-6 max-w-3xl">
        <p className="type-eyebrow text-[var(--accent)]">
          {kind === "jobs" ? (ta ? "வேலைகள்" : "Jobs") : ta ? "சொத்து" : "Property"}
        </p>
        <h1 className="type-display mt-2 text-[2rem] leading-tight text-[var(--foreground)] sm:text-[2.35rem]">
          {title}
        </h1>
        <p className="type-lede mt-4 text-base leading-relaxed text-[var(--muted)]">
          {lede}
        </p>
        <p className="mt-3 text-sm">
          <Link href={twin.href} className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
            {twin.label}
          </Link>
        </p>
      </header>

      <section className="mt-8 max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-5 sm:px-6" aria-labelledby="pitch-offer">
        <h2 id="pitch-offer" className="text-lg font-medium text-[var(--foreground)]">
          {ta ? "என்ன கிடைக்கும்" : "What you get"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          {kind === "jobs"
            ? ta
              ? "பொதுப் பக்கமும் பகிரக்கூடிய இணைப்பும். விண்ணப்பம் உங்கள் தளத்திலோ படிவத்திலோ. பலகை ஏற்கனவே இலவசப் பதிவைச் சொல்கிறது."
              : "A public page and a link you can share. Applications stay on your site or form. The jobs board already invites employers to list for free."
            : propertyPackageSentence(locale)}
        </p>
        <h3 className="mt-5 text-sm font-medium text-[var(--foreground)]">
          {ta ? "அனுப்ப வேண்டியவை" : "What to send"}
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <WhatsAppDeskButton
            text={wa.prefill}
            source={kind === "jobs" ? "advertise_jobs" : "advertise_property"}
            className="inline-flex items-center rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-fg)]"
          >
            {ta ? "WhatsApp-ல் அனுப்பு" : "Send on WhatsApp"}
          </WhatsAppDeskButton>
          <Link
            href={contactHref}
            className="inline-flex items-center rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
          >
            {ta ? "தொடர்பு பக்கம்" : "Contact page"}
          </Link>
          <Link
            href={board.href}
            className="inline-flex items-center rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
          >
            {board.label}
          </Link>
        </div>
      </section>

      <section className="mt-8 max-w-3xl" aria-labelledby="pitch-samples">
        <h2 id="pitch-samples" className="text-lg font-medium text-[var(--foreground)]">
          {ta ? "ஏற்கனவே உள்ள பதிவுகள்" : "Already on the site"}
        </h2>
        {samples.length > 0 ? (
          <ul className="mt-4 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)]">
            {samples.map((sample) => (
              <li key={sample.href}>
                <Link href={sample.href} className="block px-5 py-4 hover:bg-[color-mix(in_srgb,var(--accent)_4%,transparent)]">
                  <span className="block font-medium text-[var(--foreground)]">{sample.title}</span>
                  <span className="mt-1 block text-sm text-[var(--muted)]">{sample.meta}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-[var(--muted)]">
            {ta
              ? "மாதிரிப் பதிவு இன்னும் இல்லை. பலகையையே பாருங்கள்."
              : "No sample listing is up yet. The board is the proof."}{" "}
            <Link href={board.href} className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
              {board.label}
            </Link>
          </p>
        )}
      </section>
    </div>
  );
}
