import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Icon } from "../src/index";

describe("Icon", () => {
  it("renders an svg element", () => {
    const { container } = render(<Icon name="check" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies aria-hidden by default", () => {
    const { container } = render(<Icon name="search" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("accepts className for custom sizing", () => {
    const { container } = render(<Icon name="cart" className="h-8 w-8" />);
    expect(container.querySelector("svg")).toHaveClass("h-8", "w-8");
  });

  it("renders different icons by name", () => {
    const { container: c1 } = render(<Icon name="check" />);
    const { container: c2 } = render(<Icon name="star" />);
    const path1 = c1.querySelector("svg path")?.getAttribute("d") ?? "";
    const path2 = c2.querySelector("svg path")?.getAttribute("d") ?? "";
    expect(path1).not.toBe(path2);
  });
});
