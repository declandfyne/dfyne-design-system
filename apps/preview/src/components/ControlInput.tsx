"use client";

import type { PropControl } from "../data/componentControls";

const inputStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #d0d0d0",
  color: "#111",
  borderRadius: 4,
  padding: "4px 8px",
  fontSize: 11,
  fontFamily: "'SF Mono', 'Cascadia Code', 'Fira Code', ui-monospace, monospace",
  outline: "none",
  WebkitAppearance: "none" as const,
};

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
  switch (control.type) {
    case "enum":
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0" }}>
          <span style={{ fontSize: 12, color: "#555" }}>{name}</span>
          <select
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            {control.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );

    case "boolean":
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0" }}>
          <span style={{ fontSize: 12, color: "#555" }}>{name}</span>
          <button
            type="button"
            onClick={() => onChange(!(value as boolean))}
            style={{
              position: "relative",
              width: 32,
              height: 18,
              borderRadius: 9999,
              border: "none",
              cursor: "pointer",
              background: value ? "#111" : "#d0d0d0",
              transition: "background 0.2s",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 2,
                left: value ? 16 : 2,
                width: 14,
                height: 14,
                borderRadius: 9999,
                background: value ? "#fff" : "#888",
                transition: "left 0.2s",
              }}
            />
          </button>
        </div>
      );

    case "string":
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0" }}>
          <span style={{ fontSize: 12, color: "#555" }}>{name}</span>
          <input
            type="text"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            style={{ ...inputStyle, width: 140 }}
          />
        </div>
      );

    case "number":
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0" }}>
          <span style={{ fontSize: 12, color: "#555" }}>{name}</span>
          <input
            type="number"
            value={value as number}
            onChange={(e) => onChange(Number(e.target.value))}
            style={{ ...inputStyle, width: 100 }}
          />
        </div>
      );
  }
}
