import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CategoryRail } from "../src/index";

const cards = [
  { image: "/cat1.jpg", title: "IMPACT", href: "#impact" },
  { image: "/cat2.jpg", title: "ORIGIN", href: "#origin" },
];

describe("CategoryRail", () => {
  it("renders all category cards", () => {
    render(<CategoryRail cards={cards} />);
    expect(screen.getByText("IMPACT")).toBeInTheDocument();
    expect(screen.getByText("ORIGIN")).toBeInTheDocument();
  });

  it("renders scrollable container", () => {
    const { container } = render(<CategoryRail cards={cards} />);
    expect(container.querySelector("[data-rail]")).toBeInTheDocument();
  });

  it("renders as a section", () => {
    const { container } = render(<CategoryRail cards={cards} />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});
