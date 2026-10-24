"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useState, type CSSProperties } from "react";
import {
  PARTNER_AD_ROTATE_MS,
  isPartnerPhotoAd,
  type PartnerAdCreative,
  type PartnerAdPlacement,
  type PartnerAdShape,
} from "@/lib/partner-ads";

const PartnerAdPhotoBody = dynamic(() =>
  import("@/components/ads/partner-ad-photo-body").then(
    (mod) => mod.PartnerAdPhotoBody,
  ),
);

type Props = {
  ads: PartnerAdCreative[];
  shape: PartnerAdShape;
  placement: PartnerAdPlacement;
  className?: string;
};

function photoSlideStyle(ad: PartnerAdCreative): CSSProperties | undefined {
  if (!isPartnerPhotoAd(ad)) return undefined;
  return {
    "--partner-ad-ink": ad.ink,
    "--partner-ad-accent": ad.accent,
    "--partner-ad-offer-scale": String(ad.offerScale ?? 1),
    "--partner-ad-photo-position": ad.photoPosition ?? "center 42%",
  } as CSSProperties;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PartnerAdRotator({ ads, shape, placement, className = "" }: Props) {
  const titleId = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (ads.length < 2 || paused || reduceMotion || prefersReducedMotion()) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % ads.length);
    }, PARTNER_AD_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [ads.length, paused, reduceMotion]);

  if (ads.length === 0) return null;

  const active = ads[index] ?? ads[0];
  const shapeClass =
    shape === "square" ? "partner-ad--square" : "partner-ad--rectangle";

  return (
    <div
      className={`partner-ad ${shapeClass} partner-ad--theme-${active.theme}${className ? ` ${className}` : ""}`}
      aria-roledescription="carousel"
      aria-labelledby={titleId}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <p id={titleId} className="sr-only">
        Advertisement carousel. Rotation pauses when you hover or focus inside.
      </p>
      <p className="partner-ad__label" aria-hidden="true">
        Advertisement
      </p>
      <div className="partner-ad__viewport">
        {ads.map((ad, i) => {
          const isActive = i === index;
          return (
            <a
              key={ad.id}
              href={ad.href}
              className={`partner-ad__slide partner-ad--theme-${ad.theme}${isPartnerPhotoAd(ad) ? " partner-ad__slide--photo" : ""}${isActive ? " is-active" : ""}`}
              style={photoSlideStyle(ad)}
              target="_blank"
              rel="noopener noreferrer"
              data-partner-link={ad.partner}
              data-utm-content={placement}
              aria-label={
                isPartnerPhotoAd(ad)
                  ? `${ad.offer}. ${ad.support} ${ad.photoCta}`
                  : `${ad.headline}. ${ad.cta}`
              }
              aria-hidden={isActive ? undefined : true}
              tabIndex={isActive ? 0 : -1}
            >
              {isPartnerPhotoAd(ad) ? (
                <PartnerAdPhotoBody ad={ad} />
              ) : (
                <>
                  {ad.theme === "resume" ? (
                    <span className="partner-ad__texture" aria-hidden />
                  ) : null}
                  <span className="partner-ad__copy">
                    <span className="partner-ad__kicker">
                      {ad.eyebrow} · {ad.kicker}
                    </span>
                    <span className="partner-ad__headline">{ad.headline}</span>
                    <span className="partner-ad__body">{ad.body}</span>
                  </span>
                  <span className="partner-ad__cta">{ad.cta}</span>
                </>
              )}
            </a>
          );
        })}
      </div>
      {ads.length > 1 ? (
        <div className="partner-ad__dots">
          {ads.map((ad, i) => {
            const isActive = i === index;
            return (
              <button
                key={ad.id}
                type="button"
                className={`partner-ad__dot${isActive ? " is-active" : ""}`}
                aria-label={ad.partner}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setIndex(i)}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
