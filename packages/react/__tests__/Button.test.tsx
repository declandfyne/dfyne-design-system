import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../src/index";

describe("Button", () => {
  it("renders children as label", () => {
    render(<Button>ADD TO CART</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("ADD TO CART");
  });

  it("primary variant has black background", () => {
    render(<Button variant="primary">SHOP</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-black", "text-white");
  });

  it("secondary variant has outline style", () => {
    render(<Button variant="secondary">COMPLETE THE LOOK</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("border-black", "bg-white", "text-black");
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
