import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";

const navItems = [
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "Leggings", href: "/shop/leggings" },
      { label: "Sports Bras", href: "/shop/bras" },
    ],
  },
  { label: "About", href: "/about" },
];

describe("Header", () => {
  it("renders logo", () => {
    render(<Header logo={<span>DFYNE</span>} navItems={[]} />);
    expect(screen.getByText("DFYNE")).toBeInTheDocument();
  });

  it("renders nav items", () => {
    render(<Header logo={<span>DFYNE</span>} navItems={navItems} />);
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders cart icon with count badge", () => {
    render(
      <Header
        logo={<span>DFYNE</span>}
        navItems={[]}
        cartItemCount={3}
        onCartClick={() => {}}
      />
    );
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("does not render badge when cart is empty", () => {
    render(
      <Header
        logo={<span>DFYNE</span>}
        navItems={[]}
        cartItemCount={0}
        onCartClick={() => {}}
      />
    );
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("calls onCartClick when cart icon is clicked", async () => {
    const user = userEvent.setup();
    const onCartClick = vi.fn();
    render(
      <Header
        logo={<span>DFYNE</span>}
        navItems={[]}
        onCartClick={onCartClick}
      />
    );
    await user.click(screen.getByRole("button", { name: /cart/i }));
    expect(onCartClick).toHaveBeenCalled();
  });

  it("calls onMenuClick when hamburger is clicked", async () => {
    const user = userEvent.setup();
    const onMenuClick = vi.fn();
    render(
      <Header
        logo={<span>DFYNE</span>}
        navItems={[]}
        onMenuClick={onMenuClick}
      />
    );
    await user.click(screen.getByRole("button", { name: /menu/i }));
    expect(onMenuClick).toHaveBeenCalled();
  });

  it("shows mega-menu children on hover", async () => {
    const user = userEvent.setup();
    render(<Header logo={<span>DFYNE</span>} navItems={navItems} />);
    await user.hover(screen.getByText("Shop"));
    expect(screen.getByText("Leggings")).toBeVisible();
    expect(screen.getByText("Sports Bras")).toBeVisible();
  });

  it("renders search button when onSearch is provided", () => {
    render(
      <Header
        logo={<span>DFYNE</span>}
        navItems={[]}
        onSearch={() => {}}
      />
    );
    expect(
      screen.getByRole("button", { name: /search/i })
    ).toBeInTheDocument();
  });
});
