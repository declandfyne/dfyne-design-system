import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CampaignHero } from "../src/index";

describe("CampaignHero", () => {
  it("renders the caption", () => {
    render(<CampaignHero image="/hero.jpg" caption="NEW STYLES" heading="IMPACT" cta={{ label: "SHOP", href: "/shop" }} />);
    expect(screen.getByText("NEW STYLES")).toBeInTheDocument();
  });

  it("renders the heading", () => {
    render(<CampaignHero image="/hero.jpg" caption="NEW" heading="IMPACT" cta={{ label: "SHOP", href: "/shop" }} />);
    expect(screen.getByText("IMPACT")).toBeInTheDocument();
  });

  it("renders the CTA as a link", () => {
    render(<CampaignHero image="/hero.jpg" caption="NEW" heading="IMPACT" cta={{ label: "SHOP NOW", href: "/shop" }} />);
    expect(screen.getByRole("link", { name: "SHOP NOW" })).toHaveAttribute("href", "/shop");
  });

  it("renders secondary CTA when provided", () => {
    render(
      <CampaignHero
        image="/hero.jpg"
        caption="NEW"
        heading="IMPACT"
        cta={{ label: "SHOP", href: "/shop" }}
        secondaryCta={{ label: "EXPLORE", href: "/explore" }}
      />
    );
    expect(screen.getByRole("link", { name: "EXPLORE" })).toHaveAttribute("href", "/explore");
  });

  it("renders hero image", () => {
    render(<CampaignHero image="/hero.jpg" caption="NEW" heading="IMPACT" cta={{ label: "SHOP", href: "/" }} />);
    expect(screen.getAllByAltText("IMPACT").length).toBeGreaterThan(0);
  });
});
