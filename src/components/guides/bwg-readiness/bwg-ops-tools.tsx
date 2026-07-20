"use client";

import { useState } from "react";
import { DOCUMENT_ITEMS } from "@/content/guides/bwg-readiness-2026/documents";
import { trackBwgEvent } from "@/lib/guides/bwg-readiness-storage";
import { useBwgState } from "./bwg-state-provider";

const INFRA_ITEMS = [
  "Correctly labelled bins",
  "Consistent signage",
  "Adequate capacity",
  "Containers at points of generation",
  "Central storage with separate bays",
  "Washable surfaces",
  "Drainage where required",
  "Pest and odour control",
  "Fire-safety precautions",
  "Restricted access",
  "Sufficient lighting",
  "Protective equipment",
  "Weighing equipment",
  "Cleaning schedule",
  "Overflow-management procedure",
];

const FAILURES = [
  "One bin for all waste",
  "Correct bins but no labels",
  "Labels without staff training",
  "Segregated waste remixed during collection",
  "Wet waste stored in leaking bags",
  "Recyclable waste contaminated by food",
  "Sanitary waste placed openly",
  "Vendor collecting all streams in one vehicle",
  "No record of final destination",
];

const WET_PLANT = [
  "Capacity matches actual generation",
  "Equipment commissioning record",
  "Operating procedure",
  "Trained operator",
  "Electricity and water provision",
  "Feedstock-quality checks",
  "Bulking agent availability",
  "Odour-control system",
  "Leachate-control system",
  "Pest-control plan",
  "Maintenance contract",
  "Downtime contingency",
  "Daily input record",
  "Output record",
  "Reject record",
  "Compost-use or disposal record",
];

const WET_STEPS = [
  {
    id: "wet1",
    q: "Step 1 — How much wet waste is generated daily?",
    placeholder: "e.g. 40 kg/day",
  },
  {
    id: "wet2",
    q: "Step 2 — Is adequate land or service space available?",
    placeholder: "Yes / No / notes",
  },
  {
    id: "wet3",
    q: "Step 3 — Are odour, leachate, pest and maintenance controls feasible?",
    placeholder: "Notes",
  },
  {
    id: "wet4",
    q: "Step 4 — Is trained manpower available?",
    placeholder: "Notes",
  },
  {
    id: "wet5",
    q: "Step 5 — Can the output be safely used or transferred?",
    placeholder: "Notes",
  },
  {
    id: "wet6",
    q: "Step 6 — If on-site is not viable, has an authorised external route been documented?",
    placeholder: "Notes",
  },
];

