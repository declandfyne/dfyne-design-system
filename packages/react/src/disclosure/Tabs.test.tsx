import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "./Tabs";

const tabs = [
  { label: "Description", content: <p>Product description here</p> },
  { label: "Size Guide", content: <p>Size guide content</p> },
  { label: "Reviews", content: <p>Customer reviews</p> },
];

describe("Tabs", () => {
  it("renders all tab labels", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Size Guide")).toBeInTheDocument();
    expect(screen.getByText("Reviews")).toBeInTheDocument();
  });

  it("shows first tab content by default", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText("Product description here")).toBeVisible();
  });

  it("hides non-active tab content", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.queryByText("Size guide content")).not.toBeVisible();
  });

  it("switches content when tab is clicked", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);
    await user.click(screen.getByText("Size Guide"));
    expect(screen.getByText("Size guide content")).toBeVisible();
  });

  it("calls onChange when tab is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tabs tabs={tabs} onChange={onChange} />);
    await user.click(screen.getByText("Reviews"));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("uses controlled activeIndex", () => {
    render(<Tabs tabs={tabs} activeIndex={2} />);
    expect(screen.getByText("Customer reviews")).toBeVisible();
  });
});
