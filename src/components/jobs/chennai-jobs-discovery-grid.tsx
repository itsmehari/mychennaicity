import Link from "next/link";
import { JOB_CATEGORIES } from "@/content/jobs/job-categories";
import { JOB_LOCALITIES, textMatchesLocality } from "@/content/jobs/job-localities";
import type { ChennaiJobsHubCard } from "@/lib/jobs/chennai-jobs-hub-helpers";
import {
  chennaiJobsCategoryPath,
  chennaiJobsLocationPath,
} from "@/lib/routes/chennai-jobs";

export function ChennaiJobsDiscoveryGrid({ cards }: { cards: ChennaiJobsHubCard[] }) {
  return (
    <section className="mt-10" aria-labelledby="jobs-discovery-heading">
      <h2 id="jobs-discovery-heading" className="text-2xl font-semibold tracking-tight text-[#16161d]">
        Jobs by Chennai area
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5c5872]">
        Each link opens notices that name that place. A page joins the sitemap only when several employers have an open match.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {JOB_LOCALITIES.map((locality) => {
          const count = cards.filter((card) =>
            textMatchesLocality(
              locality,
              `${card.location} ${card.title} ${card.excerpt}`,
            ),
          ).length;
          return (
            <li key={locality.slug}>
              <Link
                href={chennaiJobsLocationPath(locality.slug)}
                className="flex items-center justify-between rounded-2xl border border-[#eceaf3] bg-white px-4 py-3 text-sm font-semibold text-[#16161d] hover:border-[#c9c2ff]"
              >
                <span>Jobs in {locality.label}</span>
                <span className="text-[#6d6886]">{count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <h2 className="mt-8 text-2xl font-semibold tracking-tight text-[#16161d]">
        Jobs by kind of work
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {JOB_CATEGORIES.map((category) => (
          <li key={category.slug}>
            <Link
              href={chennaiJobsCategoryPath(category.slug)}
              className="inline-flex rounded-full border border-[#e4e1ee] bg-white px-4 py-2 text-sm font-semibold text-[#2a2640] hover:border-[#c9c2ff]"
            >
              {category.h1}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
