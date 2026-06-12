"use client";

import { Icon } from "@dfyne/react";
import type { IconName } from "@dfyne/react";
import {
  blackScale,
  whiteScale,
  grayScale,
  textScale,
  colorGridColumns,
  figmaTextStyles,
  typeWeights,
  spacingScale,
  radiusScale,
  shadowScale,
  aspectRatios,
  componentTypography,
  iconNames,
  glossaryEntries,
} from "../data/tokenData";
import type { ColorStep } from "../data/tokenData";
import { GlossaryTable } from "./GlossaryTable";

/* ------------------------------------------------------------------ */
/*  Helper components                                                  */
/* ------------------------------------------------------------------ */

function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 border-b border-[#e8e8e8] py-20">
      <div className="mx-auto max-w-[1200px] px-8">
        <h2
          className="mb-12 text-2xl font-light tracking-tight text-[#1a1a1a]"
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" }}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-14 last:mb-0">
      <h3
        className="mb-5 text-[13px] font-medium text-[#6f6f6f]"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function SpecNote({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-3 text-[12px] text-[#8f8f8f]"
      style={{ fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace" }}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Radix-style color grid row                                        */
/* ------------------------------------------------------------------ */

function ColorGridRow({
  rowLabel,
  steps,
  totalCols,
}: {
  rowLabel: string;
  steps: ColorStep[];
  totalCols: number;
}) {
  // Pad steps array to totalCols by repeating last step's color or blank
  const paddedSteps: (ColorStep | null)[] = Array.from({ length: totalCols }, (_, i) =>
    steps[i] ?? null
  );

  return (
    <div className="flex">
      {/* Row label */}
      <div
        className="flex w-[120px] shrink-0 items-center pr-4"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" }}
      >
        <span className="text-[13px] font-medium text-[#1a1a1a]">{rowLabel}</span>
      </div>
      {/* Color cells */}
      <div className="flex flex-1">
        {paddedSteps.map((step, i) =>
          step ? (
            <div
              key={i}
              className="group relative flex-1 cursor-default"
              style={{ height: "52px", background: step.value }}
              title={`${step.label} — ${step.hex}`}
            >
              {/* Hover label */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-start justify-end px-2 pb-1.5 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <span
                  className="text-[10px] font-medium leading-tight"
                  style={{
                    color: step.textDark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.75)",
                    fontFamily: "ui-monospace, 'Cascadia Code', Menlo, monospace",
                  }}
                >
                  {step.label}
                </span>
              </div>
            </div>
          ) : (
            <div key={i} className="flex-1" style={{ height: "52px", background: "transparent" }} />
          )
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TokenSections                                                      */
/* ------------------------------------------------------------------ */

export function TokenSections() {
  const sysFont = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

  return (
    <>
      {/* ================================================================== */}
      {/*  TOKEN GLOSSARY                                                     */}
      {/* ================================================================== */}
      <DocSection id="glossary" title="Token Glossary">
        <GlossaryTable entries={glossaryEntries} />
      </DocSection>

      {/* ================================================================== */}
      {/*  COLORS — Radix-style grid                                         */}
      {/* ================================================================== */}
      <DocSection id="colors" title="Colors">

        {/* Grid column headers */}
        <div className="mb-3 flex">
          <div className="w-[120px] shrink-0" />
          <div className="flex flex-1">
            {colorGridColumns.map((col) => (
              <div key={col} className="flex-1 px-1">
                <span
                  className="block text-[11px] font-medium text-[#a0a0a0]"
                  style={{ fontFamily: sysFont }}
                >
                  {col}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Color rows */}
        <div className="overflow-hidden rounded-[8px] border border-[#e8e8e8]">
          <ColorGridRow rowLabel="Black" steps={blackScale} totalCols={7} />
          <div className="border-t border-[#e8e8e8]" />
          <ColorGridRow rowLabel="White" steps={whiteScale} totalCols={7} />
          <div className="border-t border-[#e8e8e8]" />
          <ColorGridRow rowLabel="Gray" steps={grayScale} totalCols={7} />
          <div className="border-t border-[#e8e8e8]" />
          <ColorGridRow rowLabel="Text" steps={textScale} totalCols={7} />
        </div>

        {/* Usage reference */}
        <div className="mt-14">
          <h3
            className="mb-5 text-[13px] font-medium text-[#6f6f6f]"
          >
            Usage reference
          </h3>
          <div className="grid grid-cols-1 gap-px bg-[#e8e8e8] overflow-hidden rounded-[8px] border border-[#e8e8e8] sm:grid-cols-2">
            {[
              { role: "Search pill — default border",    value: "rgba(0,0,0,0.2)"  },
              { role: "Search pill — active border",     value: "#000000"           },
              { role: "Search pill — active bg",         value: "rgba(0,0,0,0.03)" },
              { role: "Search input — bg",               value: "rgba(0,0,0,0.03)" },
              { role: "Search input — border",           value: "#000000"           },
              { role: "Search input — placeholder",      value: "#757575"           },
              { role: "Announcement bar — bg",           value: "#f0f0f0"           },
              { role: "Category card gradient",          value: "rgba(0,0,0,0.4) → transparent" },
              { role: "Gradient overlay (bottom)",       value: "rgba(0,0,0,0.15)" },
            ].map((r) => (
              <div
                key={r.role}
                className="flex items-center justify-between bg-white px-4 py-3"
              >
                <span className="text-[13px] text-[#4a4a4a]">{r.role}</span>
                <code
                  className="ml-4 shrink-0 text-[11px] text-[#8f8f8f]"
                  style={{ fontFamily: "ui-monospace, Menlo, monospace" }}
                >
                  {r.value}
                </code>
              </div>
            ))}
          </div>
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  TYPOGRAPHY                                                         */}
      {/* ================================================================== */}
      <DocSection id="typography" title="Typography">

        <SubSection title="Font family">
          <div className="rounded-[8px] border border-[#e8e8e8] p-8">
            <p
              className="text-[36px] text-[#1a1a1a]"
              style={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif", fontWeight: 400 }}
            >
              Raleway
            </p>
            <p className="mt-1 text-[13px] text-[#8f8f8f]">
              Regular 400 · SemiBold 600 · Bold 700
            </p>
            <div className="mt-6 space-y-1.5">
              {["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz", "0123456789 !@#$%&*()"].map((row) => (
                <p
                  key={row}
                  className="text-[15px] text-[#1a1a1a]"
                  style={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif", fontWeight: 400 }}
                >
                  {row}
                </p>
              ))}
            </div>
          </div>
        </SubSection>

        <SubSection title="Text styles">
          <div className="overflow-hidden rounded-[8px] border border-[#e8e8e8]">
            <div
              className="grid gap-4 border-b border-[#e8e8e8] bg-[#fafafa] px-5 py-3"
              style={{ gridTemplateColumns: "220px 56px 66px 90px 80px 1fr" }}
            >
              {["Style", "Size", "Weight", "Line Height", "Tracking", "Sample"].map((h) => (
                <span key={h} className="text-[11px] font-medium text-[#a0a0a0]">{h}</span>
              ))}
            </div>
            {figmaTextStyles.map((s) => (
              <div
                key={s.name}
                className="grid items-center gap-4 border-b border-[#e8e8e8] px-5 py-4 last:border-b-0"
                style={{ gridTemplateColumns: "220px 56px 66px 90px 80px 1fr" }}
              >
                <code
                  className="text-[12px] text-[#4a4a4a]"
                  style={{ fontFamily: "ui-monospace, Menlo, monospace" }}
                >
                  {s.name}
                </code>
                <span className="text-[12px] text-[#8f8f8f]">{s.size}</span>
                <span className="text-[12px] text-[#8f8f8f]">{s.weight}</span>
                <span className="text-[12px] text-[#8f8f8f]">{s.lineHeight}</span>
                <span className="text-[12px] text-[#8f8f8f]">{s.tracking}</span>
                <span
                  className="text-[#1a1a1a]"
                  style={{
                    fontFamily: s.name === "Product price" ? "sans-serif" : "Raleway, Arial, sans-serif",
                    fontSize: s.size,
                    fontWeight: s.weight,
                    lineHeight: s.lineHeight,
                    letterSpacing: s.tracking,
                  }}
                >
                  {s.sample}
                </span>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="Weight scale">
          <div>
            {typeWeights.map((w) => (
              <div
                key={w.label}
                className="flex items-baseline gap-6 border-b border-[#e8e8e8] py-5 last:border-b-0"
              >
                <span className="w-[90px] shrink-0 text-[13px] text-[#8f8f8f]">{w.label}</span>
                <span className="w-[32px] shrink-0 text-[13px] text-[#c0c0c0]">{w.value}</span>
                <span
                  className="text-[22px] uppercase text-[#1a1a1a]"
                  style={{ fontFamily: "Raleway, Arial, sans-serif", fontWeight: w.value }}
                >
                  Impact Collection — DFYNE
                </span>
              </div>
            ))}
          </div>
        </SubSection>

      </DocSection>

      {/* ================================================================== */}
      {/*  COMPONENT TYPOGRAPHY                                               */}
      {/* ================================================================== */}
      <DocSection id="component-type" title="Component typography">
        <div className="overflow-hidden rounded-[8px] border border-[#e8e8e8]">
          <div
            className="grid gap-4 border-b border-[#e8e8e8] bg-[#fafafa] px-5 py-3"
            style={{ gridTemplateColumns: "160px 66px 56px 80px 90px 1fr" }}
          >
            {["Component", "Size", "Weight", "Tracking", "Transform", "Sample"].map((h) => (
              <span key={h} className="text-[11px] font-medium text-[#a0a0a0]">{h}</span>
            ))}
          </div>
          {componentTypography.map((c) => (
            <div
              key={c.component}
              className="grid items-center gap-4 border-b border-[#e8e8e8] px-5 py-4 last:border-b-0"
              style={{ gridTemplateColumns: "160px 66px 56px 80px 90px 1fr" }}
            >
              <span className="text-[12px] font-medium text-[#4a4a4a]">{c.component}</span>
              <span className="text-[12px] text-[#8f8f8f]">{c.size}</span>
              <span className="text-[12px] text-[#8f8f8f]">{c.weight}</span>
              <span className="text-[12px] text-[#8f8f8f]">{c.tracking}</span>
              <span className="text-[12px] text-[#8f8f8f]">{c.transform}</span>
              <span
                className="text-[#1a1a1a]"
                style={{
                  fontFamily: c.family === "sans-serif" ? "sans-serif" : "Raleway, sans-serif",
                  fontSize: c.size.includes("–") ? "14px" : c.size,
                  fontWeight: c.weight,
                  letterSpacing: c.tracking,
                  textTransform: c.transform as React.CSSProperties["textTransform"],
                }}
              >
                DFYNE
              </span>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  ASPECT RATIOS                                                      */}
      {/* ================================================================== */}
      <DocSection id="ratios" title="Image aspect ratios">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {aspectRatios.map((r) => {
            const [w, h] = r.ratio.split(":").map(Number);
            return (
              <div key={r.label} className="flex flex-col gap-3">
                <div
                  className="w-full overflow-hidden rounded-[4px] border border-[#e8e8e8] bg-[#f5f5f5]"
                  style={{ aspectRatio: `${w} / ${h}` }}
                >
                  <div className="flex h-full items-center justify-center">
                    <span className="text-[11px] text-[#a0a0a0]">{r.ratio}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#1a1a1a]">{r.label}</p>
                  <code
                    className="text-[11px] text-[#8f8f8f]"
                    style={{ fontFamily: "ui-monospace, Menlo, monospace" }}
                  >
                    {r.css}
                  </code>
                  <p className="mt-0.5 text-[11px] text-[#a0a0a0]">{r.usage}</p>
                </div>
              </div>
            );
          })}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  SPACING                                                            */}
      {/* ================================================================== */}
      <DocSection id="spacing" title="Spacing">
        <div className="space-y-3">
          {spacingScale.map((s) => (
            <div key={s.label} className="flex items-center gap-5">
              <code
                className="w-[48px] shrink-0 text-[12px] text-[#8f8f8f]"
                style={{ fontFamily: "ui-monospace, Menlo, monospace" }}
              >
                {s.label}
              </code>
              <div
                className="h-[3px] rounded-full bg-[#1a1a1a]"
                style={{ width: s.value }}
              />
            </div>
          ))}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  BORDER RADIUS                                                      */}
      {/* ================================================================== */}
      <DocSection id="radius" title="Border radius">
        <div className="flex flex-wrap gap-10">
          {radiusScale.map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-4">
              <div
                className="h-[72px] w-[72px] border-2 border-[#1a1a1a] bg-[#f5f5f5]"
                style={{ borderRadius: r.value }}
              />
              <div className="text-center">
                <code
                  className="block text-[13px] text-[#1a1a1a]"
                  style={{ fontFamily: "ui-monospace, Menlo, monospace" }}
                >
                  {r.label}
                </code>
                <span className="mt-0.5 block text-[11px] text-[#a0a0a0]">{r.note}</span>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  SHADOWS                                                            */}
      {/* ================================================================== */}
      <DocSection id="shadows" title="Shadows">
        <div className="flex flex-wrap gap-12">
          {shadowScale.map((s) => (
            <div key={s.label} className="flex flex-col items-start gap-4">
              <div
                className="h-[80px] w-[140px] rounded-[8px] bg-white"
                style={{ boxShadow: s.value, border: "1px solid #f0f0f0" }}
              />
              <div>
                <p className="text-[14px] font-medium text-[#1a1a1a]">{s.label}</p>
                <p className="mt-0.5 text-[12px] text-[#8f8f8f]">{s.note}</p>
                <code
                  className="mt-1 block text-[11px] text-[#a0a0a0]"
                  style={{ fontFamily: "ui-monospace, Menlo, monospace" }}
                >
                  {s.value}
                </code>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  ICONS                                                              */}
      {/* ================================================================== */}
      <DocSection id="icons" title="Icons">
        <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
          {iconNames.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2.5 rounded-[6px] border border-[#e8e8e8] px-2 py-3 transition-colors hover:border-[#d0d0d0] hover:bg-[#fafafa]"
            >
              <Icon name={name} className="h-5 w-5 text-[#1a1a1a]" />
              <code
                className="text-center text-[9px] leading-tight text-[#a0a0a0]"
                style={{ fontFamily: "ui-monospace, Menlo, monospace" }}
              >
                {name}
              </code>
            </div>
          ))}
        </div>
      </DocSection>
    </>
  );
}
