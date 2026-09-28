"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  CALENDAR_DATES,
  CORRIDOR_STATIONS,
  MAINTENANCE_ENDS_AT,
  SERVICES,
  SCHEDULE_NOTE,
  cellLabel,
  cellState,
  checkerResult,
  disruptionIcs,
  formatShortDate,
  journeyAdvice,
  kolkataTodayIso,
  serviceById,
  tonightRows,
  type ServiceId,
} from "@/content/special-articles/beach-tambaram-guindy-cancellations-2026";

const WATCH_KEY = "mcc-beach-tambaram-watch";
const WATCH_EVENT = "mcc-emu-watch";
const REPORT_KEY = "mcc-beach-tambaram-station-note";

function readSavedService(): ServiceId | null {
  const stored = window.localStorage.getItem(WATCH_KEY);
  if (stored === "beach-2359" || stored === "tambaram-2045" || stored === "tambaram-2340") {
    return stored;
  }
  return null;
}

function writeSavedService(id: ServiceId | null) {
  if (id) window.localStorage.setItem(WATCH_KEY, id);
  else window.localStorage.removeItem(WATCH_KEY);
  window.dispatchEvent(new Event(WATCH_EVENT));
}

const REPORT_OPTIONS = [
  "Normal",
  "Crowded",
  "Train delayed",
  "Train cancelled",
  "Alternative transport difficult",
] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function downloadIcs(id: ServiceId, iso: string) {
  const file = disruptionIcs(id, iso);
  if (!file) return;
  const blob = new Blob([file], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `beach-tambaram-${id}-${iso}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}

export function TonightBoard({ serverToday }: { serverToday: string }) {
  const [today, setToday] = useState(serverToday);
  const [saved, setSaved] = useState<ServiceId | null>(null);

  useEffect(() => {
    const tick = () => setToday(kolkataTodayIso());
    const syncSaved = () => setSaved(readSavedService());
    tick();
    syncSaved();
    const id = window.setInterval(tick, 60_000);
    window.addEventListener(WATCH_EVENT, syncSaved);
    return () => {
      window.clearInterval(id);
      window.removeEventListener(WATCH_EVENT, syncSaved);
    };
  }, []);

  const board = tonightRows(today);
  const savedService = saved ? serviceById(saved) : null;
  const savedState = saved ? cellState(saved, today) : null;

  return (
    <aside className="emu-alert__tonight" aria-label="Tonight on Beach–Tambaram">
      <p className="emu-alert__tonight-kicker">Beach–Tambaram · India time</p>
      <p className="emu-alert__tonight-title">{board.heading}</p>
      {board.rows.length ? (
        <ul className="emu-alert__tonight-list">
          {board.rows.map((row) => (
            <li key={row.id} data-state={row.state}>
              <span>{row.label}</span>
              <strong>{cellLabel(row.state)}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p className="emu-alert__tonight-note">
          {today < "2026-09-26"
            ? "The first listed night is 26 September. The Guindy block in this notice runs from the early hours of 27 September."
            : "The maintenance window in this notice has ended. Check Southern Railway before treating any of these locals as restored."}
        </p>
      )}
      {savedService && savedState ? (
        <p className="emu-alert__saved">
          Your saved train tonight: {savedService.short} — {cellLabel(savedState)}
        </p>
      ) : null}
    </aside>
  );
}

export function TrainChecker({ serverToday }: { serverToday: string }) {
  const baseId = useId();
  const [today, setToday] = useState(serverToday);
  const [date, setDate] = useState(
    (CALENDAR_DATES as readonly string[]).includes(serverToday)
      ? serverToday
      : "2026-09-27",
  );
  const [serviceId, setServiceId] = useState<ServiceId>("beach-2359");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    setToday(kolkataTodayIso());
    const stored = readSavedService();
    if (stored) {
      setServiceId(stored);
      setRemember(true);
    }
  }, []);

  const result = checkerResult(serviceId, date, today);
  const canRemind = cellState(serviceId, date) === "cancelled";

  function onRemember(next: boolean) {
    setRemember(next);
    writeSavedService(next ? serviceId : null);
  }

  function onService(next: ServiceId) {
    setServiceId(next);
    if (remember) writeSavedService(next);
  }

  return (
    <form className="emu-alert__checker" aria-labelledby={`${baseId}-title`}>
      <div className="emu-alert__checker-copy">
        <h2 id={`${baseId}-title`}>Is my train affected?</h2>
        <p>Pick the date and the local you usually take. The answer uses only the three trains in this Chennai Division list.</p>
      </div>
      <div className="emu-alert__checker-fields">
        <label>
          Travel date
          <select value={date} onChange={(event) => setDate(event.target.value)}>
            {CALENDAR_DATES.map((iso) => (
              <option key={iso} value={iso}>
                {formatShortDate(iso)}
              </option>
            ))}
          </select>
        </label>
        <label>
          Usual train
          <select
            value={serviceId}
            onChange={(event) => onService(event.target.value as ServiceId)}
          >
            {SERVICES.map((service) => (
              <option key={service.id} value={service.id}>
                {service.short}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="emu-alert__result" data-tone={result.tone} role="status">
        <strong>{result.title}</strong>
        <span>{result.detail}</span>
      </p>
      <div className="emu-alert__checker-actions">
        <label className="emu-alert__remember">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => onRemember(event.target.checked)}
          />
          Remember this train on this device
        </label>
        {canRemind ? (
          <button type="button" onClick={() => downloadIcs(serviceId, date)}>
            Add disruption reminder
          </button>
        ) : null}
      </div>
    </form>
  );
}

export function CancellationCalendar() {
  return (
    <div className="emu-alert__cal-wrap">
      <table className="emu-alert__cal">
        <caption>Beach–Tambaram late-night cancellations, 26 September to 4 October 2026</caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            {SERVICES.map((service) => (
              <th key={service.id} scope="col">
                {service.short}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CALENDAR_DATES.map((iso) => (
            <tr key={iso}>
              <th scope="row">{formatShortDate(iso)}</th>
              {SERVICES.map((service) => {
                const state = cellState(service.id, iso);
                return (
                  <td key={service.id} data-state={state}>
                    {cellLabel(state)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="emu-alert__note">{SCHEDULE_NOTE}</p>
    </div>
  );
}

export function CorridorStrip() {
  const [activeId, setActiveId] = useState("guindy");
  const active = CORRIDOR_STATIONS.find((station) => station.id === activeId) ?? CORRIDOR_STATIONS[8];

  return (
    <div className="emu-alert__route">
      <ol className="emu-alert__rail">
        {CORRIDOR_STATIONS.map((station, index) => (
          <li key={station.id}>
            <button
              type="button"
              aria-pressed={station.id === activeId}
              data-maintenance={station.maintenance ? "true" : "false"}
              onClick={() => setActiveId(station.id)}
            >
              <span className="emu-alert__dot" aria-hidden />
              <span className="emu-alert__stop-name">{station.name}</span>
              <span className="emu-alert__stop-index">
                {index + 1}/{CORRIDOR_STATIONS.length}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <div className="emu-alert__stop-card" role="region" aria-live="polite">
        <p className="emu-alert__stop-kicker">
          {active.maintenance ? "Maintenance location" : active.position}
        </p>
        <h3>{active.name}</h3>
        <p>{active.note}</p>
        {active.metro ? <p>{active.metro}</p> : <p>No Metro interchange is listed here for this alert.</p>}
      </div>
    </div>
  );
}

export function JourneySelector({ serverToday }: { serverToday: string }) {
  const baseId = useId();
  const [fromId, setFromId] = useState("guindy");
  const [toId, setToId] = useState("tambaram");
  const [time, setTime] = useState("23:30");
  const [date, setDate] = useState(
    (CALENDAR_DATES as readonly string[]).includes(serverToday)
      ? serverToday
      : "2026-09-27",
  );

  const advice = useMemo(
    () => journeyAdvice({ fromId, toId, time, isoDate: date }),
    [fromId, toId, time, date],
  );

  return (
    <form className="emu-alert__journey" aria-labelledby={`${baseId}-title`}>
      <h2 id={`${baseId}-title`}>What affects my journey?</h2>
      <div className="emu-alert__checker-fields">
        <label>
          From
          <select value={fromId} onChange={(event) => setFromId(event.target.value)}>
            {CORRIDOR_STATIONS.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          To
          <select value={toId} onChange={(event) => setToId(event.target.value)}>
            {CORRIDOR_STATIONS.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Travel time
          <input
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
        </label>
        <label>
          Date
          <select value={date} onChange={(event) => setDate(event.target.value)}>
            {CALENDAR_DATES.map((iso) => (
              <option key={iso} value={iso}>
                {formatShortDate(iso)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="emu-alert__result" data-tone="clear" role="status">
        <span>{advice}</span>
      </p>
    </form>
  );
}

export function MaintenanceCountdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const end = new Date(MAINTENANCE_ENDS_AT).getTime();
  const diff = Math.max(0, end - now);
  const done = diff === 0;

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);

  return (
    <aside className="emu-alert__count" aria-label="Maintenance window">
      {done ? (
        <>
          <p className="emu-alert__count-kicker">After 4 October, 2:45 a.m.</p>
          <p>
            Scheduled maintenance period completed. Check for any subsequent Southern Railway advisories. This page does not mark the locals as restored.
          </p>
        </>
      ) : (
        <>
          <p className="emu-alert__count-kicker">Maintenance period ends in</p>
          <p className="emu-alert__count-digits" role="timer">
            <span>{days}</span> days <span>{pad(hours)}</span> hours <span>{pad(minutes)}</span> min
          </p>
          <p>The clock stops at 2:45 a.m. on 4 October, when the published Guindy block ends.</p>
        </>
      )}
    </aside>
  );
}

export function AlternativePanel() {
  const [tab, setTab] = useState<"metro" | "mtc" | "road">("metro");

  return (
    <div className="emu-alert__alts">
      <h2>Need another way home?</h2>
      <div className="emu-alert__tabs" role="tablist" aria-label="Other ways to travel">
        {(
          [
            ["metro", "Metro"],
            ["mtc", "MTC"],
            ["road", "Road"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="emu-alert__tab-panel" role="tabpanel">
        {tab === "metro" ? (
          <p>
            At Guindy, the Blue Line station lists the railway station as an access point. One direction is toward Chennai Airport. The other is toward Wimco Nagar Depot. This page does not state that Metro is still open after your cancelled local. Check the hours for that night.
          </p>
        ) : null}
        {tab === "mtc" ? (
          <p>
            MTC buses run along Anna Salai and GST Road, which parallel parts of this corridor. Stop names and last buses change. Read the board at the stop rather than assuming a particular route is still out.
          </p>
        ) : null}
        {tab === "road" ? (
          <p>
            Autos and taxis from Guindy, Saidapet and Tambaram are the usual road fallback. Leave extra time. A cancelled last local crowds the rank.
          </p>
        ) : null}
      </div>
    </div>
  );
}

type StationNote = {
  stationId: string;
  status: (typeof REPORT_OPTIONS)[number];
  at: string;
};

export function StationNoteForm() {
  const [stationId, setStationId] = useState("guindy");
  const [note, setNote] = useState<StationNote | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(REPORT_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as StationNote;
      if (parsed.stationId && parsed.status && parsed.at) setNote(parsed);
    } catch {
      window.localStorage.removeItem(REPORT_KEY);
    }
  }, []);

  function save(status: (typeof REPORT_OPTIONS)[number]) {
    const next: StationNote = {
      stationId,
      status,
      at: new Date().toISOString(),
    };
    window.localStorage.setItem(REPORT_KEY, JSON.stringify(next));
    setNote(next);
  }

  const stationName =
    CORRIDOR_STATIONS.find((station) => station.id === note?.stationId)?.name ??
    "your station";
  const when = note
    ? new Intl.DateTimeFormat("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        day: "numeric",
        month: "short",
        timeZone: "Asia/Kolkata",
      }).format(new Date(note.at))
    : null;

  return (
    <section className="emu-alert__notes" aria-labelledby="station-note-title">
      <h2 id="station-note-title">What are you seeing at your station?</h2>
      <label>
        Station
        <select value={stationId} onChange={(event) => setStationId(event.target.value)}>
          {CORRIDOR_STATIONS.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>
      </label>
      <div className="emu-alert__note-options">
        {REPORT_OPTIONS.map((option) => (
          <button key={option} type="button" onClick={() => save(option)}>
            {option}
          </button>
        ))}
      </div>
      {note && when ? (
        <p role="status">
          You marked {stationName} as “{note.status}” on this device at {when}.
        </p>
      ) : null}
      <p className="emu-alert__note">
        This note stays on your phone or computer. MyChennaiCity is not collecting a live crowd count from it. It is not official railway information.
      </p>
    </section>
  );
}
