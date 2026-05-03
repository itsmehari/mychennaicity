import type { AdDesign } from "@/ads/registry";

const stroke = {
  width: 1.75,
  fill: "none" as const,
  stroke: "currentColor" as const,
};

function IconDocument({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill={stroke.fill}
      stroke={stroke.stroke}
      strokeWidth={stroke.width}
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

function IconMapPin({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill={stroke.fill}
      stroke={stroke.stroke}
      strokeWidth={stroke.width}
      aria-hidden
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx={12} cy={10} r={3} />
    </svg>
  );
}

function IconPalette({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill={stroke.fill}
      stroke={stroke.stroke}
      strokeWidth={stroke.width}
      aria-hidden
    >
      <circle cx={13.5} cy={6.5} r={0.5} fill="currentColor" stroke="none" />
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 0-4-4 3 3 0 0 1-3-3 4 4 0 0 0-3-3z" />
    </svg>
  );
}

function IconCertificate({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill={stroke.fill}
      stroke={stroke.stroke}
      strokeWidth={stroke.width}
      aria-hidden
    >
      <circle cx={12} cy={8} r={6} />
      <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
    </svg>
  );
}

function IconMegaphone({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill={stroke.fill}
      stroke={stroke.stroke}
      strokeWidth={stroke.width}
      aria-hidden
    >
      <path d="M3 11v4a1 1 0 0 0 1 1h2l4 3V7L6 10H4a1 1 0 0 0-1 1z" />
      <path d="M16 8.5a5 5 0 0 1 0 7M13 6a8 8 0 0 1 0 12" />
    </svg>
  );
}

export function normalizeDesignForClass(design: AdDesign): string {
  if (design === "resumebuilder") return "resumedoctor";
  return design;
}

export function AdBannerIcon({
  design,
  className,
}: {
  design: AdDesign;
  className?: string;
}) {
  const key = normalizeDesignForClass(design);
  switch (key) {
    case "resumedoctor":
      return <IconDocument className={className} />;
    case "vacancychennai":
      return <IconMapPin className={className} />;
    case "mycovai":
      return <IconMapPin className={className} />;
    case "colourchemist":
      return <IconPalette className={className} />;
    case "bseri":
      return <IconCertificate className={className} />;
    default:
      return <IconMegaphone className={className} />;
  }
}
