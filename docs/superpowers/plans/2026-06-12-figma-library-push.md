# DFYNE Figma Library Push — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Push the full DFYNE design system (17 components, 178 tokens) to a new Figma file as a published component library with Code Connect mappings.

**Architecture:** Figma MCP-driven workflow using `use_figma` for all Figma operations, with `figma-use` and `figma-generate-library` skills loaded for every call. State tracked via `/tmp/dsb-state-dfyne-001.json`. Code Connect files written to `packages/react/src/` alongside each component.

**Tech Stack:** Figma Plugin API (via MCP), `@figma/code-connect`, React, TypeScript

**Key constraint:** DFYNE is a single-theme system (no dark mode). All variable collections use a single "Value" mode with direct values — no primitive/semantic alias chain needed. This simplifies the token architecture significantly.

---

## Phase 0: Discovery & File Creation

### Task 1: Create Figma file and inspect state

**Skills:** `figma:figma-create-new-file`, `figma:figma-use`

- [ ] **Step 1: Create the Figma file**

Call `create_new_file` with:
- `fileName`: "DFYNE Design System"
- `editorType`: "figma"

Record the returned `fileKey` — this is used in every subsequent call.

- [ ] **Step 2: Inspect the empty file**

Call `use_figma` with a read-only script to get the initial state:

```javascript
const pages = figma.root.children.map(p => ({ id: p.id, name: p.name }));
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const allFonts = await figma.listAvailableFontsAsync();
const raleway = allFonts.filter(f => f.fontName.family === 'Raleway');
return {
  pages,
  collections: collections.length,
  ralewayStyles: raleway.map(f => f.fontName.style)
};
```

This confirms: file exists, Raleway font is available, and discovers available font style strings (critical — "SemiBold" vs "Semi Bold" varies by environment).

- [ ] **Step 3: Initialize state file**

Write the initial state ledger to `/tmp/dsb-state-dfyne-001.json`:

```json
{
  "runId": "dfyne-001",
  "fileKey": "<from step 1>",
  "phase": "phase0",
  "ralewayStyles": ["<from step 2>"],
  "entities": { "collections": {}, "variables": {}, "pages": {}, "components": {}, "styles": {} },
  "completedSteps": []
}
```

- [ ] **Step 4: Create pages**

Call `use_figma` to rename the default page and create additional pages:

```javascript
const RUN_ID = "dfyne-001";

// Rename default page
const defaultPage = figma.root.children[0];
defaultPage.name = "Foundations";
defaultPage.setSharedPluginData('dsb', 'run_id', RUN_ID);
defaultPage.setSharedPluginData('dsb', 'key', 'page/foundations');

const pageNames = ["Primitives", "Cards", "Rails", "Sections"];
const created = [{ name: "Foundations", id: defaultPage.id }];

for (const name of pageNames) {
  const page = figma.createPage();
  page.name = name;
  page.setSharedPluginData('dsb', 'run_id', RUN_ID);
  page.setSharedPluginData('dsb', 'key', `page/${name.toLowerCase()}`);
  created.push({ name, id: page.id });
}

return { pages: created };
```

- [ ] **Step 5: Update state file with page IDs**

Update `/tmp/dsb-state-dfyne-001.json` with page IDs from the return value.

- [ ] **Step 6: Commit state**

```bash
# No code changes yet — just verify file was created
echo "Figma file created. File key recorded in state."
```

**USER CHECKPOINT:** Show the page list and confirm before proceeding to token creation.

---

## Phase 1: Foundations — Token Variables

DFYNE uses 178 CSS tokens. These map to 4 Figma variable collections, all single-mode ("Value"). No primitive/semantic aliasing needed since there's no dark mode.

### Task 2: Create variable collections

**Skills:** `figma:figma-use`

- [ ] **Step 1: Create all 4 collections**

Call `use_figma`:

```javascript
const RUN_ID = "dfyne-001";
const collNames = ["Colors", "Spacing", "Radius", "Typography"];
const created = [];

for (const name of collNames) {
  const coll = figma.variables.createVariableCollection(name);
  coll.renameMode(coll.modes[0].modeId, "Value");
  coll.setSharedPluginData('dsb', 'run_id', RUN_ID);
  coll.setSharedPluginData('dsb', 'key', `collection/${name.toLowerCase()}`);
  created.push({ name, id: coll.id, modeId: coll.modes[0].modeId });
}

return { collections: created };
```

- [ ] **Step 2: Update state file with collection IDs and mode IDs**

### Task 3: Create color variables

**Skills:** `figma:figma-use`

All color tokens from `packages/tokens/src/tokens.css`. ~40 variables with appropriate scopes.

- [ ] **Step 1: Create core + semantic background colors**

Call `use_figma`:

