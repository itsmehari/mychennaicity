"use client";

import { useEffect, useRef, useState } from "react";
import { loadChennaiMapBundle } from "@/lib/chennai-map/load-map-bundle";
import {
  centroidFromSvgPath,
  svgToLngLat,
} from "@/lib/civic-geo/geo-utils";

const FEEDBACK_TYPES = [
  { id: "incorrect_locality", label: "Incorrect locality placement" },
  { id: "road_divided", label: "Road divided between zones" },
  { id: "inaccessible_office", label: "Inaccessible zonal office" },
  { id: "neighbourhood_split", label: "Natural neighbourhood split" },
  { id: "flood_response", label: "Flood-response concern" },
  { id: "duplicate_jurisdiction", label: "Duplicate or conflicting jurisdiction" },
  { id: "incorrect_ward", label: "Incorrect ward result" },
] as const;

export function BoundaryFeedbackMap() {
  const mapHostRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState<string>(FEEDBACK_TYPES[0]!.id);
  const [note, setNote] = useState("");
  const [wardHint, setWardHint] = useState("");
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const map = await loadChennaiMapBundle();
      if (cancelled || !mapHostRef.current) return;
      const host = mapHostRef.current;
      host.innerHTML = "";
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", map.manifest.viewBox);
      svg.setAttribute("class", "w-full h-full");
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const selectPoint = (
        x: number,
        y: number,
        wardNo: number,
      ) => {
        const point = svgToLngLat(x, y, map.manifest);
        setPin({ lat: point.lat, lng: point.lng });
        setWardHint(String(wardNo));
      };
      for (const w of map.wards) {
        if (w.wardNo <= 0) continue;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", w.d);
        path.setAttribute("fill", "color-mix(in srgb, var(--accent) 10%, transparent)");
        path.setAttribute("stroke", "color-mix(in srgb, var(--foreground) 15%, transparent)");
        path.setAttribute("stroke-width", "0.3");
        path.setAttribute("role", "button");
        path.setAttribute("tabindex", "0");
        path.setAttribute(
          "aria-label",
          `Mark feedback in ward ${w.wardNo}, ${w.zoneLabel} zone`,
        );
        path.style.cursor = "crosshair";
        path.addEventListener("click", (e) => {
          const screenMatrix = svg.getScreenCTM();
          if (!screenMatrix) return;
          const svgPoint = new DOMPoint(e.clientX, e.clientY).matrixTransform(
            screenMatrix.inverse(),
          );
          selectPoint(svgPoint.x, svgPoint.y, w.wardNo);
        });
        path.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          const centroid = centroidFromSvgPath(w.d);
          selectPoint(centroid.x, centroid.y, w.wardNo);
        });
        g.appendChild(path);
      }
      svg.appendChild(g);
      host.appendChild(svg);
    })().catch(() => {
      if (!cancelled) setStatus("Could not load the boundary map.");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) {
      setStatus("Click the map to mark a location.");
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("/api/civic-tools/boundary-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          lat: pin.lat,
          lng: pin.lng,
          wardHint: wardHint || null,
          note: note.trim() || null,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Submit failed");
      }
      setStatus("Thank you — your community report was recorded. It does not change official boundaries.");
      setNote("");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={(e) => void submit(e)} className="space-y-3">
        <p className="text-sm text-[var(--muted)]">
          Community reports only — submissions do not modify authoritative boundary
          data.
        </p>
        <label className="block text-sm">
          <span className="text-[var(--muted)]">Issue type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2"
          >
            {FEEDBACK_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-[var(--muted)]">Ward hint (optional)</span>
          <input
            value={wardHint}
            onChange={(e) => setWardHint(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-[var(--muted)]">Note</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2"
          />
        </label>
        {pin ? (
          <p className="text-xs text-[var(--muted)]">
            Pin: {pin.lat.toFixed(5)}, {pin.lng.toFixed(5)}
          </p>
        ) : (
          <p className="text-xs text-amber-700">Click the map to set location</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          Submit report
        </button>
        {status ? <p className="text-sm text-[var(--muted)]">{status}</p> : null}
      </form>
      <div
        ref={mapHostRef}
        className="aspect-[1000/780] max-h-[480px] overflow-hidden rounded-2xl border border-[var(--border)]"
        aria-label="Map — click to mark feedback location"
      />
    </div>
  );
}
