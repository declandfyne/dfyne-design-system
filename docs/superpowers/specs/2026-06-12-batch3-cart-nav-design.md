# Batch 3: Cart & Navigation — CartItem, CartDrawer, Header

**Date:** 2026-06-12
**Status:** Approved

## Goal

Add 3 cart and navigation components to `@dfyne/react`. CartItem and CartDrawer handle the shopping cart experience. Header provides the main site navigation with mega-menu, search, and cart access.

---

## Component 1: CartItem

### Props
```ts
interface CartItemProps {
  image: { src: string; alt: string }
  name: string
  variant: string
  price: string
  comparePrice?: string
  quantity: number
  onQuantityChange: (value: number) => void
  onRemove: () => void
  className?: string
}
```

### Visual
- Horizontal layout: 80×100px image (4:5, object-cover, radius 2px) + info stack
- Name: 13px Raleway Regular, #111
- Variant: 11px Raleway Regular, #888
- Price: 13px Raleway Regular, #1c1d1d. Compare price: strikethrough, #888, left of price
- QuantityInput instance below text
- Remove: 10px uppercase Raleway SemiBold, #888, hover underline, tracking 1.2px
- Bottom border: 1px #e8e8e1
- Padding: 16px vertical
- Gap between image and info: 16px

### File
`packages/react/src/cart/CartItem.tsx`

---

## Component 2: CartDrawer

### Props
```ts
interface CartDrawerItem {
  image: { src: string; alt: string }
  name: string
  variant: string
  price: string
  comparePrice?: string
  quantity: number
}

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  items: CartDrawerItem[]
  onItemQuantityChange: (index: number, quantity: number) => void
  onItemRemove: (index: number) => void
  subtotal: string
  shippingMessage?: string
  upsells?: React.ReactNode
  onCheckout?: () => void
  className?: string
}
```

### Visual
- Slide-in from right, 420px wide, full viewport height, white bg
- Shadow: --shadow-drawer
- Backdrop: fixed overlay, --overlay-dark (black 40%)
- Header: "YOUR BAG" (10px SemiBold uppercase, 1.5px tracking) + item count + X close button (Phosphor)
- Body: scrollable list of CartItem instances, gap 0 (items have own border-bottom)
- Upsells slot: below items, optional
- Sticky footer: subtotal row (label left "Subtotal", value right, 13px SemiBold), shipping message (11px muted), "CHECKOUT" Button (primary, full width)
- Escape key / backdrop click closes
- Body scroll lock when open
- CSS transition: transform translateX(100%) → translateX(0), 300ms ease

### File
`packages/react/src/cart/CartDrawer.tsx`

---

## Component 3: Header

### Props
```ts
interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

interface HeaderProps {
  logo: React.ReactNode
  navItems: NavItem[]
  onSearch?: (query: string) => void
  searchResults?: SearchResult[]
  cartItemCount?: number
  onCartClick?: () => void
  onMenuClick?: () => void
  className?: string
}
```

### Visual
- Fixed top, full width, white bg, border-bottom 1px #e8e8e1, height 60px, z-index 40
- Three-section flex layout:
  - Left: hamburger icon (List from Phosphor, mobile only via md:hidden) + logo
  - Center: nav links (desktop only via hidden md:flex), 10px SemiBold uppercase Raleway, 1.5px tracking, gap 24px
  - Right: search icon (MagnifyingGlass), cart icon (Bag from Phosphor) with count badge (small black circle, white text, 8px font)
- Mega-menu: items with `children` show a dropdown on hover. White bg, shadow-lg, padding 24px, grid of links (11px Raleway Regular). Absolute positioned below nav item.
- Search overlay: clicking search icon toggles a Search component that slides down below the header bar. Full width, white bg, border-bottom, padding 12px 24px.
- Mobile: only hamburger + logo + cart visible. onMenuClick fires when hamburger tapped (consumer provides drawer menu).
- Phosphor icons: List (hamburger), MagnifyingGlass (search), Bag (cart), X (close search)

### File
`packages/react/src/navigation/Header.tsx`

---

## Shared Changes

### Exports
```ts
export { CartItem } from './cart/CartItem'
export { CartDrawer } from './cart/CartDrawer'
export type { CartDrawerItem } from './cart/CartDrawer'
export { Header } from './navigation/Header'
export type { NavItem } from './navigation/Header'
```

### CLAUDE.md
Add 3 components. Count → 27.
