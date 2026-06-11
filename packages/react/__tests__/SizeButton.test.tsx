import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SizeButton } from "../src/index";

describe("SizeButton", () => {
  it("renders the size label", () => {
    render(<SizeButton label="M" selected={false} soldOut={false} onClick={() => {}} />);
    expect(screen.getByText("M")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<SizeButton label="S" selected={false} soldOut={false} onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled when sold out", () => {
    render(<SizeButton label="XL" selected={false} soldOut onClick={() => {}} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows selected state with black bg", () => {
    render(<SizeButton label="L" selected soldOut={false} onClick={() => {}} />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(btn).toHaveClass("bg-black", "text-white");
  });
});
