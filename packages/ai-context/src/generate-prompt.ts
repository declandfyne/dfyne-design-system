/**
 * Generates a markdown system prompt from design tokens and component list.
 */
export function generatePrompt(
  tokens: Record<string, string>,
  components: { name: string; file: string }[],
): string {
  const lines: string[] = [];

  // Header
  lines.push("# DFYNE Design System — AI Context");
  lines.push("");

  // Brand section
  lines.push("## Brand");
  lines.push("");
  lines.push("- **Name**: DFYNE");
  lines.push("- **Font**: Raleway (body and display)");
  lines.push("- **Primary colour**: #111111");
  lines.push("- **Background**: #ffffff");
  lines.push("- **Aesthetic**: Premium women's athletic wear — minimal, monochrome, editorial");
  lines.push("- **Currency**: GBP, formatted via `Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })`");
  lines.push("");

  // Rules section
  lines.push("## Rules");
  lines.push("");
  lines.push("1. Use ONLY colours from the token palette below — never arbitrary hex values.");
  lines.push("2. All button text: uppercase, font-weight 600, letter-spacing 2.7px.");
  lines.push("3. Product images: 4:5 aspect ratio (portrait).");
  lines.push("4. Import components from `@dfyne/react` — never re-implement them.");
  lines.push("5. Spacing uses `--space-*` tokens only.");
  lines.push("6. Border radius uses `--radius-*` tokens only.");
  lines.push("7. Base font size: 13px, line-height 1.6.");
  lines.push("");

  // Tokens section — grouped by first segment
  lines.push("## Tokens");
  lines.push("");

  const groups = new Map<string, [string, string][]>();
  for (const [name, value] of Object.entries(tokens)) {
    const group = name.split("-")[0];
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push([name, value]);
  }

  for (const [group, entries] of groups) {
    lines.push(`### ${group}`);
    lines.push("");
    for (const [name, value] of entries) {
      lines.push(`- \`--${name}\`: ${value}`);
    }
    lines.push("");
  }

  // Components section
  lines.push("## Components");
  lines.push("");
  lines.push("All components are exported from `@dfyne/react`.");
  lines.push("");
  for (const comp of components) {
    lines.push(`- **${comp.name}** — \`import { ${comp.name} } from '@dfyne/react'\``);
  }
  lines.push("");

  return lines.join("\n");
}
