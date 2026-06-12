"use client";

import type { PropControl } from "../data/componentControls";

export function ControlInput({
  name,
  control,
  value,
  onChange,
}: {
  name: string;
  control: PropControl;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const inputStyle = {
    background: "var(--input-bg)",
    borderColor: "var(--input-border)",
    color: "#ccc",
  };

  switch (control.type) {
    case "enum":
      return (
        <div className="flex items-center justify-between py-[5px]">
          <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{name}</span>
          <select
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="font-mono rounded border px-2 py-1 text-[11px]"
            style={inputStyle}
          >
            {control.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );

    case "boolean":
      return (
        <div className="flex items-center justify-between py-[5px]">
          <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{name}</span>
          <button
            type="button"
            onClick={() => onChange(!(value as boolean))}
            className="relative h-[18px] w-[32px] rounded-full transition-colors"
            style={{ background: value ? "#fff" : "#2a2a2a" }}
          >
            <span
              className="absolute top-[2px] h-[14px] w-[14px] rounded-full transition-all"
              style={{
                left: value ? 16 : 2,
                background: value ? "#111" : "#666",
              }}
            />
          </button>
        </div>
      );

    case "string":
      return (
        <div className="flex items-center justify-between py-[5px]">
          <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{name}</span>
          <input
            type="text"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="font-mono w-[140px] rounded border px-2 py-1 text-[11px]"
            style={inputStyle}
          />
        </div>
      );

    case "number":
      return (
        <div className="flex items-center justify-between py-[5px]">
          <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{name}</span>
          <input
            type="number"
            value={value as number}
            onChange={(e) => onChange(Number(e.target.value))}
            className="font-mono w-[100px] rounded border px-2 py-1 text-[11px]"
            style={inputStyle}
          />
        </div>
      );
  }
}
