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
  { label: "Filters", items: ["Filter Panel", "Filter Drawer"] },
  { label: "Collection", items: ["Collection Grid", "Collection Intro", "Category Image Carousel"] },
  { label: "Cart", items: ["Cart Item", "Cart Drawer"] },
  { label: "Navigation", items: ["Header", "Back Link", "Social Icons"] },
  { label: "Modals", items: ["Quick Add"] },
  { label: "Feedback", items: ["Toast", "Tooltip"] },
  { label: "Sections", items: ["Campaign Hero", "Announcement Bar", "Newsletter Signup", "Footer"] },
  { label: "Tokens", items: ["Colors", "Typography", "Spacing", "Glossary"] },
  { label: "System", items: ["Settings"] },
];

const totalItems = groups.reduce((sum, g) => sum + g.items.length, 0);

function SearchIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "#999", flexShrink: 0 }}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

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
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowY: "auto",
        borderRight: "1px solid #e0e0e0",
        background: "#ffffff",
      }}
    >
      {/* Logo area */}
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <img src="/dfyne-logo-white.png" alt="DFYNE" style={{ height: 18, filter: "invert(1)" }} />
      </div>

      {/* Separator */}
      <div
        style={{
          height: 1,
          margin: "0 16px",
          background: "linear-gradient(90deg, transparent, #e0e0e0, transparent)",
        }}
      />

      {/* Search */}
      <div style={{ padding: "16px 16px 8px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            height: 36,
            padding: "0 10px",
            background: "#f5f5f5",
            border: "1px solid #e0e0e0",
            borderRadius: 6,
          }}
        >
          <SearchIcon />
          <input
            type="text"
            placeholder="Search components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              color: "#333",
              fontSize: 12,
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>

      {/* Groups */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 8 }}>
        {filteredGroups.map((group, groupIndex) => (
          <div key={group.label}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: `${groupIndex === 0 ? 24 : 20}px 20px 8px`,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase" as const,
                color: "#999",
              }}
            >
              <span>{group.label}</span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: 0,
                  color: "#bbb",
                }}
              >
                {group.items.length}
              </span>
            </div>
            {group.items.map((item) => {
              const isActive = item === active;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    if (item === "Settings") {
                      window.location.href = "/settings";
                    } else {
                      onSelect(item);
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "#f5f5f5";
                      e.currentTarget.style.color = "#111";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#555";
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    padding: "7px 20px 7px 17px",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    textAlign: "left" as const,
                    fontSize: 13,
                    fontFamily: "inherit",
                    transition: "color 0.15s ease, background 0.15s ease",
                    color: isActive ? "#111" : "#555",
                    background: isActive ? "#f0f0f0" : "transparent",
                    borderLeft: isActive
                      ? "3px solid #111"
                      : "3px solid transparent",
                    borderRadius: isActive ? "0 4px 4px 0" : "0",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer count */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid #e0e0e0",
          fontSize: 10,
          color: "#999",
          letterSpacing: 0.5,
        }}
      >
        {totalItems} components
      </div>
    </nav>
  );
}
