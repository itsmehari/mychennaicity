"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getChennaiZoneBySlug } from "@/lib/chennai-zones";
import {
  normalizeAreaHubSlug,
  parseHomeMapQuery,
} from "@/lib/area-hubs/geography";
import { ChennaiMapController } from "@/lib/chennai-map/map-controller";
import { loadChennaiMapBundle } from "@/lib/chennai-map/load-map-bundle";
import type {
  LocalityRecord,
  MapViewMode,
  OverlayKey,
  WardPathRecord,
} from "@/lib/chennai-map/types";
import "./chennai-map-explorer.css";

const OVERLAY_LABELS: { key: OverlayKey; label: string }[] = [
  { key: "itCorridor", label: "IT corridor" },
  { key: "metro", label: "Metro" },
  { key: "industrial", label: "Industrial" },
  { key: "floodRisk", label: "Flood-sensitive" },
  { key: "growthZone", label: "Growth area" },
];

const VIEW_LABELS: { mode: MapViewMode; label: string }[] = [
  { mode: "greater", label: "Full city wards" },
  { mode: "core", label: "Chennai core" },
  { mode: "region", label: "By region" },
  { mode: "corridor", label: "Corridor" },
];

const REGIONS = [
  { id: "north", label: "North" },
  { id: "central", label: "Central" },
  { id: "south", label: "South" },
  { id: "extended", label: "Extended" },
] as const;

const CORRIDORS = [
  { id: "omr", label: "OMR" },
  { id: "ecr", label: "ECR" },
  { id: "gst", label: "GST" },
  { id: "nh48", label: "NH48 / Sriperumbudur" },
  { id: "north-industrial", label: "North industrial" },
] as const;

type TooltipState = {
  x: number;
  y: number;
  ward: WardPathRecord;
  locality: LocalityRecord;
} | null;

export type InteractiveChennaiMapExplorerProps = {
  initialHubSlug?: string;
  forceLoad?: boolean;
  compact?: boolean;
};

function readDeepLinkFromLocation(): {
  hub: string | null;
  ward: number | null;
} {
  if (typeof window === "undefined") return { hub: null, ward: null };
  const hash = window.location.hash || "";
  const fromHash = hash.includes("?")
    ? hash.slice(hash.indexOf("?") + 1)
    : "";
  const parsedHash = parseHomeMapQuery(fromHash);
  const parsedSearch = parseHomeMapQuery(window.location.search);
  return {
    hub: parsedHash.hub ?? parsedSearch.hub,
    ward: parsedHash.ward ?? parsedSearch.ward,
  };
}

