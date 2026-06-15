import { defineType, defineField } from "sanity";

export const productOverride = defineType({
  name: "productOverride",
  title: "Product Override",
  type: "document",
  fields: [
    defineField({
      name: "shopifyHandle",
      title: "Shopify Handle",
      description: "The Shopify product handle (e.g. 'seamless-legging-black')",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayName",
      title: "Display Name",
      description: "Overrides the Shopify product name",
      type: "string",
    }),
    defineField({
      name: "displayDescription",
      title: "Display Description",
      description: "Overrides the Shopify product description",
      type: "text",
    }),
    defineField({
      name: "customBadgeText",
      title: "Custom Badge Text",
      description: "Custom badge text (e.g. 'NEW', 'LIMITED')",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "shopifyHandle", subtitle: "displayName" },
  },
});
