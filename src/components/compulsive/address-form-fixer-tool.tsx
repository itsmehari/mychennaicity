"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  ADDRESS_CONCEPTS,
  ADDRESS_DECISION_STEPS,
  type AddressConcept,
} from "@/content/compulsive/address-form-fixer";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

type FormNeed = AddressConcept["id"] | "unsure";

const NEED_OPTIONS: { id: FormNeed; label: string }[] = [
  { id: "pin", label: "PIN / pincode" },
  { id: "ward", label: "Ward number" },
  { id: "zone", label: "Zone" },
  { id: "unsure", label: "Not sure — form is vague" },
];

export function AddressFormFixerTool() {
  const [need, setNeed] = useState<FormNeed>("unsure");
  const [stepIndex, setStepIndex] = useState(0);

  const concept = useMemo(
    () => ADDRESS_CONCEPTS.find((c) => c.id === need) ?? null,
    [need],
  );

  const step = ADDRESS_DECISION_STEPS[stepIndex] ?? ADDRESS_DECISION_STEPS[0];
  const path = compulsivePath("address-fixer");

  return (
    <div className="not-prose space-y-6">
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        <h2 className="text-sm font-bold text-[var(--foreground)]">
          What is the form asking for?
        </h2>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Pick the field that is failing — PIN, ward, and zone are different systems.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {NEED_OPTIONS.map((opt) => {
            const active = need === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setNeed(opt.id)}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                  active
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--foreground)]"
                    : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {concept ? (
          <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
              {concept.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
              {concept.short}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{concept.detail}</p>
            <p className="mt-3 text-sm text-[var(--foreground)]">
              <strong>Form tip:</strong> {concept.formTip}
            </p>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-[var(--border)] p-4 text-sm text-[var(--muted)]">
            Read the label carefully. If it says “area” or “locality”, type the neighbourhood
            name — not a GCC zone. If it demands a number with no label, ask the counter which
            system they mean, then use the steps below.
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-[var(--foreground)]">Decision steps</h2>
          <p className="text-[11px] font-semibold text-[var(--muted)]">
            Step {stepIndex + 1} / {ADDRESS_DECISION_STEPS.length}
          </p>
        </div>
        <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-sm font-semibold text-[var(--foreground)]">{step.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
          {step.href && step.hrefLabel ? (
            <Link
              href={step.href}
              className="mt-3 inline-flex text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              {step.hrefLabel} →
            </Link>
          ) : null}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={stepIndex === 0}
            onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-bold text-[var(--foreground)] disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            disabled={stepIndex >= ADDRESS_DECISION_STEPS.length - 1}
            onClick={() =>
              setStepIndex((i) => Math.min(ADDRESS_DECISION_STEPS.length - 1, i + 1))
            }
            className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs font-bold text-[var(--foreground)] hover:border-[var(--accent)] disabled:opacity-40"
          >
            Next step
          </button>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <Link
          href={CIVIC_TOOL_PATHS.zoneWardFinder}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--accent)]"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
            Lookup
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
            Zone & Ward Finder
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Current GCC zone and ward by locality, PIN, map, or GPS.
          </p>
        </Link>
        <Link
          href={CIVIC_TOOL_PATHS.wardMigration}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--accent)]"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
            Reorg
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
            Ward Migration Lookup
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            When an old ward number no longer matches the form.
          </p>
        </Link>
      </section>

      <div className="grid gap-3 sm:grid-cols-3">
        {ADDRESS_CONCEPTS.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3"
          >
            <p className="text-xs font-bold text-[var(--foreground)]">{c.label}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted)]">{c.short}</p>
          </div>
        ))}
      </div>

      <CopyShareButton
        buildText={() =>
          `Chennai address form tip: PIN ≠ ward ≠ zone. I checked “${NEED_OPTIONS.find((o) => o.id === need)?.label ?? "unsure"}” on mychennaicity.in${path} — also try ${getSiteUrl()}${CIVIC_TOOL_PATHS.zoneWardFinder}`
        }
      />
    </div>
  );
}
