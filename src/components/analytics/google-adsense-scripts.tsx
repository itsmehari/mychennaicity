import Script from "next/script";

type Props = {
  /** Full AdSense client id, e.g. `ca-pub-xxxxxxxxxxxxxxxx`. */
  clientId: string;
};

/** Loads adsbygoogle.js once; enable only after AdSense approval. */
export function GoogleAdSenseScripts({ clientId }: Props) {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