```javascript
function hexToRgb(hex) {
  const c = hex.replace('#', '');
  return { r: parseInt(c.slice(0,2),16)/255, g: parseInt(c.slice(2,4),16)/255, b: parseInt(c.slice(4,6),16)/255 };
}

const RUN_ID = "dfyne-001";
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const colorColl = collections.find(c => c.getSharedPluginData('dsb', 'key') === 'collection/colors');
if (!colorColl) throw new Error("Colors collection not found");
const modeId = colorColl.modes[0].modeId;

const colors = [
  // Core palette
  { name: 'core/primary',       hex: '#111111', scopes: ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL'], css: '--color-primary' },
  { name: 'core/body',          hex: '#ffffff', scopes: ['FRAME_FILL', 'SHAPE_FILL'], css: '--color-body' },
  { name: 'core/text',          hex: '#000000', scopes: ['TEXT_FILL'], css: '--color-text' },
  { name: 'core/price',         hex: '#1c1d1d', scopes: ['TEXT_FILL'], css: '--color-price' },
  { name: 'core/border',        hex: '#e8e8e1', scopes: ['STROKE_COLOR'], css: '--color-border' },
  { name: 'core/error',         hex: '#d02e2e', scopes: ['TEXT_FILL', 'STROKE_COLOR'], css: '--color-error' },
  { name: 'core/savings',       hex: '#C20000', scopes: ['TEXT_FILL'], css: '--color-savings' },

  // Semantic backgrounds
  { name: 'bg/primary',         hex: '#ffffff', scopes: ['FRAME_FILL', 'SHAPE_FILL'], css: '--bg-primary' },
  { name: 'bg/subtle',          hex: '#fafafa', scopes: ['FRAME_FILL', 'SHAPE_FILL'], css: '--bg-subtle' },
  { name: 'bg/soft',            hex: '#f5f5f5', scopes: ['FRAME_FILL', 'SHAPE_FILL'], css: '--bg-soft' },
  { name: 'bg/wash',            hex: '#f0f0f0', scopes: ['FRAME_FILL', 'SHAPE_FILL'], css: '--bg-wash' },
  { name: 'bg/input',           hex: '#fafafa', scopes: ['FRAME_FILL', 'SHAPE_FILL'], css: '--bg-input' },
  { name: 'bg/inverse',         hex: '#111111', scopes: ['FRAME_FILL', 'SHAPE_FILL'], css: '--bg-inverse' },
  { name: 'bg/dark',            hex: '#0a0a0a', scopes: ['FRAME_FILL', 'SHAPE_FILL'], css: '--bg-dark' },
  { name: 'bg/announcement',    hex: '#111111', scopes: ['FRAME_FILL', 'SHAPE_FILL'], css: '--bg-announcement' },

  // Semantic text
  { name: 'text/primary',       hex: '#0a0a0a', scopes: ['TEXT_FILL'], css: '--text-color-primary' },
  { name: 'text/secondary',     hex: '#555555', scopes: ['TEXT_FILL'], css: '--text-color-secondary' },
  { name: 'text/muted',         hex: '#888888', scopes: ['TEXT_FILL'], css: '--text-color-muted' },
  { name: 'text/disabled',      hex: '#aaaaaa', scopes: ['TEXT_FILL'], css: '--text-color-disabled' },
  { name: 'text/subtle',        hex: '#cccccc', scopes: ['TEXT_FILL'], css: '--text-color-subtle' },
  { name: 'text/inverse',       hex: '#ffffff', scopes: ['TEXT_FILL'], css: '--text-color-inverse' },

  // Semantic borders
  { name: 'border/default',     hex: '#e8e8e1', scopes: ['STROKE_COLOR'], css: '--border-color-default' },
  { name: 'border/subtle',      hex: '#f0f0eb', scopes: ['STROKE_COLOR'], css: '--border-color-subtle' },
  { name: 'border/strong',      hex: '#111111', scopes: ['STROKE_COLOR'], css: '--border-color-strong' },
  { name: 'border/input',       hex: '#e0e0d9', scopes: ['STROKE_COLOR'], css: '--border-color-input' },
  { name: 'border/focus',       hex: '#111111', scopes: ['STROKE_COLOR'], css: '--border-color-focus' },
  { name: 'border/disabled',    hex: '#dddddd', scopes: ['STROKE_COLOR'], css: '--border-color-disabled' },
];

const created = [];
for (const { name, hex, scopes, css } of colors) {
  const v = figma.variables.createVariable(name, colorColl, 'COLOR');
  v.setValueForMode(modeId, hexToRgb(hex));
  v.scopes = scopes;
  v.setVariableCodeSyntax('WEB', `var(${css})`);
  v.setSharedPluginData('dsb', 'run_id', RUN_ID);
  v.setSharedPluginData('dsb', 'key', `color/${name}`);
  created.push({ name, id: v.id });
}

return { created, count: created.length };
```

- [ ] **Step 2: Create overlay color variables**

Overlays use rgba values. Call `use_figma`:

```javascript
const RUN_ID = "dfyne-001";
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const colorColl = collections.find(c => c.getSharedPluginData('dsb', 'key') === 'collection/colors');
const modeId = colorColl.modes[0].modeId;

// Overlay colors — these are semi-transparent black
// Figma COLOR variables don't support alpha directly in the value.
// We store the RGB as black and note the opacity in the name/description.
// Binding uses paint opacity at the component level.
const overlays = [
  { name: 'overlay/subtle',     opacity: 0.09, css: '--overlay-subtle' },
  { name: 'overlay/light',      opacity: 0.12, css: '--overlay-light' },
  { name: 'overlay/medium',     opacity: 0.18, css: '--overlay-medium' },
  { name: 'overlay/strong',     opacity: 0.25, css: '--overlay-strong' },
  { name: 'overlay/heavy',      opacity: 0.32, css: '--overlay-heavy' },
  { name: 'overlay/dark',       opacity: 0.40, css: '--overlay-dark' },
  { name: 'overlay/frosted-light', opacity: 0.60, css: '--overlay-frosted-light' },
  { name: 'overlay/frosted-dark',  opacity: 0.85, css: '--overlay-frosted-dark' },
];

const created = [];
for (const { name, opacity, css } of overlays) {
  const v = figma.variables.createVariable(name, colorColl, 'COLOR');
  // Store as black — opacity applied at paint level when binding
  v.setValueForMode(modeId, { r: 0, g: 0, b: 0 });
  v.scopes = ['FRAME_FILL', 'SHAPE_FILL'];
  v.setVariableCodeSyntax('WEB', `var(${css})`);
  v.description = `Black at ${Math.round(opacity * 100)}% opacity`;
  v.setSharedPluginData('dsb', 'run_id', RUN_ID);
  v.setSharedPluginData('dsb', 'key', `color/${name}`);
  created.push({ name, id: v.id, opacity });
}

return { created, count: created.length };
```

- [ ] **Step 3: Validate color variables**

Call `use_figma` read-only to verify counts and scopes:

