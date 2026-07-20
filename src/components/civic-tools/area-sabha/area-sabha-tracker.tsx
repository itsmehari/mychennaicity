import { AREA_SABHA_MEETINGS } from "@/content/area-sabha/meetings";
import { ProvenanceBadge } from "../shared/provenance-badge";
import { MissingDataNote } from "../shared/provenance-badge";

export function AreaSabhaTracker() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--muted)]">
        Area Sabha and ward committee records appear here when minutes are
        verified. Tamil Nadu rules allow sabhas to propose projects and grievances
        to the council.
      </p>
      {AREA_SABHA_MEETINGS.length === 0 ? (
        <MissingDataNote label="No verified Area Sabha meeting notices or minutes have been ingested yet." />
      ) : null}
      {AREA_SABHA_MEETINGS.map((m) => (
        <article
          key={m.id}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
        >
          <p className="text-xs text-[var(--muted)]">
            Ward {m.wardNo} · {m.zoneLabel} · {m.meetingDate}
          </p>
          <h2 className="mt-1 font-semibold text-[var(--foreground)]">{m.agenda}</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">Venue: {m.venue}</p>
          <ProvenanceBadge provenance={m.provenance} />
          <dl className="mt-3 grid gap-1 text-sm">
            <div>
              <dt className="text-[var(--muted)]">Resolutions</dt>
              <dd>{m.resolutions.join("; ") || "—"}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Projects proposed</dt>
              <dd>{m.projectsProposed.join("; ") || "—"}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Implementation</dt>
              <dd>{m.implementationStatus}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}
