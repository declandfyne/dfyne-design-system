import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterPanel } from "./FilterPanel";

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
  {
    key: "size",
    label: "Size",
    type: "checkbox" as const,
    options: [
      { value: "s", label: "S", selected: false },
      { value: "m", label: "M", selected: true },
    ],
  },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
];

describe("FilterPanel", () => {
  it("renders filter group labels", () => {
    render(<FilterPanel filters={filters} onFilterChange={() => {}} />);
    expect(screen.getByText("Color")).toBeInTheDocument();
    expect(screen.getByText("Size")).toBeInTheDocument();
  });

  it("renders filter options", () => {
    render(<FilterPanel filters={filters} onFilterChange={() => {}} />);
    expect(screen.getByText("Black")).toBeInTheDocument();
    expect(screen.getByText("White")).toBeInTheDocument();
  });

  it("calls onFilterChange when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    render(<FilterPanel filters={filters} onFilterChange={onFilterChange} />);
    await user.click(screen.getByText("Black"));
    expect(onFilterChange).toHaveBeenCalledWith("color", "black", true);
  });

  it("renders sort dropdown when sortOptions provided", () => {
    render(
      <FilterPanel
        filters={filters}
        onFilterChange={() => {}}
        sortOptions={sortOptions}
        sortValue="featured"
        onSortChange={() => {}}
      />
    );
    expect(screen.getByDisplayValue("Featured")).toBeInTheDocument();
  });

  it("calls onSortChange when sort changes", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    render(
      <FilterPanel
        filters={filters}
        onFilterChange={() => {}}
        sortOptions={sortOptions}
        sortValue="featured"
        onSortChange={onSortChange}
      />
    );
    await user.selectOptions(screen.getByRole("combobox"), "price-asc");
    expect(onSortChange).toHaveBeenCalledWith("price-asc");
  });

  it("shows clear all when activeFilterCount > 0", () => {
    render(
      <FilterPanel
        filters={filters}
        onFilterChange={() => {}}
        activeFilterCount={2}
        onClearAll={() => {}}
      />
    );
    expect(screen.getByText(/clear all/i)).toBeInTheDocument();
  });

  it("calls onClearAll when clear all is clicked", async () => {
    const user = userEvent.setup();
    const onClearAll = vi.fn();
    render(
      <FilterPanel
        filters={filters}
        onFilterChange={() => {}}
        activeFilterCount={2}
        onClearAll={onClearAll}
      />
    );
    await user.click(screen.getByText(/clear all/i));
    expect(onClearAll).toHaveBeenCalled();
  });

  it("renders swatch type filters", () => {
    const swatchFilters = [{
      key: "color",
      label: "Color",
      type: "swatch" as const,
      options: [
        { value: "black", label: "Black", color: "#000000", selected: false },
        { value: "red", label: "Red", color: "#ff0000", selected: true },
      ],
    }];
    render(<FilterPanel filters={swatchFilters} onFilterChange={() => {}} />);
    expect(screen.getByLabelText("Black")).toBeInTheDocument();
    expect(screen.getByLabelText("Red")).toBeInTheDocument();
  });
});
