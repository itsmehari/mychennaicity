import Link from "next/link";
import type { JobPostingWithEmployer } from "@/domains/jobs";
import { CHENNAI_JOBS_HUB_PATH, chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";
import { ADVERTISE_JOBS_PATH } from "@/lib/routes/advertise-listings";

export function JobSliceListing({
  heading,
  intro,
  rows,
  total,
  indexable,
  areaHref,
}: {
  heading: string;
  intro: string;
  rows: JobPostingWithEmployer[];
  total: number;
  indexable: boolean;
  areaHref?: string | null;
}) {
  return (
    <article className="mt-6">
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[#16161d]">
        {heading}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#3c3954]">{intro}</p>
      <p className="mt-3 text-sm text-[#5c5872]">
        {total > 0
          ? `${total} open ${total === 1 ? "notice matches" : "notices match"} this slice.`
          : "No open notice matches this slice right now."}{" "}
        {indexable
          ? "Counts use live listings only."
          : "This address stays out of the sitemap until more employers have a matching open notice."}
      </p>
      {rows.length > 0 ? (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {rows.map((row) => (
            <li key={row.job.id}>
              <Link
                href={chennaiJobsDetailPath(row.job.slug)}
                className="block rounded-2xl border border-[#eceaf3] bg-white px-4 py-4 hover:border-[#c9c2ff]"
              >
                <span className="block font-semibold text-[#16161d]">{row.job.title}</span>
                <span className="mt-1 block text-sm text-[#5c5872]">
                  {row.employer.name}
                  {row.job.locationLabel ? ` · ${row.job.locationLabel}` : ""}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-2xl border border-dashed border-[#e4e1ee] px-5 py-8 text-sm text-[#5c5872]">
          Browse every open role on the city board, or send a vacancy if you are hiring here.
        </p>
      )}
      <p className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
        <Link href={CHENNAI_JOBS_HUB_PATH} className="text-[#3d348f] underline-offset-4 hover:underline">
          Jobs in Chennai
        </Link>
        <Link href={ADVERTISE_JOBS_PATH} className="text-[#3d348f] underline-offset-4 hover:underline">
          Post a job vacancy in Chennai
        </Link>
        {areaHref ? (
          <Link href={areaHref} className="text-[#3d348f] underline-offset-4 hover:underline">
            Area guide
          </Link>
        ) : null}
      </p>
    </article>
  );
}
