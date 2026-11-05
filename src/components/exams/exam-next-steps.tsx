import Link from "next/link";
import { CHENNAI_CLASSIFIEDS_HUB_PATH, chennaiClassifiedsHubPath } from "@/lib/routes/chennai-classifieds";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { whatsappCommunityJoinHref } from "@/lib/whatsapp-community";

const cards = [
  {
    href: CHENNAI_JOBS_HUB_PATH,
    title: "Jobs and internships in Chennai",
    body: "Walk-ins and local openings, for after the semester and for the weeks in between.",
  },
  {
    href: chennaiClassifiedsHubPath({ category: "flatmates-roommates" }),
    title: "Rooms and flatmates",
    body: "Reader posts for shared rooms and PG-style setups near colleges and IT corridors.",
  },
  {
    href: "/chennai-local-events",
    title: "What is on in the city",
    body: "Workshops, campus-adjacent events, and neighbourhood listings.",
  },
] as const;

export function ExamNextSteps() {
  return (
    <section className="mt-10" aria-labelledby="exam-next-heading">
      <h2 id="exam-next-heading" className="text-xl font-bold text-[var(--foreground)]">
        What else MyChennaiCity can help with
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
        The timetable is free to use without joining anything. These are the parts of the site students use next.
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {cards.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className="block h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--accent)]"
            >
              <p className="font-semibold text-[var(--foreground)]">{card.title}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{card.body}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-2xl border border-[var(--border)] p-4">
        <h3 className="font-semibold text-[var(--foreground)]">Stay updated with MyChennaiCity</h3>
        <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
          Exam updates, job alerts, city news, events, and transport notes in the WhatsApp community. Joining is optional. The timetable stays on this page either way.
        </p>
        <Link
          href={whatsappCommunityJoinHref("exam-timetable")}
          className="mt-3 inline-flex rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-[var(--background)]"
        >
          Join the MyChennaiCity community
        </Link>
      </div>
      <p className="mt-4 text-sm text-[var(--muted)]">
        A MyChennaiCity app is planned for news, jobs, events, and local updates. Store links will appear here when the app is available. Classifieds also include other reader ads on{" "}
        <Link href={CHENNAI_CLASSIFIEDS_HUB_PATH} className="font-semibold text-[var(--accent)]">
          the classifieds board
        </Link>
        .
      </p>
    </section>
  );
}
