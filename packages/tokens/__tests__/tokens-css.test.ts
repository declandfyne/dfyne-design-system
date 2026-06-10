import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const css = readFileSync(
  resolve(import.meta.dirname, "..", "src", "tokens.css"),
  "utf-8"
);

function extractTokenNames(css: string): string[] {
  const names: string[] = [];
  const regex = /--([a-z0-9-]+):/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(css)) !== null) {
    names.push(match[1]);
  }
  return names;
}

const tokenNames = extractTokenNames(css);

describe("tokens.css structure", () => {
  it("defines tokens inside :root", () => {
    expect(css).toContain(":root {");
  });

  it("has no duplicate token names", () => {
    const unique = new Set(tokenNames);
    expect(unique.size).toBe(tokenNames.length);
  });

  it("contains all expected token groups", () => {
    const groups = [
      "color-bg-",
      "color-text-",
      "color-border-",
      "color-overlay-",
      "font-",
      "text-",
      "weight-",
      "tracking-",
      "space-",
      "radius-",
      "shadow-",
      "bp-",
      "z-",
      "duration-",
      "ease-",
    ];

    for (const group of groups) {
      const matching = tokenNames.filter((n) => n.startsWith(group));
      expect(matching.length, `Expected tokens starting with "${group}"`).toBeGreaterThan(0);
    }
  });

  it("has at least 70 tokens", () => {
    expect(tokenNames.length).toBeGreaterThanOrEqual(70);
  });

  it("color tokens use valid hex or rgba values", () => {
    const colorTokens = tokenNames.filter(
      (n) => n.startsWith("color-bg-") || n.startsWith("color-text-") || n.startsWith("color-border-")
    );
    const hexOrRgba = /#[0-9a-fA-F]{6}|rgba?\(/;

    for (const name of colorTokens) {
      const match = css.match(new RegExp(`--${name}:\\s*(.+?);`));
      expect(match, `Token --${name} should have a value`).not.toBeNull();
      expect(match![1]).toMatch(hexOrRgba);
    }
  });
});
