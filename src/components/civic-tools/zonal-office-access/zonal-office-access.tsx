"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadCivicGeoBundle } from "@/lib/civic-geo/load-civic-geo-bundle";
import {
  estimateTravelMinutes,
  haversineKm,
} from "@/lib/civic-geo/geo-utils";
import type { ZonalOfficeRecord } from "@/lib/civic-geo/types";
import { ProvenanceBadge } from "../shared/provenance-badge";
import { MissingDataNote } from "../shared/provenance-badge";

export function ZonalOfficeAccess() {
  const searchParams = useSearchParams();
  const [offices, setOffices] = useState<ZonalOfficeRecord[]>([]);
  const [selectedZone, setSelectedZone] = useState<string>("");
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);

  useEffect(() => {
    loadCivicGeoBundle()
      .then((bundle) => {
        setOffices(bundle.zones15);
        const zoneParam = searchParams.get("zone");
        const requestedZone = bundle.zones15.some(
          (zone) => zone.zoneId === zoneParam,
        )
          ? zoneParam
          : null;
        setSelectedZone(
          requestedZone ?? bundle.zones15[0]?.zoneId ?? "",
        );
        setDataError(null);
      })
      .catch(() => setDataError("Could not load zonal-office data."));
  }, [searchParams]);

  const office = offices.find((o) => o.zoneId === selectedZone) ?? null;

  const distanceKm =
    office?.lat != null && office?.lng != null && userLat != null && userLng != null
      ? haversineKm(userLat, userLng, office.lat, office.lng)
      : null;

  const travel = distanceKm != null ? estimateTravelMinutes(distanceKm) : null;

  const useLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation unavailable");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setUserLat(p.coords.latitude);
        setUserLng(p.coords.longitude);
        setGeoError(null);
      },
      () => setGeoError("Could not read location"),
    );
  };

  return (
    <div className="max-w-2xl space-y-4">
      <label className="block text-sm">
        <span className="text-[var(--muted)]">Zone</span>
        <select
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2"
        >
          {offices.map((o) => (
            <option key={o.zoneId} value={o.zoneId}>
              {o.zoneLabel}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={useLocation}
        className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium"
      >
        Use my location for distance
      </button>
      {geoError ? <p className="text-xs text-amber-700">{geoError}</p> : null}
      {dataError ? <p className="text-sm text-red-600">{dataError}</p> : null}

      {office ? (
        <div className="space-y-3 rounded-xl border border-[var(--border)] p-4">
          <h2 className="font-semibold text-[var(--foreground)]">{office.officeName}</h2>
          <ProvenanceBadge provenance={office.provenance} />
          <dl className="grid gap-2 text-sm">
            <div>
              <dt className="text-[var(--muted)]">Address</dt>
              <dd>{office.address ?? "Pending verification"}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Phone</dt>
              <dd>{office.phone ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Working hours</dt>
              <dd>{office.workingHours ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Wheelchair access</dt>
              <dd>
                {office.wheelchairAccessible === null
                  ? "Not verified"
                  : office.wheelchairAccessible
                    ? "Reported accessible"
                    : "Reported not accessible"}
              </dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Public transport</dt>
              <dd>{office.publicTransportNotes ?? "Not documented"}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Flood-risk route note</dt>
              <dd>{office.floodRiskRouteNote ?? "No seasonal warning on file"}</dd>
            </div>
            {distanceKm != null ? (
              <>
                <div>
                  <dt className="text-[var(--muted)]">Distance</dt>
                  <dd>{distanceKm.toFixed(1)} km (straight-line)</dd>
                </div>
                <div>
                  <dt className="text-[var(--muted)]">Estimated travel</dt>
                  <dd>{travel?.label}</dd>
                </div>
              </>
            ) : (
              <MissingDataNote label="Distance requires verified office coordinates and your location." />
            )}
          </dl>
        </div>
      ) : null}
    </div>
  );
}