export function InteractiveChennaiMapExplorer({
  initialHubSlug,
  forceLoad = false,
  compact = false,
}: InteractiveChennaiMapExplorerProps = {}) {
  const mapHostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<ChennaiMapController | null>(null);
  const [bundleError, setBundleError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(forceLoad);
  const [hubFilter, setHubFilter] = useState<string | null>(
    () => normalizeAreaHubSlug(initialHubSlug) ?? null,
  );
  const [selected, setSelected] = useState<{
    ward: WardPathRecord;
    locality: LocalityRecord;
  } | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const [overlays, setOverlays] = useState<Set<OverlayKey>>(new Set());
  const [viewMode, setViewMode] = useState<MapViewMode>("greater");
  const [regionFilter, setRegionFilter] = useState<string>("north");
  const [corridorKey, setCorridorKey] = useState<string>("omr");
  const [searchQ, setSearchQ] = useState("");

  const sentinelRef = useRef<HTMLDivElement>(null);
  const pendingDeepLink = useRef(readDeepLinkFromLocation());

  useEffect(() => {
    if (forceLoad) {
      setShouldLoad(true);
      return;
    }
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
  }, [forceLoad]);

  useEffect(() => {
    const apply = () => {
      const { hub, ward } = readDeepLinkFromLocation();
      pendingDeepLink.current = { hub, ward };
      if (hub) setHubFilter(hub);
      const c = controllerRef.current;
      if (!c) return;
      if (hub) c.setHubFilter(hub);
      if (ward != null) {
        const id = c.pickWardByNumber(ward);
        if (id) c.select(id);
      } else if (hub) {
        const id = c.pickWardForHub(hub);
        if (id) c.select(id);
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const syncControllerChrome = useCallback(() => {
    const c = controllerRef.current;
    if (!c) return;
    c.setOverlays(overlays);
    c.setViewMode(viewMode);
    c.setRegionFilter(viewMode === "region" ? regionFilter : null);
    c.setCorridorFilter(viewMode === "corridor" ? corridorKey : null);
    c.setHubFilter(hubFilter);
  }, [overlays, viewMode, regionFilter, corridorKey, hubFilter]);

  useEffect(() => {
    if (!shouldLoad || !mapHostRef.current) return;

    let cancelled = false;
    const host = mapHostRef.current;

    const ctrl = new ChennaiMapController({
      onSelect: (ward, locality) => {
        if (!ward || !locality) {
          setSelected(null);
          return;
        }
        setSelected({ ward, locality });
      },
      onHover: (ward, locality, cx, cy) => {
        if (!ward || !locality || cx == null || cy == null) {
          setTooltip(null);
          return;
        }
        setTooltip({ x: cx, y: cy, ward, locality });
      },
    });
    controllerRef.current = ctrl;

    (async () => {
      try {
        const bundle = await loadChennaiMapBundle();
        if (cancelled) return;
        ctrl.mount(
          host,
          bundle.wards,
          bundle.localities,
          bundle.manifest.viewBox,
        );
        setBundleError(null);
        ctrl.setOverlays(overlays);
        ctrl.setViewMode(viewMode);
        ctrl.setRegionFilter(viewMode === "region" ? regionFilter : null);
        ctrl.setCorridorFilter(viewMode === "corridor" ? corridorKey : null);

        const deep = pendingDeepLink.current;
        const focusHub =
          normalizeAreaHubSlug(initialHubSlug) ?? deep.hub ?? hubFilter;
        if (focusHub) {
          setHubFilter(focusHub);
          ctrl.setHubFilter(focusHub);
        }
        if (deep.ward != null) {
          const id = ctrl.pickWardByNumber(deep.ward);
          if (id) ctrl.select(id);
        } else if (focusHub) {
          const id = ctrl.pickWardForHub(focusHub);
          if (id) ctrl.select(id);
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initial mount only; chrome synced below
  }, [shouldLoad]);

  useEffect(() => {
    syncControllerChrome();
  }, [syncControllerChrome]);

  const toggleOverlay = (key: OverlayKey) => {
    setOverlays((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleReset = () => {
    setViewMode("greater");
    setRegionFilter("north");
    setCorridorKey("omr");
    setOverlays(new Set());
    setSearchQ("");
    const slug = normalizeAreaHubSlug(initialHubSlug);
    setHubFilter(slug);
    controllerRef.current?.reset();
    if (slug) {
      controllerRef.current?.setHubFilter(slug);
      const id = controllerRef.current?.pickWardForHub(slug);
      if (id) controllerRef.current?.select(id);
    }
    setSelected(null);
    setTooltip(null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const c = controllerRef.current;
    if (!c || !searchQ.trim()) return;
    const id = c.pickWardForSearch(searchQ);
    if (id) {
      c.select(id);
      mapHostRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const onViewModeChange = (mode: MapViewMode) => {
    setViewMode(mode);
    if (mode === "corridor" && !corridorKey) setCorridorKey("omr");
    if (mode === "region" && !regionFilter) setRegionFilter("north");
  };

  const hubZone = hubFilter ? getChennaiZoneBySlug(hubFilter) : null;
  const selectedHubSlug = selected
    ? normalizeAreaHubSlug(selected.locality.primaryHubSlug) ??
      selected.locality.primaryHubSlug
    : null;

  return (
    <div className={`ccmap-root${compact ? " ccmap-root--compact" : ""}`}>
      <div ref={sentinelRef} className="sr-only" aria-hidden />
      {!compact ? (
      <div
        className="ccmap-toolbar"
        role="toolbar"
        aria-label="Map explorer controls"
      >
        <div className="ccmap-toolbar-group">
          <span className="ccmap-toolbar-label" id="ccmap-view-label">
            View
          </span>
          <div
            className="ccmap-btn-row"
            role="group"
            aria-labelledby="ccmap-view-label"
          >
            {VIEW_LABELS.map(({ mode, label }) => (
              <button
                key={mode}
                type="button"
                className="ccmap-btn"
                aria-pressed={viewMode === mode}
                onClick={() => onViewModeChange(mode)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {viewMode === "region" ? (
          <div className="ccmap-toolbar-group">
            <span className="ccmap-toolbar-label" id="ccmap-region-label">
              Region
            </span>
            <select
              id="ccmap-region"
              className="ccmap-select"
              aria-labelledby="ccmap-region-label"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {viewMode === "corridor" ? (
          <div className="ccmap-toolbar-group">
            <span className="ccmap-toolbar-label" id="ccmap-corridor-label">
              Corridor
            </span>
            <select
              id="ccmap-corridor"
              className="ccmap-select"
              aria-labelledby="ccmap-corridor-label"
              value={corridorKey}
              onChange={(e) => setCorridorKey(e.target.value)}
            >
              {CORRIDORS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="ccmap-toolbar-group">
          <span className="ccmap-toolbar-label" id="ccmap-overlay-label">
            Overlays
          </span>
          <div
            className="ccmap-btn-row"
            role="group"
            aria-labelledby="ccmap-overlay-label"
          >
            {OVERLAY_LABELS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                className="ccmap-btn"
                aria-pressed={overlays.has(key)}
                onClick={() => toggleOverlay(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="ccmap-toolbar-group">
          <span className="ccmap-toolbar-label" id="ccmap-search-label">
            Find area
          </span>
          <form
            className="ccmap-search"
            onSubmit={handleSearchSubmit}
            aria-labelledby="ccmap-search-label"
          >
            <input
              type="search"
              name="area"
              placeholder="e.g. Adyar, Perungudi"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              aria-label="Search locality name"
            />
            <button type="submit" className="ccmap-btn">
              Go
            </button>
          </form>
        </div>

        <div className="ccmap-toolbar-group">
          <span className="ccmap-toolbar-label">Actions</span>
          <button type="button" className="ccmap-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      ) : null}

      {hubZone ? (
        <p className="ccmap-hub-banner">
          Showing <strong>{hubZone.label}</strong> on the ward map.{" "}
          <Link href={`/areas/${hubZone.slug}`}>Open full area guide →</Link>
        </p>
      ) : null}

      <div className="ccmap-layout">
        <div>
          <div
            className="ccmap-map-wrap"
            role="img"
            aria-label="Chennai ward map using open civic geometry. Polygons follow common GCC ward labelling — verify boundaries on official corporation maps for legal or planning use."
          >
            <div ref={mapHostRef} className="ccmap-map-inner" />
            {!shouldLoad ? (
              <div className="ccmap-error pointer-events-none absolute inset-0 flex items-center justify-center bg-[color-mix(in_srgb,var(--surface)_88%,transparent)]">
                Scroll to load ward map…
              </div>
            ) : null}
            {loading && shouldLoad ? (
              <div className="ccmap-error absolute inset-0 flex items-center justify-center bg-[color-mix(in_srgb,var(--surface)_88%,transparent)]">
                Loading map…
              </div>
            ) : null}
            {bundleError ? (
              <div className="ccmap-error">
                <p>{bundleError}</p>
                <p>
                  Open area hubs still work — browse{" "}
                  <Link href="/areas" className="ccmap-cta">
                    all areas
                  </Link>{" "}
                  or retry after refreshing.
                </p>
                <button
                  type="button"
                  className="ccmap-btn"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            ) : null}
          </div>

          <div className="ccmap-legend">
            <h4>Legend</h4>
            <div className="ccmap-legend-grid">
              <div className="ccmap-legend-item">
                <span className="ccmap-swatch it" aria-hidden />
                <span>IT corridor overlay</span>
              </div>
              <div className="ccmap-legend-item">
                <span className="ccmap-swatch metro" aria-hidden />
                <span>Metro-connected overlay</span>
              </div>
              <div className="ccmap-legend-item">
                <span className="ccmap-swatch industrial" aria-hidden />
                <span>Industrial belt overlay</span>
              </div>
              <div className="ccmap-legend-item">
                <span className="ccmap-swatch flood" aria-hidden />
                <span>Flood-sensitive overlay</span>
              </div>
              <div className="ccmap-legend-item">
                <span className="ccmap-swatch growth" aria-hidden />
                <span>Growth area overlay</span>
              </div>
            </div>
            <p className="ccmap-attribution">
              Ward shapes are built from community GCC-aligned datasets (for example Datameet-style releases). They are editorial, not a legal survey — confirm license and official Greater Chennai Corporation geometry for authoritative use.
            </p>
          </div>
        </div>

        <aside
          className="ccmap-panel"
          aria-live="polite"
          aria-label="Selected ward details"
        >
          {selected ? (
            <>
              <p className="ccmap-crumb">
                Ward {selected.ward.wardNo || "—"} ·{" "}
                {selected.ward.zoneLabel} · {selected.locality.region}
              </p>
              <h3 id="ccmap-panel-title">{selected.locality.name}</h3>
              <p className="ccmap-meta">{selected.locality.zone}</p>
              <div className="ccmap-badges" aria-label="Area types">
                {selected.locality.type.map((t) => (
                  <span key={t} className="ccmap-badge">
                    {t}
                  </span>
                ))}
              </div>
              <p className="ccmap-desc">{selected.locality.description}</p>
              {selected.locality.tags.length ? (
                <div className="ccmap-badges" aria-label="Tags">
                  {selected.locality.tags.map((t) => (
                    <span key={t} className="ccmap-badge">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
              {selected.locality.corridors.length ? (
                <p className="ccmap-meta" style={{ marginTop: "0.5rem" }}>
                  Corridors: {selected.locality.corridors.join(" · ")}
                </p>
              ) : null}
              <Link
                href={`/areas/${selectedHubSlug}`}
                className="ccmap-cta"
                data-slug={selectedHubSlug ?? undefined}
              >
                Open area guide →
              </Link>
              <p className="ccmap-meta" style={{ marginTop: "0.75rem" }}>
                Full civic notes and neighbourhood context live on the area
                landing page.
              </p>
            </>
          ) : hubZone ? (
            <>
              <h3 id="ccmap-panel-title">{hubZone.label}</h3>
              <p className="ccmap-desc">{hubZone.blurb}</p>
              <Link href={`/areas/${hubZone.slug}`} className="ccmap-cta">
                Open area guide →
              </Link>
              <p className="ccmap-desc" style={{ marginTop: "0.75rem" }}>
                Tap a highlighted ward for locality detail.
              </p>
            </>
          ) : (
            <>
              <h3 id="ccmap-panel-title">Pick a ward</h3>
              <p className="ccmap-desc">
                Hover for a short summary; tap or click a ward for local context
                and a link to the matching area guide. Browse all hubs at{" "}
                <Link href="/areas">/areas</Link>.
              </p>
            </>
          )}
        </aside>
      </div>

      {tooltip ? (
        <div
          className="ccmap-tooltip"
          style={{
            left: Math.min(tooltip.x + 12, typeof window !== "undefined" ? window.innerWidth - 280 : 0),
            top: tooltip.y + 12,
          }}
          role="tooltip"
        >
          <h3>{tooltip.locality.name}</h3>
          <p>
            {tooltip.locality.region} · {tooltip.locality.zone}
          </p>
          {tooltip.locality.tags.slice(0, 3).length ? (
            <p style={{ marginTop: "0.35rem" }}>
              {tooltip.locality.tags.slice(0, 3).join(" · ")}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
