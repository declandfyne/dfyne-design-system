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
      : "bg-white text-[#0a0a0a]";

  return (
    <span
      className={`inline-flex h-[18px] items-center justify-center rounded-[2px] px-[6px] text-[10px] font-semibold leading-none tracking-[0px] ${variantClasses} ${className}`.trim()}
    >
      {text}
    </span>
  );
}
