import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "../src/index";

describe("SectionHeading", () => {
  it("renders eyebrow and title", () => {
    render(<SectionHeading eyebrow="JUST LANDED" title="NEW IN WOMEN" />);
    expect(screen.getByText("JUST LANDED")).toBeInTheDocument();
    expect(screen.getByText("NEW IN WOMEN")).toBeInTheDocument();
  });

  it("renders title as h2", () => {
    render(<SectionHeading eyebrow="TEST" title="HEADING" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("HEADING");
  });

  it("accepts className override", () => {
    const { container } = render(<SectionHeading eyebrow="E" title="T" className="mt-8" />);
    expect(container.firstChild).toHaveClass("mt-8");
  });
});
