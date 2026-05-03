import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { SiteAnalytics } from "@/components/analytics";
import { shouldSuppressGoogleMeasurementForRequest } from "@/lib/analytics-ip-exclusion";
import { getSiteUrl } from "@/lib/env";
import { SITE_TITLE_TEMPLATE } from "@/lib/seo/site-titles";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  title: {
    default: "Chennai news, jobs, events & directory",
    template: SITE_TITLE_TEMPLATE,
  },
  description:
    "Chennai-area local site: news, directory, jobs, events, and neighbourhood pages from Tiruvottiyur to OMR.",
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
        },
      }
    : {}),
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    type: "website",
    siteName: "mychennaicity.in",
    locale: "en_IN",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "mychennaicity.in — Chennai local news and city life",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const suppressGoogleMeasurement =
    shouldSuppressGoogleMeasurementForRequest(h);

  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteAnalytics suppressGoogleMeasurement={suppressGoogleMeasurement} />
        {children}
      </body>
    </html>
  );
}
