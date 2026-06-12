/**
 * Button — matches DFYNE live site (.btn, .btn--secondary, .btn--tertiary)
 *
 * Primary:   bg #111, white text, 50px radius, 13px 20px padding, 9px, 600, 2.7px tracking
 * Secondary: transparent, border #e8e8e1, hover border darkens to body text
 * Tertiary:  transparent, border #e8e8e1, weight 400, normal tracking, 8px 10px padding
 */

const variantClasses = {
  primary:
    "bg-[#111111] text-white border-transparent hover:opacity-90",
  secondary:
    "bg-transparent text-[#000000] border-[#e8e8e1] hover:border-[#000000]",
  tertiary:
    "bg-transparent text-[#000000] border-[#e8e8e1]",
  ghost:
    "bg-transparent text-white border-white hover:bg-white hover:text-black",
} as const;

export function Button({
  children,
  variant = "primary",
  disabled = false,
  onClick,
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  variant?: keyof typeof variantClasses;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}) {
  const isTertiary = variant === "tertiary";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex min-w-[90px] items-center justify-center rounded-[50px] border uppercase transition-[border-color,background-color,opacity] duration-300 ease-[ease] disabled:cursor-default disabled:bg-[#f6f6f6] disabled:text-[#b6b6b6] disabled:border-transparent ${
        isTertiary
          ? "px-[10px] py-[8px] text-[9px] font-normal normal-case tracking-normal whitespace-nowrap"
          : "px-[20px] py-[13px] text-[9px] font-semibold tracking-[2.7px]"
      } ${variantClasses[variant]} ${className}`.trim()}
      style={{ fontFamily: "Raleway, sans-serif" }}
    >
      {children}
    </button>
  );
}
