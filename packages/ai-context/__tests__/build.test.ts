import { describe, test, expect, beforeAll } from "vitest";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const pkgDir = path.resolve(__dirname, "..");
const distDir = path.join(pkgDir, "dist");
const promptPath = path.join(distDir, "dfyne-system-prompt.md");
const jsonPath = path.join(distDir, "dfyne-context.json");

beforeAll(() => {
  execSync("pnpm run build", { cwd: pkgDir, stdio: "pipe" });
});

describe("ai-context build", () => {
  test("dfyne-system-prompt.md exists and contains key strings", () => {
    expect(fs.existsSync(promptPath)).toBe(true);
    const content = fs.readFileSync(promptPath, "utf-8");
    expect(content).toContain("DFYNE");
    expect(content).toContain("--color-text-primary");
    expect(content).toContain("Raleway");
    expect(content).toContain("Button");
    expect(content).toContain("ProductCard");
  });

  test("dfyne-context.json exists, parses, and has required fields", () => {
    expect(fs.existsSync(jsonPath)).toBe(true);
    const raw = fs.readFileSync(jsonPath, "utf-8");
    const data = JSON.parse(raw);

    expect(data).toHaveProperty("brand");
    expect(data).toHaveProperty("tokens");
    expect(data).toHaveProperty("components");
    expect(data).toHaveProperty("rules");
    expect(Object.keys(data.tokens).length).toBeGreaterThanOrEqual(170);
    expect(data.components.length).toBeGreaterThanOrEqual(17);
  });

  test("system prompt includes usage rules", () => {
    const content = fs.readFileSync(promptPath, "utf-8");
    expect(content).toContain("uppercase");
    expect(content).toContain("2.7px");
    expect(content).toContain("GBP");
    expect(content).toContain("@dfyne/react");
  });

  test("system prompt is under 15000 characters", () => {
    const content = fs.readFileSync(promptPath, "utf-8");
    expect(content.length).toBeLessThan(15000);
  });
});
