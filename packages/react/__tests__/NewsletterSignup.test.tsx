import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsletterSignup } from "../src/index";

describe("NewsletterSignup", () => {
  it("renders email input", () => {
    render(<NewsletterSignup onSubmit={() => {}} />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<NewsletterSignup onSubmit={() => {}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls onSubmit with email value", async () => {
    const onSubmit = vi.fn();
    render(<NewsletterSignup onSubmit={onSubmit} />);
    await userEvent.type(screen.getByPlaceholderText(/email/i), "test@dfyne.com");
    await userEvent.click(screen.getByRole("button"));
    expect(onSubmit).toHaveBeenCalledWith("test@dfyne.com");
  });
});
