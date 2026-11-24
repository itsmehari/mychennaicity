import type { Metadata } from "next";
import Link from "next/link";
import { DeskPostAnchor } from "@/components/free-posting/desk-post-context";
import { freePostGuide } from "@/content/free-posting";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import {
  CLASSIFIEDS_BROWSE_PASSAGE,
  CLASSIFIEDS_POSTER_PASSAGE_TA,
} from "@/content/aeo/classifieds-passages";
import {
  POST_CLASSIFIED_AD_CHENNAI_FAQ_TA,
  POST_CLASSIFIED_AD_CHENNAI_PATH,
  POST_CLASSIFIED_AD_CHENNAI_TAMIL_PATH,
  POST_CLASSIFIED_AD_GUIDE_UPDATED,
} from "@/content/guides/post-classified-ad-chennai";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_CLASSIFIEDS_HUB_PATH } from "@/lib/routes/chennai-classifieds";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { buildFaqPageJsonLdFromItems } from "@/lib/seo/faq-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "சென்னையில் வகை விளம்பரம் போடுவது எப்படி";

export const metadata: Metadata = {
  title: titleSegment,
  description: `சென்னை உள்ளூர் வகை விளம்பரம் — தேவை, சேவை, அறைத் தேவை. mychennaicity.in. புதுப்பித்த நாள் ${POST_CLASSIFIED_AD_GUIDE_UPDATED}.`,
  alternates: {
    canonical: `${getSiteUrl()}${POST_CLASSIFIED_AD_CHENNAI_TAMIL_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${POST_CLASSIFIED_AD_CHENNAI_PATH}`,
      "ta-IN": `${getSiteUrl()}${POST_CLASSIFIED_AD_CHENNAI_TAMIL_PATH}`,
      "x-default": `${getSiteUrl()}${POST_CLASSIFIED_AD_CHENNAI_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    url: `${getSiteUrl()}${POST_CLASSIFIED_AD_CHENNAI_TAMIL_PATH}`,
    locale: "ta_IN",
  },
  other: { ...CHENNAI_GEO_META },
};

export default function PostClassifiedAdChennaiTamilGuidePage() {
  const classified = freePostGuide("classified");
  const faqLd = buildFaqPageJsonLdFromItems(POST_CLASSIFIED_AD_CHENNAI_FAQ_TA, {
    pageUrl: `${getSiteUrl()}${POST_CLASSIFIED_AD_CHENNAI_TAMIL_PATH}`,
    fragment: "classifieds-faq",
  });

  return (
    <div className={interiorMainClassName}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <PageBreadcrumbs
        items={[
          { label: "முகப்பு", href: "/" },
          { label: "வழிகாட்டிகள்", href: "/guides/how-to-use-mychennaicity" },
          { label: "வகை விளம்பரம் போடுவது" },
        ]}
      />

      <p className="type-eyebrow text-[var(--accent)]">வகை விளம்பரங்கள்</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        சென்னையில் வகை விளம்பரம் போடுவது எப்படி
      </h1>
      <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        {CLASSIFIEDS_POSTER_PASSAGE_TA} புதுப்பித்த நாள்{" "}
        <strong className="text-[var(--foreground)]">
          {POST_CLASSIFIED_AD_GUIDE_UPDATED}
        </strong>
        .
      </p>

      <h2 className="sr-only">தொடங்குங்கள்</h2>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={classified.path} className="mcc-supply-cta">
          விளம்பரம் போட
        </Link>
        <DeskPostAnchor kind="classified" className="mcc-supply-cta">
          WhatsApp
        </DeskPostAnchor>
        <Link
          href={CHENNAI_CLASSIFIEDS_HUB_PATH}
          className="inline-flex items-center rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold"
        >
          வகை விளம்பரப் பலகை
        </Link>
        <Link
          href={POST_CLASSIFIED_AD_CHENNAI_PATH}
          className="text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          English
        </Link>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">வாசகர்களுக்கு</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">{CLASSIFIEDS_BROWSE_PASSAGE}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">கேள்வி பதில்</h2>
        <dl className="mt-4 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)]">
          {POST_CLASSIFIED_AD_CHENNAI_FAQ_TA.map((item) => (
            <div key={item.question} className="px-5 py-4">
              <dt className="font-semibold">{item.question}</dt>
              <dd className="mt-2 text-sm text-[var(--muted)]">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <InteriorCrossNav />
    </div>
  );
}