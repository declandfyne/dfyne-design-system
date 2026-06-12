"use client";

import { GlossaryTable } from "./GlossaryTable";
import {
  blackScale,
  whiteScale,
  grayScale,
  textScale,
  figmaTextStyles,
  typeWeights,
  spacingScale,
  iconNames,
  glossaryEntries,
} from "../data/tokenData";
import type { ColorStep } from "../data/tokenData";
import { Icon } from "@dfyne/react";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="mb-6 text-[18px] font-light tracking-tight text-white">{title}</h2>
      {children}
    </div>
  );
}

function ColorScale({ label, steps }: { label: string; steps: ColorStep[] }) {
  return (
    <div className="mb-4">
      <div className="mb-2 text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>{label}</div>
      <div className="flex gap-1">
        {steps.map((step) => (
          <div key={step.label} className="group relative flex-1" style={{ height: 48, background: step.value, borderRadius: 4, border: "1px solid #333" }}>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-1 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="font-mono text-[9px]" style={{ color: step.textDark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)" }}>
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TokenPage({ page }: { page: string }) {
  return (
    <div className="h-full overflow-y-auto p-10" style={{ background: "var(--canvas-bg)" }}>
      <div className="mx-auto max-w-[900px]">
        {page === "Colors" && (
          <Section title="Colors">
            <ColorScale label="Black" steps={blackScale} />
            <ColorScale label="White" steps={whiteScale} />
            <ColorScale label="Gray" steps={grayScale} />
            <ColorScale label="Text" steps={textScale} />
          </Section>
        )}

        {page === "Typography" && (
          <Section title="Typography">
            <div className="space-y-3">
              {figmaTextStyles.map((style) => (
                <div key={style.name} className="flex items-baseline justify-between border-b py-2" style={{ borderColor: "var(--border-subtle)" }}>
                  <div>
                    <span className="text-white" style={{ fontSize: style.size, fontWeight: style.weight, fontFamily: "'Raleway', sans-serif" }}>
                      {style.sample}
                    </span>
                  </div>
                  <div className="font-mono shrink-0 text-[11px]" style={{ color: "var(--text-muted)" }}>
                    {style.name} · {style.size} / {style.weight}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {page === "Spacing" && (
          <Section title="Spacing">
            <div className="space-y-2">
              {spacingScale.map((s) => (
                <div key={s.label} className="flex items-center gap-4">
                  <div className="font-mono w-[60px] shrink-0 text-right text-[11px]" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </div>
                  <div
                    className="rounded-sm"
                    style={{ width: s.value, height: 16, background: "#333", minWidth: 2 }}
                  />
                </div>
              ))}
            </div>
          </Section>
        )}

        {page === "Glossary" && (
          <Section title="Token Glossary">
            <GlossaryTable entries={glossaryEntries} />
          </Section>
        )}
      </div>
    </div>
  );
}
