import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductRail } from "../src/index";

const products = [
  { image: "/p1.jpg", name: "Impact Top", color: "Black", price: 52, rating: 4.8, reviewCount: 100 },
  { image: "/p2.jpg", name: "Impact Shorts", color: "Navy", price: 42, rating: 4.7, reviewCount: 200 },
];

describe("ProductRail", () => {
  it("renders the section heading", () => {
    render(<ProductRail id="test" eyebrow="JUST LANDED" title="NEW IN" products={products} />);
    expect(screen.getByText("JUST LANDED")).toBeInTheDocument();
    expect(screen.getByText("NEW IN")).toBeInTheDocument();
  });

  it("renders all product cards", () => {
    render(<ProductRail id="test" eyebrow="E" title="T" products={products} />);
    expect(screen.getByText("Impact Top")).toBeInTheDocument();
    expect(screen.getByText("Impact Shorts")).toBeInTheDocument();
  });

  it("renders as a section with the given id", () => {
    const { container } = render(<ProductRail id="my-rail" eyebrow="E" title="T" products={products} />);
    expect(container.querySelector("section#my-rail")).toBeInTheDocument();
  });

  it("renders scrollable container", () => {
    const { container } = render(<ProductRail id="test" eyebrow="E" title="T" products={products} />);
    expect(container.querySelector("[data-rail]")).toBeInTheDocument();
  });
});
