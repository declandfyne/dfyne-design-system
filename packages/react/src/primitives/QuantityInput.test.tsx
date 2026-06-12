import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuantityInput } from "./QuantityInput";

describe("QuantityInput", () => {
  it("renders the current value", () => {
    render(<QuantityInput value={3} onChange={() => {}} />);
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(3);
  });

  it("calls onChange with incremented value when plus is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantityInput value={2} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /increase/i }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("calls onChange with decremented value when minus is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantityInput value={5} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /decrease/i }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("disables minus button at min value", () => {
    render(<QuantityInput value={1} onChange={() => {}} min={1} />);
    expect(screen.getByRole("button", { name: /decrease/i })).toBeDisabled();
  });

  it("disables plus button at max value", () => {
    render(<QuantityInput value={99} onChange={() => {}} max={99} />);
    expect(screen.getByRole("button", { name: /increase/i })).toBeDisabled();
  });

  it("disables all controls when disabled prop is true", () => {
    render(<QuantityInput value={3} onChange={() => {}} disabled />);
    expect(screen.getByRole("spinbutton")).toBeDisabled();
    expect(screen.getByRole("button", { name: /decrease/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /increase/i })).toBeDisabled();
  });

  it("clamps typed value to min/max on blur", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    function Wrapper() {
      const [val, setVal] = React.useState(5);
      return (
        <QuantityInput
          value={val}
          onChange={(v) => {
            setVal(v);
            onChange(v);
          }}
          min={1}
          max={10}
        />
      );
    }
    render(<Wrapper />);
    const input = screen.getByRole("spinbutton");
    await user.clear(input);
    await user.type(input, "25");
    await user.tab();
    expect(onChange).toHaveBeenLastCalledWith(10);
  });
});
