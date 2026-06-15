"use client";

import { useState, useRef, useCallback } from "react";
import { highlightCode } from "../utils/highlightCode";

const LANG_LABELS: Record<string, string> = {
  react: "TSX",
  liquid: "Liquid",
  tokens: "CSS",
};

export function CodePanel({
  reactCode,
  liquidCode,
  cssTokens,
}: {
  reactCode: string;
  liquidCode: string;
  cssTokens?: string;
}) {
  const [tab, setTab] = useState<"react" | "liquid" | "tokens">("liquid");
  const [copied, setCopied] = useState(false);
  const [height, setHeight] = useState(160);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const code =
    tab === "react"
      ? reactCode
      : tab === "liquid"
        ? liquidCode
        : (cssTokens ?? "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const onDragStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragging.current = true;
      startY.current = e.clientY;
      startHeight.current = height;

      const onMove = (ev: MouseEvent) => {
        if (!dragging.current) return;
        const delta = startY.current - ev.clientY;
        setHeight(Math.max(60, Math.min(500, startHeight.current + delta)));
      };

      const onUp = () => {
        dragging.current = false;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [height],
  );

  const tabs = [
    { id: "liquid" as const, label: "Liquid" },
    { id: "react" as const, label: "React" },
    { id: "tokens" as const, label: "Tokens" },
  ];

  return (
    <div
      className="shrink-0 border-t"
      style={{ borderColor: "var(--border)", background: "var(--panel-bg)" }}
    >
      {/* Drag handle */}
      <div
        onMouseDown={onDragStart}
        className="flex cursor-row-resize items-center justify-center"
        style={{ height: 12 }}
      >
        <div
          style={{
            width: 40,
            height: 2,
            borderRadius: 1,
            background: "#2a2a2a",
          }}
        />
      </div>

      {/* Tab bar */}
      <div
        className="flex items-center justify-between border-b px-4"
        style={{ height: 36, borderColor: "var(--border-subtle)" }}
      >
        <div className="flex items-center gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className="relative flex items-center px-3"
              style={{
                height: 36,
                fontSize: 11,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color:
                  tab === t.id ? "#ffffff" : "var(--text-muted)",
                fontWeight: tab === t.id ? 500 : 400,
              }}
            >
              {t.label}
              {tab === t.id && (
                <span
                  className="absolute bottom-0 left-3 right-3"
                  style={{
                    height: 1.5,
                    borderRadius: 1,
                    background: "#ffffff",
                  }}
                />
              )}
            </button>
          ))}

          {/* Language pill */}
          <span
            className="ml-2 rounded-full px-2 py-[1px]"
            style={{
              fontSize: 9,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            {LANG_LABELS[tab]}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="rounded px-2 py-[2px] transition-colors"
          style={{
            fontSize: 10,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: copied ? "#6ee7b7" : "var(--text-muted)",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Code body */}
      <pre
        className="font-mono overflow-auto"
        style={{
          color: "#8b949e",
          height,
          background: "#0a0a0a",
          padding: 16,
          fontSize: 12,
          lineHeight: 1.8,
        }}
      >
        {highlightCode(code, tab)}
      </pre>
    </div>
  );
}
