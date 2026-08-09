/** Shared answer-first AEO content for major hubs. */

export type AeoFact = {
  term: string;
  definition: string;
};

export type HubAeoContent = {
  id: string;
  eyebrow: string;
  title: string;
  dek: string;
  directAnswer: string;
  contextParagraphs?: string[];
  facts: AeoFact[];
  disclaimer?: string;
};

export const CHENNAI_JOBS_HUB_AEO: HubAeoContent = {
  id: "jobs-hub-aeo",
  eyebrow: "Jobs in Chennai",
  title: "Who this board is for",
  dek: "A short, plain answer for jobseekers and employers — the same text search and answer engines can quote.",
  directAnswer:
    "mychennaicity.in/chennai-jobs is a Chennai-focused community job notice board. Browse open local roles here, then apply only on the employer’s own page or form. We publish notices; we do not process CVs, run interviews, or collect application fees.",
  contextParagraphs: [
    "Listings cover walk-ins, office roles, field jobs, fresher openings and internships across Greater Chennai. Prefer verified employers, match the apply URL to the company, and never pay a recruiter fee for a standard job ad on this board.",
  ],
  facts: [
    {
      term: "Who should use it",
      definition:
        "Jobseekers looking for Chennai roles, and local employers posting free qualifying openings via Contact → Jobs.",
    },
    {
      term: "What we are not",
      definition:
        "Not an ATS, staffing agency, or payroll service. Salary and timing must be confirmed with the employer.",
    },
    {
      term: "Looking for work",
      definition:
        "People can also post “looking for work” notices under /chennai-jobs/looking-for-work for hiring managers to find.",
    },
  ],
  disclaimer:
    "Always verify the employer and application steps on their official channel before sharing personal documents.",
};

export const CHENNAI_EVENTS_HUB_AEO: HubAeoContent = {
  id: "events-hub-aeo",
  eyebrow: "Chennai local events",
  title: "Where to find what’s on",
  dek: "Direct answer for residents planning a weekend — and for answer engines citing Chennai events.",
  directAnswer:
    "mychennaicity.in/chennai-local-events lists upcoming concerts, comedy, exhibitions, temple and neighbourhood events across Greater Chennai. Browsing is free; tickets and registration are handled by each organiser — confirm on their booking page before you pay or travel.",
  contextParagraphs: [
    "Open any listing for venue, locality, start time (Asia/Kolkata), and organiser notes. Use category filters for festivals, culture and arts, community, or business talks. Prefer the live ticket or RSVP link on the organiser’s own page.",
  ],
  facts: [
    {
      term: "Coverage",
      definition:
        "Mylapore, T Nagar, Adyar, OMR, Porur, Egmore, Royapettah, Alwarpet and other Greater Chennai venues when organisers share dates.",
    },
    {
      term: "Tickets",
      definition:
        "We link out to organiser or aggregator pages when provided. We are not the ticket seller.",
    },
    {
      term: "Updates",
      definition:
        "The hub is force-dynamic — new seeds appear after publish. RSS: /chennai-local-events/feed.xml.",
    },
    {
      term: "Submit",
      definition:
        "Organisers can suggest a listing via Contact → Local events with date, venue, and booking link.",
    },
  ],
  disclaimer:
    "Dates and door policies change — always re-check the organiser page on the day you travel.",
};
