import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuickAdd } from "./QuickAdd";

const product = {
  name: "Impact Long Sleeve One Piece",
  variant: "Truffle",
  price: "\u00a375.99",
  images: [
    { src: "/img1.jpg", alt: "Front" },
    { src: "/img2.jpg", alt: "Back" },
  ],
  lengths: ["REGULAR", "TALL"],
  sizes: [
    { label: "XS", soldOut: false },
    { label: "S", soldOut: false },
    { label: "M", soldOut: false },
    { label: "L", soldOut: true },
  ],
  href: "/products/impact-one-piece",
};

describe("QuickAdd", () => {
  it("renders nothing when closed", () => {
    const { container } = render(<QuickAdd open={false} onClose={() => {}} product={product} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders product info when open", () => {
    render(<QuickAdd open={true} onClose={() => {}} product={product} />);
    expect(screen.getByText("Impact Long Sleeve One Piece")).toBeInTheDocument();
    expect(screen.getByText("Truffle")).toBeInTheDocument();
    expect(screen.getByText("\u00a375.99")).toBeInTheDocument();
  });

  it("shows QUICK ADD header", () => {
    render(<QuickAdd open={true} onClose={() => {}} product={product} />);
    expect(screen.getByText("QUICK ADD")).toBeInTheDocument();
  });

  it("renders length options", () => {
    render(<QuickAdd open={true} onClose={() => {}} product={product} />);
    expect(screen.getByText("REGULAR")).toBeInTheDocument();
    expect(screen.getByText("TALL")).toBeInTheDocument();
  });

  it("shows SELECT LENGTH button initially", () => {
    render(<QuickAdd open={true} onClose={() => {}} product={product} />);
    expect(screen.getByText("SELECT LENGTH")).toBeInTheDocument();
  });

  it("calls onClose when X is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<QuickAdd open={true} onClose={onClose} product={product} />);
    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose on Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<QuickAdd open={true} onClose={onClose} product={product} />);
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("renders VIEW PRODUCT link", () => {
    render(<QuickAdd open={true} onClose={() => {}} product={product} />);
    const link = screen.getByText("VIEW PRODUCT");
    expect(link.closest("a")).toHaveAttribute("href", "/products/impact-one-piece");
  });
});
