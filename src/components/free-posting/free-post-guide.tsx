import Link from "next/link";
import {
  FREE_POST_AREA_SENTENCE,
  FREE_POST_HUB_PATH,
  FREE_POST_KINDS,
  type FreePostKind,
  freePostGuide,
} from "@/content/free-posting";
import { DeskPostAnchor } from "@/components/free-posting/desk-post-context";
import {
  freePostFaqJsonLd,
  freePostGuideHowTo,
  freePostJsonLdScript,
  freePostWebPageJsonLd,
} from "@/components/free-posting/free-post-jsonld";
import {
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";

export function FreePostGuidePage({ kind }: { kind: FreePostKind }) {
  const guide = freePostGuide(kind);
  const web = freePostWebPageJsonLd({
    path: guide.path,
    name: guide.title,
    description: guide.description,
  });
  const howTo = freePostGuideHowTo(kind);
  const faq = freePostFaqJsonLd(guide.faqs);
  const siblings = FREE_POST_KINDS.filter((item) => item !== kind);

  return (
    <div className={interiorMainClassName}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: freePostJsonLdScript(web) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: freePostJsonLdScript(howTo) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: freePostJsonLdScript(faq) }}
      />
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Post for free", href: FREE_POST_HUB_PATH },
          { label: guide.navLabel },
        ]}
      />

      <p className="type-eyebrow mt-6 text-[var(--accent)]">{guide.kicker}</p>
      <h1 className="type-display mt-2 max-w-3xl text-3xl text-[var(--foreground)] sm:text-5xl">
        {guide.h1}
      </h1>
      <p className="type-lede mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
        {guide.lede}
      </p>
      <div className="mt-6">
        <DeskPostAnchor kind={kind} className="mcc-supply-cta">
          Send a WhatsApp message
        </DeskPostAnchor>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        {guide.sendLine}
      </p>

      <section className="mt-10" aria-labelledby="who-for">
        <h2 id="who-for" className="text-2xl font-semibold tracking-tight">
          Who this is for
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--muted)]">
          {guide.who.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8" aria-labelledby="what-you-get">
        <h2 id="what-you-get" className="text-2xl font-semibold tracking-tight">
          What you get
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--muted)]">
          {guide.get.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8" id="step-2" aria-labelledby="what-to-send">
        <h2 id="what-to-send" className="text-2xl font-semibold tracking-tight">
          What to send
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          {guide.sendLine} {FREE_POST_AREA_SENTENCE}
        </p>
      </section>

      <section className="mt-10" aria-labelledby="guide-faq">
        <h2 id="guide-faq" className="text-2xl font-semibold tracking-tight">
          Questions
        </h2>
        <div className="mt-4 space-y-3">
          {guide.faqs.map((item) => (
            <details
              key={item.question}
              className="rounded-2xl border border-[var(--border)] px-4 py-3"
            >
              <summary className="cursor-pointer font-semibold">
                {item.question}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="other-posts">
        <h2 id="other-posts" className="text-2xl font-semibold tracking-tight">
          Other ways to post
        </h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
          <li>
            <Link href={FREE_POST_HUB_PATH} className="text-[var(--accent)] underline-offset-4 hover:underline">
              How posting works
            </Link>
          </li>
          {siblings.map((item) => {
            const sibling = freePostGuide(item);
            return (
              <li key={sibling.path}>
                <Link
                  href={sibling.path}
                  className="text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  {sibling.navLabel}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
