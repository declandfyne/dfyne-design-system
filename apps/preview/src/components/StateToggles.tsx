"use client";

export function StateToggles({
  options,
  active,
  onChange,
}: {
  options: string[];
  active: string;
  onChange: (name: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-full px-3 py-1 text-[10px] font-medium transition-colors ${
            active === opt
              ? "bg-[#111111] text-white"
              : "border border-[#e0e0e0] text-[#6f6f6f] hover:border-[#111111] hover:text-[#111111]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
