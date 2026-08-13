"use client";

import { useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import { AREA_RIVALRIES, type AreaRivalry } from "@/content/compulsive/area-rivalries";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";

function SidePanel({
  side,
  active,
}: {
  side: AreaRivalry["a"];
  active: boolean;
}) {
  if (!active) return null;
  return (
    <div className="space-y-3 rounded-xl border border-[var(--border)] p-4">
      <h3 className="text-lg font-bold text-[var(--foreground)]">{side.name}</h3>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          Food
        </p>
        <p className="mt-1 text-sm text-[var(--muted)]">{side.food}</p>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          Commute
        </p>
        <p className="mt-1 text-sm text-[var(--muted)]">{side.commute}</p>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          Vibe
        </p>
        <p className="mt-1 text-sm text-[var(--muted)]">{side.vibe}</p>
      </div>
      <div className="rounded-lg bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] p-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          Peace tip
        </p>
        <p className="mt-1 text-sm text-[var(--foreground)]">{side.peaceTip}</p>
      </div>
    </div>
  );
}

export function AreaRivalryCards() {
  const [pairId, setPairId] = useState(AREA_RIVALRIES[0]?.id ?? "");
  const [pick, setPick] = useState<"a" | "b">("a");
  const pair = AREA_RIVALRIES.find((r) => r.id === pairId) ?? AREA_RIVALRIES[0];
  const path = compulsivePath("rivalries");

  if (!pair) return null;

  const activeSide = pick === "a" ? pair.a : pair.b;

  return (
    <div className="not-prose space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <label className="block text-xs font-semibold text-[var(--foreground)]">
        Pick a playful rivalry
        <select
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          value={pair.id}
          onChange={(e) => {
            setPairId(e.target.value);
            setPick("a");
          }}
        >
          {AREA_RIVALRIES.map((r) => (
            <option key={r.id} value={r.id}>
              {r.title}
            </option>
          ))}
        </select>
      </label>

      <p className="text-sm text-[var(--muted)]">{pair.tease}</p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setPick("a")}
          className={`rounded-full px-3 py-1.5 text-xs font-bold ${
            pick === "a"
              ? "bg-[var(--accent)] text-[var(--accent-fg)]"
              : "border border-[var(--border)] text-[var(--foreground)]"
          }`}
        >
          {pair.a.name}
        </button>
        <button
          type="button"
          onClick={() => setPick("b")}
          className={`rounded-full px-3 py-1.5 text-xs font-bold ${
            pick === "b"
              ? "bg-[var(--accent)] text-[var(--accent-fg)]"
              : "border border-[var(--border)] text-[var(--foreground)]"
          }`}
        >
          {pair.b.name}
        </button>
      </div>

      <SidePanel side={pair.a} active={pick === "a"} />
      <SidePanel side={pair.b} active={pick === "b"} />

      <CopyShareButton
        buildText={() =>
          `Chennai area rivalry: ${pair.title} — looking at ${activeSide.name}. ${activeSide.peaceTip} Cards: ${getSiteUrl()}${path}`
        }
      />
    </div>
  );
}
