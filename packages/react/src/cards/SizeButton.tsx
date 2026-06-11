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
      className={`inline-flex h-[24px] w-[40px] items-center justify-center rounded-[25px] border text-[10px] font-normal tracking-[0.325px] transition-colors duration-200 ${
        soldOut
          ? "cursor-not-allowed border-[#e0e0e0] bg-white text-[#bbbbbb] line-through"
          : selected
            ? "border-[#292929] bg-black text-white"
            : "border-black bg-white text-black hover:bg-black hover:text-white"
      } ${className}`.trim()}
    >
      {label}
    </button>
  );
}
