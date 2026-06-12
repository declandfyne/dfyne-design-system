import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LengthSelector } from "./LengthSelector";

describe("LengthSelector", () => {
  it("renders all options", () => {
    render(<LengthSelector options={["REGULAR", "TALL"]} onChange={() => {}} />);
    expect(screen.getByText("REGULAR")).toBeInTheDocument();
    expect(screen.getByText("TALL")).toBeInTheDocument();
  });

  it("highlights selected option", () => {
    render(<LengthSelector options={["REGULAR", "TALL"]} selected="REGULAR" onChange={() => {}} />);
    expect(screen.getByText("REGULAR")).toHaveStyle({ backgroundColor: "#111111" });
  });

  it("calls onChange when option is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<LengthSelector options={["REGULAR", "TALL"]} onChange={onChange} />);
    await user.click(screen.getByText("TALL"));
    expect(onChange).toHaveBeenCalledWith("TALL");
  });

  it("renders the label", () => {
    render(<LengthSelector options={["REGULAR"]} onChange={() => {}} />);
    expect(screen.getByText(/SELECT LENGTH/i)).toBeInTheDocument();
  });
});
