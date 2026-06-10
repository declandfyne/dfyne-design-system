import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArrowButton } from "../src/index";

describe("ArrowButton", () => {
  it("renders with correct aria-label for left", () => {
    render(<ArrowButton direction="left" />);
    expect(screen.getByLabelText("Scroll left")).toBeInTheDocument();
  });

  it("renders with correct aria-label for right", () => {
    render(<ArrowButton direction="right" />);
    expect(screen.getByLabelText("Scroll right")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<ArrowButton direction="right" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop is true", () => {
    render(<ArrowButton direction="left" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders an svg icon inside", () => {
    const { container } = render(<ArrowButton direction="right" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
