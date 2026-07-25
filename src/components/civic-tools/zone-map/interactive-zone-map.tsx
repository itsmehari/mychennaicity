"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadChennaiMapBundle } from "@/lib/chennai-map/load-map-bundle";
import type { LocalityRecord, WardPathRecord } from "@/lib/chennai-map/types";
import { CivicZoneMapController } from "@/lib/civic-geo/civic-zone-map-controller";
import { loadCivicGeoBundle } from "@/lib/civic-geo/load-civic-geo-bundle";
import { searchLocalities } from "@/lib/civic-geo/lookup";
import type { LayerMeta } from "@/lib/civic-geo/types";
import { DATAMEET_WARDS_PROVENANCE } from "@/lib/civic-geo/provenance";
import { LayerSwitcher, OpacitySlider } from "../shared/layer-controls";
import { DataSourceDrawer } from "../shared/data-source-drawer";
import { MobileBottomSheet } from "../shared/mobile-bottom-sheet";
import { ShareUrlButton } from "../shared/share-url-button";
import "./zone-map-explorer.css";

export function InteractiveZoneMap() {
  const searchParams = useSearchParams();
  const hostRef = useRef<HTMLDivElement>(null);
  const ctrlRef = useRef<CivicZoneMapController | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [layers, setLayers] = useState<LayerMeta[]>([]);
  const [activeLayers, setActiveLayers] = useState<Set<string>>(
    () => new Set(["gcc-15"]),
  );
  const [opacity, setOpacity] = useState(0.85);
  const [compare, setCompare] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [wardQ, setWardQ] = useState("");
  const [localities, setLocalities] = useState<Record<string, LocalityRecord>>({});
  const [wards, setWards] = useState<WardPathRecord[]>([]);
  const [viewBox, setViewBox] = useState("0 0 1000 780");
  const [selectedZone, setSelectedZone] = useState<{
    id: string | null;
    label: string | null;
  }>({ id: null, label: null });
  const [selectedWard, setSelectedWard] = useState<WardPathRecord | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [localityHits, setLocalityHits] = useState<LocalityRecord[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [map, civic] = await Promise.all([
          loadChennaiMapBundle(),
          loadCivicGeoBundle(),
        ]);
        if (cancelled) return;
        setLayers(civic.layersMeta);
        setLocalities(map.localities);
        setWards(map.wards.filter((ward) => ward.wardNo > 0));
        setViewBox(map.manifest.viewBox);
        setError(null);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Map load failed");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (loading || !host || wards.length === 0) return;

    const ctrl = new CivicZoneMapController({
      onSelectZone: (id, label) => {
        setSelectedZone({ id, label });
        setSheetOpen(!!id);
      },
      onSelectWard: (ward) => setSelectedWard(ward),
    });
    ctrl.mount(host, wards, viewBox);
    ctrlRef.current = ctrl;

    const requestedLayers = new Set(
      (searchParams.get("layers") ?? "gcc-15").split(",").filter(Boolean),
    );
    const publishableLayers = layers
      .filter(
        (layer) =>
          layer.geometryAvailable && requestedLayers.has(layer.layerId),
      )
      .map((layer) => layer.layerId);
    const initialLayers = new Set(
      publishableLayers.length > 0 ? publishableLayers : ["gcc-15"],
    );
    setActiveLayers(initialLayers);
    layers.forEach((layer) => {
      ctrl.setLayerVisible(layer.layerId, initialLayers.has(layer.layerId));
    });

    const wardParam = Number(searchParams.get("ward"));
    if (Number.isFinite(wardParam) && wardParam > 0) {
      ctrl.highlightWard(wardParam);
      const ward = wards.find((item) => item.wardNo === wardParam) ?? null;
      if (ward) {
        setWardQ(String(wardParam));
        setSelectedWard(ward);
        setSelectedZone({ id: ward.zoneId, label: ward.zoneLabel });
      }
    }

    return () => {
      ctrl.destroy();
      if (ctrlRef.current === ctrl) ctrlRef.current = null;
    };
  }, [layers, loading, searchParams, viewBox, wards]);

  useEffect(() => {
    ctrlRef.current?.setLayerOpacity("gcc-15", opacity);
  }, [opacity]);

  useEffect(() => {
    setLocalityHits(searchQ.trim() ? searchLocalities(localities, searchQ) : []);
  }, [searchQ, localities]);

  const toggleLayer = useCallback((layerId: string) => {
    const layer = layers.find((l) => l.layerId === layerId);
    if (!layer?.geometryAvailable) return;
    const visible = !activeLayers.has(layerId);
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layerId)) {
        next.delete(layerId);
      } else {
        next.add(layerId);
      }
      return next;
    });
    ctrlRef.current?.setLayerVisible(layerId, visible);
  }, [activeLayers, layers]);

  const handleWardSearch = () => {
    const n = Number(wardQ.trim());
    if (!Number.isFinite(n)) return;
    ctrlRef.current?.highlightWard(n);
    const w = wards.find((x) => x.wardNo === n) ?? null;
    setSelectedWard(w);
    if (w) {
      setSelectedZone({ id: w.zoneId, label: w.zoneLabel });
      setSheetOpen(true);
    }
  };

  const canAnimateBoundaryChange =
    layers.filter((layer) => layer.geometryAvailable).length > 1;

  const sidePanel = (
    <div className="space-y-3 text-sm">
      {selectedZone.label ? (
        <>
          <p className="font-semibold text-[var(--foreground)]">
            {selectedZone.label}
          </p>
          {selectedWard ? (
            <p className="text-[var(--muted)]">Ward {selectedWard.wardNo}</p>
          ) : null}
        </>
      ) : (
        <p className="text-[var(--muted)]">Click a zone or search a ward</p>
      )}
      <ShareUrlButton
        buildUrl={() => {
          const params = new URLSearchParams();
          const path = window.location.pathname;
          if (path.startsWith("/chennai-map")) params.set("view", "zones");
          if (selectedWard) params.set("ward", String(selectedWard.wardNo));
          params.set("layers", [...activeLayers].join(","));
          const basePath = path.startsWith("/chennai-map")
            ? "/chennai-map"
            : "/civic-tools/zone-map";
          return `${window.location.origin}${basePath}?${params}`;
        }}
      />
    </div>
  );

  if (loading) return <p className="text-sm text-[var(--muted)]">Loading map…</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;

  return (
    <div className="space-y-4">
      <LayerSwitcher layers={layers} activeIds={activeLayers} onToggle={toggleLayer} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <OpacitySlider value={opacity} onChange={setOpacity} />
        <label className="flex items-center gap-2 text-xs text-[var(--muted)]">
          <input
            type="checkbox"
            checked={compare}
            onChange={(e) => setCompare(e.target.checked)}
          />
          Side-by-side comparison
        </label>
        <button
          type="button"
          disabled={!canAnimateBoundaryChange}
          className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-50"
          title={
            canAnimateBoundaryChange
              ? "Animate boundary change"
              : "Available after verified proposed geometry is ingested"
          }
        >
          Boundary-change animation
        </button>
        <div className="flex gap-2 lg:col-span-1">
          <input
            type="number"
            placeholder="Ward #"
            value={wardQ}
            onChange={(e) => setWardQ(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={handleWardSearch}
            className="rounded-lg bg-[var(--accent)] px-3 py-2 text-sm text-white"
          >
            Ward
          </button>
        </div>
      </div>

      <input
        type="search"
        placeholder="Locality search…"
        value={searchQ}
        onChange={(e) => setSearchQ(e.target.value)}
        className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
      />
      {localityHits.length > 0 ? (
        <ul className="max-h-32 overflow-y-auto rounded-lg border border-[var(--border)]">
          {localityHits.map((loc) => {
            const w = wards.find((x) => x.localityId === loc.id);
            return (
              <li key={loc.id}>
                <button
                  type="button"
                  className="w-full px-3 py-2 text-left text-sm hover:bg-[var(--surface)]"
                  onClick={() => {
                    if (w) {
                      ctrlRef.current?.highlightWard(w.wardNo);
                      setSelectedWard(w);
                      setSelectedZone({ id: w.zoneId, label: w.zoneLabel });
                      setSheetOpen(true);
                    }
                  }}
                >
                  {loc.name}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className={compare ? "czm-map-host czm-map-host--compare" : "czm-map-host"}>
        <div ref={hostRef} className="h-full w-full" />
        {compare ? (
          <div className="czm-placeholder">
            Proposed 20-zone / 2022 23-zone layers await verified official geometry.
          </div>
        ) : null}
      </div>

      {!compare &&
        layers
          .filter((l) => !l.geometryAvailable)
          .map((l) => (
            <p key={l.layerId} className="text-xs text-[var(--muted)]">
              {l.label}: {l.statusLabel} — awaiting official geometry.
            </p>
          ))}

      <div className="hidden md:block rounded-xl border border-[var(--border)] p-4">
        {sidePanel}
      </div>

      <DataSourceDrawer title="Map data sources" provenance={DATAMEET_WARDS_PROVENANCE} />

      <MobileBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Zone details"
      >
        {sidePanel}
      </MobileBottomSheet>
    </div>
  );
}
