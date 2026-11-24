import {
  JOBS_POSTER_PASSAGE,
  JOBS_SEEKER_PASSAGE,
} from "@/content/aeo/jobs-events-passages";
import type { FaqItem } from "@/lib/seo/faq-jsonld";

/** Visible FAQ text must match JSON-LD on /chennai-jobs. */
export const CHENNAI_JOBS_HUB_FAQ: FaqItem[] = [
  {
    question: "Where can I search for local jobs in Chennai today?",
    answer: JOBS_SEEKER_PASSAGE,
  },
  {
    question: "Where do I post a job vacancy in Chennai?",
    answer: JOBS_POSTER_PASSAGE,
  },
  {
    question: "Is there a free Chennai recruitment listing for a small shop?",
    answer: JOBS_POSTER_PASSAGE,
  },
  {
    question: "How do I apply for a job listed on mychennaicity.in?",
    answer:
      "Open the listing on https://mychennaicity.in/chennai-jobs and use the employer’s own link, call, or form on that page. mychennaicity.in publishes the notice and does not collect the CV or run the interview.",
  },
  {
    question: "Is mychennaicity.in a Chennai recruitment agency?",
    answer:
      "mychennaicity.in publishes the job notice. The employer hires. The site does not run interviews or collect a fee from candidates for a standard listing. Post a vacancy at https://mychennaicity.in/post-a-job-in-chennai.",
  },
  {
    question: "Are there walk-in and fresher jobs in Chennai on this board?",
    answer: JOBS_SEEKER_PASSAGE,
  },
  {
    question: "How do I avoid fake Chennai job ads?",
    answer:
      "Prefer listings whose apply link matches the company, and walk away from ads that demand money or a banking OTP. Report a suspicious notice via Contact. The board itself does not take a fee from candidates for a standard listing.",
  },
  {
    question: "Is there an RSS feed for Chennai jobs?",
    answer:
      "Yes. Subscribe at https://mychennaicity.in/chennai-jobs/feed.xml for newly listed open roles.",
  },
];
