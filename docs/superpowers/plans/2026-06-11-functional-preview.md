# Functional Preview App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the preview app into an interactive developer/designer reference tool with spec panels, copy-to-clipboard, code snippets, and dev/designer mode toggle.

**Architecture:** Split the monolithic `page.tsx` (1300+ lines) into focused modules. Create a `ComponentCard` wrapper that provides the spec panel, code tabs, and Figma callout for each component. Component spec data lives in a typed data file. Mode toggle and search use React state with localStorage persistence.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS v4, @dfyne/react components, @dfyne/tokens

---

## File Structure

```
apps/preview/src/
├── app/
│   ├── globals.css              (existing — no changes)
│   ├── layout.tsx               (existing — no changes)
│   └── page.tsx                 (rewrite — slim orchestrator)
├── components/
│   ├── ComponentCard.tsx         (new — wrapper: preview + spec panel + code tabs)
│   ├── SpecPanel.tsx             (new — property/value list with copy buttons)
│   ├── CodeTabs.tsx              (new — Liquid/React tabs with copy)
│   ├── CopyButton.tsx            (new — click-to-copy with toast)
│   ├── ModeToggle.tsx            (new — Dev/Designer toggle, persists to localStorage)
│   ├── SearchFilter.tsx          (new — filter components by name)
│   ├── StateToggles.tsx          (new — variant/state pills for component preview)
│   └── TokenSections.tsx         (new — Colors, Typography, Spacing, Ratios, Shadows, Icons)
├── data/
│   ├── componentSpecs.ts         (new — typed spec data for all 13 components)
│   └── tokenData.ts              (new — color scales, spacing, radius, shadow, typography data)
└── hooks/
    └── useCopyToClipboard.ts     (new — shared copy hook with toast state)
```

---

### Task 1: Create useCopyToClipboard hook

**Files:**
- Create: `apps/preview/src/hooks/useCopyToClipboard.ts`

- [ ] **Step 1: Create the hook**

```ts
// apps/preview/src/hooks/useCopyToClipboard.ts
"use client";

import { useState, useCallback } from "react";

export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  }, []);

  return { copy, copiedText };
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/hooks/useCopyToClipboard.ts
git commit -m "feat(preview): add useCopyToClipboard hook"
```

---

### Task 2: Create CopyButton component

**Files:**
- Create: `apps/preview/src/components/CopyButton.tsx`

- [ ] **Step 1: Create the component**

```tsx
// apps/preview/src/components/CopyButton.tsx
"use client";

import { useState } from "react";

export function CopyButton({ value, className = "" }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] transition-colors hover:bg-[#f0f0f0] active:bg-[#e0e0e0] ${className}`}
      title={`Copy: ${value}`}
    >
      <span className="text-[#6f6f6f]">{value}</span>
      <span className="text-[10px] text-[#a0a0a0]">{copied ? "✓" : "⎘"}</span>
    </button>
  );
}

