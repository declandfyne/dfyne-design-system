import { defineType, defineField } from "sanity";

export const siteContent = defineType({
  name: "siteContent",
  title: "Site Content",
  type: "document",
  fields: [
    defineField({
      name: "announcements",
      title: "Announcement Bar Slides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "text", title: "Text", type: "string" }),
            defineField({ name: "detail", title: "Detail", type: "string" }),
            defineField({ name: "link", title: "Link", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "hero",
      title: "Campaign Hero",
      type: "object",
      fields: [
        defineField({ name: "caption", title: "Caption", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "secondaryCtaLabel", title: "Secondary CTA Label", type: "string" }),
      ],
    }),
    defineField({
      name: "newsletter",
      title: "Newsletter Signup",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "subtext", title: "Subtext", type: "string" }),
        defineField({ name: "placeholder", title: "Placeholder", type: "string" }),
        defineField({ name: "buttonText", title: "Button Text", type: "string" }),
      ],
    }),
    defineField({
      name: "uiLabels",
      title: "UI Labels",
      type: "object",
      fields: [
        defineField({ name: "addToCart", title: "Add to Cart", type: "string" }),
        defineField({ name: "subscribe", title: "Subscribe", type: "string" }),
        defineField({ name: "search", title: "Search", type: "string" }),
        defineField({ name: "viewAll", title: "View All", type: "string" }),
        defineField({ name: "shopNow", title: "Shop Now", type: "string" }),
        defineField({ name: "soldOut", title: "Sold Out", type: "string" }),
        defineField({ name: "sale", title: "Sale", type: "string" }),
        defineField({ name: "newArrival", title: "New Arrival", type: "string" }),
        defineField({ name: "quickAdd", title: "Quick Add", type: "string" }),
        defineField({ name: "selectSize", title: "Select Size", type: "string" }),
      ],
    }),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "object",
      fields: [
        defineField({
          name: "utilityLinks",
          title: "Utility Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "href", title: "URL", type: "string" }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({
          name: "links",
          title: "Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "href", title: "URL", type: "string" }),
              ],
            },
          ],
        }),
        defineField({ name: "copyrightText", title: "Copyright Text", type: "string" }),
      ],
    }),
  ],
});
