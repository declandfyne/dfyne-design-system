import type { IconName } from "@dfyne/react";
import { generateGlossary } from "./tokenGlossary";
// @ts-expect-error -- raw query handled by webpack asset/source rule
import tokensCssRaw from "../../../../packages/tokens/src/tokens.css?raw";
export type { IconName };
export type { GlossaryEntry } from "./tokenGlossary";

export type ColorStep = {
  step: number;
  label: string;
  value: string;
  hex: string;
  textDark: boolean;
};

/** Black scale — ordered light → dark for Radix-style grid */
export const blackScale: ColorStep[] = [
  { step: 1, label: "Black 3%",  value: "rgba(0,0,0,0.03)",  hex: "–",        textDark: true  },
  { step: 2, label: "Black 8%",  value: "rgba(0,0,0,0.08)",  hex: "–",        textDark: true  },
  { step: 3, label: "Black 15%", value: "rgba(0,0,0,0.15)",  hex: "–",        textDark: true  },
  { step: 4, label: "Black 20%", value: "rgba(0,0,0,0.2)",   hex: "–",        textDark: true  },
  { step: 5, label: "Black 40%", value: "rgba(0,0,0,0.4)",   hex: "–",        textDark: false },
  { step: 6, label: "Black",     value: "#000000",            hex: "#000000",  textDark: false },
];

/** White scale */
export const whiteScale: ColorStep[] = [
  { step: 1, label: "White",    value: "#FFFFFF",   hex: "#FFFFFF",  textDark: true },
  { step: 2, label: "Concrete", value: "#F2F2F2",   hex: "#F2F2F2",  textDark: true },
];

/** Gray scale */
export const grayScale: ColorStep[] = [
  { step: 1, label: "Boulder",  value: "#757575",   hex: "#757575",  textDark: false },
];

/** Text colors */
export const textScale: ColorStep[] = [
  { step: 1, label: "#000000",  value: "#000000",   hex: "#000000",  textDark: false },
  { step: 2, label: "#0a0a0a",  value: "#0a0a0a",   hex: "#0a0a0a",  textDark: false },
  { step: 3, label: "#1c1d1d",  value: "#1c1d1d",   hex: "#1c1d1d",  textDark: false },
  { step: 4, label: "#555555",  value: "#555555",   hex: "#555555",  textDark: false },
  { step: 5, label: "#757575",  value: "#757575",   hex: "#757575",  textDark: false },
  { step: 6, label: "#888888",  value: "#888888",   hex: "#888888",  textDark: false },
  { step: 7, label: "#bbbbbb",  value: "#bbbbbb",   hex: "#bbbbbb",  textDark: true  },
];

export const colorGridColumns = [
  "App background",
  "Subtle background",
  "UI element",
  "Hovered",
  "Borders",
  "Solid",
  "Text",
];

/**
 * Figma text styles
 */
