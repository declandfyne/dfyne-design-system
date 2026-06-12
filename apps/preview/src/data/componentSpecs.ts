/**
 * Component spec data for all DFYNE design system components.
 * Values verified against live dfyne.com computed styles and
 * /Users/declanmalone/Desktop/MAIN-SHOPIFY-DEVELOPMENT/assets/theme.css.liquid
 */

import type { SpecEntry } from "../components/SpecPanel";

export type ComponentSpecData = {
  name: string;
  figmaPath: string;
  liquidCode: string;
  reactCode: string;
  variants: {
    name: string;
    specs: SpecEntry[];
  }[];
};

export const componentSpecs: ComponentSpecData[] = [
  /* ------------------------------------------------------------------ */
  /*  Button                                                             */
  /* ------------------------------------------------------------------ */
  {
    name: "Button",
    figmaPath: "Components / Buttons",
    liquidCode: `<!-- Primary -->
<button class="btn">ADD TO CART</button>

<!-- Secondary -->
<button class="btn btn--secondary">COMPLETE THE LOOK</button>

<!-- Tertiary -->
<button class="btn btn--tertiary">Size Guide</button>

<!-- Disabled -->
<button class="btn" disabled>SOLD OUT</button>`,
    reactCode: `import { Button } from "@dfyne/react";

<Button variant="primary">ADD TO CART</Button>
<Button variant="secondary">COMPLETE THE LOOK</Button>
<Button variant="tertiary">Size Guide</Button>
<Button disabled>SOLD OUT</Button>`,
    variants: [
      {
        name: "Primary",
        specs: [
          { group: "Typography", property: "Font Family", value: "Raleway, sans-serif", cssVar: "--font-body" },
          { group: "Typography", property: "Font Size", value: "9px", cssVar: "--text-button" },
          { group: "Typography", property: "Font Weight", value: "600", cssVar: "--weight-semibold" },
          { group: "Typography", property: "Tracking", value: "2.7px", cssVar: "--tracking-button" },
          { group: "Typography", property: "Transform", value: "uppercase" },
          { group: "Spacing", property: "Padding", value: "13px 20px" },
          { group: "Spacing", property: "Min Width", value: "90px" },
          { group: "Colors", property: "Background", value: "#111111", cssVar: "--color-btn-primary" },
          { group: "Colors", property: "Text", value: "#ffffff", cssVar: "--color-btn-primary-text" },
          { group: "Colors", property: "Border", value: "1px solid transparent" },
          { group: "Shape", property: "Radius", value: "50px", cssVar: "--radius-button" },
        ],
      },
      {
        name: "Secondary",
        specs: [
          { group: "Typography", property: "Font Size", value: "9px" },
          { group: "Typography", property: "Font Weight", value: "600" },
          { group: "Typography", property: "Tracking", value: "2.7px" },
          { group: "Typography", property: "Transform", value: "uppercase" },
          { group: "Spacing", property: "Padding", value: "13px 20px" },
          { group: "Colors", property: "Background", value: "transparent" },
          { group: "Colors", property: "Text", value: "#000000", cssVar: "--color-text-body" },
          { group: "Colors", property: "Border", value: "#e8e8e1", cssVar: "--color-border" },
          { group: "Colors", property: "Hover Border", value: "#000000" },
          { group: "Shape", property: "Radius", value: "50px" },
        ],
      },
      {
        name: "Tertiary",
        specs: [
          { group: "Typography", property: "Font Size", value: "9px" },
          { group: "Typography", property: "Font Weight", value: "400", cssVar: "--weight-normal" },
          { group: "Typography", property: "Tracking", value: "normal" },
          { group: "Typography", property: "Transform", value: "none" },
          { group: "Spacing", property: "Padding", value: "8px 10px" },
          { group: "Colors", property: "Background", value: "transparent" },
          { group: "Colors", property: "Border", value: "#e8e8e1", cssVar: "--color-border" },
          { group: "Colors", property: "Text", value: "#000000" },
          { group: "Shape", property: "Radius", value: "50px" },
        ],
      },
      {
        name: "Disabled",
        specs: [
          { group: "Colors", property: "Background", value: "#f6f6f6" },
          { group: "Colors", property: "Text", value: "#b6b6b6" },
          { group: "Colors", property: "Border", value: "#b6b6b6" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Badge                                                              */
  /* ------------------------------------------------------------------ */
  {
    name: "Badge",
    figmaPath: "Components / Badge",
    liquidCode: `<!-- Custom label (e.g. NEW) -->
<div class="grid-product__tag grid-product__tag--custom">NEW</div>

<!-- Sold Out -->
<div class="grid-product__tag grid-product__tag--sold-out">Sold Out</div>

<!-- Bottom label (from metafield) -->
<div class="grid-product__tag grid-product__tag--bottom-label">Best Seller</div>`,
    reactCode: `import { Badge } from "@dfyne/react";

<Badge text="NEW" variant="custom" />
<Badge text="Sold Out" variant="sold-out" />
<Badge text="Best Seller" variant="bottom" position="bottom-left" />`,
    variants: [
      {
        name: "Custom (NEW)",
        specs: [
          { group: "Typography", property: "Font Family", value: "Raleway, sans-serif" },
          { group: "Typography", property: "Font Size", value: "11.05px" },
          { group: "Typography", property: "Font Weight", value: "600" },
          { group: "Typography", property: "Tracking", value: "0.325px" },
          { group: "Typography", property: "Line Height", value: "1" },
          { group: "Spacing", property: "Padding", value: "7px 7px 7px 9px" },
          { group: "Colors", property: "Background", value: "#111111", cssVar: "--color-btn-primary" },
          { group: "Colors", property: "Text", value: "#ffffff", cssVar: "--color-btn-primary-text" },
          { group: "Shape", property: "Radius", value: "0px 4px 0px 4px" },
          { group: "Layout", property: "Position", value: "absolute top-0 right-0" },
        ],
      },
      {
        name: "Sold Out",
        specs: [
          { group: "Typography", property: "Font Size", value: "11.05px" },
          { group: "Typography", property: "Font Weight", value: "600" },
          { group: "Typography", property: "Tracking", value: "0.325px" },
          { group: "Colors", property: "Background", value: "#ffffff", cssVar: "--color-body" },
          { group: "Colors", property: "Text", value: "#000000", cssVar: "--color-text-body" },
          { group: "Shape", property: "Radius", value: "0px 4px 0px 4px" },
        ],
      },
      {
        name: "Bottom Label",
        specs: [
          { group: "Typography", property: "Font Size", value: "11px" },
          { group: "Typography", property: "Font Weight", value: "400" },
          { group: "Typography", property: "Tracking", value: "0.3px" },
          { group: "Spacing", property: "Padding", value: "8px 7px" },
          { group: "Colors", property: "Background", value: "#ffffff" },
          { group: "Colors", property: "Text", value: "#000000" },
          { group: "Layout", property: "Position", value: "absolute bottom-0 left-0" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Size Button                                                        */
  /* ------------------------------------------------------------------ */
  {
    name: "Size Button",
    figmaPath: "Components / Size Selector",
    liquidCode: `<!-- Size option (radio + label) -->
<input type="radio" id="size-S" name="Size" value="S">
<label for="size-S" class="variant__button-label">S</label>

<!-- Selected state: add checked to input -->
<!-- Sold out: add disabled + line-through styling -->`,
    reactCode: `import { SizeButton } from "@dfyne/react";

<SizeButton label="S" selected={false} soldOut={false} onClick={() => {}} />
<SizeButton label="M" selected={true} soldOut={false} onClick={() => {}} />
<SizeButton label="XL" selected={false} soldOut={true} onClick={() => {}} />`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Typography", property: "Font Family", value: "Raleway, sans-serif" },
          { group: "Typography", property: "Font Size", value: "10px" },
          { group: "Typography", property: "Font Weight", value: "400" },
          { group: "Typography", property: "Tracking", value: "0.325px" },
          { group: "Spacing", property: "Padding", value: "5px 10px" },
          { group: "Spacing", property: "Height", value: "24px" },
          { group: "Spacing", property: "Width", value: "40px" },
          { group: "Colors", property: "Background", value: "#ffffff" },
          { group: "Colors", property: "Text", value: "#000000" },
          { group: "Colors", property: "Border", value: "1px solid #000000" },
          { group: "Shape", property: "Radius", value: "25px" },
        ],
      },
      {
        name: "Selected",
        specs: [
          { group: "Colors", property: "Background", value: "#000000" },
          { group: "Colors", property: "Text", value: "#ffffff" },
          { group: "Colors", property: "Border", value: "1px solid #292929" },
        ],
      },
      {
        name: "Sold Out",
        specs: [
          { group: "Colors", property: "Background", value: "#ffffff" },
          { group: "Colors", property: "Text", value: "#bbbbbb" },
          { group: "Colors", property: "Border", value: "1px solid #e0e0e0" },
          { group: "Typography", property: "Decoration", value: "line-through" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Arrow Button                                                       */
  /* ------------------------------------------------------------------ */
  {
    name: "Arrow Button",
    figmaPath: "Components / Arrow Button",
    liquidCode: `<!-- Default scroll arrow -->
<button class="flickity-button" aria-label="Scroll right">
  <svg><!-- chevron --></svg>
</button>`,
    reactCode: `import { ArrowButton } from "@dfyne/react";

<ArrowButton direction="left" />
<ArrowButton direction="right" />
<ArrowButton direction="left" variant="edge" />
<ArrowButton disabled />`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Spacing", property: "Size", value: "30px × 30px" },
          { group: "Spacing", property: "Icon Size", value: "14px × 14px" },
          { group: "Colors", property: "Background", value: "#ffffff" },
          { group: "Colors", property: "Text", value: "#000000" },
          { group: "Colors", property: "Border", value: "1px solid #000000" },
          { group: "Colors", property: "Hover BG", value: "#000000" },
          { group: "Colors", property: "Hover Text", value: "#ffffff" },
          { group: "Shape", property: "Radius", value: "50%" },
        ],
      },
      {
        name: "Edge",
        specs: [
          { group: "Spacing", property: "Size", value: "36px × 36px" },
          { group: "Colors", property: "Background", value: "#ffffff" },
          { group: "Colors", property: "Border", value: "rgba(0,0,0,0.1)" },
          { group: "Colors", property: "Shadow", value: "0 10px 24px rgba(0,0,0,0.14)" },
          { group: "Shape", property: "Radius", value: "50%" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Section Heading                                                    */
  /* ------------------------------------------------------------------ */
  {
    name: "Section Heading",
    figmaPath: "Components / Section Heading",
    liquidCode: `<p class="section-header__eyebrow">JUST LANDED</p>
<h2 class="section-header__title">NEW IN WOMEN</h2>`,
    reactCode: `import { SectionHeading } from "@dfyne/react";

<SectionHeading eyebrow="JUST LANDED" title="NEW IN WOMEN" />`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Eyebrow", property: "Font Size", value: "10px" },
          { group: "Eyebrow", property: "Font Weight", value: "600" },
          { group: "Eyebrow", property: "Tracking", value: "1.2px" },
          { group: "Eyebrow", property: "Transform", value: "uppercase" },
          { group: "Title", property: "Font Size", value: "14px" },
          { group: "Title", property: "Font Weight", value: "600" },
          { group: "Title", property: "Tracking", value: "1.5px" },
          { group: "Title", property: "Transform", value: "uppercase" },
          { group: "Spacing", property: "Gap", value: "3px" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Product Card                                                       */
  /* ------------------------------------------------------------------ */
  {
    name: "Product Card",
    figmaPath: "Components / Product Card",
    liquidCode: `<div class="grid-product" data-product-handle="...">
  <div class="grid-product__content">
    <div class="grid-product__image-mask">
      <a class="grid-product__image-link" href="...">
        <div class="grid__image-ratio grid__image-ratio--portrait">
          <img src="..." alt="..." />
        </div>
      </a>
      <div class="grid-product__tag grid-product__tag--custom">NEW</div>
    </div>
    <div class="grid-product__meta">
      <div class="grid-product__title">Impact Longsleeve Top</div>
      <div class="grid-product__vendor">Pebble Grey</div>
      <div class="grid-product__price">
        <span class="money">£52.20</span>
      </div>
    </div>
  </div>
</div>`,
    reactCode: `import { ProductCard } from "@dfyne/react";

<ProductCard
  image="/path/to/image.jpg"
  name="Impact Longsleeve Top"
  color="Pebble Grey"
  price={52.20}
  rating={4.8}
  reviewCount={52866}
  badge="NEW"
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Image", property: "Aspect Ratio", value: "4:5 (portrait)" },
          { group: "Image", property: "Radius", value: "4px", cssVar: "--productTileRadius" },
          { group: "Image", property: "Object Fit", value: "cover" },
          { group: "Image", property: "Hover", value: "scale(1.02)" },
          { group: "Title", property: "Font", value: "Raleway 13px / 400" },
          { group: "Title", property: "Line Height", value: "19.5px" },
          { group: "Title", property: "Tracking", value: "0.325px" },
          { group: "Title", property: "Color", value: "#000000" },
          { group: "Vendor", property: "Font", value: "Raleway 11.05px / 400" },
          { group: "Vendor", property: "Tracking", value: "1.105px" },
          { group: "Price", property: "Font", value: "sans-serif 11.05px / 400" },
          { group: "Price", property: "Tracking", value: "0.325px" },
          { group: "Price", property: "Color", value: "#1c1d1d", cssVar: "--color-price" },
          { group: "Spacing", property: "Meta Top", value: "8px" },
          { group: "Spacing", property: "Card Width", value: "25% desktop / 50% mobile" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Category Card                                                      */
  /* ------------------------------------------------------------------ */
  {
    name: "Category Card",
    figmaPath: "Components / Category Card",
    liquidCode: `<a href="/collections/..." class="collection-grid-item">
  <div class="collection-image" style="aspect-ratio: 599/781">
    <img src="..." alt="IMPACT" />
  </div>
  <div class="collection-grid-item__overlay">
    <h3 class="collection-grid-item__title">IMPACT</h3>
  </div>
</a>`,
    reactCode: `import { CategoryCard } from "@dfyne/react";

<CategoryCard
  image="/path/to/image.jpg"
  title="IMPACT"
  href="/collections/impact"
  caption="High Support"
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Image", property: "Aspect Ratio", value: "599:781" },
          { group: "Image", property: "Radius", value: "2px" },
          { group: "Image", property: "Hover", value: "scale(1.02)" },
          { group: "Overlay", property: "Tint", value: "rgba(0,0,0,0.10)" },
          { group: "Overlay", property: "Gradient", value: "from-black/60 via-transparent" },
          { group: "Caption", property: "Font", value: "Raleway 9px / 500" },
          { group: "Caption", property: "Tracking", value: "1.2px" },
          { group: "Caption", property: "Color", value: "white/78%" },
          { group: "Title", property: "Font", value: "Raleway 13px / 600" },
          { group: "Title", property: "Tracking", value: "1.5px" },
          { group: "Title", property: "Transform", value: "uppercase" },
          { group: "Title", property: "Hover", value: "underline white" },
          { group: "Chevron", property: "Size", value: "34px circle" },
          { group: "Chevron", property: "Border", value: "1px solid white" },
          { group: "Chevron", property: "Hover", value: "bg-white text-black" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Color Swatch                                                       */
  /* ------------------------------------------------------------------ */
  {
    name: "Color Swatch",
    figmaPath: "Components / Color Swatch",
    liquidCode: `<div class="sibling-product-swatches">
  <a href="/products/..." class="swatch-product">
    <img src="..." width="66" height="99" />
  </a>
</div>`,
    reactCode: `import { ColorSwatch } from "@dfyne/react";

<ColorSwatch
  image="/path/to/swatch.jpg"
  label="Midnight Black"
  selected={true}
  isNew={true}
  onClick={() => {}}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Image", property: "Width", value: "66px" },
          { group: "Image", property: "Height", value: "99px" },
          { group: "Image", property: "Radius", value: "2px" },
          { group: "Image", property: "Object Fit", value: "cover" },
          { group: "Label", property: "Font Size", value: "10px" },
          { group: "Label", property: "Color", value: "rgba(0,0,0,0.8)" },
          { group: "Spacing", property: "Gap", value: "4px" },
        ],
      },
      {
        name: "Selected",
        specs: [
          { group: "Shape", property: "Ring", value: "1px solid #000000" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Cross-Sell Card                                                    */
  /* ------------------------------------------------------------------ */
  {
    name: "Cross-Sell Card",
    figmaPath: "Components / Cross-Sell Card",
    liquidCode: `<div class="complete-the-look__item">
  <a href="/products/...">
    <img src="..." width="123" height="154" />
  </a>
  <p class="complete-the-look__title">Impact Shorts</p>
  <p class="complete-the-look__color">Midnight Black</p>
  <p class="complete-the-look__price">$49.00</p>
</div>`,
    reactCode: `import { CrossSellCard } from "@dfyne/react";

<CrossSellCard
  image="/path/to/image.jpg"
  name="Impact Shorts"
  color="Midnight Black"
  price={49}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Image", property: "Aspect Ratio", value: "123:154" },
          { group: "Image", property: "Width", value: "123px" },
          { group: "Image", property: "Radius", value: "2px" },
          { group: "Image", property: "Hover", value: "scale(1.02)" },
          { group: "Name", property: "Font", value: "Raleway 11px / 400" },
          { group: "Name", property: "Line Height", value: "1.5" },
          { group: "Color", property: "Font", value: "Raleway 10px / 400" },
          { group: "Color", property: "Tracking", value: "0.1em" },
          { group: "Color", property: "Color", value: "rgba(0,0,0,0.65)" },
          { group: "Price", property: "Font", value: "Raleway 11px / 600" },
          { group: "Spacing", property: "Gap", value: "8px" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Campaign Hero                                                      */
  /* ------------------------------------------------------------------ */
  {
    name: "Campaign Hero",
    figmaPath: "Sections / Campaign Hero",
    liquidCode: `<section class="hero">
  <div class="hero__image-wrapper">
    <img src="..." alt="..." />
  </div>
  <div class="hero__text-wrap">
    <p class="hero__subtitle">NEW STYLES, NEW STRENGTH</p>
    <h1 class="hero__title">IMPACT</h1>
    <a href="..." class="btn hero__btn">SHOP NOW</a>
  </div>
</section>`,
    reactCode: `import { CampaignHero } from "@dfyne/react";

<CampaignHero
  image="/path/to/hero.jpg"
  caption="NEW STYLES, NEW STRENGTH"
  heading="IMPACT"
  cta={{ label: "SHOP NOW", href: "/collections/impact" }}
  secondaryCta={{ label: "EXPLORE", href: "/collections/all" }}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Layout", property: "Height", value: "70svh (mob) → 80svh (xl)" },
          { group: "Layout", property: "Min Height", value: "520px" },
          { group: "Gradient Top", property: "Value", value: "from-black/55 via-black/24 to-transparent" },
          { group: "Gradient Top", property: "Height", value: "180px (lg only)" },
          { group: "Gradient Bottom", property: "Value", value: "from-black/60 via-black/25 to-transparent" },
          { group: "Gradient Bottom", property: "Height", value: "50%" },
          { group: "Caption", property: "Font", value: "Raleway 10px / 600" },
          { group: "Caption", property: "Tracking", value: "1.5px" },
          { group: "Caption", property: "Transform", value: "uppercase" },
          { group: "Heading", property: "Font", value: "Raleway 34–84px / 500" },
          { group: "Heading", property: "Line Height", value: "0.9" },
          { group: "Heading", property: "Tracking", value: "0.035em" },
          { group: "CTA", property: "Height", value: "38px" },
          { group: "CTA", property: "Font", value: "10px / 700" },
          { group: "CTA", property: "Tracking", value: "1.5px" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Announcement Bar                                                   */
  /* ------------------------------------------------------------------ */
  {
    name: "Announcement Bar",
    figmaPath: "Sections / Announcement Bar",
    liquidCode: `<div class="announcement-bar">
  <div class="announcement__text">
    <span>EXPRESS SHIPPING IS OUR STANDARD</span>
    <a href="...">On all orders</a>
  </div>
</div>`,
    reactCode: `import { AnnouncementBar } from "@dfyne/react";

<AnnouncementBar
  slides={[
    { text: "HASSLE-FREE RETURNS", detail: "100-day free returns*" },
    { text: "FREE TRACKED DELIVERY", detail: "On orders over £30" },
  ]}
  interval={4000}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Layout", property: "Height", value: "36px" },
          { group: "Colors", property: "Background", value: "#000000", cssVar: "--color-announcement" },
          { group: "Colors", property: "Text", value: "#ffffff", cssVar: "--color-announcement-text" },
          { group: "Text", property: "Font Size", value: "10px" },
          { group: "Text", property: "Font Weight", value: "600" },
          { group: "Text", property: "Tracking", value: "2.6px" },
          { group: "Text", property: "Transform", value: "uppercase" },
          { group: "Detail", property: "Font Weight", value: "400" },
          { group: "Detail", property: "Tracking", value: "0.3px" },
          { group: "Detail", property: "Opacity", value: "80%" },
          { group: "Behavior", property: "Auto-rotate", value: "4000ms" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Newsletter Signup                                                  */
  /* ------------------------------------------------------------------ */
  {
    name: "Newsletter Signup",
    figmaPath: "Sections / Newsletter",
    liquidCode: `<section class="newsletter-section">
  <h2>Join the community</h2>
  <p>Sign up for exclusive drops, early access and training tips.</p>
  <form>
    <input type="email" placeholder="Your email address" />
    <button class="btn" type="submit">Subscribe</button>
  </form>
</section>`,
    reactCode: `import { NewsletterSignup } from "@dfyne/react";

<NewsletterSignup onSubmit={(email) => console.log(email)} />`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Layout", property: "Background", value: "#f9f9f9", cssVar: "--color-bg-wash" },
          { group: "Layout", property: "Padding", value: "48px 16px" },
          { group: "Layout", property: "Max Width", value: "400px (form)" },
          { group: "Heading", property: "Font", value: "Raleway 14px / 600" },
          { group: "Heading", property: "Tracking", value: "1.5px" },
          { group: "Heading", property: "Transform", value: "uppercase" },
          { group: "Subtext", property: "Font", value: "Raleway 11px / 400" },
          { group: "Subtext", property: "Color", value: "rgba(0,0,0,0.6)" },
          { group: "Input", property: "Height", value: "42px" },
          { group: "Input", property: "Radius", value: "4px" },
          { group: "Input", property: "Border", value: "#e7e7e7" },
          { group: "Button", property: "Radius", value: "50px" },
          { group: "Button", property: "Font", value: "9px / 600" },
          { group: "Button", property: "Tracking", value: "2.7px" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Quantity Input                                                     */
  /* ------------------------------------------------------------------ */
  {
    name: "Quantity Input",
    figmaPath: "Components / Quantity Input",
    liquidCode: `<div class="js-qty__wrapper">
  <button class="js-qty__adjust js-qty__adjust--minus" aria-label="Decrease quantity">−</button>
  <input type="number" class="js-qty__num" value="1" min="1" max="10" />
  <button class="js-qty__adjust js-qty__adjust--plus" aria-label="Increase quantity">+</button>
</div>`,
    reactCode: `import { QuantityInput } from "@dfyne/react";

<QuantityInput value={1} onChange={(v) => setValue(v)} />
<QuantityInput value={1} onChange={(v) => setValue(v)} min={1} max={10} />
<QuantityInput value={1} onChange={(v) => setValue(v)} disabled />`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Typography", property: "Font Family", value: "Raleway, sans-serif", cssVar: "--font-body" },
          { group: "Typography", property: "Font Size", value: "13px" },
          { group: "Typography", property: "Font Weight", value: "400" },
          { group: "Typography", property: "Text Align", value: "center" },
          { group: "Spacing", property: "Height", value: "42px" },
          { group: "Spacing", property: "Width", value: "120px" },
          { group: "Spacing", property: "Button Width", value: "36px" },
          { group: "Colors", property: "Background", value: "#ffffff" },
          { group: "Colors", property: "Text", value: "#000000" },
          { group: "Colors", property: "Border", value: "1px solid #e8e8e1", cssVar: "--color-border" },
          { group: "Shape", property: "Radius", value: "4px" },
        ],
      },
      {
        name: "Disabled",
        specs: [
          { group: "Colors", property: "Background", value: "#f6f6f6" },
          { group: "Colors", property: "Text", value: "#b6b6b6" },
          { group: "Colors", property: "Border", value: "#e0e0e0" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Accordion                                                          */
  /* ------------------------------------------------------------------ */
  {
    name: "Accordion",
    figmaPath: "Components / Accordion",
    liquidCode: `<div class="accordion">
  <details class="accordion__item" open>
    <summary class="accordion__trigger">
      <span>Description</span>
      <svg class="accordion__icon"><!-- chevron --></svg>
    </summary>
    <div class="accordion__content">Product description...</div>
  </details>
  <details class="accordion__item">
    <summary class="accordion__trigger">
      <span>Size Guide</span>
      <svg class="accordion__icon"><!-- chevron --></svg>
    </summary>
    <div class="accordion__content">Size guide content...</div>
  </details>
</div>`,
    reactCode: `import { Accordion, AccordionItem } from "@dfyne/react";

<Accordion>
  <AccordionItem title="Description" defaultOpen>
    Product description...
  </AccordionItem>
  <AccordionItem title="Size Guide">
    Size guide content...
  </AccordionItem>
  <AccordionItem title="Delivery & Returns">
    Delivery info...
  </AccordionItem>
</Accordion>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Typography", property: "Trigger Font", value: "Raleway 13px / 600" },
          { group: "Typography", property: "Trigger Tracking", value: "0.325px" },
          { group: "Typography", property: "Content Font", value: "Raleway 13px / 400" },
          { group: "Typography", property: "Content Line Height", value: "1.6" },
          { group: "Spacing", property: "Trigger Padding", value: "16px 0" },
          { group: "Spacing", property: "Content Padding", value: "0 0 16px 0" },
          { group: "Colors", property: "Text", value: "#000000" },
          { group: "Colors", property: "Border", value: "1px solid #e8e8e1", cssVar: "--color-border" },
          { group: "Shape", property: "Icon Rotation", value: "180deg when open" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Search                                                             */
  /* ------------------------------------------------------------------ */
  {
    name: "Search",
    figmaPath: "Components / Search",
    liquidCode: `<div class="search-bar">
  <form class="search-bar__form" action="/search">
    <input type="search" class="search-bar__input" placeholder="Search products..." />
    <button class="search-bar__submit" type="submit">
      <svg><!-- search icon --></svg>
    </button>
  </form>
  <div class="predictive-search__results">
    <a class="predictive-search__item" href="/products/...">
      <img src="..." />
      <span class="predictive-search__title">Power Legging</span>
      <span class="predictive-search__price">£54.00</span>
    </a>
  </div>
</div>`,
    reactCode: `import { Search } from "@dfyne/react";

<Search
  value={query}
  onChange={setQuery}
  results={[
    { id: "1", title: "Power Legging", price: "£54.00", type: "product" },
    { id: "2", title: "Leggings", type: "collection" },
  ]}
  placeholder="Search products..."
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Input", property: "Font", value: "Raleway 13px / 400" },
          { group: "Input", property: "Height", value: "42px" },
          { group: "Input", property: "Placeholder Color", value: "rgba(0,0,0,0.4)" },
          { group: "Input", property: "Border", value: "1px solid #e8e8e1", cssVar: "--color-border" },
          { group: "Input", property: "Radius", value: "4px" },
          { group: "Results", property: "Background", value: "#ffffff" },
          { group: "Results", property: "Shadow", value: "0 4px 12px rgba(0,0,0,0.1)" },
          { group: "Results", property: "Radius", value: "4px" },
          { group: "Result Item", property: "Font", value: "Raleway 13px / 400" },
          { group: "Result Item", property: "Padding", value: "8px 12px" },
          { group: "Result Item", property: "Hover BG", value: "#f6f6f6" },
          { group: "Result Item", property: "Image Size", value: "40px × 50px" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Product Gallery                                                    */
  /* ------------------------------------------------------------------ */
  {
    name: "Product Gallery",
    figmaPath: "Components / Product Gallery",
    liquidCode: `<div class="product__photos">
  <div class="product__main-image">
    <img src="..." alt="Front" />
  </div>
  <div class="product__thumbs">
    <button class="product__thumb active"><img src="..." alt="Front" /></button>
    <button class="product__thumb"><img src="..." alt="Back" /></button>
    <button class="product__thumb"><img src="..." alt="Detail" /></button>
  </div>
</div>`,
    reactCode: `import { ProductGallery } from "@dfyne/react";

<ProductGallery images={[
  { src: "https://placehold.co/400x500/e8e8e1/111?text=Front", alt: "Front" },
  { src: "https://placehold.co/400x500/e8e8e1/111?text=Back", alt: "Back" },
  { src: "https://placehold.co/400x500/e8e8e1/111?text=Detail", alt: "Detail" },
]} />`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Image", property: "Aspect Ratio", value: "4:5 (portrait)" },
          { group: "Image", property: "Object Fit", value: "cover" },
          { group: "Image", property: "Radius", value: "4px" },
          { group: "Thumbnails", property: "Size", value: "64px × 80px" },
          { group: "Thumbnails", property: "Radius", value: "2px" },
          { group: "Thumbnails", property: "Active Border", value: "1px solid #000000" },
          { group: "Spacing", property: "Gap", value: "8px" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Filter Panel                                                       */
  /* ------------------------------------------------------------------ */
  {
    name: "Filter Panel",
    figmaPath: "Components / Filter Panel",
    liquidCode: `<div class="collection-filter">
  <div class="collection-filter__group">
    <h4 class="collection-filter__heading">Color</h4>
    <label class="collection-filter__option">
      <input type="checkbox" /> Black (12)
    </label>
  </div>
  <div class="collection-filter__sort">
    <select><option>Featured</option></select>
  </div>
</div>`,
    reactCode: `import { FilterPanel } from "@dfyne/react";

<FilterPanel
  filters={[
    { key: "color", label: "Color", type: "checkbox", options: [
      { value: "black", label: "Black", count: 12, selected: false },
      { value: "white", label: "White", count: 8, selected: true },
    ]},
  ]}
  onFilterChange={() => {}}
  sortOptions={[
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
  ]}
  sortValue="featured"
  onSortChange={() => {}}
  activeFilterCount={1}
  onClearAll={() => {}}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Typography", property: "Heading Font", value: "Raleway 10px / 600" },
          { group: "Typography", property: "Heading Tracking", value: "1.5px" },
          { group: "Typography", property: "Heading Transform", value: "uppercase" },
          { group: "Typography", property: "Option Font", value: "Raleway 13px / 400" },
          { group: "Spacing", property: "Group Gap", value: "24px" },
          { group: "Spacing", property: "Option Gap", value: "12px" },
          { group: "Colors", property: "Border", value: "1px solid #e8e8e1", cssVar: "--color-border" },
          { group: "Colors", property: "Checkbox Active", value: "#111111" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Collection Grid                                                    */
  /* ------------------------------------------------------------------ */
  {
    name: "Collection Grid",
    figmaPath: "Sections / Collection Grid",
    liquidCode: `<div class="collection-content">
  <div class="page-width">
    <h1 class="collection-title">Leggings</h1>
    <span class="collection-count">24 products</span>
    <div class="grid grid--uniform">
      <!-- ProductCard items -->
    </div>
  </div>
</div>`,
    reactCode: `import { CollectionGrid } from "@dfyne/react";

<CollectionGrid
  heading="Leggings"
  productCount={24}
  products={[/* ProductCard instances */]}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Heading", property: "Font", value: "Raleway 14px / 600" },
          { group: "Heading", property: "Tracking", value: "1.5px" },
          { group: "Heading", property: "Transform", value: "uppercase" },
          { group: "Count", property: "Font", value: "Raleway 11px / 400" },
          { group: "Count", property: "Color", value: "rgba(0,0,0,0.6)" },
          { group: "Grid", property: "Columns", value: "4 (desktop) / 2 (mobile)" },
          { group: "Grid", property: "Gap", value: "16px" },
          { group: "Spacing", property: "Heading Bottom", value: "24px" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Quick Shop Modal                                                   */
  /* ------------------------------------------------------------------ */
  {
    name: "Quick Shop Modal",
    figmaPath: "Components / Quick Shop Modal",
    liquidCode: `<div class="quick-shop-modal__overlay">
  <div class="quick-shop-modal">
    <button class="quick-shop-modal__close" aria-label="Close">&times;</button>
    <div class="quick-shop-modal__image">
      <img src="..." alt="..." />
    </div>
    <div class="quick-shop-modal__info">
      <h3 class="quick-shop-modal__title">Power Seamless Legging</h3>
      <p class="quick-shop-modal__price">£54.00</p>
      <div class="quick-shop-modal__sizes"><!-- size buttons --></div>
      <button class="btn">ADD TO BAG</button>
    </div>
  </div>
</div>`,
    reactCode: `import { QuickShopModal } from "@dfyne/react";

<QuickShopModal
  open={true}
  onClose={() => {}}
  product={{
    name: "Power Seamless Legging",
    price: "£54.00",
    images: [
      { src: "https://placehold.co/400x500/e8e8e1/111?text=Front", alt: "Front" },
    ],
    sizes: [
      { label: "S", selected: false, soldOut: false },
      { label: "M", selected: true, soldOut: false },
      { label: "XL", selected: false, soldOut: true },
    ],
  }}
  onAddToBag={() => {}}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Overlay", property: "Background", value: "rgba(0,0,0,0.5)" },
          { group: "Modal", property: "Background", value: "#ffffff" },
          { group: "Modal", property: "Radius", value: "8px" },
          { group: "Modal", property: "Max Width", value: "720px" },
          { group: "Modal", property: "Shadow", value: "0 8px 32px rgba(0,0,0,0.2)" },
          { group: "Title", property: "Font", value: "Raleway 14px / 600" },
          { group: "Title", property: "Tracking", value: "0.5px" },
          { group: "Price", property: "Font", value: "Raleway 13px / 400" },
          { group: "Image", property: "Aspect Ratio", value: "4:5" },
          { group: "Spacing", property: "Padding", value: "24px" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Cart Item                                                          */
  /* ------------------------------------------------------------------ */
  {
    name: "Cart Item",
    figmaPath: "Components / Cart Item",
    liquidCode: `<div class="cart__item">
  <div class="cart__item-image">
    <img src="..." alt="..." width="80" height="100" />
  </div>
  <div class="cart__item-details">
    <p class="cart__item-name">Power Seamless Legging</p>
    <p class="cart__item-variant">Black / M</p>
    <p class="cart__item-price">£54.00</p>
    <div class="js-qty__wrapper"><!-- quantity --></div>
    <button class="cart__item-remove">Remove</button>
  </div>
</div>`,
    reactCode: `import { CartItem } from "@dfyne/react";

<CartItem
  image={{ src: "https://placehold.co/80x100/e8e8e1/111?text=Legging", alt: "Legging" }}
  name="Power Seamless Legging"
  variant="Black / M"
  price="£54.00"
  quantity={1}
  onQuantityChange={(v) => {}}
  onRemove={() => {}}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Image", property: "Width", value: "80px" },
          { group: "Image", property: "Height", value: "100px" },
          { group: "Image", property: "Radius", value: "4px" },
          { group: "Image", property: "Object Fit", value: "cover" },
          { group: "Name", property: "Font", value: "Raleway 13px / 600" },
          { group: "Name", property: "Tracking", value: "0.325px" },
          { group: "Variant", property: "Font", value: "Raleway 11px / 400" },
          { group: "Variant", property: "Color", value: "rgba(0,0,0,0.6)" },
          { group: "Price", property: "Font", value: "Raleway 13px / 400" },
          { group: "Spacing", property: "Gap", value: "12px" },
          { group: "Colors", property: "Border Bottom", value: "1px solid #e8e8e1", cssVar: "--color-border" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Slideshow                                                          */
  /* ------------------------------------------------------------------ */
  {
    name: "Slideshow",
    figmaPath: "Sections / Slideshow",
    liquidCode: `<section class="slideshow">
  <div class="slideshow__slide">
    <img src="..." alt="..." />
    <div class="slideshow__overlay">
      <h2>NEW COLLECTION</h2>
      <p>Spring 2024</p>
    </div>
  </div>
</section>`,
    reactCode: `import { Slideshow } from "@dfyne/react";

<Slideshow
  slides={[
    { image: "...", alt: "Slide 1", heading: "NEW COLLECTION", caption: "Spring 2024" },
    { image: "...", alt: "Slide 2", heading: "BEST SELLERS" },
    { image: "...", alt: "Slide 3", heading: "SALE", cta: { label: "SHOP NOW", href: "#" } },
  ]}
  autoplay={false}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Layout", property: "Width", value: "100%" },
          { group: "Layout", property: "Height", value: "800px" },
          { group: "Layout", property: "Overflow", value: "hidden" },
          { group: "Heading", property: "Font", value: "Raleway 34-84px / 500" },
          { group: "Heading", property: "Transform", value: "uppercase" },
          { group: "Heading", property: "Color", value: "#ffffff" },
          { group: "Caption", property: "Font", value: "Raleway 10px / 600" },
          { group: "Caption", property: "Tracking", value: "1.5px" },
          { group: "Caption", property: "Color", value: "white/80%" },
          { group: "CTA", property: "Font", value: "9px / 600" },
          { group: "CTA", property: "Tracking", value: "2.7px" },
          { group: "Behavior", property: "Autoplay", value: "configurable (default true)" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Promo Grid                                                         */
  /* ------------------------------------------------------------------ */
  {
    name: "Promo Grid",
    figmaPath: "Sections / Promo Grid",
    liquidCode: `<section class="promo-grid">
  <div class="promo-grid__card">
    <img src="..." alt="..." />
    <h3 class="promo-grid__title">LEGGINGS</h3>
  </div>
</section>`,
    reactCode: `import { PromoGrid } from "@dfyne/react";

<PromoGrid
  cards={[
    { image: "...", alt: "Leggings", title: "LEGGINGS", caption: "New styles" },
    { image: "...", alt: "Bras", title: "SPORTS BRAS" },
    { image: "...", alt: "Shorts", title: "SHORTS", span: 2 },
  ]}
  columns={3}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Layout", property: "Columns", value: "3 (configurable)" },
          { group: "Layout", property: "Gap", value: "16px" },
          { group: "Image", property: "Aspect Ratio", value: "500:625 (4:5)" },
          { group: "Image", property: "Object Fit", value: "cover" },
          { group: "Title", property: "Font", value: "Raleway 13px / 600" },
          { group: "Title", property: "Tracking", value: "1.5px" },
          { group: "Title", property: "Transform", value: "uppercase" },
          { group: "Title", property: "Color", value: "#111111" },
          { group: "Caption", property: "Font", value: "Raleway 11px / 400" },
          { group: "Caption", property: "Color", value: "rgba(0,0,0,0.6)" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Tabs                                                               */
  /* ------------------------------------------------------------------ */
  {
    name: "Tabs",
    figmaPath: "Components / Tabs",
    liquidCode: `<div class="tabs">
  <div class="tabs__nav">
    <button class="tabs__tab tabs__tab--active">Description</button>
    <button class="tabs__tab">Size Guide</button>
  </div>
  <div class="tabs__panel">Content here...</div>
</div>`,
    reactCode: `import { Tabs } from "@dfyne/react";

<Tabs tabs={[
  { label: "Description", content: <p>Premium seamless fabric...</p> },
  { label: "Size Guide", content: <p>XS: 6-8, S: 8-10...</p> },
  { label: "Delivery", content: <p>Free UK delivery over \u00a350.</p> },
]} />`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Tab", property: "Font", value: "Raleway 10px / 600" },
          { group: "Tab", property: "Tracking", value: "1.5px" },
          { group: "Tab", property: "Transform", value: "uppercase" },
          { group: "Tab", property: "Padding", value: "12px 16px" },
          { group: "Tab Active", property: "Border Bottom", value: "2px solid #111111" },
          { group: "Tab Active", property: "Color", value: "#111111" },
          { group: "Panel", property: "Font", value: "Raleway 13px / 400" },
          { group: "Panel", property: "Line Height", value: "1.6" },
          { group: "Panel", property: "Padding", value: "16px 0" },
          { group: "Colors", property: "Border", value: "1px solid #e8e8e1", cssVar: "--color-border" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Toast                                                              */
  /* ------------------------------------------------------------------ */
  {
    name: "Toast",
    figmaPath: "Components / Toast",
    liquidCode: `<div class="toast toast--success">
  <span class="toast__message">Added to bag successfully</span>
  <button class="toast__close">&times;</button>
</div>`,
    reactCode: `import { Toast } from "@dfyne/react";

<Toast
  message="Added to bag successfully"
  type="success"
  visible={true}
  onClose={() => {}}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Typography", property: "Font", value: "Raleway 13px / 400" },
          { group: "Typography", property: "Color", value: "#ffffff" },
          { group: "Spacing", property: "Padding", value: "12px 16px" },
          { group: "Colors", property: "Background (success)", value: "#111111" },
          { group: "Shape", property: "Radius", value: "4px" },
          { group: "Layout", property: "Position", value: "fixed bottom-right" },
          { group: "Behavior", property: "Animation", value: "slide-up on show" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Breadcrumbs                                                        */
  /* ------------------------------------------------------------------ */
  {
    name: "Breadcrumbs",
    figmaPath: "Components / Breadcrumbs",
    liquidCode: `<nav class="breadcrumb" aria-label="breadcrumb">
  <a href="/">Home</a>
  <span class="breadcrumb__sep">/</span>
  <a href="/collections">Shop</a>
  <span class="breadcrumb__sep">/</span>
  <span>Power Seamless Legging</span>
</nav>`,
    reactCode: `import { Breadcrumbs } from "@dfyne/react";

<Breadcrumbs items={[
  { label: "Home", href: "#" },
  { label: "Shop", href: "#" },
  { label: "Leggings", href: "#" },
  { label: "Power Seamless Legging" },
]} />`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Typography", property: "Font", value: "Raleway 11px / 400" },
          { group: "Typography", property: "Tracking", value: "0.3px" },
          { group: "Link", property: "Color", value: "rgba(0,0,0,0.6)" },
          { group: "Link", property: "Hover", value: "underline" },
          { group: "Current", property: "Color", value: "#111111" },
          { group: "Separator", property: "Character", value: "/" },
          { group: "Separator", property: "Color", value: "rgba(0,0,0,0.3)" },
          { group: "Spacing", property: "Gap", value: "8px" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Pagination                                                         */
  /* ------------------------------------------------------------------ */
  {
    name: "Pagination",
    figmaPath: "Components / Pagination",
    liquidCode: `<nav class="pagination" aria-label="Pagination">
  <a class="pagination__prev" href="?page=1">&laquo; Prev</a>
  <span class="pagination__page pagination__page--active">2</span>
  <a class="pagination__page" href="?page=3">3</a>
  <a class="pagination__next" href="?page=3">Next &raquo;</a>
</nav>`,
    reactCode: `import { Pagination } from "@dfyne/react";

<Pagination
  currentPage={2}
  totalPages={12}
  onPageChange={(page) => {}}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Typography", property: "Font", value: "Raleway 11px / 400" },
          { group: "Typography", property: "Tracking", value: "0.3px" },
          { group: "Active Page", property: "Background", value: "#111111" },
          { group: "Active Page", property: "Color", value: "#ffffff" },
          { group: "Page", property: "Size", value: "32px x 32px" },
          { group: "Page", property: "Radius", value: "50%" },
          { group: "Page", property: "Hover BG", value: "#f6f6f6" },
          { group: "Spacing", property: "Gap", value: "4px" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Region Selector                                                    */
  /* ------------------------------------------------------------------ */
  {
    name: "Region Selector",
    figmaPath: "Components / Region Selector",
    liquidCode: `<div class="region-selector">
  <button class="region-selector__toggle">
    <span class="region-selector__flag">\u{1F1EC}\u{1F1E7}</span>
    <span>United Kingdom (GBP)</span>
  </button>
  <ul class="region-selector__list">
    <li class="region-selector__option">...</li>
  </ul>
</div>`,
    reactCode: `import { RegionSelector } from "@dfyne/react";

<RegionSelector
  regions={[
    { code: "GB", label: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}", currency: "GBP" },
    { code: "US", label: "United States", flag: "\u{1F1FA}\u{1F1F8}", currency: "USD" },
  ]}
  activeRegion="GB"
  onChange={(code) => {}}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Typography", property: "Font", value: "Raleway 11px / 400" },
          { group: "Typography", property: "Tracking", value: "0.3px" },
          { group: "Toggle", property: "Padding", value: "8px 12px" },
          { group: "Toggle", property: "Border", value: "1px solid #e8e8e1", cssVar: "--color-border" },
          { group: "Toggle", property: "Radius", value: "4px" },
          { group: "Dropdown", property: "Background", value: "#ffffff" },
          { group: "Dropdown", property: "Shadow", value: "0 4px 12px rgba(0,0,0,0.1)" },
          { group: "Option", property: "Padding", value: "8px 12px" },
          { group: "Option", property: "Hover BG", value: "#f6f6f6" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Tooltip                                                            */
  /* ------------------------------------------------------------------ */
  {
    name: "Tooltip",
    figmaPath: "Components / Tooltip",
    liquidCode: `<div class="tooltip-wrapper">
  <button>Hover me</button>
  <div class="tooltip tooltip--top">Top tooltip</div>
</div>`,
    reactCode: `import { Tooltip } from "@dfyne/react";

<Tooltip content="Top tooltip" position="top">
  <button>Hover (Top)</button>
</Tooltip>
<Tooltip content="Bottom tooltip" position="bottom">
  <button>Hover (Bottom)</button>
</Tooltip>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Typography", property: "Font", value: "Raleway 11px / 400" },
          { group: "Typography", property: "Color", value: "#ffffff" },
          { group: "Colors", property: "Background", value: "#111111" },
          { group: "Spacing", property: "Padding", value: "6px 10px" },
          { group: "Shape", property: "Radius", value: "4px" },
          { group: "Layout", property: "Positions", value: "top, bottom, left, right" },
          { group: "Behavior", property: "Trigger", value: "hover / focus" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Social Icons                                                       */
  /* ------------------------------------------------------------------ */
  {
    name: "Social Icons",
    figmaPath: "Components / Social Icons",
    liquidCode: `<div class="social-icons">
  <a href="..." class="social-icons__link" aria-label="Instagram">
    <svg><!-- instagram --></svg>
  </a>
  <a href="..." class="social-icons__link" aria-label="TikTok">
    <svg><!-- tiktok --></svg>
  </a>
</div>`,
    reactCode: `import { SocialIcons } from "@dfyne/react";

<SocialIcons links={[
  { platform: "instagram", href: "#" },
  { platform: "tiktok", href: "#" },
  { platform: "facebook", href: "#" },
  { platform: "youtube", href: "#" },
  { platform: "pinterest", href: "#" },
]} />`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Icon", property: "Size", value: "20px" },
          { group: "Icon", property: "Color", value: "#111111" },
          { group: "Icon", property: "Hover Color", value: "rgba(0,0,0,0.6)" },
          { group: "Spacing", property: "Gap", value: "16px" },
          { group: "Layout", property: "Display", value: "inline-flex" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Media Text                                                         */
  /* ------------------------------------------------------------------ */
  {
    name: "Media Text",
    figmaPath: "Sections / Media Text",
    liquidCode: `<section class="media-text">
  <div class="media-text__image">
    <img src="..." alt="Our Story" />
  </div>
  <div class="media-text__content">
    <h2>OUR STORY</h2>
    <p>Founded in 2020...</p>
    <a href="..." class="btn">LEARN MORE</a>
  </div>
</section>`,
    reactCode: `import { MediaText } from "@dfyne/react";

<MediaText
  image={{ src: "...", alt: "Our Story" }}
  heading="OUR STORY"
  body="Founded in 2020, DFYNE creates premium women's activewear..."
  cta={{ label: "LEARN MORE", href: "#" }}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Layout", property: "Display", value: "grid 2-col (desktop) / stack (mobile)" },
          { group: "Image", property: "Aspect Ratio", value: "720:500" },
          { group: "Image", property: "Object Fit", value: "cover" },
          { group: "Heading", property: "Font", value: "Raleway 14px / 600" },
          { group: "Heading", property: "Tracking", value: "1.5px" },
          { group: "Heading", property: "Transform", value: "uppercase" },
          { group: "Body", property: "Font", value: "Raleway 13px / 400" },
          { group: "Body", property: "Line Height", value: "1.6" },
          { group: "Body", property: "Color", value: "rgba(0,0,0,0.7)" },
          { group: "CTA", property: "Style", value: "Primary Button" },
          { group: "Spacing", property: "Content Padding", value: "40px" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Cart Drawer                                                        */
  /* ------------------------------------------------------------------ */
  {
    name: "Cart Drawer",
    figmaPath: "Sections / Cart Drawer",
    liquidCode: `<div class="cart-drawer__overlay">
  <div class="cart-drawer">
    <div class="cart-drawer__header">
      <h2>Your Bag</h2>
      <button class="cart-drawer__close">&times;</button>
    </div>
    <div class="cart-drawer__items">
      <!-- CartItem elements -->
    </div>
    <div class="cart-drawer__footer">
      <p class="cart-drawer__subtotal">Subtotal: £130.00</p>
      <p class="cart-drawer__shipping">Free UK delivery over £50</p>
      <button class="btn">CHECKOUT</button>
    </div>
  </div>
</div>`,
    reactCode: `import { CartDrawer } from "@dfyne/react";

<CartDrawer
  open={isOpen}
  onClose={() => setIsOpen(false)}
  items={[
    { image: { src: "...", alt: "Item" }, name: "Power Seamless Legging", variant: "Black / M", price: "£54.00", quantity: 1 },
  ]}
  onItemQuantityChange={() => {}}
  onItemRemove={() => {}}
  subtotal="£130.00"
  shippingMessage="Free UK delivery over £50"
  onCheckout={() => {}}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Overlay", property: "Background", value: "rgba(0,0,0,0.5)" },
          { group: "Drawer", property: "Width", value: "400px (desktop)" },
          { group: "Drawer", property: "Background", value: "#ffffff" },
          { group: "Drawer", property: "Position", value: "fixed right-0" },
          { group: "Header", property: "Font", value: "Raleway 14px / 600" },
          { group: "Header", property: "Tracking", value: "1.5px" },
          { group: "Header", property: "Transform", value: "uppercase" },
          { group: "Subtotal", property: "Font", value: "Raleway 13px / 600" },
          { group: "Shipping", property: "Font", value: "Raleway 11px / 400" },
          { group: "Shipping", property: "Color", value: "rgba(0,0,0,0.6)" },
          { group: "Spacing", property: "Padding", value: "24px" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Header                                                             */
  /* ------------------------------------------------------------------ */
  {
    name: "Header",
    figmaPath: "Sections / Header",
    liquidCode: `<header class="site-header">
  <div class="page-width">
    <a class="site-header__logo" href="/">DFYNE</a>
    <nav class="site-nav">
      <a href="/collections/shop" class="site-nav__link">Shop</a>
      <a href="/collections/new" class="site-nav__link">New In</a>
    </nav>
    <div class="site-header__icons">
      <button class="site-header__search"><!-- search --></button>
      <a class="site-header__cart" href="/cart">
        <span class="cart-link__count">2</span>
      </a>
    </div>
  </div>
</header>`,
    reactCode: `import { Header } from "@dfyne/react";

<Header
  logo={<span style={{ fontFamily: "Raleway", fontWeight: 700, fontSize: 18, letterSpacing: 3 }}>DFYNE</span>}
  navItems={[
    { label: "Shop", href: "#", children: [
      { label: "Leggings", href: "#" },
      { label: "Sports Bras", href: "#" },
    ]},
    { label: "New In", href: "#" },
  ]}
  cartItemCount={2}
  onCartClick={() => {}}
  onMenuClick={() => {}}
  onSearch={() => {}}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Layout", property: "Height", value: "60px" },
          { group: "Layout", property: "Position", value: "sticky top-0" },
          { group: "Layout", property: "Z-Index", value: "1000" },
          { group: "Colors", property: "Background", value: "#ffffff" },
          { group: "Colors", property: "Border Bottom", value: "1px solid #e8e8e1", cssVar: "--color-border" },
          { group: "Logo", property: "Font", value: "Raleway 18px / 700" },
          { group: "Logo", property: "Tracking", value: "3px" },
          { group: "Nav", property: "Font", value: "Raleway 10px / 600" },
          { group: "Nav", property: "Tracking", value: "1.5px" },
          { group: "Nav", property: "Transform", value: "uppercase" },
          { group: "Nav", property: "Gap", value: "24px" },
          { group: "Cart Badge", property: "Size", value: "16px" },
          { group: "Cart Badge", property: "Background", value: "#111111" },
          { group: "Cart Badge", property: "Text", value: "#ffffff" },
          { group: "Cart Badge", property: "Font", value: "9px / 600" },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Footer                                                             */
  /* ------------------------------------------------------------------ */
  {
    name: "Footer",
    figmaPath: "Sections / Footer",
    liquidCode: `<footer class="site-footer">
  <div class="site-footer__section">
    <h3 class="site-footer__heading">Account</h3>
    <ul class="site-footer__links">
      <li><a href="...">Login</a></li>
      <li><a href="...">Register</a></li>
    </ul>
  </div>
  <!-- Repeat for each column -->
</footer>`,
    reactCode: `import { Footer } from "@dfyne/react";

<Footer
  columns={[
    { heading: "Account", links: ["Login", "Register", "Rewards"] },
    { heading: "About", links: ["About", "Careers", "Sustainability"] },
    { heading: "Contact", links: ["Contact Us", "Privacy Policy"] },
    { heading: "Delivery & Returns", links: ["Shipping", "Returns"] },
  ]}
/>`,
    variants: [
      {
        name: "Default",
        specs: [
          { group: "Layout", property: "Border Top", value: "#e8e8e1", cssVar: "--color-border" },
          { group: "Layout", property: "Padding", value: "61px top / 60px bottom (desktop)" },
          { group: "Layout", property: "Grid", value: "4 columns (desktop) / 2 (mobile)" },
          { group: "Heading", property: "Font", value: "Raleway 10px / 600" },
          { group: "Heading", property: "Tracking", value: "1.5px" },
          { group: "Heading", property: "Transform", value: "uppercase" },
          { group: "Links", property: "Font", value: "Raleway 11.05px / 400" },
          { group: "Links", property: "Margin Top", value: "34px (from heading)" },
          { group: "Links", property: "Spacing", value: "14px vertical gap" },
          { group: "Links", property: "Hover", value: "underline" },
        ],
      },
    ],
  },
];
