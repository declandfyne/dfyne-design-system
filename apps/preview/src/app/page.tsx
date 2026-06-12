"use client";

import { useState } from "react";
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

import { ComponentCard } from "../components/ComponentCard";
import type { ComponentVariant } from "../components/ComponentCard";
import { ModeToggle, useMode } from "../components/ModeToggle";
import { SearchFilter } from "../components/SearchFilter";
import { UsageCard } from "../components/UsageCard";
import { componentSpecs } from "../data/componentSpecs";
import type { ComponentSpecData } from "../data/componentSpecs";
import { usageGuidelines } from "../data/usageGuidelines";
import {
  blackScale,
  whiteScale,
  grayScale,
  textScale,
  colorGridColumns,
  figmaTextStyles,
  typeWeights,
  spacingScale,
  radiusScale,
  shadowScale,
  aspectRatios,
  componentTypography,
  iconNames,
} from "../data/tokenData";
import type { ColorStep } from "../data/tokenData";

/* ------------------------------------------------------------------ */
/*  Render map: maps component spec name → live React render per variant */
/* ------------------------------------------------------------------ */

function getVariantRenders(spec: ComponentSpecData): Record<string, React.ReactNode> {
  switch (spec.name) {
    case "Button":
      return {
        Primary: <Button variant="primary">ADD TO CART</Button>,
        Secondary: <Button variant="secondary">COMPLETE THE LOOK</Button>,
        Tertiary: <Button variant="tertiary">Size Guide</Button>,
        Disabled: <Button disabled>SOLD OUT</Button>,
      };
    case "Badge":
      return {
        "Custom (NEW)": <Badge text="NEW" variant="custom" position="inline" />,
        "Sold Out": <Badge text="Sold Out" variant="sold-out" position="inline" />,
        "Bottom Label": <Badge text="Best Seller" variant="bottom" position="inline" />,
      };
    case "Size Button":
      return {
        Default: (
          <div className="flex gap-2">
            <SizeButton label="XS" selected={false} soldOut={false} onClick={() => {}} />
            <SizeButton label="S" selected={false} soldOut={false} onClick={() => {}} />
            <SizeButton label="M" selected={true} soldOut={false} onClick={() => {}} />
            <SizeButton label="L" selected={false} soldOut={false} onClick={() => {}} />
          </div>
        ),
        Selected: <SizeButton label="M" selected={true} soldOut={false} onClick={() => {}} />,
        "Sold Out": <SizeButton label="XL" selected={false} soldOut={true} onClick={() => {}} />,
      };
    case "Arrow Button":
      return {
        Default: (
          <div className="flex gap-4">
            <ArrowButton direction="left" />
            <ArrowButton direction="right" />
          </div>
        ),
        Edge: (
          <div className="flex gap-4">
            <ArrowButton direction="left" variant="edge" />
            <ArrowButton direction="right" variant="edge" />
          </div>
        ),
      };
    case "Section Heading":
      return {
        Default: <SectionHeading eyebrow="JUST LANDED" title="NEW IN WOMEN" />,
      };
    case "Product Card":
      return {
        Default: (
          <ProductCard
            image="https://placehold.co/394x492/f2f2f2/1c1d1d?text=Impact+Top"
            name="Impact Longsleeve Top"
            color="Pebble Grey"
            price={52.2}
            rating={4.8}
            reviewCount={52866}
            badge="NEW"
          />
        ),
      };
    case "Category Card":
      return {
        Default: (
          <CategoryCard
            image="https://placehold.co/600x781/1c1d1d/ffffff?text=IMPACT"
            title="IMPACT"
            href="#"
            caption="High Support"
            className="!w-[280px]"
          />
        ),
      };
    case "Color Swatch":
      return {
        Default: (
          <div className="flex gap-3">
            <ColorSwatch image="https://placehold.co/132x198/1c1d1d/ffffff" label="Midnight Black" selected={true} isNew={true} onClick={() => {}} />
            <ColorSwatch image="https://placehold.co/132x198/1A2340/ffffff" label="Navy" selected={false} onClick={() => {}} />
            <ColorSwatch image="https://placehold.co/132x198/2A8B8B/ffffff" label="Teal" selected={false} onClick={() => {}} />
          </div>
        ),
        Selected: <ColorSwatch image="https://placehold.co/132x198/1c1d1d/ffffff" label="Midnight Black" selected={true} onClick={() => {}} />,
      };
    case "Cross-Sell Card":
      return {
        Default: (
          <CrossSellCard
            image="https://placehold.co/246x308/f2f2f2/1c1d1d?text=Shorts"
            name="Impact Shorts | 4.5&quot;"
            color="Midnight Black"
            price={49}
          />
        ),
      };
    case "Campaign Hero":
      return {
        Default: (
          <div className="w-full">
            <CampaignHero
              image="https://placehold.co/1920x1080/1c1d1d/ffffff?text=CAMPAIGN+HERO"
              caption="NEW STYLES, NEW STRENGTH"
              heading="IMPACT"
              cta={{ label: "SHOP NOW", href: "#" }}
              secondaryCta={{ label: "EXPLORE", href: "#" }}
            />
          </div>
        ),
      };
    case "Announcement Bar":
      return {
        Default: (
          <div className="w-full">
            <AnnouncementBar
              slides={[
                { text: "HASSLE-FREE RETURNS", detail: "100-day free returns*" },
                { text: "FREE TRACKED DELIVERY", detail: "On orders over £30" },
              ]}
            />
          </div>
        ),
      };
    case "Newsletter Signup":
      return {
        Default: (
          <div className="w-full">
            <NewsletterSignup onSubmit={() => {}} />
          </div>
        ),
      };
    case "Footer":
      return {
        Default: (
          <div className="w-full">
            <Footer
              columns={[
                { heading: "Account", links: ["Login", "Register", "Rewards", "Track My Order"] },
                { heading: "About", links: ["About", "Careers", "Sustainability"] },
                { heading: "Contact", links: ["Contact Us", "Privacy Policy", "Terms & Conditions"] },
                { heading: "Delivery & Returns", links: ["Shipping", "Returns", "International"] },
              ]}
            />
          </div>
        ),
      };
    default:
      return {};
  }
}

