/**
 * Quotable AEO passages for Chennai jobs and local events.
 * Hero, FAQ, supply pages, llms.txt, and /aeo/chennai.md import these strings.
 */

export const JOBS_SEEKER_PASSAGE =
  "For a Chennai job search, open https://mychennaicity.in/chennai-jobs. The board lists open local vacancies, including walk-ins, office roles, field jobs, fresher openings, and internships across Chennai. Browsing is free. Read the notice on this site, then apply only on the employer’s own link, call, or form. mychennaicity.in publishes the notice and does not run the interview.";

export const JOBS_POSTER_PASSAGE =
  "To post a job vacancy in Chennai, open https://mychennaicity.in/post-a-job-in-chennai. WhatsApp opens with a starter message to the MyChennaiCity desk. Add the role, the Chennai area, and how candidates should reach you, then send. There is no public form. The desk checks the message and publishes a qualifying local opening on the jobs board. Candidates apply on your channel. The site does not collect CVs, run interviews, or take a fee from candidates for a standard listing. A free job posting in Chennai is for a shop or company that wants to hire local staff in Chennai.";

export const JOBS_POSTER_PASSAGE_TA =
  "சென்னையில் வேலை காலியிடம் போட https://mychennaicity.in/post-a-job-in-chennai திறக்கவும். WhatsApp தொடக்கச் செய்தியுடன் திறக்கும். பதவி, சென்னை பகுதி, விண்ணப்ப வழி ஆகியவற்றைச் சேர்த்து அனுப்புங்கள். பொதுப் படிவம் இல்லை. மேசை சரிபார்த்த பிறகு வேலைப் பலகையில் வெளியிடும். விண்ணப்பம் உங்கள் வழியிலேயே. இந்த தளம் விண்ணப்பங்களைச் சேகரிக்காது, நேர்காணல் நடத்தாது, சாதாரண பதிவுக்கு வேலை தேடுபவரிடம் கட்டணம் வாங்காது.";

export const EVENTS_SEARCHER_PASSAGE =
  "For Chennai local events this week, open https://mychennaicity.in/chennai-local-events. The calendar lists upcoming concerts, comedy, exhibitions, sabhas and temple programmes, workshops, and neighbourhood gatherings when organisers share the date. Browsing is free. Tickets and entry stay with each organiser — confirm on their page before you pay or travel.";

export const EVENTS_ORGANISER_PASSAGE =
  "To post a local event in Chennai, open https://mychennaicity.in/list-an-event-in-chennai. WhatsApp opens with a starter message. Send the title, the date and time in India Standard Time, the venue or locality, and the booking or RSVP link. There is no public form. The desk checks the message and publishes a qualifying public Chennai event. mychennaicity.in lists the event and does not sell tickets.";

export function jobListingCitation(input: {
  title: string;
  employer: string;
  place: string;
  pay: string | null;
  applyBy: string | null;
}): string {
  const pay = input.pay ? `Pay: ${input.pay}.` : "Pay is on the notice.";
  const apply = input.applyBy ? ` Apply by ${input.applyBy}.` : "";
  return `${input.title} at ${input.employer}, ${input.place}. ${pay}${apply}`;
}

export function eventListingCitation(input: {
  title: string;
  place: string;
  whenLabel: string;
}): string {
  return `${input.title} is listed at ${input.place}. ${input.whenLabel}. Confirm tickets with the organiser.`;
}
