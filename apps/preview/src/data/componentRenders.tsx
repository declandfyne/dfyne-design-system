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

export function renderComponent(name: string, props: Record<string, unknown>): React.ReactNode {
  switch (name) {
    case "Button":
      return (
        <Button
          variant={props.variant as string | undefined}
          disabled={props.disabled as boolean | undefined}
        >
          {(props.children as string | undefined) ?? "ADD TO CART"}
        </Button>
      );

    case "Badge":
      return (
        <Badge
          text={props.text as string | undefined}
          variant={props.variant as string | undefined}
          position={props.position as string | undefined}
        />
      );

    case "Size Button":
      return (
        <SizeButton
          label={props.label as string | undefined}
          selected={props.selected as boolean | undefined}
          soldOut={props.soldOut as boolean | undefined}
          onClick={() => {}}
        />
      );

    case "Arrow Button":
      return (
        <ArrowButton
          direction={props.direction as "left" | "right" | undefined}
          variant={props.variant as string | undefined}
          disabled={props.disabled as boolean | undefined}
        />
      );

    case "Section Heading":
      return (
        <SectionHeading
          eyebrow={props.eyebrow as string | undefined}
          title={props.title as string | undefined}
        />
      );

    case "Product Card":
      return (
        <ProductCard
          image="https://placehold.co/394x492/f2f2f2/1c1d1d?text=Impact+Top"
          name={props.name as string | undefined}
          color={props.color as string | undefined}
          price={props.price as number | undefined}
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
            title={props.title as string | undefined}
            caption={props.caption as string | undefined}
            href="#"
          />
        </div>
      );

    case "Color Swatch":
      return (
        <ColorSwatch
          image="https://placehold.co/132x198/1c1d1d/ffffff"
          label={props.label as string | undefined}
          selected={props.selected as boolean | undefined}
          isNew={props.isNew as boolean | undefined}
          onClick={() => {}}
        />
      );

    case "Cross-Sell Card":
      return (
        <CrossSellCard
          image="https://placehold.co/246x308/f2f2f2/1c1d1d?text=Shorts"
          name={props.name as string | undefined}
          color={props.color as string | undefined}
          price={props.price as number | undefined}
        />
      );

    case "Campaign Hero":
      return (
        <div className="w-full">
          <CampaignHero
            image="https://placehold.co/1920x1080/1c1d1d/ffffff?text=CAMPAIGN+HERO"
            caption={props.caption as string | undefined}
            heading={props.heading as string | undefined}
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
          name={props.name as string | undefined}
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