```javascript
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const colorColl = collections.find(c => c.getSharedPluginData('dsb', 'key') === 'collection/colors');
const allVars = await figma.variables.getLocalVariablesAsync();
const colorVars = allVars.filter(v => v.variableCollectionId === colorColl.id);

return {
  count: colorVars.length,
  withScopes: colorVars.filter(v => v.scopes.length > 0).length,
  withCodeSyntax: colorVars.filter(v => v.codeSyntax['WEB']).length,
  sample: colorVars.slice(0, 5).map(v => ({
    name: v.name,
    scopes: v.scopes,
    codeSyntax: v.codeSyntax['WEB']
  }))
};
```

Expected: ~34 color variables, all with scopes set, all with WEB code syntax.

### Task 4: Create spacing variables

**Skills:** `figma:figma-use`

- [ ] **Step 1: Create spacing + gutter + padding variables**

Call `use_figma`:

```javascript
const RUN_ID = "dfyne-001";
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const spacingColl = collections.find(c => c.getSharedPluginData('dsb', 'key') === 'collection/spacing');
if (!spacingColl) throw new Error("Spacing collection not found");
const modeId = spacingColl.modes[0].modeId;

const tokens = [
  // Core spacing scale
  { name: 'space/1',   value: 2,  css: '--space-1' },
  { name: 'space/2',   value: 4,  css: '--space-2' },
  { name: 'space/3',   value: 6,  css: '--space-3' },
  { name: 'space/4',   value: 10, css: '--space-4' },
  { name: 'space/5',   value: 12, css: '--space-5' },
  { name: 'space/6',   value: 14, css: '--space-6' },
  { name: 'space/7',   value: 16, css: '--space-7' },
  { name: 'space/8',   value: 18, css: '--space-8' },
  { name: 'space/9',   value: 20, css: '--space-9' },
  { name: 'space/10',  value: 24, css: '--space-10' },
  { name: 'space/11',  value: 28, css: '--space-11' },
  { name: 'space/12',  value: 34, css: '--space-12' },
  { name: 'space/13',  value: 40, css: '--space-13' },
  { name: 'space/14',  value: 50, css: '--space-14' },
  { name: 'space/15',  value: 60, css: '--space-15' },
  { name: 'space/16',  value: 75, css: '--space-16' },

  // Grid gutters
  { name: 'gutter/mobile',   value: 17, css: '--gutter-mobile' },
  { name: 'gutter/desktop',  value: 22, css: '--gutter-desktop' },
  { name: 'gutter/drawer-mobile',  value: 20, css: '--gutter-drawer-mobile' },
  { name: 'gutter/drawer-desktop', value: 30, css: '--gutter-drawer-desktop' },

  // Page padding
  { name: 'padding/page-mobile',   value: 17, css: '--page-padding-mobile' },
  { name: 'padding/page-desktop',  value: 24, css: '--page-padding-desktop' },
  { name: 'padding/page-vertical-mobile',  value: 40, css: '--page-vertical-mobile' },
  { name: 'padding/page-vertical-desktop', value: 75, css: '--page-vertical-desktop' },
];

const created = [];
for (const { name, value, css } of tokens) {
  const v = figma.variables.createVariable(name, spacingColl, 'FLOAT');
  v.setValueForMode(modeId, value);
  v.scopes = ['GAP'];
  v.setVariableCodeSyntax('WEB', `var(${css})`);
  v.setSharedPluginData('dsb', 'run_id', RUN_ID);
  v.setSharedPluginData('dsb', 'key', `spacing/${name}`);
  created.push({ name, value, id: v.id });
}

return { created, count: created.length };
```

- [ ] **Step 2: Validate spacing variables**

Expected: 24 spacing variables, all with GAP scope and WEB code syntax.

### Task 5: Create radius variables

**Skills:** `figma:figma-use`

- [ ] **Step 1: Create all radius variables**

Call `use_figma`:

```javascript
const RUN_ID = "dfyne-001";
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const radiusColl = collections.find(c => c.getSharedPluginData('dsb', 'key') === 'collection/radius');
if (!radiusColl) throw new Error("Radius collection not found");
const modeId = radiusColl.modes[0].modeId;

const tokens = [
  { name: 'radius/none',        value: 0,    css: '--radius-none' },
  { name: 'radius/xs',          value: 2,    css: '--radius-xs' },
  { name: 'radius/sm',          value: 4,    css: '--radius-sm' },
  { name: 'radius/md',          value: 8,    css: '--radius-md' },
  { name: 'radius/lg',          value: 12,   css: '--radius-lg' },
  { name: 'radius/xl',          value: 16,   css: '--radius-xl' },
  { name: 'radius/2xl',         value: 20,   css: '--radius-2xl' },
  { name: 'radius/button',      value: 50,   css: '--radius-button' },
  { name: 'radius/button-near', value: 89,   css: '--radius-button-near' },
  { name: 'radius/badge',       value: 4,    css: '--radius-badge' },
  { name: 'radius/full',        value: 999,  css: '--radius-full' },
];

const created = [];
for (const { name, value, css } of tokens) {
  const v = figma.variables.createVariable(name, radiusColl, 'FLOAT');
  v.setValueForMode(modeId, value);
  v.scopes = ['CORNER_RADIUS'];
  v.setVariableCodeSyntax('WEB', `var(${css})`);
  v.setSharedPluginData('dsb', 'run_id', RUN_ID);
  v.setSharedPluginData('dsb', 'key', `radius/${name}`);
  created.push({ name, value, id: v.id });
}

return { created, count: created.length };
```

- [ ] **Step 2: Validate radius variables**

Expected: 11 radius variables, all with CORNER_RADIUS scope.

### Task 6: Create typography variables

**Skills:** `figma:figma-use`

- [ ] **Step 1: Create font size variables**

Call `use_figma`:

