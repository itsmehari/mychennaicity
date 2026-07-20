"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CHENNAI_ZONES_STATUS_RIBBON,
  CHENNAI_ZONES_VERIFIED_ON,
  civicIssueRoutes,
  current15Zones,
  findZoneByWard,
  jurisdictionCards,
  mapComparisonTabs,
  proposed20Extremes,
  wardNumbersForZone,
  workloadRadarAxes,
  workloadRadarProfiles,
  zonesFaq,
  zonesTimeline,
  type CurrentZone,
} from "@/content/special-articles/chennai-corporation-zones-15-vs-20";

function ExtremeBar({
  label,
  highLabel,
  highValue,
  lowLabel,
  lowValue,
  format,
}: {
  label: string;
  highLabel: string;
  highValue: number;
  lowLabel: string;
  lowValue: number;
  format: (n: number) => string;
}) {
  const max = Math.max(highValue, lowValue);
  return (
    <div className="gcc-zones-chart">
      <p className="gcc-zones-chart__title">{label}</p>
      <div className="gcc-zones-chart__row">
        <span className="gcc-zones-chart__name">{highLabel}</span>
        <div className="gcc-zones-chart__track">
          <div
            className="gcc-zones-chart__fill gcc-zones-chart__fill--high"
            style={{ width: `${(highValue / max) * 100}%` }}
          />
        </div>
        <span className="gcc-zones-chart__value tabular-nums">{format(highValue)}</span>
      </div>
      <div className="gcc-zones-chart__row">
        <span className="gcc-zones-chart__name">{lowLabel}</span>
        <div className="gcc-zones-chart__track">
          <div
            className="gcc-zones-chart__fill gcc-zones-chart__fill--low"
            style={{ width: `${(lowValue / max) * 100}%` }}
          />
        </div>
        <span className="gcc-zones-chart__value tabular-nums">{format(lowValue)}</span>
      </div>
    </div>
  );
}

function RadarSvg() {
  const axes = workloadRadarAxes;
  const n = axes.length;
  const cx = 140;
  const cy = 140;
  const r = 100;
  const point = (i: number, value: number) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + r * value * Math.cos(angle),
      y: cy + r * value * Math.sin(angle),
    };
  };
  const poly = (values: readonly number[]) =>
    values.map((v, i) => {
      const p = point(i, v);
      return `${p.x},${p.y}`;
    }).join(" ");

  return (
    <svg
      viewBox="0 0 280 320"
      className="gcc-zones-radar__svg"
      role="img"
      aria-label="Radar chart comparing a compact dense zone workload with a large peripheral zone workload"
    >
      {[0.25, 0.5, 0.75, 1].map((scale) => (
        <polygon
          key={scale}
          points={Array.from({ length: n }, (_, i) => {
            const p = point(i, scale);
            return `${p.x},${p.y}`;
          }).join(" ")}
          fill="none"
          stroke="#c5d4d2"
          strokeWidth="1"
        />
      ))}
      {axes.map((axis, i) => {
        const p = point(i, 1);
        const label = point(i, 1.18);
        return (
          <g key={axis}>
            <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#c5d4d2" strokeWidth="1" />
            <text
              x={label.x}
              y={label.y}
              textAnchor="middle"
              fontSize="8"
              fill="#3d5c58"
              fontWeight="600"
            >
              {axis.split(" ")[0]}
            </text>
          </g>
        );
      })}
      <polygon
        points={poly(workloadRadarProfiles.compactDense)}
        fill="rgba(12, 94, 88, 0.28)"
        stroke="#0c5e58"
        strokeWidth="2"
      />
      <polygon
        points={poly(workloadRadarProfiles.largePeriphery)}
        fill="rgba(180, 90, 48, 0.22)"
        stroke="#b45a30"
        strokeWidth="2"
      />
      <text x="140" y="300" textAnchor="middle" fontSize="10" fill="#5a736f">
        Illustrative workloads — not official GCC scores
      </text>
    </svg>
  );
}

function ZoneCard({
  zone,
  active,
  onSelect,
}: {
  zone: CurrentZone;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={`gcc-zones-card${active ? " gcc-zones-card--active" : ""}`}
      onClick={onSelect}
      aria-pressed={active}
    >
      <span className="gcc-zones-card__num">Zone {zone.number}</span>
      <span className="gcc-zones-card__name">{zone.name}</span>
      <span className="gcc-zones-card__wards">Wards {zone.wards}</span>
      <span className="gcc-zones-card__region">{zone.region}</span>
    </button>
  );
}

