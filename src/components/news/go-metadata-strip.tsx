type GoMeta = {
  number: string;
  date: string;
  department: string;
  signatory?: string;
};

export function extractGoMetadata(text: string): GoMeta | null {
  const number = text.match(/G\.O\.\s*\(Rt\.\)\s*No\.\s*(\d+)/i)?.[1];
  const date =
    text.match(/dated\s+(\d{1,2}\s+\w+\s+\d{4})/i)?.[1] ??
    text.match(/(\d{1,2}\s+May\s+\d{4})/i)?.[1] ??
    text.match(/on\s+\*\*(\d{1,2}\s+\w+\s+\d{4})\*\*/i)?.[1];
  if (!number) return null;
  return {
    number,
    date: date ?? "29 May 2026",
    department: "Public (Special-A) Department",
    signatory: text.includes("Sai Kumar") ? "M. Sai Kumar, Chief Secretary" : undefined,
  };
}

export function GoMetadataStrip({ meta }: { meta: GoMeta }) {
  const items = [
    { label: "Order", value: `G.O. (Rt.) No. ${meta.number}` },
    { label: "Date", value: meta.date },
    { label: "Department", value: meta.department },
    ...(meta.signatory ? [{ label: "Signed", value: meta.signatory }] : []),
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 ring-1 ring-[color-mix(in_srgb,var(--foreground)_4%,transparent)]"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            {item.label}
          </p>
          <p className="mt-1 text-sm font-semibold leading-snug text-[var(--foreground)]">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