export const figmaTextStyles = [
  {
    name: "Button",
    size: "9px",
    weight: 600,
    lineHeight: "12.78px",
    tracking: "2.7px",
    sample: "ADD TO CART",
  },
  {
    name: "Badge",
    size: "11.05px",
    weight: 600,
    lineHeight: "1",
    tracking: "0.325px",
    sample: "NEW",
  },
  {
    name: "Announcement",
    size: "10px",
    weight: 400,
    lineHeight: "20px",
    tracking: "2.6px",
    sample: "EXPRESS SHIPPING IS OUR STANDARD",
  },
  {
    name: "Nav link",
    size: "13px",
    weight: 400,
    lineHeight: "20.8px",
    tracking: "2.6px",
    sample: "WOMENS",
  },
  {
    name: "Section eyebrow",
    size: "10px",
    weight: 600,
    lineHeight: "15px",
    tracking: "1.2px",
    sample: "JUST LANDED",
  },
  {
    name: "Section heading",
    size: "14px",
    weight: 600,
    lineHeight: "16.5px",
    tracking: "1.5px",
    sample: "NEW IN WOMEN",
  },
  {
    name: "Product title",
    size: "13px",
    weight: 400,
    lineHeight: "19.5px",
    tracking: "0.325px",
    sample: "Impact Longsleeve Top",
  },
  {
    name: "Product vendor",
    size: "11.05px",
    weight: 400,
    lineHeight: "16.575px",
    tracking: "1.105px",
    sample: "Pebble Grey",
  },
  {
    name: "Product price",
    size: "11.05px",
    weight: 400,
    lineHeight: "16.575px",
    tracking: "0.325px",
    sample: "£52.20",
  },
  {
    name: "Footer heading",
    size: "10px",
    weight: 600,
    lineHeight: "15px",
    tracking: "1.5px",
    sample: "DELIVERY & RETURNS",
  },
  {
    name: "Footer link",
    size: "11.05px",
    weight: 400,
    lineHeight: "16.575px",
    tracking: "0px",
    sample: "Shipping",
  },
  {
    name: "Body text",
    size: "13px",
    weight: 400,
    lineHeight: "20.8px",
    tracking: "0.325px",
    sample: "The quick brown fox jumps over the lazy dog",
  },
];

export const typeWeights = [
  { label: "Regular",  value: 400 },
  { label: "SemiBold", value: 600 },
  { label: "Bold",     value: 700 },
];

export const spacingScale = [
  { label: "2px",  value: "2px"  },
  { label: "4px",  value: "4px"  },
  { label: "6px",  value: "6px"  },
  { label: "8px",  value: "8px"  },
  { label: "10px", value: "10px" },
  { label: "12px", value: "12px" },
  { label: "15px", value: "15px" },
  { label: "16px", value: "16px" },
  { label: "17px", value: "17px" },
  { label: "20px", value: "20px" },
  { label: "22px", value: "22px" },
  { label: "24px", value: "24px" },
  { label: "30px", value: "30px" },
  { label: "40px", value: "40px" },
  { label: "75px", value: "75px" },
];

export const radiusScale = [
  { label: "0px",          value: "0px",   note: "Square"               },
  { label: "2px",          value: "2px",   note: "Badge, swatch"        },
  { label: "3px",          value: "3px",   note: "Round-slight style"   },
  { label: "4px",          value: "4px",   note: "Product tile"         },
  { label: "6px",          value: "6px",   note: "Medium rounding"      },
  { label: "8px",          value: "8px",   note: "Card rounding"        },
  { label: "10px",         value: "10px",  note: "Panels"               },
  { label: "16px",         value: "16px",  note: "Large panels"         },
  { label: "18px",         value: "18px",  note: "Rounded containers"   },
  { label: "50px",         value: "50px",  note: "Pill button (live)"   },
  { label: "89px",         value: "89px",  note: "Near-circle button"   },
  { label: "Full / 999px", value: "999px", note: "Search pill, toggle"  },
];

export const shadowScale = [
  {
    label: "Header border",
    value: "0 1px 0 rgba(0,0,0,0.06)",
    note: "Divider below sticky header",
  },
  {
    label: "Card",
    value: "0 10px 20px rgba(0,0,0,0.09)",
    note: "Product cards, modals",
  },
  {
    label: "Drawer (bottom)",
    value: "0 -20px 40px rgba(0,0,0,0.12)",
    note: "Bottom sheets",
  },
  {
    label: "Drawer (side)",
    value: "-20px 0 40px rgba(0,0,0,0.12)",
    note: "Cart drawer",
  },
  {
    label: "Focus ring",
    value: "inset 0 0 0 2px #000000",
    note: "Focus states",
  },
  {
    label: "Input",
    value: "inset 0 1px 1px #f0f0f0, 0 3px 6px -5px #bbb",
    note: "Form inputs",
  },
];

