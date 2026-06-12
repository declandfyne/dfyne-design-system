"use client";

import { useState, useRef, useEffect } from "react";

type CopyFormat = { label: string; value: string };

export function CopyAsDropdown({ formats }: { formats: CopyFormat[] }) {
  const [open, setOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  async function handleCopy(value: string, index: number) {
    await navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
      setOpen(false);
    }, 1000);
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[10px] transition-colors"
        style={{ color: "var(--text-muted)" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--hover-bg)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "")}
        title="Copy as…"
      >
        ⎘
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1 min-w-[180px] rounded shadow-sm"
          style={{
            fontFamily: "inherit",
            border: "1px solid var(--border)",
            background: "var(--panel-bg)",
          }}
        >
          {formats.map((fmt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleCopy(fmt.value, i)}
              className="flex w-full items-center justify-between gap-4 px-3 py-1.5 text-left transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--hover-bg)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
            >
              <span className="text-[11px] font-medium" style={{ color: "var(--text-secondary)" }}>{fmt.label}</span>
              {copiedIndex === i ? (
                <span className="text-[11px] text-[#4caf50]">✓ Copied</span>
              ) : (
                <span className="max-w-[90px] truncate text-[11px]" style={{ color: "var(--text-muted)" }}>
                  {fmt.value}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
