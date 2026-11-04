import type { Metadata } from "next";
import Link from "next/link";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import {
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import {
  MYBANGALORE_AREAS,
  MYBANGALORE_COVAI_PAGE_URL,
  MYBANGALORE_COMMUNITY_DESCRIPTION,
  MYBANGALORE_COMMUNITY_PATH,
  MYBANGALORE_COMMUNITY_TITLE,
  MYBANGALORE_COMMUNITY_UPDATED,
  MYBANGALORE_DIRECT_ANSWER,
  MYBANGALORE_FAQ,
  MYBANGALORE_GEO_META,
  MYBANGALORE_SITE_URL,
  MYBANGALORE_TOPICS,
  MYBANGALORE_WHATSAPP_INVITE_URL,
} from "@/content/community/mybangalore-whatsapp";
import { getSiteUrl } from "@/lib/env";
import { buildFaqPageJsonLdFromItems } from "@/lib/seo/faq-jsonld";
import { withMarkdownAlternate } from "@/lib/seo/content-markdown";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import { WHATSAPP_COMMUNITY_JOIN_PATH } from "@/lib/whatsapp-community";

const path = MYBANGALORE_COMMUNITY_PATH;
const pageUrl = `${getSiteUrl()}${path}`;

export const metadata: Metadata = {
  title: MYBANGALORE_COMMUNITY_TITLE,
  description: MYBANGALORE_COMMUNITY_DESCRIPTION,
  alternates: withMarkdownAlternate(
    { canonical: pageUrl },
    path,
  ),
  openGraph: {
    title: fullSiteTitle(MYBANGALORE_COMMUNITY_TITLE),
    description: MYBANGALORE_COMMUNITY_DESCRIPTION,
    url: pageUrl,
    locale: "en_IN",
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(MYBANGALORE_COMMUNITY_TITLE),
    description: MYBANGALORE_COMMUNITY_DESCRIPTION,
    images: ["/twitter-image"],
  },
  other: { ...MYBANGALORE_GEO_META },
};

function jsonLd() {
  const faq = buildFaqPageJsonLdFromItems(
    MYBANGALORE_FAQ.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
    { pageUrl, fragment: "faq" },
  );
  const faqNode = faq
    ? (({ "@context": _context, ...node }) => node)(faq)
    : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: MYBANGALORE_COMMUNITY_TITLE,
        description: MYBANGALORE_COMMUNITY_DESCRIPTION,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${getSiteUrl()}/#website` },
        dateModified: "2026-11-04",
        about: {
          "@type": "City",
          name: "Bengaluru",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bengaluru",
            addressRegion: "Karnataka",
            addressCountry: "IN",
          },
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#bangalore-direct-answer"],
        },
        significantLink: MYBANGALORE_WHATSAPP_INVITE_URL,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: getSiteUrl() },
          {
            "@type": "ListItem",
            position: 2,
            name: "Bengaluru WhatsApp community group",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Organization",
        name: "MyBangalore.in",
        url: MYBANGALORE_SITE_URL,
        description:
          "Independent Bengaluru WhatsApp community and WhatsApp group. The public website is still being published.",
      },
      ...(faqNode ? [faqNode] : []),
    ],
  };
}

