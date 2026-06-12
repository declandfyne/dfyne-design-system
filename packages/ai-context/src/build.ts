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

// --- 5. Summary ---
console.log(`AI context build complete:`);
console.log(`  Tokens:     ${Object.keys(tokens).length}`);
console.log(`  Components: ${components.length}`);
console.log(`  Prompt:     ${prompt.length} chars -> ${promptPath}`);
console.log(`  JSON:       ${json.length} chars -> ${jsonPath}`);
