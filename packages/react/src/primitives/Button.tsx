const variantClasses = {
  primary:
    "bg-black text-white border-transparent hover:opacity-90",
  secondary:
    "bg-white text-black border-black hover:bg-black hover:text-white",
  outline:
    "bg-transparent text-black border-black/30 hover:border-black",
  ghost:
    "bg-transparent text-black border-transparent hover:bg-black/5",
} as const;

const sizeClasses = {
  sm: "h-[34px] px-4 text-[9px]",
  md: "h-[42px] px-5 text-[9px]",
  lg: "h-[48px] px-6 text-[9px]",
} as const;

export function Button({
  children,
  variant = "primary",
  size = "lg",
  disabled = false,
  onClick,
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
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
      className={`inline-flex items-center justify-center rounded-[89px] border font-bold uppercase tracking-[2.8px] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
