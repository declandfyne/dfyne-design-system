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
    enum: { color: "#7ee787", bg: "rgba(126,231,135,0.15)" },
    boolean: { color: "#ff7b72", bg: "rgba(255,123,114,0.15)" },
    string: { color: "#79c0ff", bg: "rgba(121,192,255,0.15)" },
    number: { color: "#e3b341", bg: "rgba(227,179,65,0.15)" },
  };

  return Object.entries(controls.props).map(([name, ctrl]) => ({
    name,
    type: ctrl.type,
    typeColor: colorMap[ctrl.type]?.color ?? "#888",
    typeBg: colorMap[ctrl.type]?.bg ?? "rgba(136,136,136,0.1)",
    defaultVal: JSON.stringify(ctrl.default),
  }));
}

export function PropsPanel({
  controls,
  propValues,
  onPropChange,
  specs,
  componentName,
}: {
  controls: ComponentControlDef | undefined;
  propValues: Record<string, unknown>;
  onPropChange: (name: string, value: unknown) => void;
  specs: SpecEntry[];
  componentName?: string;
}) {
  return (
    <div
      className="flex h-full flex-col overflow-y-auto border-l"
      style={{ background: "var(--panel-bg)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div
        className="shrink-0 px-4"
        style={{
          borderBottom: "1px solid var(--border)",
          paddingTop: 14,
          paddingBottom: 14,
        }}
      >
        {componentName ? (
          <span
            style={{
              fontSize: 14,
              fontFamily: "Raleway, sans-serif",
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "0.3px",
            }}
          >
            {componentName}
          </span>
        ) : (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--text-muted)",
            }}
          >
            Controls
          </span>
        )}
      </div>

      {/* Props Controls */}
      {controls && Object.keys(controls.props).length > 0 && (
        <div className="px-4" style={{ borderBottom: "1px solid var(--border-subtle)", paddingTop: 14, paddingBottom: 14 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--text-muted)",
              marginBottom: 12,
            }}
          >
            Props
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
        </div>
      )}

      {/* API Table */}
      {controls && Object.keys(controls.props).length > 0 && (
        <div className="px-4" style={{ borderBottom: "1px solid var(--border-subtle)", paddingTop: 14, paddingBottom: 14 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--text-muted)",
              marginBottom: 12,
            }}
          >
            API
          </div>
          {/* Header row */}
          <div
            className="grid grid-cols-[1fr_56px_1fr] gap-x-3"
            style={{
              borderBottom: "1px solid var(--border)",
              paddingBottom: 8,
              marginBottom: 4,
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-muted)" }}>Prop</span>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-muted)" }}>Type</span>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-muted)" }}>Default</span>
          </div>
          {getApiEntries(controls).map((entry) => (
            <div
              key={entry.name}
              className="grid grid-cols-[1fr_56px_1fr] items-center gap-x-3"
              style={{
                borderBottom: "1px solid var(--border-subtle)",
                paddingTop: 6,
                paddingBottom: 6,
              }}
            >
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#ccc" }}>{entry.name}</span>
              <span
                style={{
                  display: "inline-block",
                  background: entry.typeBg,
                  color: entry.typeColor,
                  fontSize: 10,
                  fontFamily: "monospace",
                  fontWeight: 500,
                  padding: "2px 6px",
                  borderRadius: 4,
                  lineHeight: "16px",
                }}
              >
                {entry.type}
              </span>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "var(--text-muted)" }}>
                {entry.defaultVal}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Specs */}
      {specs.length > 0 && (
        <div className="px-4" style={{ paddingTop: 14, paddingBottom: 14 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--text-muted)",
              marginBottom: 12,
            }}
          >
            Specs
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {specs.map((spec) => (
              <div
                key={`${spec.group}-${spec.property}`}
                className="flex items-center justify-between"
                style={{
                  borderBottom: "1px solid var(--border-subtle)",
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  {spec.property}
                </span>
                <span className="flex items-center gap-1.5" style={{ fontFamily: "monospace", fontSize: 11, color: "#aaa" }}>
                  {spec.group === "Colors" && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 12,
                        height: 12,
                        borderRadius: 2,
                        background: spec.value,
                        border: "1px solid #333",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
