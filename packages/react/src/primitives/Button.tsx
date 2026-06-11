const variantClasses = {
  primary:
    "bg-black text-white border-transparent hover:opacity-90",
  secondary:
    "bg-white text-black border-[#0a0a0a] hover:bg-black hover:text-white",
  outline:
    "bg-transparent text-[#0a0a0a] border-[#0a0a0a] hover:bg-black hover:text-white",
  ghost:
    "bg-transparent text-black border-transparent hover:bg-black/5",
} as const;

const sizeClasses = {
  sm: "h-[34px] px-4 text-[9px]",
  md: "h-[42px] px-5 text-[9px]",
  lg: "h-[48px] px-6 text-[9px]",
} as const;

const radiusClasses = {
  default: "rounded-[89px]",
  full: "rounded-[999px]",
} as const;

export function Button({
  children,
  variant = "primary",
  size = "lg",
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
      className={`inline-flex items-center justify-center border font-bold uppercase tracking-[2.8px] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${radiusClasses[radius]} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
