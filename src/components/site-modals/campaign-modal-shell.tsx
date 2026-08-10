"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import type { SiteModalCampaign, SiteModalPoolItem } from "@/config/site-modals";

export type CampaignShellModel = {
  kind: "campaign";
  campaign: SiteModalCampaign;
};

export type StoryShellModel = {
  kind: "top-story";
  item: SiteModalPoolItem;
};

export type ShellModel = CampaignShellModel | StoryShellModel;

type Props = {
  open: boolean;
  model: ShellModel | null;
  onClose: (persistDismiss: boolean) => void;
  onPrimary: () => void;
  onSecondary: () => void;
};

/**
 * Shared presentation shell — campaigns and top-story pool use the same markup.
 */
export function CampaignModalShell({
  open,
  model,
  onClose,
  onPrimary,
  onSecondary,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descId = useId();
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement | null;
      if (!el.open) el.showModal();
      queueMicrotask(() => closeRef.current?.focus());
    } else if (el.open) {
      el.close();
      lastFocus.current?.focus?.();
    }
  }, [open]);

  if (!model) {
    return (
      <dialog
        ref={dialogRef}
        className="mcc-site-modal"
        aria-hidden
        hidden
      />
    );
  }

  const isStory = model.kind === "top-story";
  const image = isStory ? model.item.image : model.campaign.image;
  const imageAlt = isStory ? model.item.title : model.campaign.imageAlt;
  const eyebrow = isStory ? model.item.category : model.campaign.eyebrow;
  const title = isStory ? model.item.title : model.campaign.title;
  const body = isStory
    ? model.item.summary || "Read the latest on mychennaicity.in"
    : model.campaign.body;
  const benefits = isStory ? undefined : model.campaign.benefits;
  const primaryLabel = isStory ? "Read story" : model.campaign.primaryCta.label;
  const secondaryLabel = isStory
    ? "Not now"
    : model.campaign.secondaryCta?.label ?? "Close";

  const remoteImage = image.startsWith("http");

  return (
    <dialog
      ref={dialogRef}
      className="mcc-site-modal"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onCancel={(e) => {
        e.preventDefault();
        onClose(true);
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose(true);
      }}
    >
      <div className="mcc-site-modal__panel">
        <div className="mcc-site-modal__media">
          {remoteImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={imageAlt} className="mcc-site-modal__img" />
          ) : (
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 420px"
              priority={open}
            />
          )}
          <div className="mcc-site-modal__media-shade" aria-hidden />
          <button
            ref={closeRef}
            type="button"
            className="mcc-site-modal__close"
            aria-label="Close dialog"
            onClick={() => onClose(true)}
          >
            ×
          </button>
        </div>

        <div className="mcc-site-modal__body">
          <p className="mcc-site-modal__eyebrow">{eyebrow}</p>
          <h2 id={titleId} className="mcc-site-modal__title">
            {title}
          </h2>
          <p id={descId} className="mcc-site-modal__text">
            {body}
          </p>

          {benefits && benefits.length > 0 ? (
            <ul className="mcc-site-modal__benefits">
              {benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}

          <div className="mcc-site-modal__actions">
            {isStory ? (
              <Link
                href={model.item.url}
                className="mcc-site-modal__btn mcc-site-modal__btn--primary"
                onClick={onPrimary}
              >
                {primaryLabel}
              </Link>
            ) : model.campaign.primaryCta.href ? (
              <Link
                href={model.campaign.primaryCta.href}
                className="mcc-site-modal__btn mcc-site-modal__btn--primary"
                onClick={onPrimary}
              >
                {primaryLabel}
              </Link>
            ) : (
              <button
                type="button"
                className="mcc-site-modal__btn mcc-site-modal__btn--primary"
                onClick={onPrimary}
              >
                {primaryLabel}
              </button>
            )}
            <button
              type="button"
              className="mcc-site-modal__btn mcc-site-modal__btn--ghost"
              onClick={onSecondary}
            >
              {secondaryLabel}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
