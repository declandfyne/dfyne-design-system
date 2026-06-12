"use client";

import { useState } from "react";

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
  const [collapsed, setCollapsed] = useState(false);

  const code = tab === "react" ? reactCode : tab === "liquid" ? liquidCode : (cssTokens ?? "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const tabs = [
    { id: "react" as const, label: "React" },
    { id: "liquid" as const, label: "Liquid" },
    { id: "tokens" as const, label: "CSS Tokens" },
  ];

  return (
    <div className="shrink-0 border-t" style={{ borderColor: "var(--border)", background: "var(--panel-bg)" }}>
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
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="px-1 text-[12px]"
            style={{ color: "var(--text-muted)" }}
          >
            {collapsed ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {/* Code body */}
      {!collapsed && (
        <pre
          className="font-mono overflow-x-auto px-4 py-3 text-[12px] leading-[1.7]"
          style={{ color: "#8b949e", maxHeight: 140 }}
        >
          {code}
        </pre>
      )}
    </div>
  );
}
