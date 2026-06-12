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
        className="inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[10px] text-[#a0a0a0] transition-colors hover:bg-[#f0f0f0] active:bg-[#e0e0e0]"
        title="Copy as…"
      >
        ⎘
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1 min-w-[180px] rounded border border-[#e8e8e8] bg-white shadow-sm"
          style={{ fontFamily: "inherit" }}
        >
          {formats.map((fmt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleCopy(fmt.value, i)}
              className="flex w-full items-center justify-between gap-4 px-3 py-1.5 text-left transition-colors hover:bg-[#f5f5f5]"
            >
              <span className="text-[11px] font-medium text-[#111]">{fmt.label}</span>
              {copiedIndex === i ? (
                <span className="text-[11px] text-[#4caf50]">✓ Copied</span>
              ) : (
                <span className="max-w-[90px] truncate text-[11px] text-[#6f6f6f]">
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