```javascript
const RUN_ID = "dfyne-001";
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const typoColl = collections.find(c => c.getSharedPluginData('dsb', 'key') === 'collection/typography');
if (!typoColl) throw new Error("Typography collection not found");
const modeId = typoColl.modes[0].modeId;

// Font sizes
const sizes = [
  { name: 'size/2xs',         value: 7,     css: '--text-2xs' },
  { name: 'size/xs',          value: 9,     css: '--text-xs' },
  { name: 'size/sm',          value: 11.05, css: '--text-sm' },
  { name: 'size/base',        value: 13,    css: '--text-base' },
  { name: 'size/md',          value: 14,    css: '--text-md' },
  { name: 'size/lg',          value: 16,    css: '--text-lg' },
  { name: 'size/xl',          value: 18,    css: '--text-xl' },
  { name: 'size/2xl',         value: 20,    css: '--text-2xl' },
  { name: 'size/3xl',         value: 24,    css: '--text-3xl' },
  { name: 'size/4xl',         value: 28,    css: '--text-4xl' },
  { name: 'size/5xl',         value: 34,    css: '--text-5xl' },
  { name: 'size/display-sm',  value: 40,    css: '--text-display-sm' },
  { name: 'size/display-md',  value: 48,    css: '--text-display-md' },
  { name: 'size/display-lg',  value: 60,    css: '--text-display-lg' },
  { name: 'size/display-xl',  value: 84,    css: '--text-display-xl' },
  // Computed semantic sizes
  { name: 'size/button',      value: 9,     css: '--text-button' },
  { name: 'size/nav',         value: 10,    css: '--text-nav' },
  { name: 'size/card-title',  value: 13,    css: '--text-card-title' },
  { name: 'size/card-detail', value: 11.05, css: '--text-card-detail' },
  { name: 'size/badge',       value: 11.05, css: '--text-badge' },
  { name: 'size/label',       value: 10,    css: '--text-label' },
  { name: 'size/overline',    value: 10,    css: '--text-overline' },
  { name: 'size/section-eyebrow', value: 10,    css: '--text-section-eyebrow' },
  { name: 'size/section-title',   value: 14,    css: '--text-section-title' },
  { name: 'size/hero',        value: 10,    css: '--text-hero-caption' },
];

const created = [];
for (const { name, value, css } of sizes) {
  const v = figma.variables.createVariable(name, typoColl, 'FLOAT');
  v.setValueForMode(modeId, value);
  v.scopes = ['FONT_SIZE'];
  v.setVariableCodeSyntax('WEB', `var(${css})`);
  v.setSharedPluginData('dsb', 'run_id', RUN_ID);
  v.setSharedPluginData('dsb', 'key', `typo/${name}`);
  created.push({ name, value, id: v.id });
}

return { created, count: created.length };
```

- [ ] **Step 2: Create weight, line-height, and letter-spacing variables**

Call `use_figma`:

```javascript
const RUN_ID = "dfyne-001";
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const typoColl = collections.find(c => c.getSharedPluginData('dsb', 'key') === 'collection/typography');
const modeId = typoColl.modes[0].modeId;

const tokens = [
  // Weights
  { name: 'weight/regular',   value: 400, scope: 'FONT_WEIGHT',    css: '--weight-regular' },
  { name: 'weight/medium',    value: 500, scope: 'FONT_WEIGHT',    css: '--weight-medium' },
  { name: 'weight/semibold',  value: 600, scope: 'FONT_WEIGHT',    css: '--weight-semibold' },
  { name: 'weight/bold',      value: 700, scope: 'FONT_WEIGHT',    css: '--weight-bold' },

  // Line heights (unitless ratios — Figma uses these as multipliers)
  { name: 'leading/base',     value: 1.6, scope: 'LINE_HEIGHT',    css: '--leading-base' },
  { name: 'leading/header',   value: 1.3, scope: 'LINE_HEIGHT',    css: '--leading-header' },
  { name: 'leading/hero',     value: 0.9, scope: 'LINE_HEIGHT',    css: '--leading-hero' },
  { name: 'leading/tight',    value: 1.2, scope: 'LINE_HEIGHT',    css: '--leading-tight' },

  // Letter spacing (px values)
  { name: 'tracking/none',    value: 0,     scope: 'LETTER_SPACING', css: '--tracking-none' },
  { name: 'tracking/tight',   value: 0.3,   scope: 'LETTER_SPACING', css: '--tracking-tight' },
  { name: 'tracking/normal',  value: 0.5,   scope: 'LETTER_SPACING', css: '--tracking-normal' },
  { name: 'tracking/wide',    value: 1.0,   scope: 'LETTER_SPACING', css: '--tracking-wide' },
  { name: 'tracking/wider',   value: 1.2,   scope: 'LETTER_SPACING', css: '--tracking-wider' },
  { name: 'tracking/widest',  value: 1.5,   scope: 'LETTER_SPACING', css: '--tracking-widest' },
  { name: 'tracking/badge',   value: 1.5,   scope: 'LETTER_SPACING', css: '--tracking-badge' },
  { name: 'tracking/button',  value: 2.7,   scope: 'LETTER_SPACING', css: '--tracking-button' },
  { name: 'tracking/section-eyebrow', value: 1.2, scope: 'LETTER_SPACING', css: '--tracking-section-eyebrow' },
  { name: 'tracking/section-title',   value: 1.5, scope: 'LETTER_SPACING', css: '--tracking-section-title' },
];

const created = [];
for (const { name, value, scope, css } of tokens) {
  const v = figma.variables.createVariable(name, typoColl, 'FLOAT');
  v.setValueForMode(modeId, value);
  v.scopes = [scope];
  v.setVariableCodeSyntax('WEB', `var(${css})`);
  v.setSharedPluginData('dsb', 'run_id', RUN_ID);
  v.setSharedPluginData('dsb', 'key', `typo/${name}`);
  created.push({ name, value, id: v.id });
}

return { created, count: created.length };
```

- [ ] **Step 3: Validate all typography variables**

Expected: ~43 typography variables across font size, weight, line height, and letter spacing.

### Task 7: Create text styles and effect styles

**Skills:** `figma:figma-use`

- [ ] **Step 1: Discover available Raleway font styles**

