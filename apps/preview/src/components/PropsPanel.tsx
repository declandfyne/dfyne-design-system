"use client";

import { ControlInput } from "./ControlInput";
import type { ComponentControlDef } from "../data/componentControls";
import type { SpecEntry } from "./SpecPanel";

type PropApiEntry = {
  name: string;
  type: string;
  typeColor: string;
  typeBg: string;
  defaultVal: string;
};

function getApiEntries(controls: ComponentControlDef): PropApiEntry[] {
  const colorMap: Record<string, { color: string; bg: string }> = {
    enum: { color: "#7ee787", bg: "#1a2a1a" },
    boolean: { color: "#ff7b72", bg: "#2a1a1a" },
    string: { color: "#79c0ff", bg: "#1a2332" },
    number: { color: "#e3b341", bg: "#2a2a1a" },
  };

  return Object.entries(controls.props).map(([name, ctrl]) => ({
    name,
    type: ctrl.type,
    typeColor: colorMap[ctrl.type]?.color ?? "#888",
    typeBg: colorMap[ctrl.type]?.bg ?? "#1a1a1a",
    defaultVal: JSON.stringify(ctrl.default),
  }));
}

export function PropsPanel({
  controls,
  propValues,
  onPropChange,
  specs,
}: {
  controls: ComponentControlDef | undefined;
  propValues: Record<string, unknown>;
  onPropChange: (name: string, value: unknown) => void;
  specs: SpecEntry[];
}) {
  const sectionTitle = "text-[10px] font-semibold uppercase tracking-[1px] mb-2.5";

  return (
    <div
      className="flex h-full flex-col overflow-y-auto border-l"
      style={{ background: "var(--panel-bg)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div
        className="shrink-0 border-b px-4 py-3 text-[11px] font-semibold uppercase tracking-[1px]"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        Controls
      </div>

      {/* Props Controls */}
      {controls && Object.keys(controls.props).length > 0 && (
        <div className="border-b px-4 py-3" style={{ borderColor: "var(--border-subtle)" }}>
          <div className={sectionTitle} style={{ color: "var(--text-muted)" }}>Props</div>
          {Object.entries(controls.props).map(([name, ctrl]) => (
            <ControlInput
              key={name}
              name={name}
              control={ctrl}
              value={propValues[name] ?? ctrl.default}
              onChange={(val) => onPropChange(name, val)}
            />
          ))}
        </div>
      )}

      {/* API Table */}
      {controls && Object.keys(controls.props).length > 0 && (
        <div className="border-b px-4 py-3" style={{ borderColor: "var(--border-subtle)" }}>
          <div className={sectionTitle} style={{ color: "var(--text-muted)" }}>API</div>
          {/* Header row */}
          <div className="mb-1 grid grid-cols-[1fr_60px_1fr] gap-2 border-b pb-1.5" style={{ borderColor: "var(--border)" }}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--text-muted)" }}>Prop</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--text-muted)" }}>Type</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--text-muted)" }}>Default</span>
          </div>
          {getApiEntries(controls).map((entry) => (
            <div
              key={entry.name}
              className="grid grid-cols-[1fr_60px_1fr] items-center gap-2 border-b py-[7px]"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <span className="font-mono text-[12px] text-[#ccc]">{entry.name}</span>
              <span
                className="inline-block rounded px-1.5 py-[2px] text-[10px]"
                style={{ background: entry.typeBg, color: entry.typeColor, fontFamily: "inherit" }}
              >
                {entry.type}
              </span>
              <span className="font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>
                {entry.defaultVal}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Specs */}
      {specs.length > 0 && (
        <div className="px-4 py-3">
          <div className={sectionTitle} style={{ color: "var(--text-muted)" }}>Specs</div>
          {specs.map((spec) => (
            <div
              key={`${spec.group}-${spec.property}`}
              className="flex items-center justify-between border-b py-1"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                {spec.property}
              </span>
              <span className="font-mono flex items-center gap-1.5 text-[11px]" style={{ color: "#aaa" }}>
                {spec.group === "Colors" && (
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-sm border"
                    style={{ background: spec.value, borderColor: "#333" }}
                  />
                )}
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
