import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CategoryImageCarousel } from "./CategoryImageCarousel";

const items = [
  { image: "/all.jpg", alt: "All", label: "ALL PRODUCTS", href: "/all", active: true },
  { image: "/flares.jpg", alt: "Flares", label: "FLARES", href: "/flares" },
  { image: "/leggings.jpg", alt: "Leggings", label: "LEGGINGS", href: "/leggings" },
];

describe("CategoryImageCarousel", () => {
  it("renders all items", () => {
    render(<CategoryImageCarousel items={items} />);
    expect(screen.getByText("ALL PRODUCTS")).toBeInTheDocument();
    expect(screen.getByText("FLARES")).toBeInTheDocument();
    expect(screen.getByText("LEGGINGS")).toBeInTheDocument();
  });

  it("renders images", () => {
    render(<CategoryImageCarousel items={items} />);
    expect(screen.getAllByRole("img")).toHaveLength(3);
  });

  it("renders items as links", () => {
    render(<CategoryImageCarousel items={items} />);
    expect(screen.getByText("FLARES").closest("a")).toHaveAttribute("href", "/flares");
  });

  it("marks active item with bold style", () => {
    render(<CategoryImageCarousel items={items} />);
    const activeLabel = screen.getByText("ALL PRODUCTS");
    expect(activeLabel).toHaveStyle({ fontWeight: "700" });
  });
});
