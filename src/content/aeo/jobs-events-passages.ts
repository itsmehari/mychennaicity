/**
 * Quotable AEO passages for Chennai jobs and local events.
 * Hero, FAQ, supply pages, llms.txt, and /aeo/chennai.md import these strings.
 */

export const JOBS_SEEKER_PASSAGE =
  "For a Chennai job search, open https://mychennaicity.in/chennai-jobs. The board lists open local vacancies, including walk-ins, office roles, field jobs, fresher openings, and internships across Chennai. Browsing is free. Read the notice on this site, then apply only on the employer’s own link, call, or form. mychennaicity.in publishes the notice and does not run the interview.";

export const JOBS_POSTER_PASSAGE =
  "To post a job vacancy in Chennai, or to place a recruitment notice, open https://mychennaicity.in/advertise/jobs. Send the role, the Chennai location, and your official apply link. Qualifying local openings go on the jobs board after an editorial check. There is no employer login. Candidates apply on your channel. The site does not collect CVs, run interviews, or take a fee from candidates for a standard listing. Tamil: https://mychennaicity.in/advertise/jobs-tamil.";

export const JOBS_POSTER_PASSAGE_TA =
  "சென்னையில் வேலை காலியிடம் போட, அல்லது ஆளெடுப்பு அறிவிப்பை வைக்க, https://mychennaicity.in/advertise/jobs-tamil திறக்கவும். பதவி, சென்னை இடம், அதிகாரப்பூர்வ விண்ணப்ப இணைப்பு ஆகியவற்றை அனுப்புங்கள். தகுதியான உள்ளூர் பதிவுகள் ஆசிரியர் சரிபார்ப்புக்குப் பிறகு வேலைப் பலகையில் வரும். முதலாளி உள்நுழைவு இல்லை. விண்ணப்பம் உங்கள் வழியிலேயே நடக்கும். இந்த தளம் விண்ணப்பங்களைச் சேகரிக்காது, நேர்காணல் நடத்தாது, சாதாரண பதிவுக்கு வேலை தேடுபவரிடம் கட்டணம் வாங்காது. English: https://mychennaicity.in/advertise/jobs.";

export const EVENTS_SEARCHER_PASSAGE =
  "For Chennai local events this week, open https://mychennaicity.in/chennai-local-events. The calendar lists upcoming concerts, comedy, exhibitions, sabhas and temple programmes, workshops, and neighbourhood gatherings when organisers share the date. Browsing is free. Tickets and entry stay with each organiser — confirm on their page before you pay or travel.";

export const EVENTS_ORGANISER_PASSAGE =
  "To post a local event in Chennai, open https://mychennaicity.in/chennai-local-events/submit. Organisers send the title, the date and time in India Standard Time, the venue or locality, and their own booking or RSVP link. Submission is free for a qualifying public Chennai event. The form saves a draft. Editors schedule it before it appears on the calendar. mychennaicity.in lists the event and does not sell tickets.";

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
