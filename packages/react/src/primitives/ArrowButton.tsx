export function ArrowButton({
  direction,
  disabled = false,
  onClick,
  variant = "default",
  className = "",
}: {
  direction: "left" | "right";
  disabled?: boolean;
  onClick?: () => void;
  variant?: "default" | "edge";
  className?: string;
}) {
  const isEdge = variant === "edge";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-full border transition-[color,background-color,border-color,box-shadow,transform] duration-200 ${
        isEdge
          ? "pointer-events-auto h-9 w-9 shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
          : "h-[30px] w-[30px]"
      } ${
        disabled
          ? isEdge
            ? "cursor-not-allowed border-black/8 bg-white/82 text-black/25 shadow-none"
            : "cursor-not-allowed border-[#d9d9d9] text-black/30"
          : isEdge
            ? "border-black/10 bg-white text-black shadow-[0_10px_24px_rgba(0,0,0,0.14)] backdrop-blur-sm hover:-translate-y-0.5 hover:border-black/14 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/12"
            : "border-black bg-white text-black hover:bg-black hover:text-white"
      } ${className}`.trim()}
      aria-label={`Scroll ${direction}`}
    >
      <svg aria-hidden="true" viewBox="0 0 18 18" className="h-[14px] w-[14px]">
        {direction === "left" ? (
          <path d="M11 4.5 6.3 8.7a.4.4 0 0 0 0 .6L11 13.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        ) : (
          <path d="M7 4.5l4.7 4.2a.4.4 0 0 1 0 .6L7 13.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        )}
      </svg>
    </button>
  );
}
