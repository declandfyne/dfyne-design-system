import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schema";
import { projectId, dataset } from "./src/sanity/client";

export default defineConfig({
  name: "dfyne-design-system",
  title: "DFYNE Design System",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
