"use client";

import type { LayerMeta } from "@/lib/civic-geo/types";

export function LayerSwitcher({
  layers,
  activeIds,
  onToggle,
}: {
  layers: LayerMeta[];
  activeIds: Set<string>;
  onToggle: (layerId: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {layers.map((layer) => {
        const disabled = !layer.geometryAvailable;
        const active = activeIds.has(layer.layerId);
        return (
          <button
            key={layer.layerId}
            type="button"
            disabled={disabled}
            onClick={() => onToggle(layer.layerId)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
              disabled
                ? "cursor-not-allowed border-[var(--border)] text-[var(--muted)] opacity-60"
                : active
                  ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--foreground)]"
                  : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]/40"
            }`}
            title={disabled ? "Awaiting official geometry" : layer.statusLabel}
          >
            {layer.label}
            {disabled ? " (pending)" : ""}
          </button>
        );
      })}
    </div>
  );
}

export function OpacitySlider({
  value,
  onChange,
  label = "Layer opacity",
}: {
  value: number;
  onChange: (v: number) => void;
  label?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs text-[var(--muted)]">
      {label}
      <input
        type="range"
        min={0.1}
        max={1}
        step={0.05}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </label>
  );
}
