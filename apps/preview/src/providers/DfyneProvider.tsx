"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { client, isSanityConfigured } from "../sanity/client";
import { computeLineHeights, type LineHeightTokens, type TypographyInput } from "../lib/lineHeight";

type SiteContent = Record<string, unknown>;

type DfyneContextValue = {
  content: SiteContent | null;
  typography: LineHeightTokens | null;
  loading: boolean;
};

const DfyneContext = createContext<DfyneContextValue>({
  content: null,
  typography: null,
  loading: true,
});

const TYPOGRAPHY_DEFAULTS: TypographyInput = {
  baseRatio: 1.5,
  multipliers: { body: 1.0, heading: 0.82, ui: 0.75 },
};

export function DfyneProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [typography, setTypography] = useState<LineHeightTokens | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSanityConfigured) {
      setTypography(computeLineHeights(TYPOGRAPHY_DEFAULTS));
      setLoading(false);
      return;
    }
    Promise.all([
      client.fetch<SiteContent | null>(`*[_type == "siteContent"][0]`),
      client.fetch<TypographyInput | null>(
        `*[_type == "typographySettings"][0]{ baseRatio, multipliers }`
      ),
    ])
      .then(([contentData, typoData]) => {
        setContent(contentData);
        const input = typoData?.baseRatio ? typoData : TYPOGRAPHY_DEFAULTS;
        setTypography(computeLineHeights(input));
      })
      .catch(() => {
        setTypography(computeLineHeights(TYPOGRAPHY_DEFAULTS));
      })
      .finally(() => setLoading(false));
  }, []);

  // Inject line-height CSS custom properties
  useEffect(() => {
    if (!typography) return;
    const style = document.createElement("style");
    style.id = "dfyne-typography-tokens";
    style.textContent = `:root {\n${Object.entries(typography)
      .map(([key, value]) => `  ${key}: ${value.toFixed(4)};`)
      .join("\n")}\n}`;
    // Remove previous
    document.getElementById("dfyne-typography-tokens")?.remove();
    document.head.appendChild(style);
    return () => {
      document.getElementById("dfyne-typography-tokens")?.remove();
    };
  }, [typography]);

  return (
    <DfyneContext.Provider value={{ content, typography, loading }}>
      {children}
    </DfyneContext.Provider>
  );
}

export function useDfyneContext() {
  return useContext(DfyneContext);
}
