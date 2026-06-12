import { describe, it, expect } from "vitest";
import { usageGuidelines } from "../data/usageGuidelines";
import { componentSpecs } from "../data/componentSpecs";

describe("usageGuidelines", () => {
  it("has a guideline for every documented component", () => {
    const specNames = componentSpecs.map((c) => c.name);
    const guidelineNames = usageGuidelines.map((g) => g.component);

    for (const name of specNames) {
      expect(guidelineNames).toContain(name);
    }

    expect(guidelineNames).toHaveLength(specNames.length);
  });

  it("each guideline has at least one when and one whenNot", () => {
    for (const guideline of usageGuidelines) {
      expect(
        guideline.when.length,
        `${guideline.component} must have at least one "when" item`
      ).toBeGreaterThanOrEqual(1);

      expect(
        guideline.whenNot.length,
        `${guideline.component} must have at least one "whenNot" item`
      ).toBeGreaterThanOrEqual(1);
    }
  });

  it("each guideline has at least one do and one dont example", () => {
    for (const guideline of usageGuidelines) {
      expect(
        guideline.doExamples.length,
        `${guideline.component} must have at least one do example`
      ).toBeGreaterThanOrEqual(1);

      expect(
        guideline.dontExamples.length,
        `${guideline.component} must have at least one dont example`
      ).toBeGreaterThanOrEqual(1);

      for (const example of guideline.doExamples) {
        expect(example.label, `do example label must be non-empty`).toBeTruthy();
        expect(example.reason, `do example reason must be non-empty`).toBeTruthy();
      }

      for (const example of guideline.dontExamples) {
        expect(example.label, `dont example label must be non-empty`).toBeTruthy();
        expect(example.reason, `dont example reason must be non-empty`).toBeTruthy();
      }
    }
  });
});
