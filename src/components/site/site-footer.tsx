import Link from "next/link";
import { NewsletterFooterTrigger } from "@/components/newsletter/newsletter-footer-trigger";
import { chennaiZones } from "@/lib/chennai-zones";
import { getOrgSocialLinks } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { WHATSAPP_COMMUNITY_PAGE_PATH } from "@/lib/whatsapp-community";
import { MYCHENNAICITY_USAGE_GUIDE_PATH } from "@/content/guides/mychennaicity-usage";

const newsLinks = [
  { href: "/chennai-local-news", label: "Chennai local news" },
  { href: "/chennai-local-news/topic/chennai", label: "Civic & GCC" },
  { href: "/chennai-local-news/topic/mobility", label: "Mobility & Metro" },
  { href: "/chennai-local-news/topic/consumer", label: "Consumer" },
  { href: "/chennai-local-news/topic/elections", label: "Elections" },
  { href: "/chennai-local-news", label: "Editor’s picks" },
];

const discoverLinks = [
  { href: "/search", label: "Search the site" },
  { href: MYCHENNAICITY_USAGE_GUIDE_PATH, label: "How to use this site" },
  { href: "/glossary", label: "Chennai & GCC glossary" },
  { href: WHATSAPP_COMMUNITY_PAGE_PATH, label: "WhatsApp community" },
  { href: "/directory", label: "Full directory" },
  { href: "/chennai-local-events", label: "Chennai local events" },
  { href: CHENNAI_JOBS_HUB_PATH, label: "Chennai jobs" },
  { href: "/llms.txt", label: "AI / LLM site index" },
  { href: "/#areas", label: "Area map (home)" },
];

const workLinks = [
  { href: CHENNAI_JOBS_HUB_PATH, label: "Browse Chennai jobs" },
  { href: "/contact#jobs", label: "Post a job" },
  { href: "/contact#directory", label: "List your business" },
  { href: "/contact#events", label: "Submit an event" },
];

