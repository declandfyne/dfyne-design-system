"use client";

export function SearchFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Filter components..."
      className="h-[34px] w-[200px] rounded-full border border-[#e0e0e0] bg-white px-3 text-[12px] outline-none placeholder:text-[#a0a0a0] focus:border-[#111111]"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" }}
    />
  );
}
