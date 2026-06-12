# DFYNE Design System → Figma Library

**Date:** 2026-06-12
**Status:** Approved

## Goal

Push the full DFYNE design system (17 components, 178 tokens) to a new Figma file as a published component library, with Code Connect mapping each Figma component back to `@dfyne/react` source code.

## Approach

**Foundations-first build** with **Code Connect** for ongoing repo↔Figma sync. Components are built once in Figma using the MCP tools, then Code Connect `.figma.ts` files in the repo keep the code link current. Re-push manually when components change.

## File Structure

One Figma file: **"DFYNE Design System"**

### Pages

| Page | Contents |
|------|----------|
| Foundations | Token documentation — color swatches, type scale, spacing scale, radius, shadows |
| Primitives | Icon, Badge, Button, ArrowButton, SectionHeading |
| Cards | ProductCard, CategoryCard, ColorSwatch, SizeButton, CrossSellCard |
| Rails | ProductRail, CategoryRail, CrossSellRail |
| Sections | CampaignHero, AnnouncementBar, NewsletterSignup, Footer |

### Variable Collections

| Collection | Type | Contents |
|------------|------|----------|
| Colors | Color | Semantic color tokens (bg, text, border, overlay) + raw palette (~40 vars) |
| Spacing | Number | --space-1 through --space-16, gutters, padding (~25 vars) |
| Radius | Number | All 11 radius tokens |
| Typography | Number | Font sizes, weights, line heights, letter spacing (~40 vars) |

**Not mapped to variables:** shadows (applied as Figma effects), durations/easing (Figma handles animation differently), z-index (no Figma equivalent), breakpoints (use Figma responsive resize).

~120 variables total.

## Component Mapping

### Primitives

| Component | Figma Structure | Variant Properties |
|---|---|---|
| Icon | Component set, SVG per variant | `name`: 21 icon names |
| Badge | Auto-layout frame, text + padding | `variant`: custom/sold-out/sale/bottom, `position`: top-right/bottom-left/inline |
| Button | Auto-layout frame, text child | `variant`: primary/secondary/tertiary/ghost, `state`: default/hover/disabled |
| ArrowButton | Frame with Icon instance | `direction`: left/right, `variant`: default/edge, `state`: default/hover |
| SectionHeading | Vertical auto-layout, eyebrow + title | None — text overrides only |

### Cards

| Component | Figma Structure | Variant Properties |
|---|---|---|
| ProductCard | Vertical auto-layout: image (4:5) + text stack + rating | `badge`: boolean |
| CategoryCard | Image fill + gradient overlays + text overlay + ArrowButton | None — content overrides |
| ColorSwatch | Image frame + label + optional badge | `selected`: on/off, `isNew`: on/off |
| SizeButton | Auto-layout pill | `selected`: on/off, `soldOut`: on/off |
| CrossSellCard | Vertical auto-layout: small image + text stack | None — content overrides |

### Rails

| Component | Figma Structure | Variant Properties |
|---|---|---|
| ProductRail | SectionHeading + horizontal auto-layout of ProductCards + ArrowButtons | None |
| CategoryRail | Horizontal auto-layout of CategoryCards + ArrowButtons | None |
| CrossSellRail | Title + horizontal auto-layout of CrossSellCards | None |

### Sections

| Component | Figma Structure | Variant Properties |
|---|---|---|
| CampaignHero | Full-width frame: image fill + gradient overlays + text stack + Buttons | None — content overrides |
| AnnouncementBar | Fixed-height (36px) auto-layout, centered text | None — text overrides |
| NewsletterSignup | Centered auto-layout: heading + description + input + Button | None |
| Footer | Grid of columns, each vertical auto-layout | None — column overrides |

All components bind colors, spacing, radius, and typography to Figma variables — no hardcoded values.

## Code Connect

Add `@figma/code-connect` as a dev dependency to `@dfyne/react`.

Each component gets a `.figma.ts` file alongside its source:

```
packages/react/src/
  primitives/
    Icon.figma.ts
    Badge.figma.ts
    SectionHeading.figma.ts
    Button.figma.ts
    ArrowButton.figma.ts
  cards/
    ProductCard.figma.ts
    CategoryCard.figma.ts
    ColorSwatch.figma.ts
    SizeButton.figma.ts
    CrossSellCard.figma.ts
  rails/
    ProductRail.figma.ts
    CategoryRail.figma.ts
    CrossSellRail.figma.ts
  sections/
    CampaignHero.figma.ts
    AnnouncementBar.figma.ts
    NewsletterSignup.figma.ts
    Footer.figma.ts
```

Each file maps Figma component properties to React props so devs see real import statements and JSX in Figma's inspect panel.

## Build Sequence

1. Create new Figma file "DFYNE Design System"
2. Create 5 pages (Foundations, Primitives, Cards, Rails, Sections)
3. Push variable collections (Colors, Spacing, Radius, Typography)
4. Build Foundations page — visual token documentation
5. Build Primitives: Icon → Badge → SectionHeading → Button → ArrowButton
6. Build Cards: SizeButton → ColorSwatch → CrossSellCard → ProductCard → CategoryCard
7. Build Rails: ProductRail → CategoryRail → CrossSellRail
8. Build Sections: AnnouncementBar → NewsletterSignup → Footer → CampaignHero
9. Add `@figma/code-connect` dependency to `@dfyne/react`
10. Write `.figma.ts` files for all 17 components
11. Publish Code Connect mappings

## Sync Workflow

```
Code changes → update .figma.ts files (in repo) → re-push to Figma when needed
```

Code Connect files are versioned in git and reviewed in PRs like any other code.
