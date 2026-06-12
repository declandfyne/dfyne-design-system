"use client";

import { useState, useRef, useCallback } from "react";

export function CodePanel({
  reactCode,
  liquidCode,
  cssTokens,
}: {
  reactCode: string;
  liquidCode: string;
  cssTokens?: string;
}) {
  const [tab, setTab] = useState<"react" | "liquid" | "tokens">("react");
  const [copied, setCopied] = useState(false);
  const [height, setHeight] = useState(160);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const code = tab === "react" ? reactCode : tab === "liquid" ? liquidCode : (cssTokens ?? "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const onDragStart = useCallback((e: React.MouseEvent) => {
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
  }, [height]);

  const tabs = [
    { id: "react" as const, label: "React" },
    { id: "liquid" as const, label: "Liquid" },
    { id: "tokens" as const, label: "CSS Tokens" },
  ];

  return (
    <div className="shrink-0 border-t" style={{ borderColor: "var(--border)", background: "var(--panel-bg)" }}>
      {/* Drag handle */}
      <div
        onMouseDown={onDragStart}
        className="flex cursor-row-resize items-center justify-center"
        style={{ height: 6, background: "var(--panel-bg)" }}
      >
        <div style={{ width: 36, height: 2, borderRadius: 1, background: "#333" }} />
      </div>

      {/* Header */}
      <div
        className="flex items-center justify-between border-b px-4"
        style={{ height: 36, borderColor: "var(--border-subtle)" }}
      >
        <div className="flex">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className="flex items-center px-3 text-[11px]"
              style={{
                height: 36,
                color: tab === t.id ? "var(--text-secondary)" : "var(--text-muted)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded border px-2 py-[3px] text-[10px] transition-colors hover:border-[#444] hover:text-[#aaa]"
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text-muted)",
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Code body */}
      <pre
        className="font-mono overflow-auto px-4 py-3 text-[12px] leading-[1.7]"
        style={{ color: "#8b949e", height }}
      >
        {code}
      </pre>
    </div>
  );
}
