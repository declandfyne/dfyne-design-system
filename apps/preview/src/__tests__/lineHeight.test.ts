import { describe, it, expect } from "vitest";
import { computeLineHeights, type LineHeightTokens, type TypographyInput } from "../lib/lineHeight";

describe("computeLineHeights", () => {
  it("computes all 9 tokens from default inputs", () => {
    const input: TypographyInput = {
      baseRatio: 1.5,
      multipliers: { body: 1.0, heading: 0.82, ui: 0.75 },
    };
    const result = computeLineHeights(input);

    expect(result["--lh-body"]).toBeCloseTo(1.5, 3);
    expect(result["--lh-body-tight"]).toBeCloseTo(1.275, 3);
    expect(result["--lh-body-loose"]).toBeCloseTo(1.725, 3);
    expect(result["--lh-heading"]).toBeCloseTo(1.23, 3);
    expect(result["--lh-heading-tight"]).toBeCloseTo(1.0455, 3);
    expect(result["--lh-heading-loose"]).toBeCloseTo(1.4145, 3);
    expect(result["--lh-ui"]).toBeCloseTo(1.125, 3);
    expect(result["--lh-ui-tight"]).toBeCloseTo(0.95625, 3);
    expect(result["--lh-ui-loose"]).toBeCloseTo(1.29375, 3);
  });

  it("returns exactly 9 keys", () => {
    const input: TypographyInput = {
      baseRatio: 1.5,
      multipliers: { body: 1.0, heading: 0.82, ui: 0.75 },
    };
    const result = computeLineHeights(input);
    expect(Object.keys(result)).toHaveLength(9);
  });

  it("scales proportionally when baseRatio changes", () => {
    const input: TypographyInput = {
      baseRatio: 2.0,
      multipliers: { body: 1.0, heading: 0.82, ui: 0.75 },
    };
    const result = computeLineHeights(input);

    expect(result["--lh-body"]).toBeCloseTo(2.0, 3);
    expect(result["--lh-heading"]).toBeCloseTo(1.64, 3);
    expect(result["--lh-ui"]).toBeCloseTo(1.5, 3);
  });

  it("respects custom multipliers", () => {
    const input: TypographyInput = {
      baseRatio: 1.5,
      multipliers: { body: 0.9, heading: 0.7, ui: 0.6 },
    };
    const result = computeLineHeights(input);

    expect(result["--lh-body"]).toBeCloseTo(1.35, 3);
    expect(result["--lh-heading"]).toBeCloseTo(1.05, 3);
    expect(result["--lh-ui"]).toBeCloseTo(0.9, 3);
  });

  it("generates a valid CSS string from tokens", () => {
    const input: TypographyInput = {
      baseRatio: 1.5,
      multipliers: { body: 1.0, heading: 0.82, ui: 0.75 },
    };
    const result = computeLineHeights(input);

    for (const [key, value] of Object.entries(result)) {
      expect(key).toMatch(/^--lh-/);
      expect(value).toBeGreaterThan(0);
    }
  });
});
