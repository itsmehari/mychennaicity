"use client";

import { useState } from "react";
import { ACTION_ITEMS } from "@/content/guides/bwg-readiness-2026/action-plan";
import { MYTHS } from "@/content/guides/bwg-readiness-2026/myths";
import {
  JOURNEY_STAGES,
  TRAINING_MODULES,
  trackBwgEvent,
  type ActionStatus,
} from "@/lib/guides/bwg-readiness-storage";
import { useBwgState } from "./bwg-state-provider";

export function BwgTrainingTracker() {
  const { state, setState } = useBwgState();

  return (
    <div className="bwg-tool" id="tool-training">
      <h3>Training tracker</h3>
      <div className="bwg-table-wrap">
        <table className="bwg-table">
          <thead>
            <tr>
              <th scope="col">Audience</th>
              <th scope="col">Topics</th>
              <th scope="col">Completed</th>
              <th scope="col">Date</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {TRAINING_MODULES.map((mod) => {
              const row = state.training.find((t) => t.id === mod.id)!;
              return (
                <tr key={mod.id}>
                  <th scope="row">{mod.audience}</th>
                  <td>{mod.topics}</td>
                  <td>
                    <input
                      type="checkbox"
                      aria-label={`${mod.audience} training completed`}
                      checked={row.completed}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          training: s.training.map((t) =>
                            t.id === mod.id
                              ? { ...t, completed: e.target.checked }
                              : t,
                          ),
                        }))
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      aria-label={`${mod.audience} training date`}
                      value={row.date ?? ""}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          training: s.training.map((t) =>
                            t.id === mod.id
                              ? { ...t, date: e.target.value }
                              : t,
                          ),
                        }))
                      }
                    />
                  </td>
                  <td>
                    <input
                      aria-label={`${mod.audience} training note`}
                      value={row.note ?? ""}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          training: s.training.map((t) =>
                            t.id === mod.id
                              ? { ...t, note: e.target.value }
                              : t,
                          ),
                        }))
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function BwgWasteJourneyWorkflow() {
  const { state, setState } = useBwgState();
  const [active, setActive] = useState<(typeof JOURNEY_STAGES)[number]["id"]>(
    "generation",
  );
  const stage = JOURNEY_STAGES.find((s) => s.id === active)!;
  const notes = state.journeyNotes[active] ?? { person: "", note: "" };

  return (
    <div className="bwg-tool" id="tool-journey">
      <h3>Inspect the entire waste journey</h3>
      <div
        className="bwg-journey"
        role="tablist"
        aria-label="Waste journey stages"
      >
        {JOURNEY_STAGES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={active === s.id}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" aria-label={stage.label}>
        <p>
          <strong>Control required:</strong> {stage.control}
        </p>
        <p>
          <strong>Common failure:</strong> {stage.failure}
        </p>
        <p>
          <strong>Corrective action:</strong> {stage.corrective}
        </p>
        <div className="bwg-field-row bwg-field-row--2">
          <div className="bwg-field">
            <label htmlFor={`journey-person-${stage.id}`}>
              Responsible person
            </label>
            <input
              id={`journey-person-${stage.id}`}
              value={notes.person}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  journeyNotes: {
                    ...s.journeyNotes,
                    [active]: { ...notes, person: e.target.value },
                  },
                }))
              }
            />
          </div>
          <div className="bwg-field">
            <label htmlFor={`journey-note-${stage.id}`}>Evidence / note</label>
            <input
              id={`journey-note-${stage.id}`}
              value={notes.note}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  journeyNotes: {
                    ...s.journeyNotes,
                    [active]: { ...notes, note: e.target.value },
                  },
                }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const METRICS = [
  "Total waste generated",
  "Waste per occupant / resident / bed / employee / student",
  "Wet-waste percentage",
  "Recyclable recovery percentage",
  "Residual-waste percentage",
  "Contamination incidents",
  "Missed collections",
  "Equipment downtime",
  "Complaints",
  "Training completion",
  "Vendor-document validity",
  "Statutory submissions completed",
  "Penalties or notices",
  "Corrective actions overdue",
];

