# DFYNE Design System — Sanity Content Layer

**Date:** 2026-06-15
**Status:** Approved

## Overview

A Sanity CMS content layer embedded in the DFYNE preview app that gives the CEO direct control over all text content, typography line-height calculations, and product display overrides. Components remain untouched — the infrastructure is built ready to wire in later.

## Goals

1. CEO can edit all text values (marketing copy, UI labels, product overrides) via Sanity Studio
2. Line-height calculation system with a single base ratio that cascades mathematically across body, heading, and UI text categories
3. Live preview of all editable values within the existing preview app
4. Zero changes to existing `@dfyne/react` components or `@dfyne/tokens`
5. Future-ready provider and hooks for when components opt in

## Sanity Schema

### 1. `siteContent` (singleton)

All editable text strings in one document:

- `announcements[]` — array of `{ text: string, detail: string, link: string }`
- `hero` — `{ caption, heading, ctaLabel, secondaryCtaLabel }`
- `newsletter` — `{ heading, subtext, placeholder, buttonText }`
- `uiLabels` — `{ addToCart, subscribe, search, viewAll, shopNow, ... }` (flat key-value)
- `navigation` — `{ utilityLinks[{ label, href }], navDropdowns[{ title, sections[] }] }`
- `footer` — `{ links[{ label, href }], copyrightText }`

### 2. `typographySettings` (singleton)

Line-height ratio system:

- `baseRatio`: number (default 1.5, range 1.2–2.0, step 0.05)
- `multipliers`:
  - `body`: number (default 1.0) — paragraphs, descriptions, footer links
  - `heading`: number (default 0.82) — hero headings, section titles, card titles
  - `ui`: number (default 0.75) — buttons, badges, nav, announcements, form labels

**Generated tokens (9 total):**

| Token | Formula | Default |
|-------|---------|---------|
| `--lh-body` | baseRatio × body | 1.5 |
| `--lh-body-tight` | baseRatio × body × 0.85 | 1.275 |
| `--lh-body-loose` | baseRatio × body × 1.15 | 1.725 |
| `--lh-heading` | baseRatio × heading | 1.23 |
| `--lh-heading-tight` | baseRatio × heading × 0.85 | 1.046 |
| `--lh-heading-loose` | baseRatio × heading × 1.15 | 1.415 |
| `--lh-ui` | baseRatio × ui | 1.125 |
| `--lh-ui-tight` | baseRatio × ui × 0.85 | 0.956 |
| `--lh-ui-loose` | baseRatio × ui × 1.15 | 1.294 |

Tight/loose variants are fixed ×0.85 and ×1.15 of the category value.

### 3. `productOverride` (document, many)

Per-product display overrides layered on top of Shopify data:

- `shopifyHandle`: string (required, links to Shopify product)
- `displayName`: string (optional, overrides product name)
- `displayDescription`: string (optional)
- `customBadgeText`: string (optional)

When no override is set, Shopify data is used as-is.

### 4. `brandSettings` (singleton)

Future-proofing for brand controls:

- `primaryColor`: color
- `backgroundColor`: color
- `fontFamily`: string

Not actively consumed — placeholder for future expansion.

## Architecture

### Data Flow

```
Sanity Studio (CEO edits) → Sanity API → Preview App fetches →
  ├─ Typography Preview (live calculated line-heights with sample text)
  ├─ Content Preview (all editable strings displayed)
  └─ DfyneProvider (context provider, ready but not consumed by components)
```

### File Structure

```
apps/preview/
  src/
    sanity/
      client.ts                — Sanity client configuration
      schema/
        siteContent.ts         — Content document schema
        typography.ts          — Typography settings schema
        productOverride.ts     — Product override schema
        brandSettings.ts       — Brand settings schema
        index.ts               — Schema barrel export
    app/
      settings/
        page.tsx               — Settings page: Studio + preview panels
    components/
      TypographyPreview.tsx    — Live line-height calculator with sample text
      ContentPreview.tsx       — Displays all current content values
    providers/
      DfyneProvider.tsx        — React context provider (created, not wired)
    hooks/
      useContent.ts            — Content access hook (ready for future use)
      useTypography.ts         — Typography access hook (ready for future use)
```

### Preview App Integration

**Sidebar:** New "Settings" item below component list, gear icon, visually distinct.

**Settings page layout (three sections):**

1. **Content Editor** — Full Sanity Studio embedded as a Next.js route (`next-sanity` Studio component) for `siteContent` editing
   - Announcement bar messages (add/remove/reorder)
   - Hero copy fields
   - Newsletter text fields
   - UI labels (flat key-value list)
   - Navigation and footer links

2. **Typography Calculator** — Interactive line-height preview
   - Base ratio slider (1.2–2.0)
   - Three sample text blocks showing body, heading, and UI text at calculated line-heights
   - "Advanced" expandable for individual multiplier tweaks
   - Table showing all 9 generated token values

3. **Product Overrides** — Per-product Shopify overrides
   - Search by Shopify handle
   - Override fields with "Using Shopify default" indicator

### Provider Layer (future-ready)

`DfyneProvider` wraps the app and:
- Fetches `siteContent` and `typographySettings` from Sanity
- Exposes `useContent(key)` hook for text values with fallback defaults
- Exposes `useTypography()` hook returning calculated CSS properties
- Injects `<style>` tag with calculated `--lh-*` custom properties into `<head>`

Components do NOT consume these yet. The migration path:
1. Wrap app root in `<DfyneProvider>`
2. Replace hardcoded text with `useContent()` calls per component
3. Replace hardcoded line-heights with `--lh-*` tokens
4. Each component migrates independently — no big bang

## Dependencies

**New packages in `apps/preview`:**
- `sanity`
- `next-sanity`
- `@sanity/vision`

**Environment variables:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (default: `production`)

## What Does NOT Change

- `packages/react/*` — all components untouched
- `packages/tokens/*` — existing CSS tokens stay as-is
- `packages/liquid/*` — no changes
- `packages/ai-context/*` — no changes

## Authentication

None for now — local dev tool. Auth layer added when deployed externally.

## Future Migration Checklist

When ready to wire components to Sanity:

- [ ] Add `<DfyneProvider>` to app root
- [ ] Migrate `AnnouncementBar` to use `useContent('announcements')`
- [ ] Migrate `CampaignHero` to use `useContent('hero')`
- [ ] Migrate `Button` default text to use `useContent('uiLabels.addToCart')`
- [ ] Migrate `NewsletterSignup` to use `useContent('newsletter')`
- [ ] Replace hardcoded line-height values with `--lh-*` tokens in component CSS
- [ ] Add product override merging to `ProductCard`
