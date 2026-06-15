import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schema";
import { projectId, dataset, isSanityConfigured } from "./src/sanity/client";

const config = isSanityConfigured
  ? defineConfig({
      name: "dfyne-design-system",
      title: "DFYNE Design System",
      projectId,
      dataset,
      plugins: [structureTool()],
      schema: { types: schemaTypes },
    })
  : defineConfig({
      name: "dfyne-design-system",
      title: "DFYNE Design System",
      projectId: "placeholder",
      dataset: "production",
      plugins: [structureTool()],
      schema: { types: schemaTypes },
    });

export default config;