export function BwgManagementMetrics() {
  const { state, setState } = useBwgState();

  return (
    <div className="bwg-tool" id="tool-metrics">
      <h3>Suggested monthly dashboard</h3>
      <p className="bwg-tool__hint">
        Set your own monthly reduction targets. This guide does not use an
        unverified universal “zero waste” benchmark.
      </p>
      <div className="bwg-table-wrap">
        <table className="bwg-table">
          <thead>
            <tr>
              <th scope="col">Metric</th>
              <th scope="col">Your monthly target / note</th>
            </tr>
          </thead>
          <tbody>
            {METRICS.map((m) => (
              <tr key={m}>
                <th scope="row">{m}</th>
                <td>
                  <input
                    aria-label={`${m} target`}
                    value={state.metricsTargets[m] ?? ""}
                    onChange={(e) =>
                      setState((s) => ({
                        ...s,
                        metricsTargets: {
                          ...s.metricsTargets,
                          [m]: e.target.value,
                        },
                      }))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function BwgMythAccordion() {
  return (
    <div className="bwg-accordion" id="bwg-faq">
      {MYTHS.map((m) => (
        <details key={m.id}>
          <summary>Myth: {m.myth}</summary>
          <div className="bwg-accordion__body">
            <strong>Reality:</strong> {m.reality}
          </div>
        </details>
      ))}
    </div>
  );
}

const ACTION_STATUSES: { id: ActionStatus; label: string }[] = [
  { id: "not-started", label: "Not started" },
  { id: "in-progress", label: "In progress" },
  { id: "completed", label: "Completed" },
  { id: "blocked", label: "Blocked" },
];

export function BwgThirtyDayPlanner() {
  const { state, setState } = useBwgState();
  const [opened, setOpened] = useState(false);

  const phases = Array.from(new Set(ACTION_ITEMS.map((a) => a.phase)));

  return (
    <div className="bwg-tool" id="tool-action-plan">
      <h3>30-day readiness action plan</h3>
      <div className="bwg-toolbar">
        <button
          type="button"
          className="bwg-btn bwg-btn--outline"
          onClick={() => {
            if (!opened) {
              trackBwgEvent("action_plan_opened");
              setOpened(true);
            }
          }}
        >
          Open action plan
        </button>
      </div>

      {phases.map((phase) => (
        <div key={phase} style={{ marginTop: "1.25rem" }}>
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.95rem" }}>
            {phase}
          </h4>
          <div className="bwg-table-wrap">
            <table className="bwg-table">
              <thead>
                <tr>
                  <th scope="col">Task</th>
                  <th scope="col">Status</th>
                  <th scope="col">Responsible</th>
                  <th scope="col">Due date</th>
                  <th scope="col">Note</th>
                </tr>
              </thead>
              <tbody>
                {ACTION_ITEMS.filter((a) => a.phase === phase).map((item) => {
                  const row = state.actionItems.find((a) => a.id === item.id)!;
                  return (
                    <tr key={item.id}>
                      <th scope="row">{item.title}</th>
                      <td>
                        <select
                          aria-label={`${item.title} status`}
                          value={row.status}
                          onChange={(e) =>
                            setState((s) => ({
                              ...s,
                              actionItems: s.actionItems.map((a) =>
                                a.id === item.id
                                  ? {
                                      ...a,
                                      status: e.target.value as ActionStatus,
                                    }
                                  : a,
                              ),
                            }))
                          }
                        >
                          {ACTION_STATUSES.map((st) => (
                            <option key={st.id} value={st.id}>
                              {st.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          aria-label={`${item.title} owner`}
                          value={row.owner ?? ""}
                          onChange={(e) =>
                            setState((s) => ({
                              ...s,
                              actionItems: s.actionItems.map((a) =>
                                a.id === item.id
                                  ? { ...a, owner: e.target.value }
                                  : a,
                              ),
                            }))
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          aria-label={`${item.title} due date`}
                          value={row.dueDate ?? ""}
                          onChange={(e) =>
                            setState((s) => ({
                              ...s,
                              actionItems: s.actionItems.map((a) =>
                                a.id === item.id
                                  ? { ...a, dueDate: e.target.value }
                                  : a,
                              ),
                            }))
                          }
                        />
                      </td>
                      <td>
                        <input
                          aria-label={`${item.title} note`}
                          value={row.note ?? ""}
                          onChange={(e) =>
                            setState((s) => ({
                              ...s,
                              actionItems: s.actionItems.map((a) =>
                                a.id === item.id
                                  ? { ...a, note: e.target.value }
                                  : a,
                              ),
                            }))
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
