"use client";

import { useCallback, useEffect, useState } from "react";
import { CONTACT_CHANNELS } from "@/lib/contact-channels";

function setLaneActive(id: string | null) {
  document.querySelectorAll<HTMLElement>(".mcc-contact-lane").forEach((el) => {
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
    <nav className="mcc-contact-intent" aria-label="Choose why you are contacting us">
      <p className="mcc-contact-intent__label">What do you need?</p>
      <ul className="mcc-contact-intent__list">
        {CONTACT_CHANNELS.map((channel) => (
          <li key={channel.id}>
            <button
              type="button"
              className="mcc-contact-intent__chip"
              aria-current={activeId === channel.id ? "true" : undefined}
              onClick={() => goTo(channel.id)}
            >
              {channel.shortLabel}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
