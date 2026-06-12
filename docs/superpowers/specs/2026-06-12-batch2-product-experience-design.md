# Batch 2: Product Experience Components — ProductGallery, FilterPanel, CollectionGrid, QuickShopModal

**Date:** 2026-06-12
**Status:** Approved

## Goal

Add 4 product experience components to `@dfyne/react` that compose from existing primitives. All match the live DFYNE Shopify site visually with clean React APIs, render-only.

---

## Component 1: ProductGallery

### Import
```tsx
import { ProductGallery } from '@dfyne/react'
```

### Props
```ts
interface GalleryImage {
  src: string
  alt: string
}

interface ProductGalleryProps {
  images: GalleryImage[]
  activeIndex?: number        // default 0
  onIndexChange?: (index: number) => void
  className?: string
}
```

### Visual
- Main image: fills container width, 4:5 aspect ratio, object-cover, border-radius `--radius-sm` (4px)
- Thumbnail strip below: horizontal, 60×75px each, 2px radius, 8px gap
- Active thumbnail: 1px black border (`--border-color-strong`)
- Inactive thumbnails: 1px `--border-color-default`, hover darkens
- No zoom for v1

### File
`packages/react/src/gallery/ProductGallery.tsx`

---

## Component 2: FilterPanel

### Import
```tsx
import { FilterPanel } from '@dfyne/react'
```

### Props
```ts
interface FilterOption {
  value: string
  label: string
  count?: number
  color?: string        // hex, for swatch type
  selected: boolean
}

interface FilterGroup {
  key: string
  label: string
  type: 'checkbox' | 'swatch' | 'toggle'
  options: FilterOption[]
}

interface SortOption {
  value: string
  label: string
}

interface FilterPanelProps {
  filters: FilterGroup[]
  onFilterChange: (groupKey: string, value: string, selected: boolean) => void
  sortOptions?: SortOption[]
  sortValue?: string
  onSortChange?: (value: string) => void
  activeFilterCount?: number
  onClearAll?: () => void
  className?: string
}
```

### Visual
- Sort dropdown at top: 42px height select, `--bg-input`, `--border-color-input`
- Active filter count: Badge-style pill next to heading
- "Clear all" link: 10px uppercase, appears when `activeFilterCount > 0`
- Each filter group is an AccordionItem inside an Accordion (allowMultiple=true)
  - **checkbox**: rows with 16px checkbox + label (11px Raleway) + optional count in muted text
  - **swatch**: grid of 20px circles, selected has 2px black ring, color fills from `option.color`
  - **toggle**: single row with label + toggle pill (40×20px, black when on)
- Uses Accordion + AccordionItem from Batch 1
- All filter groups default open

### File
`packages/react/src/filters/FilterPanel.tsx`

---

## Component 3: CollectionGrid

### Import
```tsx
import { CollectionGrid } from '@dfyne/react'
```

### Props
```ts
interface CollectionGridProps {
  products: React.ReactNode[]   // pre-rendered ProductCard elements
  filters?: React.ReactNode     // slot for FilterPanel
  heading?: string
  productCount?: number
  columns?: 2 | 3 | 4          // default 4
  loading?: boolean
  emptyMessage?: string         // default "No products found"
  className?: string
}
```

### Visual
- Heading row: heading text (14px SemiBold uppercase Raleway, 1.5px tracking) + product count (11px muted)
- Layout: filters slot on left (260px fixed width desktop, full-width above on mobile), grid on right
- Grid: CSS grid, `columns` columns desktop, 2 columns mobile, gap `--gutter-desktop` (22px)
- Loading: 8 shimmer placeholder cards (pulsing `--bg-wash` rectangles, 4:5 aspect + text lines below)
- Empty: centered message, `--text-color-muted`, 13px Raleway
- Responsive: below 768px, filters stack above grid, grid goes to 2 columns

### File
`packages/react/src/collection/CollectionGrid.tsx`

---

## Component 4: QuickShopModal

### Import
```tsx
import { QuickShopModal } from '@dfyne/react'
```

### Props
```ts
interface QuickShopProduct {
  name: string
  price: string
  images: { src: string; alt: string }[]
  colors?: { image: string; label: string; selected: boolean }[]
  sizes?: { label: string; selected: boolean; soldOut: boolean }[]
}

interface QuickShopModalProps {
  open: boolean
  onClose: () => void
  product: QuickShopProduct
  onColorSelect?: (index: number) => void
  onSizeSelect?: (index: number) => void
  quantity?: number
  onQuantityChange?: (value: number) => void
  onAddToBag?: () => void
  className?: string
}
```

### Visual
- Backdrop: fixed overlay, black at 40% opacity (`--overlay-dark`)
- Modal: centered, max-width 900px, white bg, no border-radius (square, matching live site)
- Close button: top-right, X icon (Phosphor), 36×36px hit area
- Two-column layout: left = ProductGallery (50%), right = product info (50%)
- Right column content (vertical stack, 24px gap):
  - Name: 14px SemiBold uppercase Raleway, 1.5px tracking
  - Price: 13px Regular, `--color-price`
  - Color swatches: row of ColorSwatch instances (if `colors` provided)
  - Size buttons: row of SizeButton instances (if `sizes` provided)
  - QuantityInput
  - "ADD TO BAG" Button (primary, full-width)
- Animation: fade in backdrop + scale modal from 0.95 to 1 (200ms ease)
- Click backdrop or press Escape to close
- Body scroll locked when open
- Mobile: single column, gallery on top, info below

### File
`packages/react/src/modals/QuickShopModal.tsx`

---

## Shared Changes

### New exports in index.ts
```ts
export { ProductGallery } from './gallery/ProductGallery'
export { FilterPanel } from './filters/FilterPanel'
export type { FilterGroup, FilterOption, SortOption } from './filters/FilterPanel'
export { CollectionGrid } from './collection/CollectionGrid'
export { QuickShopModal } from './modals/QuickShopModal'
export type { QuickShopProduct } from './modals/QuickShopModal'
```

### CLAUDE.md update
Add 4 new components. Update count from 20 to 24.

### Icons needed (Phosphor)
- `X` — close button in QuickShopModal (already used in Search)
- `Check` — checkbox in FilterPanel
- `CaretDown` — sort dropdown (already used in Accordion)

## Build Order
1. ProductGallery (standalone)
2. FilterPanel (uses Accordion)
3. CollectionGrid (layout component, uses ProductCard)
4. QuickShopModal (uses ProductGallery, ColorSwatch, SizeButton, QuantityInput, Button)
5. Wire exports + update docs
6. Add to preview app
7. Deploy