Call `use_figma` to check exact font style strings:

```javascript
const allFonts = await figma.listAvailableFontsAsync();
const raleway = allFonts.filter(f => f.fontName.family === 'Raleway');
return raleway.map(f => f.fontName.style);
```

Record the exact style strings (e.g., "Regular", "Medium", "SemiBold" or "Semi Bold", "Bold", "ExtraBold" or "Extra Bold").

- [ ] **Step 2: Create text styles**

Call `use_figma` using the exact Raleway style strings from step 1:

```javascript
const RUN_ID = "dfyne-001";

// Replace SEMIBOLD_STYLE, BOLD_STYLE etc. with actual values from step 1
const REGULAR = "Regular";
const SEMIBOLD = "<from step 1>";  // e.g. "SemiBold" or "Semi Bold"
const BOLD = "Bold";
const EXTRABOLD = "<from step 1>"; // e.g. "ExtraBold" or "Extra Bold"

const textStyles = [
  // Button text
  { name: 'DFYNE/Button',         style: SEMIBOLD, size: 9,     tracking: 2.7, leading: 1.2, transform: 'UPPER' },
  // Section headings
  { name: 'DFYNE/Section Eyebrow', style: SEMIBOLD, size: 10,    tracking: 1.2, leading: 1.2, transform: 'UPPER' },
  { name: 'DFYNE/Section Title',   style: SEMIBOLD, size: 14,    tracking: 1.5, leading: 1.2, transform: 'UPPER' },
  // Card text
  { name: 'DFYNE/Card Title',     style: REGULAR,  size: 13,    tracking: 0,   leading: 1.6, transform: 'ORIGINAL' },
  { name: 'DFYNE/Card Detail',    style: REGULAR,  size: 11.05, tracking: 1.105, leading: 1.6, transform: 'ORIGINAL' },
  // Badge
  { name: 'DFYNE/Badge',          style: SEMIBOLD, size: 11.05, tracking: 1.5, leading: 1.2, transform: 'UPPER' },
  // Navigation / Label
  { name: 'DFYNE/Nav',            style: SEMIBOLD, size: 10,    tracking: 1.5, leading: 1.2, transform: 'UPPER' },
  // Hero
  { name: 'DFYNE/Hero Caption',   style: SEMIBOLD, size: 10,    tracking: 1.2, leading: 1.2, transform: 'UPPER' },
  { name: 'DFYNE/Hero Heading',   style: EXTRABOLD, size: 34,   tracking: 0,   leading: 0.9, transform: 'UPPER' },
  // Body
  { name: 'DFYNE/Body',           style: REGULAR,  size: 13,    tracking: 0,   leading: 1.6, transform: 'ORIGINAL' },
  { name: 'DFYNE/Body Small',     style: REGULAR,  size: 11.05, tracking: 0,   leading: 1.6, transform: 'ORIGINAL' },
  // Footer
  { name: 'DFYNE/Footer Heading', style: SEMIBOLD, size: 10,    tracking: 1.5, leading: 1.2, transform: 'UPPER' },
  { name: 'DFYNE/Footer Link',    style: REGULAR,  size: 11.05, tracking: 0,   leading: 1.6, transform: 'ORIGINAL' },
];

// Load all needed font variants
const variants = [...new Set(textStyles.map(s => s.style))];
await Promise.all(variants.map(s => figma.loadFontAsync({ family: 'Raleway', style: s })));

const created = [];
for (const { name, style, size, tracking, leading, transform } of textStyles) {
  const ts = figma.createTextStyle();
  ts.name = name;
  ts.fontName = { family: 'Raleway', style };
  ts.fontSize = size;
  ts.letterSpacing = { value: tracking, unit: 'PIXELS' };
  ts.lineHeight = { value: leading * size, unit: 'PIXELS' };
  ts.textCase = transform;
  ts.setSharedPluginData('dsb', 'run_id', RUN_ID);
  ts.setSharedPluginData('dsb', 'key', `text-style/${name}`);
  created.push({ name, id: ts.id });
}

return { created, count: created.length };
```

- [ ] **Step 3: Create effect styles (shadows)**

Call `use_figma`:

```javascript
const RUN_ID = "dfyne-001";

const shadows = [
  { name: 'DFYNE/Card',    effects: [{ type: 'DROP_SHADOW', color: {r:0,g:0,b:0,a:0.06}, offset:{x:0,y:1}, radius:3, spread:0, visible:true, blendMode:'NORMAL' }] },
  { name: 'DFYNE/Drawer',  effects: [{ type: 'DROP_SHADOW', color: {r:0,g:0,b:0,a:0.12}, offset:{x:-4,y:0}, radius:24, spread:0, visible:true, blendMode:'NORMAL' }] },
  { name: 'DFYNE/Focus',   effects: [{ type: 'DROP_SHADOW', color: {r:0.067,g:0.067,b:0.067,a:0.4}, offset:{x:0,y:0}, radius:0, spread:2, visible:true, blendMode:'NORMAL' }] },
  { name: 'DFYNE/Input',   effects: [{ type: 'DROP_SHADOW', color: {r:0,g:0,b:0,a:0.05}, offset:{x:0,y:1}, radius:2, spread:0, visible:true, blendMode:'NORMAL' }] },
  { name: 'DFYNE/Arrow',   effects: [{ type: 'DROP_SHADOW', color: {r:0,g:0,b:0,a:0.14}, offset:{x:0,y:10}, radius:24, spread:0, visible:true, blendMode:'NORMAL' }] },
  { name: 'DFYNE/XS',      effects: [{ type: 'DROP_SHADOW', color: {r:0,g:0,b:0,a:0.04}, offset:{x:0,y:1}, radius:2, spread:0, visible:true, blendMode:'NORMAL' }] },
  { name: 'DFYNE/SM',      effects: [{ type: 'DROP_SHADOW', color: {r:0,g:0,b:0,a:0.06}, offset:{x:0,y:2}, radius:4, spread:0, visible:true, blendMode:'NORMAL' }] },
  { name: 'DFYNE/MD',      effects: [{ type: 'DROP_SHADOW', color: {r:0,g:0,b:0,a:0.08}, offset:{x:0,y:4}, radius:8, spread:0, visible:true, blendMode:'NORMAL' }] },
  { name: 'DFYNE/LG',      effects: [{ type: 'DROP_SHADOW', color: {r:0,g:0,b:0,a:0.10}, offset:{x:0,y:8}, radius:16, spread:0, visible:true, blendMode:'NORMAL' }] },
  { name: 'DFYNE/XL',      effects: [{ type: 'DROP_SHADOW', color: {r:0,g:0,b:0,a:0.12}, offset:{x:0,y:12}, radius:24, spread:0, visible:true, blendMode:'NORMAL' }] },
];

const created = [];
for (const { name, effects } of shadows) {
  const style = figma.createEffectStyle();
  style.name = name;
  style.effects = effects;
  style.setSharedPluginData('dsb', 'run_id', RUN_ID);
  style.setSharedPluginData('dsb', 'key', `effect-style/${name}`);
  created.push({ name, id: style.id });
}

return { created, count: created.length };
```

