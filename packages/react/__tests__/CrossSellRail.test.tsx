import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CrossSellRail } from "../src/index";

const products = [
  { image: "/cs1.jpg", name: "Impact Shorts", color: "Black", price: 49 },
  { image: "/cs2.jpg", name: "Origin Flares", color: "Navy", price: 69 },
];

describe("CrossSellRail", () => {
  it("renders the heading", () => {
    render(<CrossSellRail title="COMPLETE THE LOOK" products={products} />);
    expect(screen.getByText("COMPLETE THE LOOK")).toBeInTheDocument();
  });

  it("renders all cross-sell cards", () => {
    render(<CrossSellRail title="COMPLETE THE LOOK" products={products} />);
    expect(screen.getByText("Impact Shorts")).toBeInTheDocument();
    expect(screen.getByText("Origin Flares")).toBeInTheDocument();
  });

  it("renders scrollable container", () => {
    const { container } = render(<CrossSellRail title="COMPLETE THE LOOK" products={products} />);
    expect(container.querySelector("[data-rail]")).toBeInTheDocument();
  });
});
