import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterDrawer } from "./FilterDrawer";

const filters = [
  {
    key: "color",
    label: "Color",
    type: "checkbox" as const,
    options: [
      { value: "black", label: "Black", count: 12, selected: false },
      { value: "white", label: "White", count: 8, selected: true },
    ],
  },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
];

describe("FilterDrawer", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <FilterDrawer open={false} onClose={() => {}} filters={filters} onFilterChange={() => {}} />
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders filter group labels when open", () => {
    render(
      <FilterDrawer open={true} onClose={() => {}} filters={filters} onFilterChange={() => {}} />
    );
    expect(screen.getByText("Color")).toBeInTheDocument();
  });

  it("renders filter options", () => {
    render(
      <FilterDrawer open={true} onClose={() => {}} filters={filters} onFilterChange={() => {}} />
    );
    expect(screen.getByText("Black")).toBeInTheDocument();
    expect(screen.getByText("White")).toBeInTheDocument();
  });

  it("calls onClose when X is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <FilterDrawer open={true} onClose={onClose} filters={filters} onFilterChange={() => {}} />
    );
    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose on Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <FilterDrawer open={true} onClose={onClose} filters={filters} onFilterChange={() => {}} />
    );
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("shows clear all when activeFilterCount > 0", () => {
    render(
      <FilterDrawer open={true} onClose={() => {}} filters={filters} onFilterChange={() => {}} activeFilterCount={2} onClearAll={() => {}} />
    );
    expect(screen.getByText(/clear all/i)).toBeInTheDocument();
  });

  it("renders SHOW RESULTS button", () => {
    render(
      <FilterDrawer open={true} onClose={() => {}} filters={filters} onFilterChange={() => {}} />
    );
    expect(screen.getByText(/show results/i)).toBeInTheDocument();
  });
});
