export function Badge({
  text,
  variant = "dark",
  position = "top-right",
  className = "",
}: {
  text: string;
  variant?: "dark" | "light";
  position?: "top-right" | "inline";
  className?: string;
}) {
  const variantClasses =
    variant === "dark"
      ? "bg-[#111111] text-white"
      : "bg-white text-[#0a0a0a]";

  const positionClasses =
    position === "top-right"
      ? "absolute top-0 right-0"
      : "";

  return (
    <span
      className={`inline-flex items-center px-[7px] py-[7px] pl-[9px] text-[11.05px] font-semibold leading-none ${variantClasses} ${positionClasses} ${className}`.trim()}
      style={{ borderRadius: "0px 4px" }}
    >
      {text}
    </span>
  );
}
