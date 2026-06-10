import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = __dirname;
const distDir = resolve(__dirname, "..", "dist");
const cssPath = resolve(srcDir, "tokens.css");

const numberWords: Record<string, string> = {
  "1": "One", "2": "Two", "3": "Three", "4": "Four", "5": "Five",
  "6": "Six", "7": "Seven", "8": "Eight", "9": "Nine", "10": "Ten",
  "11": "Eleven", "12": "Twelve", "13": "Thirteen", "14": "Fourteen",
  "2xs": "TwoXs", "2xl": "TwoXl", "3xl": "ThreeXl",
};

function kebabToCamel(str: string): string {
  const parts = str.split("-");
  return parts
    .map((part, i) => {
      const word = numberWords[part] ?? part;
      if (i === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

function parseTokensFromCss(css: string): Record<string, string> {
  const tokens: Record<string, string> = {};
  const regex = /--([a-z0-9-]+):\s*(.+?);/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(css)) !== null) {
    const [, name, value] = match;
    tokens[name] = value.trim();
  }

  return tokens;
}

function generateJson(tokens: Record<string, string>): string {
  return JSON.stringify(tokens, null, 2) + "\n";
}

function generateJs(tokens: Record<string, string>): string {
  const lines = Object.entries(tokens).map(([name, value]) => {
    const camel = kebabToCamel(name);
    return `export const ${camel} = ${JSON.stringify(value)};`;
  });
  return lines.join("\n") + "\n";
}

function generateDts(tokens: Record<string, string>): string {
  const lines = Object.entries(tokens).map(([name]) => {
    const camel = kebabToCamel(name);
    return `export declare const ${camel}: string;`;
  });
  return lines.join("\n") + "\n";
}

mkdirSync(distDir, { recursive: true });

const css = readFileSync(cssPath, "utf-8");
const tokens = parseTokensFromCss(css);

copyFileSync(cssPath, resolve(distDir, "tokens.css"));
writeFileSync(resolve(distDir, "tokens.json"), generateJson(tokens));
writeFileSync(resolve(distDir, "tokens.js"), generateJs(tokens));
writeFileSync(resolve(distDir, "tokens.d.ts"), generateDts(tokens));

console.log(`Built ${Object.keys(tokens).length} tokens to dist/`);
