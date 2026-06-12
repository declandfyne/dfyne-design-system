# AI-Native Design System

**Date:** 2026-06-12
**Status:** Draft
**Goal:** Make the DFYNE design system the shared language between designers, developers, and AI tools — eliminating the three-translation problem (AI prototype → Figma → code).

## Context

**Team:** Internal only (devs + designers).
**Current workflow:** Designers use AI tools to generate live prototypes, translate those back into Figma, then devs implement from Figma. Each translation is a place where intent drifts.
**Core problem:** No shared vocabulary for tokens, components, variants, or states. Everyone wings it.
**Figma state:** Mostly one-off designs, no shared component library.

**What exists today:**
- 178 CSS design tokens (colors, typography, spacing, shadows, animation, z-index, breakpoints)
- 17 React components (primitives, cards, rails, sections) with 113 passing tests
- 13 Liquid snippets/sections for Shopify
- Preview app at localhost:3333 with component cards, spec panels, code tabs, dev/designer mode

## Architecture: Three Incremental Layers

Each layer is useful on its own. Ship A first, B next, C alongside B.

---

### Layer A — Shared Dictionary (Reference Site)

Upgrade the preview app into the team's canonical reference for naming and usage.

**Already built:**
- Token swatches (colors, spacing, radius, shadows)
- Component previews with live rendering
- Spec panels (typography, spacing, colors per variant)
- Code snippets (React + Liquid)
- Dev / Designer mode toggle
- Search / filter

**To add:**

1. **Naming glossary** — a dedicated section that lists every token, component, variant, and state with its canonical name across all platforms:
   - CSS variable name (`--color-text-primary`)
   - Figma variable path (`color/text/primary`)
   - JS import name (`colorTextPrimary`)
   - Plain English name for conversation ("text primary")

2. **Usage guidelines per component** — when to use it, when not to. Short, opinionated. Example: "Use Badge for product labels (NEW, SALE). Don't use for status indicators or counts."

3. **Do / Don't examples** — visual pairs rendered with actual components showing correct vs incorrect usage. Generated from a data file, not hand-coded HTML.

4. **Copy-friendly token references** — one-click copy buttons that output the token name in the format the user needs (CSS var, Figma variable, JS import). The preview app already has copy buttons for individual values; extend this to a "copy as..." dropdown.

5. **Deployment** — deploy the preview app to a URL the whole team can access. Vercel is the natural choice given the Next.js stack.

**Key constraint:** Everything on the reference site is generated from the code packages (tokens.css, React components, Liquid snippets). No manually-maintained documentation pages. If the code changes, the reference updates on next build.

**Data structure for usage guidelines and do/don'ts:**

```typescript
// apps/preview/src/data/usageGuidelines.ts
export interface UsageGuideline {
  component: string;
  description: string;       // one sentence
  when: string[];             // when to use
  whenNot: string[];          // when not to use
  doExamples: DoExample[];    // rendered with actual components
  dontExamples: DoExample[];
}

export interface DoExample {
  label: string;
  props: Record<string, unknown>;  // props passed to the component
  reason: string;                   // why this is right/wrong
}
```

---

### Layer B — Figma ↔ Code Sync

Build a Figma component library that mirrors code, connected via variables and Code Connect.

**Three pieces:**

#### B1. Figma Variables

All 178 CSS tokens become Figma variables with a consistent naming convention:

| CSS Token | Figma Variable |
|-----------|---------------|
| `--color-text-primary` | `color/text/primary` |
| `--space-4` | `space/4` |
| `--radius-button` | `radius/button` |
| `--text-button` | `text/button` |
| `--weight-semibold` | `weight/semibold` |
| `--shadow-card` | `shadow/card` |

