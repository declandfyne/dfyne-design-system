"use client";

import {
  Icon,
  Badge,
  SectionHeading,
  Button,
  ArrowButton,
  ProductCard,
  CategoryCard,
  ColorSwatch,
  SizeButton,
  CrossSellCard,
  ProductRail,
  CategoryRail,
  CrossSellRail,
  CampaignHero,
  AnnouncementBar,
  NewsletterSignup,
  Footer,
} from "@dfyne/react";
import type { IconName } from "@dfyne/react";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Token Data                                                         */
/* ------------------------------------------------------------------ */

/** Black scale — ordered light → dark for Radix-style grid */
const blackScale = [
  { step: 1, label: "Black 3%",  value: "rgba(0,0,0,0.03)",  hex: "–",        textDark: true  },
  { step: 2, label: "Black 8%",  value: "rgba(0,0,0,0.08)",  hex: "–",        textDark: true  },
  { step: 3, label: "Black 15%", value: "rgba(0,0,0,0.15)",  hex: "–",        textDark: true  },
  { step: 4, label: "Black 20%", value: "rgba(0,0,0,0.2)",   hex: "–",        textDark: true  },
  { step: 5, label: "Black 40%", value: "rgba(0,0,0,0.4)",   hex: "–",        textDark: false },
  { step: 6, label: "Black",     value: "#000000",            hex: "#000000",  textDark: false },
];

/** White scale */
const whiteScale = [
  { step: 1, label: "White",    value: "#FFFFFF",   hex: "#FFFFFF",  textDark: true },
  { step: 2, label: "Concrete", value: "#F2F2F2",   hex: "#F2F2F2",  textDark: true },
];

/** Gray scale */
const grayScale = [
  { step: 1, label: "Boulder",  value: "#757575",   hex: "#757575",  textDark: false },
];

/** Text colors */
const textScale = [
  { step: 1, label: "#000000",  value: "#000000",   hex: "#000000",  textDark: false },
  { step: 2, label: "#0a0a0a",  value: "#0a0a0a",   hex: "#0a0a0a",  textDark: false },
  { step: 3, label: "#1c1d1d",  value: "#1c1d1d",   hex: "#1c1d1d",  textDark: false },
  { step: 4, label: "#555555",  value: "#555555",   hex: "#555555",  textDark: false },
  { step: 5, label: "#757575",  value: "#757575",   hex: "#757575",  textDark: false },
  { step: 6, label: "#888888",  value: "#888888",   hex: "#888888",  textDark: false },
  { step: 7, label: "#bbbbbb",  value: "#bbbbbb",   hex: "#bbbbbb",  textDark: true  },
];

