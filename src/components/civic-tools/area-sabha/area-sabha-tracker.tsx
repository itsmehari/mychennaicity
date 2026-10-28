import Link from "next/link";
import { AREA_SABHA_MEETINGS } from "@/content/area-sabha/meetings";
import {
  AREA_SABHA_AEO_ANSWER,
  AREA_SABHA_FAQ,
  AREA_SABHA_RELATED,
  AREA_SABHA_STEPS,
  AREA_SABHA_WHOIS,
  GCC_COMPLAINT,
  GCC_COUNCIL,
} from "@/content/area-sabha/desk";
import { ProvenanceBadge } from "../shared/provenance-badge";
import { MissingDataNote } from "../shared/provenance-badge";

export function AreaSabhaTracker() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
          In short
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
          {AREA_SABHA_AEO_ANSWER}
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          How to use this desk
        </h2>
        <ol className="mt-3 space-y-3">
          {AREA_SABHA_STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-xl border border-[var(--border)] p-4"
            >
              <p className="text-xs text-[var(--muted)]">Step {i + 1}</p>
              <h3 className="mt-1 font-semibold text-[var(--foreground)]">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Official channels
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>
            <a
              className="text-[var(--accent)] hover:underline"
              href={AREA_SABHA_WHOIS}
              target="_blank"
              rel="noopener noreferrer"
            >
              GCC Who is Who
            </a>{" "}
            — Ward Committee Chairmen and Zonal Officers
          </li>
          <li>
            <a
              className="text-[var(--accent)] hover:underline"
              href={GCC_COUNCIL}
              target="_blank"
              rel="noopener noreferrer"
            >
              GCC Council
            </a>{" "}
            — how the Corporation council is described
          </li>
          <li>
            <a
              className="text-[var(--accent)] hover:underline"
              href={GCC_COMPLAINT}
              target="_blank"
              rel="noopener noreferrer"
            >
              GCC online civic services
            </a>{" "}
            — file a complaint without waiting for a meeting
          </li>
          <li>Citywide helpline 1913 for urgent conservancy / drain issues</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Verified meetings
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Rows appear only after a meeting notice or minutes is verified. Tamil
          Nadu rules allow sabhas to propose projects and grievances to the
          council — that is not a licence to invent an agenda.
        </p>
        {AREA_SABHA_MEETINGS.length === 0 ? (
          <div className="mt-3">
            <MissingDataNote label="No verified Area Sabha or Ward Committee meeting notices or minutes have been ingested yet." />
          </div>
        ) : null}
        {AREA_SABHA_MEETINGS.map((m) => (
          <article
            key={m.id}
            className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <p className="text-xs text-[var(--muted)]">
              Ward {m.wardNo} · {m.zoneLabel} · {m.meetingDate}
            </p>
            <h3 className="mt-1 font-semibold text-[var(--foreground)]">
              {m.agenda}
            </h3>
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
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">FAQ</h2>
        <dl className="mt-3 space-y-4">
          {AREA_SABHA_FAQ.map((item) => (
            <div key={item.q}>
              <dt className="font-medium text-[var(--foreground)]">{item.q}</dt>
              <dd className="mt-1 text-sm text-[var(--muted)]">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="text-sm text-[var(--muted)]">
        Related:{" "}
        {AREA_SABHA_RELATED.map((item, i) => (
          <span key={item.href}>
            {i > 0 ? ", " : null}
            <Link
              href={item.href}
              className="text-[var(--accent)] hover:underline"
            >
              {item.label}
            </Link>
          </span>
        ))}
        .
      </p>
    </div>
  );
}