Figma variable collections:
- **Color** — all `--color-*` tokens, organized by semantic group (text, bg, border, overlay)
- **Space** — all `--space-*` and layout tokens (gutter, padding, vertical)
- **Size** — typography sizes (`--text-*`), weights, line heights, tracking
- **Shape** — radius tokens
- **Shadow** — shadow tokens (as Figma effect styles, not variables, since Figma variables don't support shadows)

Implementation: use Figma Plugin API via the Figma MCP tools to create variables programmatically from tokens.css.

#### B2. Figma Components

Each of the 17 React components gets a matching Figma component with:
- **Variant properties** matching React props (e.g., Button has `variant` and `disabled` properties)
- **Auto-layout** matching the CSS layout (flex, gap, padding)
- **Variable bindings** — colors, spacing, radius, typography all bound to Figma variables, not hard-coded hex values
- **Slot patterns** — where React uses children/slots (e.g., Badge inside ProductCard), Figma uses nested instances

Component build order (dependencies first):
1. Icon (19 variants)
2. Badge (4 variants)
3. Button (4 variants × disabled state)
4. ArrowButton, SizeButton, SectionHeading
5. ColorSwatch
6. ProductCard, CategoryCard, CrossSellCard (use Badge, Icon)
7. ProductRail, CategoryRail, CrossSellRail (use cards)
8. CampaignHero, AnnouncementBar, NewsletterSignup, Footer

#### B3. Code Connect

`.figma.ts` files in `packages/react/` that link Figma components to code:

```typescript
// packages/react/src/primitives/Button.figma.ts
import figma from "@figma/code-connect";
import { Button } from "./Button";

figma.connect(Button, "<figma-component-url>", {
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

One `.figma.ts` file per component. When a dev selects a component in Figma, the inspect panel shows the exact React import and props.

**New dev dependency:** `@figma/code-connect` added to `packages/react/`.

---

### Layer C — AI Context Package

Auto-generated context files that AI tools consume so prototypes use real DFYNE tokens and components.

**Build script:** `packages/ai-context/src/build.ts`

Reads from:
- `packages/tokens/src/tokens.css` — all token values
- `packages/react/src/index.ts` — component exports and their prop types
- `apps/preview/src/data/usageGuidelines.ts` — usage rules
- `apps/preview/src/data/componentSpecs.ts` — variant specs

Generates:

1. **`dfyne-system-prompt.md`** — markdown file designers paste into chat AI tools. Contains:
   - Brand overview (Raleway, #111 primary, premium athletic aesthetic)
   - Complete token reference (grouped by category)
   - Component catalog with props and variants
   - Usage rules and constraints
   - Code examples for each component

2. **`CLAUDE.md` addition** — appended to the repo's CLAUDE.md so Claude Code and similar tools automatically use the design system. Contains the same information in a more compact format.

3. **`.cursorrules`** — same content formatted for Cursor IDE.

4. **`dfyne-context.json`** — structured JSON for programmatic consumption by tools or plugins.

**Package structure:**

```
packages/ai-context/
  package.json
  src/
    build.ts          # reads sources, generates outputs
  dist/
    dfyne-system-prompt.md
    dfyne-context.json
```

The root `CLAUDE.md` and `.cursorrules` are generated into the repo root by the build script.

**Build integration:** Added to the turbo pipeline — `ai-context:build` depends on `tokens:build` and `react:build`.

**Key rules baked into the AI context:**
- Use only colors from the token palette — never arbitrary hex values
- All button text: uppercase, 600 weight, 2.7px letter-spacing
- Product images: 4:5 aspect ratio
- Currency: GBP via `Intl.NumberFormat`
- Import components from `@dfyne/react`, not custom implementations
- Spacing uses the `--space-*` scale, never arbitrary pixel values
- Border radius uses `--radius-*` tokens

---

## Build Order

| Phase | Layer | Deliverable | Depends On |
|-------|-------|------------|------------|
| 1 | A | Naming glossary + usage guidelines in preview app | Existing preview app |
| 2 | A | Do/Don't examples + copy-as dropdown | Phase 1 |
| 3 | A | Deploy preview app to Vercel | Phase 2 |
| 4 | C | `packages/ai-context` build script + outputs | Existing tokens + react packages |
| 5 | B | Figma variables from tokens | Existing tokens |
| 6 | B | Figma components (primitives first, then composed) | Phase 5 |
| 7 | B | Code Connect `.figma.ts` files | Phase 6 |
| 8 | C | Wire usage guidelines into AI context generation | Phase 1 + Phase 4 |

Note: Layer C phase 4 can run in parallel with Layer B phases 5-7 since they have no dependencies on each other.

## Success Criteria

- **Shared vocabulary:** A designer says "text-primary" and a dev knows it means `--color-text-primary` / `colorTextPrimary` / `color/text/primary`
- **Figma-code parity:** Every Figma component maps to a React component with matching variants — verified via Code Connect
- **AI-first prototypes:** A designer can paste `dfyne-system-prompt.md` into any AI tool and get output that uses real DFYNE tokens and components without manual correction
- **Zero manual docs:** All reference material is generated from code. Token changes propagate to the reference site, Figma variables, and AI context on next build
- **Team adoption:** The reference site URL is bookmarked by every team member within the first week

## Out of Scope

- Public documentation or external adoption
- Theme switching / dark mode (DFYNE is a single-brand system)
- Design token format standards (W3C DTCG) — tokens.css is the source of truth, not a portable format
- Automated visual regression testing between Figma and code
- Storybook (the preview app serves this purpose)
