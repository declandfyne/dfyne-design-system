"use client";

import { useState, useEffect } from "react";
import { computeLineHeights, type TypographyInput } from "../lib/lineHeight";
import { client, isSanityConfigured } from "../sanity/client";
import { Button, Badge, SectionHeading, AnnouncementBar } from "@dfyne/react";

const DEFAULTS: TypographyInput = {
  baseRatio: 1.5,
  multipliers: { body: 1.0, heading: 0.82, ui: 0.75 },
};

const numInputStyle: React.CSSProperties = {
  background: "var(--input-bg)",
  border: "1px solid var(--input-border)",
  color: "var(--text-primary)",
  borderRadius: 4,
  width: 64,
  textAlign: "center",
  fontSize: 12,
  fontFamily: "'SF Mono', monospace",
  padding: "4px 0",
  flexShrink: 0,
};

export function TypographyPreview() {
  const [input, setInput] = useState<TypographyInput>(DEFAULTS);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const tokens = computeLineHeights(input);

  // Fetch from Sanity on mount
  useEffect(() => {
    if (!isSanityConfigured) return;
    client
      .fetch<TypographyInput | null>(
        `*[_type == "typographySettings"][0]{ baseRatio, multipliers }`
      )
      .then((data) => {
        if (data?.baseRatio && data?.multipliers) {
          setInput(data);
        }
      })
      .catch(() => {
        // Sanity not configured yet — use defaults
      });
  }, []);

  const handleSave = async () => {
    if (!isSanityConfigured) return;
    setSaving(true);
    try {
      await client.createOrReplace({
        _id: "typographySettings",
        _type: "typographySettings",
        baseRatio: input.baseRatio,
        multipliers: input.multipliers,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to save typography settings:", err);
    } finally {
      setSaving(false);
    }
  };

  const sampleBody =
    "The quick brown fox jumps over the lazy dog. This paragraph demonstrates body text line-height across multiple lines to show the spacing between them clearly.";
  const sampleHeading = "CAMPAIGN COLLECTION DROP";
  const sampleUi = "ADD TO CART";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* Save button — top right */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !isSanityConfigured}
          style={{
            background: saved ? "#1a7a1a" : "#111111",
            color: "#ffffff",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: 2.7,
            textTransform: "uppercase",
            padding: "10px 24px",
            borderRadius: 4,
            border: "none",
            cursor: saving || !isSanityConfigured ? "not-allowed" : "pointer",
            opacity: !isSanityConfigured ? 0.4 : 1,
            transition: "background 0.2s",
          }}
        >
          {saving ? "SAVING..." : saved ? "SAVED" : "SAVE SETTINGS"}
        </button>
      </div>

      {/* Base Ratio Slider */}
      <div>
        <label
          style={{
            display: "block",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: 8,
          }}
        >
          Base Ratio
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input
            type="range"
            min={1.2}
            max={2.0}
            step={0.05}
            value={input.baseRatio}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, baseRatio: parseFloat(e.target.value) }))
            }
            style={{ flex: 1 }}
          />
          <input
            type="number"
            min={1.2}
            max={2.0}
            step={0.05}
            value={input.baseRatio.toFixed(2)}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              if (!isNaN(val) && val >= 1.2 && val <= 2.0) {
                setInput((prev) => ({ ...prev, baseRatio: val }));
              }
            }}
            style={numInputStyle}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 10,
            color: "var(--text-muted)",
            marginTop: 4,
          }}
        >
          <span>1.2 (tight)</span>
          <span>2.0 (spacious)</span>
        </div>
      </div>

      {/* Advanced multipliers toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        style={{
          background: "none",
          border: "1px solid var(--border)",
          borderRadius: 4,
          padding: "6px 12px",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: "var(--text-secondary)",
          cursor: "pointer",
          alignSelf: "flex-start",
        }}
      >
        {showAdvanced ? "Hide" : "Show"} Advanced Multipliers
      </button>

      {showAdvanced && (
        <div style={{ display: "flex", gap: 24 }}>
          {(["body", "heading", "ui"] as const).map((key) => (
            <div key={key} style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: 8,
                }}
              >
                {key}
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="range"
                  min={0.5}
                  max={2.0}
                  step={0.01}
                  value={input.multipliers[key]}
                  onChange={(e) =>
                    setInput((prev) => ({
                      ...prev,
                      multipliers: {
                        ...prev.multipliers,
                        [key]: parseFloat(e.target.value),
                      },
                    }))
                  }
                  style={{ flex: 1, minWidth: 0 }}
                />
                <input
                  type="number"
                  min={0.5}
                  max={2.0}
                  step={0.01}
                  value={input.multipliers[key].toFixed(2)}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val) && val >= 0.5 && val <= 2.0) {
                      setInput((prev) => ({
                        ...prev,
                        multipliers: {
                          ...prev.multipliers,
                          [key]: val,
                        },
                      }));
                    }
                  }}
                  style={numInputStyle}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Live preview samples */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Body */}
        <div
          style={{
            padding: 20,
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "#ffffff",
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#888",
              marginBottom: 12,
            }}
          >
            Body Text — --lh-body: {tokens["--lh-body"].toFixed(3)}
          </div>
          <p
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize: 13,
              lineHeight: tokens["--lh-body"],
              color: "#111111",
              margin: 0,
            }}
          >
            {sampleBody}
          </p>
        </div>

        {/* Heading */}
        <div
          style={{
            padding: 20,
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "#ffffff",
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#888",
              marginBottom: 12,
            }}
          >
            Heading — --lh-heading: {tokens["--lh-heading"].toFixed(3)}
          </div>
          <h2
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize: 34,
              fontWeight: 500,
              lineHeight: tokens["--lh-heading"],
              letterSpacing: "0.035em",
              textTransform: "uppercase",
              color: "#111111",
              margin: 0,
            }}
          >
            {sampleHeading}
          </h2>
        </div>

        {/* UI */}
        <div
          style={{
            padding: 20,
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "#ffffff",
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#888",
              marginBottom: 12,
            }}
          >
            UI Element — --lh-ui: {tokens["--lh-ui"].toFixed(3)}
          </div>
          <span
            style={{
              fontFamily: "Raleway, sans-serif",
              fontSize: 9,
              fontWeight: 600,
              lineHeight: tokens["--lh-ui"],
              letterSpacing: "2.7px",
              textTransform: "uppercase",
              color: "#111111",
            }}
          >
            {sampleUi}
          </span>
        </div>
      </div>

      {/* Live Components */}
      <div>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: 16,
          }}
        >
          Live Components
        </div>
        <div id="typo-live-preview">
          <style>{`
            #typo-live-preview {
              --lh-body: ${tokens["--lh-body"]};
              --lh-heading: ${tokens["--lh-heading"]};
              --lh-ui: ${tokens["--lh-ui"]};
            }
          `}</style>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Button */}
            <div
              style={{
                padding: 20,
                border: "1px solid var(--border)",
                borderRadius: 8,
                background: "#ffffff",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#888",
                  marginBottom: 12,
                }}
              >
                Button — line-height: {tokens["--lh-ui"].toFixed(3)}
              </div>
              <div style={{ lineHeight: tokens["--lh-ui"] }}>
                <Button variant="primary">ADD TO CART</Button>
              </div>
            </div>

            {/* Badge */}
            <div
              style={{
                padding: 20,
                border: "1px solid var(--border)",
                borderRadius: 8,
                background: "#ffffff",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#888",
                  marginBottom: 12,
                }}
              >
                Badge — line-height: {tokens["--lh-ui"].toFixed(3)}
              </div>
              <div style={{ lineHeight: tokens["--lh-ui"] }}>
                <Badge text="NEW" variant="custom" />
              </div>
            </div>

            {/* SectionHeading */}
            <div
              style={{
                padding: 20,
                border: "1px solid var(--border)",
                borderRadius: 8,
                background: "#ffffff",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#888",
                  marginBottom: 12,
                }}
              >
                SectionHeading — line-height: {tokens["--lh-heading"].toFixed(3)}
              </div>
              <div style={{ lineHeight: tokens["--lh-heading"] }}>
                <SectionHeading eyebrow="New Collection" title="Summer Essentials" />
              </div>
            </div>

            {/* AnnouncementBar */}
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "12px 20px 8px",
                  background: "#ffffff",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#888",
                }}
              >
                AnnouncementBar — line-height: {tokens["--lh-ui"].toFixed(3)}
              </div>
              <div style={{ lineHeight: tokens["--lh-ui"] }}>
                <AnnouncementBar
                  slides={[
                    {
                      text: "FREE SHIPPING ON ORDERS OVER £50",
                      detail: "Standard delivery 3-5 days",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Token table */}
      <div>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: 12,
          }}
        >
          Generated Tokens
        </div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 12,
            fontFamily: "'SF Mono', 'Fira Code', monospace",
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "6px 12px", borderBottom: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 10 }}>
                Token
              </th>
              <th style={{ textAlign: "right", padding: "6px 12px", borderBottom: "1px solid var(--border)", color: "var(--text-muted)", fontSize: 10 }}>
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(tokens).map(([key, value]) => (
              <tr key={key}>
                <td style={{ padding: "6px 12px", borderBottom: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
                  {key}
                </td>
                <td style={{ textAlign: "right", padding: "6px 12px", borderBottom: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}>
                  {value.toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
