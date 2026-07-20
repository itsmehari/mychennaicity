"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadChennaiMapBundle } from "@/lib/chennai-map/load-map-bundle";
import type { LocalityRecord, WardPathRecord } from "@/lib/chennai-map/types";
import { DATAMEET_WARDS_PROVENANCE } from "@/lib/civic-geo/provenance";
import {
  findNearestWard,
  lngLatToSvg,
} from "@/lib/civic-geo/geo-utils";
import { loadCivicGeoBundle } from "@/lib/civic-geo/load-civic-geo-bundle";
import {
  lookupByLocalityId,
  lookupByWardNo,
  lookupPin,
  searchLocalities,
  type WardLookupResult,
} from "@/lib/civic-geo/lookup";
import type { CivicGeoBundle } from "@/lib/civic-geo/types";
import { DataSourceDrawer } from "../shared/data-source-drawer";
import { MobileBottomSheet } from "../shared/mobile-bottom-sheet";
import {
  OperationalResultPanel,
  ProposedResultPanel,
} from "../shared/result-panels";
import { ShareUrlButton } from "../shared/share-url-button";
import "./zone-ward-finder.css";

export function ZoneWardFinder() {
  const searchParams = useSearchParams();
  const mapHostRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [civicBundle, setCivicBundle] = useState<CivicGeoBundle | null>(null);
  const [wards, setWards] = useState<WardPathRecord[]>([]);
  const [localities, setLocalities] = useState<Record<string, LocalityRecord>>({});
  const [viewBox, setViewBox] = useState("0 0 1000 780");
  const [manifest, setManifest] = useState<Awaited<
    ReturnType<typeof loadChennaiMapBundle>
  >["manifest"] | null>(null);

  const [searchQ, setSearchQ] = useState("");
  const [wardInput, setWardInput] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [result, setResult] = useState<WardLookupResult | null>(null);
  const [localityHits, setLocalityHits] = useState<LocalityRecord[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [mapBundle, civic] = await Promise.all([
          loadChennaiMapBundle(),
          loadCivicGeoBundle(),
        ]);
        if (cancelled) return;
        setCivicBundle(civic);
        setWards(mapBundle.wards.filter((ward) => ward.wardNo > 0));
        setLocalities(mapBundle.localities);
        setViewBox(mapBundle.manifest.viewBox);
        setManifest(mapBundle.manifest);
        setError(null);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load data");
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
    if (!civicBundle || !searchQ.trim()) {
      setLocalityHits([]);
      return;
    }
    setLocalityHits(searchLocalities(localities, searchQ));
  }, [searchQ, localities, civicBundle]);

  const applyResult = useCallback((r: WardLookupResult | null) => {
    setResult(r);
    setSheetOpen(!!r);
  }, []);

  const resolveWard = useCallback(
    (wardNo: number) => {
      if (!civicBundle) return;
      const nextResult = lookupByWardNo(
        civicBundle,
        wardNo,
        wards,
        localities,
      );
      applyResult(nextResult);
      setGeoError(
        nextResult
          ? null
          : "That ward is outside the verified current GCC dataset.",
      );
    },
    [applyResult, civicBundle, localities, wards],
  );

  useEffect(() => {
    const wardParam = searchParams.get("ward");
    if (!wardParam || !civicBundle) return;
    const n = Number(wardParam);
    if (Number.isFinite(n) && n > 0) {
      setWardInput(String(n));
      resolveWard(n);
    }
  }, [searchParams, civicBundle, resolveWard]);

  const handleWardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = Number(wardInput.trim());
    if (!Number.isFinite(n) || n < 1) return;
    resolveWard(n);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!civicBundle) return;
    const pin = pinInput.trim();
    const hint = lookupPin(civicBundle, pin);
    if (hint.wardNo) {
      resolveWard(hint.wardNo);
    } else if (hint.localityHint) {
      setSearchQ(hint.localityHint);
    } else {
      setGeoError(
        "No verified PIN-to-ward mapping yet. Try locality search or map pin.",
      );
    }
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation || !civicBundle || !manifest) {
      setGeoError("Geolocation not available");
      return;
    }
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { x, y } = lngLatToSvg(
          pos.coords.longitude,
          pos.coords.latitude,
          manifest,
        );
        const point = new DOMPoint(x, y);
        const containingPath = Array.from(
          mapHostRef.current?.querySelectorAll<SVGPathElement>(".zwf-ward") ?? [],
        ).find((path) => path.isPointInFill(point));
        const containingWardNo = Number(containingPath?.dataset.ward);
        if (Number.isFinite(containingWardNo)) {
          resolveWard(containingWardNo);
          return;
        }
        const nearest = findNearestWard(civicBundle.wards15, x, y);
        if (nearest) {
          resolveWard(nearest.wardNo);
          setGeoError(
            "Your GPS point was outside the available polygon coverage; showing the nearest ward centroid.",
          );
        }
      },
      () => setGeoError("Could not read your location. Try map pin instead."),
      { enableHighAccuracy: true, timeout: 12000 },
    );
  };

  useEffect(() => {
    if (!mapHostRef.current || !civicBundle || !manifest) return;
    const host = mapHostRef.current;
    host.innerHTML = "";
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("class", "zwf-svg");
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

    for (const w of wards) {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", w.d);
      path.setAttribute("data-ward", String(w.wardNo));
      path.setAttribute("role", "button");
      path.setAttribute("tabindex", "0");
      path.setAttribute(
        "aria-label",
        `Ward ${w.wardNo}, ${w.zoneLabel} zone`,
      );
      path.classList.add("zwf-ward");
      if (result?.ward.wardNo === w.wardNo) {
        path.classList.add("zwf-ward--selected");
      }
      path.addEventListener("click", () => resolveWard(w.wardNo));
      path.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          resolveWard(w.wardNo);
        }
      });
      g.appendChild(path);
    }
    svg.appendChild(g);
    host.appendChild(svg);
  }, [wards, viewBox, civicBundle, manifest, result, resolveWard]);

  const resultPanel = result ? (
    <div className="space-y-4">
      <OperationalResultPanel
        zoneLabel={result.ward.zoneLabel}
        zoneId={result.ward.zoneId}
        wardNo={result.ward.wardNo}
        councillorName={result.councillor?.name ?? null}
        zonalOffice={result.zoneOffice?.officeName ?? null}
        complaintUrl={
          result.zoneOffice?.gccComplaintUrl ??
          "https://chennaicorporation.gov.in/gcc/online-civic-services/"
        }
        verifyUrl={
          result.zoneOffice?.officialVerificationUrl ??
          "https://chennaicorporation.gov.in/gcc/about-chennai/chennai-map/"
        }
        provenance={DATAMEET_WARDS_PROVENANCE}
      >
        {result.locality ? (
          <p className="mt-3 text-sm text-[var(--muted)]">
            Locality: <strong className="text-[var(--foreground)]">{result.locality.name}</strong>
            {" · "}
            <Link
              href={`/areas/${result.locality.primaryHubSlug}`}
              className="text-[var(--accent)] hover:underline"
            >
              Area hub
            </Link>
          </p>
        ) : null}
        <div className="mt-3 flex flex-wrap gap-2">
          <ShareUrlButton
            buildUrl={() =>
              `${window.location.origin}/civic-tools/zone-ward-finder?ward=${result.ward.wardNo}`
            }
          />
          <Link
            href={`/civic-tools/zonal-office-access?zone=${result.ward.zoneId}`}
            className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium hover:bg-[var(--background)]"
          >
            Zonal office access
          </Link>
          <Link
            href={`/civic-tools/civic-card?ward=${result.ward.wardNo}`}
            className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium hover:bg-[var(--background)]"
          >
            Civic card
          </Link>
        </div>
      </OperationalResultPanel>
      <ProposedResultPanel
        zoneLabel={result.proposed20?.zoneLabel ?? null}
        zoneId={result.proposed20?.zoneId ?? null}
        provenance={result.proposed20?.provenance ?? null}
      />
    </div>
  ) : null;

  if (loading) {
    return <p className="text-sm text-[var(--muted)]">Loading ward data…</p>;
  }
  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <form onSubmit={handleWardSubmit} className="flex gap-2">
            <input
              type="number"
              min={1}
              placeholder="Ward number"
              value={wardInput}
              onChange={(e) => setWardInput(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white"
            >
              Find
            </button>
          </form>
          <form onSubmit={handlePinSubmit} className="flex gap-2">
            <input
              inputMode="numeric"
              placeholder="PIN code"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium"
            >
              PIN
            </button>
          </form>
        </div>

        <div>
          <input
            type="search"
            placeholder="Locality, street, or landmark…"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          />
          {localityHits.length > 0 ? (
            <ul className="mt-2 max-h-40 overflow-y-auto rounded-lg border border-[var(--border)]">
              {localityHits.map((loc) => (
                <li key={loc.id}>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm hover:bg-[var(--surface)]"
                    onClick={() => {
                      if (!civicBundle) return;
                      applyResult(
                        lookupByLocalityId(civicBundle, loc.id, wards, localities),
                      );
                      setSearchQ(loc.name);
                    }}
                  >
                    {loc.name}
                    <span className="ml-2 text-xs text-[var(--muted)]">{loc.zone}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleGeolocation}
            className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium hover:bg-[var(--surface)]"
          >
            Use current location
          </button>
          <p className="self-center text-xs text-[var(--muted)]">
            Or click a ward on the map
          </p>
        </div>
        {geoError ? <p className="text-xs text-amber-700">{geoError}</p> : null}

        <div
          ref={mapHostRef}
          className="zwf-map-host overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
          aria-label="Chennai ward map — click to select ward"
        />

        <DataSourceDrawer
          title="Data sources"
          provenance={DATAMEET_WARDS_PROVENANCE}
          extra="Ward boundaries from Datameet GCC dataset. Zone grouping matches operational 15-zone structure."
        />
      </div>

      <div className="hidden lg:block">{resultPanel}</div>

      <MobileBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Your zone & ward"
      >
        {resultPanel}
      </MobileBottomSheet>
    </div>
  );
}
