"use client";

import { Analytics } from "@vercel/analytics/next";
import { isInternalMeasurementPath } from "@/lib/analytics/measurement-paths";

/** Drops Vercel page views for the super-admin desk. */
export function VercelAnalyticsGate() {
  return (
    <Analytics
      beforeSend={(event) => (isInternalMeasurementPath(event.url) ? null : event)}
    />
  );
}
