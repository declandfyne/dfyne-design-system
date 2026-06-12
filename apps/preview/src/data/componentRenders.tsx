"use client";

import React from "react";
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
  CampaignHero,
  AnnouncementBar,
  NewsletterSignup,
  Footer,
  QuantityInput,
  Accordion,
  AccordionItem,
  Search,
  ProductGallery,
  FilterPanel,
  CollectionGrid,
  QuickShopModal,
} from "@dfyne/react";
import type { IconName } from "@dfyne/react";

export function renderComponent(name: string, props: Record<string, unknown>): React.ReactNode {
  switch (name) {
    case "Button":
      return (
        <Button
          variant={props.variant as "primary" | "secondary" | "tertiary" | "ghost" | undefined}
          disabled={props.disabled as boolean | undefined}
        >
          {(props.children as string) ?? "ADD TO CART"}
        </Button>
      );

    case "Badge":
      return (
        <Badge
          text={(props.text as string) ?? "NEW"}
          variant={props.variant as "custom" | "sold-out" | "sale" | "bottom" | undefined}
          position={props.position as "top-right" | "bottom-left" | "inline" | undefined}
        />
      );

    case "Size Button":
      return (
        <SizeButton
          label={(props.label as string) ?? "M"}
          selected={(props.selected as boolean) ?? false}
          soldOut={(props.soldOut as boolean) ?? false}
          onClick={() => {}}
        />
      );

    case "Arrow Button":
      return (
        <ArrowButton
          direction={(props.direction as "left" | "right") ?? "right"}
          variant={props.variant as "default" | "edge" | undefined}
          disabled={props.disabled as boolean | undefined}
        />
      );

    case "Section Heading":
      return (
        <SectionHeading
          eyebrow={(props.eyebrow as string) ?? "JUST LANDED"}
          title={(props.title as string) ?? "NEW IN WOMEN"}
        />
      );

    case "Product Card":
      return (
        <ProductCard
          image="https://placehold.co/394x492/f2f2f2/1c1d1d?text=Impact+Top"
          name={(props.name as string) ?? "Impact Longsleeve Top"}
          color={(props.color as string) ?? "Pebble Grey"}
          price={(props.price as number) ?? 52.2}
          badge={props.badge as string | undefined}
          rating={4.8}
          reviewCount={52866}
        />
      );

    case "Category Card":
      return (
        <div style={{ width: 280 }}>
          <CategoryCard
            image="https://placehold.co/600x781/1c1d1d/ffffff?text=IMPACT"
            title={(props.title as string) ?? "IMPACT"}
            caption={props.caption as string | undefined}
            href="#"
          />
        </div>
      );

    case "Color Swatch":
      return (
        <ColorSwatch
          image="https://placehold.co/132x198/1c1d1d/ffffff"
          label={(props.label as string) ?? "Midnight Black"}
          selected={(props.selected as boolean) ?? false}
          isNew={props.isNew as boolean | undefined}
          onClick={() => {}}
        />
      );

    case "Cross-Sell Card":
      return (
        <CrossSellCard
          image="https://placehold.co/246x308/f2f2f2/1c1d1d?text=Shorts"
          name={(props.name as string) ?? "Impact Shorts"}
          color={(props.color as string) ?? "Midnight Black"}
          price={(props.price as number) ?? 49}
        />
      );

    case "Campaign Hero":
      return (
        <div className="w-full">
          <CampaignHero
            image="https://placehold.co/1920x1080/1c1d1d/ffffff?text=CAMPAIGN+HERO"
            caption={(props.caption as string) ?? "NEW STYLES, NEW STRENGTH"}
            heading={(props.heading as string) ?? "IMPACT"}
            cta={{ label: "SHOP NOW", href: "#" }}
            secondaryCta={{ label: "EXPLORE", href: "#" }}
          />
        </div>
      );

    case "Announcement Bar":
      return (
        <div className="w-full">
          <AnnouncementBar
            slides={[
              { text: "HASSLE-FREE RETURNS", detail: "100-day free returns*" },
              { text: "FREE TRACKED DELIVERY", detail: "On orders over £30" },
            ]}
            interval={props.interval as number | undefined}
          />
        </div>
      );

    case "Newsletter Signup":
      return (
        <div className="w-full">
          <NewsletterSignup onSubmit={() => {}} />
        </div>
      );

    case "Footer":
      return (
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
      );

    case "Icon":
      return (
        <Icon
          name={(props.name as IconName) ?? "cart"}
          className="h-8 w-8"
        />
      );

    case "Quantity Input":
      return (
        <QuantityInput
          value={(props.value as number) ?? 1}
          onChange={() => {}}
          min={(props.min as number) ?? 1}
          max={(props.max as number) ?? 10}
          disabled={props.disabled as boolean | undefined}
        />
      );

    case "Accordion":
      return (
        <Accordion allowMultiple={props.allowMultiple as boolean | undefined}>
          <AccordionItem title="Description" defaultOpen>
            Engineered for high-impact training, this longsleeve top features
            sweat-wicking fabric and four-way stretch for unrestricted movement.
          </AccordionItem>
          <AccordionItem title="Size Guide">
            Model is 5&apos;9&quot; and wears size S. See full size chart for
            detailed measurements.
          </AccordionItem>
          <AccordionItem title="Delivery &amp; Returns">
            Free tracked delivery on orders over £30. 100-day hassle-free
            returns on all orders.
          </AccordionItem>
        </Accordion>
      );

    case "Search":
      return (
        <Search
          value={(props.value as string) ?? ""}
          onChange={() => {}}
          results={[
            { id: "1", title: "Power Legging", price: "£54.00", type: "product" },
            { id: "2", title: "Impact Longsleeve Top", price: "£52.20", type: "product" },
            { id: "3", title: "Leggings", type: "collection" },
          ]}
          placeholder={(props.placeholder as string) ?? "Search products..."}
          loading={props.loading as boolean | undefined}
        />
      );

    case "Product Gallery":
      return (
        <div style={{ maxWidth: 400 }}>
          <ProductGallery
            images={[
              { src: "https://placehold.co/400x500/e8e8e1/111?text=Front", alt: "Front" },
              { src: "https://placehold.co/400x500/e8e8e1/111?text=Back", alt: "Back" },
              { src: "https://placehold.co/400x500/e8e8e1/111?text=Detail", alt: "Detail" },
            ]}
          />
        </div>
      );

    case "Filter Panel":
      return (
        <FilterPanel
          filters={[
            { key: "color", label: "Color", type: "checkbox", options: [
              { value: "black", label: "Black", count: 12, selected: false },
              { value: "white", label: "White", count: 8, selected: true },
            ]},
            { key: "size", label: "Size", type: "checkbox", options: [
              { value: "s", label: "S", selected: false },
              { value: "m", label: "M", selected: true },
            ]},
          ]}
          onFilterChange={() => {}}
          sortOptions={[
            { value: "featured", label: "Featured" },
            { value: "price-asc", label: "Price: Low to High" },
          ]}
          sortValue="featured"
          onSortChange={() => {}}
          activeFilterCount={1}
          onClearAll={() => {}}
        />
      );

    case "Collection Grid":
      return (
        <div className="w-full">
          <CollectionGrid
            heading="Leggings"
            productCount={24}
            products={[
              <ProductCard
                key="1"
                image="https://placehold.co/394x492/f2f2f2/1c1d1d?text=Power+Legging"
                name="Power Seamless Legging"
                color="Midnight Black"
                price={54}
                rating={4.8}
                reviewCount={1200}
              />,
              <ProductCard
                key="2"
                image="https://placehold.co/394x492/f2f2f2/1c1d1d?text=Impact+Legging"
                name="Impact High Rise Legging"
                color="Storm Grey"
                price={48}
                rating={4.6}
                reviewCount={890}
              />,
              <ProductCard
                key="3"
                image="https://placehold.co/394x492/f2f2f2/1c1d1d?text=Adapt+Legging"
                name="Adapt Seamless Legging"
                color="Deep Plum"
                price={52}
                rating={4.7}
                reviewCount={650}
                badge="NEW"
              />,
              <ProductCard
                key="4"
                image="https://placehold.co/394x492/f2f2f2/1c1d1d?text=Core+Legging"
                name="Core Training Legging"
                color="Black"
                price={42}
                rating={4.5}
                reviewCount={2100}
              />,
            ]}
          />
        </div>
      );

    case "Quick Shop Modal":
      return (
        <QuickShopModal
          open={true}
          onClose={() => {}}
          product={{
            name: "Power Seamless Legging",
            price: "£54.00",
            images: [
              { src: "https://placehold.co/400x500/e8e8e1/111?text=Front", alt: "Front" },
              { src: "https://placehold.co/400x500/e8e8e1/111?text=Back", alt: "Back" },
            ],
            sizes: [
              { label: "XS", selected: false, soldOut: false },
              { label: "S", selected: false, soldOut: false },
              { label: "M", selected: true, soldOut: false },
              { label: "L", selected: false, soldOut: false },
              { label: "XL", selected: false, soldOut: true },
            ],
          }}
          onAddToBag={() => {}}
        />
      );

    default:
      return null;
  }
}

export function isFullWidthComponent(name: string): boolean {
  return ["Campaign Hero", "Announcement Bar", "Newsletter Signup", "Footer", "Collection Grid"].includes(name);
}
