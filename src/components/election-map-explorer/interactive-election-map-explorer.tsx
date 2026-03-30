"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CANDIDATES_BY_AC } from "@/content/elections-2026/candidates";
import { CONSTITUENCY_HOOK_BY_AC } from "@/content/elections-2026/constituency-blurbs";
import { CONSTITUENCY_FACTS_BY_AC } from "@/content/elections-2026/constituency-facts";
import {
  ALLIANCE_LABELS,
  PARTY_LEGEND_ITEMS,
} from "@/content/elections-2026/parties";
import { PAST_RESULTS_BY_AC } from "@/content/elections-2026/past-results";
import { ElectionMapController } from "@/lib/election-map/election-map-controller";
import { loadElectionMapBundle } from "@/lib/election-map/load-election-map-bundle";
import type {
  ConstituencyPathRecord,
  ElectionMapViewFilter,
} from "@/lib/election-map/types";
import "./election-map-explorer.css";

const VIEW_OPTIONS: { mode: ElectionMapViewFilter; label: string }[] = [
  { mode: "all", label: "All metro+" },
  { mode: "core", label: "Chennai core" },
  { mode: "suburban", label: "Suburban ring" },
];

type TooltipState = {
  x: number;
  y: number;
  c: ConstituencyPathRecord;
} | null;

