import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartDrawer } from "./CartDrawer";

const items = [
  { image: { src: "/img1.jpg", alt: "Item 1" }, name: "Power Legging", variant: "Black / M", price: "£54.00", quantity: 1 },
  { image: { src: "/img2.jpg", alt: "Item 2" }, name: "Sports Bra", variant: "White / S", price: "£38.00", quantity: 2 },
];

const baseProps = {
  open: true,
  onClose: vi.fn(),
  items,
  onItemQuantityChange: vi.fn(),
  onItemRemove: vi.fn(),
  subtotal: "£130.00",
};

describe("CartDrawer", () => {
  it("renders nothing when closed", () => {
    const { container } = render(<CartDrawer {...baseProps} open={false} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders header with item count", () => {
    render(<CartDrawer {...baseProps} />);
    expect(screen.getByText(/your bag/i)).toBeInTheDocument();
    expect(screen.getByText("(2)")).toBeInTheDocument();
  });

  it("renders all cart items", () => {
    render(<CartDrawer {...baseProps} />);
    expect(screen.getByText("Power Legging")).toBeInTheDocument();
    expect(screen.getByText("Sports Bra")).toBeInTheDocument();
  });

  it("renders subtotal", () => {
    render(<CartDrawer {...baseProps} />);
    expect(screen.getByText("£130.00")).toBeInTheDocument();
  });

  it("renders shipping message when provided", () => {
    render(<CartDrawer {...baseProps} shippingMessage="Free shipping over £50" />);
    expect(screen.getByText("Free shipping over £50")).toBeInTheDocument();
  });

  it("calls onClose when X is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<CartDrawer {...baseProps} onClose={onClose} />);
    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose on Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<CartDrawer {...baseProps} onClose={onClose} />);
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onCheckout when checkout is clicked", async () => {
    const user = userEvent.setup();
    const onCheckout = vi.fn();
    render(<CartDrawer {...baseProps} onCheckout={onCheckout} />);
    await user.click(screen.getByText(/checkout/i));
    expect(onCheckout).toHaveBeenCalled();
  });

  it("renders upsells slot", () => {
    render(<CartDrawer {...baseProps} upsells={<div>Upsell content</div>} />);
    expect(screen.getByText("Upsell content")).toBeInTheDocument();
  });
});