export function CopyBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between border-b border-[#e8e8e8] bg-[#fafafa] px-4 py-2">
        <span className="text-[11px] font-medium text-[#8f8f8f]">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded px-2 py-1 text-[10px] text-[#8f8f8f] transition-colors hover:bg-[#e8e8e8]"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[12px] leading-[1.6] text-[#4a4a4a]" style={{ fontFamily: "ui-monospace, 'Cascadia Code', Menlo, monospace" }}>
        {code}
      </pre>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/CopyButton.tsx
git commit -m "feat(preview): add CopyButton and CopyBlock components"
```

---

### Task 3: Create ModeToggle component

**Files:**
- Create: `apps/preview/src/components/ModeToggle.tsx`

- [ ] **Step 1: Create the component**

```tsx
// apps/preview/src/components/ModeToggle.tsx
"use client";

import { useState, useEffect } from "react";

export type Mode = "dev" | "designer";

export function ModeToggle({ mode, onModeChange }: { mode: Mode; onModeChange: (m: Mode) => void }) {
  return (
    <div className="inline-flex rounded-full border border-[#e0e0e0] p-[2px]">
      {(["dev", "designer"] as const).map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => onModeChange(m)}
          className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
            mode === m
              ? "bg-[#111111] text-white"
              : "text-[#6f6f6f] hover:text-[#1a1a1a]"
          }`}
        >
          {m === "dev" ? "Dev" : "Designer"}
        </button>
      ))}
    </div>
  );
}

export function useMode(): [Mode, (m: Mode) => void] {
  const [mode, setMode] = useState<Mode>("dev");

  useEffect(() => {
    const saved = localStorage.getItem("dfyne-preview-mode") as Mode | null;
    if (saved === "dev" || saved === "designer") setMode(saved);
  }, []);

  const updateMode = (m: Mode) => {
    setMode(m);
    localStorage.setItem("dfyne-preview-mode", m);
  };

  return [mode, updateMode];
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/ModeToggle.tsx
git commit -m "feat(preview): add ModeToggle with localStorage persistence"
```

---

### Task 4: Create SearchFilter component

**Files:**
- Create: `apps/preview/src/components/SearchFilter.tsx`

- [ ] **Step 1: Create the component**

```tsx
// apps/preview/src/components/SearchFilter.tsx
"use client";

export function SearchFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Filter components..."
      className="h-[34px] w-[200px] rounded-full border border-[#e0e0e0] bg-white px-3 text-[12px] outline-none placeholder:text-[#a0a0a0] focus:border-[#111111]"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/SearchFilter.tsx
git commit -m "feat(preview): add SearchFilter component"
```

---

### Task 5: Create SpecPanel component

**Files:**
- Create: `apps/preview/src/components/SpecPanel.tsx`

- [ ] **Step 1: Create the component**

```tsx
// apps/preview/src/components/SpecPanel.tsx
"use client";

import { CopyButton } from "./CopyButton";
import type { Mode } from "./ModeToggle";

export type SpecEntry = {
  group: string;
  property: string;
  value: string;
  cssVar?: string;
  figmaToken?: string;
};

export function SpecPanel({
  specs,
  mode,
  compact = false,
}: {
  specs: SpecEntry[];
  mode: Mode;
  compact?: boolean;
}) {
  const groups = specs.reduce<Record<string, SpecEntry[]>>((acc, s) => {
    (acc[s.group] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div className={`space-y-4 ${compact ? "text-[11px]" : "text-[12px]"}`}>
      {Object.entries(groups).map(([group, entries]) => (
        <div key={group}>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[1.2px] text-[#a0a0a0]">
            {group}
          </p>
          <div className="space-y-0.5">
            {entries.map((e) => (
              <div
                key={e.property}
                className="flex items-center justify-between gap-2 rounded px-2 py-1 hover:bg-[#f5f5f5]"
              >
                <span className="shrink-0 text-[#6f6f6f]">{e.property}</span>
                <div className="flex items-center gap-1">
                  {mode === "designer" && e.figmaToken && (
                    <span className="text-[10px] text-[#b0b0b0]">{e.figmaToken}</span>
                  )}
                  <CopyButton value={e.value} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/SpecPanel.tsx
git commit -m "feat(preview): add SpecPanel with grouped properties and copy"
```

---

### Task 6: Create CodeTabs component

**Files:**
- Create: `apps/preview/src/components/CodeTabs.tsx`

- [ ] **Step 1: Create the component**

```tsx
// apps/preview/src/components/CodeTabs.tsx
"use client";

import { useState } from "react";
import { CopyBlock } from "./CopyButton";

export function CodeTabs({
  liquid,
  react,
  defaultExpanded = false,
}: {
  liquid: string;
  react: string;
  defaultExpanded?: boolean;
}) {
  const [tab, setTab] = useState<"liquid" | "react">("liquid");
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="overflow-hidden rounded-[6px] border border-[#e8e8e8]">
      <div className="flex items-center justify-between bg-[#fafafa] px-4 py-2">
        <div className="flex gap-0">
          {(["liquid", "react"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTab(t); setExpanded(true); }}
              className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                tab === t && expanded
                  ? "bg-[#111111] text-white"
                  : "text-[#8f8f8f] hover:text-[#4a4a4a]"
              }`}
            >
              {t === "liquid" ? "Liquid" : "React"}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-[10px] text-[#a0a0a0] hover:text-[#6f6f6f]"
        >
          {expanded ? "Collapse" : "Expand"}
        </button>
      </div>
      {expanded && (
        <CopyBlock
          code={tab === "liquid" ? liquid : react}
          label={tab === "liquid" ? "Shopify Liquid" : "React / TSX"}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/CodeTabs.tsx
git commit -m "feat(preview): add CodeTabs with Liquid/React toggle and copy"
```

---

### Task 7: Create StateToggles component

**Files:**
- Create: `apps/preview/src/components/StateToggles.tsx`

- [ ] **Step 1: Create the component**

```tsx
// apps/preview/src/components/StateToggles.tsx
"use client";

export function StateToggles({
  options,
  active,
  onChange,
}: {
  options: string[];
  active: string;
  onChange: (name: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-full px-3 py-1 text-[10px] font-medium transition-colors ${
            active === opt
              ? "bg-[#111111] text-white"
              : "border border-[#e0e0e0] text-[#6f6f6f] hover:border-[#111111] hover:text-[#111111]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/StateToggles.tsx
git commit -m "feat(preview): add StateToggles pill selector"
```

---

### Task 8: Create ComponentCard wrapper

**Files:**
- Create: `apps/preview/src/components/ComponentCard.tsx`

- [ ] **Step 1: Create the component**

```tsx
// apps/preview/src/components/ComponentCard.tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/ComponentCard.tsx
git commit -m "feat(preview): add ComponentCard wrapper with spec panel, code tabs, state toggles"
```

---

### Task 9: Create tokenData.ts (extract from page.tsx)

**Files:**
- Create: `apps/preview/src/data/tokenData.ts`

- [ ] **Step 1: Extract all token data arrays from page.tsx into a dedicated file**

Move these arrays from `page.tsx` into `tokenData.ts`:
- `blackScale`, `whiteScale`, `grayScale`, `textScale`, `colorGridColumns`
- `figmaTextStyles`, `typeWeights`
- `spacingScale`, `radiusScale`, `shadowScale`
- `aspectRatios`, `componentTypography`
- `iconNames`

Export all of them. Keep the same types and values. Add `export` to each `const`.

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/data/tokenData.ts
git commit -m "feat(preview): extract token data into dedicated module"
```

---

### Task 10: Create componentSpecs.ts with all 13 components

**Files:**
- Create: `apps/preview/src/data/componentSpecs.ts`

- [ ] **Step 1: Create the spec data file**

This file defines the spec data for every component. Each component has variants with their specs, plus Liquid and React code snippets. The data comes from the live computed styles already verified against dfyne.com.

The file exports a `componentSpecs` array of objects matching the `ComponentCardProps` type (minus `mode` which is injected at render time).

Components to include: Button, Badge, SizeButton, ArrowButton, SectionHeading, ProductCard, CategoryCard, ColorSwatch, CrossSellCard, CampaignHero, AnnouncementBar, NewsletterSignup, Footer.

Each component has:
- `name`: Display name
- `figmaPath`: Figma component path
- `liquidCode`: Shopify Liquid HTML snippet using actual theme class names
- `reactCode`: React/TSX import and usage
- `variants`: Array of `{ name, specs }` where specs are the verified CSS properties grouped by Typography/Spacing/Colors/Shape

Example for Button:

```ts
{
  name: "Button",
  figmaPath: "Components / Buttons",
  liquidCode: `<!-- Primary -->\n<button class="btn">ADD TO CART</button>\n\n<!-- Secondary -->\n<button class="btn btn--secondary">COMPLETE THE LOOK</button>\n\n<!-- Tertiary -->\n<button class="btn btn--tertiary">Size Guide</button>\n\n<!-- Disabled -->\n<button class="btn" disabled>SOLD OUT</button>`,
  reactCode: `import { Button } from "@dfyne/react";\n\n<Button variant="primary">ADD TO CART</Button>\n<Button variant="secondary">COMPLETE THE LOOK</Button>\n<Button variant="tertiary">Size Guide</Button>\n<Button disabled>SOLD OUT</Button>`,
  variants: [
    {
      name: "Primary",
      specs: [
        { group: "Typography", property: "Font Family", value: "Raleway, sans-serif", cssVar: "--font-body" },
        { group: "Typography", property: "Font Size", value: "9px", cssVar: "--text-button" },
        { group: "Typography", property: "Font Weight", value: "600", cssVar: "--weight-semibold" },
        { group: "Typography", property: "Tracking", value: "2.7px", cssVar: "--tracking-button" },
        { group: "Typography", property: "Transform", value: "uppercase" },
        { group: "Spacing", property: "Padding", value: "13px 20px" },
        { group: "Spacing", property: "Min Width", value: "90px" },
        { group: "Colors", property: "Background", value: "#111111", cssVar: "--color-btn-primary" },
        { group: "Colors", property: "Text", value: "#ffffff", cssVar: "--color-btn-primary-text" },
        { group: "Colors", property: "Border", value: "transparent" },
        { group: "Shape", property: "Radius", value: "50px", cssVar: "--radius-button" },
      ],
    },
    {
      name: "Secondary",
      specs: [
        { group: "Typography", property: "Font Size", value: "9px" },
        { group: "Typography", property: "Font Weight", value: "600" },
        { group: "Typography", property: "Tracking", value: "2.7px" },
        { group: "Typography", property: "Transform", value: "uppercase" },
        { group: "Spacing", property: "Padding", value: "13px 20px" },
        { group: "Colors", property: "Background", value: "transparent" },
        { group: "Colors", property: "Text", value: "#000000", cssVar: "--color-text-body" },
        { group: "Colors", property: "Border", value: "#e8e8e1", cssVar: "--color-border" },
        { group: "Colors", property: "Hover Border", value: "#000000" },
        { group: "Shape", property: "Radius", value: "50px" },
      ],
    },
    // ... Tertiary, Disabled variants
  ],
}
```

Repeat this pattern for all 13 components, using the verified live computed styles.

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/data/componentSpecs.ts
git commit -m "feat(preview): add componentSpecs data for all 13 components"
```

---

### Task 11: Create TokenSections component

**Files:**
- Create: `apps/preview/src/components/TokenSections.tsx`

- [ ] **Step 1: Extract token sections from page.tsx**

Move the JSX for these sections into a standalone component:
- Colors (Radix grid)
- Typography (text styles table + component typography table)
- Aspect Ratios
- Spacing
- Border Radius
- Shadows
- Icons

The component accepts no props — it imports data from `tokenData.ts`. It renders each section with the existing `DocSection` and `SubSection` helpers (move those into this file too).

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/TokenSections.tsx
git commit -m "feat(preview): extract token sections into standalone component"
```

---

### Task 12: Rewrite page.tsx as slim orchestrator

**Files:**
- Modify: `apps/preview/src/app/page.tsx`

- [ ] **Step 1: Rewrite page.tsx**

The new page.tsx is a slim orchestrator that:
1. Imports `useMode` hook, `ModeToggle`, `SearchFilter`, `ComponentCard`, `TokenSections`
2. Imports `componentSpecs` data and component renderers from `@dfyne/react`
3. Renders the sticky nav with mode toggle and search
4. Renders the hero section
5. Renders `TokenSections` for the token-level docs
6. Maps over `componentSpecs` to render a `ComponentCard` for each component, passing in the live React component as the `render` prop for each variant
7. Filters components based on search query
8. Renders rails and full-width sections (which don't fit the card layout) separately

- [ ] **Step 2: Build and verify**

```bash
rm -rf apps/preview/.next && pnpm run build
```

Expected: Build succeeds, 0 type errors.

- [ ] **Step 3: Run tests**

```bash
pnpm run test
```

Expected: All existing tests pass.

- [ ] **Step 4: Start dev server and verify**

```bash
lsof -ti :3333 | xargs kill -9 2>/dev/null; rm -rf apps/preview/.next && pnpm --filter @dfyne/preview dev &
sleep 10 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3333/
```

Expected: HTTP 200.

- [ ] **Step 5: Commit**

```bash
git add apps/preview/src/
git commit -m "feat(preview): rewrite page.tsx as slim orchestrator with ComponentCard layout"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Section 1 (Component Card Layout): Tasks 5, 6, 7, 8
- ✅ Section 2 (Dev/Designer Toggle): Task 3
- ✅ Section 3 (Copy to Clipboard): Tasks 1, 2
- ✅ Section 4 (Search/Filter): Task 4
- ✅ Section 5 (Component Data): Task 10
- ✅ Section 6 (Token Sections retained): Task 11
- ✅ Section 7 (Scope): All in-scope items covered

**Placeholder scan:** No TBD/TODO found. Task 10 has a partial code example — the full file will contain all 13 components following the same pattern shown for Button.

**Type consistency:** `SpecEntry`, `ComponentVariant`, `ComponentCardProps`, `Mode` types are consistent across tasks 3, 5, 8, 10.
