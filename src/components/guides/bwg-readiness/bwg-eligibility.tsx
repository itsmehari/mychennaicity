"use client";

import { useMemo } from "react";
import {
  evaluateEligibility,
  trackBwgEvent,
} from "@/lib/guides/bwg-readiness-storage";
import { useBwgState } from "./bwg-state-provider";

const ORG_TYPES = [
  "Apartment / gated community / RWA",
  "Hotel / restaurant",
  "Hospital / nursing home",
  "School / college / hostel",
  "IT park / office campus",
  "Mall / large retail",
  "Marriage hall / event venue",
  "Market / commercial complex",
  "Place of worship",
  "Government / public institution",
  "Industrial / institutional campus",
  "Facility-management / other",
];

const RESULT_LABEL: Record<string, string> = {
  likely: "Likely BWG",
  possibly: "Possibly BWG — verification required",
  below: "Currently below the stated thresholds",
  insufficient: "Insufficient information",
};

export function BwgEligibilityChecker() {
  const { state, setState } = useBwgState();
  const { eligibility } = state;

  const evaluated = useMemo(
    () => evaluateEligibility(eligibility),
    [eligibility],
  );

  function update(field: keyof typeof eligibility, value: string) {
    setState((s) => ({
      ...s,
      eligibility: { ...s.eligibility, [field]: value },
      activeStage: "know",
    }));
  }

  return (
    <div className="bwg-tool" id="tool-eligibility">
      <h3>Could We Be a Bulk Waste Generator?</h3>
      <p className="bwg-tool__hint">
        Meeting any one applicable threshold may bring an establishment within
        the BWG framework. This preliminary tool is for awareness and internal
        assessment only.
      </p>

      <div className="bwg-field">
        <label htmlFor="bwg-org-type">Organisation type</label>
        <select
          id="bwg-org-type"
          value={eligibility.orgType}
          onChange={(e) => update("orgType", e.target.value)}
        >
          <option value="">Select type</option>
          {ORG_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="bwg-field-row bwg-field-row--2">
        <div className="bwg-field">
          <label htmlFor="bwg-floor">Approximate floor area (m²)</label>
          <input
            id="bwg-floor"
            inputMode="decimal"
            value={eligibility.floorArea}
            onChange={(e) => update("floorArea", e.target.value)}
            placeholder="e.g. 22000"
          />
        </div>
        <div className="bwg-field">
          <label htmlFor="bwg-water">Average daily water (litres)</label>
          <input
            id="bwg-water"
            inputMode="decimal"
            value={eligibility.waterLitres}
            onChange={(e) => update("waterLitres", e.target.value)}
            placeholder="e.g. 45000"
          />
        </div>
      </div>

      <div className="bwg-field-row bwg-field-row--2">
        <div className="bwg-field">
          <label htmlFor="bwg-waste">Approx. daily solid waste (kg)</label>
          <input
            id="bwg-waste"
            inputMode="decimal"
            value={eligibility.wasteKg}
            onChange={(e) => update("wasteKg", e.target.value)}
            placeholder="e.g. 120"
          />
        </div>
        <div className="bwg-field">
          <label htmlFor="bwg-occupants">
            Occupants / employees / residents / beds / students / visitors
          </label>
          <input
            id="bwg-occupants"
            inputMode="numeric"
            value={eligibility.occupants}
            onChange={(e) => update("occupants", e.target.value)}
            placeholder="Optional context"
          />
        </div>
      </div>

      <button
        type="button"
        className="bwg-btn bwg-btn--solid"
        onClick={() => trackBwgEvent("eligibility_completed")}
      >
        Update readiness signal
      </button>

      <div
        className={`bwg-result bwg-result--${evaluated.result}`}
        role="status"
        aria-live="polite"
      >
        <strong>{RESULT_LABEL[evaluated.result]}</strong>
        <ul>
          {evaluated.reasons.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>

      <p className="bwg-privacy">
        This preliminary tool is for awareness and internal assessment. Formal
        classification should be confirmed using the applicable Rules and
        directions issued by the competent authorities. Answers stay in your
        browser only.
      </p>
    </div>
  );
}

export function BwgFourStreamExplainer() {
  const streams = [
    {
      title: "Wet waste",
      examples:
        "Food waste; vegetable and fruit waste; kitchen waste; canteen leftovers; biodegradable garden material where applicable.",
      questions: [
        "Is it separately collected?",
        "Is contamination monitored?",
        "Can it be processed on-site?",
        "Is daily quantity measured?",
      ],
    },
    {
      title: "Dry waste",
      examples:
        "Paper; cardboard; clean plastic; metal; glass; packaging; other recyclable and non-recyclable dry fractions.",
      questions: [
        "Is it kept dry?",
        "Is recyclable material separated?",
        "Is it handed to an authorised recycler?",
        "Are records retained?",
      ],
    },
    {
      title: "Sanitary waste",
      examples:
        "Used sanitary napkins; diapers; incontinence products; similar hygiene waste.",
      questions: [
        "Is it securely wrapped?",
        "Is it collected separately?",
        "Are housekeeping staff trained?",
        "Is the handover route clearly documented?",
      ],
    },
    {
      title: "Special-care waste",
      examples:
        "Discarded medicines; bulbs and tube lights; batteries; paint and chemical containers; mercury-containing items; household-level hazardous products; other categories identified under the Rules.",
      questions: [
        "Is it mixed with ordinary dry waste?",
        "Is temporary storage safe?",
        "Is a designated collection channel identified?",
        "Are spills and breakages addressed?",
      ],
    },
  ];

  return (
    <div className="bwg-cards bwg-cards--4" aria-label="Four waste streams">
      {streams.map((s) => (
        <div className="bwg-card" key={s.title}>
          <h3>{s.title}</h3>
          <p>{s.examples}</p>
          <ul style={{ marginTop: "0.65rem", paddingLeft: "1rem" }}>
            {s.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