/** Image aspect ratios from theme.css.liquid */
export const aspectRatios = [
  { label: "Wide",           ratio: "16:9",    css: "padding-bottom: 56.25%",    usage: "Hero video, slideshow" },
  { label: "Landscape",      ratio: "4:3",     css: "padding-bottom: 75%",       usage: "Landscape product shots" },
  { label: "Square",         ratio: "1:1",     css: "padding-bottom: 100%",      usage: "Square product images" },
  { label: "Portrait",       ratio: "4:5",     css: "padding-bottom: 125%",      usage: "Product grid (default)" },
  { label: "Portrait alt",   ratio: "3:4",     css: "aspect-ratio: 3/4",         usage: "Collection grid images" },
  { label: "Card",           ratio: "178:224", css: "aspect-ratio: 178/224",     usage: "Product/cross-sell cards" },
  { label: "Card (mobile)",  ratio: "157:197", css: "aspect-ratio: 157/197",     usage: "Product/cross-sell cards on mobile" },
  { label: "Category",       ratio: "200:266", css: "aspect-ratio: 200/266",     usage: "Category cards" },
  { label: "Tall portrait",  ratio: "10:13",   css: "aspect-ratio: 10/13",       usage: "Featured collection images" },
];

/** Component typography specs from live computed styles */
export const componentTypography = [
  { component: "Body text",         size: "13px",    weight: 400, tracking: "0.325px",  transform: "none",      family: "Raleway" },
  { component: "Button (primary)",  size: "9px",     weight: 600, tracking: "2.7px",    transform: "uppercase", family: "Raleway" },
  { component: "Button (tertiary)", size: "9px",     weight: 400, tracking: "normal",   transform: "none",      family: "Raleway" },
  { component: "Nav links",         size: "13px",    weight: 400, tracking: "2.6px",    transform: "uppercase", family: "Raleway" },
  { component: "Product title",     size: "13px",    weight: 400, tracking: "0.325px",  transform: "none",      family: "Raleway" },
  { component: "Product vendor",    size: "11.05px", weight: 400, tracking: "1.105px",  transform: "none",      family: "Raleway" },
  { component: "Product price",     size: "11.05px", weight: 400, tracking: "0.325px",  transform: "none",      family: "sans-serif" },
  { component: "Badge",             size: "11.05px", weight: 600, tracking: "0.325px",  transform: "none",      family: "Raleway" },
  { component: "Section eyebrow",   size: "10px",    weight: 600, tracking: "1.2px",    transform: "uppercase", family: "Raleway" },
  { component: "Section heading",   size: "14px",    weight: 600, tracking: "1.5px",    transform: "uppercase", family: "Raleway" },
  { component: "Announcement bar",  size: "10px",    weight: 400, tracking: "2.6px",    transform: "none",      family: "Raleway" },
  { component: "Footer heading",    size: "10px",    weight: 600, tracking: "1.5px",    transform: "uppercase", family: "Raleway" },
  { component: "Footer links",      size: "11.05px", weight: 400, tracking: "0px",      transform: "none",      family: "Raleway" },
  { component: "Size button",       size: "10px",    weight: 400, tracking: "0.325px",  transform: "none",      family: "Raleway" },
  { component: "Hero caption",      size: "10px",    weight: 600, tracking: "1.5px",    transform: "uppercase", family: "Raleway" },
  { component: "Hero heading",      size: "34–84px", weight: 500, tracking: "0.035em",  transform: "uppercase", family: "Raleway" },
  { component: "Bottom label",      size: "11px",    weight: 400, tracking: "0.3px",    transform: "none",      family: "Raleway" },
];

export const iconNames: IconName[] = [
  "check", "star", "menu", "user", "search", "cart",
  "arrow-left", "arrow-right", "chevron-right", "chevron-down",
  "close", "pause", "play", "support", "mail", "package",
  "reward", "calendar", "instagram",
];

/* ------------------------------------------------------------------ */
/*  Token Glossary                                                     */
/* ------------------------------------------------------------------ */

export const glossaryEntries = generateGlossary(tokensCssRaw as string);
