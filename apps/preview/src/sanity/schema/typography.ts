import { defineType, defineField } from "sanity";

export const typographySettings = defineType({
  name: "typographySettings",
  title: "Typography Settings",
  type: "document",
  fields: [
    defineField({
      name: "baseRatio",
      title: "Base Line-Height Ratio",
      description: "The base multiplier for all line-height calculations (1.2–2.0)",
      type: "number",
      initialValue: 1.5,
      validation: (rule) => rule.min(1.2).max(2.0),
    }),
    defineField({
      name: "multipliers",
      title: "Category Multipliers",
      type: "object",
      fields: [
        defineField({
          name: "body",
          title: "Body / Paragraphs",
          description: "Multiplier for body text, descriptions, footer links",
          type: "number",
          initialValue: 1.0,
          validation: (rule) => rule.min(0.5).max(2.0),
        }),
        defineField({
          name: "heading",
          title: "Headings / Titles",
          description: "Multiplier for hero headings, section titles, card titles",
          type: "number",
          initialValue: 0.82,
          validation: (rule) => rule.min(0.5).max(2.0),
        }),
        defineField({
          name: "ui",
          title: "UI Elements / Buttons",
          description: "Multiplier for buttons, badges, nav, announcements, form labels",
          type: "number",
          initialValue: 0.75,
          validation: (rule) => rule.min(0.5).max(2.0),
        }),
      ],
    }),
  ],
});
