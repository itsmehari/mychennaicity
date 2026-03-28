import Image from "next/image";
import Link from "next/link";

const EXPLORE_MAIN_IMAGE = "/images/explore-chennai-madras-high-court.jpg";

const EXPLORE_INSET_IMAGE = "/images/explore-chennai-kapaleeshwar-temple.jpg";

const FEATURES = [
  "Schools, colleges & learning hubs",
  "Hospitals & neighbourhood clinics",
  "Filter coffee, dining & night markets",
  "Marina, beaches & city parks",
  "Civic desks & government services",
  "Metro, buses & corridor commutes",
] as const;

function CheckBullet() {
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2d6a4f] text-white shadow-sm dark:bg-emerald-600"
      aria-hidden
    >
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 6l3 3 5-6" />
      </svg>
    </span>
  );
}

export function HomeExploreChennai() {
  return (
    <section
      id="explore-chennai"
      className="scroll-mt-28 rounded-[2rem] bg-[#eceae5] px-5 py-12 sm:px-8 sm:py-16 dark:bg-[color-mix(in_srgb,var(--surface)_88%,#0d3329_12%)]"
      aria-labelledby="explore-chennai-heading"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: overlapping framed images */}
        <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border-[3px] border-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] dark:border-[color-mix(in_srgb,var(--border)_70%,white)]">
            <Image
              src={EXPLORE_MAIN_IMAGE}
              alt="Madras High Court building, Chennai"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority={false}
            />
          </div>
          <div
            className="absolute -bottom-4 right-0 z-10 w-[42%] max-w-[220px] overflow-hidden rounded-sm border-[3px] border-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)] sm:-bottom-6 sm:right-2 dark:border-[color-mix(in_srgb,var(--border)_70%,white)]"
            style={{ aspectRatio: "1" }}
          >
            <Image
              src={EXPLORE_INSET_IMAGE}
              alt="Kapaleeshwarar Temple gopuram, Chennai"
              fill
              className="object-cover object-[center_25%]"
              sizes="220px"
            />
          </div>
        </div>

        {/* Right: typographic stack */}
        <div className="min-w-0 lg:pl-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--accent-warm)]">
            Explore Chennai
          </p>
          <h2
            id="explore-chennai-heading"
            className="mt-3 font-serif text-[1.65rem] font-bold leading-[1.15] tracking-tight text-[#0f2f28] sm:text-3xl lg:text-[2.15rem] dark:text-emerald-100"
          >
            Your map to Greater Chennai — neighbourhoods, news, and everyday
            city life.
          </h2>
          <p className="mt-6 border-l-[3px] border-[var(--accent-warm)] pl-5 text-base font-medium leading-snug text-[#3d3a35] dark:text-[color-mix(in_srgb,var(--foreground)_92%,var(--muted))]">
            One place to browse jobs, events, civic updates, and trusted
            listings — tuned for how Chennai moves, works, and unwinds.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-[#6b6560] dark:text-[var(--muted)]">
            From Adyar to Ambattur, we are wiring area hubs, a living directory,
            and local news so you can explore the city block by block — on
            mobile first.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {FEATURES.map((label) => (
              <li key={label} className="flex items-start gap-3">
                <CheckBullet />
                <span className="pt-0.5 text-sm font-medium text-[#2c2824] dark:text-[color-mix(in_srgb,var(--foreground)_90%,var(--muted))]">
                  {label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="/directory"
              className="inline-flex min-h-11 items-center justify-center bg-[var(--accent-warm)] px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-md transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-warm)] dark:text-[var(--accent-fg)]"
            >
              Discover more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
