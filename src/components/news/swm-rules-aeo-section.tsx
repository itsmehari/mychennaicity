import Link from "next/link";
import {
  SWM_RULES_AEO_SECTION_ID,
  SWM_RULES_SERIES_INTRO,
  SWM_RULES_SHARED_FACTS,
  getSwmRulesAeoContent,
  swmRulesRelatedLinks,
  type SwmRulesAeoContent,
} from "@/content/civic-swm/swm-rules-aeo";

function FactList({
  facts,
}: {
  facts: SwmRulesAeoContent["facts"];
}) {
  if (facts.length === 0) return null;
  return (
    <dl className="swm-aeo__facts">
      {facts.map((f) => (
        <div key={f.term} className="swm-aeo__fact">
          <dt className="swm-aeo__fact-term">{f.term}</dt>
          <dd className="swm-aeo__fact-def">{f.definition}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Answer-first section for Solid Waste Management Rules articles.
 * Plain journalistic facts for AI/search extraction — not promotional copy.
 */
export function SwmRulesAeoSection({ slug }: { slug: string }) {
  const content = getSwmRulesAeoContent(slug);
  if (!content) return null;

  const related = swmRulesRelatedLinks(slug);

  return (
    <section
      id={SWM_RULES_AEO_SECTION_ID}
      className="swm-aeo scroll-mt-28"
      aria-labelledby="swm-aeo-heading"
    >
      <p className="swm-aeo__eyebrow">Solid Waste Management Rules</p>
      <h2 id="swm-aeo-heading" className="swm-aeo__title">
        Quick answers
      </h2>
      <p className="swm-aeo__dek">
        Straight facts from this report for readers — and for search and answer
        engines. This is a news summary, not legal advice.
      </p>

      <div className="swm-aeo__answer-block">
        <p className="swm-aeo__answer-label">Direct answer</p>
        <p
          className="swm-aeo__answer"
          data-speakable="swm-aeo-answer"
        >
          {content.directAnswer}
        </p>
      </div>

      {content.contextParagraphs?.map((p, i) => (
        <p key={i} className="swm-aeo__context">
          {p}
        </p>
      ))}

      <h3 className="swm-aeo__subhead">From this story</h3>
      <FactList facts={content.facts} />

      <h3 className="swm-aeo__subhead">National framework (shared across this series)</h3>
      <p className="swm-aeo__series-intro">{SWM_RULES_SERIES_INTRO}</p>
      <FactList facts={SWM_RULES_SHARED_FACTS} />

      {related.length > 0 ? (
        <nav className="swm-aeo__related" aria-label="Related SWM Rules coverage">
          <h3 className="swm-aeo__subhead">Related SWM coverage on mychennaicity.in</h3>
          <ul className="swm-aeo__related-list">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href ?? `/chennai-local-news/${item.slug}`}
                  className="swm-aeo__related-link"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <p className="swm-aeo__disclaimer">
        Always verify current obligations from the Gazette notification, GCC or
        state circulars, sanctioned bye-laws, and any notice issued to your
        premises. Where an official text differs from this summary, the official
        text prevails.
      </p>
    </section>
  );
}