export default function MyBangaloreWhatsappCommunityPage() {
  return (
    <div className={interiorMainClassName}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Bengaluru WhatsApp community group" },
        ]}
      />

      <p className="type-eyebrow text-[var(--accent)]">
        Chennai readers · Bengaluru WhatsApp community and group
      </p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        {MYBANGALORE_COMMUNITY_TITLE}
      </h1>
      <p className="mt-3 text-xs font-medium text-[var(--muted)]">
        Updated {MYBANGALORE_COMMUNITY_UPDATED}
      </p>

      <p
        id="bangalore-direct-answer"
        className="type-lede mt-4 max-w-2xl text-sm leading-relaxed text-[var(--foreground)]"
        data-speakable="article-lead"
      >
        {MYBANGALORE_DIRECT_ANSWER}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={MYBANGALORE_WHATSAPP_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Join the Bengaluru WhatsApp group
        </a>
        <a
          href={MYBANGALORE_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)]"
        >
          mybanglore.in
        </a>
      </div>

      <div className="mt-8 max-w-2xl">
      <GuideDisclaimer
        kind="civic"
        extra="This page introduces one Bengaluru WhatsApp community, which is also the Bengaluru WhatsApp group, for Chennai readers. It is not a BBMP, BMRCL, BMTC, or Karnataka government channel. Confirm traffic, jobs, rents, and civic notices before you act on them."
      />
      </div>

      <section className="mt-12 max-w-2xl" aria-labelledby="who-for">
        <h2 id="who-for" className="type-display text-xl text-[var(--foreground)]">
          Who this page is for
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          Use it if you are in Chennai and Bengaluru is the next city on your
          week: a job shift, a family visit, a college move, or a weekend trip.
          People already in Whitefield, Electronic City, Koramangala, Jayanagar,
          Yelahanka, Hebbal, or anywhere else in the city can join the same
          WhatsApp community group. Readers who want Chennai updates stay on the{" "}
          <Link
            href={WHATSAPP_COMMUNITY_JOIN_PATH}
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            Chennai WhatsApp join form
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 max-w-2xl" aria-labelledby="what-you-get">
        <h2
          id="what-you-get"
          className="type-display text-xl text-[var(--foreground)]"
        >
          What the WhatsApp community group is for
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          One WhatsApp group is the whole community. Members and admins share
          Bengaluru updates in that chat instead of hunting across many pages:
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[var(--muted)]">
          {MYBANGALORE_TOPICS.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
          Areas called out for local posts: {MYBANGALORE_AREAS.join(", ")}.
          Posts are leads. A job line, a Metro delay, or a rental note still
          needs a check against the employer, BMRCL, or the person offering
          the room.
        </p>
      </section>

      <section className="mt-10 max-w-2xl" aria-labelledby="how-to-join">
        <h2
          id="how-to-join"
          className="type-display text-xl text-[var(--foreground)]"
        >
          How to join the WhatsApp group
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          Open the invite and request to join the WhatsApp community group.
          You can read every
          page on mychennaicity.in without joining. This page does not ask for
          your phone number, and nobody should add numbers that were collected
          for something else.
        </p>
        <p className="mt-4">
          <a
            href={MYBANGALORE_WHATSAPP_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            {MYBANGALORE_WHATSAPP_INVITE_URL}
          </a>
        </p>
      </section>

      <section className="mt-10 max-w-2xl" aria-labelledby="website">
        <h2 id="website" className="type-display text-xl text-[var(--foreground)]">
          The city website
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          The WhatsApp community&apos;s website address is{" "}
          <a
            href={MYBANGALORE_SITE_URL}
            className="font-semibold text-[var(--accent)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            mybanglore.in
          </a>
          . On {MYBANGALORE_COMMUNITY_UPDATED} that site was still being
          published, so this page and the WhatsApp group are the live
          introductions. When the site is up, it is the home for Bengaluru
          news and the WhatsApp community landing. This Chennai page stays a
          guide for Chennai readers. Coimbatore readers have a separate
          introduction at{" "}
          <a
            href={MYBANGALORE_COVAI_PAGE_URL}
            className="font-semibold text-[var(--accent)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            mycovai.in
          </a>
          .
        </p>
      </section>

      <section
        className="mt-10 max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
        aria-labelledby="forward"
      >
        <h2 id="forward" className="text-base font-bold text-[var(--foreground)]">
          Short note you can forward
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          Living in Bengaluru, or heading there from Chennai? Join the
          MyBangalore.in WhatsApp community — one Bengaluru WhatsApp group for
          city news, traffic, Metro, jobs, events, and local services. Join
          here:{" "}
          {MYBANGALORE_WHATSAPP_INVITE_URL}. City site: {MYBANGALORE_SITE_URL}.
          Independent community, not an official agency channel.
        </p>
      </section>

      <section className="mt-12 max-w-2xl" id="faq" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="type-display text-xl text-[var(--foreground)]">
          Questions
        </h2>
        <dl className="mt-4 space-y-6">
          {MYBANGALORE_FAQ.map((item) => (
            <div key={item.question}>
              <dt className="text-sm font-semibold text-[var(--foreground)]">
                {item.question}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                {item.question.startsWith("Is this the Chennai") ? (
                  <>
                    No. mychennaicity.in runs a separate Chennai group. Join
                    that one from{" "}
                    <Link
                      href={WHATSAPP_COMMUNITY_JOIN_PATH}
                      className="font-semibold text-[var(--accent)] hover:underline"
                    >
                      /whatsapp-community/join
                    </Link>
                    . This page is only for the Bengaluru WhatsApp community group.
                  </>
                ) : (
                  item.answer
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-12 max-w-2xl space-y-3">
        <GuideFinePrint extra="The WhatsApp invite on this page was supplied by the community operator on 4 November 2026. mybanglore.in was not published yet on that date." />
      </div>
    </div>
  );
}
