import { CaretLeft } from "@phosphor-icons/react";

export interface BackLinkProps {
  label: string;
  href: string;
  className?: string;
}

/**
 * BackLink — "← SHOP IMPACT" style back navigation link from PDP top-left.
 *
 * 10px Raleway SemiBold, uppercase, tracking 1.2px, #111.
 * Hover: underline.
 */
export function BackLink({ label, href, className = "" }: BackLinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-[6px] no-underline hover:underline ${className}`.trim()}
      style={{
        fontFamily: "Raleway, sans-serif",
        fontSize: "10px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "1.2px",
        color: "#111111",
        textDecoration: "none",
      }}
    >
      <CaretLeft size={14} weight="bold" />
      {label}
    </a>
  );
}
