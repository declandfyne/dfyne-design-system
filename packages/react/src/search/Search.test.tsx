import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "./Search";

describe("Search", () => {
  it("renders input with placeholder", () => {
    render(<Search value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("renders custom placeholder", () => {
    render(<Search value="" onChange={() => {}} placeholder="Find products..." />);
    expect(screen.getByPlaceholderText("Find products...")).toBeInTheDocument();
  });

  it("calls onChange on typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Search value="" onChange={onChange} />);
    await user.type(screen.getByPlaceholderText("Search"), "dress");
    expect(onChange).toHaveBeenCalledTimes(5);
    expect(onChange).toHaveBeenLastCalledWith("dress");
  });

  it("shows clear button when value is non-empty", () => {
    render(<Search value="test" onChange={() => {}} />);
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });

  it("hides clear button when value is empty", () => {
    render(<Search value="" onChange={() => {}} />);
    expect(screen.queryByRole("button", { name: /clear/i })).not.toBeInTheDocument();
  });

  it("calls onChange with empty string when clear is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Search value="test" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /clear/i }));
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("renders results dropdown when results are provided", () => {
    render(
      <Search
        value="leg"
        onChange={() => {}}
        results={[
          { id: "1", title: "Power Legging", price: "£54.00", type: "product" },
          { id: "2", title: "Leggings Collection", type: "collection" },
        ]}
      />
    );
    expect(screen.getByText("Power Legging")).toBeInTheDocument();
    expect(screen.getByText("£54.00")).toBeInTheDocument();
    expect(screen.getByText("Leggings Collection")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<Search value="test" onChange={() => {}} loading />);
    expect(screen.getByText("Searching...")).toBeInTheDocument();
  });

  it("shows empty state when results is empty array", () => {
    render(<Search value="xyz" onChange={() => {}} results={[]} />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("calls onSelect when a result is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const result = { id: "1", title: "Power Legging", type: "product" as const };
    render(
      <Search value="leg" onChange={() => {}} results={[result]} onSelect={onSelect} />
    );
    await user.click(screen.getByText("Power Legging"));
    expect(onSelect).toHaveBeenCalledWith(result);
  });

  it("closes dropdown on Escape", async () => {
    const user = userEvent.setup();
    render(
      <Search
        value="leg"
        onChange={() => {}}
        results={[{ id: "1", title: "Power Legging", type: "product" }]}
      />
    );
    expect(screen.getByText("Power Legging")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Power Legging")).not.toBeInTheDocument();
  });
});
