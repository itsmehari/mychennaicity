import type { Metadata } from "next";
import Link from "next/link";
import { DeskPostAnchor } from "@/components/free-posting/desk-post-context";
import { FREE_POST_HUB_PATH, freePostGuide } from "@/content/free-posting";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import {
  CLASSIFIEDS_BROWSE_PASSAGE,
  CLASSIFIEDS_POSTER_PASSAGE,
} from "@/content/aeo/classifieds-passages";
import {
  POST_CLASSIFIED_AD_CHENNAI_FAQ_EN,
  POST_CLASSIFIED_AD_CHENNAI_KEYWORDS,
  POST_CLASSIFIED_AD_CHENNAI_PATH,
  POST_CLASSIFIED_AD_CHENNAI_TAMIL_PATH,
  POST_CLASSIFIED_AD_GUIDE_UPDATED,
  POST_CLASSIFIED_AD_WORKFLOW_EN,
} from "@/content/guides/post-classified-ad-chennai";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_CLASSIFIEDS_HUB_PATH } from "@/lib/routes/chennai-classifieds";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { buildFaqPageJsonLdFromItems } from "@/lib/seo/faq-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment =
  "How to post classified ads in Chennai — free local listings";

export const metadata: Metadata = {
  title: titleSegment,
  description: `Post a classified ad in Chennai: wanted posts, services, flatmates, tuition, and vehicles on mychennaicity.in. Free local classifieds workflow, categories, and FAQ. Updated ${POST_CLASSIFIED_AD_GUIDE_UPDATED}.`,
  alternates: {
    canonical: `${getSiteUrl()}${POST_CLASSIFIED_AD_CHENNAI_PATH}`,
    languages: {
      "en-IN": `${getSiteUrl()}${POST_CLASSIFIED_AD_CHENNAI_PATH}`,
      "ta-IN": `${getSiteUrl()}${POST_CLASSIFIED_AD_CHENNAI_TAMIL_PATH}`,
      "x-default": `${getSiteUrl()}${POST_CLASSIFIED_AD_CHENNAI_PATH}`,
    },
  },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: CLASSIFIEDS_POSTER_PASSAGE.slice(0, 200),
    url: `${getSiteUrl()}${POST_CLASSIFIED_AD_CHENNAI_PATH}`,
  },
  other: { ...CHENNAI_GEO_META },
};

export default function PostClassifiedAdChennaiGuidePage() {
  const classified = freePostGuide("classified");
  const faqLd = buildFaqPageJsonLdFromItems(POST_CLASSIFIED_AD_CHENNAI_FAQ_EN, {
    pageUrl: `${getSiteUrl()}${POST_CLASSIFIED_AD_CHENNAI_PATH}`,
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
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides/how-to-use-mychennaicity" },
          { label: "Post classified ads in Chennai" },
        ]}
      />

      <p className="type-eyebrow text-[var(--accent)]">Classifieds</p>
      <h1
        className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl"
        data-speakable="article-title"
      >
        How to post classified ads in Chennai
      </h1>
      <p
        className="type-lede mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]"
        data-speakable="article-lead"
      >
        {CLASSIFIEDS_POSTER_PASSAGE} Last updated{" "}
        <strong className="text-[var(--foreground)]">
          {POST_CLASSIFIED_AD_GUIDE_UPDATED}
        </strong>
        .
      </p>

      <p className="mt-4 max-w-2xl text-xs leading-relaxed text-[var(--muted)]">
        Search topics we optimise for:{" "}
        {POST_CLASSIFIED_AD_CHENNAI_KEYWORDS.join(" · ")}.
      </p>

      <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-5">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Start here
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href={classified.path} className="mcc-supply-cta">
            How to post a classified
          </Link>
          <DeskPostAnchor kind="classified" className="mcc-supply-cta">
            Send on WhatsApp
          </DeskPostAnchor>
          <Link
            href={CHENNAI_CLASSIFIEDS_HUB_PATH}
            className="inline-flex items-center rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold"
          >
            Browse Chennai classifieds
          </Link>
          <Link
            href={FREE_POST_HUB_PATH}
            className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            All free posts
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Workflow</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-3">
          {POST_CLASSIFIED_AD_WORKFLOW_EN.map((step) => (
            <li
              key={step.step}
              className="rounded-2xl border border-[var(--border)] px-4 py-4 text-sm"
            >
              <span className="text-xs font-bold text-[var(--accent)]">
                Step {step.step}
              </span>
              <p className="mt-1 font-semibold">{step.title}</p>
              <p className="mt-1 text-[var(--muted)]">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">For readers</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          {CLASSIFIEDS_BROWSE_PASSAGE}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <dl className="mt-4 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)]">
          {POST_CLASSIFIED_AD_CHENNAI_FAQ_EN.map((item) => (
            <div key={item.question} className="px-5 py-4">
              <dt className="font-semibold">{item.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <InteriorCrossNav />
    </div>
  );
}