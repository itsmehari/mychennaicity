import Link from "next/link";
import { JoinWhatsAppCommunityCard } from "@/components/community/join-whatsapp-community";
import { CONTACT_CHANNELS } from "@/lib/contact-channels";
import { getPublicContactEmail } from "@/lib/env";
import {
  businessWhatsAppHref,
  getBusinessWhatsAppCopy,
} from "@/lib/whatsapp-cta-copy";
import { isWhatsAppBusinessConfigured } from "@/lib/whatsapp-server";

const cardClass =
  "flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 ring-1 ring-[color-mix(in_srgb,var(--foreground)_4%,transparent)] sm:p-6";

const actionClass =
  "inline-flex min-h-[44px] items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--foreground)_12%,var(--border))] bg-[var(--background)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

const actionPrimaryClass =
  "inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-bold text-[var(--accent-fg)] shadow-sm transition hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

function mailtoHref(email: string, subject?: string): string {
  if (!subject?.trim()) return `mailto:${email}`;
  return `mailto:${email}?${new URLSearchParams({ subject: subject.trim() }).toString()}`;
}

export function ContactServiceGrid() {
  const contactEmail = getPublicContactEmail();
  const waDesk = isWhatsAppBusinessConfigured();

  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6">
      {CONTACT_CHANNELS.map((channel) => {
        const waCopy = channel.whatsappVariant
          ? getBusinessWhatsAppCopy(channel.whatsappVariant)
          : null;
        const waHref = waCopy && waDesk ? businessWhatsAppHref(waCopy) : null;

        return (
          <article key={channel.id} className={cardClass}>
            <h2 className="text-base font-semibold text-[var(--foreground)]">
              {channel.title}
            </h2>
            <p className="type-lede mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
              {channel.body}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {waHref ? (
                <a href={waHref} className={actionPrimaryClass}>
                  Message on WhatsApp
                </a>
              ) : contactEmail ? (
                <a
                  href={mailtoHref(contactEmail, channel.emailSubject)}
                  className={actionPrimaryClass}
                >
                  Email us
                </a>
              ) : null}
              {contactEmail && waHref ? (
                <a
                  href={mailtoHref(contactEmail, channel.emailSubject)}
                  className={actionClass}
                >
                  Email instead
                </a>
              ) : null}
              {channel.hub ? (
                <Link href={channel.hub.href} className={actionClass}>
                  {channel.hub.label}
                </Link>
              ) : null}
            </div>
          </article>
        );
      })}

      <article
        className={`${cardClass} sm:col-span-2 lg:col-span-2`}
        aria-label="Reader WhatsApp community"
      >
        <JoinWhatsAppCommunityCard layout="card" />
      </article>
    </div>
  );
}
