# Preview App Storybook-Style Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the preview app from a scrolling doc page into a three-panel Storybook-style tool with live prop controls, copy-paste code, and dark theme.

**Architecture:** Single-page app with URL-hash routing. Left sidebar for navigation, center canvas for component rendering, right panel for prop controls/API/specs. Dark theme (#0e0e0e background) with components rendered on white cards. All existing data files (componentSpecs, tokenData, usageGuidelines, tokenGlossary) stay unchanged — only the presentation layer is rewritten.

**Tech Stack:** Next.js 15, React 19, Tailwind v4, TypeScript

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `apps/preview/src/app/globals.css` | Rewrite | Dark theme base styles, panel layout utilities |
| `apps/preview/src/app/page.tsx` | Rewrite | Shell: hash routing, three-panel layout, state management |
| `apps/preview/src/data/componentControls.ts` | Create | Prop control definitions for each component (type, options, defaults) |
| `apps/preview/src/data/componentRenders.tsx` | Create | Maps component name + props → live React render (extracted from current page.tsx) |
| `apps/preview/src/components/Sidebar.tsx` | Create | Nav sidebar with search + grouped component list |
| `apps/preview/src/components/Toolbar.tsx` | Create | Tab bar (Canvas/Docs/Usage) + copy JSX button + bg toggle |
| `apps/preview/src/components/Canvas.tsx` | Create | Component render area with white card on dark background |
| `apps/preview/src/components/CodePanel.tsx` | Create | Syntax-highlighted code tabs (React/Liquid/CSS Tokens) with copy |
| `apps/preview/src/components/PropsPanel.tsx` | Create | Right sidebar: controls + API table + specs |
| `apps/preview/src/components/ControlInput.tsx` | Create | Individual prop control (select/toggle/text input/number input) |
| `apps/preview/src/components/TokenPage.tsx` | Create | Full-width dark-themed token documentation (replaces TokenSections for token views) |

Files to delete after rewrite:
- `apps/preview/src/components/ComponentCard.tsx`
- `apps/preview/src/components/StateToggles.tsx`
- `apps/preview/src/components/ModeToggle.tsx`
- `apps/preview/src/components/SearchFilter.tsx`

Files kept unchanged:
- `apps/preview/src/data/componentSpecs.ts`
- `apps/preview/src/data/tokenData.ts`
- `apps/preview/src/data/usageGuidelines.ts`
- `apps/preview/src/data/tokenGlossary.ts`
- `apps/preview/src/components/CopyButton.tsx`
- `apps/preview/src/components/CopyAsDropdown.tsx`
- `apps/preview/src/components/GlossaryTable.tsx`
- `apps/preview/src/components/UsageCard.tsx`
- `apps/preview/src/components/SpecPanel.tsx`
- `apps/preview/src/app/layout.tsx`

---

### Task 1: Dark Theme Global Styles

**Files:**
- Rewrite: `apps/preview/src/app/globals.css`

- [ ] **Step 1: Rewrite globals.css**

```css
@import "tailwindcss";
@source "../../../../packages/react/src/**/*.tsx";
@import "@dfyne/tokens/css";

:root {
  --panel-bg: #141414;
  --canvas-bg: #0e0e0e;
  --border: #222222;
  --border-subtle: #1e1e1e;
  --text-primary: #e0e0e0;
  --text-secondary: #888888;
  --text-muted: #555555;
  --text-accent: #ffffff;
  --input-bg: #1a1a1a;
  --input-border: #2a2a2a;
  --hover-bg: #1a1a1a;
  --active-bg: #1f1f1f;
  --sidebar-width: 240px;
  --props-width: 300px;
  --toolbar-height: 44px;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  background: var(--canvas-bg);
  color: var(--text-primary);
}

/* Monospace font stack */
.font-mono {
  font-family: "SF Mono", "Cascadia Code", "Fira Code", ui-monospace, monospace;
}

/* Scrollbar hiding */
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }

/* Three-panel layout */
.layout-shell {
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr var(--props-width);
  height: 100vh;
  overflow: hidden;
}

/* Token page layout (no props panel) */
.layout-shell.token-view {
  grid-template-columns: var(--sidebar-width) 1fr;
}
```

- [ ] **Step 2: Verify dev server starts**

Run: `pnpm --filter @dfyne/preview dev`
Expected: Server starts on port 3333 (page will look broken since page.tsx hasn't been rewritten yet — that's fine).

- [ ] **Step 3: Commit**

```bash
git add apps/preview/src/app/globals.css
git commit -m "style(preview): rewrite globals.css with dark theme variables"
```

---

### Task 2: Component Controls Data

**Files:**
- Create: `apps/preview/src/data/componentControls.ts`

- [ ] **Step 1: Create the controls data file**

```typescript
export type PropControl =
  | { type: "enum"; options: string[]; default: string }
  | { type: "boolean"; default: boolean }
  | { type: "string"; default: string }
  | { type: "number"; default: number };

export type ComponentControlDef = {
  component: string;
  props: Record<string, PropControl>;
};

export const componentControls: ComponentControlDef[] = [
  {
    component: "Button",
    props: {
      variant: { type: "enum", options: ["primary", "secondary", "tertiary", "ghost"], default: "primary" },
      disabled: { type: "boolean", default: false },
      children: { type: "string", default: "ADD TO CART" },
    },
  },
  {
    component: "Badge",
    props: {
      text: { type: "string", default: "NEW" },
      variant: { type: "enum", options: ["custom", "sold-out", "bottom"], default: "custom" },
      position: { type: "enum", options: ["inline", "top-right", "bottom-left"], default: "inline" },
    },
  },
  {
    component: "Size Button",
    props: {
      label: { type: "string", default: "M" },
      selected: { type: "boolean", default: false },
      soldOut: { type: "boolean", default: false },
    },
  },
  {
    component: "Arrow Button",
    props: {
      direction: { type: "enum", options: ["left", "right"], default: "right" },
      variant: { type: "enum", options: ["default", "edge"], default: "default" },
      disabled: { type: "boolean", default: false },
    },
  },
  {
    component: "Section Heading",
    props: {
      eyebrow: { type: "string", default: "JUST LANDED" },
      title: { type: "string", default: "NEW IN WOMEN" },
    },
  },
  {
    component: "Product Card",
    props: {
      name: { type: "string", default: "Impact Longsleeve Top" },
      color: { type: "string", default: "Pebble Grey" },
      price: { type: "number", default: 52.2 },
      badge: { type: "string", default: "NEW" },
    },
  },
  {
    component: "Category Card",
    props: {
      title: { type: "string", default: "IMPACT" },
      caption: { type: "string", default: "High Support" },
    },
  },
  {
    component: "Color Swatch",
    props: {
      label: { type: "string", default: "Midnight Black" },
      selected: { type: "boolean", default: true },
      isNew: { type: "boolean", default: false },
    },
  },
  {
    component: "Cross-Sell Card",
    props: {
      name: { type: "string", default: 'Impact Shorts | 4.5"' },
      color: { type: "string", default: "Midnight Black" },
      price: { type: "number", default: 49 },
    },
  },
  {
    component: "Campaign Hero",
    props: {
      caption: { type: "string", default: "NEW STYLES, NEW STRENGTH" },
      heading: { type: "string", default: "IMPACT" },
    },
  },
  {
    component: "Announcement Bar",
    props: {
      interval: { type: "number", default: 4000 },
    },
  },
  {
    component: "Newsletter Signup",
    props: {},
  },
  {
    component: "Footer",
    props: {},
  },
  {
    component: "Icon",
    props: {
      name: { type: "enum", options: ["check", "star", "menu", "user", "search", "cart", "arrow-left", "arrow-right", "chevron-right", "chevron-down", "close", "pause", "play", "support", "mail", "package", "reward", "calendar", "instagram"], default: "cart" },
    },
  },
];

export function getControls(componentName: string): ComponentControlDef | undefined {
  return componentControls.find((c) => c.component === componentName);
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/data/componentControls.ts
git commit -m "feat(preview): add component prop controls data"
```

---

### Task 3: Component Renders (extracted from page.tsx)

**Files:**
- Create: `apps/preview/src/data/componentRenders.tsx`

- [ ] **Step 1: Create the render function**

This file extracts the `getVariantRenders` logic from page.tsx but makes it dynamic — it takes a props object and returns a React node based on current prop values.

```typescript
"use client";

import {
  Icon,
  Badge,
  SectionHeading,
  Button,
  ArrowButton,
  ProductCard,
  CategoryCard,
  ColorSwatch,
  SizeButton,
  CrossSellCard,
  CampaignHero,
  AnnouncementBar,
  NewsletterSignup,
  Footer,
} from "@dfyne/react";

/**
 * Renders a component with the given props from the controls panel.
 * Returns null if component name is not recognized.
 */
export function renderComponent(
  name: string,
  props: Record<string, unknown>,
): React.ReactNode {
  switch (name) {
    case "Button":
      return (
        <Button
          variant={(props.variant as "primary" | "secondary" | "tertiary" | "ghost") ?? "primary"}
          disabled={props.disabled as boolean}
        >
          {(props.children as string) ?? "ADD TO CART"}
        </Button>
      );

    case "Badge":
      return (
        <Badge
          text={(props.text as string) ?? "NEW"}
          variant={(props.variant as "custom" | "sold-out" | "bottom") ?? "custom"}
          position={(props.position as "inline" | "top-right" | "bottom-left") ?? "inline"}
        />
      );

    case "Size Button":
      return (
        <SizeButton
          label={(props.label as string) ?? "M"}
          selected={(props.selected as boolean) ?? false}
          soldOut={(props.soldOut as boolean) ?? false}
          onClick={() => {}}
        />
      );

    case "Arrow Button":
      return (
        <ArrowButton
          direction={(props.direction as "left" | "right") ?? "right"}
          variant={(props.variant as "default" | "edge") ?? "default"}
          disabled={props.disabled as boolean}
        />
      );

    case "Section Heading":
      return (
        <SectionHeading
          eyebrow={(props.eyebrow as string) ?? "JUST LANDED"}
          title={(props.title as string) ?? "NEW IN WOMEN"}
        />
      );

    case "Product Card":
      return (
        <ProductCard
          image="https://placehold.co/394x492/f2f2f2/1c1d1d?text=Impact+Top"
          name={(props.name as string) ?? "Impact Longsleeve Top"}
          color={(props.color as string) ?? "Pebble Grey"}
          price={(props.price as number) ?? 52.2}
          rating={4.8}
          reviewCount={52866}
          badge={(props.badge as string) ?? ""}
        />
      );

    case "Category Card":
      return (
        <div style={{ width: 280 }}>
          <CategoryCard
            image="https://placehold.co/600x781/1c1d1d/ffffff?text=IMPACT"
            title={(props.title as string) ?? "IMPACT"}
            href="#"
            caption={(props.caption as string) ?? "High Support"}
          />
        </div>
      );

    case "Color Swatch":
      return (
        <ColorSwatch
          image="https://placehold.co/132x198/1c1d1d/ffffff"
          label={(props.label as string) ?? "Midnight Black"}
          selected={(props.selected as boolean) ?? true}
          isNew={(props.isNew as boolean) ?? false}
          onClick={() => {}}
        />
      );

    case "Cross-Sell Card":
      return (
        <CrossSellCard
          image="https://placehold.co/246x308/f2f2f2/1c1d1d?text=Shorts"
          name={(props.name as string) ?? 'Impact Shorts | 4.5"'}
          color={(props.color as string) ?? "Midnight Black"}
          price={(props.price as number) ?? 49}
        />
      );

    case "Campaign Hero":
      return (
        <div style={{ width: "100%" }}>
          <CampaignHero
            image="https://placehold.co/1920x1080/1c1d1d/ffffff?text=CAMPAIGN+HERO"
            caption={(props.caption as string) ?? "NEW STYLES, NEW STRENGTH"}
            heading={(props.heading as string) ?? "IMPACT"}
            cta={{ label: "SHOP NOW", href: "#" }}
            secondaryCta={{ label: "EXPLORE", href: "#" }}
          />
        </div>
      );

    case "Announcement Bar":
      return (
        <div style={{ width: "100%" }}>
          <AnnouncementBar
            slides={[
              { text: "HASSLE-FREE RETURNS", detail: "100-day free returns*" },
              { text: "FREE TRACKED DELIVERY", detail: "On orders over £30" },
            ]}
            interval={(props.interval as number) ?? 4000}
          />
        </div>
      );

    case "Newsletter Signup":
      return (
        <div style={{ width: "100%" }}>
          <NewsletterSignup onSubmit={() => {}} />
        </div>
      );

    case "Footer":
      return (
        <div style={{ width: "100%" }}>
          <Footer
            columns={[
              { heading: "Account", links: ["Login", "Register", "Rewards", "Track My Order"] },
              { heading: "About", links: ["About", "Careers", "Sustainability"] },
              { heading: "Contact", links: ["Contact Us", "Privacy Policy", "Terms & Conditions"] },
              { heading: "Delivery & Returns", links: ["Shipping", "Returns", "International"] },
            ]}
          />
        </div>
      );

    case "Icon":
      return <Icon name={(props.name as string) ?? "cart"} className="h-8 w-8" />;

    default:
      return null;
  }
}

/** Check if a component needs full width (sections that span the viewport) */
export function isFullWidthComponent(name: string): boolean {
  return ["Campaign Hero", "Announcement Bar", "Newsletter Signup", "Footer"].includes(name);
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/data/componentRenders.tsx
git commit -m "feat(preview): extract component renders with dynamic prop support"
```

---

### Task 4: Sidebar Component

**Files:**
- Create: `apps/preview/src/components/Sidebar.tsx`

- [ ] **Step 1: Create the sidebar**

```typescript
"use client";

import { useState } from "react";

type SidebarGroup = {
  label: string;
  items: string[];
};

const groups: SidebarGroup[] = [
  { label: "Primitives", items: ["Button", "Badge", "Icon", "Section Heading", "Arrow Button"] },
  { label: "Cards", items: ["Product Card", "Category Card", "Color Swatch", "Size Button", "Cross-Sell Card"] },
  { label: "Sections", items: ["Campaign Hero", "Announcement Bar", "Newsletter Signup", "Footer"] },
  { label: "Tokens", items: ["Colors", "Typography", "Spacing", "Glossary"] },
];

export function Sidebar({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (name: string) => void;
}) {
  const [search, setSearch] = useState("");

  const filteredGroups = groups
    .map((g) => ({
      ...g,
      items: g.items.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <nav className="flex h-full flex-col overflow-y-auto border-r bg-[var(--panel-bg)]" style={{ borderColor: "var(--border)" }}>
      {/* Header */}
      <div className="border-b px-4 pb-3 pt-5" style={{ borderColor: "var(--border)" }}>
        <div className="text-[11px] font-bold tracking-[3px] text-white">DFYNE</div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-3 w-full rounded-md border px-2.5 py-[7px] text-[12px] outline-none"
          style={{
            background: "var(--input-bg)",
            borderColor: "var(--input-border)",
            color: "var(--text-secondary)",
          }}
        />
      </div>

      {/* Groups */}
      <div className="flex-1 overflow-y-auto py-2">
        {filteredGroups.map((group) => (
          <div key={group.label} className="py-3">
            <div
              className="px-4 pb-1.5 text-[10px] font-semibold uppercase tracking-[1.5px]"
              style={{ color: "var(--text-muted)" }}
            >
              {group.label}
            </div>
            {group.items.map((item) => {
              const isActive = item === active;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onSelect(item)}
                  className="flex w-full items-center gap-2 py-[6px] pl-6 pr-4 text-left text-[13px] transition-colors"
                  style={{
                    color: isActive ? "var(--text-accent)" : "var(--text-secondary)",
                    background: isActive ? "var(--active-bg)" : "transparent",
                    borderLeft: isActive ? "2px solid #fff" : "2px solid transparent",
                    paddingLeft: isActive ? "22px" : "24px",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: isActive ? "#fff" : "#333" }}
                  />
                  {item}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/Sidebar.tsx
git commit -m "feat(preview): add Sidebar navigation component"
```

---

### Task 5: Toolbar Component

**Files:**
- Create: `apps/preview/src/components/Toolbar.tsx`

- [ ] **Step 1: Create the toolbar**

```typescript
"use client";

export type TabName = "canvas" | "docs" | "usage";

export function Toolbar({
  activeTab,
  onTabChange,
  onCopyJsx,
  darkCanvas,
  onToggleCanvas,
}: {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
  onCopyJsx: () => void;
  darkCanvas: boolean;
  onToggleCanvas: () => void;
}) {
  const tabs: { id: TabName; label: string }[] = [
    { id: "canvas", label: "Canvas" },
    { id: "docs", label: "Docs" },
    { id: "usage", label: "Usage" },
  ];

  return (
    <div
      className="flex shrink-0 items-center justify-between border-b px-5"
      style={{
        height: "var(--toolbar-height)",
        background: "var(--panel-bg)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className="flex items-center px-3.5 text-[12px] transition-colors"
            style={{
              height: "var(--toolbar-height)",
              color: activeTab === tab.id ? "#fff" : "var(--text-muted)",
              borderBottom: activeTab === tab.id ? "2px solid #fff" : "2px solid transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleCanvas}
          className="rounded-md border px-2.5 py-[5px] text-[11px] transition-colors hover:border-[#444] hover:text-[#ccc]"
          style={{
            background: "var(--input-bg)",
            borderColor: "var(--input-border)",
            color: "var(--text-secondary)",
          }}
        >
          {darkCanvas ? "Light" : "Dark"}
        </button>
        <button
          type="button"
          onClick={onCopyJsx}
          className="rounded-md border px-2.5 py-[5px] text-[11px] text-white transition-colors hover:bg-[#333]"
          style={{
            background: "#222",
            borderColor: "#444",
          }}
        >
          ⌘C Copy JSX
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/Toolbar.tsx
git commit -m "feat(preview): add Toolbar component with tabs and copy button"
```

---

### Task 6: Canvas Component

**Files:**
- Create: `apps/preview/src/components/Canvas.tsx`

- [ ] **Step 1: Create the canvas**

```typescript
"use client";

export function Canvas({
  children,
  dark,
  fullWidth,
}: {
  children: React.ReactNode;
  dark: boolean;
  fullWidth?: boolean;
}) {
  return (
    <div
      className="flex flex-1 items-center justify-center overflow-auto p-10"
      style={{ background: dark ? "var(--canvas-bg)" : "#e8e8e8" }}
    >
      {fullWidth ? (
        <div className="w-full max-w-[1200px]">{children}</div>
      ) : (
        <div
          className="flex flex-col items-center gap-6 rounded-xl bg-white px-16 py-12"
          style={{ minWidth: 300, boxShadow: "0 0 0 1px rgba(255,255,255,0.05)" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/Canvas.tsx
git commit -m "feat(preview): add Canvas component for component rendering"
```

---

### Task 7: ControlInput Component

**Files:**
- Create: `apps/preview/src/components/ControlInput.tsx`

- [ ] **Step 1: Create the control input**

```typescript
"use client";

import type { PropControl } from "../data/componentControls";

export function ControlInput({
  name,
  control,
  value,
  onChange,
}: {
  name: string;
  control: PropControl;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const inputStyle = {
    background: "var(--input-bg)",
    borderColor: "var(--input-border)",
    color: "#ccc",
  };

  switch (control.type) {
    case "enum":
      return (
        <div className="flex items-center justify-between py-[5px]">
          <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{name}</span>
          <select
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="font-mono rounded border px-2 py-1 text-[11px]"
            style={inputStyle}
          >
            {control.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );

    case "boolean":
      return (
        <div className="flex items-center justify-between py-[5px]">
          <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{name}</span>
          <button
            type="button"
            onClick={() => onChange(!(value as boolean))}
            className="relative h-[18px] w-[32px] rounded-full transition-colors"
            style={{ background: value ? "#fff" : "#2a2a2a" }}
          >
            <span
              className="absolute top-[2px] h-[14px] w-[14px] rounded-full transition-all"
              style={{
                left: value ? 16 : 2,
                background: value ? "#111" : "#666",
              }}
            />
          </button>
        </div>
      );

    case "string":
      return (
        <div className="flex items-center justify-between py-[5px]">
          <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{name}</span>
          <input
            type="text"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="font-mono w-[140px] rounded border px-2 py-1 text-[11px]"
            style={inputStyle}
          />
        </div>
      );

    case "number":
      return (
        <div className="flex items-center justify-between py-[5px]">
          <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{name}</span>
          <input
            type="number"
            value={value as number}
            onChange={(e) => onChange(Number(e.target.value))}
            className="font-mono w-[100px] rounded border px-2 py-1 text-[11px]"
            style={inputStyle}
          />
        </div>
      );
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/ControlInput.tsx
git commit -m "feat(preview): add ControlInput for live prop editing"
```

---

### Task 8: CodePanel Component

**Files:**
- Create: `apps/preview/src/components/CodePanel.tsx`

- [ ] **Step 1: Create the code panel**

```typescript
"use client";

import { useState } from "react";

export function CodePanel({
  reactCode,
  liquidCode,
  cssTokens,
}: {
  reactCode: string;
  liquidCode: string;
  cssTokens?: string;
}) {
  const [tab, setTab] = useState<"react" | "liquid" | "tokens">("react");
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const code = tab === "react" ? reactCode : tab === "liquid" ? liquidCode : (cssTokens ?? "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const tabs = [
    { id: "react" as const, label: "React" },
    { id: "liquid" as const, label: "Liquid" },
    { id: "tokens" as const, label: "CSS Tokens" },
  ];

  return (
    <div className="shrink-0 border-t" style={{ borderColor: "var(--border)", background: "var(--panel-bg)" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between border-b px-4"
        style={{ height: 36, borderColor: "var(--border-subtle)" }}
      >
        <div className="flex">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className="flex items-center px-3 text-[11px]"
              style={{
                height: 36,
                color: tab === t.id ? "var(--text-secondary)" : "var(--text-muted)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded border px-2 py-[3px] text-[10px] transition-colors hover:border-[#444] hover:text-[#aaa]"
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--input-border)",
              color: "var(--text-muted)",
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="px-1 text-[12px]"
            style={{ color: "var(--text-muted)" }}
          >
            {collapsed ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {/* Code body */}
      {!collapsed && (
        <pre
          className="font-mono overflow-x-auto px-4 py-3 text-[12px] leading-[1.7]"
          style={{ color: "#8b949e", maxHeight: 140 }}
        >
          {code}
        </pre>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/CodePanel.tsx
git commit -m "feat(preview): add CodePanel with React/Liquid/CSS tabs and copy"
```

---

### Task 9: PropsPanel Component

**Files:**
- Create: `apps/preview/src/components/PropsPanel.tsx`

- [ ] **Step 1: Create the props panel**

```typescript
"use client";

import { ControlInput } from "./ControlInput";
import type { ComponentControlDef } from "../data/componentControls";
import type { SpecEntry } from "./SpecPanel";

type PropApiEntry = {
  name: string;
  type: string;
  typeColor: string;
  typeBg: string;
  defaultVal: string;
};

function getApiEntries(controls: ComponentControlDef): PropApiEntry[] {
  const colorMap: Record<string, { color: string; bg: string }> = {
    enum: { color: "#7ee787", bg: "#1a2a1a" },
    boolean: { color: "#ff7b72", bg: "#2a1a1a" },
    string: { color: "#79c0ff", bg: "#1a2332" },
    number: { color: "#e3b341", bg: "#2a2a1a" },
  };

  return Object.entries(controls.props).map(([name, ctrl]) => ({
    name,
    type: ctrl.type,
    typeColor: colorMap[ctrl.type]?.color ?? "#888",
    typeBg: colorMap[ctrl.type]?.bg ?? "#1a1a1a",
    defaultVal: JSON.stringify(ctrl.default),
  }));
}

export function PropsPanel({
  controls,
  propValues,
  onPropChange,
  specs,
}: {
  controls: ComponentControlDef | undefined;
  propValues: Record<string, unknown>;
  onPropChange: (name: string, value: unknown) => void;
  specs: SpecEntry[];
}) {
  const sectionTitle = "text-[10px] font-semibold uppercase tracking-[1px] mb-2.5";

  return (
    <div
      className="flex h-full flex-col overflow-y-auto border-l"
      style={{ background: "var(--panel-bg)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div
        className="shrink-0 border-b px-4 py-3 text-[11px] font-semibold uppercase tracking-[1px]"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        Controls
      </div>

      {/* Props Controls */}
      {controls && Object.keys(controls.props).length > 0 && (
        <div className="border-b px-4 py-3" style={{ borderColor: "var(--border-subtle)" }}>
          <div className={sectionTitle} style={{ color: "var(--text-muted)" }}>Props</div>
          {Object.entries(controls.props).map(([name, ctrl]) => (
            <ControlInput
              key={name}
              name={name}
              control={ctrl}
              value={propValues[name] ?? ctrl.default}
              onChange={(val) => onPropChange(name, val)}
            />
          ))}
        </div>
      )}

      {/* API Table */}
      {controls && Object.keys(controls.props).length > 0 && (
        <div className="border-b px-4 py-3" style={{ borderColor: "var(--border-subtle)" }}>
          <div className={sectionTitle} style={{ color: "var(--text-muted)" }}>API</div>
          {/* Header row */}
          <div className="mb-1 grid grid-cols-[1fr_60px_1fr] gap-2 border-b pb-1.5" style={{ borderColor: "var(--border)" }}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--text-muted)" }}>Prop</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--text-muted)" }}>Type</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.5px]" style={{ color: "var(--text-muted)" }}>Default</span>
          </div>
          {getApiEntries(controls).map((entry) => (
            <div
              key={entry.name}
              className="grid grid-cols-[1fr_60px_1fr] items-center gap-2 border-b py-[7px]"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <span className="font-mono text-[12px] text-[#ccc]">{entry.name}</span>
              <span
                className="inline-block rounded px-1.5 py-[2px] text-[10px]"
                style={{ background: entry.typeBg, color: entry.typeColor, fontFamily: "inherit" }}
              >
                {entry.type}
              </span>
              <span className="font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>
                {entry.defaultVal}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Specs */}
      {specs.length > 0 && (
        <div className="px-4 py-3">
          <div className={sectionTitle} style={{ color: "var(--text-muted)" }}>Specs</div>
          {specs.map((spec) => (
            <div
              key={`${spec.group}-${spec.property}`}
              className="flex items-center justify-between border-b py-1"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                {spec.property}
              </span>
              <span className="font-mono flex items-center gap-1.5 text-[11px]" style={{ color: "#aaa" }}>
                {spec.group === "Colors" && (
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-sm border"
                    style={{ background: spec.value, borderColor: "#333" }}
                  />
                )}
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/PropsPanel.tsx
git commit -m "feat(preview): add PropsPanel with controls, API table, and specs"
```

---

### Task 10: TokenPage Component

**Files:**
- Create: `apps/preview/src/components/TokenPage.tsx`

- [ ] **Step 1: Create the token page**

This is a simplified dark-themed token view. It reuses the GlossaryTable for the glossary page and renders token-specific content for Colors, Typography, and Spacing.

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/TokenPage.tsx
git commit -m "feat(preview): add dark-themed TokenPage for token views"
```

---

### Task 11: Rewrite page.tsx — The Shell

**Files:**
- Rewrite: `apps/preview/src/app/page.tsx`

- [ ] **Step 1: Rewrite page.tsx**

This is the main shell that ties everything together. It manages state for: selected component, active tab, prop values, and dark canvas toggle.

```typescript
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
import { getControls } from "../data/componentControls";
import { usageGuidelines } from "../data/usageGuidelines";

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
  const [darkCanvas, setDarkCanvas] = useState(true);
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
              />
            )}
          </>
        )}

        {tab === "docs" && spec && (
          <div className="flex-1 overflow-y-auto p-10" style={{ background: "var(--canvas-bg)" }}>
            <div className="mx-auto max-w-[700px]">
              <h2 className="mb-6 text-[18px] font-light text-white">{active}</h2>
              <div className="font-mono rounded-lg border p-4 text-[12px]" style={{ borderColor: "var(--border)", background: "var(--panel-bg)", color: "#8b949e" }}>
                <pre>{spec.reactCode}</pre>
              </div>
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
      />
    </div>
  );
}
```

- [ ] **Step 2: Delete obsolete components**

Delete these files that are no longer used:
- `apps/preview/src/components/ComponentCard.tsx`
- `apps/preview/src/components/StateToggles.tsx`
- `apps/preview/src/components/ModeToggle.tsx`
- `apps/preview/src/components/SearchFilter.tsx`

- [ ] **Step 3: Verify dev server works**

Run: `pnpm --filter @dfyne/preview dev`
Open http://localhost:3333 — verify:
- Three-panel dark layout renders
- Sidebar shows grouped components
- Clicking Button shows it on white canvas
- Prop controls update the canvas live
- Code panel shows React/Liquid code
- Token pages (Colors, Typography, Spacing, Glossary) render in full-width mode
- URL hash updates when switching components

- [ ] **Step 4: Verify build succeeds**

Run: `pnpm --filter @dfyne/preview build`
Expected: Builds successfully

- [ ] **Step 5: Commit**

```bash
git add apps/preview/src/app/page.tsx apps/preview/src/components/TokenPage.tsx
git rm apps/preview/src/components/ComponentCard.tsx apps/preview/src/components/StateToggles.tsx apps/preview/src/components/ModeToggle.tsx apps/preview/src/components/SearchFilter.tsx
git commit -m "feat(preview): rewrite to Storybook-style three-panel layout with dark theme"
```

---

### Task 12: Restyle UsageCard for Dark Theme

**Files:**
- Modify: `apps/preview/src/components/UsageCard.tsx`

- [ ] **Step 1: Update UsageCard colors for dark theme**

The existing UsageCard uses light theme colors (#e8e8e8 borders, white bg, #1a1a1a text). Update all color references to use the dark theme CSS variables:

- Border: `var(--border)` instead of `#e8e8e8`
- Background: `var(--panel-bg)` instead of white
- Text primary: `var(--text-primary)` instead of `#1a1a1a`
- Text secondary: `var(--text-secondary)` instead of `#6f6f6f`
- Text body: `var(--text-primary)` instead of `#333`
- Section borders: `var(--border-subtle)` instead of `#e8e8e8`
- Keep green (#4caf50) and red (#f44336) as-is — they work on dark backgrounds

Read the current file, then replace all hardcoded light-theme colors with CSS variable equivalents.

- [ ] **Step 2: Verify it renders correctly on dark background**

Open http://localhost:3333, select Button, click "Usage" tab. Verify the card renders properly with dark theme colors.

- [ ] **Step 3: Commit**

```bash
git add apps/preview/src/components/UsageCard.tsx
git commit -m "style(preview): restyle UsageCard for dark theme"
```

---

### Task 13: Restyle GlossaryTable for Dark Theme

**Files:**
- Modify: `apps/preview/src/components/GlossaryTable.tsx`

- [ ] **Step 1: Update GlossaryTable colors for dark theme**

Same pattern as Task 12. Replace all hardcoded light-theme colors:

- Borders: `var(--border)`, `var(--border-subtle)`
- Backgrounds: `var(--panel-bg)`, `var(--input-bg)`
- Text: `var(--text-primary)`, `var(--text-secondary)`, `var(--text-muted)`
- Table header: `var(--panel-bg)` instead of `#fafafa`
- Hover: `var(--hover-bg)` instead of `#fafafa`
- Active pill: keep white-on-black, inactive pill: use `var(--input-bg)` with `var(--text-muted)`
- Input border: `var(--input-border)`

Read the current file, then replace all hardcoded light-theme colors with CSS variable equivalents.

- [ ] **Step 2: Verify glossary renders on dark background**

Open http://localhost:3333, click "Glossary" in sidebar. Verify table renders properly with dark theme.

- [ ] **Step 3: Commit**

```bash
git add apps/preview/src/components/GlossaryTable.tsx
git commit -m "style(preview): restyle GlossaryTable for dark theme"
```

---

### Task 14: Redeploy to Vercel

- [ ] **Step 1: Build and verify locally**

Run: `pnpm run build`
Expected: All packages build successfully.

- [ ] **Step 2: Deploy**

Run: `vercel deploy`
Expected: READY status.

- [ ] **Step 3: Verify deployed URL**

Open the preview URL and verify the three-panel layout renders correctly.

- [ ] **Step 4: Commit any config changes**

```bash
git add -A && git status
# Only commit if there are changes
```

---

## Self-Review

**Spec coverage:**
- ✅ Three-panel layout (sidebar + canvas + props panel) — Tasks 4, 6, 9, 11
- ✅ Dark theme — Task 1, 12, 13
- ✅ Live prop controls — Tasks 2, 7, 9
- ✅ Copy-paste code — Task 8
- ✅ API reference (prop table with types) — Task 9
- ✅ Interactive playground (canvas updates from controls) — Tasks 3, 7, 11
- ✅ Sidebar navigation with search — Task 4
- ✅ Toolbar with Canvas/Docs/Usage tabs — Task 5
- ✅ Token pages — Task 10
- ✅ URL hash routing — Task 11
- ✅ Component renders extracted — Task 3
- ✅ Obsolete components deleted — Task 11
- ✅ Redeploy — Task 14

**Placeholder scan:** No TBDs, TODOs, or vague steps. All code is complete.

**Type consistency:** `PropControl`, `ComponentControlDef`, `TabName`, `SpecEntry` — types are consistent across all files. `getControls()` returns `ComponentControlDef | undefined` and consumers handle the undefined case. `renderComponent()` takes `Record<string, unknown>` matching `propValues` state type.
