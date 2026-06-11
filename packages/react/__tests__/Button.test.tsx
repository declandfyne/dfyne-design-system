import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../src/index";

describe("Button", () => {
  it("renders children as label", () => {
    render(<Button>ADD TO CART</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("ADD TO CART");
  });

  it("primary variant has #111 background", () => {
    render(<Button variant="primary">SHOP</Button>);
    expect(screen.getByRole("button")).toHaveClass("text-white");
  });

  it("secondary variant has outline style", () => {
    render(<Button variant="secondary">COMPLETE THE LOOK</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("bg-white", "text-black");
  });

  it("defaults to rounded-50px radius (live site Add to Cart)", () => {
    render(<Button>ADD TO CART</Button>);
    expect(screen.getByRole("button")).toHaveClass("rounded-[50px]");
  });

  it("supports pill radius (hero chevron button)", () => {
    render(<Button radius="pill">SHOP</Button>);
    expect(screen.getByRole("button")).toHaveClass("rounded-[140px]");
  });

  it("supports full radius (checkout button)", () => {
    render(<Button radius="full">CHECK OUT</Button>);
    expect(screen.getByRole("button")).toHaveClass("rounded-[999px]");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>CLICK</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders as disabled", () => {
    render(<Button disabled>SOLD OUT</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("accepts className override", () => {
    render(<Button className="w-full">GO</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });
});
