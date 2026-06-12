import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renders children", () => {
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>);
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("does not show tooltip by default", () => {
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>);
    expect(screen.queryByText("Help text")).not.toBeInTheDocument();
  });

  it("shows tooltip on hover", async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>);
    await user.hover(screen.getByText("Hover me"));
    expect(await screen.findByText("Help text")).toBeVisible();
  });

  it("hides tooltip on unhover", async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>);
    await user.hover(screen.getByText("Hover me"));
    await screen.findByText("Help text");
    await user.unhover(screen.getByText("Hover me"));
    expect(screen.queryByText("Help text")).not.toBeInTheDocument();
  });
});
