import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { generateGlossary, type GlossaryEntry } from "../data/tokenGlossary";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensCssPath = resolve(
  __dirname,
  "../../../../packages/tokens/src/tokens.css"
);

describe("generateGlossary", () => {
  it("converts --color-text-primary to all four name formats", () => {
    const css = `:root { --color-text-primary: #0a0a0a; }`;
    const entries = generateGlossary(css);
    expect(entries).toHaveLength(1);

    const entry = entries[0];
    expect(entry.cssVar).toBe("--color-text-primary");
    expect(entry.figmaPath).toBe("color/text/primary");
    expect(entry.jsName).toBe("colorTextPrimary");
    expect(entry.plainName).toBe("color text primary");
    expect(entry.value).toBe("#0a0a0a");
    expect(entry.category).toBe("Colors");
  });

  it("handles spacing tokens with numbers (--space-4 → spaceFour)", () => {
    const css = `:root { --space-4: 8px; }`;
    const entries = generateGlossary(css);
    expect(entries).toHaveLength(1);

    const entry = entries[0];
    expect(entry.cssVar).toBe("--space-4");
    expect(entry.figmaPath).toBe("space/4");
    expect(entry.jsName).toBe("spaceFour");
    expect(entry.plainName).toBe("space 4");
    expect(entry.value).toBe("8px");
    expect(entry.category).toBe("Spacing");
  });

  it("handles radius tokens (--radius-button)", () => {
    const css = `:root { --radius-button: 50px; }`;
    const entries = generateGlossary(css);
    expect(entries).toHaveLength(1);

    const entry = entries[0];
    expect(entry.cssVar).toBe("--radius-button");
    expect(entry.figmaPath).toBe("radius/button");
    expect(entry.jsName).toBe("radiusButton");
    expect(entry.plainName).toBe("radius button");
    expect(entry.value).toBe("50px");
    expect(entry.category).toBe("Border Radius");
  });

  it("parses all 178 tokens from actual tokens.css", () => {
    const css = readFileSync(tokensCssPath, "utf-8");
    const entries = generateGlossary(css);

    // Verify count
    expect(entries.length).toBeGreaterThanOrEqual(170);

    // Verify every entry has all required fields populated
    for (const entry of entries) {
      expect(entry.cssVar).toMatch(/^--[a-z]/);
      expect(entry.figmaPath).toBeTruthy();
      expect(entry.jsName).toMatch(/^[a-z]/);
      expect(entry.plainName).toBeTruthy();
      expect(entry.value).toBeTruthy();
      expect(entry.category).toBeTruthy();
    }

    // Spot-check a few known tokens
    const textPrimary = entries.find(
      (e) => e.cssVar === "--color-text-primary"
    );
    expect(textPrimary).toBeDefined();
    expect(textPrimary!.jsName).toBe("colorTextPrimary");
    expect(textPrimary!.category).toBe("Colors");

    const space16 = entries.find((e) => e.cssVar === "--space-16");
    expect(space16).toBeDefined();
    expect(space16!.jsName).toBe("spaceSixteen");

    const text4xl = entries.find((e) => e.cssVar === "--text-4xl");
    expect(text4xl).toBeDefined();
    expect(text4xl!.jsName).toBe("textFourXl");

    const durationFast = entries.find((e) => e.cssVar === "--duration-fast");
    expect(durationFast).toBeDefined();
    expect(durationFast!.category).toBe("Animation");
  });
});
