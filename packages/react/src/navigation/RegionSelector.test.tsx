import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegionSelector } from "./RegionSelector";

const regions = [
  { code: "GB", label: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}", currency: "GBP" },
  { code: "US", label: "United States", flag: "\u{1F1FA}\u{1F1F8}", currency: "USD" },
  { code: "EU", label: "Europe", flag: "\u{1F1EA}\u{1F1FA}", currency: "EUR" },
];

describe("RegionSelector", () => {
  it("renders active region", () => {
    render(<RegionSelector regions={regions} activeRegion="GB" onChange={() => {}} />);
    expect(screen.getByText(/GB/)).toBeInTheDocument();
  });

  it("opens dropdown on click", async () => {
    const user = userEvent.setup();
    render(<RegionSelector regions={regions} activeRegion="GB" onChange={() => {}} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("United Kingdom")).toBeVisible();
    expect(screen.getByText("United States")).toBeVisible();
  });

  it("calls onChange when region is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<RegionSelector regions={regions} activeRegion="GB" onChange={onChange} />);
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("United States"));
    expect(onChange).toHaveBeenCalledWith("US");
  });

  it("closes dropdown on Escape", async () => {
    const user = userEvent.setup();
    render(<RegionSelector regions={regions} activeRegion="GB" onChange={() => {}} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("United Kingdom")).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("United Kingdom")).not.toBeInTheDocument();
  });
});
