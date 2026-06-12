"use client";

import { useState, useRef, useCallback } from "react";

/** Simple syntax highlighter for JSX/Liquid/CSS code */
function highlightCode(code: string, lang: "react" | "liquid" | "tokens"): React.ReactNode[] {
  if (lang === "tokens") {
    // CSS: highlight property names and values
    return code.split("\n").map((line, i) => {
      const highlighted = line
        .replace(/(--[\w-]+)/g, '<span style="color:#79c0ff">$1</span>')
        .replace(/(:)(\s*)([^;]+)(;)/g, '$1$2<span style="color:#a5d6ff">$3</span>$4');
      return <span key={i} dangerouslySetInnerHTML={{ __html: highlighted + "\n" }} />;
    });
  }

  if (lang === "liquid") {
    return code.split("\n").map((line, i) => {
      const highlighted = line
        .replace(/(&lt;!--|<!--)(.*?)(--&gt;|-->)/g, '<span style="color:#6a737d">$1$2$3</span>')
        .replace(/(class)="([^"]*)"/g, '<span style="color:#79c0ff">$1</span>="<span style="color:#a5d6ff">$2</span>"')
        .replace(/(&lt;|<)(\/?)([\w-]+)/g, '$1$2<span style="color:#7ee787">$3</span>')
        .replace(/({{-?\s*)([\w.| ]+)(\s*-?}})/g, '<span style="color:#d2a8ff">$1$2$3</span>');
      return <span key={i} dangerouslySetInnerHTML={{ __html: highlighted + "\n" }} />;
    });
  }

  // React/JSX
  return code.split("\n").map((line, i) => {
    let highlighted = line
      // strings (double quotes)
      .replace(/"([^"]*)"/g, '"<span style="color:#a5d6ff">$1</span>"')
      // keywords
      .replace(/\b(import|from|export|const|let|function|return|type)\b/g, '<span style="color:#ff7b72">$1</span>')
      // JSX component tags
      .replace(/(<\/?)((?:A-Z)[A-Za-z]*)/g, '$1<span style="color:#d2a8ff">$2</span>')
      // JSX prop names (word followed by =)
      .replace(/\b(\w+)(=)/g, '<span style="color:#79c0ff">$1</span>$2')
      // braces with numbers
      .replace(/\{(\d+\.?\d*)\}/g, '{<span style="color:#e3b341">$1</span>}')
      // boolean/special values
      .replace(/\{(true|false)\}/g, '{<span style="color:#ff7b72">$1</span>}');

    // Highlight component names after < (uppercase start)
    highlighted = highlighted.replace(
      /(&lt;|<)(\/?)\b([A-Z]\w*)/g,
      '$1$2<span style="color:#d2a8ff">$3</span>'
    );

    return <span key={i} dangerouslySetInnerHTML={{ __html: highlighted + "\n" }} />;
  });
}

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
        {highlightCode(code, tab)}
      </pre>
    </div>
  );
}
