# AI-Native Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the DFYNE design system the shared language between designers, developers, and AI tools by building three incremental layers: a shared dictionary (reference site), Figma ↔ code sync, and an AI context package.

**Architecture:** Layer A upgrades the preview app with a naming glossary, usage guidelines, and do/don't examples. Layer C adds a new `packages/ai-context` package that reads tokens and component data to auto-generate system prompt files. Layer B creates a Figma component library via MCP tools and adds Code Connect files. Each layer is independently useful.

**Tech Stack:** Next.js 15, React 19, TypeScript, pnpm monorepo with Turborepo, Vitest, Figma Plugin API (via MCP), Figma Code Connect

---

## File Structure

### Layer A — Preview App Enhancements

| File | Action | Responsibility |
|------|--------|----------------|
| `apps/preview/src/data/tokenGlossary.ts` | Create | Generates glossary entries from tokens.css (CSS var → Figma path → JS name → plain English) |
| `apps/preview/src/data/usageGuidelines.ts` | Create | Usage guidelines and do/don't data for all 13 documented components |
| `apps/preview/src/components/GlossaryTable.tsx` | Create | Renders token glossary with multi-format copy buttons |
| `apps/preview/src/components/CopyAsDropdown.tsx` | Create | Dropdown that copies a token name in CSS/Figma/JS format |
| `apps/preview/src/components/UsageCard.tsx` | Create | Renders usage guidelines with do/don't examples for a component |
| `apps/preview/src/components/TokenSections.tsx` | Modify | Add glossary section to the token documentation |
| `apps/preview/src/app/page.tsx` | Modify | Add usage guidelines section below component cards |
| `apps/preview/src/__tests__/tokenGlossary.test.ts` | Create | Tests for glossary generation logic |
| `apps/preview/src/__tests__/usageGuidelines.test.ts` | Create | Tests for usage guideline data completeness |

### Layer C — AI Context Package

| File | Action | Responsibility |
|------|--------|----------------|
| `packages/ai-context/package.json` | Create | Package config with build script |
| `packages/ai-context/tsconfig.json` | Create | TypeScript config |
| `packages/ai-context/src/build.ts` | Create | Reads tokens.css + component data, generates all output files |
| `packages/ai-context/src/generate-prompt.ts` | Create | Generates the markdown system prompt |
| `packages/ai-context/src/generate-json.ts` | Create | Generates structured JSON context |
| `packages/ai-context/__tests__/build.test.ts` | Create | Tests that build produces expected output files with correct content |
| `turbo.json` | Modify | Add `ai-context:build` to pipeline |
| `pnpm-workspace.yaml` | No change | Already includes `packages/*` |

### Layer B — Figma Sync + Code Connect

| File | Action | Responsibility |
|------|--------|----------------|
| `packages/react/src/primitives/Button.figma.ts` | Create | Code Connect mapping for Button |
| `packages/react/src/primitives/Badge.figma.ts` | Create | Code Connect mapping for Badge |
| `packages/react/src/primitives/Icon.figma.ts` | Create | Code Connect mapping for Icon |
| `packages/react/src/primitives/SectionHeading.figma.ts` | Create | Code Connect mapping for SectionHeading |
| `packages/react/src/primitives/ArrowButton.figma.ts` | Create | Code Connect mapping for ArrowButton |
| `packages/react/src/cards/ProductCard.figma.ts` | Create | Code Connect mapping for ProductCard |
| `packages/react/src/cards/CategoryCard.figma.ts` | Create | Code Connect mapping for CategoryCard |
| `packages/react/src/cards/ColorSwatch.figma.ts` | Create | Code Connect mapping for ColorSwatch |
| `packages/react/src/cards/SizeButton.figma.ts` | Create | Code Connect mapping for SizeButton |
| `packages/react/src/cards/CrossSellCard.figma.ts` | Create | Code Connect mapping for CrossSellCard |
| `packages/react/src/sections/CampaignHero.figma.ts` | Create | Code Connect mapping for CampaignHero |
| `packages/react/src/sections/AnnouncementBar.figma.ts` | Create | Code Connect mapping for AnnouncementBar |
| `packages/react/src/sections/NewsletterSignup.figma.ts` | Create | Code Connect mapping for NewsletterSignup |
| `packages/react/src/sections/Footer.figma.ts` | Create | Code Connect mapping for Footer |
| `packages/react/package.json` | Modify | Add `@figma/code-connect` dev dependency |

Note: Figma variable and component creation (B1, B2) is done via Figma MCP tools interactively, not as code files. The plan covers the Code Connect files (B3) which live in the repo.

---

## Phase A: Shared Dictionary

### Task 1: Token Glossary Data Generator

**Files:**
- Create: `apps/preview/src/data/tokenGlossary.ts`
- Create: `apps/preview/src/__tests__/tokenGlossary.test.ts`

- [ ] **Step 1: Write the failing test**

Create `apps/preview/src/__tests__/tokenGlossary.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { generateGlossary, type GlossaryEntry } from "../data/tokenGlossary";

describe("generateGlossary", () => {
  it("converts a CSS variable to all four name formats", () => {
    const entries = generateGlossary(":root { --color-text-primary: #0a0a0a; }");
    const entry = entries.find((e) => e.cssVar === "--color-text-primary");

    expect(entry).toBeDefined();
    expect(entry!.figmaPath).toBe("color/text/primary");
    expect(entry!.jsName).toBe("colorTextPrimary");
    expect(entry!.plainName).toBe("color text primary");
    expect(entry!.value).toBe("#0a0a0a");
  });

  it("handles spacing tokens with numbers", () => {
    const entries = generateGlossary(":root { --space-4: 8px; }");
    const entry = entries.find((e) => e.cssVar === "--space-4");

    expect(entry).toBeDefined();
    expect(entry!.figmaPath).toBe("space/4");
    expect(entry!.jsName).toBe("spaceFour");
    expect(entry!.plainName).toBe("space 4");
  });

  it("handles radius tokens", () => {
    const entries = generateGlossary(":root { --radius-button: 50px; }");
    const entry = entries.find((e) => e.cssVar === "--radius-button");

    expect(entry!.figmaPath).toBe("radius/button");
    expect(entry!.jsName).toBe("radiusButton");
  });

  it("parses all 178 tokens from actual tokens.css", async () => {
    const { readFileSync } = await import("node:fs");
    const { resolve } = await import("node:path");
    const css = readFileSync(
      resolve(__dirname, "../../../../packages/tokens/src/tokens.css"),
      "utf-8"
    );
    const entries = generateGlossary(css);
    expect(entries.length).toBeGreaterThanOrEqual(170);
    entries.forEach((e) => {
      expect(e.cssVar).toMatch(/^--[a-z]/);
      expect(e.figmaPath).not.toContain("--");
      expect(e.jsName).toMatch(/^[a-z]/);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/preview && npx vitest run src/__tests__/tokenGlossary.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write the implementation**

Create `apps/preview/src/data/tokenGlossary.ts`:

```typescript
const numberWords: Record<string, string> = {
  "1": "One", "2": "Two", "3": "Three", "4": "Four", "5": "Five",
  "6": "Six", "7": "Seven", "8": "Eight", "9": "Nine", "10": "Ten",
  "11": "Eleven", "12": "Twelve", "13": "Thirteen", "14": "Fourteen",
  "15": "Fifteen", "16": "Sixteen",
  "2xs": "TwoXs", "2xl": "TwoXl", "3xl": "ThreeXl", "4xl": "FourXl",
};