- [ ] **Step 4: Validate all styles**

Call `use_figma`:

```javascript
const [textStyles, effectStyles] = await Promise.all([
  figma.getLocalTextStylesAsync(),
  figma.getLocalEffectStylesAsync()
]);
return {
  textStyles: textStyles.map(s => ({ name: s.name, size: s.fontSize })),
  effectStyles: effectStyles.map(s => ({ name: s.name })),
  counts: { text: textStyles.length, effect: effectStyles.length }
};
```

Expected: 13 text styles, 10 effect styles.

- [ ] **Step 5: Update state file with all token IDs**

**USER CHECKPOINT:** Present variable summary (4 collections, ~112 variables, 13 text styles, 10 effect styles). Await approval before proceeding to file structure.

---

## Phase 2: File Structure — Foundations Documentation

### Task 8: Build Foundations page

**Skills:** `figma:figma-use`

This page visually documents the token system for designers browsing the library.

- [ ] **Step 1: Create color swatch documentation**

Navigate to the Foundations page. Create a grid of color swatches showing each color variable with its name and hex value. Group by category (core, bg, text, border, overlay).

Use `figma.createAutoLayout('VERTICAL')` for each group, with color rectangles bound to color variables. Each swatch: 80×60px rectangle + text label below.

- [ ] **Step 2: Create typography specimen**

Create a vertical stack showing each text style applied to sample text. Each row: style name label + "The quick brown fox" in that style.

- [ ] **Step 3: Create spacing scale**

Create horizontal bars showing each spacing value. Each bar: rectangle with width = spacing value, labeled.

- [ ] **Step 4: Create radius showcase**

Create a row of rectangles, each with a different radius variable bound to cornerRadius.

- [ ] **Step 5: Take screenshot and validate**

Call `get_screenshot` on the Foundations page. Verify all sections are visible and properly laid out.

- [ ] **Step 6: Update state file**

**USER CHECKPOINT:** Show Foundations page screenshot. Await approval before components.

---

## Phase 3: Components

Each component is built in its own `use_figma` call(s) on the appropriate page. Every visual property binds to variables — no hardcoded values.

**Required skills for every `use_figma` call in this phase:** `figma:figma-use`, `figma:figma-generate-library`. Reference `component-creation.md` for variant matrix and `combineAsVariants` patterns.

### Task 9: Build Icon component

**Page:** Primitives

- [ ] **Step 1: Create 21 icon components**

For each icon (check, star, menu, user, search, cart, arrow-left, arrow-right, chevron-right, chevron-down, close, pause, play, support, mail, package, reward, calendar, instagram), create a component with the SVG path data from `Icon.tsx`.

Each icon is a 16×16 component. Use `figma.createVector()` for paths.

Combine all into a component set named "Icon" with property `name`.

- [ ] **Step 2: Position variants in grid**

After `combineAsVariants`, position icons in a 7×3 grid with 20px gap.

- [ ] **Step 3: Validate with screenshot**

Call `get_screenshot`. Verify all 21 icons are visible.

### Task 10: Build Badge component

**Page:** Primitives

- [ ] **Step 1: Create Badge variants**

4 variants × 3 positions = 12 variants. Each variant:
- Auto-layout frame with text child
- Text uses DFYNE/Badge text style
- Fills/colors bound to color variables
- Padding from spacing variables
- Corner radius: `0px 4px 0px 4px` (asymmetric — set individually)

Variant properties:
- `variant`: custom, sold-out, sale, bottom
- `position`: top-right, bottom-left, inline

```
custom:    bg → bg/inverse (#111), text → text/inverse (#fff)
sold-out:  bg → bg/primary (#fff), text → text/primary (#0a0a0a)
sale:      bg → core/price (#1c1d1d), text → text/inverse (#fff)
bottom:    bg → bg/primary (#fff), text → text/primary (#0a0a0a), weight 400
```

- [ ] **Step 2: Combine as variants and position**
- [ ] **Step 3: Validate with screenshot**

### Task 11: Build SectionHeading component

**Page:** Primitives

- [ ] **Step 1: Create SectionHeading**

Single component (no variants). Vertical auto-layout:
- Eyebrow text: DFYNE/Section Eyebrow style
- Title text: DFYNE/Section Title style
- Gap: 3px (--space-2 = 4px is closest, or use fixed 3px)
- Both texts exposed as text properties

- [ ] **Step 2: Validate with screenshot**

### Task 12: Build Button component

**Page:** Primitives

- [ ] **Step 1: Create Button variants**

4 variants × 3 states = 12 variants. Each:
- Auto-layout frame with text child
- Text: DFYNE/Button style (9px, semibold, uppercase, 2.7px tracking)
- Padding: 20px top/bottom, 13px left/right (primary/secondary), 10px/8px (tertiary)
- Border radius: `--radius-button` (50px)

