"use client";

import { useState, useEffect } from "react";

export type Mode = "dev" | "designer";

export function ModeToggle({ mode, onModeChange }: { mode: Mode; onModeChange: (m: Mode) => void }) {
  return (
    <div className="inline-flex rounded-full border border-[#e0e0e0] p-[2px]">
      {(["dev", "designer"] as const).map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => onModeChange(m)}
          className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
            mode === m
              ? "bg-[#111111] text-white"
              : "text-[#6f6f6f] hover:text-[#1a1a1a]"
          }`}
        >
          {m === "dev" ? "Dev" : "Designer"}
        </button>
      ))}
    </div>
  );
}

export function useMode(): [Mode, (m: Mode) => void] {
  const [mode, setMode] = useState<Mode>("dev");

  useEffect(() => {
    const saved = localStorage.getItem("dfyne-preview-mode") as Mode | null;
    if (saved === "dev" || saved === "designer") setMode(saved);
  }, []);

  const updateMode = (m: Mode) => {
    setMode(m);
    localStorage.setItem("dfyne-preview-mode", m);
  };

  return [mode, updateMode];
}
