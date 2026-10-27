import Link from "next/link";
import { ContactIntentRail } from "@/components/contact/contact-intent-rail";
import { WhatsAppDeskButton } from "@/components/contact/whatsapp-desk-button";
import {
  WhatsAppCommunityJoinLink,
  WhatsAppCommunityPageLink,
} from "@/components/community/whatsapp-community-join-link";
import { CONTACT_CHANNELS } from "@/lib/contact-channels";
import { getBusinessWhatsAppCopy } from "@/lib/whatsapp-cta-copy";
import { WHATSAPP_COMMUNITY_GROUP_NAME } from "@/lib/whatsapp-community";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width="16" height="16">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function ContactServiceGrid() {
  const defaultPrefill = getBusinessWhatsAppCopy("default").prefill;

  return (
    <div className="mcc-corp">
      <header className="mcc-corp-hero">
        <div className="mcc-corp-hero__grid">
          <div>
            <p className="mcc-corp-kicker">
              <span className="mcc-corp-kicker__rule" aria-hidden />
              mychennaicity.in · Corporate desk
            </p>
            <h1 className="mcc-corp-hero__title">Engage with our team</h1>
            <p className="mcc-corp-hero__lede">
              A single point of contact for news tips, hiring, events, directory
              listings, and partnerships across Greater Chennai. Select your
              inquiry type — we route every message to the right desk.
            </p>
            <div className="mcc-corp-hero__actions">
              <WhatsAppDeskButton
                text={defaultPrefill}
                source="contact_hero"
                className="mcc-corp-btn mcc-corp-btn--wa"
              >
                <WhatsAppIcon />
                Message on WhatsApp
              </WhatsAppDeskButton>
              <a href="#engagement" className="mcc-corp-btn mcc-corp-btn--ghost">
                View inquiry paths
              </a>
            </div>
          </div>

          <aside className="mcc-corp-hero__aside" aria-label="Service commitments">
            <p className="mcc-corp-hero__aside-label">Operating principles</p>
            <ul className="mcc-corp-hero__stats">
              <li className="mcc-corp-hero__stat">
                <strong>01</strong>
                <span>Topic-routed intake — tips, jobs, events, listings</span>
              </li>
              <li className="mcc-corp-hero__stat">
                <strong>02</strong>
                <span>Every submission is reviewed before publication</span>
              </li>
              <li className="mcc-corp-hero__stat">
                <strong>03</strong>
                <span>WhatsApp for tips, jobs, events, and listings</span>
              </li>
            </ul>
          </aside>
        </div>
      </header>

      <div className="mcc-corp-trust" role="presentation">
        <div className="mcc-corp-trust__item">
          <strong>Coverage</strong>
          Greater Chennai — harbour belt to OMR
        </div>
        <div className="mcc-corp-trust__item">
          <strong>Response</strong>
          We read every message; replies depend on verification needs
        </div>
        <div className="mcc-corp-trust__item">
          <strong>Standards</strong>
          Civic journalism · community guidelines apply
        </div>
      </div>

      <section id="engagement" className="mcc-corp-shell" aria-labelledby="engagement-title">
        <div className="mcc-corp-shell__inner">
          <ContactIntentRail />

          <div>
            <header className="mcc-corp-section-head">
              <p className="mcc-corp-section-head__eyebrow">Engagement centre</p>
              <h2 id="engagement-title" className="mcc-corp-section-head__title">
                How can we help?
              </h2>
              <p className="mcc-corp-section-head__dek">
                Choose a path below. Each includes a briefing checklist so your
                first message has everything we need to act.
              </p>
            </header>

            <div id="paths" className="mcc-corp-lanes">
              {CONTACT_CHANNELS.map((channel, index) => {
                const waCopy = channel.whatsappVariant
                  ? getBusinessWhatsAppCopy(channel.whatsappVariant)
                  : getBusinessWhatsAppCopy("default");
                const n = String(index + 1).padStart(2, "0");

                return (
                  <article
                    key={channel.id}
                    id={channel.id}
                    className="mcc-corp-lane"
                    aria-labelledby={`contact-lane-${channel.id}`}
                  >
                    <div className="mcc-corp-lane__index" aria-hidden>
                      {n}
                    </div>
                    <div>
                      <h3
                        id={`contact-lane-${channel.id}`}
                        className="mcc-corp-lane__title"
                      >
                        {channel.title}
                      </h3>
                      <p className="mcc-corp-lane__body">{channel.body}</p>
                      <ul className="mcc-corp-lane__check">
                        {channel.checklist.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mcc-corp-lane__actions">
                      <WhatsAppDeskButton
                        text={waCopy.prefill}
                        source={`contact_${channel.id}`}
                        className="mcc-corp-btn mcc-corp-btn--wa mcc-corp-btn--sm mcc-corp-btn--block"
                      >
                        <WhatsAppIcon />
                        {channel.primaryLabel}
                      </WhatsAppDeskButton>
                      {channel.hub ? (
                        <Link
                          href={channel.hub.href}
                          className="mcc-corp-btn mcc-corp-btn--outline-ink mcc-corp-btn--sm mcc-corp-btn--block"
                        >
                          {channel.hub.label}
                        </Link>
                      ) : null}
                      <p className="mcc-corp-lane__hint">Opens WhatsApp with a starter message</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mcc-corp-direct">
              <aside
                className="mcc-corp-direct__panel"
                aria-labelledby="contact-desk-title"
              >
                <p className="mcc-corp-direct__eyebrow">Desk</p>
                <h3 id="contact-desk-title" className="mcc-corp-direct__title">
                  WhatsApp
                </h3>
                <p className="mcc-corp-direct__body">
                  Send the details for a story, job, event, listing, or
                  partnership. Pick a topic above, or start from here.
                </p>
                <div className="mcc-corp-direct__actions">
                  <WhatsAppDeskButton
                    text={defaultPrefill}
                    source="contact_desk"
                    className="mcc-corp-btn mcc-corp-btn--wa mcc-corp-btn--sm"
                  >
                    <WhatsAppIcon />
                    Message on WhatsApp
                  </WhatsAppDeskButton>
                </div>
              </aside>

              <aside
                className="mcc-corp-direct__panel mcc-corp-direct__panel--ink"
                aria-labelledby="contact-community-title"
              >
                <p className="mcc-corp-direct__eyebrow">Community</p>
                <h3 id="contact-community-title" className="mcc-corp-direct__title">
                  {WHATSAPP_COMMUNITY_GROUP_NAME}
                </h3>
                <p className="mcc-corp-direct__body">
                  Reader community for city updates — separate from the
                  corporate desk used for listings and tips.
                </p>
                <div className="mcc-corp-direct__actions">
                  <WhatsAppCommunityJoinLink
                    utmContent="contact"
                    className="mcc-corp-btn mcc-corp-btn--wa mcc-corp-btn--sm"
                  >
                    Request to join
                  </WhatsAppCommunityJoinLink>
                  <WhatsAppCommunityPageLink
                    className="mcc-corp-btn mcc-corp-btn--ghost mcc-corp-btn--sm"
                  >
                    About the group
                  </WhatsAppCommunityPageLink>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