const companyLinks = [
  { href: "/about", label: "About us" },
  { href: MYCHENNAICITY_USAGE_GUIDE_PATH, label: "How to use this site" },
  { href: "/contact", label: "Contact & tips" },
  { href: "/editorial-standards", label: "Editorial standards" },
  { href: "/contact", label: "Advertise" },
  { href: "/contact", label: "Careers" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms of use" },
  { href: "/terms#disclaimer", label: "Disclaimer" },
  { href: "/cookies", label: "Cookies" },
  { href: "/community-guidelines", label: "Community guidelines" },
  { href: "/humans.txt", label: "humans.txt" },
];

const tagLinks = [
  { href: "/chennai-local-news/topic/mobility", label: "Metro" },
  { href: "/chennai-local-news/topic/chennai", label: "GCC" },
  { href: "/chennai-local-news/topic/chennai", label: "Monsoon" },
  { href: "/areas/omr-perungudi-sholinganallur", label: "OMR" },
  { href: "/chennai-local-news/topic/chennai", label: "Marina" },
  { href: CHENNAI_JOBS_HUB_PATH, label: "Startups" },
  { href: "/chennai-local-events", label: "Weekend" },
  { href: CHENNAI_JOBS_HUB_PATH, label: "Remote" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="min-w-0">
      <p className="border-b border-[var(--footer-border)] pb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--footer-muted)]">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-sm leading-snug text-[var(--footer-link)] transition hover:text-[var(--footer-link-hover)]"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const areaLinks = chennaiZones.slice(0, 8).map((z) => ({
    href: `/areas/${z.slug}`,
    label: z.label,
  }));
  const socialLinks = getOrgSocialLinks();

  return (
    <footer
      className="site-footer relative mt-20 border-t-4 border-[var(--accent)] bg-[var(--footer-bg)] text-[var(--footer-fg)]"
      role="contentinfo"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--accent)]/12 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1280px] px-4 pb-12 pt-12 sm:px-6 sm:pb-14 sm:pt-14 lg:px-8 lg:pb-16 lg:pt-16">
        {/* Primary CTA — elevated card on the dark slab (classic fat-footer pattern) */}
        <div className="rounded-2xl border border-[var(--footer-border)] bg-[var(--footer-elevated)] p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)] sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Backup navigation
            </p>
            <h2 className="type-display mt-3 text-2xl text-[var(--footer-fg)] sm:text-3xl">
              Everything worth a second click — without scrolling the home page
              again.
            </h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-[var(--footer-muted)]">
              Local news, jobs, events, directory, and neighbourhood pages in one
              fat footer. Same idea as multi-column footers on editorial and
              product sites.
            </p>
          </div>
          <div className="mt-8 flex flex-shrink-0 flex-wrap gap-3 lg:mt-0">
            <Link
              href="/chennai-local-news"
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-bold text-[var(--accent-fg)] shadow-md transition hover:bg-[var(--accent-hover)]"
            >
              Open local news
            </Link>
            <NewsletterFooterTrigger className="inline-flex items-center justify-center rounded-full border-2 border-[var(--footer-border)] bg-transparent px-6 py-3 text-sm font-bold text-[var(--footer-fg)] transition hover:border-[var(--footer-link-hover)] hover:text-[var(--footer-link-hover)]">
              Email digest
            </NewsletterFooterTrigger>
            <Link
              href={`${WHATSAPP_COMMUNITY_PAGE_PATH}?src=footer`}
              className="inline-flex items-center justify-center rounded-full border-2 border-[color-mix(in_srgb,#25D366_40%,var(--footer-border))] bg-[color-mix(in_srgb,#25D366_10%,transparent)] px-6 py-3 text-sm font-bold text-[#7dcea0] transition hover:border-[#25D366] hover:text-[#a8e6cf]"
            >
              WhatsApp community
            </Link>
          </div>
        </div>

        {/* Brand + dense link grid */}
        <div className="mt-14 grid gap-14 border-b border-[var(--footer-border)] pb-14 lg:mt-16 lg:grid-cols-12 lg:gap-12 lg:pb-16">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-sm font-bold text-[var(--accent-fg)] shadow-lg ring-2 ring-[var(--footer-border)]"
                aria-hidden
              >
                MC
              </span>
              <span className="type-display text-xl text-[var(--footer-fg)]">
                mychennaicity.in
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--footer-muted)]">
              City-scale local: news, discovery, jobs, and listings for Greater
              Chennai — harbour belt to OMR, Ambattur to Adyar.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-[color-mix(in_srgb,var(--footer-muted)_92%,var(--footer-fg))]">
              Map tiles are simplified for browsing; not a legal cadastral
              survey.
            </p>

            <div className="mt-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--footer-muted)]">
                Follow
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href={`${WHATSAPP_COMMUNITY_PAGE_PATH}?src=footer-social`}
                  className="inline-flex items-center rounded-full border border-[color-mix(in_srgb,#25D366_40%,var(--footer-border))] bg-[color-mix(in_srgb,#25D366_12%,var(--footer-elevated))] px-3 py-1.5 text-xs font-semibold text-[#a8e6cf] transition hover:border-[#25D366]"
                >
                  WhatsApp
                </Link>
                {socialLinks.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-[var(--footer-border)] bg-[var(--footer-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--footer-link)] transition hover:border-[var(--footer-link-hover)] hover:text-[var(--footer-link-hover)]"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <p className="mt-8 text-xs text-[var(--footer-muted)]">
              Web-first · English (தமிழ் pages in progress).
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4 lg:gap-x-6"
            aria-label="Footer"
          >
            <FooterColumn title="News & guides" links={newsLinks} />
            <FooterColumn title="Discover" links={discoverLinks} />
            <FooterColumn title="Work & list" links={workLinks} />
            <FooterColumn title="Company" links={companyLinks} />
          </nav>
        </div>

        {/* Popular areas */}
        <div className="mt-12 lg:mt-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--footer-muted)]">
            Popular area hubs
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-5">
            {areaLinks.map((a) => (
              <li key={a.href}>
                <Link
                  href={a.href}
                  className="text-sm font-medium text-[var(--footer-link)] underline decoration-[var(--footer-border)] underline-offset-4 transition hover:text-[var(--footer-link-hover)] hover:decoration-[var(--footer-link-hover)]"
                >
                  {a.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#areas"
                className="text-sm font-bold text-[var(--footer-link-hover)] underline-offset-4 hover:underline"
              >
                All areas on map →
              </Link>
            </li>
          </ul>
        </div>

        {/* Topic chips */}
        <div className="mt-10 rounded-2xl border border-[var(--footer-border)] bg-[color-mix(in_srgb,var(--footer-elevated)_55%,var(--footer-bg))] px-5 py-5 sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--footer-muted)]">
            Explore by topic
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tagLinks.map((t) => (
              <Link
                key={t.href + t.label}
                href={t.href}
                className="rounded-full border border-[var(--footer-border)] bg-[var(--footer-bg)] px-3.5 py-1.5 text-xs font-semibold text-[var(--footer-link)] transition hover:border-[var(--footer-link-hover)] hover:text-[var(--footer-link-hover)]"
              >
                #{t.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Subfooter */}
        <div className="mt-12 flex flex-col gap-8 border-t border-[var(--footer-border)] pt-10 lg:flex-row lg:items-center lg:justify-between">
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2"
            aria-label="Legal"
          >
            {legalLinks.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className="text-xs font-semibold text-[var(--footer-muted)] transition hover:text-[var(--footer-fg)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="text-xs leading-relaxed text-[var(--footer-muted)] lg:text-right">
            <p className="font-medium text-[var(--footer-link)]">
              © {new Date().getFullYear()} mychennaicity.in
            </p>
            <p className="mt-1">
              Chennai · Tamil Nadu · India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
