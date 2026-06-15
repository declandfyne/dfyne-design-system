# Sanity Content Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Embed a Sanity CMS content layer in the DFYNE preview app so the CEO can edit text values, typography line-height ratios, and product display overrides — without touching existing components.

**Architecture:** Sanity schemas define editable content, typography settings, product overrides, and brand settings. A Sanity client in the preview app fetches data. The settings page embeds Sanity Studio for editing and shows live typography previews. A future-ready DfyneProvider and hooks are created but not wired into components.

**Tech Stack:** Sanity v3, next-sanity, Next.js 15, React 19, TypeScript, Vitest

---

## File Structure

```
apps/preview/
  .env.local                          — Sanity project ID + dataset env vars
  next.config.ts                      — Modified: add Sanity hostname to CSP/images
  src/
    sanity/
      client.ts                       — Sanity client config (projectId, dataset, apiVersion)
      schema/
        siteContent.ts                — Singleton: all editable text strings
        typography.ts                 — Singleton: line-height ratio system
        productOverride.ts            — Document: per-product Shopify overrides
        brandSettings.ts              — Singleton: future brand controls
        index.ts                      — Barrel export of all schemas
    lib/
      lineHeight.ts                   — Pure function: compute 9 line-height tokens from ratio + multipliers
    app/
      settings/
        page.tsx                      — Settings page with tabs: Content, Typography, Product Overrides
      studio/
        [[...tool]]/
          page.tsx                    — Sanity Studio catch-all route (full embedded Studio)
    components/
      Sidebar.tsx                     — Modified: add "Settings" item to sidebar groups
      TypographyPreview.tsx           — Live line-height preview with sample text blocks
      ContentPreview.tsx              — Read-only display of all current Sanity content
    providers/
      DfyneProvider.tsx               — React context provider (created, not consumed)
    hooks/
      useContent.ts                   — Content access hook (future use)
      useTypography.ts                — Typography access hook (future use)
    __tests__/
      lineHeight.test.ts              — Unit tests for line-height calculation
      sanitySchemas.test.ts           — Schema structure validation tests
```

---

## Task 1: Install Dependencies and Create Sanity Project

**Files:**
- Modify: `apps/preview/package.json`
- Create: `apps/preview/.env.local`

- [ ] **Step 1: Install Sanity packages**

Run from the repo root:
```bash
cd apps/preview && pnpm add sanity next-sanity @sanity/vision
```

- [ ] **Step 2: Create or identify a Sanity project**

Run:
```bash
npx sanity init --env .env.local
```

Select: "Create new project", name it "dfyne-design-system", dataset "production", output path "." (current directory). This writes `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` to `.env.local`.

If `sanity init` is interactive and doesn't work in this context, create `.env.local` manually:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=<project-id>
NEXT_PUBLIC_SANITY_DATASET=production
```

The project ID comes from https://www.sanity.io/manage or from running `npx sanity projects list`.

- [ ] **Step 3: Add .env.local to .gitignore if not already there**

Check `apps/preview/.gitignore` (or root `.gitignore`). If `.env.local` is not listed, add it.

- [ ] **Step 4: Commit**

```bash
git add apps/preview/package.json apps/preview/pnpm-lock.yaml
git commit -m "chore: add sanity, next-sanity, @sanity/vision to preview app"
```

---

## Task 2: Sanity Client Configuration

**Files:**
- Create: `apps/preview/src/sanity/client.ts`

- [ ] **Step 1: Create the Sanity client**

Create `apps/preview/src/sanity/client.ts`:

```typescript
import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/sanity/client.ts
git commit -m "feat: add Sanity client configuration"
```

---

## Task 3: Line-Height Calculation — Test First

**Files:**
- Create: `apps/preview/src/lib/lineHeight.ts`
- Create: `apps/preview/src/__tests__/lineHeight.test.ts`

This is a pure function with no Sanity dependency — the core math that drives the typography system.

- [ ] **Step 1: Write the failing tests**

Create `apps/preview/src/__tests__/lineHeight.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { computeLineHeights, type LineHeightTokens, type TypographyInput } from "../lib/lineHeight";

