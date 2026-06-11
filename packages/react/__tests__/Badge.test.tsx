import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Badge } from "../src/index";

describe("Badge", () => {
  it("renders the badge text", () => {
    const { getByText } = render(<Badge text="NEW" />);
    expect(getByText("NEW")).toBeInTheDocument();
  });

  it("uses dark variant by default", () => {
    const { container } = render(<Badge text="SALE" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("text-white");
  });

  it("supports light variant", () => {
    const { container } = render(<Badge text="LIGHT" variant="light" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("bg-white");
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
});
