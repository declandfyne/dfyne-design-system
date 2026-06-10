# @dfyne/tokens

Design tokens for the DFYNE design system. Single source of truth consumed by `@dfyne/react` and `@dfyne/liquid`.

## Install

```bash
pnpm add @dfyne/tokens
```

## Usage

### CSS (Liquid or any HTML)

```html
<link rel="stylesheet" href="@dfyne/tokens/css" />
```

Then use custom properties:

```css
.my-element {
  color: var(--color-text-primary);
  font-size: var(--text-xl);
  padding: var(--space-8);
  border-radius: var(--radius-md);
}
```

### JavaScript / TypeScript

```ts
import { colorBgPrimary, spaceEight, bpLg } from "@dfyne/tokens";
```

### JSON (tooling / Figma sync)

```ts
import tokens from "@dfyne/tokens/json";
// tokens["color-bg-primary"] === "#ffffff"
```

## Token Categories

- **Colors** — backgrounds, text, borders, overlays
- **Typography** — font families, sizes, weights, tracking
- **Spacing** — 14-step scale from 2px to 40px
- **Border radius** — 9 values from 0px to 999px
- **Shadows** — 8 elevation levels
- **Breakpoints** — sm/md/lg/xl/2xl
- **Z-index** — 6-level stacking scale
- **Animation** — durations and easing functions

## Build

```bash
pnpm build    # Generates dist/ from src/tokens.css
pnpm test     # Validates token structure and build output
```
