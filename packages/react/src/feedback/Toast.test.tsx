import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toast } from "./Toast";

describe("Toast", () => {
  it("renders nothing when not visible", () => {
    const { container } = render(<Toast message="Added" visible={false} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders message when visible", () => {
    render(<Toast message="Added to bag" visible={true} />);
    expect(screen.getByText("Added to bag")).toBeInTheDocument();
  });

  it("calls onClose when X is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Toast message="Added" visible={true} onClose={onClose} />);
    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("auto-dismisses after duration", async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast message="Added" visible={true} onClose={onClose} duration={2000} />);
    vi.advanceTimersByTime(2000);
    expect(onClose).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("does not auto-dismiss when duration is 0", async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast message="Added" visible={true} onClose={onClose} duration={0} />);
    vi.advanceTimersByTime(10000);
    expect(onClose).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
