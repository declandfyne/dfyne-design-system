export type GlossaryEntry = {
  cssVar: string;
  figmaPath: string;
  jsName: string;
  plainName: string;
  value: string;
  category: string;
};

const numberWords: Record<string, string> = {
  "1": "One",
  "2": "Two",
  "3": "Three",
  "4": "Four",
  "5": "Five",
  "6": "Six",
  "7": "Seven",
  "8": "Eight",
  "9": "Nine",
  "10": "Ten",
  "11": "Eleven",
  "12": "Twelve",
  "13": "Thirteen",
  "14": "Fourteen",
  "15": "Fifteen",
  "16": "Sixteen",
  "2xs": "TwoXs",
  "2xl": "TwoXl",
  "3xl": "ThreeXl",
  "4xl": "FourXl",
};

const categoryMap: Record<string, string> = {
  color: "Colors",
  font: "Typography",
  text: "Typography",
  weight: "Typography",
  leading: "Typography",
  tracking: "Typography",
  space: "Spacing",
  grid: "Spacing",
  drawer: "Spacing",
  page: "Spacing",
  container: "Spacing",
  radius: "Border Radius",
  shadow: "Shadows",
  bp: "Breakpoints",
  z: "Z-Index",
  duration: "Animation",
  ease: "Animation",
};

function kebabToCamel(str: string): string {
  const parts = str.split("-");
  return parts
    .map((part, i) => {
      const mapped = numberWords[part];
      if (mapped !== undefined) {
        // Number words keep their casing, but lowercase the first char if first part
        if (i === 0) return mapped.charAt(0).toLowerCase() + mapped.slice(1);
        return mapped;
      }
      if (i === 0) return part.toLowerCase();
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join("");
}

export function generateGlossary(css: string): GlossaryEntry[] {
  const entries: GlossaryEntry[] = [];
  const regex = /--([a-z0-9-]+):\s*(.+?);/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(css)) !== null) {
    const [, name, rawValue] = match;
    const value = rawValue.trim();
    const segments = name.split("-");
    const firstSegment = segments[0];

    entries.push({
      cssVar: `--${name}`,
      figmaPath: segments.join("/"),
      jsName: kebabToCamel(name),
      plainName: segments.join(" "),
      value,
      category: categoryMap[firstSegment] ?? firstSegment,
    });
  }

  return entries;
}
