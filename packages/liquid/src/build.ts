import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = resolve(__dirname, "..", "assets");
const tokensPath = resolve(__dirname, "..", "..", "tokens", "src", "tokens.css");
const componentCssPath = resolve(__dirname, "components.css");

mkdirSync(assetsDir, { recursive: true });

const tokensCss = readFileSync(tokensPath, "utf-8");
const componentCss = readFileSync(componentCssPath, "utf-8");

const output = `/* DFYNE Design System — Generated CSS */\n/* Auto-generated from @dfyne/tokens + component styles */\n\n${tokensCss}\n\n${componentCss}\n`;

writeFileSync(resolve(assetsDir, "dfyne-design-system.css"), output);
console.log("Built dfyne-design-system.css");
