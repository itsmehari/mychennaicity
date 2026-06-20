import Script from "next/script";

type Props = {
  /** Full AdSense client id, e.g. `ca-pub-xxxxxxxxxxxxxxxx`. */
  clientId: string;
};

/** Loads adsbygoogle.js for AdSense site verification and (later) ad serving. */
export function GoogleAdSenseScripts({ clientId }: Props) {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`}
      crossOrigin="anonymous"
      strategy="beforeInteractive"
    />
  );
}
