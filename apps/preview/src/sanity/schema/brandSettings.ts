import { defineType, defineField } from "sanity";

export const brandSettings = defineType({
  name: "brandSettings",
  title: "Brand Settings",
  type: "document",
  fields: [
    defineField({
      name: "primaryColor",
      title: "Primary Color",
      type: "string",
      initialValue: "#111111",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "string",
      initialValue: "#ffffff",
    }),
    defineField({
      name: "fontFamily",
      title: "Font Family",
      type: "string",
      initialValue: "Raleway",
    }),
  ],
});
