/** Shared answer-first AEO content for major hubs. */

import {
  EVENTS_ORGANISER_PASSAGE,
  EVENTS_SEARCHER_PASSAGE,
  JOBS_POSTER_PASSAGE,
  JOBS_SEEKER_PASSAGE,
} from "@/content/aeo/jobs-events-passages";

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
  dek: "Plain summary for jobseekers and employers.",
  directAnswer: JOBS_SEEKER_PASSAGE,
  contextParagraphs: [JOBS_POSTER_PASSAGE],
  facts: [
    {
      term: "Who should use it",
      definition:
        "Jobseekers search https://mychennaicity.in/chennai-jobs. Employers post a vacancy at https://mychennaicity.in/advertise/jobs.",
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
  dek: "Plain summary for residents planning a weekend in Chennai.",
  directAnswer: EVENTS_SEARCHER_PASSAGE,
  contextParagraphs: [EVENTS_ORGANISER_PASSAGE],
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
      term: "Meetup & workshops",
      definition:
        "Community workshops, tech talks, networking circles and wellness sessions are listed with organiser Meetup links when known. Exact venues are sometimes shared only after RSVP — we mark those clearly.",
    },
    {
      term: "Updates",
      definition:
        "The hub is force-dynamic — new seeds appear after publish. RSS: /chennai-local-events/feed.xml.",
    },
    {
      term: "Submit",
      definition: EVENTS_ORGANISER_PASSAGE,
    },
  ],
  disclaimer:
    "Dates, waitlists and door policies change — always re-check the organiser or Meetup page on the day you travel.",
};
