import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generatePrompt } from "./generate-prompt.js";
import { generateJson } from "./generate-json.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- 1. Read and parse tokens.css ---
const tokensCssPath = path.resolve(__dirname, "../../tokens/src/tokens.css");
const tokensCss = fs.readFileSync(tokensCssPath, "utf-8");

const tokens: Record<string, string> = {};
const tokenRe = /--([a-z0-9-]+):\s*(.+?);/g;
let match: RegExpExecArray | null;
while ((match = tokenRe.exec(tokensCss)) !== null) {
  tokens[match[1]] = match[2].trim();
}

// --- 2. Read and parse react/src/index.ts ---
const indexTsPath = path.resolve(__dirname, "../../react/src/index.ts");
const indexTs = fs.readFileSync(indexTsPath, "utf-8");

const components: { name: string; file: string }[] = [];
const exportRe = /export\s*\{\s*(\w+)\s*\}\s*from\s*"(.+?)"/g;
while ((match = exportRe.exec(indexTs)) !== null) {
  const name = match[1];
  const file = match[2];
  // Skip type exports (e.g. IconName)
  if (indexTs.includes(`export type { ${name} }`)) continue;
  components.push({ name, file });
}

// --- 3. Generate outputs ---
const prompt = generatePrompt(tokens, components);
const json = generateJson(tokens, components);

// --- 4. Write to dist/ ---
const distDir = path.resolve(__dirname, "../dist");
fs.mkdirSync(distDir, { recursive: true });

const promptPath = path.join(distDir, "dfyne-system-prompt.md");
const jsonPath = path.join(distDir, "dfyne-context.json");

fs.writeFileSync(promptPath, prompt, "utf-8");
fs.writeFileSync(jsonPath, json, "utf-8");

// --- 5. Generate CLAUDE.md at repo root ---
const repoRoot = path.resolve(__dirname, "../../..");

const componentList = components
  .map((c) => `- **${c.name}** — \`import { ${c.name} } from '@dfyne/react'\``)
  .join("\n");

const claudeMd = `# DFYNE Design System

This monorepo contains the DFYNE design system.

## AI Instructions

When writing UI code for DFYNE:
- Import components from \`@dfyne/react\` — never re-implement
- Use CSS tokens from \`packages/tokens/src/tokens.css\` — never use arbitrary values
- Font: Raleway. Primary: #111111. Background: #ffffff
- Button text: uppercase, weight 600, tracking 2.7px
- Product images: 4:5 aspect ratio
- Currency: GBP via Intl.NumberFormat
- Spacing: use --space-* tokens. Radius: use --radius-* tokens

## Packages
- \`packages/tokens\` — ${Object.keys(tokens).length} CSS design tokens
- \`packages/react\` — React component library (${components.length} components)
- \`packages/liquid\` — Shopify Liquid snippets
- \`packages/ai-context\` — Auto-generated AI context files
- \`apps/preview\` — Design system reference site (Next.js, port 3333)

## Available Components

${componentList}

## Full AI context

See \`packages/ai-context/dist/dfyne-system-prompt.md\` for complete token reference.
`;

const claudeMdPath = path.join(repoRoot, "CLAUDE.md");
fs.writeFileSync(claudeMdPath, claudeMd, "utf-8");

// --- 6. Generate .cursorrules at repo root ---
const cursorRulesPath = path.join(repoRoot, ".cursorrules");
fs.writeFileSync(cursorRulesPath, prompt, "utf-8");

// --- 7. Summary ---
console.log(`AI context build complete:`);
console.log(`  Tokens:     ${Object.keys(tokens).length}`);
console.log(`  Components: ${components.length}`);
console.log(`  Prompt:     ${prompt.length} chars -> ${promptPath}`);
console.log(`  JSON:       ${json.length} chars -> ${jsonPath}`);
console.log(`  CLAUDE.md:  ${claudeMd.length} chars -> ${claudeMdPath}`);
console.log(`  .cursorrules: ${prompt.length} chars -> ${cursorRulesPath}`);
