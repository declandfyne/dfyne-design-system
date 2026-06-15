"use client";

import { useState } from "react";
import { ControlInput } from "./ControlInput";
import type { ComponentControlDef } from "../data/componentControls";
import type { SpecEntry } from "./SpecPanel";

function CopyableValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        fontFamily: "'SF Mono', 'Cascadia Code', 'Fira Code', ui-monospace, monospace",
        fontSize: 11,
        color: copied ? "#1a7a4a" : "#555",
        transition: "color 0.2s ease",
      }}
      title="Click to copy"
    >
      {value.startsWith("#") && (
        <span style={{
          display: "inline-block",
          width: 12,
          height: 12,
          borderRadius: 2,
          background: value,
          border: "1px solid rgba(0,0,0,0.12)",
          flexShrink: 0,
        }} />
      )}
      {copied ? "Copied!" : value}
    </button>
  );
}

type PropApiEntry = {
  name: string;
  type: string;
  typeColor: string;
  typeBg: string;
  defaultVal: string;
};

function getApiEntries(controls: ComponentControlDef): PropApiEntry[] {
  const colorMap: Record<string, { color: string; bg: string }> = {
    enum: { color: "#1a7a3a", bg: "rgba(26,122,58,0.1)" },
    boolean: { color: "#c0392b", bg: "rgba(192,57,43,0.1)" },
    string: { color: "#1a5fa8", bg: "rgba(26,95,168,0.1)" },
    number: { color: "#7d5a00", bg: "rgba(125,90,0,0.1)" },
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
      style={{ background: "#f8f8f8", borderColor: "#e0e0e0" }}
    >
      {/* Header */}
      <div
        className="shrink-0 px-4"
        style={{
          borderBottom: "1px solid #e0e0e0",
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
              color: "#111",
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
              color: "#666",
            }}
          >
            Controls
          </span>
        )}
      </div>

      {/* Props Controls */}
      {controls && Object.keys(controls.props).length > 0 && (
        <div className="px-4" style={{ borderBottom: "1px solid #ebebeb", paddingTop: 14, paddingBottom: 14 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#666",
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
        <div className="px-4" style={{ borderBottom: "1px solid #ebebeb", paddingTop: 14, paddingBottom: 14 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#666",
              marginBottom: 12,
            }}
          >
            API
          </div>
          {/* Header row */}
          <div
            className="grid grid-cols-[1fr_56px_1fr] gap-x-3"
            style={{
              borderBottom: "1px solid #e0e0e0",
              paddingBottom: 8,
              marginBottom: 4,
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "#666" }}>Prop</span>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "#666" }}>Type</span>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "#666" }}>Default</span>
          </div>
          {getApiEntries(controls).map((entry) => (
            <div
              key={entry.name}
              className="grid grid-cols-[1fr_56px_1fr] items-center gap-x-3"
              style={{
                borderBottom: "1px solid #ebebeb",
                paddingTop: 6,
                paddingBottom: 6,
              }}
            >
              <CopyableValue value={entry.name} />
              <CopyableValue value={entry.type} />
              <CopyableValue value={entry.defaultVal} />
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
              color: "#666",
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
                  borderBottom: "1px solid #ebebeb",
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                <span style={{ fontSize: 11, color: "#666" }}>
                  {spec.property}
                </span>
                <CopyableValue value={spec.value} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
