"use client";

import { useState } from "react";

export function CopyButton({ value, className = "" }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] transition-colors hover:bg-[#f0f0f0] active:bg-[#e0e0e0] ${className}`}
      title={`Copy: ${value}`}
    >
      <span className="text-[#6f6f6f]">{value}</span>
      <span className="text-[10px] text-[#a0a0a0]">{copied ? "✓" : "⎘"}</span>
    </button>
  );
}

export function CopyBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between border-b border-[#e8e8e8] bg-[#fafafa] px-4 py-2">
        <span className="text-[11px] font-medium text-[#8f8f8f]">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded px-2 py-1 text-[10px] text-[#8f8f8f] transition-colors hover:bg-[#e8e8e8]"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[12px] leading-[1.6] text-[#4a4a4a]" style={{ fontFamily: "ui-monospace, 'Cascadia Code', Menlo, monospace" }}>
        {code}
      </pre>
    </div>
  );
}
