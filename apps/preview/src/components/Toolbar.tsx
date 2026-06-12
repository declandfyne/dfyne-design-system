"use client";

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

  return (
    <div
      className="flex shrink-0 items-center justify-between border-b px-5"
      style={{
        height: "var(--toolbar-height)",
        background: "var(--panel-bg)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className="flex items-center px-3.5 text-[12px] transition-colors"
            style={{
              height: "var(--toolbar-height)",
              color: activeTab === tab.id ? "#fff" : "var(--text-muted)",
              borderBottom: activeTab === tab.id ? "2px solid #fff" : "2px solid transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleCanvas}
          className="rounded-md border px-2.5 py-[5px] text-[11px] transition-colors hover:border-[#444] hover:text-[#ccc]"
          style={{
            background: "var(--input-bg)",
            borderColor: "var(--input-border)",
            color: "var(--text-secondary)",
          }}
        >
          {darkCanvas ? "Light" : "Dark"}
        </button>
        <button
          type="button"
          onClick={onCopyJsx}
          className="rounded-md border px-2.5 py-[5px] text-[11px] text-white transition-colors hover:bg-[#333]"
          style={{
            background: "#222",
            borderColor: "#444",
          }}
        >
          ⌘C Copy JSX
        </button>
      </div>
    </div>
  );
}
