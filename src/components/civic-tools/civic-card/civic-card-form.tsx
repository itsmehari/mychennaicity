"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadCivicGeoBundle } from "@/lib/civic-geo/load-civic-geo-bundle";
import { lookupByWardNo } from "@/lib/civic-geo/lookup";
import { loadChennaiMapBundle } from "@/lib/chennai-map/load-map-bundle";

const STORAGE_KEY = "mcc-civic-card-v1";

export type CivicCardData = {
  locality: string;
  zone: string;
  ward: string;
  councillor: string;
  zonalOffice: string;
  assemblyConstituency: string;
  policeStation: string;
  metroWaterArea: string;
  tangedcoSection: string;
  emergencyContacts: string;
};

const emptyCard: CivicCardData = {
  locality: "",
  zone: "",
  ward: "",
  councillor: "",
  zonalOffice: "",
  assemblyConstituency: "",
  policeStation: "",
  metroWaterArea: "",
  tangedcoSection: "",
  emergencyContacts: "Police 100 · Ambulance 108 · Fire 101 · GCC 1913",
};

export function CivicCardForm() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<CivicCardData>(emptyCard);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) setData({ ...emptyCard, ...JSON.parse(raw) });
      } catch {
        /* Ignore invalid or unavailable local storage. */
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const wardParam = searchParams.get("ward");
    if (!wardParam) return;
    const wardNo = Number(wardParam);
    if (!Number.isFinite(wardNo)) return;
    (async () => {
      const [civic, map] = await Promise.all([
        loadCivicGeoBundle(),
        loadChennaiMapBundle(),
      ]);
      const result = lookupByWardNo(civic, wardNo, map.wards, map.localities);
      if (!result) return;
      setData((prev) => ({
        ...prev,
        locality: result.locality?.name ?? prev.locality,
        zone: result.ward.zoneLabel,
        ward: String(result.ward.wardNo),
        councillor: result.councillor?.name ?? "",
        zonalOffice: result.zoneOffice?.officeName ?? "",
      }));
    })();
  }, [searchParams]);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    alert("Saved to this browser");
  };

  const printCard = () => {
    window.print();
  };

  const field = (key: keyof CivicCardData, label: string) => (
    <label className="block text-sm">
      <span className="text-[var(--muted)]">{label}</span>
      <input
        value={data[key]}
        onChange={(e) => setData((d) => ({ ...d, [key]: e.target.value }))}
        className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2"
      />
    </label>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-3 print:hidden">
        <p className="text-sm text-[var(--muted)]">
          Stored in browser local storage unless you choose cloud saving (not
          available yet).
        </p>
        {field("locality", "Locality")}
        {field("zone", "Zone")}
        {field("ward", "Ward")}
        {field("councillor", "Councillor")}
        {field("zonalOffice", "Zonal office")}
        {field("assemblyConstituency", "Assembly constituency (add manually if unverified)")}
        {field("policeStation", "Police station")}
        {field("metroWaterArea", "Metro Water area")}
        {field("tangedcoSection", "Tangedco section")}
        {field("emergencyContacts", "Emergency contacts")}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            type="button"
            onClick={save}
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white"
          >
            Save locally
          </button>
          <button
            type="button"
            onClick={printCard}
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium"
          >
            Print / download
          </button>
        </div>
      </div>

      <div
        id="civic-card-print"
        className="rounded-2xl border-2 border-[var(--accent)]/40 bg-white p-6 text-zinc-900 shadow-lg print:shadow-none"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          My Chennai Civic Card
        </p>
        <h2 className="mt-2 text-2xl font-bold">{data.locality || "Your locality"}</h2>
        <p className="mt-1 text-lg">
          Zone {data.zone || "—"} · Ward {data.ward || "—"}
        </p>
        <dl className="mt-4 grid gap-2 text-sm">
          <div>
            <dt className="text-zinc-500">Councillor</dt>
            <dd>{data.councillor || "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Zonal office</dt>
            <dd>{data.zonalOffice || "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Assembly constituency</dt>
            <dd>{data.assemblyConstituency || "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Police station</dt>
            <dd>{data.policeStation || "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Metro Water area</dt>
            <dd>{data.metroWaterArea || "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Tangedco section</dt>
            <dd>{data.tangedcoSection || "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Emergency</dt>
            <dd>{data.emergencyContacts}</dd>
          </div>
        </dl>
        <p className="mt-6 text-[10px] text-zinc-400">
          mychennaicity.in · Verify against GCC official records
        </p>
      </div>
    </div>
  );
}