export type GlossaryEntry = {
  cssVar: string;
  figmaPath: string;
  jsName: string;
  plainName: string;
  value: string;
  category: string;
};

/** Convert CSS variable name (without --) to camelCase JS name */
function toCamel(name: string): string {
  const parts = name.split("-");
  return parts
    .map((part, i) => {
      const word = numberWords[part] ?? part;
      if (i === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

/** Convert CSS variable name (without --) to Figma path (slash-separated) */
function toFigmaPath(name: string): string {
  return name.replace(/-/g, "/");
}

/** Convert CSS variable name (without --) to plain English */
function toPlainName(name: string): string {
  return name.replace(/-/g, " ");
}

/** Derive category from the first segment of the variable name */
function toCategory(name: string): string {
  const first = name.split("-")[0];
  const categoryMap: Record<string, string> = {
    color: "Colors",
    font: "Typography",
    text: "Typography",
    weight: "Typography",
    leading: "Typography",
    tracking: "Typography",
    space: "Spacing",
    grid: "Spacing",
    drawer: "Spacing",
    page: "Spacing",
    container: "Spacing",
    radius: "Border Radius",
    shadow: "Shadows",
    bp: "Breakpoints",
    z: "Z-Index",
    duration: "Animation",
    ease: "Animation",
  };
  return categoryMap[first] ?? "Other";
}

/** Parse CSS tokens and generate glossary entries with all four name formats */
export function generateGlossary(css: string): GlossaryEntry[] {
  const entries: GlossaryEntry[] = [];
  const regex = /--([a-z0-9-]+):\s*(.+?);/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(css)) !== null) {
    const [, name, value] = match;
    entries.push({
      cssVar: `--${name}`,
      figmaPath: toFigmaPath(name),
      jsName: toCamel(name),
      plainName: toPlainName(name),
      value: value.trim(),
      category: toCategory(name),
    });
  }

  return entries;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/preview && npx vitest run src/__tests__/tokenGlossary.test.ts`
Expected: 4 tests PASS

- [ ] **Step 5: Commit**

```bash
git add apps/preview/src/data/tokenGlossary.ts apps/preview/src/__tests__/tokenGlossary.test.ts
git commit -m "feat(preview): add token glossary data generator with multi-format names"
```

---

### Task 2: CopyAs Dropdown Component

**Files:**
- Create: `apps/preview/src/components/CopyAsDropdown.tsx`

- [ ] **Step 1: Write the component**

Create `apps/preview/src/components/CopyAsDropdown.tsx`:

```typescript
"use client";

import { useState, useRef, useEffect } from "react";

type CopyFormat = {
  label: string;
  value: string;
};

export function CopyAsDropdown({ formats }: { formats: CopyFormat[] }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = async (format: CopyFormat) => {
    await navigator.clipboard.writeText(format.value);
    setCopied(format.label);
    setTimeout(() => {
      setCopied(null);
      setOpen(false);
    }, 1000);
  };

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded px-1.5 py-0.5 text-[10px] text-[#a0a0a0] transition-colors hover:bg-[#f0f0f0] hover:text-[#6f6f6f]"
        title="Copy as..."
      >
        ⎘
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 mt-1 min-w-[200px] rounded-md border border-[#e8e8e8] bg-white py-1 shadow-md">
          {formats.map((f) => (
            <button
              key={f.label}
              type="button"
              onClick={() => handleCopy(f)}
              className="flex w-full items-center justify-between px-3 py-1.5 text-left text-[11px] transition-colors hover:bg-[#f5f5f5]"
            >
              <span className="text-[#6f6f6f]">{f.label}</span>
              <code className="ml-3 text-[10px] text-[#999]">
                {copied === f.label ? "✓ Copied" : f.value}
              </code>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify it renders in the dev server**

Run: `pnpm --filter @dfyne/preview dev`
Manually verify the component renders without errors (used in Task 3).

- [ ] **Step 3: Commit**

```bash
git add apps/preview/src/components/CopyAsDropdown.tsx
git commit -m "feat(preview): add CopyAs dropdown for multi-format token copying"
```

---

### Task 3: Glossary Table Component + Integration

**Files:**
- Create: `apps/preview/src/components/GlossaryTable.tsx`
- Modify: `apps/preview/src/components/TokenSections.tsx`

- [ ] **Step 1: Create the GlossaryTable component**

Create `apps/preview/src/components/GlossaryTable.tsx`:

```typescript
"use client";

import { useState } from "react";
import { CopyAsDropdown } from "./CopyAsDropdown";
import type { GlossaryEntry } from "../data/tokenGlossary";

export function GlossaryTable({ entries }: { entries: GlossaryEntry[] }) {
  const [filter, setFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [...new Set(entries.map((e) => e.category))];

  const filtered = entries.filter((e) => {
    const matchesSearch =
      !filter ||
      e.cssVar.toLowerCase().includes(filter.toLowerCase()) ||
      e.plainName.toLowerCase().includes(filter.toLowerCase()) ||
      e.value.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = !activeCategory || e.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search tokens..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-md border border-[#e0e0e0] px-3 py-1.5 text-[12px] outline-none focus:border-[#999]"
          style={{ width: 220 }}
        />
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
              !activeCategory
                ? "bg-[#111] text-white"
                : "bg-[#f5f5f5] text-[#6f6f6f] hover:bg-[#e8e8e8]"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-[#111] text-white"
                  : "bg-[#f5f5f5] text-[#6f6f6f] hover:bg-[#e8e8e8]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-[#e8e8e8]">
        <table className="w-full text-left text-[12px]">
          <thead>
            <tr className="border-b border-[#e8e8e8] bg-[#fafafa]">
              <th className="px-4 py-2.5 font-medium text-[#6f6f6f]">CSS Variable</th>
              <th className="px-4 py-2.5 font-medium text-[#6f6f6f]">Figma</th>
              <th className="px-4 py-2.5 font-medium text-[#6f6f6f]">JS Import</th>
              <th className="px-4 py-2.5 font-medium text-[#6f6f6f]">Value</th>
              <th className="px-4 py-2.5 font-medium text-[#6f6f6f]" style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry) => (
              <tr
                key={entry.cssVar}
                className="border-b border-[#f0f0f0] transition-colors hover:bg-[#fafafa]"
              >
                <td className="px-4 py-2">
                  <code className="text-[11px] text-[#333]">{entry.cssVar}</code>
                </td>
                <td className="px-4 py-2">
                  <code className="text-[11px] text-[#666]">{entry.figmaPath}</code>
                </td>
                <td className="px-4 py-2">
                  <code className="text-[11px] text-[#666]">{entry.jsName}</code>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    {entry.category === "Colors" && (
                      <span
                        className="inline-block h-3 w-3 rounded-sm border border-[#e0e0e0]"
                        style={{ background: entry.value }}
                      />
                    )}
                    <code className="text-[11px] text-[#999]">{entry.value}</code>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <CopyAsDropdown
                    formats={[
                      { label: "CSS", value: `var(${entry.cssVar})` },
                      { label: "Figma", value: entry.figmaPath },
                      { label: "JS", value: entry.jsName },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[11px] text-[#999]">
        {filtered.length} of {entries.length} tokens
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Add glossary section to TokenSections**

In `apps/preview/src/components/TokenSections.tsx`, add the import at the top:

```typescript
import { GlossaryTable } from "./GlossaryTable";
import { generateGlossary } from "../data/tokenGlossary";
```

Read the actual file to find the exact export function name and add a new `DocSection` at the top of the returned JSX with id `"glossary"` and title `"Token Glossary"`. Inside it, render:

```tsx
<GlossaryTable entries={generateGlossary(tokensCSS)} />
```

Where `tokensCSS` is read from the tokens package at build time. Since this is a client component, pass the CSS string as a prop from page.tsx, or pre-generate the entries in `tokenData.ts`. The simplest approach: add a `glossaryEntries` export to `tokenData.ts` that calls `generateGlossary` with the raw CSS read via a static import.

Actually, since the preview app runs at build time in Next.js and the tokens CSS is a workspace dependency, the cleanest approach is to generate the glossary entries in `tokenData.ts`:

Add to the bottom of `apps/preview/src/data/tokenData.ts`:

```typescript
import { generateGlossary } from "./tokenGlossary";
import tokensCSS from "../../../../packages/tokens/src/tokens.css?raw";

export const glossaryEntries = generateGlossary(tokensCSS);
```

Note: If `?raw` imports don't work with Next.js, read the CSS file at module scope using `fs.readFileSync` in a server-side data loader instead. The fallback is to hard-code the path and use `readFileSync` in a `getStaticProps`-style function — but since this is a "use client" tree, the pragmatic approach is to generate the entries at build time in a separate data file and import the result. Test which approach works with the existing Next.js setup.

- [ ] **Step 3: Add "Glossary" to the nav items in page.tsx**

In `apps/preview/src/app/page.tsx`, find the `navItems` array and add:

```typescript
{ id: "glossary", label: "Glossary" },
```

- [ ] **Step 4: Verify in dev server**

Run: `pnpm --filter @dfyne/preview dev`
Navigate to http://localhost:3333#glossary and verify the table renders with all tokens, search works, category filters work, and copy dropdown copies correctly.

- [ ] **Step 5: Commit**

```bash
git add apps/preview/src/components/GlossaryTable.tsx apps/preview/src/components/TokenSections.tsx apps/preview/src/data/tokenData.ts apps/preview/src/app/page.tsx
git commit -m "feat(preview): add token glossary section with multi-format names and copy"
```

---

### Task 4: Usage Guidelines Data

**Files:**
- Create: `apps/preview/src/data/usageGuidelines.ts`
- Create: `apps/preview/src/__tests__/usageGuidelines.test.ts`

- [ ] **Step 1: Write the failing test**

Create `apps/preview/src/__tests__/usageGuidelines.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { usageGuidelines } from "../data/usageGuidelines";
import { componentSpecs } from "../data/componentSpecs";

describe("usageGuidelines", () => {
  it("has a guideline for every documented component", () => {
    const specNames = componentSpecs.map((s) => s.name);
    const guidelineNames = usageGuidelines.map((g) => g.component);
    specNames.forEach((name) => {
      expect(guidelineNames).toContain(name);
    });
  });

  it("each guideline has at least one when and one whenNot", () => {
    usageGuidelines.forEach((g) => {
      expect(g.when.length).toBeGreaterThanOrEqual(1);
      expect(g.whenNot.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("each guideline has at least one do and one dont example", () => {
    usageGuidelines.forEach((g) => {
      expect(g.doExamples.length).toBeGreaterThanOrEqual(1);
      expect(g.dontExamples.length).toBeGreaterThanOrEqual(1);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/preview && npx vitest run src/__tests__/usageGuidelines.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write the implementation**

Create `apps/preview/src/data/usageGuidelines.ts`:

```typescript
export type DoExample = {
  label: string;
  props: Record<string, unknown>;
  reason: string;
};

export type UsageGuideline = {
  component: string;
  description: string;
  when: string[];
  whenNot: string[];
  doExamples: DoExample[];
  dontExamples: DoExample[];
};

export const usageGuidelines: UsageGuideline[] = [
  {
    component: "Button",
    description: "Primary call-to-action for user interactions.",
    when: [
      "Primary action on a page (Add to Cart, Shop Now, Subscribe)",
      "Secondary action alongside a primary (Continue Shopping)",
      "Tertiary inline action (Size Guide, View Details)",
    ],
    whenNot: [
      "Navigation links — use an anchor tag instead",
      "Toggle states — use SizeButton or a custom toggle",
      "Icon-only actions — use ArrowButton or an icon button",
    ],
    doExamples: [
      { label: "Primary CTA", props: { variant: "primary", children: "ADD TO CART" }, reason: "Clear, uppercase action label" },
      { label: "Secondary alongside primary", props: { variant: "secondary", children: "CONTINUE SHOPPING" }, reason: "Visual hierarchy — secondary defers to primary" },
    ],
    dontExamples: [
      { label: "Lowercase button text", props: { variant: "primary", children: "add to cart" }, reason: "All DFYNE buttons use uppercase text" },
      { label: "Button as nav link", props: { variant: "primary", children: "WOMENS" }, reason: "Navigation should use anchor tags, not buttons" },
    ],
  },
  {
    component: "Badge",
    description: "Product label overlay on card images.",
    when: [
      "Product status labels (NEW, SALE, Sold Out)",
      "Custom promotional labels (Best Seller, Limited Edition)",
      "Bottom metadata labels from product metafields",
    ],
    whenNot: [
      "Status indicators in lists or tables — use inline text",
      "Count badges (cart count) — use a dot or number",
      "Category tags — use text or links instead",
    ],
    doExamples: [
      { label: "New product", props: { text: "NEW", variant: "custom" }, reason: "Standard product launch label" },
      { label: "Sold out", props: { text: "Sold Out", variant: "sold-out" }, reason: "Clear stock status" },
    ],
    dontExamples: [
      { label: "Category label", props: { text: "Leggings", variant: "custom" }, reason: "Categories are navigation, not product badges" },
      { label: "Price badge", props: { text: "£29.99", variant: "custom" }, reason: "Price should use the price display, not a badge" },
    ],
  },
  {
    component: "Size Button",
    description: "Size option selector in product forms.",
    when: [
      "Size selection on product pages (S, M, L, XL)",
      "Any single-select option set with short labels",
    ],
    whenNot: [
      "Color selection — use ColorSwatch instead",
      "Multi-select filters — use checkboxes",
      "Long text options — use a dropdown select",
    ],
    doExamples: [
      { label: "Size selector", props: { label: "M", selected: true, soldOut: false }, reason: "Clear selected state with short label" },
    ],
    dontExamples: [
      { label: "Color as size button", props: { label: "Black", selected: false, soldOut: false }, reason: "Colors need swatches for visual identification" },
    ],
  },
  {
    component: "Arrow Button",
    description: "Directional navigation for carousels and rails.",
    when: [
      "Horizontal scroll navigation in product rails",
      "Carousel prev/next controls",
    ],
    whenNot: [
      "Page navigation (breadcrumbs, pagination) — use links",
      "Accordion expand/collapse — use chevron icons inline",
    ],
    doExamples: [
      { label: "Rail navigation", props: { direction: "right" }, reason: "Standard carousel scroll control" },
    ],
    dontExamples: [
      { label: "Pagination arrow", props: { direction: "right" }, reason: "Page navigation should use links, not rail-style arrows" },
    ],
  },
  {
    component: "Section Heading",
    description: "Eyebrow + title pair for content sections.",
    when: [
      "Section headers on collection pages (JUST LANDED / NEW IN WOMEN)",
      "Any two-line heading with a small label above a larger title",
    ],
    whenNot: [
      "Page titles — use an h1 directly",
      "Card titles — title is part of the card component",
      "Single-line headings without an eyebrow — use plain heading",
    ],
    doExamples: [
      { label: "Collection section", props: { eyebrow: "JUST LANDED", title: "NEW IN WOMEN" }, reason: "Standard section heading pattern" },
    ],
    dontExamples: [
      { label: "Page title", props: { eyebrow: "", title: "DFYNE" }, reason: "Brand/page titles don't need the eyebrow+title pattern" },
    ],
  },
  {
    component: "Product Card",
    description: "Product tile for grids and rails.",
    when: [
      "Collection grids showing products",
      "Product rails (horizontal scrolling lists)",
      "Search results",
    ],
    whenNot: [
      "Cart line items — use a list row with quantity controls",
      "Related products in a drawer — use CrossSellCard instead",
      "Featured single product — use a hero or dedicated layout",
    ],
    doExamples: [
      { label: "Full product card", props: { image: "/img.jpg", name: "Impact Longsleeve Top", color: "Pebble Grey", price: 52.20, badge: "NEW" }, reason: "Complete product tile with all metadata" },
    ],
    dontExamples: [
      { label: "Card without image", props: { image: "", name: "Impact Top", price: 52.20 }, reason: "Product cards must have an image — use a placeholder if needed" },
    ],
  },
  {
    component: "Category Card",
    description: "Collection/category tile with image overlay.",
    when: [
      "Collection grid on homepage or category pages",
      "Category navigation with visual previews",
    ],
    whenNot: [
      "Text-only category lists — use links",
      "Product display — use ProductCard",
    ],
    doExamples: [
      { label: "Category tile", props: { image: "/img.jpg", title: "IMPACT", href: "/collections/impact" }, reason: "Visual category navigation" },
    ],
    dontExamples: [
      { label: "Product in category card", props: { image: "/img.jpg", title: "Impact Shorts" }, reason: "Individual products should use ProductCard" },
    ],
  },
  {
    component: "Color Swatch",
    description: "Color variant selector with thumbnail image.",
    when: [
      "Color selection on product pages",
      "Color variant thumbnails in quick-view",
    ],
    whenNot: [
      "Size selection — use SizeButton",
      "Generic option picker with no visual — use buttons or radio",
      "Color display in a palette — use a plain swatch div",
    ],
    doExamples: [
      { label: "Color option", props: { image: "/swatch.jpg", label: "Midnight Black", selected: true }, reason: "Visual color selection with label" },
    ],
    dontExamples: [
      { label: "Size as swatch", props: { image: "", label: "XL", selected: false }, reason: "Sizes don't have visual thumbnails — use SizeButton" },
    ],
  },
  {
    component: "Cross-Sell Card",
    description: "Compact product card for related product suggestions.",
    when: [
      "\"Complete the Look\" sections on product pages",
      "Cart drawer product suggestions",
      "Related products in compact layouts",
    ],
    whenNot: [
      "Main product grids — use ProductCard for full-size tiles",
      "Category browsing — use CategoryCard",
    ],
    doExamples: [
      { label: "Related product", props: { image: "/img.jpg", name: "Impact Shorts", color: "Midnight Black", price: 49 }, reason: "Compact related product suggestion" },
    ],
    dontExamples: [
      { label: "Main grid card", props: { image: "/img.jpg", name: "Impact Shorts", color: "Midnight Black", price: 49 }, reason: "Use ProductCard for main grids — CrossSellCard is for secondary placements" },
    ],
  },
  {
    component: "Campaign Hero",
    description: "Full-width hero section with background image and CTAs.",
    when: [
      "Homepage hero banner",
      "Collection landing page hero",
      "Campaign/launch announcement hero",
    ],
    whenNot: [
      "Product detail header — use product-specific layout",
      "Banner ads or small promotional blocks — use a simpler banner",
    ],
    doExamples: [
      { label: "Launch hero", props: { image: "/hero.jpg", caption: "NEW COLLECTION", heading: "IMPACT", cta: { label: "SHOP NOW", href: "/" } }, reason: "Standard full-width campaign hero" },
    ],
    dontExamples: [
      { label: "Text-only hero", props: { image: "", caption: "", heading: "SALE" }, reason: "Campaign hero requires a background image" },
    ],
  },
  {
    component: "Announcement Bar",
    description: "Rotating notification bar at the top of the page.",
    when: [
      "Sitewide announcements (shipping, returns, promotions)",
      "Rotating benefit messages",
    ],
    whenNot: [
      "Page-specific alerts — use an inline banner",
      "Error messages — use form validation",
    ],
    doExamples: [
      { label: "Rotating benefits", props: { slides: [{ text: "FREE TRACKED DELIVERY", detail: "On orders over £30" }], interval: 4000 }, reason: "Standard announcement rotation" },
    ],
    dontExamples: [
      { label: "Error message", props: { slides: [{ text: "PAYMENT FAILED", detail: "Try again" }] }, reason: "Errors need contextual placement, not a global bar" },
    ],
  },
  {
    component: "Newsletter Signup",
    description: "Email signup form section.",
    when: [
      "Footer area email capture",
      "Dedicated signup section on landing pages",
    ],
    whenNot: [
      "Popup/modal signup — use a modal with a form inside",
      "In-cart upsell — use a different pattern",
    ],
    doExamples: [
      { label: "Standard signup", props: {}, reason: "Default newsletter section with heading, subtext, and form" },
    ],
    dontExamples: [
      { label: "Minimal email-only", props: {}, reason: "The section includes heading and context text — don't strip it to just an input" },
    ],
  },
  {
    component: "Footer",
    description: "Multi-column site footer with link groups.",
    when: [
      "Site footer on all pages",
    ],
    whenNot: [
      "In-page navigation — use a sidebar or nav component",
      "Drawer footer — use a simpler layout",
    ],
    doExamples: [
      { label: "4-column footer", props: { columns: [{ heading: "Account", links: ["Login", "Register"] }, { heading: "About", links: ["About", "Careers"] }] }, reason: "Standard multi-column footer layout" },
    ],
    dontExamples: [
      { label: "Single column footer", props: { columns: [{ heading: "Links", links: ["About", "Contact", "Login", "Register", "Shipping", "Returns"] }] }, reason: "Footer should be organized into logical groups, not one long list" },
    ],
  },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/preview && npx vitest run src/__tests__/usageGuidelines.test.ts`
Expected: 3 tests PASS

- [ ] **Step 5: Commit**

```bash
git add apps/preview/src/data/usageGuidelines.ts apps/preview/src/__tests__/usageGuidelines.test.ts
git commit -m "feat(preview): add usage guidelines data for all 13 components"
```

---

### Task 5: Usage Card Component + Integration

**Files:**
- Create: `apps/preview/src/components/UsageCard.tsx`
- Modify: `apps/preview/src/app/page.tsx`

- [ ] **Step 1: Create the UsageCard component**

Create `apps/preview/src/components/UsageCard.tsx`:

```typescript
"use client";

import type { UsageGuideline } from "../data/usageGuidelines";

export function UsageCard({ guideline }: { guideline: UsageGuideline }) {
  return (
    <div className="rounded-lg border border-[#e8e8e8] bg-white">
      {/* Header */}
      <div className="border-b border-[#e8e8e8] px-5 py-4">
        <h3 className="text-[13px] font-semibold text-[#1a1a1a]">{guideline.component}</h3>
        <p className="mt-1 text-[12px] text-[#6f6f6f]">{guideline.description}</p>
      </div>

      {/* When / When Not */}
      <div className="grid grid-cols-2 gap-0 border-b border-[#e8e8e8]">
        <div className="border-r border-[#e8e8e8] px-5 py-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[1.2px] text-[#4caf50]">When to use</p>
          <ul className="space-y-1.5">
            {guideline.when.map((w) => (
              <li key={w} className="text-[11px] leading-[1.5] text-[#333]">
                {w}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-5 py-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[1.2px] text-[#f44336]">When not to use</p>
          <ul className="space-y-1.5">
            {guideline.whenNot.map((w) => (
              <li key={w} className="text-[11px] leading-[1.5] text-[#333]">
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Do / Don't Examples */}
      <div className="grid grid-cols-2 gap-0">
        <div className="border-r border-[#e8e8e8] px-5 py-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[1.2px] text-[#4caf50]">Do</p>
          <div className="space-y-3">
            {guideline.doExamples.map((ex) => (
              <div key={ex.label}>
                <p className="text-[11px] font-medium text-[#1a1a1a]">{ex.label}</p>
                <p className="text-[10px] text-[#888]">{ex.reason}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="px-5 py-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[1.2px] text-[#f44336]">Don&apos;t</p>
          <div className="space-y-3">
            {guideline.dontExamples.map((ex) => (
              <div key={ex.label}>
                <p className="text-[11px] font-medium text-[#1a1a1a]">{ex.label}</p>
                <p className="text-[10px] text-[#888]">{ex.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add usage guidelines section to page.tsx**

In `apps/preview/src/app/page.tsx`:

Add import:
```typescript
import { UsageCard } from "../components/UsageCard";
import { usageGuidelines } from "../data/usageGuidelines";
```

Add `{ id: "usage", label: "Usage" }` to `navItems`.

Add a new section after the components section (before the token sections):

```tsx
{/* ---- USAGE GUIDELINES ---- */}
<section id="usage" className="scroll-mt-16 border-b border-[#e8e8e8] py-20">
  <div className="mx-auto max-w-[1200px] px-8">
    <h2
      className="mb-12 text-2xl font-light tracking-tight text-[#1a1a1a]"
      style={{ fontFamily: sysFont }}
    >
      Usage Guidelines
    </h2>
    <div className="grid gap-6">
      {usageGuidelines
        .filter((g) => !search || g.component.toLowerCase().includes(search.toLowerCase()))
        .map((g) => (
          <UsageCard key={g.component} guideline={g} />
        ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verify in dev server**

Run: `pnpm --filter @dfyne/preview dev`
Navigate to http://localhost:3333#usage and verify all 13 component guidelines render with when/when-not and do/don't sections.

- [ ] **Step 4: Commit**

```bash
git add apps/preview/src/components/UsageCard.tsx apps/preview/src/app/page.tsx
git commit -m "feat(preview): add usage guidelines section with do/dont examples"
```

---

## Phase C: AI Context Package

### Task 6: Scaffold ai-context Package

**Files:**
- Create: `packages/ai-context/package.json`
- Create: `packages/ai-context/tsconfig.json`
- Modify: `turbo.json`

- [ ] **Step 1: Create package.json**

Create `packages/ai-context/package.json`:

```json
{
  "name": "@dfyne/ai-context",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsx src/build.ts",
    "test": "vitest run",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@dfyne/tokens": "workspace:*"
  },
  "devDependencies": {
    "tsx": "^4",
    "typescript": "^5",
    "vitest": "^3"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

Create `packages/ai-context/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*.ts", "__tests__/**/*.ts"]
}
```

- [ ] **Step 3: Update turbo.json**

Modify `turbo.json` — the existing `build` task with `dependsOn: ["^build"]` already handles the dependency chain. No changes needed since `@dfyne/ai-context` depends on `@dfyne/tokens` in package.json and turbo's `^build` will build tokens first.

- [ ] **Step 4: Install dependencies**

Run: `pnpm install`

- [ ] **Step 5: Commit**

```bash
git add packages/ai-context/package.json packages/ai-context/tsconfig.json
git commit -m "chore: scaffold @dfyne/ai-context package"
```

---

### Task 7: AI Context Build Script

**Files:**
- Create: `packages/ai-context/src/build.ts`
- Create: `packages/ai-context/src/generate-prompt.ts`
- Create: `packages/ai-context/src/generate-json.ts`
- Create: `packages/ai-context/__tests__/build.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/ai-context/__tests__/build.test.ts`:

```typescript
import { describe, it, expect, beforeAll } from "vitest";
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve(__dirname, "..", "dist");
const rootDir = resolve(__dirname, "..", "..", "..");

describe("ai-context build", () => {
  beforeAll(() => {
    execSync("pnpm run build", { cwd: resolve(__dirname, "..") });
  });

  it("generates dfyne-system-prompt.md", () => {
    const path = resolve(distDir, "dfyne-system-prompt.md");
    expect(existsSync(path)).toBe(true);
    const content = readFileSync(path, "utf-8");
    expect(content).toContain("DFYNE Design System");
    expect(content).toContain("--color-text-primary");
    expect(content).toContain("Raleway");
    expect(content).toContain("Button");
    expect(content).toContain("ProductCard");
  });

  it("generates dfyne-context.json", () => {
    const path = resolve(distDir, "dfyne-context.json");
    expect(existsSync(path)).toBe(true);
    const json = JSON.parse(readFileSync(path, "utf-8"));
    expect(json.brand).toBeDefined();
    expect(json.tokens).toBeDefined();
    expect(json.components).toBeDefined();
    expect(Object.keys(json.tokens).length).toBeGreaterThanOrEqual(170);
    expect(json.components.length).toBeGreaterThanOrEqual(17);
  });

  it("system prompt includes usage rules", () => {
    const content = readFileSync(resolve(distDir, "dfyne-system-prompt.md"), "utf-8");
    expect(content).toContain("uppercase");
    expect(content).toContain("2.7px");
    expect(content).toContain("GBP");
    expect(content).toContain("@dfyne/react");
  });

  it("system prompt is under 15000 characters", () => {
    const content = readFileSync(resolve(distDir, "dfyne-system-prompt.md"), "utf-8");
    expect(content.length).toBeLessThan(15000);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/ai-context && npx vitest run`
Expected: FAIL — build script not found

- [ ] **Step 3: Write generate-prompt.ts**

Create `packages/ai-context/src/generate-prompt.ts`:

```typescript
type TokenMap = Record<string, string>;

type ComponentInfo = {
  name: string;
  props: string[];
  variants: string[];
};

export function generatePrompt(
  tokens: TokenMap,
  components: ComponentInfo[],
): string {
  const lines: string[] = [];

  lines.push("# DFYNE Design System — AI Context");
  lines.push("");
  lines.push("You are building UI for DFYNE, a premium women's athletic wear brand.");
  lines.push("Use ONLY the tokens, components, and patterns defined below.");
  lines.push("");

  // Brand
  lines.push("## Brand");
  lines.push("- Font: Raleway (400, 500, 600, 700)");
  lines.push("- Primary color: #111111");
  lines.push("- Background: #ffffff");
  lines.push("- Aesthetic: Minimal, premium, high-contrast black/white with subtle grays");
  lines.push("- Currency: GBP, formatted via `new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })`");
  lines.push("");

  // Rules
  lines.push("## Rules");
  lines.push("- Use ONLY colors from the token palette — never arbitrary hex values");
  lines.push("- All button text: uppercase, font-weight 600, letter-spacing 2.7px");
  lines.push("- Product images: 4:5 aspect ratio (portrait)");
  lines.push("- Import components from `@dfyne/react`, never re-implement");
  lines.push("- Spacing uses `--space-*` tokens, never arbitrary pixel values");
  lines.push("- Border radius uses `--radius-*` tokens");
  lines.push("- Base font size: 13px, base line-height: 1.6");
  lines.push("");

  // Tokens by category
  lines.push("## Tokens");
  lines.push("");

  const categories: Record<string, [string, string][]> = {};
  for (const [name, value] of Object.entries(tokens)) {
    const cat = name.split("-")[0];
    (categories[cat] ??= []).push([name, value]);
  }

  for (const [cat, entries] of Object.entries(categories)) {
    lines.push(`### ${cat}`);
    for (const [name, value] of entries) {
      lines.push(`- \`--${name}\`: ${value}`);
    }
    lines.push("");
  }

  // Components
  lines.push("## Components");
  lines.push("");
  lines.push("Import from `@dfyne/react`:");
  lines.push("");

  for (const comp of components) {
    lines.push(`### ${comp.name}`);
    if (comp.props.length > 0) {
      lines.push(`Props: ${comp.props.join(", ")}`);
    }
    if (comp.variants.length > 0) {
      lines.push(`Variants: ${comp.variants.join(", ")}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}
```

- [ ] **Step 4: Write generate-json.ts**

Create `packages/ai-context/src/generate-json.ts`:

```typescript
type TokenMap = Record<string, string>;

type ComponentInfo = {
  name: string;
  props: string[];
  variants: string[];
};

export function generateJson(
  tokens: TokenMap,
  components: ComponentInfo[],
): string {
  const context = {
    brand: {
      name: "DFYNE",
      font: "Raleway",
      primaryColor: "#111111",
      backgroundColor: "#ffffff",
      currency: "GBP",
      aesthetic: "Minimal premium athletic wear",
    },
    tokens,
    components: components.map((c) => ({
      name: c.name,
      import: `import { ${c.name} } from "@dfyne/react"`,
      props: c.props,
      variants: c.variants,
    })),
    rules: [
      "Use ONLY colors from the token palette",
      "All button text: uppercase, weight 600, tracking 2.7px",
      "Product images: 4:5 aspect ratio",
      "Import from @dfyne/react, never re-implement",
      "Spacing uses --space-* tokens only",
      "Border radius uses --radius-* tokens only",
      "Currency: GBP via Intl.NumberFormat",
    ],
  };

  return JSON.stringify(context, null, 2) + "\n";
}
```

- [ ] **Step 5: Write build.ts**

Create `packages/ai-context/src/build.ts`:

```typescript
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { generatePrompt } from "./generate-prompt.js";
import { generateJson } from "./generate-json.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "..", "dist");
const rootDir = resolve(__dirname, "..", "..", "..");

// Read tokens
const tokensCss = readFileSync(
  resolve(rootDir, "packages/tokens/src/tokens.css"),
  "utf-8",
);

// Parse tokens (same regex as tokens build)
const tokens: Record<string, string> = {};
const regex = /--([a-z0-9-]+):\s*(.+?);/g;
let match: RegExpExecArray | null;
while ((match = regex.exec(tokensCss)) !== null) {
  tokens[match[1]] = match[2].trim();
}

// Read component exports to get names
const indexTs = readFileSync(
  resolve(rootDir, "packages/react/src/index.ts"),
  "utf-8",
);

const componentNames: string[] = [];
const exportRegex = /export \{ (\w+) \}/g;
let exportMatch: RegExpExecArray | null;
while ((exportMatch = exportRegex.exec(indexTs)) !== null) {
  const name = exportMatch[1];
  // Skip type exports
  if (name === "IconName") continue;
  componentNames.push(name);
}

// Read each component file to extract props
const components = componentNames.map((name) => {
  // Determine file path from index.ts
  const pathRegex = new RegExp(`export \\{ ${name} \\} from "\\./(.+?)"`);
  const pathMatch = indexTs.match(pathRegex);
  const relPath = pathMatch ? pathMatch[1] : "";

  let props: string[] = [];
  let variants: string[] = [];

  try {
    const filePath = resolve(rootDir, "packages/react/src", relPath + ".tsx");
    const source = readFileSync(filePath, "utf-8");

    // Extract prop names from the component's type/interface
    const propsMatch = source.match(/\{\s*([^}]+)\s*\}.*(?:Props|:\s*\{)/);
    if (propsMatch) {
      props = propsMatch[1]
        .split(/[,\n]/)
        .map((p) => p.trim().split(/[?:]/)[0].trim())
        .filter((p) => p && !p.startsWith("//"));
    }

    // Extract variant values if present
    const variantMatch = source.match(/variant.*?["']([^"']+)["'].*?["']([^"']+)["']/s);
    if (variantMatch) {
      const allVariants = source.match(/["'](\w+)["']\s*(?:===?\s*variant|\|\s*["'])/g);
      if (allVariants) {
        variants = allVariants.map((v) => v.replace(/["'=|]/g, "").trim());
      }
    }
  } catch {
    // Component file not found or parse error — skip props
  }

  return { name, props, variants };
});

// Generate outputs
mkdirSync(distDir, { recursive: true });

const prompt = generatePrompt(tokens, components);
writeFileSync(resolve(distDir, "dfyne-system-prompt.md"), prompt);

const json = generateJson(tokens, components);
writeFileSync(resolve(distDir, "dfyne-context.json"), json);

console.log(
  `Built AI context: ${prompt.length} chars prompt, ${Object.keys(tokens).length} tokens, ${components.length} components`,
);
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd packages/ai-context && npx vitest run`
Expected: 4 tests PASS

- [ ] **Step 7: Commit**

```bash
git add packages/ai-context/
git commit -m "feat(ai-context): add build script generating system prompt and JSON context"
```

---

### Task 8: Generate Root CLAUDE.md and .cursorrules

**Files:**
- Modify: `packages/ai-context/src/build.ts`

- [ ] **Step 1: Add root file generation to build.ts**

Add to the end of `packages/ai-context/src/build.ts`, before the `console.log`:

```typescript
// Write compact version to root CLAUDE.md
const claudeMd = [
  "# DFYNE Design System",
  "",
  "This monorepo contains the DFYNE design system.",
  "",
  "## AI Instructions",
  "",
  "When writing UI code for DFYNE:",
  "- Import components from `@dfyne/react` — never re-implement",
  "- Use CSS tokens from `packages/tokens/src/tokens.css` — never use arbitrary values",
  "- Font: Raleway. Primary: #111111. Background: #ffffff",
  "- Button text: uppercase, weight 600, tracking 2.7px",
  "- Product images: 4:5 aspect ratio",
  "- Currency: GBP via Intl.NumberFormat",
  "- Spacing: use --space-* tokens. Radius: use --radius-* tokens",
  "",
  "## Packages",
  "- `packages/tokens` — 178 CSS design tokens",
  "- `packages/react` — React component library (17 components)",
  "- `packages/liquid` — Shopify Liquid snippets",
  "- `packages/ai-context` — Auto-generated AI context files",
  "- `apps/preview` — Design system reference site (Next.js, port 3333)",
  "",
  "## Available Components",
  "",
  components.map((c) => `- **${c.name}**${c.props.length ? `: ${c.props.join(", ")}` : ""}`).join("\n"),
  "",
  "## Full AI context",
  "",
  "See `packages/ai-context/dist/dfyne-system-prompt.md` for complete token reference.",
  "",
].join("\n");

writeFileSync(resolve(rootDir, "CLAUDE.md"), claudeMd);
writeFileSync(resolve(rootDir, ".cursorrules"), prompt);
```

- [ ] **Step 2: Rebuild and verify**

Run: `cd packages/ai-context && pnpm run build`
Verify `CLAUDE.md` and `.cursorrules` exist at the repo root.

Run: `cat ../../CLAUDE.md | head -20`
Expected: Shows the DFYNE design system header and AI instructions.

- [ ] **Step 3: Add generated files to .gitignore**

These are generated files — add to the root `.gitignore`:

```
# Generated by @dfyne/ai-context build
.cursorrules
```

Note: `CLAUDE.md` should be committed so Claude Code picks it up. `.cursorrules` should also be committed for Cursor. Actually, both should be committed. Don't add them to `.gitignore`. Just commit them as generated artifacts.

- [ ] **Step 4: Commit**

```bash
git add packages/ai-context/src/build.ts CLAUDE.md .cursorrules
git commit -m "feat(ai-context): generate root CLAUDE.md and .cursorrules from build"
```

---

## Phase B: Figma Sync

### Task 9: Create Figma Variables from Tokens (Interactive)

This task is done interactively using the Figma MCP tools, not as committed code.

**Prerequisites:** A Figma file for the DFYNE component library must exist. Create one or identify the target file.

- [ ] **Step 1: Create or identify target Figma file**

Use the Figma MCP `create_new_file` tool to create a new Figma design file named "DFYNE Design System" if one doesn't exist.

- [ ] **Step 2: Load the figma-generate-library skill**

Invoke the `figma:figma-generate-library` skill to get guidance on creating variables, then use the `figma:figma-use` skill before each `use_figma` call.

- [ ] **Step 3: Create Figma variable collections**

Using the Figma Plugin API via `use_figma`, create these variable collections from the token values in `packages/tokens/src/tokens.css`:

1. **Color** collection — all `--color-*` tokens as color variables
2. **Space** collection — all `--space-*`, `--grid-*`, `--page-*`, `--drawer-*` tokens as number variables
3. **Size** collection — all `--text-*`, `--weight-*`, `--leading-*`, `--tracking-*` tokens as number/string variables
4. **Shape** collection — all `--radius-*` tokens as number variables

Use the naming convention: `--color-text-primary` → `color/text/primary`.

- [ ] **Step 4: Verify variables were created**

Use `use_figma` to read back the created variables and verify the count matches expectations.

---

### Task 10: Build Figma Components (Interactive)

This task is done interactively using the Figma MCP tools. Follow the component build order from the spec.

- [ ] **Step 1: Load the figma-generate-library skill**

Invoke `figma:figma-generate-library` for guidance on component creation.

- [ ] **Step 2: Build components in dependency order**

For each component, use `figma:figma-use` + `use_figma` to:
1. Create a component with proper variant properties
2. Set up auto-layout matching CSS layout
3. Bind colors, spacing, radius to Figma variables
4. Add nested instances where needed (e.g., Badge in ProductCard)

Build order:
1. Icon (19 variants — one per icon name)
2. Badge (variants: custom, sold-out, bottom)
3. Button (variants: primary, secondary, tertiary, ghost × disabled true/false)
4. ArrowButton (variants: default, edge × direction left/right)
5. SizeButton (variants: default, selected, soldOut)
6. SectionHeading
7. ColorSwatch (variants: default, selected)
8. ProductCard, CategoryCard, CrossSellCard
9. ProductRail, CategoryRail, CrossSellRail
10. CampaignHero, AnnouncementBar, NewsletterSignup, Footer

- [ ] **Step 3: Verify all 17 components exist in Figma**

Use `use_figma` to list all component sets and verify the count.

---

### Task 11: Add Code Connect Files

**Files:**
- Modify: `packages/react/package.json`
- Create: 14 `.figma.ts` files (one per component, excluding rails which are compositions)

- [ ] **Step 1: Add @figma/code-connect dependency**

Run: `cd packages/react && pnpm add -D @figma/code-connect`

- [ ] **Step 2: Create Code Connect files for primitives**

Create `packages/react/src/primitives/Button.figma.ts`:

```typescript
import figma from "@figma/code-connect";
import { Button } from "./Button";

figma.connect(Button, "FIGMA_URL_PLACEHOLDER", {
  props: {
    variant: figma.enum("Variant", {
      Primary: "primary",
      Secondary: "secondary",
      Tertiary: "tertiary",
      Ghost: "ghost",
    }),
    disabled: figma.boolean("Disabled"),
    children: figma.string("Label"),
  },
  example: ({ variant, disabled, children }) => (
    <Button variant={variant} disabled={disabled}>
      {children}
    </Button>
  ),
});
```

Create `packages/react/src/primitives/Badge.figma.ts`:

```typescript
import figma from "@figma/code-connect";
import { Badge } from "./Badge";

figma.connect(Badge, "FIGMA_URL_PLACEHOLDER", {
  props: {
    text: figma.string("Text"),
    variant: figma.enum("Variant", {
      Custom: "custom",
      "Sold Out": "sold-out",
      Bottom: "bottom",
    }),
  },
  example: ({ text, variant }) => <Badge text={text} variant={variant} />,
});
```

Create `packages/react/src/primitives/Icon.figma.ts`:

```typescript
import figma from "@figma/code-connect";
import { Icon } from "./Icon";

figma.connect(Icon, "FIGMA_URL_PLACEHOLDER", {
  props: {
    name: figma.enum("Name", {
      check: "check", star: "star", menu: "menu", user: "user",
      search: "search", cart: "cart", "arrow-left": "arrow-left",
      "arrow-right": "arrow-right", "chevron-right": "chevron-right",
      "chevron-down": "chevron-down", close: "close", pause: "pause",
      play: "play", support: "support", mail: "mail", package: "package",
      reward: "reward", calendar: "calendar", instagram: "instagram",
    }),
  },
  example: ({ name }) => <Icon name={name} />,
});
```

Create `packages/react/src/primitives/SectionHeading.figma.ts`:

```typescript
import figma from "@figma/code-connect";
import { SectionHeading } from "./SectionHeading";

figma.connect(SectionHeading, "FIGMA_URL_PLACEHOLDER", {
  props: {
    eyebrow: figma.string("Eyebrow"),
    title: figma.string("Title"),
  },
  example: ({ eyebrow, title }) => <SectionHeading eyebrow={eyebrow} title={title} />,
});
```

Create `packages/react/src/primitives/ArrowButton.figma.ts`:

```typescript
import figma from "@figma/code-connect";
import { ArrowButton } from "./ArrowButton";

figma.connect(ArrowButton, "FIGMA_URL_PLACEHOLDER", {
  props: {
    direction: figma.enum("Direction", { Left: "left", Right: "right" }),
    variant: figma.enum("Variant", { Default: "default", Edge: "edge" }),
    disabled: figma.boolean("Disabled"),
  },
  example: ({ direction, variant, disabled }) => (
    <ArrowButton direction={direction} variant={variant} disabled={disabled} />
  ),
});
```

- [ ] **Step 3: Create Code Connect files for cards**

Create `packages/react/src/cards/ProductCard.figma.ts`:

```typescript
import figma from "@figma/code-connect";
import { ProductCard } from "./ProductCard";

figma.connect(ProductCard, "FIGMA_URL_PLACEHOLDER", {
  props: {
    image: figma.string("Image URL"),
    name: figma.string("Name"),
    color: figma.string("Color"),
    price: figma.string("Price"),
    badge: figma.string("Badge"),
  },
  example: ({ image, name, color, price, badge }) => (
    <ProductCard image={image} name={name} color={color} price={Number(price)} badge={badge} />
  ),
});
```

Create `packages/react/src/cards/CategoryCard.figma.ts`:

```typescript
import figma from "@figma/code-connect";
import { CategoryCard } from "./CategoryCard";

figma.connect(CategoryCard, "FIGMA_URL_PLACEHOLDER", {
  props: {
    image: figma.string("Image URL"),
    title: figma.string("Title"),
    href: figma.string("Link"),
    caption: figma.string("Caption"),
  },
  example: ({ image, title, href, caption }) => (
    <CategoryCard image={image} title={title} href={href} caption={caption} />
  ),
});
```

Create `packages/react/src/cards/ColorSwatch.figma.ts`:

```typescript
import figma from "@figma/code-connect";
import { ColorSwatch } from "./ColorSwatch";

figma.connect(ColorSwatch, "FIGMA_URL_PLACEHOLDER", {
  props: {
    image: figma.string("Image URL"),
    label: figma.string("Label"),
    selected: figma.boolean("Selected"),
    isNew: figma.boolean("Is New"),
  },
  example: ({ image, label, selected, isNew }) => (
    <ColorSwatch image={image} label={label} selected={selected} isNew={isNew} onClick={() => {}} />
  ),
});
```

Create `packages/react/src/cards/SizeButton.figma.ts`:

```typescript
import figma from "@figma/code-connect";
import { SizeButton } from "./SizeButton";

figma.connect(SizeButton, "FIGMA_URL_PLACEHOLDER", {
  props: {
    label: figma.string("Label"),
    selected: figma.boolean("Selected"),
    soldOut: figma.boolean("Sold Out"),
  },
  example: ({ label, selected, soldOut }) => (
    <SizeButton label={label} selected={selected} soldOut={soldOut} onClick={() => {}} />
  ),
});
```

Create `packages/react/src/cards/CrossSellCard.figma.ts`:

```typescript
import figma from "@figma/code-connect";
import { CrossSellCard } from "./CrossSellCard";

figma.connect(CrossSellCard, "FIGMA_URL_PLACEHOLDER", {
  props: {
    image: figma.string("Image URL"),
    name: figma.string("Name"),
    color: figma.string("Color"),
    price: figma.string("Price"),
  },
  example: ({ image, name, color, price }) => (
    <CrossSellCard image={image} name={name} color={color} price={Number(price)} />
  ),
});
```

- [ ] **Step 4: Create Code Connect files for sections**

Create `packages/react/src/sections/CampaignHero.figma.ts`:

```typescript
import figma from "@figma/code-connect";
import { CampaignHero } from "./CampaignHero";

figma.connect(CampaignHero, "FIGMA_URL_PLACEHOLDER", {
  props: {
    image: figma.string("Image URL"),
    caption: figma.string("Caption"),
    heading: figma.string("Heading"),
    ctaLabel: figma.string("CTA Label"),
    ctaHref: figma.string("CTA Link"),
  },
  example: ({ image, caption, heading, ctaLabel, ctaHref }) => (
    <CampaignHero
      image={image}
      caption={caption}
      heading={heading}
      cta={{ label: ctaLabel, href: ctaHref }}
    />
  ),
});
```

Create `packages/react/src/sections/AnnouncementBar.figma.ts`:

```typescript
import figma from "@figma/code-connect";
import { AnnouncementBar } from "./AnnouncementBar";

figma.connect(AnnouncementBar, "FIGMA_URL_PLACEHOLDER", {
  example: () => (
    <AnnouncementBar
      slides={[
        { text: "FREE TRACKED DELIVERY", detail: "On orders over £30" },
        { text: "HASSLE-FREE RETURNS", detail: "100-day free returns*" },
      ]}
      interval={4000}
    />
  ),
});
```

Create `packages/react/src/sections/NewsletterSignup.figma.ts`:

```typescript
import figma from "@figma/code-connect";
import { NewsletterSignup } from "./NewsletterSignup";

figma.connect(NewsletterSignup, "FIGMA_URL_PLACEHOLDER", {
  example: () => <NewsletterSignup onSubmit={(email) => console.log(email)} />,
});
```

Create `packages/react/src/sections/Footer.figma.ts`:

```typescript
import figma from "@figma/code-connect";
import { Footer } from "./Footer";

figma.connect(Footer, "FIGMA_URL_PLACEHOLDER", {
  example: () => (
    <Footer
      columns={[
        { heading: "Account", links: ["Login", "Register", "Rewards"] },
        { heading: "About", links: ["About", "Careers", "Sustainability"] },
        { heading: "Contact", links: ["Contact Us", "Privacy Policy"] },
        { heading: "Delivery & Returns", links: ["Shipping", "Returns"] },
      ]}
    />
  ),
});
```

- [ ] **Step 5: Commit**

```bash
git add packages/react/package.json packages/react/src/**/*.figma.ts
git commit -m "feat(react): add Figma Code Connect files for all components"
```

- [ ] **Step 6: Update FIGMA_URL_PLACEHOLDER values**

After Figma components are created in Task 10, replace each `FIGMA_URL_PLACEHOLDER` with the actual Figma component URL from the library file. Use the Figma MCP tools to get component URLs.

- [ ] **Step 7: Push Code Connect**

Run: `cd packages/react && npx figma connect publish`

- [ ] **Step 8: Commit updated URLs**

```bash
git add packages/react/src/**/*.figma.ts
git commit -m "fix(react): update Code Connect files with actual Figma component URLs"
```

---

## Phase A (Final): Deploy

### Task 12: Deploy Preview App to Vercel

- [ ] **Step 1: Deploy**

Run: `cd apps/preview && npx vercel` (or use the `vercel:deploy` skill)

Configure:
- Framework: Next.js
- Root directory: `apps/preview`
- Build command: `cd ../.. && pnpm turbo run build --filter=@dfyne/preview`
- Output directory: `.next`

- [ ] **Step 2: Verify deployment**

Open the deployed URL and verify all sections render: components, token glossary, usage guidelines.

- [ ] **Step 3: Commit any Vercel config**

```bash
git add vercel.json apps/preview/vercel.json 2>/dev/null
git commit -m "chore: add Vercel deployment config for preview app" 2>/dev/null || true
```

---

## Self-Review

**Spec coverage:**
- ✅ Layer A: Naming glossary (Task 1, 3), Usage guidelines (Task 4, 5), Do/Don't examples (Task 4, 5), Copy-as dropdown (Task 2, 3), Deployment (Task 12)
- ✅ Layer B: Figma variables (Task 9), Figma components (Task 10), Code Connect (Task 11)
- ✅ Layer C: AI context build script (Task 7), System prompt (Task 7), JSON context (Task 7), CLAUDE.md + .cursorrules (Task 8)
- ✅ Build order matches spec phases
- ✅ Success criteria addressable by deliverables

**Placeholder scan:** `FIGMA_URL_PLACEHOLDER` in Task 11 is intentional — replaced in Step 6 after Figma components are created in Task 10.

**Type consistency:** `GlossaryEntry`, `UsageGuideline`, `DoExample`, `ComponentInfo` — types are consistent across files. `generateGlossary` signature matches test usage. `generatePrompt` and `generateJson` signatures match `build.ts` usage.
