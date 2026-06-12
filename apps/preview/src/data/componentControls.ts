export type PropControl =
  | { type: "enum"; options: string[]; default: string }
  | { type: "boolean"; default: boolean }
  | { type: "string"; default: string }
  | { type: "number"; default: number };

export type ComponentControlDef = {
  component: string;
  props: Record<string, PropControl>;
};

export const componentControls: ComponentControlDef[] = [
  {
    component: "Button",
    props: {
      variant: { type: "enum", options: ["primary", "secondary", "tertiary", "ghost"], default: "primary" },
      disabled: { type: "boolean", default: false },
      children: { type: "string", default: "ADD TO CART" },
    },
  },
  {
    component: "Badge",
    props: {
      text: { type: "string", default: "NEW" },
      variant: { type: "enum", options: ["custom", "sold-out", "bottom"], default: "custom" },
      position: { type: "enum", options: ["inline", "top-right", "bottom-left"], default: "inline" },
    },
  },
  {
    component: "Size Button",
    props: {
      label: { type: "string", default: "M" },
      selected: { type: "boolean", default: false },
      soldOut: { type: "boolean", default: false },
    },
  },
  {
    component: "Arrow Button",
    props: {
      direction: { type: "enum", options: ["left", "right"], default: "right" },
      variant: { type: "enum", options: ["default", "edge"], default: "default" },
      disabled: { type: "boolean", default: false },
    },
  },
  {
    component: "Section Heading",
    props: {
      eyebrow: { type: "string", default: "JUST LANDED" },
      title: { type: "string", default: "NEW IN WOMEN" },
    },
  },
  {
    component: "Product Card",
    props: {
      name: { type: "string", default: "Impact Longsleeve Top" },
      color: { type: "string", default: "Pebble Grey" },
      price: { type: "number", default: 52.2 },
      badge: { type: "string", default: "NEW" },
    },
  },
  {
    component: "Category Card",
    props: {
      title: { type: "string", default: "IMPACT" },
      caption: { type: "string", default: "High Support" },
    },
  },
  {
    component: "Color Swatch",
    props: {
      label: { type: "string", default: "Midnight Black" },
      selected: { type: "boolean", default: true },
      isNew: { type: "boolean", default: false },
    },
  },
  {
    component: "Cross-Sell Card",
    props: {
      name: { type: "string", default: 'Impact Shorts | 4.5"' },
      color: { type: "string", default: "Midnight Black" },
      price: { type: "number", default: 49 },
    },
  },
  {
    component: "Campaign Hero",
    props: {
      caption: { type: "string", default: "NEW STYLES, NEW STRENGTH" },
      heading: { type: "string", default: "IMPACT" },
    },
  },
  {
    component: "Announcement Bar",
    props: {
      interval: { type: "number", default: 4000 },
    },
  },
  {
    component: "Newsletter Signup",
    props: {},
  },
  {
    component: "Footer",
    props: {},
  },
  {
    component: "Icon",
    props: {
      name: { type: "enum", options: ["check", "star", "menu", "user", "search", "cart", "arrow-left", "arrow-right", "chevron-right", "chevron-down", "close", "pause", "play", "support", "mail", "package", "reward", "calendar", "instagram"], default: "cart" },
    },
  },
];

export function getControls(componentName: string): ComponentControlDef | undefined {
  return componentControls.find((c) => c.component === componentName);
}
