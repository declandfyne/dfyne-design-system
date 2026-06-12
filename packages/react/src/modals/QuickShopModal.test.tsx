import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuickShopModal } from "./QuickShopModal";

const product = {
  name: "Power Seamless Legging",
  price: "\u00a354.00",
  images: [
    { src: "/img1.jpg", alt: "Front" },
    { src: "/img2.jpg", alt: "Back" },
  ],
  sizes: [
    { label: "S", selected: false, soldOut: false },
    { label: "M", selected: true, soldOut: false },
    { label: "L", selected: false, soldOut: true },
  ],
};

describe("QuickShopModal", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <QuickShopModal open={false} onClose={() => {}} product={product} />
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders product name and price when open", () => {
    render(<QuickShopModal open={true} onClose={() => {}} product={product} />);
    expect(screen.getByText("Power Seamless Legging")).toBeInTheDocument();
    expect(screen.getByText("\u00a354.00")).toBeInTheDocument();
  });

  it("renders size buttons", () => {
    render(<QuickShopModal open={true} onClose={() => {}} product={product} />);
    expect(screen.getByText("S")).toBeInTheDocument();
    expect(screen.getByText("M")).toBeInTheDocument();
    expect(screen.getByText("L")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<QuickShopModal open={true} onClose={onClose} product={product} />);
    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when backdrop is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<QuickShopModal open={true} onClose={onClose} product={product} />);
    // Click the backdrop (outermost overlay div)
    const backdrop = screen.getByTestId("modal-backdrop");
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose on Escape key", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<QuickShopModal open={true} onClose={onClose} product={product} />);
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onAddToBag when add to bag button is clicked", async () => {
    const user = userEvent.setup();
    const onAddToBag = vi.fn();
    render(
      <QuickShopModal open={true} onClose={() => {}} product={product} onAddToBag={onAddToBag} />
    );
    await user.click(screen.getByText("ADD TO BAG"));
    expect(onAddToBag).toHaveBeenCalled();
  });

  it("calls onSizeSelect when a size is clicked", async () => {
    const user = userEvent.setup();
    const onSizeSelect = vi.fn();
    render(
      <QuickShopModal open={true} onClose={() => {}} product={product} onSizeSelect={onSizeSelect} />
    );
    await user.click(screen.getByText("S"));
    expect(onSizeSelect).toHaveBeenCalledWith(0);
  });
});
