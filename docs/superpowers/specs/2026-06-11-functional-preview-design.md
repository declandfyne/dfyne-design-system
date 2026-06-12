# Functional Preview App Redesign

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the design system preview from a static showcase into a functional reference tool that ensures Figma-to-Shopify consistency for both developers and designers.

**Architecture:** Single-page Next.js app (existing `apps/preview`). Add interactive component cards with spec panels, code snippets, copy-to-clipboard, and a dev/designer mode toggle. All data derived from the existing `@dfyne/tokens` package and the Shopify theme codebase at `/Users/declanmalone/Desktop/MAIN-SHOPIFY-DEVELOPMENT/`.

---

## 1. Component Card Layout

Each component section (Button, Badge, ProductCard, CategoryCard, SizeButton, ColorSwatch, CrossSellCard, SectionHeading, ArrowButton, CampaignHero, AnnouncementBar, NewsletterSignup, Footer) becomes an interactive card with three zones:

### 1.1 Preview Zone (top)

- Live rendered component, same as today
- **State toggles**: Row of pills above the component to switch between states (default, hover, active, disabled, variant A, variant B, etc.)
- Hover simulation: wrapping div that applies the hover class on toggle click rather than requiring actual mouse hover
- Each variant/state renders the component with the appropriate props

### 1.2 Spec Panel (right side on desktop, below on mobile)

Vertical list of property → value pairs, grouped:

```
Typography
  Font Family    Raleway, sans-serif        [copy]
  Font Size      9px                        [copy]
  Font Weight    600                        [copy]
  Tracking       2.7px                      [copy]
  Transform      uppercase                  [copy]

Spacing
  Padding        13px 20px                  [copy]
  Min Width      90px                       [copy]

Colors
  Background     #111111                    [copy]
  Text           #ffffff                    [copy]
  Border         transparent                [copy]

Shape
  Radius         50px                       [copy]
```

- Each value is a button — clicking copies the raw value to clipboard
- Hovering a value shows a tooltip with the CSS variable name (e.g. `--radius-button`)
- When a state toggle is active, the spec panel updates to show that state's values (e.g. disabled shows `bg: #f6f6f6`, `text: #b6b6b6`)

### 1.3 Code Panel (bottom)

Two tabs: **Liquid** and **React**

**Liquid tab:**
```html
<!-- Primary button -->
<button class="btn">ADD TO CART</button>

<!-- Secondary button -->
<button class="btn btn--secondary">COMPLETE THE LOOK</button>

<!-- Tertiary button -->
<button class="btn btn--tertiary">Size Guide</button>

<!-- Disabled -->
<button class="btn" disabled>SOLD OUT</button>
```

**React tab:**
```tsx
import { Button } from "@dfyne/react";

<Button variant="primary">ADD TO CART</Button>
<Button variant="secondary">COMPLETE THE LOOK</Button>
<Button variant="tertiary">Size Guide</Button>
<Button disabled>SOLD OUT</Button>
```

- Entire code block has a copy button in top-right corner
- Syntax highlighted with basic token coloring (strings green, tags blue, attrs purple)

### 1.4 Figma Callout Strip

Thin bar below the code panel:
- Shows the Figma component path: `Components / Buttons / Primary`
- If any token value differs between the design system and Figma, shows a yellow warning: `⚠ Figma uses 0.3em tracking, system uses 2.7px`

---

## 2. Dev/Designer Mode Toggle

Top-right of the sticky nav, a two-option toggle: **Dev** | **Designer**

### Dev Mode (default)
- Code panel expanded by default
- Spec panel in compact single-line mode (property: value on one line)
- Liquid class names shown prominently

### Designer Mode
- Spec panel expanded by default
- Code panel collapsed (click to expand)
- Adds Figma token names inline next to each spec value
- Red highlight on any value where Figma and CSS diverge

Mode preference persisted in localStorage.

---

## 3. Copy to Clipboard

Every value in the spec panel and code blocks is copyable:
- Click a spec value → copies the raw value (e.g. `#111111`)
- Click the code block copy button → copies the entire snippet
- Brief "Copied" toast appears bottom-center for 1.5s

Implementation: `navigator.clipboard.writeText()` with a shared `useCopyToClipboard` hook.

---

## 4. Search / Filter

Below the sticky nav, a search input that filters component sections by name. Typing "button" shows Button, ArrowButton, SizeButton. Typing "card" shows ProductCard, CategoryCard, CrossSellCard.

Simple `includes()` match on component name. Sections not matching get `display: none`.

---

## 5. Component Data Structure

Each component's spec data is defined as a typed object:

```ts
type ComponentSpec = {
  name: string;                          // "Button"
  figmaPath: string;                     // "Components / Buttons / Primary"
  liquidClasses: Record<string, string>; // { primary: ".btn", secondary: ".btn .btn--secondary" }
  variants: {
    name: string;                        // "Primary"
    props: Record<string, unknown>;      // { variant: "primary", children: "ADD TO CART" }
    specs: {
      group: string;                     // "Typography" | "Spacing" | "Colors" | "Shape"
      property: string;                  // "Font Size"
      value: string;                     // "9px"
      cssVar?: string;                   // "--text-button"
      figmaToken?: string;              // "Text/Button"
    }[];
  }[];
};
```

This data lives in a `componentSpecs.ts` file in the preview app, populated from the live site computed styles and Shopify codebase CSS.

---

## 6. Sections Retained As-Is

The following top-level sections remain unchanged:
- Colors (Radix-style grid)
- Typography (text styles table with all component styles)
- Component Typography (per-component spec table)
- Image Aspect Ratios (visual ratio cards)
- Spacing scale
- Border Radius scale
- Shadows
- Icons

These are token-level documentation, not component-level. They stay as static reference.

---

## 7. Scope

### In scope
- Interactive component cards with spec panels for all 13 components
- Liquid + React code tabs with copy
- Dev/Designer mode toggle
- Search/filter
- Copy to clipboard on all values
- Figma callout strip (static data, manually maintained)

### Out of scope
- Figma API integration (automated sync)
- Visual regression testing
- Storybook migration
- Component playground with editable props
