/**
 * Maps each component to the CSS tokens it uses.
 * Shown in the Tokens tab of the CodePanel.
 */
const tokenMap: Record<string, string> = {
  "Button": `/* Button tokens */
--text-button: 9px;
--weight-semibold: 600;
--tracking-button: 2.7px;
--leading-tight: 1.2;
--color-btn-primary: #111111;
--color-btn-primary-text: #ffffff;
--radius-button: 50px;
--font-body: "Raleway", sans-serif;`,

  "Badge": `/* Badge tokens */
--text-badge: 10px;
--weight-semibold: 600;
--tracking-badge: 1.5px;
--radius-sm: 3px;`,

  "Icon": `/* Icon tokens */
--text-base: 13px;
--color-text-primary: #0a0a0a;`,

  "Section Heading": `/* Section Heading tokens */
--text-overline: 10px;
--text-xl: 14px;
--weight-semibold: 600;
--tracking-wide: 1.2px;
--tracking-wider: 1.5px;`,

  "Arrow Button": `/* Arrow Button tokens */
--shadow-arrow: 0 10px 24px rgba(0, 0, 0, 0.14);
--color-bg-primary: #ffffff;
--color-text-primary: #0a0a0a;`,

  "Product Card": `/* Product Card tokens */
--text-card-title: 12px;
--text-card-price: 11px;
--weight-normal: 400;
--tracking-normal: 0.3px;
--color-price: #1c1d1d;
--color-text-primary: #0a0a0a;
--color-text-secondary: #555555;
--shadow-card: 0 10px 20px rgba(0, 0, 0, 0.09);`,

  "Category Card": `/* Category Card tokens */
--text-sm: 9px;
--text-base: 13px;
--weight-medium: 500;
--weight-semibold: 600;
--tracking-wide: 1.2px;
--tracking-wider: 1.5px;
--color-hero-text: #ffffff;
--radius-lg: 8px;`,

  "Color Swatch": `/* Color Swatch tokens */
--radius-full: 999px;
--shadow-focus: inset 0 0 0 2px var(--color-text-body);
--color-border-default: #e8e8e1;`,

  "Size Button": `/* Size Button tokens */
--text-sm: 9px;
--weight-semibold: 600;
--tracking-wider: 1.5px;
--color-border-default: #e8e8e1;
--radius-sm: 3px;`,

  "Cross-Sell Card": `/* Cross-Sell Card tokens */
--text-card-title: 12px;
--text-card-price: 11px;
--weight-normal: 400;
--tracking-normal: 0.3px;
--radius-lg: 8px;`,

  "Campaign Hero": `/* Campaign Hero tokens */
--text-display-sm: 34px;
--text-display-xl: 84px;
--weight-medium: 500;
--leading-hero: 0.9;
--tracking-header: 0.075em;
--color-hero-text: #ffffff;`,

  "Announcement Bar": `/* Announcement Bar tokens */
--text-overline: 10px;
--weight-normal: 400;
--tracking-widest: 2.8px;
--color-announcement: #000000;
--color-announcement-text: #ffffff;
--duration-long: 1500ms;`,

  "Newsletter Signup": `/* Newsletter Signup tokens */
--text-xl: 14px;
--text-md: 11px;
--weight-semibold: 600;
--tracking-wider: 1.5px;
--color-bg-primary: #ffffff;
--color-text-primary: #0a0a0a;
--color-border-input: #dddddd;
--radius-button: 50px;`,

  "Footer": `/* Footer tokens */
--text-overline: 10px;
--text-md: 11px;
--weight-semibold: 600;
--weight-normal: 400;
--tracking-wider: 1.5px;
--color-footer: #ffffff;
--color-footer-text: #000000;`,

  "Header": `/* Header tokens */
--text-nav: 13px;
--text-md: 11px;
--weight-normal: 400;
--weight-semibold: 600;
--tracking-nav: 1.5px;
--color-nav: #ffffff;
--color-nav-text: #000000;
--z-sticky: 6;`,

  "Quantity Input": `/* Quantity Input tokens */
--text-base: 13px;
--weight-normal: 400;
--color-border-default: #e8e8e1;
--color-text-primary: #0a0a0a;
--radius-md: 4px;`,

  "Accordion": `/* Accordion tokens */
--text-base: 13px;
--weight-semibold: 600;
--leading-base: 1.6;
--color-border-default: #e8e8e1;
--duration-normal: 300ms;
--ease-default: cubic-bezier(0.2, 0.06, 0.05, 0.95);`,

  "Tabs": `/* Tabs tokens */
--text-sm: 9px;
--weight-semibold: 600;
--tracking-wider: 1.5px;
--color-text-primary: #0a0a0a;
--color-text-muted: #888888;
--color-border-default: #e8e8e1;`,

  "Search": `/* Search tokens */
--text-base: 13px;
--weight-normal: 400;
--color-bg-input: #fcfcfc;
--color-border-input: #dddddd;
--color-text-primary: #0a0a0a;
--radius-base: 6px;`,

  "Product Gallery": `/* Product Gallery tokens */
--radius-lg: 8px;
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);`,

  "Filter Panel": `/* Filter Panel tokens */
--text-sm: 9px;
--text-base: 13px;
--weight-semibold: 600;
--tracking-wider: 1.5px;
--color-border-default: #e8e8e1;`,

  "Filter Drawer": `/* Filter Drawer tokens */
--text-sm: 9px;
--weight-semibold: 600;
--tracking-wider: 1.5px;
--color-drawer: #ffffff;
--color-drawer-text: #000000;
--shadow-drawer-side: -20px 0 40px rgba(0, 0, 0, 0.12);
--z-drawer: 30;`,

  "Collection Grid": `/* Collection Grid tokens */
--grid-gutter-mobile: 17px;
--grid-gutter-desktop: 22px;
--page-padding-mobile: 17px;
--page-padding-desktop: 24px;`,

  "Collection Intro": `/* Collection Intro tokens */
--text-xl: 14px;
--text-base: 13px;
--weight-semibold: 600;
--leading-base: 1.6;
--tracking-wider: 1.5px;`,

  "Category Image Carousel": `/* Category Image Carousel tokens */
--radius-lg: 8px;
--shadow-card: 0 10px 20px rgba(0, 0, 0, 0.09);`,

  "Cart Item": `/* Cart Item tokens */
--text-card-title: 12px;
--text-card-price: 11px;
--weight-normal: 400;
--tracking-normal: 0.3px;
--color-border-default: #e8e8e1;`,

  "Cart Drawer": `/* Cart Drawer tokens */
--text-sm: 9px;
--text-xl: 14px;
--weight-semibold: 600;
--tracking-wider: 1.5px;
--color-drawer: #ffffff;
--color-drawer-text: #000000;
--color-drawer-button: #111111;
--color-drawer-button-text: #ffffff;
--shadow-drawer-side: -20px 0 40px rgba(0, 0, 0, 0.12);
--z-drawer: 30;`,

  "Back Link": `/* Back Link tokens */
--text-sm: 9px;
--weight-semibold: 600;
--tracking-wider: 1.5px;
--color-text-primary: #0a0a0a;`,

  "Social Icons": `/* Social Icons tokens */
--color-text-primary: #0a0a0a;`,

  "Quick Add": `/* Quick Add tokens */
--text-sm: 9px;
--weight-semibold: 600;
--tracking-wider: 1.5px;
--color-drawer: #ffffff;
--color-drawer-text: #000000;
--color-drawer-button: #111111;
--shadow-drawer-bottom: 0 -20px 40px rgba(0, 0, 0, 0.12);
--z-modal: 10;`,

  "Toast": `/* Toast tokens */
--text-base: 13px;
--weight-normal: 400;
--color-bg-inverse: #0a0a0a;
--color-text-inverse: #ffffff;
--radius-lg: 8px;
--duration-normal: 300ms;`,

  "Tooltip": `/* Tooltip tokens */
--text-sm: 9px;
--weight-normal: 400;
--color-bg-inverse: #0a0a0a;
--color-text-inverse: #ffffff;
--radius-md: 4px;`,

  "Length Selector": `/* Length Selector tokens */
--text-sm: 9px;
--weight-semibold: 600;
--tracking-wider: 1.5px;
--color-border-default: #e8e8e1;
--radius-sm: 3px;`,

  "Product Rail": `/* Product Rail tokens */
--grid-gutter-mobile: 17px;
--grid-gutter-desktop: 22px;
--page-padding-mobile: 17px;
--page-padding-desktop: 24px;`,

  "Category Rail": `/* Category Rail tokens */
--grid-gutter-mobile: 17px;
--grid-gutter-desktop: 22px;`,

  "Cross-Sell Rail": `/* Cross-Sell Rail tokens */
--grid-gutter-mobile: 17px;
--grid-gutter-desktop: 22px;`,
};

export function getComponentTokens(componentName: string): string {
  return tokenMap[componentName] || `/* No token mapping for ${componentName} */`;
}
