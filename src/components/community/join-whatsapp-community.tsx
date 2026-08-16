import { isWhatsAppCommunityInviteConfigured } from "@/lib/whatsapp-server";
import { WhatsAppCommunityJoinLink, WhatsAppCommunityPageLink } from "./whatsapp-community-join-link";

const joinBtnClass =
  "inline-flex min-h-[44px] items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--foreground)_12%,var(--border))] bg-[var(--background)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] transition hover:border-[#128C7E] hover:text-[#128C7E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E]";

export function JoinWhatsAppCommunityCard({
  layout = "card",
}: {
  /** `inline` = tighter band for article foot; `card` = hub / home panels; `sidebar` = article rail */
  layout?: "card" | "inline" | "sidebar";
}) {
  const enabled = isWhatsAppCommunityInviteConfigured();

  if (!enabled) {
    if (layout === "sidebar") {
      return (
        <p className="civic-sidebar-wa__text">
          A moderated Chennai reader group is being set up — the invite will
          land here once the desk is ready.
        </p>
      );
    }
    return (
      <div
        className={
          layout === "inline"
            ? "text-sm leading-relaxed text-[var(--muted)]"
            : "rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
        }
      >
        {layout === "inline" ? (
          <p>
            <span className="font-semibold text-[var(--foreground)]">
              WhatsApp community:
            </span>{" "}
            We are finalising a moderated Chennai reader group — the invite will
            land here once moderation rules are set.
          </p>
        ) : (
          <>
            <h2 className="text-sm font-semibold text-[var(--foreground)]">
              WhatsApp community
            </h2>
            <p className="type-lede mt-2 text-sm leading-relaxed text-[var(--muted)]">
              We are finalising a moderated Chennai reader group — the invite
              will appear here once moderation and signup are ready.
            </p>
          </>
        )}
      </div>
    );
  }

  if (layout === "sidebar") {
    return (
      <>
        <p className="civic-sidebar-wa__text">
          Short civic notes and civil discussion — same standards as the site.
        </p>
        <WhatsAppCommunityJoinLink
          utmContent="article_sidebar"
          className="civic-sidebar-wa__btn"
        >
          Join the reader group
        </WhatsAppCommunityJoinLink>
      </>
    );
  }

  return (
    <div
      className={
        layout === "inline"
          ? ""
          : "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 ring-1 ring-[color-mix(in_srgb,var(--foreground)_4%,transparent)] sm:p-6"
      }
    >
      {layout !== "inline" ? (
        <h2 className="text-sm font-semibold text-[var(--foreground)]">
          Join my chennai city on WhatsApp
        </h2>
      ) : null}
      <p
        className={
          layout === "inline"
            ? "text-sm leading-relaxed text-[var(--muted)]"
            : "type-lede mt-2 text-sm leading-relaxed text-[var(--muted)]"
        }
      >
        {layout === "inline" ? (
          <span className="font-semibold text-[var(--foreground)]">
            Reader group:
          </span>
        ) : null}{" "}
        The <strong className="font-semibold text-[var(--foreground)]">my chennai city</strong>{" "}
        reader group — short updates and civil discussion, same standards as the
        site. Opens WhatsApp after you tap.
      </p>
      <p className={layout === "inline" ? "mt-3" : "mt-4"}>
        <WhatsAppCommunityJoinLink
          utmContent={layout === "inline" ? "inline" : "card"}
          className={joinBtnClass}
        >
          Join on WhatsApp
        </WhatsAppCommunityJoinLink>
        {layout !== "inline" ? (
          <>
            {" "}
            <WhatsAppCommunityPageLink
              src="card"
              className="ml-3 text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              About the group
            </WhatsAppCommunityPageLink>
          </>
        ) : null}
      </p>
    </div>
  );
}
