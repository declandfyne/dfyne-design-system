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

  it("shows selected state via aria-pressed", () => {
    render(<SizeButton label="L" selected soldOut={false} onClick={() => {}} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });
});
