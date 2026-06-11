const variantClasses = {
  primary:
    "bg-[#111111] text-white border-transparent hover:opacity-90",
  secondary:
    "bg-white text-black border-black hover:bg-[#111111] hover:text-white",
  outline:
    "bg-transparent text-black border-[#e8e8e1] hover:border-black",
  ghost:
    "bg-transparent text-white border-white hover:bg-white hover:text-black",
} as const;

const sizeClasses = {
  xs: "h-[34px] px-4 text-[9px] tracking-[2.4px]",
  sm: "h-[39px] px-5 text-[10px] tracking-[1.5px]",
  md: "h-[41px] px-5 text-[9px] tracking-[2.7px]",
  lg: "h-[48px] px-5 text-[11px] tracking-[1.5px]",
} as const;

const radiusClasses = {
  default: "rounded-[50px]",
  pill: "rounded-[140px]",
  full: "rounded-[999px]",
} as const;

export function Button({
  children,
  variant = "primary",
  size = "md",
  radius = "default",
  disabled = false,
  onClick,
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  radius?: keyof typeof radiusClasses;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center border font-semibold uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${radiusClasses[radius]} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
