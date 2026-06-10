import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ColorSwatch } from "../src/index";

describe("ColorSwatch", () => {
  it("renders the color label", () => {
    render(<ColorSwatch image="/swatch.jpg" label="Midnight Black" selected={false} onClick={() => {}} />);
    expect(screen.getByText("Midnight Black")).toBeInTheDocument();
  });

  it("renders swatch image", () => {
    render(<ColorSwatch image="/swatch.jpg" label="Navy" selected={false} onClick={() => {}} />);
    expect(screen.getByAltText("Navy")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<ColorSwatch image="/swatch.jpg" label="Teal" selected={false} onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("shows selected state via aria-pressed", () => {
    render(<ColorSwatch image="/swatch.jpg" label="Navy" selected onClick={() => {}} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });
});
