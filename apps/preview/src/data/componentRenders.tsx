"use client";

import React, { useState } from "react";
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
  QuickAdd,
  CartItem,
  CartDrawer,
  Header,
  Tabs,
  Toast,
  Tooltip,
  SocialIcons,
} from "@dfyne/react";
import type { IconName } from "@dfyne/react";

function CartDrawerPreview() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        OPEN CART DRAWER
      </Button>
      <CartDrawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        items={[
          { image: { src: "https://placehold.co/80x100/e8e8e1/111?text=1", alt: "Item" }, name: "Power Seamless Legging", variant: "Black / M", price: "£54.00", quantity: 1 },
          { image: { src: "https://placehold.co/80x100/e8e8e1/111?text=2", alt: "Item" }, name: "Vital Sports Bra", variant: "White / S", price: "£38.00", quantity: 2 },
        ]}
        onItemQuantityChange={() => {}}
        onItemRemove={() => {}}
        subtotal="£130.00"
        shippingMessage="Free UK delivery over £50"
        onCheckout={() => {}}
      />
    </>
  );
}

function ToastPreview() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setIsVisible(true)}>
        SHOW TOAST
      </Button>
      <Toast message="Added to bag successfully" type="success" visible={isVisible} onClose={() => setIsVisible(false)} />
    </>
  );
}

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
            links={[
              { label: "Contact Us", href: "#" },
              { label: "Track My Order", href: "#" },
              { label: "Rewards", href: "#" },
              { label: "Events", href: "#" },
            ]}
            socials={[
              { platform: "instagram", href: "#" },
              { platform: "facebook", href: "#" },
              { platform: "youtube", href: "#" },
              { platform: "tiktok", href: "#" },
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

    case "Quick Add":
      return (
        <QuickAdd
          open={true}
          onClose={() => {}}
          product={{
            name: "Impact Long Sleeve One Piece",
            variant: "Truffle",
            price: "\u00a375.99",
            images: [
              { src: "https://placehold.co/400x500/e8e8e1/111?text=Front", alt: "Front" },
              { src: "https://placehold.co/400x500/e8e8e1/111?text=Back", alt: "Back" },
            ],
            lengths: ["REGULAR", "TALL"],
            sizes: [
              { label: "XS", soldOut: false },
              { label: "S", soldOut: false },
              { label: "M", soldOut: false },
              { label: "L", soldOut: true },
            ],
            href: "/products/impact-one-piece",
          }}
          onAddToCart={() => {}}
        />
      );

    case "Cart Item":
      return (
        <CartItem
          image={{ src: "https://placehold.co/80x100/e8e8e1/111?text=Legging", alt: "Legging" }}
          name={(props.name as string) ?? "Power Seamless Legging"}
          variant={(props.variant as string) ?? "Black / M"}
          price={(props.price as string) ?? "£54.00"}
          quantity={(props.quantity as number) ?? 1}
          onQuantityChange={() => {}}
          onRemove={() => {}}
        />
      );

    case "Cart Drawer":
      return <CartDrawerPreview />;

    case "Header":
      return (
        <div className="w-full">
          <Header
            logo={<span style={{ fontFamily: "Raleway", fontWeight: 700, fontSize: 18, letterSpacing: 3 }}>DFYNE</span>}
            navItems={[
              { label: "Shop", href: "#", children: [
                { label: "Leggings", href: "#" },
                { label: "Sports Bras", href: "#" },
                { label: "Shorts", href: "#" },
              ]},
              { label: "New In", href: "#" },
              { label: "Collections", href: "#" },
              { label: "About", href: "#" },
            ]}
            cartItemCount={2}
            onCartClick={() => {}}
            onMenuClick={() => {}}
            onSearch={() => {}}
          />
        </div>
      );

    case "Tabs":
      return (
        <Tabs tabs={[
          { label: "Description", content: <p style={{ fontFamily: "Raleway", fontSize: 13, color: "#111" }}>Premium seamless fabric with four-way stretch.</p> },
          { label: "Size Guide", content: <p style={{ fontFamily: "Raleway", fontSize: 13, color: "#111" }}>XS: 6-8, S: 8-10, M: 10-12, L: 12-14</p> },
          { label: "Delivery", content: <p style={{ fontFamily: "Raleway", fontSize: 13, color: "#111" }}>Free UK delivery over &pound;50. 2-3 business days.</p> },
        ]} />
      );

    case "Toast":
      return <ToastPreview />;

    case "Tooltip":
      return (
        <div style={{ display: "flex", gap: 32 }}>
          <Tooltip content="Top tooltip" position="top"><button style={{ padding: "8px 16px", border: "1px solid #e8e8e1", fontFamily: "Raleway", fontSize: 11 }}>Hover (Top)</button></Tooltip>
          <Tooltip content="Bottom tooltip" position="bottom"><button style={{ padding: "8px 16px", border: "1px solid #e8e8e1", fontFamily: "Raleway", fontSize: 11 }}>Hover (Bottom)</button></Tooltip>
        </div>
      );

    case "Social Icons":
      return (
        <SocialIcons links={[
          { platform: "instagram", href: "#" },
          { platform: "tiktok", href: "#" },
          { platform: "facebook", href: "#" },
          { platform: "youtube", href: "#" },
          { platform: "pinterest", href: "#" },
        ]} />
      );

    default:
      return null;
  }
}

export function isFullWidthComponent(name: string): boolean {
  return ["Campaign Hero", "Announcement Bar", "Newsletter Signup", "Footer", "Collection Grid", "Header"].includes(name);
}
