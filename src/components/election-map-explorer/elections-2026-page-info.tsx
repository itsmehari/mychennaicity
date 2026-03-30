import {
  ELECTION_COUNTING_DATE,
  ELECTION_FAQ,
  ELECTION_POLL_DATE,
  VOTER_CHECKLIST,
} from "@/content/elections-2026/election-meta";

export function Elections2026PageInfo() {
  return (
    <div className="mt-14 space-y-12 border-t border-[var(--border)] pt-12">
      <section aria-labelledby="el-schedule-heading">
        <h2
          id="el-schedule-heading"
          className="type-display text-xl text-[var(--foreground)] sm:text-2xl"
        >
          Key dates (Tamil Nadu)
        </h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-[var(--muted)]">
          <li>
            Polling day: <strong className="text-[var(--foreground)]">{ELECTION_POLL_DATE.value}</strong>{" "}
            (
            <a
              href={ELECTION_POLL_DATE.sourceUrl}
              className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              source
            </a>
            , as of {ELECTION_POLL_DATE.asOf})
          </li>
          <li>
            Counting: <strong className="text-[var(--foreground)]">{ELECTION_COUNTING_DATE.value}</strong>{" "}
            (
            <a
              href={ELECTION_COUNTING_DATE.sourceUrl}
              className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              source
            </a>
            , as of {ELECTION_COUNTING_DATE.asOf})
          </li>
        </ul>
      </section>

      <section aria-labelledby="el-checklist-heading">
        <h2
          id="el-checklist-heading"
          className="type-display text-xl text-[var(--foreground)] sm:text-2xl"
        >
          Voter checklist
        </h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-[var(--muted)]">
          {VOTER_CHECKLIST.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-[var(--muted)]">
          Official rolls and booth details:{" "}
          <a
            href="https://elections.tn.gov.in"
            className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            CEO Tamil Nadu
          </a>
          {" · "}
          <a
            href="https://eci.gov.in"
            className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Election Commission of India
          </a>
        </p>
      </section>

      <section aria-labelledby="el-faq-heading">
        <h2
          id="el-faq-heading"
          className="type-display text-xl text-[var(--foreground)] sm:text-2xl"
        >
          Frequently asked questions
        </h2>
        <dl className="mt-6 space-y-6">
          {ELECTION_FAQ.map((item) => (
            <div key={item.question}>
              <dt className="text-sm font-semibold text-[var(--foreground)]">
                {item.question}
                {item.editorialOnly ? (
                  <span className="ml-2 text-xs font-normal text-[var(--muted)]">
                    (editorial)
                  </span>
                ) : null}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                {item.answer}
                {item.sourceUrl ? (
                  <>
                    {" "}
                    <a
                      href={item.sourceUrl}
                      className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source
                    </a>
                    {item.asOf ? ` · ${item.asOf}` : null}
                  </>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="el-method-heading">
        <h2
          id="el-method-heading"
          className="type-display text-xl text-[var(--foreground)] sm:text-2xl"
        >
          Methodology
        </h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-[var(--muted)]">
          <li>
            Map boundaries use a community 2021 assembly GeoJSON; they are not an
            official ECI GIS product.
          </li>
          <li>
            2026 candidate names come from press and party reporting linked in
            the sidebar—verify against ECI nominations and affidavits.
          </li>
          <li>
            Past results (2016 / 2021) are summarized from Wikipedia’s constituency
            tables for orientation; confirm margins with official gazettes if you
            need legal precision.
          </li>
          <li>
            Reservation labels follow district listings where cited; always
            confirm on the final electoral roll for your AC.
          </li>
        </ul>
      </section>
    </div>
  );
}
