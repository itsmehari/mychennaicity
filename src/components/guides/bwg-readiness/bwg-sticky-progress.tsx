"use client";

import { useBwgState } from "./bwg-state-provider";
import { BWG_STAGES } from "@/content/guides/bwg-readiness-2026/meta";

export function BwgStickyProgress() {
  const { state, setState, clearAll } = useBwgState();

  return (
    <div className="bwg-sticky" role="navigation" aria-label="Assessment progress">
      <div className="bwg-sticky__stages">
        {BWG_STAGES.map((stage) => (
          <a
            key={stage.id}
            href={stage.href}
            data-active={state.activeStage === stage.id ? "true" : "false"}
            onClick={() =>
              setState((s) => ({ ...s, activeStage: stage.id }))
            }
          >
            {stage.label}
          </a>
        ))}
      </div>
      <a className="bwg-btn bwg-btn--primary" href="#section-assessment">
        Resume assessment
      </a>
      <button
        type="button"
        className="bwg-btn bwg-btn--danger"
        onClick={() => {
          if (
            typeof window !== "undefined" &&
            window.confirm(
              "Clear all locally saved assessment data on this device?",
            )
          ) {
            clearAll();
          }
        }}
      >
        Clear all data
      </button>
    </div>
  );
}
