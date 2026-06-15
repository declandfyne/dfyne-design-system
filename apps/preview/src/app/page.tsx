"use client";

import { useState, useEffect, useCallback } from "react";
import { Sidebar } from "../components/Sidebar";
import { Toolbar } from "../components/Toolbar";
import type { TabName } from "../components/Toolbar";
import { Canvas } from "../components/Canvas";
import { CodePanel } from "../components/CodePanel";
import { PropsPanel } from "../components/PropsPanel";
import { TokenPage } from "../components/TokenPage";
import { UsageCard } from "../components/UsageCard";
import { renderComponent, isFullWidthComponent } from "../data/componentRenders";
import { componentSpecs } from "../data/componentSpecs";
import { highlightCode } from "../utils/highlightCode";
import { getControls } from "../data/componentControls";
import { usageGuidelines } from "../data/usageGuidelines";
import { getComponentTokens } from "../data/componentTokens";

const tokenPages = ["Colors", "Typography", "Spacing", "Glossary"];

function getInitialItem(): string {
  if (typeof window !== "undefined" && window.location.hash) {
    return decodeURIComponent(window.location.hash.slice(1)) || "Button";
  }
  return "Button";
}

export default function PreviewPage() {
  const [active, setActive] = useState("Button");
  const [tab, setTab] = useState<TabName>("canvas");
  const [darkCanvas, setDarkCanvas] = useState(false);
  const [propValues, setPropValues] = useState<Record<string, unknown>>({});

  // Initialize from hash on mount
  useEffect(() => {
    setActive(getInitialItem());
  }, []);

  // Sync hash
  useEffect(() => {
    window.location.hash = encodeURIComponent(active);
  }, [active]);

  // Reset prop values when component changes
  const handleSelect = useCallback((name: string) => {
    setActive(name);
    setTab("canvas");
    // Reset props to defaults
    const controls = getControls(name);
    if (controls) {
      const defaults: Record<string, unknown> = {};
      for (const [key, ctrl] of Object.entries(controls.props)) {
        defaults[key] = ctrl.default;
      }
      setPropValues(defaults);
    } else {
      setPropValues({});
    }
  }, []);

  const handlePropChange = (name: string, value: unknown) => {
    setPropValues((prev) => ({ ...prev, [name]: value }));
  };

  const isTokenPage = tokenPages.includes(active);
  const spec = componentSpecs.find((s) => s.name === active);
  const controls = getControls(active);
  const usage = usageGuidelines.find((g) => g.component === active);

  // Generate JSX string from current props
  const generateJsx = (): string => {
    if (!controls) return "";
    const propsStr = Object.entries(propValues)
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([k, v]) => {
        if (typeof v === "boolean") return v ? k : "";
        if (typeof v === "number") return `${k}={${v}}`;
        return `${k}="${v}"`;
      })
      .filter(Boolean)
      .join(" ");
    const tag = active.replace(/\s/g, "");
    if (propValues.children) {
      return `<${tag} ${propsStr}>${propValues.children}</${tag}>`;
    }
    return `<${tag} ${propsStr} />`;
  };

  const handleCopyJsx = async () => {
    const jsx = generateJsx();
    if (jsx) await navigator.clipboard.writeText(jsx);
  };

  // Token page: two-column layout (no props panel)
  if (isTokenPage) {
    return (
      <div className="layout-shell token-view">
        <Sidebar active={active} onSelect={handleSelect} />
        <TokenPage page={active} />
      </div>
    );
  }

  // Component page: three-column layout
  const firstVariantSpecs = spec?.variants[0]?.specs ?? [];

  return (
    <div className="layout-shell" suppressHydrationWarning>
      <Sidebar active={active} onSelect={handleSelect} />

      <div className="flex flex-col overflow-hidden">
        <Toolbar
          activeTab={tab}
          onTabChange={setTab}
          onCopyJsx={handleCopyJsx}
          darkCanvas={darkCanvas}
          onToggleCanvas={() => setDarkCanvas(!darkCanvas)}
        />

        {tab === "canvas" && (
          <>
            <Canvas dark={darkCanvas} fullWidth={isFullWidthComponent(active)}>
              {renderComponent(active, propValues)}
            </Canvas>
            {spec && (
              <CodePanel
                reactCode={spec.reactCode}
                liquidCode={spec.liquidCode}
                cssTokens={getComponentTokens(active)}
              />
            )}
          </>
        )}

        {tab === "docs" && spec && (
          <div className="flex-1 overflow-y-auto p-10" style={{ background: "var(--canvas-bg)" }}>
            <div className="mx-auto max-w-[700px]">
              <h2 className="mb-6 text-[18px] font-light text-white">{active}</h2>
              <div className="font-mono rounded-lg border p-4 text-[12px] leading-[1.7]" style={{ borderColor: "var(--border)", background: "var(--panel-bg)", color: "#8b949e" }}>
                <pre>{highlightCode(spec.reactCode, "react")}</pre>
              </div>
              {spec.liquidCode && (
                <div className="font-mono mt-4 rounded-lg border p-4 text-[12px] leading-[1.7]" style={{ borderColor: "var(--border)", background: "var(--panel-bg)", color: "#8b949e" }}>
                  <div className="mb-2 text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Liquid</div>
                  <pre>{highlightCode(spec.liquidCode, "liquid")}</pre>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "usage" && usage && (
          <div className="flex-1 overflow-y-auto p-10" style={{ background: "var(--canvas-bg)" }}>
            <div className="mx-auto max-w-[700px]">
              <UsageCard guideline={usage} />
            </div>
          </div>
        )}

        {tab === "usage" && !usage && (
          <div className="flex flex-1 items-center justify-center" style={{ background: "var(--canvas-bg)", color: "var(--text-muted)" }}>
            No usage guidelines for {active}
          </div>
        )}
      </div>

      <PropsPanel
        controls={controls}
        propValues={propValues}
        onPropChange={handlePropChange}
        specs={firstVariantSpecs}
        componentName={active}
      />
    </div>
  );
}
