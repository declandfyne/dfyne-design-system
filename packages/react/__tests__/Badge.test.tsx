import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Badge } from "../src/index";

describe("Badge", () => {
  it("renders the badge text", () => {
    const { getByText } = render(<Badge text="NEW" />);
    expect(getByText("NEW")).toBeInTheDocument();
  });

  it("custom variant by default (bg #111, white text)", () => {
    const { container } = render(<Badge text="NEW" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("bg-[#111111]", "text-white");
  });

  it("sold-out variant (white bg, black text)", () => {
    const { container } = render(<Badge text="Sold Out" variant="sold-out" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("bg-white", "text-black");
  });

  it("sale variant (dark bg #1c1d1d, white text)", () => {
    const { container } = render(<Badge text="Sale" variant="sale" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("bg-[#1c1d1d]", "text-white");
  });

  it("uses 11.05px font size and font-semibold", () => {
    const { container } = render(<Badge text="NEW" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("text-[11.05px]", "font-semibold");
  });

  it("accepts className override", () => {
    const { container } = render(<Badge text="CUSTOM" className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("supports top-right position", () => {
    const { container } = render(<Badge text="NEW" position="top-right" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("absolute", "top-0", "right-0");
  });

  it("supports bottom-left position for bottom labels", () => {
    const { container } = render(<Badge text="Best Seller" variant="bottom" position="bottom-left" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("absolute", "bottom-0", "left-0");
  });
});
