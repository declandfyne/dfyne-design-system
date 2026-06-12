import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../src/index";

const links = [
  { label: "Contact Us", href: "/contact" },
  { label: "Track My Order", href: "/track" },
  { label: "Rewards", href: "/rewards" },
];

const socials = [
  { platform: "instagram" as const, href: "https://instagram.com/dfyne" },
  { platform: "facebook" as const, href: "https://facebook.com/dfyne" },
];

describe("Footer", () => {
  it("renders all links", () => {
    render(<Footer links={links} />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("Track My Order")).toBeInTheDocument();
    expect(screen.getByText("Rewards")).toBeInTheDocument();
  });

  it("renders links as anchors with correct href", () => {
    render(<Footer links={links} />);
    expect(screen.getByText("Contact Us").closest("a")).toHaveAttribute("href", "/contact");
  });

  it("renders social icons when provided", () => {
    render(<Footer links={links} socials={socials} />);
    const socialLinks = screen.getAllByRole("link").filter(a => a.getAttribute("target") === "_blank");
    expect(socialLinks.length).toBe(2);
  });

  it("renders without socials", () => {
    render(<Footer links={links} />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });
});
