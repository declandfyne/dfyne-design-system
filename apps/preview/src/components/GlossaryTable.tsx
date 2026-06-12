"use client";

import { useState, useMemo } from "react";
import type { GlossaryEntry } from "../data/tokenGlossary";
import { CopyAsDropdown } from "./CopyAsDropdown";

const monoFont = "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace";
const sysFont = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

function isColorValue(value: string): boolean {
  return /^(#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\()/.test(value.trim());
}

export function GlossaryTable({ entries }: { entries: GlossaryEntry[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(entries.map((e) => e.category));
    return ["All", ...Array.from(cats).sort()];
  }, [entries]);

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      const matchesCategory = activeCategory === "All" || e.category === activeCategory;
      if (!matchesCategory) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        e.cssVar.toLowerCase().includes(q) ||
        e.plainName.toLowerCase().includes(q) ||
        e.value.toLowerCase().includes(q)
      );
    });
  }, [entries, search, activeCategory]);

  return (
    <div>
      {/* Search + count */}
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tokens..."
          className="w-[260px] rounded border border-[#e8e8e8] bg-white px-3 py-1.5 text-[12px] text-[#1a1a1a] outline-none placeholder:text-[#b0b0b0] focus:border-[#a0a0a0]"
          style={{ fontFamily: sysFont }}
        />
        <span className="text-[12px] text-[#a0a0a0]" style={{ fontFamily: sysFont }}>
          {filtered.length} of {entries.length} tokens
        </span>
      </div>

      {/* Category pills */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-3 py-1 text-[11px] transition-colors ${
              activeCategory === cat
                ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                : "border-[#e0e0e0] bg-white text-[#6f6f6f] hover:border-[#c0c0c0] hover:text-[#4a4a4a]"
            }`}
            style={{ fontFamily: sysFont }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[8px] border border-[#e8e8e8]">
        {/* Header */}
        <div
          className="grid gap-3 border-b border-[#e8e8e8] bg-[#fafafa] px-4 py-2.5"
          style={{ gridTemplateColumns: "minmax(180px, 1.4fr) minmax(120px, 1fr) minmax(140px, 1fr) minmax(140px, 1fr) 40px" }}
        >
          {["CSS Variable", "Figma", "JS Import", "Value", ""].map((h) => (
            <span
              key={h || "copy"}
              className="text-[11px] font-medium text-[#a0a0a0]"
              style={{ fontFamily: sysFont }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        <div className="max-h-[520px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-[12px] text-[#a0a0a0]" style={{ fontFamily: sysFont }}>
              No tokens match your search.
            </div>
          ) : (
            filtered.map((entry) => (
              <div
                key={entry.cssVar}
                className="grid items-center gap-3 border-b border-[#e8e8e8] px-4 py-2 transition-colors last:border-b-0 hover:bg-[#f5f5f5]"
                style={{ gridTemplateColumns: "minmax(180px, 1.4fr) minmax(120px, 1fr) minmax(140px, 1fr) minmax(140px, 1fr) 40px" }}
              >
                {/* CSS Variable */}
                <code
                  className="truncate text-[11px] text-[#4a4a4a]"
                  style={{ fontFamily: monoFont }}
                  title={entry.cssVar}
                >
                  {entry.cssVar}
                </code>

                {/* Figma path */}
                <span
                  className="truncate text-[11px] text-[#8f8f8f]"
                  style={{ fontFamily: monoFont }}
                  title={entry.figmaPath}
                >
                  {entry.figmaPath}
                </span>

                {/* JS name */}
                <code
                  className="truncate text-[11px] text-[#8f8f8f]"
                  style={{ fontFamily: monoFont }}
                  title={entry.jsName}
                >
                  {entry.jsName}
                </code>

                {/* Value with optional color swatch */}
                <div className="flex items-center gap-2 overflow-hidden">
                  {isColorValue(entry.value) && (
                    <span
                      className="inline-block h-3 w-3 shrink-0 rounded-sm border border-[#e0e0e0]"
                      style={{ backgroundColor: entry.value }}
                    />
                  )}
                  <code
                    className="truncate text-[11px] text-[#6f6f6f]"
                    style={{ fontFamily: monoFont }}
                    title={entry.value}
                  >
                    {entry.value}
                  </code>
                </div>

                {/* Copy dropdown */}
                <CopyAsDropdown
                  formats={[
                    { label: "CSS", value: `var(${entry.cssVar})` },
                    { label: "Figma", value: entry.figmaPath },
                    { label: "JS", value: entry.jsName },
                  ]}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
