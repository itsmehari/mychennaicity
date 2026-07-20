"use client";

import { useEffect, useMemo, useRef } from "react";
import { ASSESSMENT_QUESTIONS } from "@/content/guides/bwg-readiness-2026/assessment-questions";
import { DOCUMENT_ITEMS } from "@/content/guides/bwg-readiness-2026/documents";
import {
  scoreAssessment,
  trackBwgEvent,
  type AssessmentOption,
} from "@/lib/guides/bwg-readiness-storage";
import { useBwgState } from "./bwg-state-provider";
import { BwgConsultantCta } from "./bwg-consultant-cta";

const OPTIONS: { id: AssessmentOption; label: string }[] = [
  { id: "full", label: "Yes, fully implemented" },
  { id: "partial", label: "Partly implemented" },
  { id: "no", label: "No" },
  { id: "na", label: "Not applicable" },
];

export function BwgReadinessAssessment() {
  const { state, setState, clearAll } = useBwgState();
  const started = useRef(false);

  useEffect(() => {
    if (!started.current && state.answers.length > 0) {
      started.current = true;
    }
  }, [state.answers.length]);

  const score = useMemo(
    () => scoreAssessment(state.answers),
    [state.answers],
  );

  const answerMap = useMemo(() => {
    const m = new Map(state.answers.map((a) => [a.questionId, a]));
    return m;
  }, [state.answers]);

  function setAnswer(questionId: string, answer: AssessmentOption) {
    if (!started.current) {
      started.current = true;
      trackBwgEvent("assessment_started");
    }
    setState((s) => {
      const others = s.answers.filter((a) => a.questionId !== questionId);
      return {
        ...s,
        activeStage: "score",
        answers: [...others, { questionId, answer }],
      };
    });
  }

  const docGaps = state.documents.filter(
    (d) => d.status === "missing" || d.status === "expired",
  );
  const vendorWarn = Boolean(
    state.vendorStatus && state.vendorStatus !== "verified",
  );

  const completedRef = useRef(false);
  const completed =
    state.answers.length === ASSESSMENT_QUESTIONS.length &&
    score.overallPercent != null;

  useEffect(() => {
    if (completed && !completedRef.current) {
      completedRef.current = true;
      trackBwgEvent("assessment_completed");
    }
  }, [completed]);

  const domains = Array.from(
    new Set(ASSESSMENT_QUESTIONS.map((q) => q.domain)),
  );

  const domainLabels: Record<string, string> = {
    governance: "Governance",
    measurement: "Waste measurement",
    segregation: "Segregation",
    wet: "Wet waste",
    dry: "Dry waste",
    sanitary: "Sanitary and special-care waste",
    vendor: "Vendor governance",
    documentation: "Documentation and training",
  };

  return (
    <div className="bwg-tool" id="tool-assessment">
      <h3>Final self-assessment</h3>
      <div className="bwg-disclaimer">
        This tool provides general public-interest information and an internal
        readiness assessment. It does not replace the Solid Waste Management
        Rules, municipal bye-laws, official directions, professional legal
        advice, environmental consultancy or approval by GCC, TNPCB, CPCB or any
        other authority.
      </div>
      <p className="bwg-privacy">
        Progress is saved in your browser (localStorage). No login required.
        Individual answers are not transmitted to our servers.
      </p>

      {domains.map((domain) => (
        <div key={domain} style={{ marginTop: "1.5rem" }}>
          <h4 style={{ fontSize: "1rem", marginBottom: "0.35rem" }}>
            {domainLabels[domain] ?? domain}
          </h4>
          {ASSESSMENT_QUESTIONS.filter((q) => q.domain === domain).map((q) => {
            const current = answerMap.get(q.id)?.answer;
            return (
              <div className="bwg-question" key={q.id}>
                <p id={`q-${q.id}`}>{q.question}</p>
                <div
                  className="bwg-radio-group"
                  role="radiogroup"
                  aria-labelledby={`q-${q.id}`}
                >
                  {OPTIONS.map((opt) => (
                    <label key={opt.id}>
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={current === opt.id}
                        onChange={() => setAnswer(q.id, opt.id)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <div id="bwg-results" className={`bwg-score bwg-score--${score.band}`}>
        <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--bwg-muted)" }}>
          Readiness indicator
        </p>
        <p className="bwg-score__value">
          {score.overallPercent != null ? `${score.overallPercent}%` : "—"}
        </p>
        <p style={{ fontWeight: 700, margin: "0.25rem 0" }}>{score.bandLabel}</p>
        <p style={{ margin: 0, fontSize: "0.92rem" }}>{score.bandCopy}</p>
        <p className="bwg-privacy" style={{ marginTop: "0.75rem" }}>
          Answered {score.answered} of {ASSESSMENT_QUESTIONS.length} questions
          ({score.applicable} applicable for scoring).
        </p>
      </div>

      <div className="bwg-disclaimer">
        The readiness score is not a statutory compliance certificate. This
        score is an internal readiness indicator. It is not a government
        approval, legal opinion, registration, authorisation or compliance
        certificate.
      </div>

      <h4 style={{ marginTop: "1.25rem" }}>Domain-wise score</h4>
      <div className="bwg-domain-scores">
        {score.domains.map((d) => (
          <div key={d.domain}>
            <span>{d.domain}</span>
            <strong>
              {d.percent != null ? `${d.percent}%` : "N/A"}
            </strong>
          </div>
        ))}
      </div>

      <div className="bwg-cards bwg-cards--3">
        <div className="bwg-card">
          <h3>Top strengths</h3>
          <ul style={{ paddingLeft: "1rem", margin: "0.5rem 0 0" }}>
            {score.strengths.length ? (
              score.strengths.map((q) => <li key={q.id}>{q.question}</li>)
            ) : (
              <li>No fully implemented items marked yet.</li>
            )}
          </ul>
        </div>
        <div className="bwg-card">
          <h3>Operational gaps identified</h3>
          <ul style={{ paddingLeft: "1rem", margin: "0.5rem 0 0" }}>
            {score.gaps.length ? (
              score.gaps.map((q) => <li key={q.id}>{q.question}</li>)
            ) : (
              <li>No “No” answers marked yet.</li>
            )}
          </ul>
        </div>
        <div className="bwg-card">
          <h3>Areas requiring verification</h3>
          <ul style={{ paddingLeft: "1rem", margin: "0.5rem 0 0" }}>
            {docGaps.slice(0, 5).map((d) => {
              const name =
                DOCUMENT_ITEMS.find((x) => x.id === d.id)?.name ?? d.id;
              return (
                <li key={d.id}>
                  {name} — {d.status === "expired" ? "expired" : "documentation appears incomplete"}
                </li>
              );
            })}
            {vendorWarn ? (
              <li>Vendor verification: {state.vendorStatus.replace(/-/g, " ")}</li>
            ) : null}
            {!docGaps.length && !vendorWarn ? (
              <li>No document/vendor warnings yet — review trackers above.</li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="bwg-toolbar">
        <button
          type="button"
          className="bwg-btn bwg-btn--solid"
          onClick={() => {
            window.print();
            trackBwgEvent("print_summary");
          }}
        >
          Print summary
        </button>
        <a className="bwg-btn bwg-btn--outline" href="#section-action-plan">
          Open 30-day action plan
        </a>
        <button
          type="button"
          className="bwg-btn bwg-btn--danger"
          onClick={() => {
            if (
              window.confirm(
                "Reset assessment answers and all locally saved guide data?",
              )
            ) {
              clearAll();
            }
          }}
        >
          Reset
        </button>
      </div>

      <BwgConsultantCta compact />
    </div>
  );
}
