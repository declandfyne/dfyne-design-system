import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BackLink } from "./BackLink";

describe("BackLink", () => {
  it("renders label", () => {
    render(<BackLink label="SHOP IMPACT" href="/collections/impact" />);
    expect(screen.getByText("SHOP IMPACT")).toBeInTheDocument();
  });

  it("links to href", () => {
    render(<BackLink label="SHOP IMPACT" href="/collections/impact" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/collections/impact");
  });
});