export function BwgSegregationChecklist() {
  const { state, setState } = useBwgState();

  return (
    <div className="bwg-tool" id="tool-infra">
      <h3>Segregation infrastructure checklist</h3>
      <ul className="bwg-check-list">
        {INFRA_ITEMS.map((item) => {
          const id = `infra-${item}`;
          return (
            <li key={id}>
              <input
                type="checkbox"
                id={id}
                checked={!!state.segregationChecks[id]}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    activeStage: "infra",
                    segregationChecks: {
                      ...s.segregationChecks,
                      [id]: e.target.checked,
                    },
                  }))
                }
              />
              <label htmlFor={id}>{item}</label>
            </li>
          );
        })}
      </ul>

      <p style={{ marginTop: "1rem", fontWeight: 600 }}>Common failures</p>
      <div className="bwg-failure-strip" role="list">
        {FAILURES.map((f) => (
          <span key={f} role="listitem">
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

export function BwgWetWasteDecisionTree() {
  const { state, setState } = useBwgState();

  return (
    <div className="bwg-tool" id="tool-wet">
      <h3>Wet-waste decision pathway</h3>
      <p className="bwg-tool__hint">
        Possible systems: aerobic composting; organic waste converter;
        vermicomposting where suitable; biomethanation; authorised off-site
        processing; shared processing facility where formally permitted.
      </p>

      {WET_STEPS.map((step) => (
        <div className="bwg-field" key={step.id}>
          <label htmlFor={step.id}>{step.q}</label>
          <input
            id={step.id}
            value={state.wetTreeAnswers[step.id] ?? ""}
            placeholder={step.placeholder}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                wetTreeAnswers: {
                  ...s.wetTreeAnswers,
                  [step.id]: e.target.value,
                },
              }))
            }
          />
        </div>
      ))}

      <div className="bwg-alert">
        Installing equipment does not establish compliance. An idle, overloaded
        or poorly maintained composting machine may create a new sanitation
        problem rather than solve the original one.
      </div>

      <h3 style={{ marginTop: "1.25rem" }}>Wet-waste plant checklist</h3>
      <ul className="bwg-check-list">
        {WET_PLANT.map((item) => {
          const id = `wet-${item}`;
          return (
            <li key={id}>
              <input
                type="checkbox"
                id={id}
                checked={!!state.wetPlantChecks[id]}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    wetPlantChecks: {
                      ...s.wetPlantChecks,
                      [id]: e.target.checked,
                    },
                  }))
                }
              />
              <label htmlFor={id}>{item}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const VENDOR_FIELDS = [
  { id: "legalName", label: "Legal name" },
  { id: "address", label: "Registered address" },
  { id: "contact", label: "Contact person" },
  { id: "authNo", label: "Authorisation number" },
  { id: "authority", label: "Issuing authority" },
  { id: "validity", label: "Validity date" },
  { id: "category", label: "Authorised waste category" },
  { id: "vehicle", label: "Collection vehicle details" },
  { id: "destination", label: "Destination facility" },
  { id: "method", label: "Processing method" },
  { id: "weighment", label: "Weighment process" },
  { id: "invoice", label: "Invoice or receipt" },
  { id: "mrc", label: "Material-recovery certificate" },
  { id: "sub", label: "Subcontractor details" },
  { id: "insurance", label: "Insurance where relevant" },
  { id: "retention", label: "Record-retention terms" },
];

const VENDOR_STATUSES = [
  { id: "verified", label: "Verified" },
  { id: "partially-verified", label: "Partially verified" },
  { id: "documents-expired", label: "Documents expired" },
  { id: "scope-mismatch", label: "Scope mismatch" },
  { id: "final-destination-unknown", label: "Final destination unknown" },
  { id: "no-supporting-records", label: "No supporting records" },
] as const;

export function BwgVendorDueDiligence() {
  const { state, setState } = useBwgState();

  return (
    <div className="bwg-tool" id="tool-vendors">
      <h3>Vendor due-diligence checklist</h3>
      <p className="bwg-tool__hint">
        Listing or entering a service provider in this tool does not constitute
        endorsement or verification by MyChennaiCity.in.
      </p>

      <div className="bwg-field-row bwg-field-row--2">
        {VENDOR_FIELDS.map((f) => (
          <div className="bwg-field" key={f.id}>
            <label htmlFor={`vendor-${f.id}`}>{f.label}</label>
            <input
              id={`vendor-${f.id}`}
              value={state.vendorFields[f.id] ?? ""}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  activeStage: "vendors",
                  vendorFields: {
                    ...s.vendorFields,
                    [f.id]: e.target.value,
                  },
                }))
              }
            />
          </div>
        ))}
      </div>

      <div className="bwg-alert">
        A commercial invoice alone does not prove environmentally sound
        processing. The organisation should know where the waste is transported,
        who receives it and what evidence confirms final recovery or disposal.
      </div>

      <p style={{ fontWeight: 600 }}>Verification status</p>
      <div className="bwg-chips" role="group" aria-label="Vendor verification status">
        {VENDOR_STATUSES.map((st) => (
          <button
            key={st.id}
            type="button"
            className="bwg-chip"
            aria-pressed={state.vendorStatus === st.id}
            onClick={() =>
              setState((s) => ({
                ...s,
                vendorStatus: st.id,
              }))
            }
          >
            {st.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const REGULATED = [
  { id: "biomedical", label: "Biomedical" },
  { id: "ewaste", label: "E-waste" },
  { id: "batteries", label: "Batteries" },
  { id: "hazardous", label: "Hazardous chemicals" },
  { id: "oil", label: "Used oil" },
  { id: "cd", label: "C&D debris" },
  { id: "plastic", label: "Plastic packaging" },
  { id: "none", label: "None identified" },
  { id: "unsure", label: "Unsure" },
];

export function BwgRegulatedWastePicker() {
  const { state, setState } = useBwgState();
  const selected = state.regulatedWaste;
  const needsNotice =
    selected.length > 0 &&
    !selected.every((id) => id === "none");

  function toggle(id: string) {
    setState((s) => {
      let next = [...s.regulatedWaste];
      if (id === "none") {
        next = next.includes("none") ? [] : ["none"];
      } else {
        next = next.filter((x) => x !== "none");
        if (next.includes(id)) next = next.filter((x) => x !== id);
        else next.push(id);
      }
      return { ...s, regulatedWaste: next };
    });
  }

  return (
    <div className="bwg-tool" id="tool-regulated">
      <h3>Does your organisation generate any separately regulated waste?</h3>
      <div className="bwg-chips" role="group">
        {REGULATED.map((r) => (
          <button
            key={r.id}
            type="button"
            className="bwg-chip"
            aria-pressed={selected.includes(r.id)}
            onClick={() => toggle(r.id)}
          >
            {r.label}
          </button>
        ))}
      </div>
      {needsNotice ? (
        <div className="bwg-caution" role="status">
          Separate legal verification is required. Do not treat this readiness
          tool as the compliance checklist for that waste category.
        </div>
      ) : null}
    </div>
  );
}

const DOC_STATUSES = [
  { id: "available", label: "Available" },
  { id: "missing", label: "Not available" },
  { id: "expired", label: "Expired" },
  { id: "not-applicable", label: "Not applicable" },
] as const;

export function BwgDocumentTracker() {
  const { state, setState } = useBwgState();
  const [opened, setOpened] = useState(false);

  return (
    <div className="bwg-tool" id="tool-documents">
      <h3>Document repository checklist</h3>
      <p className="bwg-tool__hint">
        Use your browser print function for a printable summary. This website
        does not issue a compliance certificate.
      </p>
      <div className="bwg-toolbar">
        <button
          type="button"
          className="bwg-btn bwg-btn--outline"
          onClick={() => {
            if (!opened) {
              trackBwgEvent("document_tracker_opened");
              setOpened(true);
            }
            window.print();
            trackBwgEvent("print_summary");
          }}
        >
          Print / save as PDF
        </button>
      </div>

      <div className="bwg-table-wrap">
        <table className="bwg-table">
          <thead>
            <tr>
              <th scope="col">Document</th>
              <th scope="col">Status</th>
              <th scope="col">Responsible person</th>
              <th scope="col">Renewal date</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {DOCUMENT_ITEMS.map((doc) => {
              const row = state.documents.find((d) => d.id === doc.id)!;
              return (
                <tr key={doc.id}>
                  <th scope="row">{doc.name}</th>
                  <td>
                    <select
                      aria-label={`${doc.name} status`}
                      value={row.status}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          activeStage: "records",
                          documents: s.documents.map((d) =>
                            d.id === doc.id
                              ? {
                                  ...d,
                                  status: e.target
                                    .value as (typeof DOC_STATUSES)[number]["id"],
                                }
                              : d,
                          ),
                        }))
                      }
                    >
                      {DOC_STATUSES.map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      aria-label={`${doc.name} owner`}
                      value={row.owner ?? ""}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          documents: s.documents.map((d) =>
                            d.id === doc.id
                              ? { ...d, owner: e.target.value }
                              : d,
                          ),
                        }))
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      aria-label={`${doc.name} renewal`}
                      value={row.renewalDate ?? ""}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          documents: s.documents.map((d) =>
                            d.id === doc.id
                              ? { ...d, renewalDate: e.target.value }
                              : d,
                          ),
                        }))
                      }
                    />
                  </td>
                  <td>
                    <input
                      aria-label={`${doc.name} note`}
                      value={row.note ?? ""}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          documents: s.documents.map((d) =>
                            d.id === doc.id
                              ? { ...d, note: e.target.value }
                              : d,
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
