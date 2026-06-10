import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CategoryCard } from "../src/index";

describe("CategoryCard", () => {
  it("renders the title", () => {
    render(<CategoryCard image="/test.jpg" title="IMPACT" href="#impact" />);
    expect(screen.getByText("IMPACT")).toBeInTheDocument();
  });

  it("renders as a link", () => {
    render(<CategoryCard image="/test.jpg" title="ORIGIN" href="/origin" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/origin");
  });

  it("renders the image", () => {
    render(<CategoryCard image="/test.jpg" title="DEFY" href="#" />);
    expect(screen.getByAltText("DEFY")).toBeInTheDocument();
  });

  it("renders caption when provided", () => {
    render(<CategoryCard image="/test.jpg" title="DEFY" href="#" caption="New Collection" />);
    expect(screen.getByText("New Collection")).toBeInTheDocument();
  });

  it("renders chevron icon", () => {
    const { container } = render(<CategoryCard image="/test.jpg" title="IMPACT" href="#" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
