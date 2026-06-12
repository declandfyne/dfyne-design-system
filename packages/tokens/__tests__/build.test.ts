import { describe, it, expect, beforeAll } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve(import.meta.dirname, "..", "dist");

describe("build output", () => {
  beforeAll(async () => {
    const { execSync } = await import("node:child_process");
    execSync("pnpm run build", {
      cwd: resolve(import.meta.dirname, ".."),
      stdio: "pipe",
    });
  });

  it("produces dist/tokens.css", () => {
    expect(existsSync(resolve(distDir, "tokens.css"))).toBe(true);
  });

  it("produces dist/tokens.json", () => {
    expect(existsSync(resolve(distDir, "tokens.json"))).toBe(true);
  });

  it("produces dist/tokens.js", () => {
    expect(existsSync(resolve(distDir, "tokens.js"))).toBe(true);
  });

  it("produces dist/tokens.d.ts", () => {
    expect(existsSync(resolve(distDir, "tokens.d.ts"))).toBe(true);
  });

  it("tokens.json contains all color-bg tokens", () => {
    const json = JSON.parse(readFileSync(resolve(distDir, "tokens.json"), "utf-8"));
    expect(json["color-bg-primary"]).toBe("#ffffff");
    expect(json["color-bg-inverse"]).toBe("#0a0a0a");
  });

  it("tokens.json contains spacing tokens", () => {
    const json = JSON.parse(readFileSync(resolve(distDir, "tokens.json"), "utf-8"));
    expect(json["space-1"]).toBe("2px");
    expect(json["space-14"]).toBe("30px");
    expect(json["space-15"]).toBe("40px");
    expect(json["space-16"]).toBe("75px");
  });

  it("tokens.json contains shadow tokens", () => {
    const json = JSON.parse(readFileSync(resolve(distDir, "tokens.json"), "utf-8"));
    expect(json["shadow-xs"]).toBe("0 1px 0 rgba(0, 0, 0, 0.06)");
  });

  it("tokens.js exports camelCase constants", () => {
    const js = readFileSync(resolve(distDir, "tokens.js"), "utf-8");
    expect(js).toContain("colorBgPrimary");
    expect(js).toContain("spaceEight");
    expect(js).toContain("shadowXs");
  });

  it("tokens.d.ts exports type declarations", () => {
    const dts = readFileSync(resolve(distDir, "tokens.d.ts"), "utf-8");
    expect(dts).toContain("export declare const colorBgPrimary: string");
  });

  it("dist/tokens.css is a copy of src/tokens.css", () => {
    const src = readFileSync(resolve(distDir, "..", "src", "tokens.css"), "utf-8");
    const dist = readFileSync(resolve(distDir, "tokens.css"), "utf-8");
    expect(dist).toBe(src);
  });
});
