import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CrossSellCard } from "../src/index";

describe("CrossSellCard", () => {
  it("renders product name", () => {
    render(<CrossSellCard image="/test.jpg" name="Impact Shorts" color="Midnight Black" price={49} />);
    expect(screen.getByText("Impact Shorts")).toBeInTheDocument();
  });

  it("renders formatted price", () => {
    render(<CrossSellCard image="/test.jpg" name="Impact Shorts" color="Midnight Black" price={49} />);
    expect(screen.getByText("$49.00")).toBeInTheDocument();
  });

  it("renders color", () => {
    render(<CrossSellCard image="/test.jpg" name="Impact Shorts" color="Midnight Black" price={49} />);
    expect(screen.getByText("Midnight Black")).toBeInTheDocument();
  });

  it("renders product image", () => {
    render(<CrossSellCard image="/test.jpg" name="Impact Shorts" color="Midnight Black" price={49} />);
    expect(screen.getByAltText("Impact Shorts")).toBeInTheDocument();
  });
});
