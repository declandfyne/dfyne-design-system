"use client";

import { useRef, useEffect, useState } from "react";

export type TabName = "canvas" | "docs" | "usage";

export function Toolbar({
  activeTab,
  onTabChange,
  onCopyJsx,
  darkCanvas,
  onToggleCanvas,
}: {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
  onCopyJsx: () => void;
  darkCanvas: boolean;
  onToggleCanvas: () => void;
}) {
  const tabs: { id: TabName; label: string }[] = [
    { id: "canvas", label: "Canvas" },
    { id: "docs", label: "Docs" },
    { id: "usage", label: "Usage" },
  ];

  const tabRefs = useRef<Map<TabName, HTMLButtonElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current.get(activeTab);
    if (el) {
      setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeTab]);

  return (
    <div
      className="flex shrink-0 items-center justify-between px-5"
      style={{
        height: "var(--toolbar-height)",
        background: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      {/* Left: Tabs */}
      <div className="relative flex" style={{ height: "var(--toolbar-height)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => { if (el) tabRefs.current.set(tab.id, el); }}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className="flex items-center transition-colors"
            style={{
              height: "var(--toolbar-height)",
              padding: "0 14px",
              fontSize: "13px",
              fontFamily: "Raleway, sans-serif",
              letterSpacing: "0.5px",
              color: activeTab === tab.id ? "#111" : "#999",
              fontWeight: activeTab === tab.id ? 600 : 400,
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) e.currentTarget.style.color = "#555";
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) e.currentTarget.style.color = "#999";
            }}
          >
            {tab.label}
          </button>
        ))}
        {/* Sliding active indicator */}
        <span
          style={{
            position: "absolute",
            bottom: 0,
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            height: 2,
            background: "#111",
            borderRadius: 1,
            transition: "left 0.25s cubic-bezier(0.4,0,0.2,1), width 0.25s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>

      <div className="flex items-center gap-3">
        {/* Separator */}
        <div style={{ width: 1, height: 20, background: "#e0e0e0" }} />

        {/* Light/Dark pill toggle */}
        <button
          type="button"
          onClick={onToggleCanvas}
          aria-label={darkCanvas ? "Switch to light canvas" : "Switch to dark canvas"}
          style={{
            position: "relative",
            width: 52,
            height: 28,
            borderRadius: 9999,
            background: darkCanvas ? "#333" : "#e0e0e0",
            border: "1px solid #d0d0d0",
            cursor: "pointer",
            transition: "background 0.2s",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 4,
              left: darkCanvas ? 28 : 4,
              width: 18,
              height: 18,
              borderRadius: 9999,
              background: darkCanvas ? "#fff" : "#111",
              transition: "left 0.25s cubic-bezier(0.4,0,0.2,1)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: 8,
              transform: "translateY(-50%)",
              fontSize: 11,
              opacity: darkCanvas ? 0.5 : 0,
              transition: "opacity 0.2s",
            }}
          >
            &#9788;
          </span>
          <span
            style={{
              position: "absolute",
              top: "50%",
              right: 8,
              transform: "translateY(-50%)",
              fontSize: 10,
              opacity: darkCanvas ? 0 : 0.5,
              transition: "opacity 0.2s",
            }}
          >
            &#9789;
          </span>
        </button>

        {/* Copy JSX button */}
        <button
          type="button"
          onClick={onCopyJsx}
          className="transition-all"
          style={{
            background: "transparent",
            border: "1px solid #d0d0d0",
            borderRadius: 6,
            padding: "0 10px",
            height: 28,
            fontSize: 11,
            fontFamily: "Raleway, sans-serif",
            fontWeight: 500,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#555",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#999";
            e.currentTarget.style.color = "#111";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#d0d0d0";
            e.currentTarget.style.color = "#555";
          }}
        >
          Copy JSX
        </button>
      </div>
    </div>
  );
}
