import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteAnalytics } from "@/components/analytics";
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
    default: "mychennaicity.in — Chennai news, jobs, events & listings",
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mychennaicity.in",
  ),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteAnalytics />
        {children}
      </body>
    </html>
  );
}