export function GccZonesStatusRibbon() {
  return (
    <div className="gcc-zones-ribbon" role="status">
      <p className="gcc-zones-ribbon__text">{CHENNAI_ZONES_STATUS_RIBBON}</p>
    </div>
  );
}

export function GccZonesStatusWidget() {
  return (
    <aside className="gcc-zones-status" aria-label="Verification status">
      <p className="gcc-zones-status__label">Last verified</p>
      <dl className="gcc-zones-status__grid">
        <div>
          <dt>Status</dt>
          <dd>Current system remains 15 zones</dd>
        </div>
        <div>
          <dt>Verification date</dt>
          <dd>{CHENNAI_ZONES_VERIFIED_ON}</dd>
        </div>
        <div>
          <dt>Official GCC zone selector</dt>
          <dd>15 zones</dd>
        </div>
        <div>
          <dt>Future proposal</dt>
          <dd>20 zones</dd>
        </div>
        <div>
          <dt>Expected implementation</dt>
          <dd>Not yet formally operational</dd>
        </div>
        <div>
          <dt>Source-monitoring state</dt>
          <dd>Active</dd>
        </div>
      </dl>
    </aside>
  );
}

export function GccZonesMapTabs() {
  type TabId = (typeof mapComparisonTabs)[number]["id"];
  const [active, setActive] = useState<TabId>("15");
  const tab = mapComparisonTabs.find((t) => t.id === active) ?? mapComparisonTabs[0]!;

  return (
    <div className="gcc-zones-tabs">
      <div className="gcc-zones-tabs__list" role="tablist" aria-label="Zone map comparison">
        {mapComparisonTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active === t.id}
            className={`gcc-zones-tabs__btn${active === t.id ? " is-active" : ""}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="gcc-zones-tabs__panel" role="tabpanel">
        <span className={`gcc-zones-tabs__tag gcc-zones-tabs__tag--${tab.statusTone}`}>
          {tab.status}
        </span>
        <p className="gcc-zones-tabs__summary">{tab.summary}</p>
        <ul className="gcc-zones-tabs__bullets">
          {tab.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function GccZonesFinder() {
  const [query, setQuery] = useState("");
  const [wardInput, setWardInput] = useState("");
  const [selected, setSelected] = useState<CurrentZone | null>(current15Zones[0] ?? null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return current15Zones;
    return current15Zones.filter(
      (z) =>
        z.name.toLowerCase().includes(q) ||
        z.region.toLowerCase().includes(q) ||
        z.localities.some((l) => l.toLowerCase().includes(q)) ||
        `zone ${z.number}`.includes(q) ||
        String(z.number) === q,
    );
  }, [query]);

  const wardHit = useMemo(() => {
    const n = Number(wardInput.trim());
    if (!Number.isInteger(n) || n < 1 || n > 200) return null;
    return findZoneByWard(n) ?? null;
  }, [wardInput]);

  const active = wardHit ?? selected;

  function printCivicCard() {
    if (!active) return;
    const text = [
      "MY CHENNAI CIVIC CARD",
      `Verified context: ${CHENNAI_ZONES_VERIFIED_ON}`,
      `Zone ${active.number}: ${active.name}`,
      `Wards: ${active.wards}`,
      `Region: ${active.region}`,
      "Councillor: check GCC councillor directory for your ward",
      "Zonal office: confirm on GCC / district directory",
      "Complaint: 1913",
      "Note: Use official GCC Know Your Zone for final verification.",
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-chennai-civic-card-zone-${active.number}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="gcc-zones-finder">
      <div className="gcc-zones-finder__controls">
        <label className="gcc-zones-finder__field">
          <span>Locality / zone search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Adyar, Ambattur, Zone 14"
            autoComplete="off"
          />
        </label>
        <label className="gcc-zones-finder__field">
          <span>Ward number (1–200)</span>
          <input
            type="number"
            min={1}
            max={200}
            value={wardInput}
            onChange={(e) => setWardInput(e.target.value)}
            placeholder="e.g. 175"
          />
        </label>
      </div>

      {wardHit ? (
        <p className="gcc-zones-finder__hit" role="status">
          Ward {wardInput.trim()} is currently in{" "}
          <strong>
            Zone {wardHit.number} — {wardHit.name}
          </strong>
          . Note: Adyar (13) and Perungudi (14) use non-sequential ward blocks.
        </p>
      ) : wardInput.trim() ? (
        <p className="gcc-zones-finder__miss" role="status">
          Enter a whole number between 1 and 200 to match a current ward.
        </p>
      ) : null}

      <div className="gcc-zones-finder__grid">
        {filtered.map((zone) => (
          <ZoneCard
            key={zone.number}
            zone={zone}
            active={active?.number === zone.number}
            onSelect={() => {
              setSelected(zone);
              setWardInput("");
            }}
          />
        ))}
      </div>

      {active ? (
        <div className="gcc-zones-finder__sheet" aria-live="polite">
          <p className="gcc-zones-finder__sheet-kicker">Selected current zone</p>
          <h3 className="gcc-zones-finder__sheet-title">
            Zone {active.number}: {active.name}
          </h3>
          <p className="gcc-zones-finder__sheet-meta">
            Wards {active.wards} · {active.region} Chennai ·{" "}
            {wardNumbersForZone(active.wards).length} ward divisions
          </p>
          <p className="gcc-zones-finder__sheet-localities">
            Areas often associated: {active.localities.join(", ")}
          </p>
          <div className="gcc-zones-finder__actions">
            <Link href={`/areas/${active.hubSlug}`} className="gcc-zones-finder__action">
              View area guide
            </Link>
            <a
              href="https://chennaicorporation.gov.in/"
              className="gcc-zones-finder__action"
              target="_blank"
              rel="noopener noreferrer"
            >
              Official verification
            </a>
            <button type="button" className="gcc-zones-finder__action" onClick={printCivicCard}>
              Download civic card
            </button>
          </div>
          <p className="gcc-zones-finder__disclaimer">
            Councillor and zonal-office addresses change; confirm on the GCC directory before
            visiting. Gazette notification prevails if records conflict.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function GccZonesIssueRouter() {
  type IssueId = (typeof civicIssueRoutes)[number]["id"];
  const [issueId, setIssueId] = useState<IssueId>("pothole");
  const issue =
    civicIssueRoutes.find((i) => i.id === issueId) ?? civicIssueRoutes[0]!;

  return (
    <div className="gcc-zones-route">
      <p className="gcc-zones-route__title">How a Chennai civic issue moves through the system</p>
      <div className="gcc-zones-route__pills" role="group" aria-label="Select issue type">
        {civicIssueRoutes.map((i) => (
          <button
            key={i.id}
            type="button"
            className={`gcc-zones-route__pill${issueId === i.id ? " is-active" : ""}`}
            onClick={() => setIssueId(i.id)}
          >
            {i.label}
          </button>
        ))}
      </div>
      <ol className="gcc-zones-route__steps">
        {issue.route.map((step, idx) => (
          <li key={`${issue.id}-${step}`}>
            <span className="gcc-zones-route__step-num">{idx + 1}</span>
            <span>{step}</span>
            {idx < issue.route.length - 1 ? (
              <span className="gcc-zones-route__arrow" aria-hidden>
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      <p className="gcc-zones-route__note">
        Pathways vary by case. Use 1913 and your current ward/zone until a new gazette notification
        updates official systems.
      </p>
    </div>
  );
}

export function GccZonesTimeline() {
  const [openId, setOpenId] = useState<string | null>(zonesTimeline[zonesTimeline.length - 1]?.id ?? null);
  const open = zonesTimeline.find((e) => e.id === openId) ?? null;

  return (
    <div className="gcc-zones-timeline">
      <div className="gcc-zones-timeline__track" role="list">
        {zonesTimeline.map((event) => (
          <button
            key={event.id}
            type="button"
            role="listitem"
            className={`gcc-zones-timeline__node${openId === event.id ? " is-open" : ""}`}
            onClick={() => setOpenId(event.id)}
            aria-expanded={openId === event.id}
          >
            <span className="gcc-zones-timeline__period">{event.period}</span>
            <span className="gcc-zones-timeline__node-title">{event.title}</span>
          </button>
        ))}
      </div>
      {open ? (
        <div className="gcc-zones-timeline__card">
          <span
            className={`gcc-zones-timeline__tag gcc-zones-timeline__tag--${
              open.tag === "Boundary expansion"
                ? "boundary"
                : open.tag === "Administrative reorganisation"
                  ? "admin"
                  : "policy"
            }`}
          >
            {open.tag}
          </span>
          <h3>{open.title}</h3>
          <p>{open.detail}</p>
        </div>
      ) : null}
    </div>
  );
}

export function GccZonesProposedCharts() {
  const d = proposed20Extremes;
  const fmt = (n: number) => n.toLocaleString("en-IN");
  return (
    <div className="gcc-zones-charts">
      <p className="gcc-zones-charts__disclaimer">{d.disclaimer}</p>
      <div className="gcc-zones-charts__grid">
        <ExtremeBar
          label="1. Population extremes"
          highLabel={d.population.high.zone}
          highValue={d.population.high.value}
          lowLabel={d.population.low.zone}
          lowValue={d.population.low.value}
          format={fmt}
        />
        <ExtremeBar
          label="2. Geographic-area extremes (sq. km)"
          highLabel={d.areaKm2.high.zone}
          highValue={d.areaKm2.high.value}
          lowLabel={d.areaKm2.low.zone}
          lowValue={d.areaKm2.low.value}
          format={(n) => n.toFixed(2)}
        />
        <ExtremeBar
          label="3. Ward-count extremes"
          highLabel={d.wards.high.zone}
          highValue={d.wards.high.value}
          lowLabel={d.wards.low.zone}
          lowValue={d.wards.low.value}
          format={fmt}
        />
        <ExtremeBar
          label="4. Property-count extremes"
          highLabel={d.properties.high.zone}
          highValue={d.properties.high.value}
          lowLabel={d.properties.mid.zone}
          lowValue={d.properties.mid.value}
          format={fmt}
        />
      </div>
      <p className="gcc-zones-charts__totals">
        Reported city totals underlying the proposal: population{" "}
        <strong>{fmt(d.totals.projectedPopulation)}</strong> · properties{" "}
        <strong>{fmt(d.totals.properties)}</strong> · averages ≈{" "}
        {fmt(d.totals.avgPopulation)} people and {fmt(d.totals.avgProperties)} properties per
        proposed zone.
      </p>
    </div>
  );
}

export function GccZonesWorkloadRadar() {
  return (
    <div className="gcc-zones-radar">
      <p className="gcc-zones-radar__title">
        Two zones with ten wards each can still have completely different workloads
      </p>
      <div className="gcc-zones-radar__legend">
        <span className="gcc-zones-radar__swatch gcc-zones-radar__swatch--dense" /> Compact,
        high-density core
        <span className="gcc-zones-radar__swatch gcc-zones-radar__swatch--wide" /> Large peripheral
        growth zone
      </div>
      <RadarSvg />
      <p className="gcc-zones-radar__note">
        Do not treat ward count alone as proof that a zone is overburdened or underburdened.
      </p>
    </div>
  );
}

export function GccZonesJurisdictions() {
  return (
    <div className="gcc-zones-jurisdictions">
      <p className="gcc-zones-jurisdictions__intro">
        My Chennai Jurisdictions — each boundary has its own authority. A zone change does not
        automatically rewrite the rest.
      </p>
      <div className="gcc-zones-jurisdictions__grid">
        {jurisdictionCards.map((card) => (
          <article key={card.id} className="gcc-zones-jcard">
            <h3>{card.title}</h3>
            <p>{card.note}</p>
            <p className="gcc-zones-jcard__source">
              Source: {card.source}
              <br />
              Last-updated context: {CHENNAI_ZONES_VERIFIED_ON} (editorial verification pass)
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function GccZonesFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="gcc-zones-faq">
      {zonesFaq.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="gcc-zones-faq__item">
            <button
              type="button"
              className="gcc-zones-faq__q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {item.question}
            </button>
            {isOpen ? <p className="gcc-zones-faq__a">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

export function GccZonesChecklist() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const items = [
    { id: "use15", label: "Continue using the current 15-zone system for all official work" },
    { id: "ignoreViral", label: "Do not rely on undated social-media maps" },
    { id: "saveTax", label: "Save property-tax and licence records" },
    { id: "complaints", label: "Record existing complaint numbers" },
    { id: "councillor", label: "Identify present councillor and zonal office" },
    { id: "gazette", label: "Follow official gazette / GCC portal updates" },
  ];

  return (
    <ul className="gcc-zones-checklist">
      {items.map((item) => (
        <li key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={Boolean(checks[item.id])}
              onChange={() =>
                setChecks((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
              }
            />
            <span>{item.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