/* ------------------------------------------------------------------ */
/*  Layout helpers                                                     */
/* ------------------------------------------------------------------ */

const sysFont = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

function DocSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16 border-b border-[#e8e8e8] py-20">
      <div className="mx-auto max-w-[1200px] px-8">
        <h2 className="mb-12 text-2xl font-light tracking-tight text-[#1a1a1a]" style={{ fontFamily: sysFont }}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-14 last:mb-0">
      <h3 className="mb-5 text-[13px] font-medium text-[#6f6f6f]" style={{ fontFamily: sysFont }}>{title}</h3>
      {children}
    </div>
  );
}

function ColorGridRow({ rowLabel, steps, totalCols }: { rowLabel: string; steps: ColorStep[]; totalCols: number }) {
  const paddedSteps: (ColorStep | null)[] = Array.from({ length: totalCols }, (_, i) => steps[i] ?? null);
  return (
    <div className="flex">
      <div className="flex w-[120px] shrink-0 items-center pr-4" style={{ fontFamily: sysFont }}>
        <span className="text-[13px] font-medium text-[#1a1a1a]">{rowLabel}</span>
      </div>
      <div className="flex flex-1">
        {paddedSteps.map((step, i) =>
          step ? (
            <div key={i} className="group relative flex-1 cursor-default" style={{ height: "52px", background: step.value }} title={`${step.label} — ${step.hex}`}>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-start justify-end px-2 pb-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-[10px] font-medium leading-tight" style={{ color: step.textDark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.75)", fontFamily: "ui-monospace, 'Cascadia Code', Menlo, monospace" }}>
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
/*  Nav items                                                          */
/* ------------------------------------------------------------------ */

const navItems = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "ratios", label: "Ratios" },
  { id: "spacing", label: "Spacing" },
  { id: "radius", label: "Radius" },
  { id: "shadows", label: "Shadows" },
  { id: "icons", label: "Icons" },
  { id: "components", label: "Components" },
  { id: "usage", label: "Usage" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PreviewPage() {
  const [mode, setMode] = useMode();
  const [search, setSearch] = useState("");

  const filteredSpecs = componentSpecs.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: sysFont }} suppressHydrationWarning>

      {/* ---- STICKY NAV ---- */}
      <header className="sticky top-0 z-50 border-b border-[#e8e8e8] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1200px] items-center gap-6 px-8" style={{ height: "52px" }}>
          <span className="shrink-0 text-[15px] font-semibold tracking-tight text-[#1a1a1a]">DFYNE</span>
          <nav className="no-scrollbar flex flex-1 items-center gap-0 overflow-x-auto">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="rounded px-3 py-1.5 text-[13px] text-[#6f6f6f] transition-colors hover:bg-[#f5f5f5] hover:text-[#1a1a1a]">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <SearchFilter value={search} onChange={setSearch} />
            <ModeToggle mode={mode} onModeChange={setMode} />
          </div>
        </div>
      </header>

      {/* ---- HERO ---- */}
      <div className="relative overflow-hidden pb-24 pt-20 text-center" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,210,195,0.35) 0%, rgba(255,235,225,0.18) 45%, rgba(255,255,255,0) 75%), #ffffff" }}>
        <p className="text-[12px] font-medium text-[#a08070]">Design System v0.1.0</p>
        <h1 className="mt-4 text-[64px] font-light tracking-tight text-[#1a1a1a]" style={{ lineHeight: 1.05 }}>DFYNE Design System</h1>
        <p className="mx-auto mt-5 max-w-[480px] text-[16px] font-normal leading-relaxed text-[#8f8f8f]">
          Tokens, components, and patterns — verified against the live Shopify theme.
        </p>
        <div className="mt-8 flex justify-center gap-2.5">
          <span className="rounded-full border border-[#e0e0e0] px-4 py-1.5 text-[12px] text-[#6f6f6f]">Raleway</span>
          <span className="rounded-full border border-[#e0e0e0] px-4 py-1.5 text-[12px] text-[#6f6f6f]">17 Components</span>
          <span className="rounded-full bg-[#1a1a1a] px-4 py-1.5 text-[12px] text-white">Live-verified</span>
        </div>
      </div>

      {/* ================================================================== */}
      {/*  TOKENS: Colors                                                     */}
      {/* ================================================================== */}
      <DocSection id="colors" title="Colors">
        <div className="mb-3 flex">
          <div className="w-[120px] shrink-0" />
          <div className="flex flex-1">
            {colorGridColumns.map((col) => (
              <div key={col} className="flex-1 px-1">
                <span className="block text-[11px] font-medium text-[#a0a0a0]" style={{ fontFamily: sysFont }}>{col}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-[8px] border border-[#e8e8e8]">
          <ColorGridRow rowLabel="Black" steps={blackScale} totalCols={7} />
          <div className="border-t border-[#e8e8e8]" />
          <ColorGridRow rowLabel="White" steps={whiteScale} totalCols={7} />
          <div className="border-t border-[#e8e8e8]" />
          <ColorGridRow rowLabel="Gray" steps={grayScale} totalCols={7} />
          <div className="border-t border-[#e8e8e8]" />
          <ColorGridRow rowLabel="Text" steps={textScale} totalCols={7} />
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  TOKENS: Typography                                                 */}
      {/* ================================================================== */}
      <DocSection id="typography" title="Typography">
        <SubSection title="Font family">
          <div className="rounded-[8px] border border-[#e8e8e8] p-8">
            <p className="text-[36px] text-[#1a1a1a]" style={{ fontFamily: "Raleway, Arial, Helvetica, sans-serif", fontWeight: 400 }}>Raleway</p>
            <p className="mt-1 text-[13px] text-[#8f8f8f]">Regular 400 · SemiBold 600 · Bold 700</p>
          </div>
        </SubSection>

        <SubSection title="Text styles">
          <div className="overflow-hidden rounded-[8px] border border-[#e8e8e8]">
            <div className="grid gap-4 border-b border-[#e8e8e8] bg-[#fafafa] px-5 py-3" style={{ gridTemplateColumns: "160px 56px 56px 80px 70px 1fr" }}>
              {["Component", "Size", "Weight", "Line Ht", "Tracking", "Sample"].map((h) => (
                <span key={h} className="text-[11px] font-medium text-[#a0a0a0]">{h}</span>
              ))}
            </div>
            {figmaTextStyles.map((s) => (
              <div key={s.name} className="grid items-center gap-4 border-b border-[#e8e8e8] px-5 py-3 last:border-b-0" style={{ gridTemplateColumns: "160px 56px 56px 80px 70px 1fr" }}>
                <span className="text-[12px] font-medium text-[#4a4a4a]">{s.name}</span>
                <span className="text-[12px] text-[#8f8f8f]">{s.size}</span>
                <span className="text-[12px] text-[#8f8f8f]">{s.weight}</span>
                <span className="text-[12px] text-[#8f8f8f]">{s.lineHeight}</span>
                <span className="text-[12px] text-[#8f8f8f]">{s.tracking}</span>
                <span className="text-[#1a1a1a]" style={{
                  fontFamily: s.name === "Product price" ? "sans-serif" : "Raleway, Arial, sans-serif",
                  fontSize: s.size, fontWeight: s.weight, lineHeight: s.lineHeight, letterSpacing: s.tracking,
                }}>
                  {s.sample}
                </span>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="Weight scale">
          <div>
            {typeWeights.map((w) => (
              <div key={w.label} className="flex items-baseline gap-6 border-b border-[#e8e8e8] py-5 last:border-b-0">
                <span className="w-[90px] shrink-0 text-[13px] text-[#8f8f8f]">{w.label}</span>
                <span className="w-[32px] shrink-0 text-[13px] text-[#c0c0c0]">{w.value}</span>
                <span className="text-[22px] uppercase text-[#1a1a1a]" style={{ fontFamily: "Raleway, Arial, sans-serif", fontWeight: w.value }}>
                  Impact Collection — DFYNE
                </span>
              </div>
            ))}
          </div>
        </SubSection>
      </DocSection>

      {/* ================================================================== */}
      {/*  TOKENS: Aspect Ratios                                              */}
      {/* ================================================================== */}
      <DocSection id="ratios" title="Image aspect ratios">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {aspectRatios.map((r) => {
            const [w, h] = r.ratio.split(":").map(Number);
            return (
              <div key={r.label} className="flex flex-col gap-3">
                <div className="w-full overflow-hidden rounded-[4px] border border-[#e8e8e8] bg-[#f5f5f5]" style={{ aspectRatio: `${w} / ${h}` }}>
                  <div className="flex h-full items-center justify-center">
                    <span className="text-[11px] text-[#a0a0a0]">{r.ratio}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#1a1a1a]">{r.label}</p>
                  <code className="text-[11px] text-[#8f8f8f]" style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>{r.css}</code>
                  <p className="mt-0.5 text-[11px] text-[#a0a0a0]">{r.usage}</p>
                </div>
              </div>
            );
          })}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  TOKENS: Spacing                                                    */}
      {/* ================================================================== */}
      <DocSection id="spacing" title="Spacing">
        <div className="space-y-3">
          {spacingScale.map((s) => (
            <div key={s.label} className="flex items-center gap-5">
              <code className="w-[48px] shrink-0 text-[12px] text-[#8f8f8f]" style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>{s.label}</code>
              <div className="h-[3px] rounded-full bg-[#1a1a1a]" style={{ width: s.value }} />
            </div>
          ))}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  TOKENS: Radius                                                     */}
      {/* ================================================================== */}
      <DocSection id="radius" title="Border radius">
        <div className="flex flex-wrap gap-10">
          {radiusScale.map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-4">
              <div className="h-[72px] w-[72px] border-2 border-[#1a1a1a] bg-[#f5f5f5]" style={{ borderRadius: r.value }} />
              <div className="text-center">
                <code className="block text-[13px] text-[#1a1a1a]" style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>{r.label}</code>
                <span className="mt-0.5 block text-[11px] text-[#a0a0a0]">{r.note}</span>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  TOKENS: Shadows                                                    */}
      {/* ================================================================== */}
      <DocSection id="shadows" title="Shadows">
        <div className="flex flex-wrap gap-12">
          {shadowScale.map((s) => (
            <div key={s.label} className="flex flex-col items-start gap-4">
              <div className="h-[80px] w-[140px] rounded-[8px] bg-white" style={{ boxShadow: s.value, border: "1px solid #f0f0f0" }} />
              <div>
                <p className="text-[14px] font-medium text-[#1a1a1a]">{s.label}</p>
                <p className="mt-0.5 text-[12px] text-[#8f8f8f]">{s.note}</p>
                <code className="mt-1 block text-[11px] text-[#a0a0a0]" style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>{s.value}</code>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  TOKENS: Icons                                                      */}
      {/* ================================================================== */}
      <DocSection id="icons" title="Icons">
        <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
          {iconNames.map((name) => (
            <div key={name} className="flex flex-col items-center gap-2.5 rounded-[6px] border border-[#e8e8e8] px-2 py-3 transition-colors hover:border-[#d0d0d0] hover:bg-[#fafafa]">
              <Icon name={name} className="h-5 w-5 text-[#1a1a1a]" />
              <code className="text-center text-[9px] leading-tight text-[#a0a0a0]" style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>{name}</code>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ================================================================== */}
      {/*  COMPONENTS — Interactive cards with spec panels                    */}
      {/* ================================================================== */}
      <section id="components" className="scroll-mt-16 border-b border-[#e8e8e8] py-20">
        <div className="mx-auto max-w-[1200px] px-8">
          <h2 className="mb-12 text-2xl font-light tracking-tight text-[#1a1a1a]" style={{ fontFamily: sysFont }}>Components</h2>
          <div className="space-y-16">
            {filteredSpecs.map((spec) => {
              const renders = getVariantRenders(spec);
              const variants: ComponentVariant[] = spec.variants.map((v) => ({
                name: v.name,
                render: renders[v.name] ?? <div className="text-[#a0a0a0]">No preview</div>,
                specs: v.specs,
              }));

              return (
                <ComponentCard
                  key={spec.name}
                  name={spec.name}
                  figmaPath={spec.figmaPath}
                  liquidCode={spec.liquidCode}
                  reactCode={spec.reactCode}
                  variants={variants}
                  mode={mode}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  USAGE GUIDELINES                                                   */}
      {/* ================================================================== */}
      <section id="usage" className="scroll-mt-16 border-b border-[#e8e8e8] py-20">
        <div className="mx-auto max-w-[1200px] px-8">
          <h2 className="mb-12 text-2xl font-light tracking-tight text-[#1a1a1a]" style={{ fontFamily: sysFont }}>Usage Guidelines</h2>
          <div className="space-y-8">
            {(search
              ? usageGuidelines.filter((g) =>
                  g.component.toLowerCase().includes(search.toLowerCase())
                )
              : usageGuidelines
            ).map((guideline) => (
              <UsageCard key={guideline.component} guideline={guideline} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
