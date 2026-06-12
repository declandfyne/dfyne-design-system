/**
 * Usage guidelines for all 13 DFYNE design system components.
 * Tailored to the DFYNE premium women's athletic wear brand context.
 */

export type DoExample = {
  label: string;
  props: Record<string, unknown>;
  reason: string;
};

export type UsageGuideline = {
  component: string;
  description: string;
  when: string[];
  whenNot: string[];
  doExamples: DoExample[];
  dontExamples: DoExample[];
};

export const usageGuidelines: UsageGuideline[] = [
  {
    component: "Button",
    description:
      "The primary action trigger for e-commerce flows including add-to-cart, checkout, and navigation CTAs.",
    when: [
      "Use Primary for the single most important action on the page, such as Add to Cart or Checkout.",
      "Use Secondary for supporting actions like 'Complete the Look' or 'Save to Wishlist'.",
      "Use Tertiary for low-emphasis actions like 'Size Guide' or 'Notify Me'.",
      "Use the disabled state when a product is sold out and no action is available.",
    ],
    whenNot: [
      "Do not use Primary for navigation links — use anchor tags styled with the Secondary variant instead.",
      "Do not place two Primary buttons side-by-side; there should only be one dominant action per context.",
      "Do not use Button for inline text links within body copy.",
    ],
    doExamples: [
      {
        label: "Primary — Add to Cart",
        props: { variant: "primary", children: "ADD TO CART" },
        reason:
          "Clear, uppercase CTA with high contrast reinforces the purchase action as the dominant interaction.",
      },
      {
        label: "Secondary — Complete the Look",
        props: { variant: "secondary", children: "COMPLETE THE LOOK" },
        reason:
          "Ghost border style signals a supporting action without competing with the primary CTA.",
      },
    ],
    dontExamples: [
      {
        label: "Two Primary buttons",
        props: { variant: "primary", children: "ADD TO BAG" },
        reason:
          "Placing two Primary buttons side-by-side creates visual competition and dilutes the main CTA.",
      },
      {
        label: "Primary for navigation",
        props: { variant: "primary", children: "Shop All" },
        reason:
          "Navigation actions are lower priority than purchase actions; use a Secondary or Tertiary variant.",
      },
    ],
  },

  {
    component: "Badge",
    description:
      "An overlaid product label that communicates product status or editorial tags directly on the product image.",
    when: [
      "Use the 'custom' variant to surface editorial labels like NEW, TRENDING, or LIMITED.",
      "Use the 'sold-out' variant to clearly communicate stock unavailability.",
      "Use the 'bottom' variant for social proof labels like Best Seller or Staff Pick.",
    ],
    whenNot: [
      "Do not stack multiple badges on a single product card — choose the highest-priority label.",
      "Do not use badges for promotional discount percentages; use price display patterns instead.",
      "Do not use badge text longer than 10 characters as it breaks the compact layout.",
    ],
    doExamples: [
      {
        label: "NEW badge on fresh arrivals",
        props: { text: "NEW", variant: "custom" },
        reason:
          "Top-right placement draws attention to new product additions without obscuring the image.",
      },
      {
        label: "Best Seller bottom label",
        props: { text: "Best Seller", variant: "bottom", position: "bottom-left" },
        reason:
          "Bottom-left placement reinforces social proof without interfering with the editorial badge position.",
      },
    ],
    dontExamples: [
      {
        label: "Long promotional text",
        props: { text: "25% OFF THIS WEEK ONLY", variant: "custom" },
        reason:
          "Lengthy text breaks the badge's compact visual design and competes with product imagery.",
      },
      {
        label: "Multiple badges on one card",
        props: { text: "NEW", variant: "custom" },
        reason:
          "Stacking NEW and Best Seller badges together clutters the card and dilutes each label's impact.",
      },
    ],
  },

  {
    component: "Size Button",
    description:
      "An interactive size selector that communicates availability and current selection state within the product page size grid.",
    when: [
      "Use on product pages to render the available size options for apparel and footwear.",
      "Apply the selected state to reflect the currently chosen size.",
      "Apply the sold-out state with a strikethrough to show unavailable sizes without removing them.",
    ],
    whenNot: [
      "Do not use Size Button for non-size options like colour — use Color Swatch instead.",
      "Do not hide sold-out sizes entirely; show them in the sold-out state to communicate the full size range.",
      "Do not use Size Button outside of a size-selection context.",
    ],
    doExamples: [
      {
        label: "Selected size — M",
        props: { label: "M", selected: true, soldOut: false },
        reason:
          "The filled black state gives clear visual feedback about the currently selected size.",
      },
      {
        label: "Sold-out size — XL",
        props: { label: "XL", selected: false, soldOut: true },
        reason:
          "Showing XL in a struck-through disabled state informs the customer of the full size range and potential restock.",
      },
    ],
    dontExamples: [
      {
        label: "Hiding sold-out sizes",
        props: { label: "XL", selected: false, soldOut: false },
        reason:
          "Removing sold-out sizes from the grid makes it impossible for customers to register interest or join a restock alert.",
      },
      {
        label: "Using for colour selection",
        props: { label: "Black", selected: false, soldOut: false },
        reason:
          "Colour variants should use the Color Swatch component with product imagery, not a text-only size button.",
      },
    ],
  },

  {
    component: "Arrow Button",
    description:
      "A circular navigation control for carousels, sliders, and horizontally scrollable product grids.",
    when: [
      "Use to paginate product carousels on collection and homepage sections.",
      "Use the edge variant on full-bleed hero carousels where the button overlaps the image.",
      "Use the disabled state when the carousel has reached the first or last item.",
    ],
    whenNot: [
      "Do not use Arrow Button for vertical scroll or accordion interactions.",
      "Do not use Arrow Button as a page-level back/forward navigation control.",
      "Do not omit the aria-label attribute — always include directional context for screen readers.",
    ],
    doExamples: [
      {
        label: "Carousel navigation — right",
        props: { direction: "right" },
        reason:
          "The circular border and hover inversion provide a clear, brand-consistent navigation affordance.",
      },
      {
        label: "Edge variant on hero",
        props: { direction: "left", variant: "edge" },
        reason:
          "The elevated shadow on the edge variant ensures legibility when rendered over campaign imagery.",
      },
    ],
    dontExamples: [
      {
        label: "Arrow Button as back navigation",
        props: { direction: "left" },
        reason:
          "Page-level back navigation should use a standard anchor or breadcrumb pattern, not a carousel control.",
      },
      {
        label: "Arrow Button without aria-label",
        props: { direction: "right" },
        reason:
          "Without a descriptive aria-label, screen reader users cannot determine the button's purpose.",
      },
    ],
  },

  {
    component: "Section Heading",
    description:
      "A two-line typographic header pairing an eyebrow label with a section title for editorial content blocks.",
    when: [
      "Use at the top of homepage sections like New In, Best Sellers, or campaign collections.",
      "Use to introduce categorised product grids with an editorial context.",
      "Include both eyebrow and title to create the full two-level hierarchy.",
    ],
    whenNot: [
      "Do not use Section Heading as a page title or H1 — it is a section-level component.",
      "Do not use the eyebrow alone without a title; the two-level structure defines the component.",
      "Do not use sentence case for either field — both should be uppercase to match brand typography.",
    ],
    doExamples: [
      {
        label: "New arrivals section",
        props: { eyebrow: "JUST LANDED", title: "NEW IN WOMEN" },
        reason:
          "The eyebrow provides editorial context while the bold title drives the category message.",
      },
      {
        label: "Campaign collection header",
        props: { eyebrow: "HIGH PERFORMANCE", title: "IMPACT COLLECTION" },
        reason:
          "Pairs the collection line with the hero product range for a consistent editorial feel.",
      },
    ],
    dontExamples: [
      {
        label: "Sentence case title",
        props: { eyebrow: "Just landed", title: "New in women" },
        reason:
          "Sentence case breaks the brand's uppercase typographic standard and reduces visual authority.",
      },
      {
        label: "Eyebrow without title",
        props: { eyebrow: "JUST LANDED", title: "" },
        reason:
          "The eyebrow alone lacks the hierarchical weight needed to anchor a content section.",
      },
    ],
  },

  {
    component: "Product Card",
    description:
      "The primary product display tile used in collection grids, search results, and featured product sections.",
    when: [
      "Use for all product listing pages and collection grids.",
      "Include the badge prop to surface NEW or sale labels when relevant.",
      "Display rating and review count when available to drive social proof.",
    ],
    whenNot: [
      "Do not use Product Card inside the 'Complete the Look' panel — use Cross-Sell Card instead.",
      "Do not crop or alter the 4:5 portrait aspect ratio, as it ensures grid alignment.",
      "Do not omit the colour name — it is a key purchase decision signal for DFYNE's colourway range.",
    ],
    doExamples: [
      {
        label: "Product with NEW badge and rating",
        props: {
          name: "Impact Longsleeve Top",
          color: "Pebble Grey",
          price: 52.2,
          badge: "NEW",
          rating: 4.8,
          reviewCount: 52866,
        },
        reason:
          "Combining editorial badge with social proof maximises trust and urgency on new arrivals.",
      },
    ],
    dontExamples: [
      {
        label: "Card without colour name",
        props: {
          name: "Impact Longsleeve Top",
          price: 52.2,
        },
        reason:
          "DFYNE products are sold in multiple colourways; omitting the colour forces customers to click through unnecessarily.",
      },
    ],
  },

  {
    component: "Category Card",
    description:
      "A full-bleed image card linking to a product collection, used in category navigation grids.",
    when: [
      "Use to navigate between top-level product collections such as Leggings, Sports Bras, and Tops.",
      "Include a caption to convey the collection's performance positioning (e.g. High Support).",
      "Use high-quality campaign photography that works well with the bottom gradient overlay.",
    ],
    whenNot: [
      "Do not use Category Card for individual product promotion — use Product Card instead.",
      "Do not use images with dominant light backgrounds as the white title text will be illegible.",
      "Do not remove the gradient overlay as it ensures WCAG-compliant title legibility.",
    ],
    doExamples: [
      {
        label: "Impact collection card",
        props: {
          image: "/collections/impact.jpg",
          title: "IMPACT",
          href: "/collections/impact",
          caption: "High Support",
        },
        reason:
          "Dark athletic imagery with a gradient overlay keeps the white title and chevron readable.",
      },
    ],
    dontExamples: [
      {
        label: "Light-background image",
        props: {
          image: "/collections/light-bg.jpg",
          title: "SEAMLESS",
          href: "/collections/seamless",
        },
        reason:
          "White title text on a light image background fails contrast requirements and reduces legibility.",
      },
    ],
  },

  {
    component: "Color Swatch",
    description:
      "A thumbnail swatch linking to a product colour variant, displayed below the product card in collection grids.",
    when: [
      "Use beneath Product Cards to expose available colourways without navigating to the PDP.",
      "Apply the selected ring state to reflect the currently active colourway on hover or selection.",
      "Include the isNew prop to highlight newly added colourways.",
    ],
    whenNot: [
      "Do not use Color Swatch for size selection — use Size Button instead.",
      "Do not truncate the label; show the full colourway name for accessibility.",
      "Do not use placeholder grey boxes — only render swatches for colours with a product image.",
    ],
    doExamples: [
      {
        label: "Selected colourway — Midnight Black",
        props: {
          label: "Midnight Black",
          selected: true,
          isNew: false,
        },
        reason:
          "The 1px solid ring provides clear, minimal visual feedback that this colourway is active.",
      },
      {
        label: "New colourway callout",
        props: {
          label: "Cloud White",
          selected: false,
          isNew: true,
        },
        reason:
          "The isNew flag draws attention to newly launched colourways without requiring a separate badge.",
      },
    ],
    dontExamples: [
      {
        label: "Swatch without image",
        props: { label: "Slate Blue", selected: false },
        reason:
          "A plain coloured box fails to communicate the product texture and detail that influences purchase decisions.",
      },
    ],
  },

  {
    component: "Cross-Sell Card",
    description:
      "A compact product tile used in 'Complete the Look' panels to promote complementary items alongside a PDP.",
    when: [
      "Use inside 'Complete the Look' sections on PDPs to cross-sell matching pieces from the same range.",
      "Include name, colour, and price to give customers enough context to decide without leaving the page.",
      "Limit to 3–4 items to keep the panel scannable.",
    ],
    whenNot: [
      "Do not use Cross-Sell Card in full collection grids — use Product Card instead.",
      "Do not use Cross-Sell Card for unrelated products; only surface items from the same collection or coordinating range.",
      "Do not omit the price — customers need price context before clicking through to the PDP.",
    ],
    doExamples: [
      {
        label: "Matching shorts in panel",
        props: {
          name: "Impact Shorts",
          color: "Midnight Black",
          price: 49,
        },
        reason:
          "Compact format with name, colour, and price gives enough context for a confident cross-sell decision.",
      },
    ],
    dontExamples: [
      {
        label: "Unrelated product cross-sell",
        props: {
          name: "Gym Bag",
          color: "Black",
          price: 75,
        },
        reason:
          "Accessories unrelated to the active collection break the editorial coherence of the 'Complete the Look' pattern.",
      },
    ],
  },

  {
    component: "Campaign Hero",
    description:
      "A full-bleed hero section featuring campaign imagery, a headline, and one or two CTAs for homepage and landing page introductions.",
    when: [
      "Use as the first section on homepage and campaign landing pages.",
      "Pair with a strong campaign headline and a single primary CTA to drive collection exploration.",
      "Use a secondary CTA only when a meaningful second action exists (e.g. 'EXPLORE' alongside 'SHOP NOW').",
    ],
    whenNot: [
      "Do not use Campaign Hero mid-page or as a repeated section — it is designed as a single entrance moment.",
      "Do not use busy, multi-subject images as the gradient overlay is calibrated for single-subject campaign photography.",
      "Do not write headline text longer than two words for maximum typographic impact.",
    ],
    doExamples: [
      {
        label: "Impact campaign hero",
        props: {
          caption: "NEW STYLES, NEW STRENGTH",
          heading: "IMPACT",
          cta: { label: "SHOP NOW", href: "/collections/impact" },
        },
        reason:
          "A single powerful word headline with a direct CTA creates maximum visual and commercial impact.",
      },
    ],
    dontExamples: [
      {
        label: "Long paragraph headline",
        props: {
          caption: "Spring Collection",
          heading: "DISCOVER OUR LATEST PERFORMANCE STYLES FOR WOMEN",
        },
        reason:
          "The hero headline is designed for ultra-large display type; long sentences collapse the visual hierarchy.",
      },
    ],
  },

  {
    component: "Announcement Bar",
    description:
      "A rotating top-of-page banner that communicates key store messages such as shipping policy, returns, and promotional offers.",
    when: [
      "Use at the very top of every page to communicate store-wide offers and policies.",
      "Use multiple slides to rotate through key messages such as shipping thresholds and return policies.",
      "Keep each slide message short enough to be read in a single glance.",
    ],
    whenNot: [
      "Do not use Announcement Bar for product-specific promotions — those belong in Badge or a dedicated section.",
      "Do not display more than 4 slides as customers will not wait long enough to see them all.",
      "Do not use the bar for legal or compliance text that requires persistent visibility.",
    ],
    doExamples: [
      {
        label: "Rotating shipping and returns messages",
        props: {
          slides: [
            { text: "FREE TRACKED DELIVERY", detail: "On orders over £30" },
            { text: "HASSLE-FREE RETURNS", detail: "100-day free returns*" },
          ],
          interval: 4000,
        },
        reason:
          "Short, uppercase primary text with a lowercase supporting detail creates a clear typographic rhythm.",
      },
    ],
    dontExamples: [
      {
        label: "Single static promotional slide",
        props: {
          slides: [{ text: "USE CODE DFYNE20 FOR 20% OFF YOUR FIRST ORDER TODAY ONLY" }],
          interval: 4000,
        },
        reason:
          "A single long-form message cannot be rotated and overflows the 36px fixed-height bar on mobile.",
      },
    ],
  },

  {
    component: "Newsletter Signup",
    description:
      "An email capture section placed at the bottom of the homepage or campaign pages to grow the DFYNE subscriber community.",
    when: [
      "Use once per page, typically above the footer, as the terminal content section.",
      "Use to capture emails in exchange for early access to drops, exclusive content, or training tips.",
      "Keep the subtext benefit-led to motivate sign-ups.",
    ],
    whenNot: [
      "Do not place Newsletter Signup mid-page or above product content as it interrupts the shopping flow.",
      "Do not use it as an inline widget inside editorial sections — it is a standalone full-width section.",
      "Do not use generic placeholder copy; always write benefit-led subtext specific to DFYNE's community.",
    ],
    doExamples: [
      {
        label: "Community sign-up with benefit copy",
        props: {
          heading: "JOIN THE COMMUNITY",
          subtext: "Sign up for exclusive drops, early access and training tips.",
        },
        reason:
          "Specific benefits like early access and training tips give customers a clear reason to subscribe.",
      },
    ],
    dontExamples: [
      {
        label: "Generic newsletter copy",
        props: {
          heading: "SIGN UP",
          subtext: "Subscribe to our newsletter.",
        },
        reason:
          "Generic copy does not communicate DFYNE's community value proposition and results in lower conversion.",
      },
    ],
  },

  {
    component: "Footer",
    description:
      "The persistent site footer providing navigation links across account, brand, support, and policy categories.",
    when: [
      "Use on every page as the site-wide navigation footer.",
      "Organise links into four columns: Account, About, Contact, and Delivery & Returns.",
      "Keep column headings short and uppercase to match the brand typographic standard.",
    ],
    whenNot: [
      "Do not add more than four columns as the grid is designed for a four-column desktop layout.",
      "Do not use the Footer to surface promotional or editorial content — it is a utility navigation component.",
      "Do not include more than 6 links per column to avoid visual overload.",
    ],
    doExamples: [
      {
        label: "Standard four-column footer",
        props: {
          columns: [
            { heading: "Account", links: ["Login", "Register", "Rewards"] },
            { heading: "About", links: ["About", "Careers", "Sustainability"] },
            { heading: "Contact", links: ["Contact Us", "Privacy Policy"] },
            { heading: "Delivery & Returns", links: ["Shipping", "Returns"] },
          ],
        },
        reason:
          "Four balanced columns with concise uppercase headings provide clear utility navigation without visual clutter.",
      },
    ],
    dontExamples: [
      {
        label: "Footer used for promotional content",
        props: {
          columns: [
            { heading: "NEW IN", links: ["View All New Arrivals", "Shop Impact", "Shop Seamless"] },
          ],
        },
        reason:
          "Promotional collection links belong in navigation or section CTAs, not in the utility footer.",
      },
    ],
  },
];