Variant fills/strokes:
```
primary/default:   fill → bg/inverse, text → text/inverse, no stroke
primary/hover:     fill slightly lighter
primary/disabled:  fill → bg/soft, text → text/disabled

secondary/default: fill transparent, stroke → border/default, text → text/primary
secondary/hover:   stroke darkens
secondary/disabled: stroke → border/disabled, text → text/disabled

tertiary/default:  fill transparent, stroke → border/default, text → text/primary, lighter weight
tertiary/hover:    stroke darkens
tertiary/disabled: stroke → border/disabled, text → text/disabled

ghost/default:     fill transparent, stroke → text/inverse (white), text → text/inverse
ghost/hover:       fill → bg/primary (white), text → text/primary (black)
ghost/disabled:    opacity reduced
```

- [ ] **Step 2: Combine as variants and position in grid**
- [ ] **Step 3: Validate with screenshot**

### Task 13: Build ArrowButton component

**Page:** Primitives

- [ ] **Step 1: Create ArrowButton variants**

2 directions × 2 variants × 2 states = 8 variants. Each:
- Frame with Icon instance (arrow-left or arrow-right)
- Default: 30px square, border → border/strong, fill → bg/primary
- Edge: 36px, shadow DFYNE/Arrow, fill → bg/primary, subtle border

- [ ] **Step 2: Combine as variants and position**
- [ ] **Step 3: Validate with screenshot**

**USER CHECKPOINT:** Show Primitives page screenshot with all 5 components. Await approval.

### Task 14: Build SizeButton component

**Page:** Cards

- [ ] **Step 1: Create SizeButton variants**

2 × 2 = 4 variants (selected × soldOut). Each:
- 40×24px auto-layout, text centered
- Radius: 25px (--radius-button-near would be closest, or fixed)
- Font: 10px Raleway
- Selected: bg → bg/inverse, text → text/inverse
- SoldOut: disabled style, strikethrough text

- [ ] **Step 2: Combine as variants and position**
- [ ] **Step 3: Validate with screenshot**

### Task 15: Build ColorSwatch component

**Page:** Cards

- [ ] **Step 1: Create ColorSwatch variants**

2 × 2 = 4 variants (selected × isNew). Each:
- 66×99px image frame + label text below
- Radius: --radius-xs (2px)
- Selected: 1px black ring (stroke → border/strong)
- isNew: Badge instance (sale variant) positioned top-right, 7px text "NEW"

- [ ] **Step 2: Combine as variants and position**
- [ ] **Step 3: Validate with screenshot**

### Task 16: Build CrossSellCard component

**Page:** Cards

- [ ] **Step 1: Create CrossSellCard**

Single component (no variants). Vertical auto-layout:
- Image frame: 123×154px placeholder, radius --radius-xs
- Name text: 11px Raleway
- Color text: 10px Raleway
- Price text: 11px semibold Raleway

- [ ] **Step 2: Validate with screenshot**

### Task 17: Build ProductCard component

**Page:** Cards

- [ ] **Step 1: Create ProductCard**

Component with boolean property `badge`. Vertical auto-layout:
- Image frame: 197px wide, 4:5 aspect (197×246px), radius --radius-sm
- Badge instance (optional, positioned top-right in image frame)
- Title: DFYNE/Card Title style
- Color/vendor: DFYNE/Card Detail style
- Price: 11.05px sans-serif
- Star rating row (5 Icon instances)

- [ ] **Step 2: Validate with screenshot**

### Task 18: Build CategoryCard component

**Page:** Cards

- [ ] **Step 1: Create CategoryCard**

Single component. Frame with image fill:
- Desktop size: 599×781px
- 10% black overlay + bottom gradient overlay
- White text overlay at bottom (title + optional caption)
- ArrowButton instance (decoration) at bottom-right
- All text: DFYNE text styles

- [ ] **Step 2: Validate with screenshot**

**USER CHECKPOINT:** Show Cards page screenshot. Await approval.

### Task 19: Build ProductRail component

**Page:** Rails

- [ ] **Step 1: Create ProductRail**

Composed component:
- SectionHeading instance at top
- Horizontal auto-layout containing 4-5 ProductCard instances
- ArrowButton instances (edge variant) positioned at left/right edges
- Overflow clipping enabled

- [ ] **Step 2: Validate with screenshot**

### Task 20: Build CategoryRail component

**Page:** Rails

- [ ] **Step 1: Create CategoryRail**

Similar to ProductRail but with CategoryCard instances instead.

- [ ] **Step 2: Validate with screenshot**

### Task 21: Build CrossSellRail component

**Page:** Rails

- [ ] **Step 1: Create CrossSellRail**

Title text (10px semibold uppercase, 1.5px tracking) + horizontal auto-layout of CrossSellCard instances. Gap: 3px.

- [ ] **Step 2: Validate with screenshot**

**USER CHECKPOINT:** Show Rails page screenshot. Await approval.

### Task 22: Build AnnouncementBar component

**Page:** Sections

- [ ] **Step 1: Create AnnouncementBar**

Fixed-height (36px) frame:
- Fill: bg/inverse (black)
- Text: text/inverse (white), DFYNE/Nav style
- Centered auto-layout
- Detail text at 80% opacity

- [ ] **Step 2: Validate with screenshot**

### Task 23: Build NewsletterSignup component

**Page:** Sections

- [ ] **Step 1: Create NewsletterSignup**

Centered auto-layout:
- Fill: bg/soft
- Heading: "JOIN THE COMMUNITY", DFYNE/Section Title style
- Description: 11px, 60% opacity
- Input frame: 42px height, border → border/input
- Button instance (primary variant)
- Max-width: 400px form

- [ ] **Step 2: Validate with screenshot**

### Task 24: Build Footer component

**Page:** Sections

- [ ] **Step 1: Create Footer**

