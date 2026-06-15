"use client";

import { CopyButton } from "./CopyButton";
type Mode = "developer" | "designer";

export type SpecEntry = {
  group: string;
  property: string;
  value: string;
  cssVar?: string;
  figmaToken?: string;
};

export function SpecPanel({
  specs,
  mode,
  compact = false,
}: {
  specs: SpecEntry[];
  mode: Mode;
  compact?: boolean;
}) {
  const groups = specs.reduce<Record<string, SpecEntry[]>>((acc, s) => {
    (acc[s.group] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div className={`space-y-4 ${compact ? "text-[11px]" : "text-[12px]"}`}>
      {Object.entries(groups).map(([group, entries]) => (
        <div key={group}>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[1.2px] text-[#666]">
            {group}
          </p>
          <div className="space-y-0.5">
            {entries.map((e) => (
              <div
                key={e.property}
                className="flex items-center justify-between gap-2 rounded px-2 py-1 hover:bg-[#f5f5f5]"
              >
                <span className="shrink-0 text-[#6f6f6f]">{e.property}</span>
                <div className="flex items-center gap-1">
                  {mode === "designer" && e.figmaToken && (
                    <span className="text-[10px] text-[#b0b0b0]">{e.figmaToken}</span>
                  )}
                  <CopyButton value={e.value} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
