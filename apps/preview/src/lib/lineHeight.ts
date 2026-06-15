export type TypographyInput = {
  baseRatio: number;
  multipliers: {
    body: number;
    heading: number;
    ui: number;
  };
};

export type LineHeightTokens = {
  "--lh-body": number;
  "--lh-body-tight": number;
  "--lh-body-loose": number;
  "--lh-heading": number;
  "--lh-heading-tight": number;
  "--lh-heading-loose": number;
  "--lh-ui": number;
  "--lh-ui-tight": number;
  "--lh-ui-loose": number;
};

const TIGHT = 0.85;
const LOOSE = 1.15;

export function computeLineHeights(input: TypographyInput): LineHeightTokens {
  const { baseRatio, multipliers } = input;

  const body = baseRatio * multipliers.body;
  const heading = baseRatio * multipliers.heading;
  const ui = baseRatio * multipliers.ui;

  return {
    "--lh-body": body,
    "--lh-body-tight": body * TIGHT,
    "--lh-body-loose": body * LOOSE,
    "--lh-heading": heading,
    "--lh-heading-tight": heading * TIGHT,
    "--lh-heading-loose": heading * LOOSE,
    "--lh-ui": ui,
    "--lh-ui-tight": ui * TIGHT,
    "--lh-ui-loose": ui * LOOSE,
  };
}
