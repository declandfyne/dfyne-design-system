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
/*  Figma-verified Token Data                                          */
/* ------------------------------------------------------------------ */

/** Black palette — all verified from Figma */
const blackPalette = [
  { label: "Black", value: "#000000", textColor: "#ffffff" },
  { label: "Black 40%", value: "rgba(0,0,0,0.4)", textColor: "#ffffff" },
  { label: "Black 20%", value: "rgba(0,0,0,0.2)", textColor: "#ffffff" },
  { label: "Black 15%", value: "rgba(0,0,0,0.15)", textColor: "#000000" },
  { label: "Black 8%", value: "rgba(0,0,0,0.08)", textColor: "#000000" },
  { label: "Black 3%", value: "rgba(0,0,0,0.03)", textColor: "#000000" },
];

/** White palette — all verified from Figma */
const whitePalette = [
  { label: "White", value: "#FFFFFF", textColor: "#000000" },
  { label: "Concrete", value: "#F2F2F2", textColor: "#000000" },
];

/** Gray palette */
const grayPalette = [
  { label: "Boulder 20", value: "#757575", textColor: "#ffffff" },
];

/**
 * Figma text styles — exact values extracted from Figma inspect
 * Name: font-size / weight / line-height / tracking
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

/** Font weights used in Raleway */
const typeWeights = [
  { label: "Regular", value: 400 },
  { label: "SemiBold", value: 600 },
  { label: "Bold", value: 700 },
];

/** Spacing scale */
const spacingScale = [
  { label: "2px", value: "2px" },
  { label: "4px", value: "4px" },
  { label: "6px", value: "6px" },
  { label: "8px", value: "8px" },
  { label: "10px", value: "10px" },
  { label: "12px", value: "12px" },
  { label: "16px", value: "16px" },
  { label: "20px", value: "20px" },
  { label: "24px", value: "24px" },
  { label: "32px", value: "32px" },
  { label: "40px", value: "40px" },
  { label: "48px", value: "48px" },
];

/** Border radius — Figma-verified */
const radiusScale = [
  { label: "2px", value: "2px", note: "Badge, swatch" },
  { label: "4px", value: "4px", note: "Card corner" },
  { label: "65px", value: "65px", note: "Size button pill" },
  { label: "89px", value: "89px", note: "PDP button" },
  { label: "Full / 999px", value: "999px", note: "Search pill, toggle" },
];

/** Shadows — Figma-verified */
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
  "check",
  "star",
  "menu",
  "user",
  "search",
  "cart",
  "arrow-left",
  "arrow-right",
  "chevron-right",
  "chevron-down",
  "close",
  "pause",
  "play",
  "support",
  "mail",
  "package",
  "reward",
  "calendar",
  "instagram",
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
    <section id={id} className="scroll-mt-20 border-b border-[rgba(0,0,0,0.08)] py-16">
      <div className="mx-auto max-w-[1100px] px-6">
        <h2 className="mb-10 text-[11px] font-semibold uppercase tracking-[1.5px] leading-[16.5px] text-black">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[1.5px] leading-[16.5px] text-black/40">
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */

const navItems = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "radius", label: "Radius" },
  { id: "shadows", label: "Shadows" },
  { id: "icons", label: "Icons" },
  { id: "primitives", label: "Primitives" },
  { id: "patterns", label: "Patterns" },
  { id: "cards", label: "Cards" },
  { id: "rails", label: "Rails" },
  { id: "sections", label: "Sections" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PreviewPage() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeSearchPill, setActiveSearchPill] = useState("Running");

  const searchPills = ["Running", "Yoga", "Gym", "Cycling", "Swimming"];

  return (
    <div className="min-h-screen bg-white font-[Raleway,Arial,Helvetica,sans-serif]">
      {/* ---- STICKY NAV HEADER ---- */}
      <header
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm"
        style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}
      >
        <div className="mx-auto flex max-w-[1100px] items-center gap-8 px-6 py-3">
          <h1 className="shrink-0 text-[12px] font-bold uppercase tracking-[2px] text-black">
            DFYNE Design System
          </h1>
          <nav className="no-scrollbar flex gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 rounded-full px-3 py-1.5 text-[10px] font-normal uppercase tracking-[1.2px] leading-[15px] text-black/40 transition-colors hover:bg-[rgba(0,0,0,0.03)] hover:text-black"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ---- HERO ---- */}
      <div className="border-b border-[rgba(0,0,0,0.08)] bg-[#F2F2F2] py-20 text-center">
        <p className="text-[9px] font-semibold uppercase tracking-[1px] leading-[13.5px] text-black/40">
          Design System v0.1.0
        </p>
        <h1 className="mt-3 text-[46px] font-bold uppercase leading-[0.95] tracking-[0.04em] text-black">
          DFYNE
        </h1>
        <p className="mt-4 text-[12px] font-normal leading-[18px] tracking-[0px] text-black/50">
          Tokens, components, and patterns for the DFYNE brand.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <span className="rounded-full bg-black px-3 py-1 text-[9px] font-semibold uppercase tracking-[1px] leading-[13.5px] text-white">
            Raleway
          </span>
          <span className="rounded-full bg-black px-3 py-1 text-[9px] font-semibold uppercase tracking-[1px] leading-[13.5px] text-white">
            17 Components
          </span>
          <span className="rounded-full border border-black px-3 py-1 text-[9px] font-semibold uppercase tracking-[1px] leading-[13.5px] text-black">
            Figma-verified
          </span>
        </div>
      </div>

      {/* ================================================================== */}
      {/*  COLORS                                                             */}
      {/* ================================================================== */}
      <DocSection id="colors" title="Colors">
        <div className="space-y-10">
          {/* Black palette */}
          <SubSection title="Black">
            <div className="flex flex-wrap gap-3">
              {blackPalette.map((c) => (
                <div key={c.label} className="flex flex-col items-center gap-2">
                  <div
                    className="h-[66px] w-[66px] rounded-[2px] border border-[rgba(0,0,0,0.08)]"
                    style={{ background: c.value }}
                  />
                  <span className="text-[10px] font-semibold text-black">{c.label}</span>
                  <code className="text-[9px] font-semibold tracking-[1px] text-black/40">
                    {c.value}
                  </code>
                </div>
              ))}
            </div>
          </SubSection>

          {/* White palette */}
          <SubSection title="White">
            <div className="flex flex-wrap gap-3">
              {whitePalette.map((c) => (
                <div key={c.label} className="flex flex-col items-center gap-2">
                  <div
                    className="h-[66px] w-[66px] rounded-[2px] border border-[rgba(0,0,0,0.08)]"
                    style={{ background: c.value }}
                  />
                  <span className="text-[10px] font-semibold text-black">{c.label}</span>
                  <code className="text-[9px] font-semibold tracking-[1px] text-black/40">
                    {c.value}
                  </code>
                </div>
              ))}
            </div>
          </SubSection>

          {/* Gray palette */}
          <SubSection title="Gray">
            <div className="flex flex-wrap gap-3">
              {grayPalette.map((c) => (
                <div key={c.label} className="flex flex-col items-center gap-2">
                  <div
                    className="h-[66px] w-[66px] rounded-[2px] border border-[rgba(0,0,0,0.08)]"
                    style={{ background: c.value }}
                  />
                  <span className="text-[10px] font-semibold text-black">{c.label}</span>
                  <code className="text-[9px] font-semibold tracking-[1px] text-black/40">
                    {c.value}
                  </code>
                </div>
              ))}
            </div>
          </SubSection>

          {/* Usage reference */}
          <SubSection title="Usage Reference">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                { role: "Search pill — default border", value: "rgba(0,0,0,0.2)" },
                { role: "Search pill — active border", value: "#000000" },
                { role: "Search pill — active bg", value: "rgba(0,0,0,0.03)" },
                { role: "Search input — bg", value: "rgba(0,0,0,0.03)" },
                { role: "Search input — border", value: "#000000" },
                { role: "Search input — placeholder", value: "#757575" },
                { role: "Announcement bar — bg", value: "#f0f0f0" },
                { role: "Category card gradient", value: "rgba(0,0,0,0.4) → transparent" },
                { role: "Gradient overlay (bottom)", value: "rgba(0,0,0,0.15)" },
              ].map((r) => (
                <div
                  key={r.role}
                  className="flex items-center justify-between rounded-[2px] border border-[rgba(0,0,0,0.08)] px-3 py-2"
                >
                  <span className="text-[10px] text-black/60">{r.role}</span>
                  <code className="text-[9px] font-semibold tracking-[1px] text-black/40">
                    {r.value}
                  </code>
                </div>
              ))}
            </div>
          </SubSection>
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  TYPOGRAPHY                                                         */}
      {/* ================================================================== */}
      <DocSection id="typography" title="Typography">
        <div className="space-y-10">
          {/* Font family */}
          <SubSection title="Font Family">
            <div className="rounded-[4px] border border-[rgba(0,0,0,0.08)] p-6">
              <p
                className="text-[32px] text-black"
                style={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif", fontWeight: 400 }}
              >
                Raleway
              </p>
              <p className="mt-1 text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/40 uppercase">
                Regular 400 · SemiBold 600 · Bold 700
              </p>
              <div className="mt-5 space-y-1">
                <p
                  className="text-[14px] text-black"
                  style={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif", fontWeight: 400 }}
                >
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </p>
                <p
                  className="text-[14px] text-black"
                  style={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif", fontWeight: 400 }}
                >
                  abcdefghijklmnopqrstuvwxyz
                </p>
                <p
                  className="text-[14px] text-black"
                  style={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif", fontWeight: 400 }}
                >
                  0123456789 !@#$%&*()
                </p>
              </div>
            </div>
          </SubSection>

          {/* Figma text styles */}
          <SubSection title="Figma Text Styles">
            <div className="overflow-hidden rounded-[4px] border border-[rgba(0,0,0,0.08)]">
              {/* Table header */}
              <div className="grid grid-cols-[220px_60px_70px_80px_80px_1fr] gap-4 border-b border-[rgba(0,0,0,0.08)] bg-[#F2F2F2] px-4 py-2">
                {["Style Name", "Size", "Weight", "Line Height", "Tracking", "Sample"].map((h) => (
                  <span key={h} className="text-[9px] font-semibold uppercase tracking-[1px] text-black/40">
                    {h}
                  </span>
                ))}
              </div>
              {figmaTextStyles.map((s) => (
                <div
                  key={s.name}
                  className="grid grid-cols-[220px_60px_70px_80px_80px_1fr] items-center gap-4 border-b border-[rgba(0,0,0,0.08)] px-4 py-3 last:border-b-0"
                >
                  <code className="text-[10px] text-black/60">{s.name}</code>
                  <span className="text-[10px] text-black/60">{s.size}</span>
                  <span className="text-[10px] text-black/60">{s.weight}</span>
                  <span className="text-[10px] text-black/60">{s.lineHeight}</span>
                  <span className="text-[10px] text-black/60">{s.tracking}</span>
                  <span
                    className="uppercase text-black"
                    style={{
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

          {/* Weight scale */}
          <SubSection title="Weight Scale">
            <div className="space-y-0">
              {typeWeights.map((w) => (
                <div
                  key={w.label}
                  className="flex items-baseline gap-6 border-b border-[rgba(0,0,0,0.08)] py-4 last:border-b-0"
                >
                  <span className="w-[90px] shrink-0 text-[10px] tracking-[1.2px] text-black/40 uppercase">
                    {w.label}
                  </span>
                  <span className="w-[30px] shrink-0 text-[10px] text-black/40">{w.value}</span>
                  <span
                    className="text-[20px] uppercase text-black"
                    style={{ fontWeight: w.value }}
                  >
                    Impact Collection — DFYNE
                  </span>
                </div>
              ))}
            </div>
          </SubSection>
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  SPACING                                                            */}
      {/* ================================================================== */}
      <DocSection id="spacing" title="Spacing">
        <div className="space-y-2">
          {spacingScale.map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <span className="w-[50px] shrink-0 text-[10px] font-normal tracking-[1.2px] text-black/40 uppercase">
                {s.label}
              </span>
              <div className="h-[4px] rounded-[2px] bg-black" style={{ width: s.value }} />
            </div>
          ))}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  BORDER RADIUS                                                      */}
      {/* ================================================================== */}
      <DocSection id="radius" title="Border Radius">
        <div className="flex flex-wrap gap-8">
          {radiusScale.map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-3">
              <div
                className="h-[66px] w-[66px] border-2 border-black bg-[#F2F2F2]"
                style={{ borderRadius: r.value }}
              />
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-black">
                  {r.label}
                </p>
                <p className="mt-0.5 text-[9px] font-semibold tracking-[1px] text-black/40">
                  {r.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  SHADOWS                                                            */}
      {/* ================================================================== */}
      <DocSection id="shadows" title="Shadows">
        <div className="flex flex-wrap gap-10">
          {shadowScale.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-4">
              <div
                className="h-[80px] w-[120px] rounded-[4px] bg-white"
                style={{ boxShadow: s.value }}
              />
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-black">
                  {s.label}
                </p>
                <p className="mt-1 text-[9px] font-semibold tracking-[1px] text-black/40">{s.note}</p>
                <code className="mt-1 block max-w-[180px] text-center text-[8px] leading-[1.4] text-black/30">
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
        <div className="grid grid-cols-6 gap-3 sm:grid-cols-10">
          {iconNames.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 rounded-[4px] border border-[rgba(0,0,0,0.08)] p-3 transition-colors hover:border-[rgba(0,0,0,0.2)] hover:bg-[rgba(0,0,0,0.03)]"
            >
              <Icon name={name} className="h-5 w-5 text-black" />
              <span className="text-[8px] font-semibold uppercase tracking-[1px] text-black/40">
                {name}
              </span>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  PRIMITIVES                                                         */}
      {/* ================================================================== */}
      <DocSection id="primitives" title="Primitives">
        <div className="space-y-12">
          {/* Badge */}
          <SubSection title="Badge">
            <div className="flex flex-wrap items-center gap-4 rounded-[4px] border border-[rgba(0,0,0,0.08)] p-6">
              <div className="flex flex-col items-center gap-2">
                <Badge text="NEW" />
                <span className="text-[9px] font-semibold uppercase tracking-[1px] text-black/40">Default</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge text="LIMITED EDITION" />
                <span className="text-[9px] font-semibold uppercase tracking-[1px] text-black/40">Text</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge text="MOST WANTED" />
                <span className="text-[9px] font-semibold uppercase tracking-[1px] text-black/40">Long</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge text="LIGHT" variant="light" />
                <span className="text-[9px] font-semibold uppercase tracking-[1px] text-black/40">Light</span>
              </div>
            </div>
            <div className="mt-3 rounded-[2px] bg-[rgba(0,0,0,0.03)] px-4 py-3">
              <p className="text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/50 uppercase">
                Spec: bg-black · rounded-2px · px-2 py-0.5 · text-9px · weight-600 · tracking-1px · white
              </p>
            </div>
          </SubSection>

          {/* Button */}
          <SubSection title="Button">
            <div className="space-y-4">
              <div className="rounded-[4px] border border-[rgba(0,0,0,0.08)] p-6">
                <p className="mb-4 text-[9px] font-semibold uppercase tracking-[1px] text-black/40">
                  Variants
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">ADD TO CART</Button>
                  <Button variant="secondary">COMPLETE THE LOOK</Button>
                  <Button variant="outline">EXPLORE</Button>
                  <Button variant="ghost">VIEW ALL</Button>
                </div>
              </div>
              <div className="rounded-[4px] border border-[rgba(0,0,0,0.08)] p-6">
                <p className="mb-4 text-[9px] font-semibold uppercase tracking-[1px] text-black/40">
                  Sizes
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </div>
            <div className="mt-3 rounded-[2px] bg-[rgba(0,0,0,0.03)] px-4 py-3">
              <p className="text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/50 uppercase">
                PDP Primary: bg-black · text-white · rounded-89px · h-48px · text-9px · bold · tracking-2.8px
              </p>
              <p className="mt-1 text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/50 uppercase">
                PDP Secondary: bg-white · border-black · border-1px · rounded-89px · h-48px
              </p>
            </div>
          </SubSection>

          {/* Arrow Button */}
          <SubSection title="Arrow Button">
            <div className="flex flex-wrap items-center gap-6 rounded-[4px] border border-[rgba(0,0,0,0.08)] p-6">
              {[
                { direction: "left" as const, variant: undefined, label: "Left Default" },
                { direction: "right" as const, variant: undefined, label: "Right Default" },
                { direction: "left" as const, variant: "edge" as const, label: "Left Edge" },
                { direction: "right" as const, variant: "edge" as const, label: "Right Edge" },
              ].map((btn) => (
                <div key={btn.label} className="flex flex-col items-center gap-2">
                  <ArrowButton direction={btn.direction} variant={btn.variant} />
                  <span className="text-[9px] font-semibold uppercase tracking-[1px] text-black/40">
                    {btn.label}
                  </span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-2">
                <ArrowButton direction="left" disabled />
                <span className="text-[9px] font-semibold uppercase tracking-[1px] text-black/40">
                  Disabled
                </span>
              </div>
            </div>
          </SubSection>

          {/* Section Heading */}
          <SubSection title="Section Heading">
            <div className="rounded-[4px] border border-[rgba(0,0,0,0.08)] p-6">
              <SectionHeading eyebrow="JUST LANDED" title="NEW IN WOMEN" />
            </div>
            <div className="mt-3 rounded-[2px] bg-[rgba(0,0,0,0.03)] px-4 py-3">
              <p className="text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/50 uppercase">
                11px · SemiBold · uppercase · tracking-1.5px · line-height-16.5px
              </p>
            </div>
          </SubSection>

          {/* Color Swatch */}
          <SubSection title="Color Swatch">
            <div className="rounded-[4px] border border-[rgba(0,0,0,0.08)] p-6">
              <p className="mb-3 text-[10px] font-normal uppercase tracking-[1.2px] leading-[15px] text-black/60">
                Color:{" "}
                {
                  ["Midnight Black", "Navy", "Teal", "Truffle", "Optic White"][
                    selectedColor
                  ]
                }
              </p>
              <div className="flex gap-3">
                {["Midnight Black", "Navy", "Teal", "Truffle", "Optic White"].map(
                  (color, i) => (
                    <ColorSwatch
                      key={color}
                      image={`https://placehold.co/132x198/${["1c1d1d", "1A2340", "2A8B8B", "7A5040", "f0f0f0"][i]}/${i < 4 ? "ffffff" : "1c1d1d"}?text=${encodeURIComponent(color.slice(0, 2))}`}
                      label={color}
                      selected={i === selectedColor}
                      isNew={i === 0}
                      onClick={() => setSelectedColor(i)}
                    />
                  )
                )}
              </div>
            </div>
            <div className="mt-3 rounded-[2px] bg-[rgba(0,0,0,0.03)] px-4 py-3">
              <p className="text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/50 uppercase">
                Swatch image: 66x99px · rounded-2px
              </p>
            </div>
          </SubSection>

          {/* Size Button */}
          <SubSection title="Size Button">
            <div className="rounded-[4px] border border-[rgba(0,0,0,0.08)] p-6">
              <p className="mb-3 text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/50">
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
              <p className="mt-3 text-[9px] font-semibold uppercase tracking-[1px] text-black/40">
                XL = sold out state
              </p>
            </div>
            <div className="mt-3 rounded-[2px] bg-[rgba(0,0,0,0.03)] px-4 py-3">
              <p className="text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/50 uppercase">
                h-35px · rounded-65px · border border-#cccccc
              </p>
            </div>
          </SubSection>
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  PATTERNS (Figma component patterns)                               */}
      {/* ================================================================== */}
      <DocSection id="patterns" title="Patterns">
        <div className="space-y-12">
          {/* Search pill buttons */}
          <SubSection title="Search Pill Buttons">
            <div className="rounded-[4px] border border-[rgba(0,0,0,0.08)] p-6">
              <div className="flex flex-wrap gap-2">
                {searchPills.map((pill) => {
                  const isActive = pill === activeSearchPill;
                  return (
                    <button
                      key={pill}
                      onClick={() => setActiveSearchPill(pill)}
                      className="h-[34px] rounded-full px-3 text-[10px] font-normal uppercase tracking-[1.2px] leading-[15px] transition-colors"
                      style={{
                        border: isActive ? "1px solid #000000" : "1px solid rgba(0,0,0,0.2)",
                        background: isActive ? "rgba(0,0,0,0.03)" : "transparent",
                        color: "#000000",
                      }}
                    >
                      {pill}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-3 rounded-[2px] bg-[rgba(0,0,0,0.03)] px-4 py-3">
              <p className="text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/50 uppercase">
                h-34px · rounded-full · border border-black/20 · px-3 · text-10px · normal · uppercase · tracking-1.2px
              </p>
              <p className="mt-1 text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/50 uppercase">
                Active: border-black · bg-black/3%
              </p>
            </div>
          </SubSection>

          {/* Search input */}
          <SubSection title="Search Input">
            <div className="rounded-[4px] border border-[rgba(0,0,0,0.08)] p-6">
              <div className="relative max-w-[320px]">
                <Icon
                  name="search"
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black"
                />
                <input
                  type="text"
                  placeholder="Search styles, fits, collections..."
                  className="h-[40px] w-full rounded-full pl-10 pr-10 text-[12px] font-normal leading-[18px] outline-none"
                  style={{
                    border: "1px solid #000000",
                    background: "rgba(0,0,0,0.03)",
                    color: "#000000",
                  }}
                />
              </div>
            </div>
            <div className="mt-3 rounded-[2px] bg-[rgba(0,0,0,0.03)] px-4 py-3">
              <p className="text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/50 uppercase">
                h-40px · rounded-full · border border-black · bg-black/3% · pl-10 pr-10 · text-12px · placeholder #757575
              </p>
            </div>
          </SubSection>

          {/* Popular Right Now grid */}
          <SubSection title="Popular Right Now — 2x2 Grid">
            <div className="grid max-w-[500px] grid-cols-2 gap-2">
              {[
                { category: "LEGGINGS", badge: "NEW", color: "1c1d1d" },
                { category: "SPORTS BRAS", badge: null, color: "333333" },
                { category: "SHORTS", badge: "NEW", color: "555555" },
                { category: "TOPS", badge: null, color: "888888" },
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
                  {/* Bottom gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)",
                    }}
                  />
                  {/* Category label */}
                  <span
                    className="absolute bottom-3 left-3 text-white uppercase"
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      lineHeight: "16.5px",
                      letterSpacing: "1.5px",
                    }}
                  >
                    {item.category}
                  </span>
                  {/* NEW badge */}
                  {item.badge && (
                    <span
                      className="absolute left-3 top-3 bg-black text-white uppercase"
                      style={{
                        fontSize: "9px",
                        fontWeight: 600,
                        lineHeight: "13.5px",
                        letterSpacing: "1px",
                        borderRadius: "2px",
                        padding: "2px 8px",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-[2px] bg-[rgba(0,0,0,0.03)] px-4 py-3">
              <p className="text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/50 uppercase">
                2x2 grid · aspect-3/4 · bg-#f2f2f2 · gradient rgba(0,0,0,0.4)→transparent
              </p>
              <p className="mt-1 text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/50 uppercase">
                Category: 11px semibold uppercase tracking-1.5px white
              </p>
              <p className="mt-1 text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/50 uppercase">
                NEW badge: bg-black · rounded-2px · px-2 py-0.5 · 9px semibold tracking-1px
              </p>
            </div>
          </SubSection>

          {/* Mobile menu toggle */}
          <SubSection title="Mobile Menu — Women / Men Toggle">
            <div className="rounded-[4px] border border-[rgba(0,0,0,0.08)] p-6">
              <MobileMenuToggle />
            </div>
            <div className="mt-3 rounded-[2px] bg-[rgba(0,0,0,0.03)] px-4 py-3">
              <p className="text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/50 uppercase">
                rounded-full pills · h-33px · text-11px · uppercase · tracking-1.5px
              </p>
            </div>
          </SubSection>

          {/* Menu nav item */}
          <SubSection title="Menu Nav Items">
            <div className="max-w-[300px] rounded-[4px] border border-[rgba(0,0,0,0.08)]">
              {["NEW IN", "CLOTHING", "COLLECTIONS", "ACCESSORIES", "SALE"].map((item) => (
                <div
                  key={item}
                  className="flex h-[48px] items-center justify-between border-b border-[rgba(0,0,0,0.08)] px-4 last:border-b-0"
                >
                  <span
                    className="uppercase text-black"
                    style={{
                      fontSize: "12px",
                      fontWeight: 400,
                      lineHeight: "18px",
                      letterSpacing: "2px",
                    }}
                  >
                    {item}
                  </span>
                  <Icon name="chevron-right" className="h-4 w-4 text-black/40" />
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-[2px] bg-[rgba(0,0,0,0.03)] px-4 py-3">
              <p className="text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/50 uppercase">
                text-12px · uppercase · tracking-2px · h-48px items
              </p>
            </div>
          </SubSection>
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  CARDS                                                              */}
      {/* ================================================================== */}
      <DocSection id="cards" title="Cards">
        <div className="space-y-12">
          {/* Product Card */}
          <SubSection title="Product Card">
            <div className="flex gap-4 overflow-x-auto rounded-[4px] border border-[rgba(0,0,0,0.08)] p-6">
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

          {/* Category Card */}
          <SubSection title="Category Card">
            <div className="flex gap-3 overflow-x-auto rounded-[4px] border border-[rgba(0,0,0,0.08)] p-6">
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

          {/* Cross-Sell Card */}
          <SubSection title="Cross-Sell Card">
            <div className="flex gap-3 rounded-[4px] border border-[rgba(0,0,0,0.08)] p-6">
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
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  RAILS (full-width outside DocSection)                             */}
      {/* ================================================================== */}
      <section id="rails" className="scroll-mt-20 border-b border-[rgba(0,0,0,0.08)] py-16">
        <div className="mx-auto max-w-[1100px] px-6">
          <h2 className="mb-10 text-[11px] font-semibold uppercase tracking-[1.5px] leading-[16.5px] text-black">
            Rails
          </h2>
        </div>
        <div className="mb-10">
          <div className="mx-auto max-w-[1100px] px-6 pb-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[1.5px] leading-[16.5px] text-black/40">
              Product Rail
            </h3>
          </div>
          <ProductRail
            id="preview-product-rail"
            eyebrow="JUST LANDED"
            title="NEW IN WOMEN"
            products={[
              {
                image: "https://placehold.co/394x492/f2f2f2/1c1d1d?text=1",
                name: "Impact Longsleeve Top",
                color: "Pebble Grey",
                price: 52.2,
                rating: 4.8,
                reviewCount: 52866,
                badge: "NEW",
              },
              {
                image: "https://placehold.co/394x492/f2f2f2/1c1d1d?text=2",
                name: "Impact Flares",
                color: "Raspberry",
                price: 52.2,
                rating: 4.8,
                reviewCount: 52866,
              },
              {
                image: "https://placehold.co/394x492/f2f2f2/1c1d1d?text=3",
                name: "Origin Halter Bra",
                color: "Espresso",
                price: 38.99,
                rating: 4.9,
                reviewCount: 12400,
                badge: "NEW",
              },
              {
                image: "https://placehold.co/394x492/f2f2f2/1c1d1d?text=4",
                name: "Defy Strappy Top",
                color: "Midnight Black",
                price: 36.99,
                rating: 4.7,
                reviewCount: 8200,
              },
              {
                image: "https://placehold.co/394x492/f2f2f2/1c1d1d?text=5",
                name: "Dynamic Leggings",
                color: "Wine",
                price: 48,
                rating: 4.8,
                reviewCount: 34000,
                badge: "NEW",
              },
              {
                image: "https://placehold.co/394x492/f2f2f2/1c1d1d?text=6",
                name: "Vision Shorts",
                color: "Midnight Plum",
                price: 42,
                rating: 4.6,
                reviewCount: 15000,
              },
            ]}
          />
        </div>

        <div className="mb-10">
          <div className="mx-auto max-w-[1100px] px-6 pb-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[1.5px] leading-[16.5px] text-black/40">
              Category Rail
            </h3>
          </div>
          <CategoryRail
            cards={[
              {
                image: "https://placehold.co/600x781/1c1d1d/ffffff?text=IMPACT",
                title: "IMPACT",
                href: "#",
                caption: "High Support",
              },
              {
                image: "https://placehold.co/600x781/333333/ffffff?text=ORIGIN",
                title: "ORIGIN",
                href: "#",
                caption: "Soft Sculpt",
              },
              {
                image: "https://placehold.co/600x781/555555/ffffff?text=DEFY",
                title: "DEFY",
                href: "#",
              },
              {
                image: "https://placehold.co/600x781/888888/ffffff?text=VISION",
                title: "VISION",
                href: "#",
              },
            ]}
          />
        </div>

        <div>
          <div className="mx-auto max-w-[1100px] px-6 pb-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[1.5px] leading-[16.5px] text-black/40">
              Cross-Sell Rail
            </h3>
          </div>
          <CrossSellRail
            title="COMPLETE THE LOOK"
            products={[
              {
                image: "https://placehold.co/246x308/f2f2f2/1c1d1d?text=Shorts",
                name: "Impact Shorts",
                color: "Midnight Black",
                price: 49,
              },
              {
                image: "https://placehold.co/246x308/f2f2f2/1c1d1d?text=Zippy",
                name: "Impact Half Zippy",
                color: "Midnight Black",
                price: 69,
              },
              {
                image: "https://placehold.co/246x308/f2f2f2/1c1d1d?text=Flares",
                name: "Origin Flares",
                color: "Midnight Black",
                price: 69,
              },
              {
                image: "https://placehold.co/246x308/f2f2f2/1c1d1d?text=Bandeau",
                name: "Backless Bandeau",
                color: "Midnight Black",
                price: 49,
              },
            ]}
          />
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SECTIONS                                                           */}
      {/* ================================================================== */}
      <section id="sections" className="scroll-mt-20 border-b border-[rgba(0,0,0,0.08)] py-16">
        <div className="mx-auto max-w-[1100px] px-6">
          <h2 className="mb-10 text-[11px] font-semibold uppercase tracking-[1.5px] leading-[16.5px] text-black">
            Sections
          </h2>
        </div>

        {/* Announcement Bar */}
        <div className="mb-2">
          <div className="mx-auto max-w-[1100px] px-6 pb-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[1.5px] leading-[16.5px] text-black/40">
              Announcement Bar
            </h3>
            <p className="mt-1 text-[10px] font-normal leading-[15px] tracking-[1.2px] text-black/40 uppercase">
              bg-#f0f0f0 · text-black
            </p>
          </div>
          <AnnouncementBar
            slides={[
              { text: "HASSLE-FREE RETURNS", detail: "100-day free returns*" },
              { text: "FREE TRACKED DELIVERY", detail: "On orders over £30" },
              { text: "REWARDS PROGRAM", detail: "Earn points with every order" },
            ]}
          />
        </div>

        {/* Campaign Hero */}
        <div className="mb-12 mt-10">
          <div className="mx-auto max-w-[1100px] px-6 pb-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[1.5px] leading-[16.5px] text-black/40">
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
          <div className="mx-auto max-w-[1100px] px-6 pb-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[1.5px] leading-[16.5px] text-black/40">
              Newsletter Signup
            </h3>
          </div>
          <NewsletterSignup onSubmit={(email) => alert(`Subscribed: ${email}`)} />
        </div>

        {/* Footer */}
        <div>
          <div className="mx-auto max-w-[1100px] px-6 pb-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[1.5px] leading-[16.5px] text-black/40">
              Footer
            </h3>
          </div>
          <Footer
            columns={[
              {
                heading: "Account",
                links: ["Login", "Register", "Rewards", "Track My Order"],
              },
              { heading: "About", links: ["About", "Careers", "Sustainability"] },
              {
                heading: "Contact",
                links: ["Contact Us", "Privacy Policy", "Terms & Conditions"],
              },
              {
                heading: "Delivery & Returns",
                links: ["Shipping", "Returns", "International"],
              },
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
              fontSize: "11px",
              fontWeight: isActive ? 600 : 400,
              lineHeight: "16.5px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              background: isActive ? "#000000" : "transparent",
              color: isActive ? "#ffffff" : "#000000",
            }}
          >
            {tab === "women" ? "Women" : "Men"}
          </button>
        );
      })}
    </div>
  );
}
