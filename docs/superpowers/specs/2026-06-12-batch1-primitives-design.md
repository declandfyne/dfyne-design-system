# Batch 1: Primitive Components — QuantityInput, Accordion, Search

**Date:** 2026-06-12
**Status:** Approved

## Goal

Add 3 primitive components to `@dfyne/react` that serve as building blocks for Batch 2 (Product experience) and Batch 3 (Cart & Navigation). All components match the live DFYNE Shopify site visually but use clean, flexible React APIs.

## Design Principles

- **Render-only** — components take data as props, no fetching
- **Token-bound** — all colors, spacing, radius, typography use CSS tokens from `packages/tokens/src/tokens.css`
- **Composable** — small, focused components that combine into larger patterns
- **Accessible** — keyboard navigation, ARIA attributes, focus management

---

## Component 1: QuantityInput

### Import

```tsx
import { QuantityInput } from '@dfyne/react'
```

### Props

```ts
interface QuantityInputProps {
  value: number
  onChange: (value: number) => void
  min?: number          // default 1
  max?: number          // default 99
  disabled?: boolean
  className?: string
}
```

### Visual Spec

- Layout: horizontal `[ - ]  1  [ + ]` with border around whole group
- Height: 42px
- Border: `--border-color-default` (#e8e8e1), 1px
- Border radius: 0px (square corners, matching live site)
- Minus/plus buttons: 42×42px, Icon component (custom minus/plus), centered
- Dividers: 1px vertical borders between buttons and input
- Input: centered number, no spinners, `--text-base` (13px) Raleway Regular
- Button text color: `--text-color-primary`
- Disabled state: `--text-color-disabled`, `--border-color-disabled`
- Min value reached: minus button disabled. Max value reached: plus button disabled.
- Direct keyboard input allowed, clamped to min/max on blur

### File

`packages/react/src/primitives/QuantityInput.tsx`

---

## Component 2: Accordion

### Import

```tsx
import { Accordion, AccordionItem } from '@dfyne/react'
```

### Props

```ts
interface AccordionProps {
  allowMultiple?: boolean  // default false
  children: ReactNode      // AccordionItem children
  className?: string
}

interface AccordionItemProps {
  title: string
  defaultOpen?: boolean    // default false
  disabled?: boolean
  children: ReactNode
  className?: string
}
```

### Visual Spec

- Each AccordionItem has a top border: `--border-color-default` (#e8e8e1), 1px
- Last item has a bottom border too
- Title row: flex, space-between, vertically centered
  - Text: 10px Raleway SemiBold, uppercase, tracking 1.5px (`--text-label`, `--tracking-widest`)
  - Chevron-down Icon on right, 16×16px, rotates 180° when open
  - Padding: 14px vertical (using `--space-6`)
  - Cursor: pointer (disabled: default cursor)
- Content panel:
  - Smooth height animation (CSS transition on max-height or grid-template-rows trick)
  - Padding: 0 0 14px 0 when open
  - Text: 13px Raleway Regular, `--leading-base` line height
- Single-open mode: opening one item closes any other open item
- Multi-open mode: items toggle independently
- Disabled item: `--text-color-disabled`, no hover, no click

### File

`packages/react/src/disclosure/Accordion.tsx` (exports both `Accordion` and `AccordionItem`)

---

## Component 3: Search

### Import

```tsx
import { Search } from '@dfyne/react'
```

### Props

```ts
interface SearchResult {
  id: string
  title: string
  image?: string
  price?: string
  type?: 'product' | 'collection' | 'page'
}

interface SearchProps {
  value: string
  onChange: (query: string) => void
  results?: SearchResult[]
  onSelect?: (result: SearchResult) => void
  placeholder?: string    // default "Search"
  loading?: boolean
  className?: string
}
```

### Visual Spec

**Input:**
- Height: 42px
- Background: `--bg-input` (#fafafa)
- Border: 1px `--border-color-input` (#e0e0d9)
- Focus: border `--border-color-focus` (#111111)
- Border radius: 0px (square, matching live site)
- Search icon (left): 16×16px, `--text-color-muted`, 14px left padding
- Text: 13px Raleway Regular, `--text-color-primary`
- Placeholder: `--text-color-muted`
- Clear button (right): appears when value is non-empty, Icon close, 16×16px, `--text-color-muted`, hover `--text-color-primary`
- Padding: 0 42px 0 42px (space for icons)

**Dropdown:**
- Appears below input when `results` is non-empty OR `loading` is true
- Background: `--bg-primary` (#ffffff)
- Border: 1px `--border-color-default`
- Shadow: `--shadow-lg`
- Max height: 400px, overflow-y auto
- Width: matches input width

**Results:**
- Grouped by `type` with section headers: "PRODUCTS", "COLLECTIONS", "PAGES"
- Section headers: 10px Raleway SemiBold, uppercase, tracking 1.5px, `--text-color-muted`, padding 10px 14px
- Each result row: flex, 48px min-height, padding 8px 14px, hover `--bg-subtle`
  - Product: 40×40px image thumbnail (rounded 2px) + title (13px Regular) + price (11px SemiBold, `--color-price`)
  - Collection/Page: title only (13px Regular)
- Loading state: 3 shimmer placeholder rows (pulsing `--bg-wash` blocks)
- Empty state (results is empty array, not undefined): "No results found" text, centered, `--text-color-muted`

**Behavior:**
- Dropdown closes on click outside or Escape key
- Arrow keys navigate results, Enter selects
- `onSelect` fires with the selected result object
- `onChange` fires on every keystroke (consumer debounces if needed)

### File

`packages/react/src/search/Search.tsx`

---

## Shared Changes

### New exports in index.ts

```ts
// packages/react/src/index.ts — add:
export { QuantityInput } from './primitives/QuantityInput'
export { Accordion, AccordionItem } from './disclosure/Accordion'
export { Search } from './search/Search'
```

### New icons needed

Add to the Icon component:
- `minus` — horizontal line (for QuantityInput)
- `plus` — cross/plus sign (for QuantityInput)

These may already exist as part of the 21 icons — check before adding.

### CLAUDE.md update

Add the 3 new components to the Available Components list.

---

## Build Order

1. Add minus/plus icons to Icon (if needed)
2. QuantityInput (standalone, no deps)
3. Accordion + AccordionItem (standalone, no deps)
4. Search (standalone, no deps)
5. Add exports to index.ts
6. Update CLAUDE.md
7. Add to preview app
8. Push to Figma + Code Connect
