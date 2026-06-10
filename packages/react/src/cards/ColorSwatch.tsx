export function ColorSwatch({
  image,
  label,
  selected,
  isNew,
  onClick,
  className = "",
}: {
  image: string;
  label: string;
  selected: boolean;
  isNew?: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={label}
      className={`group relative flex flex-col items-center gap-1 ${className}`.trim()}
    >
      <div className={`relative overflow-hidden rounded-[2px] ${selected ? "ring-1 ring-black" : ""}`}>
        <img
          src={image}
          alt={label}
          className="h-[99px] w-[66px] object-cover"
        />
        {isNew ? (
          <span className="absolute top-0 right-0 rounded-bl-[2px] bg-black px-1 py-0.5 text-[7px] font-semibold text-white">
            NEW
          </span>
        ) : null}
      </div>
      <span className="text-[10px] text-black/80">{label}</span>
    </button>
  );
}
