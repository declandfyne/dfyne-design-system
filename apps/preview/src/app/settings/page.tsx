"use client";

import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { TypographyPreview } from "../../components/TypographyPreview";
import { ContentPreview } from "../../components/ContentPreview";

type SettingsTab = "content" | "typography" | "studio";

export default function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>("typography");

  const tabs: { key: SettingsTab; label: string }[] = [
    { key: "typography", label: "Typography" },
    { key: "content", label: "Content" },
    { key: "studio", label: "Studio" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "var(--sidebar-width) 1fr",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar active="Settings" onSelect={(name) => {
        if (name !== "Settings") {
          window.location.href = `/#${encodeURIComponent(name)}`;
        }
      }} />

      <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            height: 48,
            borderBottom: "1px solid var(--border)",
            background: "var(--panel-bg)",
            paddingLeft: 20,
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              style={{
                padding: "0 20px",
                height: "100%",
                border: "none",
                background: "transparent",
                fontSize: 11,
                fontWeight: tab === t.key ? 600 : 400,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: tab === t.key ? "var(--text-accent)" : "var(--text-muted)",
                borderBottom: tab === t.key ? "2px solid var(--text-accent)" : "2px solid transparent",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 32 }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            {tab === "typography" && <TypographyPreview />}

            {tab === "content" && <ContentPreview />}

            {tab === "studio" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  The full Sanity Studio editor is available at <code style={{ background: "var(--input-bg)", padding: "2px 6px", borderRadius: 4 }}>/studio</code>. Use it to create and edit content documents, typography settings, and product overrides.
                </p>
                <a
                  href="/studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 20px",
                    background: "#111111",
                    color: "#ffffff",
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: 2.7,
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderRadius: 4,
                    alignSelf: "flex-start",
                  }}
                >
                  Open Studio
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
