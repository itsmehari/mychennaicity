import type { AeoFact, HubAeoContent } from "@/content/aeo/hub-answers";

type Props = {
  content: HubAeoContent;
  /** Extra facts appended after content.facts */
  extraFacts?: AeoFact[];
  className?: string;
};

/**
 * Reusable answer-first block for hubs (jobs, events, etc.).
 * Keep copy factual — visible text must match any Speakable / FAQ claims.
 */
export function AeoAnswerBlock({ content, extraFacts, className }: Props) {
  const facts = [...content.facts, ...(extraFacts ?? [])];
  const headingId = `${content.id}-heading`;

  return (
    <section
      id={content.id}
      className={["mcc-aeo", "scroll-mt-28", className].filter(Boolean).join(" ")}
      aria-labelledby={headingId}
    >
      <p className="mcc-aeo__eyebrow">{content.eyebrow}</p>
      <h2 id={headingId} className="mcc-aeo__title">
        {content.title}
      </h2>
      <p className="mcc-aeo__dek">{content.dek}</p>

      <div className="mcc-aeo__answer-block">
        <p className="mcc-aeo__answer-label">Direct answer</p>
        <p className="mcc-aeo__answer" data-speakable="hub-aeo-answer">
          {content.directAnswer}
        </p>
      </div>

      {content.contextParagraphs?.map((p, i) => (
        <p key={i} className="mcc-aeo__context">
          {p}
        </p>
      ))}

      {facts.length > 0 ? (
        <>
          <h3 className="mcc-aeo__subhead">Key facts</h3>
          <dl className="mcc-aeo__facts">
            {facts.map((f) => (
              <div key={f.term} className="mcc-aeo__fact">
                <dt className="mcc-aeo__fact-term">{f.term}</dt>
                <dd className="mcc-aeo__fact-def">{f.definition}</dd>
              </div>
            ))}
          </dl>
        </>
      ) : null}

      {content.disclaimer ? (
        <p className="mcc-aeo__disclaimer">{content.disclaimer}</p>
      ) : null}
    </section>
  );
}
