import Link from "next/link";
import { WhatsAppDeskButton } from "@/components/contact/whatsapp-desk-button";
import {
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import {
  CLASSIFIEDS_BROWSE_PASSAGE,
  CLASSIFIEDS_POSTER_PASSAGE,
  CLASSIFIEDS_POSTER_PASSAGE_TA,
} from "@/content/aeo/classifieds-passages";
import {
  POST_CLASSIFIED_AD_CHENNAI_FAQ_EN,
  POST_CLASSIFIED_AD_CHENNAI_FAQ_TA,
  POST_CLASSIFIED_AD_CHENNAI_PATH,
  POST_CLASSIFIED_AD_CHENNAI_TAMIL_PATH,
  POST_CLASSIFIED_AD_WORKFLOW_EN,
} from "@/content/guides/post-classified-ad-chennai";
import type { ListingPitchSample } from "@/content/advertise-listings";
import { CLASSIFIED_HUB_CATEGORIES } from "@/lib/classifieds/categories";
import {
  ADVERTISE_CLASSIFIEDS_PATH,
  ADVERTISE_CLASSIFIEDS_TAMIL_PATH,
  ADVERTISE_JOBS_PATH,
  ADVERTISE_PROPERTY_PATH,
} from "@/lib/routes/advertise-listings";
import { CHENNAI_CLASSIFIEDS_HUB_PATH } from "@/lib/routes/chennai-classifieds";
import { buildFaqPageJsonLdFromItems } from "@/lib/seo/faq-jsonld";
import { getBusinessWhatsAppCopy } from "@/lib/whatsapp-cta-copy";

type PitchLocale = "en" | "ta";

export function ClassifiedsPitchPage({
  locale,
  samples,
}: {
  locale: PitchLocale;
  samples: ListingPitchSample[];
}) {
  const ta = locale === "ta";
  const wa = getBusinessWhatsAppCopy("classifieds");
  const twin = ta
    ? { href: ADVERTISE_CLASSIFIEDS_PATH, label: "English" }
    : { href: ADVERTISE_CLASSIFIEDS_TAMIL_PATH, label: "தமிழ்" };
  const guidePath = ta
    ? POST_CLASSIFIED_AD_CHENNAI_TAMIL_PATH
    : POST_CLASSIFIED_AD_CHENNAI_PATH;
  const faq = ta ? POST_CLASSIFIED_AD_CHENNAI_FAQ_TA : POST_CLASSIFIED_AD_CHENNAI_FAQ_EN;
  const faqLd = buildFaqPageJsonLdFromItems(faq, {
    pageUrl: `https://mychennaicity.in${ta ? ADVERTISE_CLASSIFIEDS_TAMIL_PATH : ADVERTISE_CLASSIFIEDS_PATH}`,
    fragment: "classifieds-faq",
  });

  const title = ta
    ? "சென்னையில் வகை விளம்பரம் போட"
    : "Post a classified ad in Chennai";
  const titleLead = ta ? "வகை விளம்பரம் போட" : "Post a classified ad in";
  const titleAccent = ta ? "சென்னையில்" : "Chennai";
  const lede = ta ? CLASSIFIEDS_POSTER_PASSAGE_TA : CLASSIFIEDS_POSTER_PASSAGE;

  const categories = CLASSIFIED_HUB_CATEGORIES.filter((c) => c.id !== "all");

  return (
    <div className={interiorMainClassName}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <PageBreadcrumbs
        items={[
          { label: ta ? "முகப்பு" : "Home", href: "/" },
          { label: title },
        ]}
      />
      <section className="mt-6 overflow-hidden rounded-[28px] bg-[#0e1324] px-5 py-8 text-white shadow-[0_24px_60px_rgba(14,19,36,0.18)] sm:px-8 sm:py-10">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#b7b4ff] uppercase">
          {ta ? "வகை விளம்பரங்கள்" : "Local classifieds"}
        </p>
        <h1
          className="mt-3 max-w-xl text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl"
          data-speakable="article-title"
        >
          {ta ? (
            <>
              <span className="text-[#7aa2ff] italic">{titleAccent}</span> {titleLead}
            </>
          ) : (
            <>
              {titleLead}{" "}
              <span className="text-[#7aa2ff] italic">{titleAccent}</span>
            </>
          )}
        </h1>
        <p
          className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base"
          data-speakable="article-lead"
        >
          {lede}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <WhatsAppDeskButton
            text={wa.prefill}
            source="advertise_classifieds"
            className="mcc-supply-cta mcc-supply-cta--on-dark"
          >
            {ta ? "WhatsApp-ல் அனுப்பு" : "Send on WhatsApp"}
          </WhatsAppDeskButton>
          <Link
            href={CHENNAI_CLASSIFIEDS_HUB_PATH}
            className="inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/60"
          >
            {ta ? "வகை விளம்பரப் பலகை" : "Browse classifieds"}
          </Link>
          <Link
            href={guidePath}
            className="inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/60"
          >
            {ta ? "வழிகாட்டி" : "How it works"}
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
        aria-labelledby="classifieds-workflow"
      >
        <h2
          id="classifieds-workflow"
          className="text-2xl font-semibold tracking-tight text-[#16161d]"
        >
          {ta ? "பணி வரிசை" : "How posting works"}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5c5872]">
          {ta
            ? "இந்தப் பக்கம் விளம்பரத்தை வெளியிடாது. நீங்கள் அனுப்புகிறீர்கள்; நாங்கள் வைக்கிறோம்."
            : "This page does not publish the ad. You send details; we place the listing."}
        </p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-3">
          {POST_CLASSIFIED_AD_WORKFLOW_EN.map((item) => (
            <li
              key={item.step}
              className="rounded-2xl bg-[#f6f4ff] px-4 py-4 text-sm text-[#2a2640]"
            >
              <span className="text-[11px] font-bold tracking-wider text-[#5b4dff]">
                {item.step}
              </span>
              <p className="mt-1 font-semibold text-[#16161d]">{item.title}</p>
              <p className="mt-1 leading-relaxed text-[#5c5872]">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10" aria-labelledby="classifieds-cats">
        <h2
          id="classifieds-cats"
          className="text-2xl font-semibold tracking-tight text-[#16161d]"
        >
          {ta ? "வகைகள்" : "Categories on the board"}
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`${CHENNAI_CLASSIFIEDS_HUB_PATH}?category=${cat.id}`}
                className="block h-full rounded-[20px] border border-[#eceaf3] bg-white px-4 py-4 shadow-sm transition hover:border-[#5b4dff]/40"
              >
                <span className="font-semibold text-[#16161d]">{cat.label}</span>
                <p className="mt-1 text-sm leading-relaxed text-[#5c5872]">
                  {cat.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-[#5c5872]">
          {ta ? "பிரத்யேக பலகைகள்: " : "Dedicated boards: "}
          <Link href={ADVERTISE_PROPERTY_PATH} className="font-semibold text-[#5b4dff] hover:underline">
            {ta ? "சொத்து" : "Property"}
          </Link>
          {" · "}
          <Link href={ADVERTISE_JOBS_PATH} className="font-semibold text-[#5b4dff] hover:underline">
            {ta ? "வேலை" : "Jobs"}
          </Link>
        </p>
      </section>

      <section className="mt-10" aria-labelledby="classifieds-faq">
        <h2 id="classifieds-faq" className="text-2xl font-semibold tracking-tight text-[#16161d]">
          {ta ? "அடிக்கடி கேட்கப்படும் கேள்விகள்" : "Common questions"}
        </h2>
        <dl className="mt-4 divide-y divide-[#eceaf3] rounded-[22px] border border-[#eceaf3] bg-white">
          {faq.map((item) => (
            <div key={item.question} className="px-5 py-4">
              <dt className="font-semibold text-[#16161d]">{item.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-[#5c5872]">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-[#5c5872]">{CLASSIFIEDS_BROWSE_PASSAGE}</p>
      </section>

      <section className="mt-10" aria-labelledby="classifieds-samples">
        <h2 id="classifieds-samples" className="text-2xl font-semibold tracking-tight text-[#16161d]">
          {ta ? "ஏற்கனவே உள்ள பதிவுகள்" : "Live on the board"}
        </h2>
        {samples.length > 0 ? (
          <ul className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2">
            {samples.map((sample) => (
              <li key={sample.href} className="w-[260px] shrink-0 snap-start">
                <Link
                  href={sample.href}
                  className="flex h-full flex-col rounded-[22px] border border-[#eceaf3] bg-white p-4 shadow-sm transition hover:-translate-y-0.5"
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
              ? "பலகையில் புதிய பதிவுகள் வரும்."
              : "New listings appear on the board as readers send them."}
          </p>
        )}
      </section>
    </div>
  );
}