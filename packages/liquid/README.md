# @dfyne/liquid

Shopify Liquid snippets, sections, and assets for the DFYNE design system. Integrates with Dawn themes using shared tokens from `@dfyne/tokens`.

## Installation

Copy the following into your Shopify theme:

```
snippets/dfyne-*.liquid  →  your-theme/snippets/
sections/dfyne-*.liquid  →  your-theme/sections/
assets/dfyne-design-system.css  →  your-theme/assets/
assets/dfyne-design-system.js   →  your-theme/assets/
```

Add to `theme.liquid` before `</head>`:

```liquid
{{ 'dfyne-design-system.css' | asset_url | stylesheet_tag }}
```

Add before `</body>`:

```liquid
<script src="{{ 'dfyne-design-system.js' | asset_url }}" defer></script>
```

## Snippets

| Snippet | Usage |
|---------|-------|
| `dfyne-badge` | `{% render 'dfyne-badge', text: 'NEW' %}` |
| `dfyne-product-card` | `{% render 'dfyne-product-card', product: product %}` |
| `dfyne-category-card` | `{% render 'dfyne-category-card', title: 'IMPACT', image: collection.image, url: collection.url %}` |
| `dfyne-color-swatch` | `{% render 'dfyne-color-swatch', image_url: url, label: 'Navy', selected: true %}` |
| `dfyne-size-button` | `{% render 'dfyne-size-button', label: 'M', selected: false, sold_out: false %}` |
| `dfyne-cross-sell-card` | `{% render 'dfyne-cross-sell-card', product: product %}` |
| `dfyne-product-rail` | `{% render 'dfyne-product-rail', collection: collection, title: 'NEW IN', eyebrow: 'JUST LANDED', rail_id: 'rail-1' %}` |
| `dfyne-icon` | `{% render 'dfyne-icon', name: 'chevron-right', size: '14' %}` |
| `dfyne-arrow-button` | `{% render 'dfyne-arrow-button', direction: 'right', rail_id: 'rail-1' %}` |

## Sections

All sections include `{% schema %}` blocks for the Shopify theme customizer:

- **dfyne-announcement-bar** — Rotating announcement slides
- **dfyne-campaign-hero** — Full-width hero with image, heading, CTAs
- **dfyne-newsletter** — Email signup form
- **dfyne-footer** — Column-based footer with menus

## Interactive Behaviors

The JS file handles these via `data-dfyne-*` attribute delegation:

- `data-dfyne-carousel-prev` / `data-dfyne-carousel-next` — Rail scrolling
- `data-dfyne-accordion` — Expand/collapse panels
- `data-dfyne-size-selector` — Size button selection
- `data-dfyne-color-selector` — Color swatch selection
- `data-dfyne-announcement` — Auto-rotating slides

## Build

```bash
pnpm build    # Regenerates CSS asset from tokens + component styles
pnpm test     # Validates all files exist and are well-formed
```
