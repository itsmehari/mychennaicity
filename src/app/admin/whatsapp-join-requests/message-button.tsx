"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { recordWhatsappJoinNudge } from "./actions";

export function WhatsappJoinMessageButton({
  id,
  className = "text-sm font-semibold underline disabled:opacity-60",
}: {
  id: string;
  className?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <span className="inline-flex flex-col">
      <button
        type="button"
        disabled={pending}
        className={className}
        onClick={async () => {
          setPending(true);
          setError(null);
          const result = await recordWhatsappJoinNudge(id);
          setPending(false);
          if (!result.ok) {
            setError(result.message);
            return;
          }
          window.open(result.url, "_blank", "noopener,noreferrer");
          router.refresh();
        }}
      >
        {pending ? "Opening…" : "Message"}
      </button>
      {error ? <span className="text-xs text-red-700">{error}</span> : null}
    </span>
  );
}
