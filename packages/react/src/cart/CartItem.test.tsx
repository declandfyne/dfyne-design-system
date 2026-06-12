import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartItem } from "./CartItem";

const props = {
  image: { src: "/legging.jpg", alt: "Legging" },
  name: "Power Seamless Legging",
  variant: "Black / M",
  price: "£54.00",
  quantity: 1,
  onQuantityChange: vi.fn(),
  onRemove: vi.fn(),
};

describe("CartItem", () => {
  it("renders product info", () => {
    render(<CartItem {...props} />);
    expect(screen.getByText("Power Seamless Legging")).toBeInTheDocument();
    expect(screen.getByText("Black / M")).toBeInTheDocument();
    expect(screen.getByText("£54.00")).toBeInTheDocument();
  });

  it("renders product image", () => {
    render(<CartItem {...props} />);
    expect(screen.getByRole("img", { name: "Legging" })).toHaveAttribute("src", "/legging.jpg");
  });

  it("renders compare price with strikethrough when provided", () => {
    render(<CartItem {...props} comparePrice="£64.00" />);
    const compare = screen.getByText("£64.00");
    expect(compare).toBeInTheDocument();
    expect(compare).toHaveStyle({ textDecoration: "line-through" });
  });

  it("calls onRemove when remove is clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<CartItem {...props} onRemove={onRemove} />);
    await user.click(screen.getByText(/remove/i));
    expect(onRemove).toHaveBeenCalled();
  });

  it("renders quantity input with correct value", () => {
    render(<CartItem {...props} quantity={3} />);
    expect(screen.getByRole("spinbutton")).toHaveValue(3);
  });
});