describe("computeLineHeights", () => {
  it("computes all 9 tokens from default inputs", () => {
    const input: TypographyInput = {
      baseRatio: 1.5,
      multipliers: { body: 1.0, heading: 0.82, ui: 0.75 },
    };
    const result = computeLineHeights(input);

    expect(result["--lh-body"]).toBeCloseTo(1.5, 3);
    expect(result["--lh-body-tight"]).toBeCloseTo(1.275, 3);
    expect(result["--lh-body-loose"]).toBeCloseTo(1.725, 3);
    expect(result["--lh-heading"]).toBeCloseTo(1.23, 3);
    expect(result["--lh-heading-tight"]).toBeCloseTo(1.0455, 3);
    expect(result["--lh-heading-loose"]).toBeCloseTo(1.4145, 3);
    expect(result["--lh-ui"]).toBeCloseTo(1.125, 3);
    expect(result["--lh-ui-tight"]).toBeCloseTo(0.95625, 3);
    expect(result["--lh-ui-loose"]).toBeCloseTo(1.29375, 3);
  });

  it("returns exactly 9 keys", () => {
    const input: TypographyInput = {
      baseRatio: 1.5,
      multipliers: { body: 1.0, heading: 0.82, ui: 0.75 },
    };
    const result = computeLineHeights(input);
    expect(Object.keys(result)).toHaveLength(9);
  });

  it("scales proportionally when baseRatio changes", () => {
    const input: TypographyInput = {
      baseRatio: 2.0,
      multipliers: { body: 1.0, heading: 0.82, ui: 0.75 },
    };
    const result = computeLineHeights(input);

    expect(result["--lh-body"]).toBeCloseTo(2.0, 3);
    expect(result["--lh-heading"]).toBeCloseTo(1.64, 3);
    expect(result["--lh-ui"]).toBeCloseTo(1.5, 3);
  });

  it("respects custom multipliers", () => {
    const input: TypographyInput = {
      baseRatio: 1.5,
      multipliers: { body: 0.9, heading: 0.7, ui: 0.6 },
    };
    const result = computeLineHeights(input);

    expect(result["--lh-body"]).toBeCloseTo(1.35, 3);
    expect(result["--lh-heading"]).toBeCloseTo(1.05, 3);
    expect(result["--lh-ui"]).toBeCloseTo(0.9, 3);
  });

  it("generates a valid CSS string from tokens", () => {
    const input: TypographyInput = {
      baseRatio: 1.5,
      multipliers: { body: 1.0, heading: 0.82, ui: 0.75 },
    };
    const result = computeLineHeights(input);

    // All values should be positive numbers
    for (const [key, value] of Object.entries(result)) {
      expect(key).toMatch(/^--lh-/);
      expect(value).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd apps/preview && npx vitest run src/__tests__/lineHeight.test.ts
```
Expected: FAIL — module `../lib/lineHeight` not found.

- [ ] **Step 3: Write the implementation**

Create `apps/preview/src/lib/lineHeight.ts`:

```typescript
export type TypographyInput = {
  baseRatio: number;
  multipliers: {
    body: number;
    heading: number;
    ui: number;
  };
};

export type LineHeightTokens = {
  "--lh-body": number;
  "--lh-body-tight": number;
  "--lh-body-loose": number;
  "--lh-heading": number;
  "--lh-heading-tight": number;
  "--lh-heading-loose": number;
  "--lh-ui": number;
  "--lh-ui-tight": number;
  "--lh-ui-loose": number;
};

const TIGHT = 0.85;
const LOOSE = 1.15;

export function computeLineHeights(input: TypographyInput): LineHeightTokens {
  const { baseRatio, multipliers } = input;

  const body = baseRatio * multipliers.body;
  const heading = baseRatio * multipliers.heading;
  const ui = baseRatio * multipliers.ui;

  return {
    "--lh-body": body,
    "--lh-body-tight": body * TIGHT,
    "--lh-body-loose": body * LOOSE,
    "--lh-heading": heading,
    "--lh-heading-tight": heading * TIGHT,
    "--lh-heading-loose": heading * LOOSE,
    "--lh-ui": ui,
    "--lh-ui-tight": ui * TIGHT,
    "--lh-ui-loose": ui * LOOSE,
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd apps/preview && npx vitest run src/__tests__/lineHeight.test.ts
```
Expected: All 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/preview/src/lib/lineHeight.ts apps/preview/src/__tests__/lineHeight.test.ts
git commit -m "feat: add line-height calculation engine with tests"
```

---

## Task 4: Sanity Schemas

**Files:**
- Create: `apps/preview/src/sanity/schema/siteContent.ts`
- Create: `apps/preview/src/sanity/schema/typography.ts`
- Create: `apps/preview/src/sanity/schema/productOverride.ts`
- Create: `apps/preview/src/sanity/schema/brandSettings.ts`
- Create: `apps/preview/src/sanity/schema/index.ts`

- [ ] **Step 1: Create siteContent schema**

Create `apps/preview/src/sanity/schema/siteContent.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const siteContent = defineType({
  name: "siteContent",
  title: "Site Content",
  type: "document",
  fields: [
    defineField({
      name: "announcements",
      title: "Announcement Bar Slides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "text", title: "Text", type: "string" }),
            defineField({ name: "detail", title: "Detail", type: "string" }),
            defineField({ name: "link", title: "Link", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "hero",
      title: "Campaign Hero",
      type: "object",
      fields: [
        defineField({ name: "caption", title: "Caption", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string" }),
      ],
    }),
    defineField({
      name: "newsletter",
      title: "Newsletter Signup",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "subtext", title: "Subtext", type: "string" }),
        defineField({ name: "placeholder", title: "Placeholder", type: "string" }),
        defineField({ name: "buttonText", title: "Button Text", type: "string" }),
      ],
    }),
    defineField({
      name: "uiLabels",
      title: "UI Labels",
      type: "object",
      fields: [
        defineField({ name: "addToCart", title: "Add to Cart", type: "string" }),
        defineField({ name: "subscribe", title: "Subscribe", type: "string" }),
        defineField({ name: "search", title: "Search", type: "string" }),
        defineField({ name: "viewAll", title: "View All", type: "string" }),
        defineField({ name: "shopNow", title: "Shop Now", type: "string" }),
        defineField({ name: "soldOut", title: "Sold Out", type: "string" }),
        defineField({ name: "sale", title: "Sale", type: "string" }),
        defineField({ name: "newArrival", title: "New Arrival", type: "string" }),
        defineField({ name: "quickAdd", title: "Quick Add", type: "string" }),
        defineField({ name: "selectSize", title: "Select Size", type: "string" }),
      ],
    }),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "object",
      fields: [
        defineField({
          name: "utilityLinks",
          title: "Utility Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "href", title: "URL", type: "string" }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({
          name: "links",
          title: "Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "href", title: "URL", type: "string" }),
              ],
            },
          ],
        }),
        defineField({ name: "copyrightText", title: "Copyright Text", type: "string" }),
      ],
    }),
  ],
});
```

- [ ] **Step 2: Create typography schema**

Create `apps/preview/src/sanity/schema/typography.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const typographySettings = defineType({
  name: "typographySettings",
  title: "Typography Settings",
  type: "document",
  fields: [
    defineField({
      name: "baseRatio",
      title: "Base Line-Height Ratio",
      description: "The base multiplier for all line-height calculations (1.2–2.0)",
      type: "number",
      initialValue: 1.5,
      validation: (rule) => rule.min(1.2).max(2.0),
    }),
    defineField({
      name: "multipliers",
      title: "Category Multipliers",
      type: "object",
      fields: [
        defineField({
          name: "body",
          title: "Body / Paragraphs",
          description: "Multiplier for body text, descriptions, footer links",
          type: "number",
          initialValue: 1.0,
          validation: (rule) => rule.min(0.5).max(2.0),
        }),
        defineField({
          name: "heading",
          title: "Headings / Titles",
          description: "Multiplier for hero headings, section titles, card titles",
          type: "number",
          initialValue: 0.82,
          validation: (rule) => rule.min(0.5).max(2.0),
        }),
        defineField({
          name: "ui",
          title: "UI Elements / Buttons",
          description: "Multiplier for buttons, badges, nav, announcements, form labels",
          type: "number",
          initialValue: 0.75,
          validation: (rule) => rule.min(0.5).max(2.0),
        }),
      ],
    }),
  ],
});
```

- [ ] **Step 3: Create productOverride schema**

Create `apps/preview/src/sanity/schema/productOverride.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const productOverride = defineType({
  name: "productOverride",
  title: "Product Override",
  type: "document",
  fields: [
    defineField({
      name: "shopifyHandle",
      title: "Shopify Handle",
      description: "The Shopify product handle (e.g. 'seamless-legging-black')",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayName",
      title: "Display Name",
      description: "Overrides the Shopify product name",
      type: "string",
    }),
    defineField({
      name: "displayDescription",
      title: "Display Description",
      description: "Overrides the Shopify product description",
      type: "text",
    }),
    defineField({
      name: "customBadgeText",
      title: "Custom Badge Text",
      description: "Custom badge text (e.g. 'NEW', 'LIMITED')",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "shopifyHandle", subtitle: "displayName" },
  },
});
```

- [ ] **Step 4: Create brandSettings schema**

Create `apps/preview/src/sanity/schema/brandSettings.ts`:

```typescript
import { defineType, defineField } from "sanity";

export const brandSettings = defineType({
  name: "brandSettings",
  title: "Brand Settings",
  type: "document",
  fields: [
    defineField({
      name: "primaryColor",
      title: "Primary Color",
      type: "string",
      initialValue: "#111111",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "string",
      initialValue: "#ffffff",
    }),
    defineField({
      name: "fontFamily",
      title: "Font Family",
      type: "string",
      initialValue: "Raleway",
    }),
  ],
});
```

- [ ] **Step 5: Create barrel export**

Create `apps/preview/src/sanity/schema/index.ts`:

```typescript
import { siteContent } from "./siteContent";
import { typographySettings } from "./typography";
import { productOverride } from "./productOverride";
import { brandSettings } from "./brandSettings";

export const schemaTypes = [siteContent, typographySettings, productOverride, brandSettings];
```

- [ ] **Step 6: Commit**

```bash
git add apps/preview/src/sanity/schema/
git commit -m "feat: add Sanity schemas for content, typography, product overrides, and brand settings"
```

---

## Task 5: Sanity Studio Embedded Route

**Files:**
- Create: `apps/preview/src/app/studio/[[...tool]]/page.tsx`

The full Sanity Studio runs as a Next.js catch-all route. This is the standard `next-sanity` embedding pattern.

- [ ] **Step 1: Create the Studio route**

Create directory and file `apps/preview/src/app/studio/[[...tool]]/page.tsx`:

```typescript
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

- [ ] **Step 2: Create sanity.config.ts at preview app root**

Create `apps/preview/sanity.config.ts`:

```typescript
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schema";
import { projectId, dataset } from "./src/sanity/client";

export default defineConfig({
  name: "dfyne-design-system",
  title: "DFYNE Design System",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
```

- [ ] **Step 3: Commit**

```bash
git add apps/preview/src/app/studio/ apps/preview/sanity.config.ts
git commit -m "feat: embed Sanity Studio as /studio route in preview app"
```

---

## Task 6: Typography Preview Component

**Files:**
- Create: `apps/preview/src/components/TypographyPreview.tsx`

This component shows live line-height calculations with sample text. It reads from Sanity and uses the `computeLineHeights` function. It also has local sliders for immediate feedback.

- [ ] **Step 1: Create TypographyPreview component**

Create `apps/preview/src/components/TypographyPreview.tsx`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/TypographyPreview.tsx
git commit -m "feat: add TypographyPreview component with live line-height calculator"
```

---

## Task 7: Content Preview Component

**Files:**
- Create: `apps/preview/src/components/ContentPreview.tsx`

Read-only display of all content values currently stored in Sanity.

- [ ] **Step 1: Create ContentPreview component**

Create `apps/preview/src/components/ContentPreview.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { client } from "../sanity/client";

type SiteContent = {
  announcements?: Array<{ text?: string; detail?: string; link?: string }>;
  hero?: { caption?: string; heading?: string; ctaLabel?: string; secondaryCtaLabel?: string };
  newsletter?: { heading?: string; subtext?: string; placeholder?: string; buttonText?: string };
  uiLabels?: Record<string, string>;
  footer?: { links?: Array<{ label?: string; href?: string }>; copyrightText?: string };
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: 12,
          paddingBottom: 8,
          borderBottom: "1px solid var(--border)",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--border-subtle)" }}>
      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{label}</span>
      <span style={{ fontSize: 12, color: value ? "var(--text-primary)" : "var(--text-muted)", fontStyle: value ? "normal" : "italic" }}>
        {value || "Not set"}
      </span>
    </div>
  );
}

export function ContentPreview() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch<SiteContent | null>(`*[_type == "siteContent"][0]`)
      .then((data) => setContent(data))
      .catch(() => setContent(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ color: "var(--text-muted)", fontSize: 12, padding: 20 }}>
        Loading content...
      </div>
    );
  }

  if (!content) {
    return (
      <div style={{ color: "var(--text-muted)", fontSize: 12, padding: 20 }}>
        No content document found. Create one in the Studio tab to get started.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {content.announcements && content.announcements.length > 0 && (
        <Section title="Announcements">
          {content.announcements.map((a, i) => (
            <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: 12, color: "var(--text-primary)" }}>{a.text || "Empty"}</div>
              {a.detail && (
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{a.detail}</div>
              )}
            </div>
          ))}
        </Section>
      )}

      <Section title="Hero">
        <Field label="Caption" value={content.hero?.caption} />
        <Field label="Heading" value={content.hero?.heading} />
        <Field label="CTA Label" value={content.hero?.ctaLabel} />
        <Field label="Secondary CTA" value={content.hero?.secondaryCtaLabel} />
      </Section>

      <Section title="Newsletter">
        <Field label="Heading" value={content.newsletter?.heading} />
        <Field label="Subtext" value={content.newsletter?.subtext} />
        <Field label="Placeholder" value={content.newsletter?.placeholder} />
        <Field label="Button Text" value={content.newsletter?.buttonText} />
      </Section>

      {content.uiLabels && (
        <Section title="UI Labels">
          {Object.entries(content.uiLabels)
            .filter(([key]) => !key.startsWith("_"))
            .map(([key, value]) => (
              <Field key={key} label={key} value={value} />
            ))}
        </Section>
      )}

      {content.footer && (
        <Section title="Footer">
          <Field label="Copyright" value={content.footer.copyrightText} />
          {content.footer.links?.map((link, i) => (
            <Field key={i} label={link.label || `Link ${i + 1}`} value={link.href} />
          ))}
        </Section>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/components/ContentPreview.tsx
git commit -m "feat: add ContentPreview component showing all Sanity content values"
```

---

## Task 8: Settings Page

**Files:**
- Create: `apps/preview/src/app/settings/page.tsx`

The settings page has three tabs: Content (read-only preview), Typography (live calculator), and a link to the full Studio.

- [ ] **Step 1: Create the settings page**

Create `apps/preview/src/app/settings/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { TypographyPreview } from "../../components/TypographyPreview";
import { ContentPreview } from "../../components/ContentPreview";

type SettingsTab = "content" | "typography" | "studio";

export default function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>("typography");

  const tabs: { key: SettingsTab; label: string }[] = [
    { key: "typography", label: "Typography" },
    { key: "content", label: "Content" },
    { key: "studio", label: "Studio" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "var(--sidebar-width) 1fr",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar active="Settings" onSelect={(name) => {
        if (name !== "Settings") {
          window.location.href = `/#${encodeURIComponent(name)}`;
        }
      }} />

      <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            height: 48,
            borderBottom: "1px solid var(--border)",
            background: "var(--panel-bg)",
            paddingLeft: 20,
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              style={{
                padding: "0 20px",
                height: "100%",
                border: "none",
                background: "transparent",
                fontSize: 11,
                fontWeight: tab === t.key ? 600 : 400,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: tab === t.key ? "var(--text-accent)" : "var(--text-muted)",
                borderBottom: tab === t.key ? "2px solid var(--text-accent)" : "2px solid transparent",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 32 }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            {tab === "typography" && <TypographyPreview />}

            {tab === "content" && <ContentPreview />}

            {tab === "studio" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  The full Sanity Studio editor is available at <code style={{ background: "var(--input-bg)", padding: "2px 6px", borderRadius: 4 }}>/studio</code>. Use it to create and edit content documents, typography settings, and product overrides.
                </p>
                <a
                  href="/studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 20px",
                    background: "#111111",
                    color: "#ffffff",
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: 2.7,
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderRadius: 4,
                    alignSelf: "flex-start",
                  }}
                >
                  Open Studio
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/preview/src/app/settings/
git commit -m "feat: add settings page with typography, content, and studio tabs"
```

---

## Task 9: Add Settings to Sidebar

**Files:**
- Modify: `apps/preview/src/components/Sidebar.tsx`

Add a "Settings" item to the sidebar, visually separated from the component groups.

- [ ] **Step 1: Add Settings group to the sidebar groups array**

In `apps/preview/src/components/Sidebar.tsx`, add a new group after the "Tokens" group in the `groups` array:

```typescript
const groups: SidebarGroup[] = [
  { label: "Primitives", items: ["Button", "Badge", "Icon", "Section Heading", "Arrow Button", "Quantity Input", "Length Selector"] },
  { label: "Disclosure", items: ["Accordion", "Tabs"] },
  { label: "Search", items: ["Search"] },
  { label: "Cards", items: ["Product Card", "Category Card", "Color Swatch", "Size Button", "Cross-Sell Card"] },
  { label: "Gallery", items: ["Product Gallery"] },
  { label: "Filters", items: ["Filter Panel", "Filter Drawer"] },
  { label: "Collection", items: ["Collection Grid", "Collection Intro", "Category Image Carousel"] },
  { label: "Cart", items: ["Cart Item", "Cart Drawer"] },
  { label: "Navigation", items: ["Header", "Back Link", "Social Icons"] },
  { label: "Modals", items: ["Quick Add"] },
  { label: "Feedback", items: ["Toast", "Tooltip"] },
  { label: "Sections", items: ["Campaign Hero", "Announcement Bar", "Newsletter Signup", "Footer"] },
  { label: "Tokens", items: ["Colors", "Typography", "Spacing", "Glossary"] },
  { label: "System", items: ["Settings"] },
];
```

- [ ] **Step 2: Handle Settings navigation**

In the same file, modify the `onSelect` handler call site to redirect to `/settings` when "Settings" is clicked. Update the button's `onClick`:

Find the `onClick` handler in the button that renders each sidebar item. Wrap the `onSelect` call to handle the Settings special case:

```tsx
onClick={() => {
  if (item === "Settings") {
    window.location.href = "/settings";
  } else {
    onSelect(item);
  }
}}
```

- [ ] **Step 3: Commit**

```bash
git add apps/preview/src/components/Sidebar.tsx
git commit -m "feat: add Settings item to sidebar with navigation to /settings"
```

---

## Task 10: Future-Ready Provider and Hooks

**Files:**
- Create: `apps/preview/src/providers/DfyneProvider.tsx`
- Create: `apps/preview/src/hooks/useContent.ts`
- Create: `apps/preview/src/hooks/useTypography.ts`

These are created but NOT consumed by any component. They're ready for the future migration.

- [ ] **Step 1: Create DfyneProvider**

Create `apps/preview/src/providers/DfyneProvider.tsx`:

```tsx
"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { client } from "../sanity/client";
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
```

- [ ] **Step 2: Create useContent hook**

Create `apps/preview/src/hooks/useContent.ts`:

```typescript
import { useDfyneContext } from "../providers/DfyneProvider";

/**
 * Access a content value by dot-notation key.
 * Falls back to `fallback` if not found or provider not mounted.
 *
 * Usage (future): const label = useContent("uiLabels.addToCart", "ADD TO CART");
 */
export function useContent<T = string>(key: string, fallback: T): T {
  const { content } = useDfyneContext();
  if (!content) return fallback;

  const parts = key.split(".");
  let current: unknown = content;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return fallback;
    current = (current as Record<string, unknown>)[part];
  }

  return (current as T) ?? fallback;
}
```

- [ ] **Step 3: Create useTypography hook**

Create `apps/preview/src/hooks/useTypography.ts`:

```typescript
import { useDfyneContext } from "../providers/DfyneProvider";
import type { LineHeightTokens } from "../lib/lineHeight";

/**
 * Access computed line-height tokens.
 *
 * Usage (future): const tokens = useTypography();
 * Then use tokens["--lh-body"] etc.
 */
export function useTypography(): LineHeightTokens | null {
  const { typography } = useDfyneContext();
  return typography;
}
```

- [ ] **Step 4: Commit**

```bash
git add apps/preview/src/providers/ apps/preview/src/hooks/useContent.ts apps/preview/src/hooks/useTypography.ts
git commit -m "feat: add DfyneProvider, useContent, and useTypography hooks (future-ready, not wired)"
```

---

## Task 11: Verify Everything Works

- [ ] **Step 1: Run existing tests to make sure nothing is broken**

```bash
cd apps/preview && npx vitest run
```
Expected: All existing tests pass, plus the new lineHeight tests.

- [ ] **Step 2: Run the dev server**

```bash
cd /Users/declanmalone/Desktop/dfyne-design-system && npm run dev
```

Verify:
- Preview app loads at `http://localhost:3333`
- "Settings" appears in the sidebar under "System"
- Clicking "Settings" navigates to `/settings`
- Typography tab shows the slider and live preview
- Content tab shows "No content document found" (expected — no data in Sanity yet)
- Studio tab shows link to `/studio`
- `/studio` loads the full Sanity Studio

- [ ] **Step 3: Run the build to make sure it compiles**

```bash
cd apps/preview && npx next build
```
Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 4: Commit any fixes if needed, then final commit**

```bash
git add -A
git commit -m "chore: verify Sanity content layer integration"
```
