"use client";

import { useState } from "react";

type SidebarGroup = {
  label: string;
  items: string[];
};

const groups: SidebarGroup[] = [
  { label: "Primitives", items: ["Button", "Badge", "Icon", "Section Heading", "Arrow Button", "Quantity Input", "Length Selector"] },
  { label: "Disclosure", items: ["Accordion", "Tabs"] },
  { label: "Search", items: ["Search"] },
  { label: "Cards", items: ["Product Card", "Category Card", "Color Swatch", "Size Button", "Cross-Sell Card"] },
  { label: "Gallery", items: ["Product Gallery"] },
  { label: "Filters", items: ["Filter Panel"] },
  { label: "Collection", items: ["Collection Grid"] },
  { label: "Cart", items: ["Cart Item", "Cart Drawer"] },
  { label: "Navigation", items: ["Header", "Back Link", "Social Icons"] },
  { label: "Modals", items: ["Quick Add"] },
  { label: "Feedback", items: ["Toast", "Tooltip"] },
  { label: "Sections", items: ["Campaign Hero", "Announcement Bar", "Newsletter Signup", "Footer"] },
  { label: "Tokens", items: ["Colors", "Typography", "Spacing", "Glossary"] },
];

export function Sidebar({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (name: string) => void;
}) {
  const [search, setSearch] = useState("");

  const filteredGroups = groups
    .map((g) => ({
      ...g,
      items: g.items.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <nav className="flex h-full flex-col overflow-y-auto border-r bg-[var(--panel-bg)]" style={{ borderColor: "var(--border)" }}>
      {/* Header */}
      <div className="border-b px-4 pb-3 pt-5" style={{ borderColor: "var(--border)" }}>
        <img src="/dfyne-logo-white.png" alt="DFYNE" style={{ height: 18 }} />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-3 w-full rounded-md border px-2.5 py-[7px] text-[12px] outline-none"
          style={{
            background: "var(--input-bg)",
            borderColor: "var(--input-border)",
            color: "var(--text-secondary)",
          }}
        />
      </div>

      {/* Groups */}
      <div className="flex-1 overflow-y-auto py-2">
        {filteredGroups.map((group) => (
          <div key={group.label} className="py-3">
            <div
              className="px-4 pb-1.5 text-[10px] font-semibold uppercase tracking-[1.5px]"
              style={{ color: "var(--text-muted)" }}
            >
              {group.label}
            </div>
            {group.items.map((item) => {
              const isActive = item === active;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onSelect(item)}
                  className="flex w-full items-center gap-2 py-[6px] pl-6 pr-4 text-left text-[13px] transition-colors"
                  style={{
                    color: isActive ? "var(--text-accent)" : "var(--text-secondary)",
                    background: isActive ? "var(--active-bg)" : "transparent",
                    borderLeft: isActive ? "2px solid #fff" : "2px solid transparent",
                    paddingLeft: isActive ? "22px" : "24px",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: isActive ? "#fff" : "#333" }}
                  />
                  {item}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </nav>
  );
}
