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

    default:
      return null;
  }
}

export function isFullWidthComponent(name: string): boolean {
  return ["Campaign Hero", "Announcement Bar", "Newsletter Signup", "Footer"].includes(name);
}
