import Link from "next/link";
import { ContactCopyEmail } from "@/components/contact/contact-copy-email";
import { ContactIntentRail } from "@/components/contact/contact-intent-rail";
import { JoinWhatsAppCommunityCard } from "@/components/community/join-whatsapp-community";
import { CONTACT_CHANNELS } from "@/lib/contact-channels";
import { getPublicContactEmail } from "@/lib/env";
import {
  businessWhatsAppHref,
  getBusinessWhatsAppCopy,
} from "@/lib/whatsapp-cta-copy";
import { isWhatsAppBusinessConfigured } from "@/lib/whatsapp-server";

function mailtoHref(email: string, subject?: string): string {
  if (!subject?.trim()) return `mailto:${email}`;
  return `mailto:${email}?${new URLSearchParams({ subject: subject.trim() }).toString()}`;
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden width="18" height="18">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function ContactServiceGrid() {
  const contactEmail = getPublicContactEmail();
  const waDesk = isWhatsAppBusinessConfigured();
  const defaultWa = waDesk
    ? businessWhatsAppHref(getBusinessWhatsAppCopy("default"))
    : null;

  return (
    <div className="mcc-contact">
      <header className="mcc-contact-hero">
        <p className="mcc-contact-hero__brand">
          <span className="mcc-contact-hero__brand-mark" aria-hidden>
            MC
          </span>
          mychennaicity.in desk
        </p>
        <h1 className="mcc-contact-hero__title">Tell us what you need</h1>
        <p className="mcc-contact-hero__lede">
          Pick a topic, send one clear message, and we route it — news tips, jobs,
          events, directory listings, or partnerships. WhatsApp is usually the
          fastest path.
        </p>
        <div className="mcc-contact-hero__actions">
          {defaultWa ? (
            <a href={defaultWa} className="mcc-contact-btn mcc-contact-btn--wa">
              <WhatsAppIcon />
              Message the desk
            </a>
          ) : contactEmail ? (
            <a
              href={mailtoHref(contactEmail, "General enquiry")}
              className="mcc-contact-btn mcc-contact-btn--accent"
            >
              Email the desk
            </a>
          ) : null}
          <a href="#paths" className="mcc-contact-btn mcc-contact-btn--ghost">
            Choose a topic
          </a>
        </div>
        <ul className="mcc-contact-hero__trust">
          <li>Routed by topic</li>
          <li>We read every message</li>
          <li>Not for emergencies</li>
        </ul>
      </header>

      <ContactIntentRail />

      <div id="paths" className="mcc-contact-lanes">
        {CONTACT_CHANNELS.map((channel, index) => {
          const waCopy = channel.whatsappVariant
            ? getBusinessWhatsAppCopy(channel.whatsappVariant)
            : null;
          const waHref = waCopy && waDesk ? businessWhatsAppHref(waCopy) : null;
          const n = String(index + 1).padStart(2, "0");

          return (
            <section
              key={channel.id}
              id={channel.id}
              className={`mcc-contact-lane mcc-contact-lane--${channel.tone}`}
              aria-labelledby={`contact-lane-${channel.id}`}
            >
              <div className="mcc-contact-lane__index" aria-hidden>
                {n}
              </div>
              <div>
                <h2
                  id={`contact-lane-${channel.id}`}
                  className="mcc-contact-lane__title"
                >
                  {channel.title}
                </h2>
                <p className="mcc-contact-lane__body">{channel.body}</p>
                <ul className="mcc-contact-lane__check">
                  {channel.checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mcc-contact-lane__actions">
                {waHref ? (
                  <a href={waHref} className="mcc-contact-btn mcc-contact-btn--wa mcc-contact-btn--sm">
                    <WhatsAppIcon />
                    {channel.primaryLabel}
                  </a>
                ) : contactEmail ? (
                  <a
                    href={mailtoHref(contactEmail, channel.emailSubject)}
                    className="mcc-contact-btn mcc-contact-btn--accent mcc-contact-btn--sm"
                  >
                    {channel.emailLabel}
                  </a>
                ) : null}
                {contactEmail && waHref ? (
                  <a
                    href={mailtoHref(contactEmail, channel.emailSubject)}
                    className="mcc-contact-btn mcc-contact-btn--ghost mcc-contact-btn--sm"
                  >
                    Email instead
                  </a>
                ) : null}
                {channel.hub ? (
                  <Link
                    href={channel.hub.href}
                    className="mcc-contact-btn mcc-contact-btn--ghost mcc-contact-btn--sm"
                  >
                    {channel.hub.label}
                  </Link>
                ) : null}
                {waHref ? (
                  <p className="mcc-contact-lane__hint">
                    Opens WhatsApp with a prefilled subject
                  </p>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mcc-contact-split">
        {contactEmail ? (
          <aside className="mcc-contact-email" aria-labelledby="contact-email-title">
            <h2 id="contact-email-title" className="mcc-contact-email__title">
              Prefer email?
            </h2>
            <p className="mcc-contact-email__body">
              Use a clear subject line (job, tip, event, advertise) so we can route
              it faster. Attach links or PDFs when they help.
            </p>
            <div className="mcc-contact-email__addr">
              <a href={mailtoHref(contactEmail)}>{contactEmail}</a>
              <ContactCopyEmail email={contactEmail} />
            </div>
            <a
              href={mailtoHref(contactEmail, "General enquiry")}
              className="mcc-contact-btn mcc-contact-btn--accent mcc-contact-btn--sm"
              style={{ alignSelf: "flex-start" }}
            >
              Open mail app
            </a>
          </aside>
        ) : null}

        <div className="mcc-contact-community" aria-label="Reader WhatsApp community">
          <JoinWhatsAppCommunityCard layout="card" />
        </div>
      </div>
    </div>
  );
}