const colorGridColumns = [
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
const figmaTextStyles = [
  {
    name: "Raleway-9/Semibold",
    size: "9px",
    weight: 600,
    lineHeight: "13.5px",
    tracking: "1px",
    sample: "NEW ARRIVAL — IMPACT COLLECTION",
  },
  {
    name: "Raleway-10/Regular",
    size: "10px",
    weight: 400,
    lineHeight: "15px",
    tracking: "1.2px",
    sample: "SEARCH BY STYLE",
  },
  {
    name: "Raleway-11/Semibold",
    size: "11px",
    weight: 600,
    lineHeight: "16.5px",
    tracking: "1.5px",
    sample: "POPULAR RIGHT NOW",
  },
  {
    name: "Raleway-12/Regular",
    size: "12px",
    weight: 400,
    lineHeight: "18px",
    tracking: "0px",
    sample: "The quick brown fox jumps over the lazy dog",
  },
];

const typeWeights = [
  { label: "Regular",  value: 400 },
  { label: "SemiBold", value: 600 },
  { label: "Bold",     value: 700 },
];

const spacingScale = [
  { label: "2px",  value: "2px"  },
  { label: "4px",  value: "4px"  },
  { label: "6px",  value: "6px"  },
  { label: "8px",  value: "8px"  },
  { label: "10px", value: "10px" },
  { label: "12px", value: "12px" },
  { label: "16px", value: "16px" },
  { label: "20px", value: "20px" },
  { label: "24px", value: "24px" },
  { label: "32px", value: "32px" },
  { label: "40px", value: "40px" },
  { label: "48px", value: "48px" },
];

const radiusScale = [
  { label: "2px",          value: "2px",   note: "Badge, swatch"        },
  { label: "4px",          value: "4px",   note: "Card corner"          },
  { label: "65px",         value: "65px",  note: "Size button pill"     },
  { label: "89px",         value: "89px",  note: "PDP button"           },
  { label: "Full / 999px", value: "999px", note: "Search pill, toggle"  },
];

const shadowScale = [
  {
    label: "Header border",
    value: "0 1px 0 rgba(0,0,0,0.06)",
    note: "Divider below sticky header",
  },
  {
    label: "Drawer",
    value: "-4px 0 24px -4px rgba(0,0,0,0.15)",
    note: "Side navigation drawer",
  },
];

const iconNames: IconName[] = [
  "check", "star", "menu", "user", "search", "cart",
  "arrow-left", "arrow-right", "chevron-right", "chevron-down",
  "close", "pause", "play", "support", "mail", "package",
  "reward", "calendar", "instagram",
];

/* ------------------------------------------------------------------ */
/*  Layout helpers                                                     */
/* ------------------------------------------------------------------ */

function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 border-b border-[#e8e8e8] py-20">
      <div className="mx-auto max-w-[1200px] px-8">
        <h2
          className="mb-12 text-2xl font-light tracking-tight text-[#1a1a1a]"
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" }}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-14 last:mb-0">
      <h3
        className="mb-5 text-[13px] font-medium text-[#6f6f6f]"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function SpecNote({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-3 text-[12px] text-[#8f8f8f]"
      style={{ fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace" }}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Radix-style color grid row                                        */
/* ------------------------------------------------------------------ */

type ColorStep = {
  step: number;
  label: string;
  value: string;
  hex: string;
  textDark: boolean;
};

function ColorGridRow({
  rowLabel,
  steps,
  totalCols,
}: {
  rowLabel: string;
  steps: ColorStep[];
  totalCols: number;
}) {
  // Pad steps array to totalCols by repeating last step's color or blank
  const paddedSteps: (ColorStep | null)[] = Array.from({ length: totalCols }, (_, i) =>
    steps[i] ?? null
  );

  return (
    <div className="flex">
      {/* Row label */}
      <div
        className="flex w-[120px] shrink-0 items-center pr-4"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" }}
      >
        <span className="text-[13px] font-medium text-[#1a1a1a]">{rowLabel}</span>
      </div>
      {/* Color cells */}
      <div className="flex flex-1">
        {paddedSteps.map((step, i) =>
          step ? (
            <div
              key={i}
              className="group relative flex-1 cursor-default"
              style={{ height: "52px", background: step.value }}
              title={`${step.label} — ${step.hex}`}
            >
              {/* Hover label */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-start justify-end px-2 pb-1.5 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <span
                  className="text-[10px] font-medium leading-tight"
                  style={{
                    color: step.textDark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.75)",
                    fontFamily: "ui-monospace, 'Cascadia Code', Menlo, monospace",
                  }}
                >
                  {step.label}
                </span>
              </div>
            </div>
          ) : (
            <div key={i} className="flex-1" style={{ height: "52px", background: "transparent" }} />
          )
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */

const navItems = [
  { id: "colors",      label: "Colors"      },
  { id: "typography",  label: "Typography"  },
  { id: "spacing",     label: "Spacing"     },
  { id: "radius",      label: "Radius"      },
  { id: "shadows",     label: "Shadows"     },
  { id: "icons",       label: "Icons"       },
  { id: "primitives",  label: "Primitives"  },
  { id: "patterns",    label: "Patterns"    },
  { id: "cards",       label: "Cards"       },
  { id: "rails",       label: "Rails"       },
  { id: "sections",    label: "Sections"    },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PreviewPage() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeSearchPill, setActiveSearchPill] = useState("Running");

  const searchPills = ["Running", "Yoga", "Gym", "Cycling", "Swimming"];

  const sysFont =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: sysFont }}>

      {/* ---- STICKY TOP NAV ---- */}
      <header
        className="sticky top-0 z-50 border-b border-[#e8e8e8] bg-white/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-[1200px] items-center gap-10 px-8 py-0" style={{ height: "52px" }}>
          {/* Wordmark */}
          <span
            className="shrink-0 text-[15px] font-semibold tracking-tight text-[#1a1a1a]"
          >
            DFYNE
          </span>

          {/* Nav links */}
          <nav className="no-scrollbar flex items-center gap-0 overflow-x-auto">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded px-3 py-1.5 text-[13px] text-[#6f6f6f] transition-colors hover:bg-[#f5f5f5] hover:text-[#1a1a1a]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ---- HERO ---- */}
      <div
        className="relative overflow-hidden pb-24 pt-20 text-center"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,210,195,0.35) 0%, rgba(255,235,225,0.18) 45%, rgba(255,255,255,0) 75%), #ffffff",
        }}
      >
        <p
          className="text-[12px] font-medium text-[#a08070]"
        >
          Design System v0.1.0
        </p>
        <h1
          className="mt-4 text-[64px] font-light tracking-tight text-[#1a1a1a]"
          style={{ lineHeight: 1.05 }}
        >
          DFYNE Design System
        </h1>
        <p className="mx-auto mt-5 max-w-[480px] text-[16px] font-normal leading-relaxed text-[#8f8f8f]">
          Tokens, components, and patterns for the DFYNE brand — verified against Figma.
        </p>
        <div className="mt-8 flex justify-center gap-2.5">
          <span
            className="rounded-full border border-[#e0e0e0] px-4 py-1.5 text-[12px] text-[#6f6f6f]"
          >
            Raleway
          </span>
          <span
            className="rounded-full border border-[#e0e0e0] px-4 py-1.5 text-[12px] text-[#6f6f6f]"
          >
            17 Components
          </span>
          <span
            className="rounded-full bg-[#1a1a1a] px-4 py-1.5 text-[12px] text-white"
          >
            Figma-verified
          </span>
        </div>
      </div>

      {/* ================================================================== */}
      {/*  COLORS — Radix-style grid                                         */}
      {/* ================================================================== */}
      <DocSection id="colors" title="Colors">

        {/* Grid column headers */}
        <div className="mb-3 flex">
          <div className="w-[120px] shrink-0" />
          <div className="flex flex-1">
            {colorGridColumns.map((col) => (
              <div key={col} className="flex-1 px-1">
                <span
                  className="block text-[11px] font-medium text-[#a0a0a0]"
                  style={{ fontFamily: sysFont }}
                >
                  {col}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Color rows */}
        <div className="overflow-hidden rounded-[8px] border border-[#e8e8e8]">
          <ColorGridRow rowLabel="Black" steps={blackScale} totalCols={7} />
          <div className="border-t border-[#e8e8e8]" />
          <ColorGridRow rowLabel="White" steps={whiteScale} totalCols={7} />
          <div className="border-t border-[#e8e8e8]" />
          <ColorGridRow rowLabel="Gray" steps={grayScale} totalCols={7} />
          <div className="border-t border-[#e8e8e8]" />
          <ColorGridRow rowLabel="Text" steps={textScale} totalCols={7} />
        </div>

        {/* Usage reference */}
        <div className="mt-14">
          <h3
            className="mb-5 text-[13px] font-medium text-[#6f6f6f]"
          >
            Usage reference
          </h3>
          <div className="grid grid-cols-1 gap-px bg-[#e8e8e8] overflow-hidden rounded-[8px] border border-[#e8e8e8] sm:grid-cols-2">
            {[
              { role: "Search pill — default border",    value: "rgba(0,0,0,0.2)"  },
              { role: "Search pill — active border",     value: "#000000"           },
              { role: "Search pill — active bg",         value: "rgba(0,0,0,0.03)" },
              { role: "Search input — bg",               value: "rgba(0,0,0,0.03)" },
              { role: "Search input — border",           value: "#000000"           },
              { role: "Search input — placeholder",      value: "#757575"           },
              { role: "Announcement bar — bg",           value: "#f0f0f0"           },
              { role: "Category card gradient",          value: "rgba(0,0,0,0.4) → transparent" },
              { role: "Gradient overlay (bottom)",       value: "rgba(0,0,0,0.15)" },
            ].map((r) => (
              <div
                key={r.role}
                className="flex items-center justify-between bg-white px-4 py-3"
              >
                <span className="text-[13px] text-[#4a4a4a]">{r.role}</span>
                <code
                  className="ml-4 shrink-0 text-[11px] text-[#8f8f8f]"
                  style={{ fontFamily: "ui-monospace, Menlo, monospace" }}
                >
                  {r.value}
                </code>
              </div>
            ))}
          </div>
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  TYPOGRAPHY                                                         */}
      {/* ================================================================== */}
      <DocSection id="typography" title="Typography">

        <SubSection title="Font family">
          <div className="rounded-[8px] border border-[#e8e8e8] p-8">
            <p
              className="text-[36px] text-[#1a1a1a]"
              style={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif", fontWeight: 400 }}
            >
              Raleway
            </p>
            <p className="mt-1 text-[13px] text-[#8f8f8f]">
              Regular 400 · SemiBold 600 · Bold 700
            </p>
            <div className="mt-6 space-y-1.5">
              {["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz", "0123456789 !@#$%&*()"].map((row) => (
                <p
                  key={row}
                  className="text-[15px] text-[#1a1a1a]"
                  style={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif", fontWeight: 400 }}
                >
                  {row}
                </p>
              ))}
            </div>
          </div>
        </SubSection>

        <SubSection title="Text styles">
          <div className="overflow-hidden rounded-[8px] border border-[#e8e8e8]">
            <div
              className="grid gap-4 border-b border-[#e8e8e8] bg-[#fafafa] px-5 py-3"
              style={{ gridTemplateColumns: "220px 56px 66px 90px 80px 1fr" }}
            >
              {["Style", "Size", "Weight", "Line Height", "Tracking", "Sample"].map((h) => (
                <span key={h} className="text-[11px] font-medium text-[#a0a0a0]">{h}</span>
              ))}
            </div>
            {figmaTextStyles.map((s) => (
              <div
                key={s.name}
                className="grid items-center gap-4 border-b border-[#e8e8e8] px-5 py-4 last:border-b-0"
                style={{ gridTemplateColumns: "220px 56px 66px 90px 80px 1fr" }}
              >
                <code
                  className="text-[12px] text-[#4a4a4a]"
                  style={{ fontFamily: "ui-monospace, Menlo, monospace" }}
                >
                  {s.name}
                </code>
                <span className="text-[12px] text-[#8f8f8f]">{s.size}</span>
                <span className="text-[12px] text-[#8f8f8f]">{s.weight}</span>
                <span className="text-[12px] text-[#8f8f8f]">{s.lineHeight}</span>
                <span className="text-[12px] text-[#8f8f8f]">{s.tracking}</span>
                <span
                  className="uppercase text-[#1a1a1a]"
                  style={{
                    fontFamily: "Raleway, Arial, sans-serif",
                    fontSize: s.size,
                    fontWeight: s.weight,
                    lineHeight: s.lineHeight,
                    letterSpacing: s.tracking,
                  }}
                >
                  {s.sample}
                </span>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="Weight scale">
          <div>
            {typeWeights.map((w) => (
              <div
                key={w.label}
                className="flex items-baseline gap-6 border-b border-[#e8e8e8] py-5 last:border-b-0"
              >
                <span className="w-[90px] shrink-0 text-[13px] text-[#8f8f8f]">{w.label}</span>
                <span className="w-[32px] shrink-0 text-[13px] text-[#c0c0c0]">{w.value}</span>
                <span
                  className="text-[22px] uppercase text-[#1a1a1a]"
                  style={{ fontFamily: "Raleway, Arial, sans-serif", fontWeight: w.value }}
                >
                  Impact Collection — DFYNE
                </span>
              </div>
            ))}
          </div>
        </SubSection>
      </DocSection>

      {/* ================================================================== */}
      {/*  SPACING                                                            */}
      {/* ================================================================== */}
      <DocSection id="spacing" title="Spacing">
        <div className="space-y-3">
          {spacingScale.map((s) => (
            <div key={s.label} className="flex items-center gap-5">
              <code
                className="w-[48px] shrink-0 text-[12px] text-[#8f8f8f]"
                style={{ fontFamily: "ui-monospace, Menlo, monospace" }}
              >
                {s.label}
              </code>
              <div
                className="h-[3px] rounded-full bg-[#1a1a1a]"
                style={{ width: s.value }}
              />
            </div>
          ))}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  BORDER RADIUS                                                      */}
      {/* ================================================================== */}
      <DocSection id="radius" title="Border radius">
        <div className="flex flex-wrap gap-10">
          {radiusScale.map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-4">
              <div
                className="h-[72px] w-[72px] border-2 border-[#1a1a1a] bg-[#f5f5f5]"
                style={{ borderRadius: r.value }}
              />
              <div className="text-center">
                <code
                  className="block text-[13px] text-[#1a1a1a]"
                  style={{ fontFamily: "ui-monospace, Menlo, monospace" }}
                >
                  {r.label}
                </code>
                <span className="mt-0.5 block text-[11px] text-[#a0a0a0]">{r.note}</span>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  SHADOWS                                                            */}
      {/* ================================================================== */}
      <DocSection id="shadows" title="Shadows">
        <div className="flex flex-wrap gap-12">
          {shadowScale.map((s) => (
            <div key={s.label} className="flex flex-col items-start gap-4">
              <div
                className="h-[80px] w-[140px] rounded-[8px] bg-white"
                style={{ boxShadow: s.value, border: "1px solid #f0f0f0" }}
              />
              <div>
                <p className="text-[14px] font-medium text-[#1a1a1a]">{s.label}</p>
                <p className="mt-0.5 text-[12px] text-[#8f8f8f]">{s.note}</p>
                <code
                  className="mt-1 block text-[11px] text-[#a0a0a0]"
                  style={{ fontFamily: "ui-monospace, Menlo, monospace" }}
                >
                  {s.value}
                </code>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  ICONS                                                              */}
      {/* ================================================================== */}
      <DocSection id="icons" title="Icons">
        <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
          {iconNames.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2.5 rounded-[6px] border border-[#e8e8e8] px-2 py-3 transition-colors hover:border-[#d0d0d0] hover:bg-[#fafafa]"
            >
              <Icon name={name} className="h-5 w-5 text-[#1a1a1a]" />
              <code
                className="text-center text-[9px] leading-tight text-[#a0a0a0]"
                style={{ fontFamily: "ui-monospace, Menlo, monospace" }}
              >
                {name}
              </code>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  PRIMITIVES                                                         */}
      {/* ================================================================== */}
      <DocSection id="primitives" title="Primitives">

        {/* Badge */}
        <SubSection title="Badge">
          <div className="flex flex-wrap items-center gap-5 rounded-[8px] border border-[#e8e8e8] p-8">
            {[
              { text: "NEW",            variant: undefined, lbl: "Default"         },
              { text: "LIMITED EDITION",variant: undefined, lbl: "Text"            },
              { text: "MOST WANTED",    variant: undefined, lbl: "Long"            },
              { text: "LIGHT",          variant: "light" as const, lbl: "Light"    },
            ].map(({ text, variant, lbl }) => (
              <div key={lbl} className="flex flex-col items-center gap-2.5">
                <Badge text={text} variant={variant} />
                <span className="text-[11px] text-[#a0a0a0]">{lbl}</span>
              </div>
            ))}
          </div>
          <SpecNote>
            bg-black · rounded-2px · px-2 py-0.5 · 9px · weight-600 · tracking-1px · white
          </SpecNote>
        </SubSection>

        {/* Button */}
        <SubSection title="Button">
          <div className="space-y-3">
            <div className="rounded-[8px] border border-[#e8e8e8] p-8">
              <p className="mb-5 text-[12px] text-[#a0a0a0]">Variants</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">ADD TO CART</Button>
                <Button variant="secondary">COMPLETE THE LOOK</Button>
                <Button variant="outline">EXPLORE</Button>
                <Button variant="ghost">VIEW ALL</Button>
              </div>
            </div>
            <div className="rounded-[8px] border border-[#e8e8e8] p-8">
              <p className="mb-5 text-[12px] text-[#a0a0a0]">Sizes</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
          <SpecNote>
            Primary: bg-black · text-white · rounded-89px · h-48px · 9px · bold · tracking-2.8px
            {" · "}Secondary: bg-white · border-black · border-1px · rounded-89px · h-48px
          </SpecNote>
        </SubSection>

        {/* Arrow Button */}
        <SubSection title="Arrow button">
          <div className="flex flex-wrap items-center gap-8 rounded-[8px] border border-[#e8e8e8] p-8">
            {[
              { direction: "left"  as const, variant: undefined,      label: "Left Default"  },
              { direction: "right" as const, variant: undefined,      label: "Right Default" },
              { direction: "left"  as const, variant: "edge" as const, label: "Left Edge"    },
              { direction: "right" as const, variant: "edge" as const, label: "Right Edge"   },
            ].map((btn) => (
              <div key={btn.label} className="flex flex-col items-center gap-2.5">
                <ArrowButton direction={btn.direction} variant={btn.variant} />
                <span className="text-[11px] text-[#a0a0a0]">{btn.label}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2.5">
              <ArrowButton direction="left" disabled />
              <span className="text-[11px] text-[#a0a0a0]">Disabled</span>
            </div>
          </div>
        </SubSection>

        {/* Section Heading */}
        <SubSection title="Section heading">
          <div className="rounded-[8px] border border-[#e8e8e8] p-8">
            <SectionHeading eyebrow="JUST LANDED" title="NEW IN WOMEN" />
          </div>
          <SpecNote>
            11px · SemiBold · uppercase · tracking-1.5px · line-height-16.5px
          </SpecNote>
        </SubSection>

        {/* Color Swatch */}
        <SubSection title="Color swatch">
          <div className="rounded-[8px] border border-[#e8e8e8] p-8">
            <p className="mb-4 text-[13px] text-[#8f8f8f]">
              Color:{" "}
              {["Midnight Black", "Navy", "Teal", "Truffle", "Optic White"][selectedColor]}
            </p>
            <div className="flex gap-3">
              {["Midnight Black", "Navy", "Teal", "Truffle", "Optic White"].map((color, i) => (
                <ColorSwatch
                  key={color}
                  image={`https://placehold.co/132x198/${["1c1d1d", "1A2340", "2A8B8B", "7A5040", "f0f0f0"][i]}/${i < 4 ? "ffffff" : "1c1d1d"}?text=${encodeURIComponent(color.slice(0, 2))}`}
                  label={color}
                  selected={i === selectedColor}
                  isNew={i === 0}
                  onClick={() => setSelectedColor(i)}
                />
              ))}
            </div>
          </div>
          <SpecNote>Swatch image: 66x99px · rounded-2px</SpecNote>
        </SubSection>

        {/* Size Button */}
        <SubSection title="Size button">
          <div className="rounded-[8px] border border-[#e8e8e8] p-8">
            <p className="mb-4 text-[13px] text-[#8f8f8f]">
              Firm at True to Size. Size up for a more relaxed fit.
            </p>
            <div className="flex gap-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <SizeButton
                  key={size}
                  label={size}
                  selected={size === selectedSize}
                  soldOut={size === "XL"}
                  onClick={() => setSelectedSize(size)}
                />
              ))}
            </div>
            <p className="mt-3 text-[11px] text-[#a0a0a0]">XL = sold out state</p>
          </div>
          <SpecNote>h-35px · rounded-65px · border border-#cccccc</SpecNote>
        </SubSection>
      </DocSection>

      {/* ================================================================== */}
      {/*  PATTERNS                                                           */}
      {/* ================================================================== */}
      <DocSection id="patterns" title="Patterns">

        {/* Search pill buttons */}
        <SubSection title="Search pill buttons">
          <div className="rounded-[8px] border border-[#e8e8e8] p-8">
            <div className="flex flex-wrap gap-2">
              {searchPills.map((pill) => {
                const isActive = pill === activeSearchPill;
                return (
                  <button
                    key={pill}
                    onClick={() => setActiveSearchPill(pill)}
                    className="h-[34px] rounded-full px-4 text-[10px] font-normal uppercase tracking-[1.2px] leading-none transition-colors"
                    style={{
                      border: isActive ? "1px solid #000000" : "1px solid rgba(0,0,0,0.2)",
                      background: isActive ? "rgba(0,0,0,0.03)" : "transparent",
                      color: "#1a1a1a",
                      fontFamily: "Raleway, Arial, sans-serif",
                    }}
                  >
                    {pill}
                  </button>
                );
              })}
            </div>
          </div>
          <SpecNote>
            h-34px · rounded-full · border-black/20 · px-3 · 10px · uppercase · tracking-1.2px
            {" · "}Active: border-black · bg-black/3%
          </SpecNote>
        </SubSection>

        {/* Search input */}
        <SubSection title="Search input">
          <div className="rounded-[8px] border border-[#e8e8e8] p-8">
            <div className="relative max-w-[320px]">
              <Icon
                name="search"
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1a1a1a]"
              />
              <input
                type="text"
                placeholder="Search styles, fits, collections..."
                className="h-[40px] w-full rounded-full pl-10 pr-4 text-[12px] outline-none"
                style={{
                  border: "1px solid #000000",
                  background: "rgba(0,0,0,0.03)",
                  color: "#1a1a1a",
                  fontFamily: "Raleway, Arial, sans-serif",
                }}
              />
            </div>
          </div>
          <SpecNote>
            h-40px · rounded-full · border-black · bg-black/3% · pl-10 · 12px · placeholder #757575
          </SpecNote>
        </SubSection>

        {/* Popular Right Now grid */}
        <SubSection title="Popular Right Now — 2×2 grid">
          <div className="grid max-w-[500px] grid-cols-2 gap-2">
            {[
              { category: "LEGGINGS",   badge: "NEW", color: "1c1d1d" },
              { category: "SPORTS BRAS",badge: null,  color: "333333" },
              { category: "SHORTS",     badge: "NEW", color: "555555" },
              { category: "TOPS",       badge: null,  color: "888888" },
            ].map((item) => (
              <div
                key={item.category}
                className="relative overflow-hidden rounded-[4px]"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={`https://placehold.co/300x400/${item.color}/ffffff?text=${encodeURIComponent(item.category)}`}
                  alt={item.category}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)" }}
                />
                <span
                  className="absolute bottom-3 left-3 uppercase text-white"
                  style={{
                    fontFamily: "Raleway, Arial, sans-serif",
                    fontSize: "11px", fontWeight: 600,
                    lineHeight: "16.5px", letterSpacing: "1.5px",
                  }}
                >
                  {item.category}
                </span>
                {item.badge && (
                  <span
                    className="absolute left-3 top-3 bg-black uppercase text-white"
                    style={{
                      fontFamily: "Raleway, Arial, sans-serif",
                      fontSize: "9px", fontWeight: 600,
                      lineHeight: "13.5px", letterSpacing: "1px",
                      borderRadius: "2px", padding: "2px 8px",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
          <SpecNote>
            2×2 grid · aspect-3/4 · gradient rgba(0,0,0,0.4)→transparent · category 11px semibold
          </SpecNote>
        </SubSection>

        {/* Mobile menu toggle */}
        <SubSection title="Mobile menu — Women / Men toggle">
          <div className="rounded-[8px] border border-[#e8e8e8] p-8">
            <MobileMenuToggle />
          </div>
          <SpecNote>rounded-full pills · h-33px · 11px · uppercase · tracking-1.5px</SpecNote>
        </SubSection>

        {/* Menu nav items */}
        <SubSection title="Menu nav items">
          <div className="max-w-[300px] overflow-hidden rounded-[8px] border border-[#e8e8e8]">
            {["NEW IN", "CLOTHING", "COLLECTIONS", "ACCESSORIES", "SALE"].map((item) => (
              <div
                key={item}
                className="flex h-[48px] items-center justify-between border-b border-[#e8e8e8] px-4 last:border-b-0"
              >
                <span
                  className="uppercase text-[#1a1a1a]"
                  style={{
                    fontFamily: "Raleway, Arial, sans-serif",
                    fontSize: "12px", fontWeight: 400,
                    lineHeight: "18px", letterSpacing: "2px",
                  }}
                >
                  {item}
                </span>
                <Icon name="chevron-right" className="h-4 w-4 text-[#c0c0c0]" />
              </div>
            ))}
          </div>
          <SpecNote>12px · uppercase · tracking-2px · h-48px items</SpecNote>
        </SubSection>
      </DocSection>

      {/* ================================================================== */}
      {/*  CARDS                                                              */}
      {/* ================================================================== */}
      <DocSection id="cards" title="Cards">

        <SubSection title="Product card">
          <div className="flex gap-4 overflow-x-auto rounded-[8px] border border-[#e8e8e8] p-8">
            <ProductCard
              image="https://placehold.co/394x492/f2f2f2/1c1d1d?text=Impact+Top"
              name="Impact Longsleeve Top"
              color="Pebble Grey"
              price={52.2}
              rating={4.8}
              reviewCount={52866}
              badge="NEW"
              className="!w-[220px]"
            />
            <ProductCard
              image="https://placehold.co/394x492/f2f2f2/1c1d1d?text=Impact+Flares"
              name="Impact Flares"
              color="Raspberry"
              price={52.2}
              rating={4.8}
              reviewCount={52866}
              className="!w-[220px]"
            />
            <ProductCard
              image="https://placehold.co/394x492/f2f2f2/1c1d1d?text=Origin+Bra"
              name="Origin Halter Bra"
              color="Espresso"
              price={38.99}
              rating={4.9}
              reviewCount={12400}
              badge="LIMITED EDITION"
              className="!w-[220px]"
            />
          </div>
        </SubSection>

        <SubSection title="Category card">
          <div className="flex gap-3 overflow-x-auto rounded-[8px] border border-[#e8e8e8] p-8">
            <CategoryCard
              image="https://placehold.co/600x781/1c1d1d/ffffff?text=IMPACT"
              title="IMPACT"
              href="#"
              caption="High Support"
              className="!w-[240px]"
            />
            <CategoryCard
              image="https://placehold.co/600x781/333333/ffffff?text=ORIGIN"
              title="ORIGIN"
              href="#"
              caption="Soft Sculpt"
              className="!w-[240px]"
            />
            <CategoryCard
              image="https://placehold.co/600x781/555555/ffffff?text=DEFY"
              title="DEFY"
              href="#"
              className="!w-[240px]"
            />
          </div>
        </SubSection>

        <SubSection title="Cross-sell card">
          <div className="flex gap-3 overflow-x-auto rounded-[8px] border border-[#e8e8e8] p-8">
            <CrossSellCard
              image="https://placehold.co/246x308/f2f2f2/1c1d1d?text=Shorts"
              name={`Impact Shorts | 4.5"`}
              color="Midnight Black"
              price={49}
            />
            <CrossSellCard
              image="https://placehold.co/246x308/f2f2f2/1c1d1d?text=Zippy"
              name="Impact Half Zippy"
              color="Midnight Black"
              price={69}
            />
            <CrossSellCard
              image="https://placehold.co/246x308/f2f2f2/1c1d1d?text=Flares"
              name="Origin Flares"
              color="Midnight Black"
              price={69}
            />
          </div>
        </SubSection>
      </DocSection>

      {/* ================================================================== */}
      {/*  RAILS (full-width outside inner max-width)                        */}
      {/* ================================================================== */}
      <section id="rails" className="scroll-mt-16 border-b border-[#e8e8e8] py-20">
        <div className="mx-auto max-w-[1200px] px-8">
          <h2
            className="mb-12 text-2xl font-light tracking-tight text-[#1a1a1a]"
            style={{ fontFamily: sysFont }}
          >
            Rails
          </h2>
        </div>

        <div className="mb-12">
          <div className="mx-auto max-w-[1200px] px-8 pb-5">
            <h3
              className="text-[13px] font-medium text-[#6f6f6f]"
              style={{ fontFamily: sysFont }}
            >
              Product Rail
            </h3>
          </div>
          <ProductRail
            id="preview-product-rail"
            eyebrow="JUST LANDED"
            title="NEW IN WOMEN"
            products={[
              { image: "https://placehold.co/394x492/f2f2f2/1c1d1d?text=1", name: "Impact Longsleeve Top", color: "Pebble Grey",    price: 52.2,  rating: 4.8, reviewCount: 52866, badge: "NEW" },
              { image: "https://placehold.co/394x492/f2f2f2/1c1d1d?text=2", name: "Impact Flares",         color: "Raspberry",      price: 52.2,  rating: 4.8, reviewCount: 52866 },
              { image: "https://placehold.co/394x492/f2f2f2/1c1d1d?text=3", name: "Origin Halter Bra",     color: "Espresso",       price: 38.99, rating: 4.9, reviewCount: 12400, badge: "NEW" },
              { image: "https://placehold.co/394x492/f2f2f2/1c1d1d?text=4", name: "Defy Strappy Top",      color: "Midnight Black", price: 36.99, rating: 4.7, reviewCount: 8200  },
              { image: "https://placehold.co/394x492/f2f2f2/1c1d1d?text=5", name: "Dynamic Leggings",      color: "Wine",           price: 48,    rating: 4.8, reviewCount: 34000, badge: "NEW" },
              { image: "https://placehold.co/394x492/f2f2f2/1c1d1d?text=6", name: "Vision Shorts",         color: "Midnight Plum",  price: 42,    rating: 4.6, reviewCount: 15000 },
            ]}
          />
        </div>

        <div className="mb-12">
          <div className="mx-auto max-w-[1200px] px-8 pb-5">
            <h3
              className="text-[13px] font-medium text-[#6f6f6f]"
              style={{ fontFamily: sysFont }}
            >
              Category Rail
            </h3>
          </div>
          <CategoryRail
            cards={[
              { image: "https://placehold.co/600x781/1c1d1d/ffffff?text=IMPACT", title: "IMPACT", href: "#", caption: "High Support" },
              { image: "https://placehold.co/600x781/333333/ffffff?text=ORIGIN", title: "ORIGIN", href: "#", caption: "Soft Sculpt"  },
              { image: "https://placehold.co/600x781/555555/ffffff?text=DEFY",   title: "DEFY",   href: "#"                           },
              { image: "https://placehold.co/600x781/888888/ffffff?text=VISION", title: "VISION", href: "#"                           },
            ]}
          />
        </div>

        <div>
          <div className="mx-auto max-w-[1200px] px-8 pb-5">
            <h3
              className="text-[13px] font-medium text-[#6f6f6f]"
              style={{ fontFamily: sysFont }}
            >
              Cross-Sell Rail
            </h3>
          </div>
          <CrossSellRail
            title="COMPLETE THE LOOK"
            products={[
              { image: "https://placehold.co/246x308/f2f2f2/1c1d1d?text=Shorts",  name: "Impact Shorts",       color: "Midnight Black", price: 49 },
              { image: "https://placehold.co/246x308/f2f2f2/1c1d1d?text=Zippy",   name: "Impact Half Zippy",   color: "Midnight Black", price: 69 },
              { image: "https://placehold.co/246x308/f2f2f2/1c1d1d?text=Flares",  name: "Origin Flares",       color: "Midnight Black", price: 69 },
              { image: "https://placehold.co/246x308/f2f2f2/1c1d1d?text=Bandeau", name: "Backless Bandeau",    color: "Midnight Black", price: 49 },
            ]}
          />
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTIONS                                                           */}
      {/* ================================================================== */}
      <section id="sections" className="scroll-mt-16 border-b border-[#e8e8e8] py-20">
        <div className="mx-auto max-w-[1200px] px-8">
          <h2
            className="mb-12 text-2xl font-light tracking-tight text-[#1a1a1a]"
            style={{ fontFamily: sysFont }}
          >
            Sections
          </h2>
        </div>

        {/* Announcement Bar */}
        <div className="mb-12">
          <div className="mx-auto max-w-[1200px] px-8 pb-5">
            <h3
              className="text-[13px] font-medium text-[#6f6f6f]"
              style={{ fontFamily: sysFont }}
            >
              Announcement Bar
            </h3>
            <p
              className="mt-1 text-[12px] text-[#a0a0a0]"
              style={{ fontFamily: "ui-monospace, Menlo, monospace" }}
            >
              bg-#f0f0f0 · text-black
            </p>
          </div>
          <AnnouncementBar
            slides={[
              { text: "HASSLE-FREE RETURNS",   detail: "100-day free returns*"          },
              { text: "FREE TRACKED DELIVERY", detail: "On orders over £30"             },
              { text: "REWARDS PROGRAM",       detail: "Earn points with every order"   },
            ]}
          />
        </div>

        {/* Campaign Hero */}
        <div className="mb-12">
          <div className="mx-auto max-w-[1200px] px-8 pb-5">
            <h3
              className="text-[13px] font-medium text-[#6f6f6f]"
              style={{ fontFamily: sysFont }}
            >
              Campaign Hero
            </h3>
          </div>
          <CampaignHero
            image="https://placehold.co/1920x1080/1c1d1d/ffffff?text=CAMPAIGN+HERO"
            caption="NEW STYLES, NEW STRENGTH"
            heading="IMPACT"
            cta={{ label: "SHOP NOW", href: "#" }}
            secondaryCta={{ label: "EXPLORE", href: "#" }}
          />
        </div>

        {/* Newsletter */}
        <div className="mb-12">
          <div className="mx-auto max-w-[1200px] px-8 pb-5">
            <h3
              className="text-[13px] font-medium text-[#6f6f6f]"
              style={{ fontFamily: sysFont }}
            >
              Newsletter Signup
            </h3>
          </div>
          <NewsletterSignup onSubmit={(email) => alert(`Subscribed: ${email}`)} />
        </div>

        {/* Footer */}
        <div>
          <div className="mx-auto max-w-[1200px] px-8 pb-5">
            <h3
              className="text-[13px] font-medium text-[#6f6f6f]"
              style={{ fontFamily: sysFont }}
            >
              Footer
            </h3>
          </div>
          <Footer
            columns={[
              { heading: "Account",            links: ["Login", "Register", "Rewards", "Track My Order"]           },
              { heading: "About",              links: ["About", "Careers", "Sustainability"]                        },
              { heading: "Contact",            links: ["Contact Us", "Privacy Policy", "Terms & Conditions"]        },
              { heading: "Delivery & Returns", links: ["Shipping", "Returns", "International"]                      },
            ]}
          />
        </div>
      </section>

    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile Menu Toggle — isolated sub-component                       */
/* ------------------------------------------------------------------ */

function MobileMenuToggle() {
  const [active, setActive] = useState<"women" | "men">("women");
  return (
    <div
      className="inline-flex rounded-full p-[3px]"
      style={{ background: "rgba(0,0,0,0.08)" }}
    >
      {(["women", "men"] as const).map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className="h-[33px] rounded-full px-5 transition-colors"
            style={{
              fontFamily: "Raleway, Arial, sans-serif",
              fontSize: "11px",
              fontWeight: isActive ? 600 : 400,
              lineHeight: "16.5px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              background: isActive ? "#000000" : "transparent",
              color: isActive ? "#ffffff" : "#1a1a1a",
            }}
          >
            {tab === "women" ? "Women" : "Men"}
          </button>
        );
      })}
    </div>
  );
}
