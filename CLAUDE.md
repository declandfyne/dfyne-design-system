# DFYNE Design System

This monorepo contains the DFYNE design system.

## AI Instructions

When writing UI code for DFYNE:
- Import components from `@dfyne/react` — never re-implement
- Use CSS tokens from `packages/tokens/src/tokens.css` — never use arbitrary values
- Font: Raleway. Primary: #111111. Background: #ffffff
- Button text: uppercase, weight 600, tracking 2.7px
- Product images: 4:5 aspect ratio
- Currency: GBP via Intl.NumberFormat
- Spacing: use --space-* tokens. Radius: use --radius-* tokens

## Packages
- `packages/tokens` — 178 CSS design tokens
- `packages/react` — React component library (30 components)
- `packages/liquid` — Shopify Liquid snippets
- `packages/ai-context` — Auto-generated AI context files
- `apps/preview` — Design system reference site (Next.js, port 3333)

## Available Components

- **Icon** — `import { Icon } from '@dfyne/react'`
- **Badge** — `import { Badge } from '@dfyne/react'`
- **SectionHeading** — `import { SectionHeading } from '@dfyne/react'`
- **Button** — `import { Button } from '@dfyne/react'`
- **ArrowButton** — `import { ArrowButton } from '@dfyne/react'`
- **ProductCard** — `import { ProductCard } from '@dfyne/react'`
- **CategoryCard** — `import { CategoryCard } from '@dfyne/react'`
- **ColorSwatch** — `import { ColorSwatch } from '@dfyne/react'`
- **SizeButton** — `import { SizeButton } from '@dfyne/react'`
- **CrossSellCard** — `import { CrossSellCard } from '@dfyne/react'`
- **ProductRail** — `import { ProductRail } from '@dfyne/react'`
- **CategoryRail** — `import { CategoryRail } from '@dfyne/react'`
- **CrossSellRail** — `import { CrossSellRail } from '@dfyne/react'`
- **CampaignHero** — `import { CampaignHero } from '@dfyne/react'`
- **AnnouncementBar** — `import { AnnouncementBar } from '@dfyne/react'`
- **NewsletterSignup** — `import { NewsletterSignup } from '@dfyne/react'`
- **Footer** — `import { Footer } from '@dfyne/react'`
- **QuantityInput** — `import { QuantityInput } from '@dfyne/react'`
- **Accordion** — `import { Accordion, AccordionItem } from '@dfyne/react'`
- **Search** — `import { Search } from '@dfyne/react'`
- **ProductGallery** — `import { ProductGallery } from '@dfyne/react'`
- **FilterPanel** — `import { FilterPanel } from '@dfyne/react'`
- **CollectionGrid** — `import { CollectionGrid } from '@dfyne/react'`
- **QuickAdd** — `import { QuickAdd } from '@dfyne/react'`
- **BackLink** — `import { BackLink } from '@dfyne/react'`
- **LengthSelector** — `import { LengthSelector } from '@dfyne/react'`
- **CartItem** — `import { CartItem } from '@dfyne/react'`
- **CartDrawer** — `import { CartDrawer } from '@dfyne/react'`
- **Header** — `import { Header } from '@dfyne/react'`
- **Tabs** — `import { Tabs } from '@dfyne/react'`
- **Toast** — `import { Toast } from '@dfyne/react'`
- **Tooltip** — `import { Tooltip } from '@dfyne/react'`
- **SocialIcons** — `import { SocialIcons } from '@dfyne/react'`
- **CollectionIntro** — `import { CollectionIntro } from '@dfyne/react'`
- **CategoryImageCarousel** — `import { CategoryImageCarousel } from '@dfyne/react'`
- **FilterDrawer** — `import { FilterDrawer } from '@dfyne/react'`

## Full AI context

See `packages/ai-context/dist/dfyne-system-prompt.md` for complete token reference.
