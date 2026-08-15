"use client";

import { useCallback, useEffect, useState } from "react";
import { CONTACT_CHANNELS } from "@/lib/contact-channels";

function setLaneActive(id: string | null) {
  document.querySelectorAll<HTMLElement>(".mcc-corp-lane").forEach((el) => {
    el.dataset.active = id && el.id === id ? "true" : "false";
  });
}

export function ContactIntentRail() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const syncFromHash = useCallback(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (CONTACT_CHANNELS.some((c) => c.id === hash)) {
      setActiveId(hash);
      setLaneActive(hash);
    }
  }, []);

  useEffect(() => {
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [syncFromHash]);

  function goTo(id: string) {
    setActiveId(id);
    setLaneActive(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    const url = new URL(window.location.href);
    url.hash = id;
    window.history.replaceState(null, "", `${url.pathname}${url.search}#${id}`);
  }

  return (
    <nav className="mcc-corp-toc" aria-label="Inquiry type">
      <p className="mcc-corp-toc__label">Select inquiry</p>
      <ul className="mcc-corp-toc__list">
        {CONTACT_CHANNELS.map((channel, index) => (
          <li key={channel.id}>
            <button
              type="button"
              className="mcc-corp-toc__chip"
              aria-current={activeId === channel.id ? "true" : undefined}
              onClick={() => {
                goTo(channel.id);
                const gtag = (
                  window as Window & {
                    gtag?: (
                      command: "event",
                      name: string,
                      params?: Record<string, string>,
                    ) => void;
                  }
                ).gtag;
                gtag?.("event", "contact_intent_select", {
                  event_category: "contact",
                  intent: channel.id,
                });
              }}
            >
              <span className="mcc-corp-toc__n" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              {channel.shortLabel}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
