# Preview App Redesign — Storybook-Style Developer Experience

**Date:** 2026-06-12
**Status:** Draft
**Goal:** Redesign the preview app from a documentation page into an interactive Storybook-style tool with live prop controls, copy-paste code, and a proper API reference.

## Context

**Problem:** The current preview app is a long scrolling page of token swatches and component cards. It doesn't feel like a developer tool — there's no way to interact with components, tweak props live, or quickly grab production-ready code.

**What exists:** 17 React components with full spec data, token glossary, usage guidelines, code snippets (React + Liquid). All data-driven from `componentSpecs.ts`, `tokenData.ts`, `usageGuidelines.ts`.

**Target:** A Storybook-style three-panel layout that developers actually want to use every day.

## Layout Architecture

Three-panel layout filling the viewport:

```
┌──────────┬────────────────────────────┬────────────┐
│          │  Toolbar (Canvas/Docs/Usage)│            │
│ Sidebar  ├────────────────────────────┤ Props      │
│ (240px)  │                            │ Panel      │
│          │  Canvas (component render) │ (300px)    │
│          │                            │            │
│          ├────────────────────────────┤            │
│          │  Code Panel (collapsible)  │            │
└──────────┴────────────────────────────┴────────────┘
```

### Left Sidebar (240px, fixed)

- **Header:** DFYNE logo + search input
- **Groups:** Components organized by category matching `packages/react/src/` directory structure:
  - Primitives: Button, Badge, Icon, SectionHeading, ArrowButton
  - Cards: ProductCard, CategoryCard, ColorSwatch, SizeButton, CrossSellCard
  - Sections: CampaignHero, AnnouncementBar, NewsletterSignup, Footer
  - Tokens: Colors, Typography, Spacing, Glossary
- **Behavior:** Click to select, active state with left border accent. Search filters across all groups.
- **State:** Selected component stored in URL hash (`#Button`, `#ProductCard`) for shareability.

### Center Main Area

Three sub-sections stacked vertically:

#### Toolbar (44px, fixed)

- **Left tabs:** Canvas | Docs | Usage
  - **Canvas** — live component render (default)
  - **Docs** — API prop table + description (generated from component source)
  - **Usage** — usage guidelines (from `usageGuidelines.ts`)
- **Right controls:**
  - "Copy JSX" button — copies the current component code with current prop values
  - Background toggle (dark canvas / light canvas) for checking component contrast

#### Canvas Area (flexible, fills remaining space)

- Dark background (#0e0e0e) with centered white card
- Renders the actual `@dfyne/react` component with current prop values from the controls panel
- Shows all variants side-by-side when no specific variant is selected
- When a variant is selected in controls, shows only that variant centered

#### Code Panel (collapsible, bottom)

- Three tabs: React | Liquid | CSS Tokens
- **React tab:** Shows import statement + JSX with current prop values (updates live as props change)
- **Liquid tab:** Shows Liquid snippet code from `componentSpecs.ts`
- **CSS Tokens tab:** Shows relevant CSS variables used by this component
- Syntax highlighting (keyword, string, component, prop colors)
- One-click copy button per tab
- Collapsible via drag or click to maximize canvas space

### Right Props Panel (300px, fixed)

Three sections, scrollable:

#### Controls Section

Live prop editing that updates the canvas in real-time:
- **Enum props** (e.g., `variant`) → dropdown select
- **Boolean props** (e.g., `disabled`) → toggle switch
- **String props** (e.g., `children`) → text input
- **Number props** (e.g., `price`) → number input

Controls are generated from the component's prop types. Each component defines its controllable props in a data file (extending `componentSpecs.ts`).

#### API Section

Prop table with columns: Prop | Type | Default
- Type shown as colored badge (string=blue, boolean=red, enum=green, number=yellow)
- Generated from component TypeScript types
- Compact, scannable format

#### Specs Section

Design specifications for the selected variant:
- Key-value pairs: Font, Tracking, Padding, Background, Text, Radius, etc.
- Color values show inline swatches
- Data comes from existing `componentSpecs.ts` variant specs

## Dark Theme

The entire app uses a dark theme:
- Background: #0e0e0e (main), #141414 (panels)
- Borders: #222
- Text: #e0e0e0 (primary), #888 (secondary), #555 (muted)
- Active/accent: #fff
- Code highlighting: standard dark theme colors (red keywords, blue strings, purple components)

Rationale: Dark theme makes the white component canvas pop and feels more like a dev tool. The components themselves render on a white card, showing their actual appearance.

## Token Pages

When a token category is selected from the sidebar (Colors, Typography, Spacing, Glossary), the main area switches from the three-panel component view to a full-width token documentation view:

- **Colors:** Grid of color swatches with token names, hex values, copy buttons
- **Typography:** Text style samples with specs
- **Spacing:** Visual scale bars
- **Glossary:** The existing GlossaryTable with multi-format copy (CSS/Figma/JS)

These reuse the existing `TokenSections.tsx` content but restyled to match the dark theme.

## Data Structure for Controls

Extend the existing component data to include controllable props:

```typescript
// apps/preview/src/data/componentControls.ts
export type PropControl =
  | { type: "enum"; options: string[]; default: string }
  | { type: "boolean"; default: boolean }
  | { type: "string"; default: string }
  | { type: "number"; default: number };

export type ComponentControls = {
  component: string;
  props: Record<string, PropControl>;
};
```

Example for Button:
```typescript
{
  component: "Button",
  props: {
    variant: { type: "enum", options: ["primary", "secondary", "tertiary", "ghost"], default: "primary" },
    disabled: { type: "boolean", default: false },
    children: { type: "string", default: "ADD TO CART" },
  },
}
```

## Component Architecture

The preview app becomes a single-page app with URL-hash routing:

```
apps/preview/src/
  app/
    page.tsx          — shell: reads hash, renders layout
    layout.tsx        — unchanged (fonts, metadata)
    globals.css       — dark theme base styles
  components/
    Sidebar.tsx       — nav sidebar with search + grouped items
    Canvas.tsx        — component render area with white card
    CodePanel.tsx     — syntax-highlighted code tabs with copy
    PropsPanel.tsx    — controls + API table + specs
    ControlInput.tsx  — individual prop control (select/toggle/input)
    Toolbar.tsx       — Canvas/Docs/Usage tabs + copy button
    TokenPage.tsx     — full-width token documentation (dark themed)
  data/
    componentControls.ts  — prop controls for each component
    componentSpecs.ts     — existing (unchanged)
    tokenData.ts          — existing (unchanged)
    usageGuidelines.ts    — existing (unchanged)
    tokenGlossary.ts      — existing (unchanged)
```

## What Gets Removed

- The current long-scroll page layout
- The light theme styling
- ModeToggle (dev/designer) — replaced by the tabs (Canvas/Docs/Usage)
- ComponentCard.tsx — replaced by the Canvas + PropsPanel
- StateToggles.tsx — replaced by prop controls
- The hero section

## What Gets Kept

- All data files (componentSpecs, tokenData, usageGuidelines, tokenGlossary)
- CopyButton / CopyAsDropdown functionality (integrated into new components)
- GlossaryTable (restyled for dark theme)
- Search functionality (moved to sidebar)

## Out of Scope

- Server-side routing (hash routing is sufficient for this tool)
- Persistent prop state across page reloads
- Component composition playground (e.g., placing a Badge inside a ProductCard)
- Mobile responsive layout (this is a desktop dev tool)
- Keyboard shortcuts
