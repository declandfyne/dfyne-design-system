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