export function InteractiveElectionMapExplorer() {
  const mapHostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<ElectionMapController | null>(null);
  const [bundleError, setBundleError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [selected, setSelected] = useState<ConstituencyPathRecord | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const [viewFilter, setViewFilter] = useState<ElectionMapViewFilter>("all");
  const [searchQ, setSearchQ] = useState("");

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const syncViewFilter = useCallback(() => {
    controllerRef.current?.setViewFilter(viewFilter);
  }, [viewFilter]);

  useEffect(() => {
    if (!shouldLoad || !mapHostRef.current) return;

    let cancelled = false;
    const host = mapHostRef.current;

    const ctrl = new ElectionMapController({
      onSelect: (c) => {
        setSelected(c);
      },
      onHover: (c, cx, cy) => {
        if (!c || cx == null || cy == null) {
          setTooltip(null);
          return;
        }
        setTooltip({ x: cx, y: cy, c });
      },
    });
    controllerRef.current = ctrl;

    (async () => {
      try {
        const bundle = await loadElectionMapBundle();
        if (cancelled) return;
        ctrl.mount(host, bundle.constituencies, bundle.manifest.viewBox);
        setBundleError(null);
        ctrl.setViewFilter(viewFilter);
      } catch (e) {
        if (!cancelled) {
          setBundleError(
            e instanceof Error ? e.message : "Could not load map data.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      ctrl.destroy();
      controllerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount once; view synced below
  }, [shouldLoad]);

  useEffect(() => {
    syncViewFilter();
  }, [syncViewFilter]);

  const handleReset = () => {
    setViewFilter("all");
    setSearchQ("");
    controllerRef.current?.reset();
    setSelected(null);
    setTooltip(null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const c = controllerRef.current;
    if (!c || !searchQ.trim()) return;
    const id = c.pickForSearch(searchQ);
    if (id) {
      c.select(id);
      mapHostRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const candidates = selected ? CANDIDATES_BY_AC[selected.acNo] : undefined;
  const hook = selected ? CONSTITUENCY_HOOK_BY_AC[selected.acNo] : undefined;
  const fact = selected ? CONSTITUENCY_FACTS_BY_AC[selected.acNo] : undefined;
  const pastRows = selected ? PAST_RESULTS_BY_AC[selected.acNo] : undefined;
  const past2021 = pastRows?.find((r) => r.year === 2021);
  const past2016 = pastRows?.find((r) => r.year === 2016);

  return (
    <div className="elmap-root">
      <div ref={sentinelRef} className="sr-only" aria-hidden />
      <div
        className="elmap-toolbar"
        role="toolbar"
        aria-label="Election map controls"
      >
        <div className="elmap-toolbar-group">
          <span className="elmap-toolbar-label" id="elmap-view-label">
            View
          </span>
          <div
            className="elmap-btn-row"
            role="group"
            aria-labelledby="elmap-view-label"
          >
            {VIEW_OPTIONS.map(({ mode, label }) => (
              <button
                key={mode}
                type="button"
                className="elmap-btn"
                aria-pressed={viewFilter === mode}
                onClick={() => setViewFilter(mode)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="elmap-toolbar-group">
          <span className="elmap-toolbar-label" id="elmap-search-label">
            Find constituency
          </span>
          <form
            className="elmap-search"
            onSubmit={handleSearchSubmit}
            aria-labelledby="elmap-search-label"
          >
            <input
              type="search"
              name="ac"
              placeholder="e.g. Velachery, Alandur, AC 19"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              aria-label="Search constituency name or number"
            />
            <button type="submit" className="elmap-btn">
              Go
            </button>
          </form>
        </div>

        <div className="elmap-toolbar-group">
          <span className="elmap-toolbar-label">Actions</span>
          <button type="button" className="elmap-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <div className="elmap-layout">
        <div>
          <div
            className="elmap-map-wrap"
            role="img"
            aria-label="Chennai metro plus assembly constituencies. Each area is one constituency."
          >
            <div ref={mapHostRef} className="elmap-map-inner" />
            {!shouldLoad ? (
              <div className="elmap-error pointer-events-none absolute inset-0 flex items-center justify-center bg-[color-mix(in_srgb,var(--surface)_88%,transparent)]">
                Scroll to load map…
              </div>
            ) : null}
            {loading && shouldLoad ? (
              <div className="elmap-error absolute inset-0 flex items-center justify-center bg-[color-mix(in_srgb,var(--surface)_88%,transparent)]">
                Loading map…
              </div>
            ) : null}
            {bundleError ? (
              <div className="elmap-error">
                <p>{bundleError}</p>
                <p>
                  Try again after refresh, or open{" "}
                  <Link href="/chennai-local-news/topic/elections" className="elmap-cta">
                    election news
                  </Link>
                  .
                </p>
                <button
                  type="button"
                  className="elmap-btn"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            ) : null}
          </div>

          <div className="elmap-legend">
            <h4>Alliance key</h4>
            <div className="elmap-legend-grid">
              {PARTY_LEGEND_ITEMS.map(({ allianceKey, short }) => (
                <div key={allianceKey} className="elmap-legend-item">
                  <span
                    className={`elmap-swatch ${allianceKey}`}
                    aria-hidden
                  />
                  <span>
                    <strong>{short}</strong> — {ALLIANCE_LABELS[allianceKey]}
                  </span>
                </div>
              ))}
            </div>
            <p className="elmap-attribution">
              Boundaries: 2021 assembly community dataset (see build script).
              Not an official ECI map. Refresh geometry with{" "}
              <code className="text-xs">npm run election-map:build</code>.
            </p>
          </div>
        </div>

        <aside
          className="elmap-panel"
          aria-live="polite"
          aria-label="Selected constituency"
        >
          {selected ? (
            <>
              <p className="elmap-crumb">
                AC {selected.acNo} · {selected.district} ·{" "}
                {selected.group === "core" ? "Chennai core" : "Suburban ring"}
              </p>
              <h3 id="elmap-panel-title">{selected.name}</h3>
              {hook ? <p className="elmap-hook">{hook}</p> : null}
              <p className="elmap-fact-line">
                {fact
                  ? `${fact.reservation} · ${fact.districtName}`
                  : `${selected.district} · Tamil Nadu assembly`}
              </p>
              <p className="elmap-meta">2026 candidates · curated from press</p>
              <p className="elmap-desc">
                Candidate names are editorial snapshots with sources where
                cited. Final nominations are subject to the Election Commission
                of India.
              </p>
              <Link
                href="/chennai-local-news/topic/elections"
                className="elmap-cta"
              >
                Election news hub →
              </Link>
              {candidates?.length ? (
                <ul className="elmap-candidate-list" aria-label="Reported candidates">
                  {candidates.map((row, i) => (
                    <li key={`${row.party}-${row.name}-${i}`} className="elmap-candidate">
                      <div className="elmap-candidate-party">{row.party}</div>
                      <div className="elmap-candidate-name">{row.name}</div>
                      {row.alliance ? (
                        <div className="elmap-candidate-alliance">
                          {row.alliance}
                          {row.asOf ? ` · as of ${row.asOf}` : null}
                        </div>
                      ) : row.asOf ? (
                        <div className="elmap-candidate-alliance">
                          As of {row.asOf}
                        </div>
                      ) : null}
                      {row.sourceUrl ? (
                        <a
                          href={row.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Source →
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="elmap-desc">
                  No curated rows for this constituency yet. Add entries in{" "}
                  <code className="text-xs">src/content/elections-2026/candidates.ts</code>.
                </p>
              )}
              {past2021 || past2016 ? (
                <div className="elmap-past">
                  <h4>Past assembly results (context)</h4>
                  <p className="elmap-desc" style={{ marginTop: 0 }}>
                    From Wikipedia constituency tables — verify against ECI
                    gazettes before citing as authoritative.
                  </p>
                  {past2021 ? (
                    <p className="elmap-past-row">
                      <strong>2021:</strong> {past2021.winnerParty} —{" "}
                      {past2021.winnerCandidate}
                      <span>
                        {" "}
                        (vs {past2021.runnerUpParty}
                        {past2021.marginVotes != null
                          ? `, margin ${past2021.marginVotes.toLocaleString("en-IN")} votes`
                          : ""}
                        {past2021.turnoutPct != null
                          ? `, turnout ${past2021.turnoutPct}%`
                          : ""}
                        )
                      </span>
                    </p>
                  ) : null}
                  {past2016 ? (
                    <p className="elmap-past-row">
                      <strong>2016:</strong> {past2016.winnerParty} —{" "}
                      {past2016.winnerCandidate}
                      <span>
                        {" "}
                        (vs {past2016.runnerUpParty}
                        {past2016.marginVotes != null
                          ? `, margin ${past2016.marginVotes.toLocaleString("en-IN")} votes`
                          : ""}
                        )
                      </span>
                    </p>
                  ) : null}
                  <div className="elmap-past-links">
                    {past2021 ? (
                      <a
                        href={past2021.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Wikipedia (2021 results) →
                      </a>
                    ) : null}
                    {past2016 ? (
                      <a
                        href={past2016.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Wikipedia (2016 results) →
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <>
              <h3 id="elmap-panel-title">Pick a constituency</h3>
              <p className="elmap-desc">
                Tap or click a seat on the map for AC number, district, and any
                candidates we have verified from press or party lists. Use search
                to jump by name.
              </p>
            </>
          )}
        </aside>
      </div>

      {tooltip ? (
        <div
          className="elmap-tooltip"
          style={{
            left: Math.min(
              tooltip.x + 12,
              typeof window !== "undefined" ? window.innerWidth - 300 : 0,
            ),
            top: tooltip.y + 12,
          }}
          role="tooltip"
        >
          <h3>
            AC {tooltip.c.acNo} — {tooltip.c.name}
          </h3>
          <p>{tooltip.c.district}</p>
        </div>
      ) : null}
    </div>
  );
}
