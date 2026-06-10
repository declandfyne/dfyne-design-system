export function Badge({
  text,
  variant = "dark",
  className = "",
}: {
  text: string;
  variant?: "dark" | "light";
  className?: string;
}) {
  const variantClasses =
    variant === "dark"
      ? "bg-black text-white"
      : "bg-white text-black";

  return (
    <span
      className={`inline-flex h-[29px] items-center rounded-bl-[4px] px-[7px] text-[8.5px] font-semibold leading-none lg:px-[9px] lg:text-[11px] ${variantClasses} ${className}`.trim()}
    >
      {text}
    </span>
  );
}
