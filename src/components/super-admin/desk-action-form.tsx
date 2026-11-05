"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

type Action = (formData: FormData) => void | Promise<void>;

function isNextControlFlow(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("digest" in error)) return false;
  const digest = String((error as { digest?: unknown }).digest ?? "");
  return digest.startsWith("NEXT_");
}

/**
 * Server Action form that shows Saving… and the error text.
 * Redirects from the action (sign-out, job save) still navigate.
 */
export function DeskActionForm({
  action,
  children,
  className,
}: {
  action: Action;
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className={className ?? "inline-flex flex-wrap items-center gap-2"}
      action={async (formData) => {
        setPending(true);
        setError(null);
        try {
          await action(formData);
          router.refresh();
          setPending(false);
        } catch (err) {
          if (isNextControlFlow(err)) throw err;
          setError(err instanceof Error && err.message ? err.message : "Could not save.");
          setPending(false);
        }
      }}
    >
      {children}
      {pending ? <span className="self-center text-xs text-zinc-500">Saving…</span> : null}
      {error ? <span className="basis-full text-xs text-red-700">{error}</span> : null}
    </form>
  );
}
