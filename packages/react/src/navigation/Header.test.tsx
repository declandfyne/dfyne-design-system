import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";

const navDropdowns = [
  {
    label: "WOMENS",
    sections: [
      { links: [
        { label: "EXPLORE WOMENS", href: "/womens" },
        { label: "NEW RELEASES", href: "/new" },
      ]},
      { heading: "SHOP BY CATEGORY", links: [
        { label: "Leggings", href: "/leggings" },
        { label: "Sports Bras", href: "/bras" },
      ]},
    ],
  },
  {
    label: "MENS",
    sections: [
      { links: [{ label: "EXPLORE MENS", href: "/mens" }] },
    ],
  },
];

const baseProps = {
  logo: <span>DFYNE</span>,
  navDropdowns,
  utilityLinks: [
    { label: "Contact Us", href: "/contact" },
    { label: "Track My Order", href: "/track" },
  ],
  socials: [
    { platform: "instagram" as const, href: "https://instagram.com/dfyne" },
  ],
};

describe("Header", () => {
  it("renders logo", () => {
    render(<Header {...baseProps} />);
    expect(screen.getByText("DFYNE")).toBeInTheDocument();
  });

  it("renders utility links", () => {
    render(<Header {...baseProps} />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("Track My Order")).toBeInTheDocument();
  });

  it("renders nav dropdown triggers", () => {
    render(<Header {...baseProps} />);
    expect(screen.getByText("WOMENS")).toBeInTheDocument();
    expect(screen.getByText("MENS")).toBeInTheDocument();
  });

  it("shows mega-menu on hover", async () => {
    const user = userEvent.setup();
    render(<Header {...baseProps} />);
    await user.hover(screen.getByText("WOMENS"));
    expect(screen.getByText("EXPLORE WOMENS")).toBeVisible();
    expect(screen.getByText("Leggings")).toBeVisible();
  });

  it("renders cart badge with count", () => {
    render(<Header {...baseProps} cartItemCount={3} onCartClick={() => {}} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("does not render badge when cart is 0", () => {
    render(<Header {...baseProps} cartItemCount={0} onCartClick={() => {}} />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("calls onCartClick", async () => {
    const user = userEvent.setup();
    const onCartClick = vi.fn();
    render(<Header {...baseProps} onCartClick={onCartClick} />);
    await user.click(screen.getByRole("button", { name: /cart/i }));
    expect(onCartClick).toHaveBeenCalled();
  });

  it("calls onMenuClick for hamburger", async () => {
    const user = userEvent.setup();
    const onMenuClick = vi.fn();
    render(<Header {...baseProps} onMenuClick={onMenuClick} />);
    await user.click(screen.getByRole("button", { name: /menu/i }));
    expect(onMenuClick).toHaveBeenCalled();
  });

  it("renders region flag", () => {
    render(<Header {...baseProps} regionFlag="\u{1F1EC}\u{1F1E7}" />);
    expect(screen.getByRole("button", { name: /region/i })).toBeInTheDocument();
  });

  it("renders section headings in mega-menu", async () => {
    const user = userEvent.setup();
    render(<Header {...baseProps} />);
    await user.hover(screen.getByText("WOMENS"));
    expect(screen.getByText("SHOP BY CATEGORY")).toBeVisible();
  });
});
