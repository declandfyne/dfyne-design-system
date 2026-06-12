/**
 * Generates structured JSON context from design tokens and component list.
 */
export function generateJson(
  tokens: Record<string, string>,
  components: { name: string; file: string }[],
): string {
  const context = {
    brand: {
      name: "DFYNE",
      font: "Raleway",
      primaryColor: "#111111",
      backgroundColor: "#ffffff",
      currency: "GBP",
      aesthetic: "Premium women's athletic wear — minimal, monochrome, editorial",
    },
    tokens: Object.fromEntries(
      Object.entries(tokens).map(([k, v]) => [`--${k}`, v]),
    ),
    components: components.map((c) => ({
      name: c.name,
      import: `import { ${c.name} } from '@dfyne/react'`,
    })),
    rules: [
      "Use ONLY colours from the token palette — never arbitrary hex values.",
      "All button text: uppercase, font-weight 600, letter-spacing 2.7px.",
      "Product images: 4:5 aspect ratio (portrait).",
      "Import components from @dfyne/react — never re-implement them.",
      "Spacing uses --space-* tokens only.",
      "Border radius uses --radius-* tokens only.",
      "Base font size: 13px, line-height 1.6.",
      "Currency: GBP, formatted via Intl.NumberFormat.",
    ],
  };

  return JSON.stringify(context, null, 2);
}
