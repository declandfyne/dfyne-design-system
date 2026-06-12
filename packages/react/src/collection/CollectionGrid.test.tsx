import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CollectionGrid } from "./CollectionGrid";

describe("CollectionGrid", () => {
  it("renders product children", () => {
    render(
      <CollectionGrid
        products={[
          <div key="1">Product 1</div>,
          <div key="2">Product 2</div>,
        ]}
      />
    );
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("renders heading and product count", () => {
    render(
      <CollectionGrid
        products={[<div key="1">P</div>]}
        heading="Leggings"
        productCount={42}
      />
    );
    expect(screen.getByText("Leggings")).toBeInTheDocument();
    expect(screen.getByText("42 products")).toBeInTheDocument();
  });

  it("renders filters slot", () => {
    render(
      <CollectionGrid
        products={[<div key="1">P</div>]}
        filters={<div>Filter panel here</div>}
      />
    );
    expect(screen.getByText("Filter panel here")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<CollectionGrid products={[]} loading />);
    const shimmers = document.querySelectorAll('[data-testid="shimmer"]');
    expect(shimmers.length).toBe(8);
  });

  it("shows empty message when no products", () => {
    render(<CollectionGrid products={[]} />);
    expect(screen.getByText("No products found")).toBeInTheDocument();
  });

  it("shows custom empty message", () => {
    render(<CollectionGrid products={[]} emptyMessage="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });
});
