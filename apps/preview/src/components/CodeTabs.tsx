"use client";

import { useState } from "react";
import { CopyBlock } from "./CopyButton";

export function CodeTabs({
  liquid,
  react,
  defaultExpanded = false,
}: {
  liquid: string;
  react: string;
  defaultExpanded?: boolean;
}) {
  const [tab, setTab] = useState<"liquid" | "react">("liquid");
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="overflow-hidden rounded-[6px] border border-[#e8e8e8]">
      <div className="flex items-center justify-between bg-[#fafafa] px-4 py-2">
        <div className="flex gap-0">
          {(["liquid", "react"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTab(t); setExpanded(true); }}
              className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                tab === t && expanded
                  ? "bg-[#111111] text-white"
                  : "text-[#8f8f8f] hover:text-[#4a4a4a]"
              }`}
            >
              {t === "liquid" ? "Liquid" : "React"}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-[10px] text-[#a0a0a0] hover:text-[#6f6f6f]"
        >
          {expanded ? "Collapse" : "Expand"}
        </button>
      </div>
      {expanded && (
        <CopyBlock
          code={tab === "liquid" ? liquid : react}
          label={tab === "liquid" ? "Shopify Liquid" : "React / TSX"}
        />
      )}
    </div>
  );
}
