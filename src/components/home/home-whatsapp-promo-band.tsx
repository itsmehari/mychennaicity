import Link from "next/link";
import {
  WHATSAPP_COMMUNITY_GROUP_NAME,
  WHATSAPP_COMMUNITY_PAGE_PATH,
  whatsappCommunityJoinHref,
} from "@/lib/whatsapp-community";
import { whatsappRequestCtaLabel } from "@/lib/whatsapp-link";

function WhatsAppMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/**
 * Always-on home promo (not gated on WA_REACH). Sits directly under the hero.
 */
export function HomeWhatsAppPromoBand() {
  const joinHref = whatsappCommunityJoinHref("home-hero-band");
  return (
    <section
      className="relative mx-auto mt-4 max-w-[1280px] overflow-hidden rounded-[1.5rem] bg-[#075E54] px-4 py-5 text-white shadow-[0_20px_48px_-24px_rgba(7,94,84,0.9)] ring-1 ring-[#043f39] sm:px-6 sm:py-6"
      aria-labelledby="home-wa-promo-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div className="min-w-0 max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#b7f5d4]">
            Official Chennai community
          </p>
          <h2 id="home-wa-promo-heading" className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">
            Join {WHATSAPP_COMMUNITY_GROUP_NAME} on WhatsApp
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#d7f5e6]">
            Free, moderated chat for Greater Chennai — news, jobs, events, and neighbour help.
            One minute to request. Message the desk after. The group link comes only in that reply.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-[#b7f5d4]">
            {["Free", "All Chennai", "No crypto spam"].map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col lg:items-stretch">
          <Link
            href={joinHref}
            data-site-cta="whatsapp"
            data-wa-type="request"
            data-wa-placement="home"
            data-wa-content="home-hero-band"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_24px_-12px_rgba(37,211,102,0.85)] transition hover:bg-[#1ebe5d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b7f5d4]"
          >
            <WhatsAppMark className="h-5 w-5" />
            {whatsappRequestCtaLabel("en")}
          </Link>
          <Link
            href={WHATSAPP_COMMUNITY_PAGE_PATH}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b7f5d4]"
          >
            Group rules
          </Link>
        </div>
      </div>
    </section>
  );
}