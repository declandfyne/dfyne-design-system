"use client";

import { useState, useEffect } from "react";
import { computeLineHeights, type TypographyInput } from "../lib/lineHeight";
import { client } from "../sanity/client";

const DEFAULTS: TypographyInput = {
  baseRatio: 1.5,
  multipliers: { body: 1.0, heading: 0.82, ui: 0.75 },
};

export function TypographyPreview() {
  const [input, setInput] = useState<TypographyInput>(DEFAULTS);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const tokens = computeLineHeights(input);

  // Fetch from Sanity on mount
  useEffect(() => {
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

  const sampleBody =
    "The quick brown fox jumps over the lazy dog. This paragraph demonstrates body text line-height across multiple lines to show the spacing between them clearly.";
  const sampleHeading = "CAMPAIGN COLLECTION DROP";
  const sampleUi = "ADD TO CART";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
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
          Base Ratio: {input.baseRatio.toFixed(2)}
        </label>
        <input
          type="range"
          min={1.2}
          max={2.0}
          step={0.05}
          value={input.baseRatio}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, baseRatio: parseFloat(e.target.value) }))
          }
          style={{ width: "100%" }}
        />
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
                {key}: {input.multipliers[key].toFixed(2)}x
              </label>
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
                style={{ width: "100%" }}
              />
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
