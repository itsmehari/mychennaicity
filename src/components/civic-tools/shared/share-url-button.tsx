"use client";

export function ShareUrlButton({ buildUrl }: { buildUrl: () => string }) {
  const handleShare = async () => {
    const url = buildUrl();
    if (navigator.share) {
      try {
        await navigator.share({ url, title: "MyChennaiCity civic tool" });
        return;
      } catch {
        /* fall through */
      }
    }
    await navigator.clipboard.writeText(url);
    alert("Link copied to clipboard");
  };

  return (
    <button
      type="button"
      onClick={() => void handleShare()}
      className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--surface)]"
    >
      Share result
    </button>
  );
}
