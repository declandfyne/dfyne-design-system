export function SizeButton({
  label,
  selected,
  soldOut,
  onClick,
  className = "",
}: {
  label: string;
  selected: boolean;
  soldOut: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={soldOut}
      aria-pressed={selected}
      className={`inline-flex h-[35px] items-center justify-center rounded-[65px] border px-4 text-[10px] tracking-[0.3px] transition-colors duration-200 ${
        soldOut
          ? "cursor-not-allowed border-transparent bg-[#f6f6f6] text-[#bbbbbb]"
          : selected
            ? "border-black bg-white text-black"
            : "border-[#cccccc] bg-white text-black hover:border-black"
      } ${className}`.trim()}
    >
      {label}
    </button>
  );
}
