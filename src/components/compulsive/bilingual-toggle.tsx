import Link from "next/link";

export function BilingualToggle({
  enHref,
  taHref,
  current,
}: {
  enHref: string;
  taHref: string;
  current: "en" | "ta";
}) {
  return (
    <p className="not-prose mt-3 text-xs font-semibold text-[var(--muted)]">
      <Link
        href={enHref}
        hrefLang="en-IN"
        className={
          current === "en"
            ? "text-[var(--foreground)]"
            : "text-[var(--accent)] underline-offset-2 hover:underline"
        }
      >
        English
      </Link>
      <span className="mx-1.5 text-[var(--border)]" aria-hidden>
        /
      </span>
      <Link
        href={taHref}
        hrefLang="ta-IN"
        className={
          current === "ta"
            ? "text-[var(--foreground)]"
            : "text-[var(--accent)] underline-offset-2 hover:underline"
        }
      >
        தமிழ்
      </Link>
    </p>
  );
}
