import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "../src/index";

const product = {
  image: "/test-image.jpg",
  name: "Impact Longsleeve Top",
  color: "Pebble Grey",
  price: 52.20,
  rating: 4.8,
  reviewCount: 52866,
};

describe("ProductCard", () => {
  it("renders product name", () => {
    render(<ProductCard {...product} />);
    expect(screen.getByText("Impact Longsleeve Top")).toBeInTheDocument();
  });

  it("renders formatted price", () => {
    render(<ProductCard {...product} />);
    expect(screen.getByText("$52.20")).toBeInTheDocument();
  });

  it("renders color", () => {
    render(<ProductCard {...product} />);
    expect(screen.getByText("Pebble Grey")).toBeInTheDocument();
  });

  it("renders rating", () => {
    render(<ProductCard {...product} />);
    expect(screen.getByLabelText(/Average rating 4.8/)).toBeInTheDocument();
  });

  it("renders badge when provided", () => {
    render(<ProductCard {...product} badge="NEW" />);
    expect(screen.getByText("NEW")).toBeInTheDocument();
  });

  it("does not render badge when not provided", () => {
    render(<ProductCard {...product} />);
    expect(screen.queryByText("NEW")).not.toBeInTheDocument();
  });

  it("renders product image", () => {
    render(<ProductCard {...product} />);
    expect(screen.getByAltText("Impact Longsleeve Top")).toBeInTheDocument();
  });
});
