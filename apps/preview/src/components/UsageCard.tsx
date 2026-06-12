"use client";

import type { UsageGuideline } from "../data/usageGuidelines";

const sysFont =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

export function UsageCard({ guideline }: { guideline: UsageGuideline }) {
  return (
    <div
      className="overflow-hidden rounded-[8px]"
      style={{ fontFamily: sysFont, border: "1px solid var(--border)" }}
    >
      {/* ---- Header ---- */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <p className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
          {guideline.component}
        </p>
        <p className="mt-1 text-[12px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {guideline.description}
        </p>
      </div>

      {/* ---- When / When Not ---- */}
      <div className="grid grid-cols-2" style={{ borderBottom: "1px solid var(--border)" }}>
        {/* When to use */}
        <div className="px-5 py-4" style={{ borderRight: "1px solid var(--border-subtle)" }}>
          <p
            className="mb-2.5 text-[10px] font-semibold uppercase text-[#4caf50]"
            style={{ letterSpacing: "1.2px" }}
          >
            When to use
          </p>
          <ul className="space-y-1.5">
            {guideline.when.map((item, i) => (
              <li
                key={i}
                className="text-[11px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="mr-1.5" style={{ color: "var(--text-muted)" }}>&bull;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* When not to use */}
        <div className="px-5 py-4">
          <p
            className="mb-2.5 text-[10px] font-semibold uppercase text-[#f44336]"
            style={{ letterSpacing: "1.2px" }}
          >
            When not to use
          </p>
          <ul className="space-y-1.5">
            {guideline.whenNot.map((item, i) => (
              <li
                key={i}
                className="text-[11px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="mr-1.5" style={{ color: "var(--text-muted)" }}>&bull;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---- Do / Don't ---- */}
      <div className="grid grid-cols-2">
        {/* Do */}
        <div className="px-5 py-4" style={{ borderRight: "1px solid var(--border-subtle)" }}>
          <p
            className="mb-2.5 text-[10px] font-semibold uppercase text-[#4caf50]"
            style={{ letterSpacing: "1.2px" }}
          >
            Do
          </p>
          <div className="space-y-3">
            {guideline.doExamples.map((ex, i) => (
              <div key={i}>
                <p className="text-[11px] font-semibold" style={{ color: "var(--text-primary)" }}>
                  {ex.label}
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {ex.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Don't */}
        <div className="px-5 py-4">
          <p
            className="mb-2.5 text-[10px] font-semibold uppercase text-[#f44336]"
            style={{ letterSpacing: "1.2px" }}
          >
            Don&apos;t
          </p>
          <div className="space-y-3">
            {guideline.dontExamples.map((ex, i) => (
              <div key={i}>
                <p className="text-[11px] font-semibold" style={{ color: "var(--text-primary)" }}>
                  {ex.label}
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {ex.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
