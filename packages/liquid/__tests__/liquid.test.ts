import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const pkgDir = resolve(import.meta.dirname, "..");
const snippetsDir = resolve(pkgDir, "snippets");
const sectionsDir = resolve(pkgDir, "sections");
const assetsDir = resolve(pkgDir, "assets");

const expectedSnippets = [
  "dfyne-badge.liquid",
  "dfyne-product-card.liquid",
  "dfyne-category-card.liquid",
  "dfyne-color-swatch.liquid",
  "dfyne-size-button.liquid",
  "dfyne-cross-sell-card.liquid",
  "dfyne-product-rail.liquid",
  "dfyne-icon.liquid",
  "dfyne-arrow-button.liquid",
];

const expectedSections = [
  "dfyne-announcement-bar.liquid",
  "dfyne-campaign-hero.liquid",
  "dfyne-newsletter.liquid",
  "dfyne-footer.liquid",
];

describe("@dfyne/liquid package", () => {
  describe("snippets", () => {
    it.each(expectedSnippets)("includes %s", (file) => {
      expect(existsSync(resolve(snippetsDir, file))).toBe(true);
    });

    it("all snippet files contain Liquid comment blocks", () => {
      for (const file of expectedSnippets) {
        const content = readFileSync(resolve(snippetsDir, file), "utf-8");
        expect(content, `${file} should have a comment block`).toContain("{%- comment -%}");
      }
    });
  });

  describe("sections", () => {
    it.each(expectedSections)("includes %s", (file) => {
      expect(existsSync(resolve(sectionsDir, file))).toBe(true);
    });

    it("all section files contain {% schema %} blocks", () => {
      for (const file of expectedSections) {
        const content = readFileSync(resolve(sectionsDir, file), "utf-8");
        expect(content, `${file} should have a schema block`).toContain("{% schema %}");
        expect(content, `${file} should have an endschema block`).toContain("{% endschema %}");
      }
    });

    it("all section schemas are valid JSON", () => {
      for (const file of expectedSections) {
        const content = readFileSync(resolve(sectionsDir, file), "utf-8");
        const schemaMatch = content.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
        expect(schemaMatch, `${file} should have a parseable schema`).not.toBeNull();
        expect(() => JSON.parse(schemaMatch![1])).not.toThrow();
      }
    });
  });

  describe("assets", () => {
    it("dfyne-design-system.css exists and contains tokens", () => {
      const css = readFileSync(resolve(assetsDir, "dfyne-design-system.css"), "utf-8");
      expect(css).toContain("--color-bg-primary");
      expect(css).toContain(".dfyne-product-card");
      expect(css).toContain(".dfyne-button");
    });

    it("dfyne-design-system.js exists and contains event delegation", () => {
      const js = readFileSync(resolve(assetsDir, "dfyne-design-system.js"), "utf-8");
      expect(js).toContain("data-dfyne-carousel");
      expect(js).toContain("data-dfyne-accordion");
      expect(js).toContain("data-dfyne-size-selector");
    });
  });

  describe("file counts", () => {
    it("has 9 snippets", () => {
      const files = readdirSync(snippetsDir).filter((f) => f.endsWith(".liquid"));
      expect(files.length).toBe(9);
    });

    it("has 4 sections", () => {
      const files = readdirSync(sectionsDir).filter((f) => f.endsWith(".liquid"));
      expect(files.length).toBe(4);
    });
  });
});
