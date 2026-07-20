"use client";

import {
  MATRIX_FUNCTIONS,
  type AuditDay,
} from "@/lib/guides/bwg-readiness-storage";
import { useBwgState } from "./bwg-state-provider";

export function BwgResponsibilityMatrix() {
  const { state, setState } = useBwgState();

  return (
    <div className="bwg-tool" id="tool-matrix">
      <h3>Organisational responsibility matrix</h3>
      <p className="bwg-tool__hint">
        Names typed here stay in your browser only. They are not sent to
        MyChennaiCity.in.
      </p>
      <div className="bwg-table-wrap">
        <table className="bwg-table">
          <thead>
            <tr>
              <th scope="col">Function</th>
              <th scope="col">Assigned person</th>
              <th scope="col">Department</th>
              <th scope="col">Frequency</th>
              <th scope="col">Evidence available</th>
            </tr>
          </thead>
          <tbody>
            {MATRIX_FUNCTIONS.map((fn) => {
              const row = state.matrix.find((m) => m.id === fn.id)!;
              return (
                <tr key={fn.id}>
                  <th scope="row">{fn.label}</th>
                  <td>
                    <input
                      aria-label={`${fn.label} person`}
                      value={row.person}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          matrix: s.matrix.map((m) =>
                            m.id === fn.id
                              ? { ...m, person: e.target.value }
                              : m,
                          ),
                        }))
                      }
                    />
                  </td>
                  <td>
                    <input
                      aria-label={`${fn.label} department`}
                      value={row.department}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          matrix: s.matrix.map((m) =>
                            m.id === fn.id
                              ? { ...m, department: e.target.value }
                              : m,
                          ),
                        }))
                      }
                    />
                  </td>
                  <td>{fn.frequency}</td>
                  <td>
                    <input
                      aria-label={`${fn.label} evidence`}
                      value={row.evidence}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          matrix: s.matrix.map((m) =>
                            m.id === fn.id
                              ? { ...m, evidence: e.target.value }
                              : m,
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

function dayTotal(d: AuditDay): number {
  return (
    d.wet +
    d.dryRecyclable +
    d.dryNonRecyclable +
    d.sanitary +
    d.specialCare +
    d.other
  );
}

export function BwgWasteAuditCalculator() {
  const { state, setState } = useBwgState();
  const { auditDays, auditUnit } = state;

  const factor = auditUnit === "tonnes" ? 1000 : 1;
  const totals = auditDays.map(dayTotal);
  const weekTotal = totals.reduce((a, b) => a + b, 0);
  const daysWithData = totals.filter((t) => t > 0).length || 1;
  const dailyAvg = weekTotal / (totals.some((t) => t > 0) ? daysWithData : 1);

  const streamSums = {
    wet: auditDays.reduce((a, d) => a + d.wet, 0),
    dryRecyclable: auditDays.reduce((a, d) => a + d.dryRecyclable, 0),
    dryNonRecyclable: auditDays.reduce((a, d) => a + d.dryNonRecyclable, 0),
    sanitary: auditDays.reduce((a, d) => a + d.sanitary, 0),
    specialCare: auditDays.reduce((a, d) => a + d.specialCare, 0),
    other: auditDays.reduce((a, d) => a + d.other, 0),
  };

  const pct = (n: number) =>
    weekTotal <= 0 ? 0 : Math.round((n / weekTotal) * 100);

  const highestIdx = totals.reduce(
    (best, n, i) => (n > totals[best]! ? i : best),
    0,
  );

  const bars = [
    { label: "Wet", value: streamSums.wet, color: "var(--bwg-green)" },
    {
      label: "Dry recyclable",
      value: streamSums.dryRecyclable,
      color: "var(--bwg-blue)",
    },
    {
      label: "Dry non-recyclable",
      value: streamSums.dryNonRecyclable,
      color: "var(--bwg-muted)",
    },
    { label: "Sanitary", value: streamSums.sanitary, color: "var(--bwg-amber)" },
    {
      label: "Special care",
      value: streamSums.specialCare,
      color: "var(--bwg-red)",
    },
    { label: "Other", value: streamSums.other, color: "#7a756c" },
  ];

  function patchDay(index: number, patch: Partial<AuditDay>) {
    setState((s) => ({
      ...s,
      activeStage: "audit",
      auditDays: s.auditDays.map((d, i) =>
        i === index ? { ...d, ...patch } : d,
      ),
    }));
  }

  const unitLabel = auditUnit === "tonnes" ? "t" : "kg";

  return (
    <div className="bwg-tool" id="tool-audit">
      <h3>Seven-day waste audit</h3>
      <p className="bwg-tool__hint">
        Weigh the waste before collection wherever practical. Estimates based
        only on the number of bins are unreliable unless bin volume and average
        density are documented.
      </p>

      <div className="bwg-field" style={{ maxWidth: "12rem" }}>
        <label htmlFor="bwg-audit-unit">Unit</label>
        <select
          id="bwg-audit-unit"
          value={auditUnit}
          onChange={(e) =>
            setState((s) => ({
              ...s,
              auditUnit: e.target.value as "kg" | "tonnes",
            }))
          }
        >
          <option value="kg">Kilograms</option>
          <option value="tonnes">Tonnes</option>
        </select>
      </div>

      <div className="bwg-table-wrap">
        <table className="bwg-table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Wet</th>
              <th scope="col">Dry recyclable</th>
              <th scope="col">Dry non-recyclable</th>
              <th scope="col">Sanitary</th>
              <th scope="col">Special care</th>
              <th scope="col">Other</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {auditDays.map((day, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="date"
                    aria-label={`Day ${i + 1} date`}
                    value={day.date}
                    onChange={(e) => patchDay(i, { date: e.target.value })}
                  />
                </td>
                {(
                  [
                    "wet",
                    "dryRecyclable",
                    "dryNonRecyclable",
                    "sanitary",
                    "specialCare",
                    "other",
                  ] as const
                ).map((key) => (
                  <td key={key}>
                    <input
                      inputMode="decimal"
                      aria-label={`Day ${i + 1} ${key}`}
                      value={day[key] || ""}
                      onChange={(e) =>
                        patchDay(i, {
                          [key]: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </td>
                ))}
                <td>
                  {dayTotal(day).toFixed(1)} {unitLabel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bwg-cards bwg-cards--3">
        <div className="bwg-card">
          <h3>Weekly total</h3>
          <p className="bwg-card__value">
            {weekTotal.toFixed(1)} {unitLabel}
            {auditUnit === "tonnes" ? "" : ` (~${(weekTotal / 1000).toFixed(2)} t)`}
          </p>
        </div>
        <div className="bwg-card">
          <h3>Daily average</h3>
          <p className="bwg-card__value">
            {dailyAvg.toFixed(1)} {unitLabel}
            {factor === 1 && dailyAvg >= 100
              ? " — at/above 100 kg/day signal"
              : ""}
          </p>
        </div>
        <div className="bwg-card">
          <h3>Highest day</h3>
          <p className="bwg-card__value">
            Day {highestIdx + 1}: {totals[highestIdx]?.toFixed(1)} {unitLabel}
          </p>
        </div>
      </div>

      <p>
        Wet-waste proportion: <strong>{pct(streamSums.wet)}%</strong> ·
        Recycling potential (dry recyclable):{" "}
        <strong>{pct(streamSums.dryRecyclable)}%</strong> · Residual (dry
        non-recyclable + other):{" "}
        <strong>
          {pct(streamSums.dryNonRecyclable + streamSums.other)}%
        </strong>
      </p>

      <div className="bwg-bars" aria-label="Waste composition chart">
        {bars.map((b) => (
          <div className="bwg-bar" key={b.label}>
            <span>{b.label}</span>
            <div className="bwg-bar__track">
              <div
                className="bwg-bar__fill"
                style={{
                  width: `${pct(b.value)}%`,
                  background: b.color,
                }}
              />
            </div>
            <span>
              {pct(b.value)}% ({b.value.toFixed(1)} {unitLabel})
            </span>
          </div>
        ))}
      </div>
      <p className="bwg-print-only">
        Composition: wet {pct(streamSums.wet)}%; dry recyclable{" "}
        {pct(streamSums.dryRecyclable)}%; dry non-recyclable{" "}
        {pct(streamSums.dryNonRecyclable)}%; sanitary {pct(streamSums.sanitary)}
        %; special care {pct(streamSums.specialCare)}%; other{" "}
        {pct(streamSums.other)}%.
      </p>
    </div>
  );
}
