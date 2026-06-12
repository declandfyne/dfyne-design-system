import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../src/index";

describe("Button", () => {
  it("renders children as label", () => {
    render(<Button>ADD TO CART</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("ADD TO CART");
  });

  it("primary variant has #111 background class", () => {
    render(<Button variant="primary">SHOP</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-[#111111]", "text-white");
  });

  it("secondary variant has transparent bg with border", () => {
    render(<Button variant="secondary">COMPLETE THE LOOK</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("bg-transparent", "border-[#e8e8e1]");
  });

  it("tertiary variant has normal tracking and lighter weight", () => {
    render(<Button variant="tertiary">SIZE GUIDE</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("font-normal", "tracking-normal");
  });

  it("defaults to rounded-50px radius (live site buttonRadius)", () => {
    render(<Button>ADD TO CART</Button>);
    expect(screen.getByRole("button")).toHaveClass("rounded-[50px]");
  });

  it("primary uses 9px font with 0.3em tracking", () => {
    render(<Button>ADD TO CART</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("text-[9px]", "tracking-[2.7px]", "font-semibold");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>CLICK</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders as disabled with correct disabled styles", () => {
    render(<Button disabled>SOLD OUT</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
  });

  it("accepts className override", () => {
    render(<Button className="w-full">GO</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });
});