Grid layout:
- Fill: bg/primary, top stroke → border/default
- 4 columns (auto-layout grid)
- Column headings: DFYNE/Footer Heading style
- Links: DFYNE/Footer Link style
- Max-width: 1442px

- [ ] **Step 2: Validate with screenshot**

### Task 25: Build CampaignHero component

**Page:** Sections

- [ ] **Step 1: Create CampaignHero**

Full-width frame:
- Image fill (placeholder)
- Top gradient overlay (linear, hidden on mobile conceptually)
- Bottom 50% dark gradient overlay
- White text stack: caption (DFYNE/Hero Caption), heading (DFYNE/Hero Heading)
- Two Button instances: primary (white fill variant for hero context) + optional secondary (ghost variant)

- [ ] **Step 2: Validate with screenshot**

**USER CHECKPOINT:** Show Sections page screenshot with all 4 components. Await approval.

---

## Phase 4: Integration — Code Connect

### Task 26: Add @figma/code-connect dependency

**Files:**
- Modify: `packages/react/package.json`

- [ ] **Step 1: Install the dependency**

```bash
cd /Users/declanmalone/Desktop/dfyne-design-system
pnpm add -D @figma/code-connect --filter @dfyne/react
```

- [ ] **Step 2: Commit**

```bash
git add packages/react/package.json pnpm-lock.yaml
git commit -m "chore: add @figma/code-connect to @dfyne/react"
```

### Task 27: Create Code Connect mappings for all components

**Skills:** Figma MCP `add_code_connect_map` or `send_code_connect_mappings`

**Important:** Components must be **published** to the Figma library first. Before this task, publish the file as a library in Figma.

- [ ] **Step 1: Collect all component node IDs**

Call `use_figma` to scan all pages for component sets:

```javascript
const pages = figma.root.children;
const components = [];
for (const page of pages) {
  await figma.setCurrentPageAsync(page);
  const comps = page.findAllWithCriteria({ types: ['COMPONENT', 'COMPONENT_SET'] });
  for (const c of comps) {
    components.push({ page: page.name, name: c.name, type: c.type, id: c.id });
  }
}
return components;
```

Note: This violates the "one setCurrentPageAsync per call" rule. Split into parallel calls per page if needed.

- [ ] **Step 2: Bulk-apply Code Connect mappings**

Call `send_code_connect_mappings` with all component mappings:

```json
{
  "fileKey": "<file key>",
  "mappings": [
    { "nodeId": "<Icon set ID>", "componentName": "Icon", "source": "packages/react/src/primitives/Icon.tsx", "label": "React" },
    { "nodeId": "<Badge set ID>", "componentName": "Badge", "source": "packages/react/src/primitives/Badge.tsx", "label": "React" },
    { "nodeId": "<SectionHeading ID>", "componentName": "SectionHeading", "source": "packages/react/src/primitives/SectionHeading.tsx", "label": "React" },
    { "nodeId": "<Button set ID>", "componentName": "Button", "source": "packages/react/src/primitives/Button.tsx", "label": "React" },
    { "nodeId": "<ArrowButton set ID>", "componentName": "ArrowButton", "source": "packages/react/src/primitives/ArrowButton.tsx", "label": "React" },
    { "nodeId": "<ProductCard ID>", "componentName": "ProductCard", "source": "packages/react/src/cards/ProductCard.tsx", "label": "React" },
    { "nodeId": "<CategoryCard ID>", "componentName": "CategoryCard", "source": "packages/react/src/cards/CategoryCard.tsx", "label": "React" },
    { "nodeId": "<ColorSwatch set ID>", "componentName": "ColorSwatch", "source": "packages/react/src/cards/ColorSwatch.tsx", "label": "React" },
    { "nodeId": "<SizeButton set ID>", "componentName": "SizeButton", "source": "packages/react/src/cards/SizeButton.tsx", "label": "React" },
    { "nodeId": "<CrossSellCard ID>", "componentName": "CrossSellCard", "source": "packages/react/src/cards/CrossSellCard.tsx", "label": "React" },
    { "nodeId": "<ProductRail ID>", "componentName": "ProductRail", "source": "packages/react/src/rails/ProductRail.tsx", "label": "React" },
    { "nodeId": "<CategoryRail ID>", "componentName": "CategoryRail", "source": "packages/react/src/rails/CategoryRail.tsx", "label": "React" },
    { "nodeId": "<CrossSellRail ID>", "componentName": "CrossSellRail", "source": "packages/react/src/rails/CrossSellRail.tsx", "label": "React" },
    { "nodeId": "<CampaignHero ID>", "componentName": "CampaignHero", "source": "packages/react/src/sections/CampaignHero.tsx", "label": "React" },
    { "nodeId": "<AnnouncementBar ID>", "componentName": "AnnouncementBar", "source": "packages/react/src/sections/AnnouncementBar.tsx", "label": "React" },
    { "nodeId": "<NewsletterSignup ID>", "componentName": "NewsletterSignup", "source": "packages/react/src/sections/NewsletterSignup.tsx", "label": "React" },
    { "nodeId": "<Footer ID>", "componentName": "Footer", "source": "packages/react/src/sections/Footer.tsx", "label": "React" }
  ]
}
```

- [ ] **Step 3: Verify mappings**

Call `get_code_connect_map` for a sample of components to confirm mappings are applied.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: add Code Connect mappings for all DFYNE components"
```

**USER CHECKPOINT:** Final review — screenshots of each page, Code Connect verification. Sign off.

---

## Summary

| Phase | Tasks | use_figma calls (est.) | Checkpoints |
|-------|-------|----------------------|-------------|
| 0: Discovery | 1 | 3 | File + pages created |
| 1: Foundations | 2–7 | 12 | All tokens created |
| 2: File structure | 8 | 5 | Foundations page |
| 3: Components | 9–25 | ~40 | Per-category |
| 4: Integration | 26–27 | 3 | Code Connect live |
| **Total** | **27** | **~63** | **6** |
