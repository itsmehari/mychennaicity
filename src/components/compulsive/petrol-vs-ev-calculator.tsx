"use client";

import { useMemo, useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import { PETROL_VS_EV_DEFAULTS } from "@/content/compulsive/petrol-vs-ev";
import { getSiteUrl } from "@/lib/env";
import { compulsivePath } from "@/content/compulsive/index";

function inr(n: number) {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export function PetrolVsEvCalculator() {
  const d = PETROL_VS_EV_DEFAULTS;
  const [km, setKm] = useState(d.kmPerDay);
  const [petrolRate, setPetrolRate] = useState(d.petrolInrPerLitre);
  const [kmpl, setKmpl] = useState(d.petrolKmPerLitre);
  const [kwh100, setKwh100] = useState(d.evKwhPer100Km);
  const [evRate, setEvRate] = useState(d.evInrPerKwh);

  const result = useMemo(() => {
    const petrolDay = kmpl > 0 ? (km / kmpl) * petrolRate : 0;
    const evDay = (km * (kwh100 / 100)) * evRate;
    return {
      petrolDay,
      evDay,
      petrolMonth: petrolDay * 30,
      evMonth: evDay * 30,
      saveDay: petrolDay - evDay,
    };
  }, [km, petrolRate, kmpl, kwh100, evRate]);

  const path = compulsivePath("petrol-vs-ev");

  return (
    <div className="not-prose space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-semibold text-[var(--foreground)]">
          km / day
          <input
            type="number"
            min={1}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            value={km}
            onChange={(e) => setKm(Number(e.target.value) || 0)}
          />
        </label>
        <label className="text-xs font-semibold text-[var(--foreground)]">
          Petrol ₹ / litre
          <input
            type="number"
            min={1}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            value={petrolRate}
            onChange={(e) => setPetrolRate(Number(e.target.value) || 0)}
          />
        </label>
        <label className="text-xs font-semibold text-[var(--foreground)]">
          Petrol km / litre
          <input
            type="number"
            min={1}
            step={0.1}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            value={kmpl}
            onChange={(e) => setKmpl(Number(e.target.value) || 0)}
          />
        </label>
        <label className="text-xs font-semibold text-[var(--foreground)]">
          EV kWh / 100 km
          <input
            type="number"
            min={1}
            step={0.1}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            value={kwh100}
            onChange={(e) => setKwh100(Number(e.target.value) || 0)}
          />
        </label>
        <label className="text-xs font-semibold text-[var(--foreground)] sm:col-span-2">
          EV ₹ / kWh (home or public average)
          <input
            type="number"
            min={1}
            step={0.1}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            value={evRate}
            onChange={(e) => setEvRate(Number(e.target.value) || 0)}
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] p-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">Petrol</p>
          <p className="mt-1 text-lg font-bold text-[var(--foreground)]">
            {inr(result.petrolDay)} / day
          </p>
          <p className="text-sm text-[var(--muted)]">{inr(result.petrolMonth)} / month</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] p-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">EV</p>
          <p className="mt-1 text-lg font-bold text-[var(--foreground)]">
            {inr(result.evDay)} / day
          </p>
          <p className="text-sm text-[var(--muted)]">{inr(result.evMonth)} / month</p>
        </div>
      </div>

      <p className="text-sm text-[var(--foreground)]">
        {result.saveDay >= 0
          ? `Illustrative EV edge: about ${inr(result.saveDay)} / day (~${inr(result.saveDay * 30)} / month).`
          : `At these inputs, petrol looks cheaper by about ${inr(-result.saveDay)} / day — recheck tariff and efficiency.`}
      </p>

      <CopyShareButton
        buildText={() =>
          `Chennai petrol vs EV (${km} km/day): petrol ~${inr(result.petrolDay)}/day, EV ~${inr(result.evDay)}/day. Calculator: ${getSiteUrl()}${path}`
        }
      />
    </div>
  );
}
