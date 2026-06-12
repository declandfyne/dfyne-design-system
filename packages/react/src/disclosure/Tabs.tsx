"use client";

import React, { useState } from "react";

/* ─── Types ─── */

export interface Tab {
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  activeIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
}

/* ─── Styles ─── */

const barStyle: React.CSSProperties = {
  display: "flex",
  gap: 0,
  borderBottom: "1px solid #e8e8e1",
  margin: 0,
  padding: 0,
};

const baseButtonStyle: React.CSSProperties = {
  fontFamily: "Raleway, sans-serif",
  fontSize: 10,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "1.5px",
  padding: "12px 16px",
  background: "none",
  borderTop: "none",
  borderRight: "none",
  borderLeft: "none",
  borderBottom: "2px solid transparent",
  marginBottom: -1,
  cursor: "pointer",
  transition: "color 0.15s ease",
};

const activeButtonStyle: React.CSSProperties = {
  ...baseButtonStyle,
  color: "#111",
  borderBottom: "2px solid #111",
};

const inactiveButtonStyle: React.CSSProperties = {
  ...baseButtonStyle,
  color: "#888",
};

const panelStyle: React.CSSProperties = {
  padding: "16px 0",
};

/* ─── Component ─── */

export function Tabs({ tabs, activeIndex, onChange, className }: TabsProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const controlled = activeIndex !== undefined;
  const current = controlled ? activeIndex : internalIndex;

  function handleClick(index: number) {
    if (!controlled) setInternalIndex(index);
    onChange?.(index);
  }

  return (
    <div className={className}>
      <div role="tablist" style={barStyle}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            style={i === current ? activeButtonStyle : inactiveButtonStyle}
            onMouseEnter={(e) => {
              if (i !== current) e.currentTarget.style.color = "#555";
            }}
            onMouseLeave={(e) => {
              if (i !== current) e.currentTarget.style.color = "#888";
            }}
            onClick={() => handleClick(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, i) => (
        <div
          key={i}
          role="tabpanel"
          style={{
            ...panelStyle,
            display: i === current ? "block" : "none",
          }}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
