"use client";

import { useState } from "react";
import { SpecPanel } from "./SpecPanel";
import { CodeTabs } from "./CodeTabs";
import { StateToggles } from "./StateToggles";
import type { Mode } from "./ModeToggle";
import type { SpecEntry } from "./SpecPanel";

export type ComponentVariant = {
  name: string;
  render: React.ReactNode;
  specs: SpecEntry[];
};

export type ComponentCardProps = {
  name: string;
  figmaPath: string;
  liquidCode: string;
  reactCode: string;
  variants: ComponentVariant[];
  mode: Mode;
};

export function ComponentCard({
  name,
  figmaPath,
  liquidCode,
  reactCode,
  variants,
  mode,
}: ComponentCardProps) {
  const [activeVariant, setActiveVariant] = useState(variants[0]?.name ?? "");
  const current = variants.find((v) => v.name === activeVariant) ?? variants[0];

  const isDesigner = mode === "designer";

  return (
    <div id={`component-${name.toLowerCase().replace(/\s+/g, "-")}`} className="scroll-mt-16">
      <h3
        className="mb-4 text-[13px] font-medium text-[#6f6f6f]"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" }}
      >
        {name}
      </h3>
      <div className="overflow-hidden rounded-[8px] border border-[#e8e8e8]">
        {/* State toggles */}
        {variants.length > 1 && (
          <div className="border-b border-[#e8e8e8] bg-[#fafafa] px-5 py-3">
            <StateToggles
              options={variants.map((v) => v.name)}
              active={activeVariant}
              onChange={setActiveVariant}
            />
          </div>
        )}

        {/* Preview + Spec panel */}
        <div className="flex flex-col lg:flex-row">
          {/* Preview */}
          <div className="flex flex-1 items-center justify-center p-8">
            {current?.render}
          </div>

          {/* Spec panel */}
          {current && (
            <div className={`border-t border-[#e8e8e8] bg-[#fafafa] p-5 lg:w-[300px] lg:border-l lg:border-t-0 ${
              isDesigner ? "" : "lg:w-[260px]"
            }`}>
              <SpecPanel
                specs={current.specs}
                mode={mode}
                compact={!isDesigner}
              />
            </div>
          )}
        </div>

        {/* Code tabs */}
        <div className="border-t border-[#e8e8e8]">
          <CodeTabs
            liquid={liquidCode}
            react={reactCode}
            defaultExpanded={!isDesigner}
          />
        </div>

        {/* Figma callout */}
        <div className="flex items-center gap-2 border-t border-[#e8e8e8] bg-[#fafafa] px-5 py-2">
          <span className="text-[10px] text-[#a0a0a0]">Figma:</span>
          <span className="text-[11px] text-[#6f6f6f]">{figmaPath}</span>
        </div>
      </div>
    </div>
  );
}
