import Link from "next/link";
import {
  FREE_POST_AREA_SENTENCE,
  FREE_POST_HUB_DESCRIPTION,
  FREE_POST_HUB_FAQ,
  FREE_POST_HUB_LEDE,
  FREE_POST_HUB_PATH,
  FREE_POST_HUB_STEPS,
  FREE_POST_KINDS,
  freePostGuide,
} from "@/content/free-posting";
import { DeskPostAnchor } from "@/components/free-posting/desk-post-context";
import {
  freePostFaqJsonLd,
  freePostHowToJsonLd,
  freePostJsonLdScript,
  freePostWebPageJsonLd,
} from "@/components/free-posting/free-post-jsonld";
import {
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";

const hubTitle = "How to post for free on MyChennaiCity";

export function FreePostHubPage() {
  const web = freePostWebPageJsonLd({
    path: FREE_POST_HUB_PATH,
    name: hubTitle,
    description: FREE_POST_HUB_DESCRIPTION,
  });
  const howTo = freePostHowToJsonLd({
    path: FREE_POST_HUB_PATH,
    name: "How to post for free on MyChennaiCity",
    description: FREE_POST_HUB_LEDE,
    steps: FREE_POST_HUB_STEPS,
  });
  const faq = freePostFaqJsonLd(FREE_POST_HUB_FAQ);

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
          { label: "Post for free" },
        ]}
      />

      <p className="type-eyebrow mt-6 text-[var(--accent)]">Chennai · Free to post</p>
      <h1 className="type-display mt-2 max-w-3xl text-3xl text-[var(--foreground)] sm:text-5xl">
        How to post for free on MyChennaiCity
      </h1>
      <p className="type-lede mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
        {FREE_POST_HUB_LEDE}
      </p>

      <section className="mt-10" aria-labelledby="post-steps">
        <h2 id="post-steps" className="text-2xl font-semibold tracking-tight">
          How posting works
        </h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-3">
          {FREE_POST_HUB_STEPS.map((step, index) => (
            <li
              key={step.name}
              id={`step-${index + 1}`}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4"
            >
              <span className="text-xs font-bold text-[var(--accent)]">
                {index + 1}
              </span>
              <p className="mt-1 font-semibold">{step.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10" aria-labelledby="post-choices">
        <h2 id="post-choices" className="text-2xl font-semibold tracking-tight">
          Choose what to post in Chennai
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {FREE_POST_KINDS.map((kind) => {
            const guide = freePostGuide(kind);
            return (
              <li key={kind}>
                <DeskPostAnchor
                  kind={kind}
                  className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 transition hover:border-[var(--accent)]"
                >
                  <span className="font-semibold text-[var(--foreground)]">
                    {guide.cardTitle}
                  </span>
                  <span className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                    {guide.cardBody}
                  </span>
                </DeskPostAnchor>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
          {FREE_POST_AREA_SENTENCE}
        </p>
      </section>

      <section className="mt-10" aria-labelledby="post-guides">
        <h2 id="post-guides" className="text-2xl font-semibold tracking-tight">
          Guides for each kind of post
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {FREE_POST_KINDS.map((kind) => {
            const guide = freePostGuide(kind);
            return (
              <li key={guide.path}>
                <Link
                  href={guide.path}
                  className="block rounded-2xl border border-[var(--border)] px-4 py-4 hover:border-[var(--accent)]"
                >
                  <span className="font-semibold">{guide.navLabel}</span>
                  <span className="mt-1 block text-sm text-[var(--muted)]">
                    {guide.cardBody}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="post-faq">
        <h2 id="post-faq" className="text-2xl font-semibold tracking-tight">
          Questions about posting on MyChennaiCity
        </h2>
        <div className="mt-4 space-y-3">
          {FREE_POST_HUB_FAQ.map((item) => (
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
    </div>
  );
}
