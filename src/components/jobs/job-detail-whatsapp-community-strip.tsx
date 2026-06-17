import { isWhatsAppCommunityInviteConfigured } from "@/lib/whatsapp-server";
import {
  WhatsAppCommunityJoinLink,
  WhatsAppCommunityPageLink,
} from "@/components/community/whatsapp-community-join-link";

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

const joinBtnClass =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E] sm:min-h-[44px] sm:px-6";

/**
 * Placement rule: first content band on job detail pages — immediately after
 * breadcrumbs, before the job title and apply flow.
 */
export function JobDetailWhatsAppCommunityStrip({
  className = "",
}: {
  className?: string;
}) {
  const enabled = isWhatsAppCommunityInviteConfigured();

  if (!enabled) {
    return (
      <section
        className={`mt-6 rounded-2xl border border-dashed border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_94%,#25D366_3%)] px-4 py-4 sm:px-5 sm:py-5 ${className}`.trim()}
        aria-label="WhatsApp community"
      >
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          <span className="font-semibold text-[var(--foreground)]">
            WhatsApp group:
          </span>{" "}
          We are finalising a moderated Chennai jobs reader group — the invite
          will appear here once it is ready.
        </p>
      </section>
    );
  }

  return (
    <section
      className={`relative mt-6 overflow-hidden rounded-2xl border border-[color-mix(in_srgb,#25D366_28%,var(--border))] bg-[color-mix(in_srgb,var(--surface)_88%,#25D366_8%)] shadow-sm ring-1 ring-[color-mix(in_srgb,#25D366_12%,transparent)] ${className}`.trim()}
      aria-label="Join our WhatsApp group"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-[#25D366]"
        aria-hidden
      />
      <div className="flex flex-col gap-4 px-4 py-4 pl-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-5 sm:pl-7">
        <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm">
            <WhatsAppMark className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#128C7E]">
              Chennai jobs community
            </p>
            <h2 className="mt-1 text-base font-semibold leading-snug text-[var(--foreground)] sm:text-lg">
              Join our WhatsApp group
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
              Fresh Chennai job alerts, hiring tips, and civil discussion — same
              standards as the site. Tap to open WhatsApp.
            </p>
          </div>
        </div>
        <p className="sm:shrink-0">
          <WhatsAppCommunityJoinLink utmContent="job-detail" className={joinBtnClass}>
            <WhatsAppMark className="h-4 w-4" />
            Join group
          </WhatsAppCommunityJoinLink>
          <WhatsAppCommunityPageLink
            src="job-detail"
            className="mt-2 block text-center text-xs font-semibold text-[#128C7E] hover:underline sm:mt-2"
          >
            About the group
          </WhatsAppCommunityPageLink>
        </p>
      </div>
    </section>
  );
}
