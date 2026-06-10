import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../src/index";

const columns = [
  { heading: "Account", links: ["Login", "Register"] },
  { heading: "Delivery", links: ["Shipping", "Returns"] },
];

describe("Footer", () => {
  it("renders column headings", () => {
    render(<Footer columns={columns} />);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Delivery")).toBeInTheDocument();
  });

  it("renders links in each column", () => {
    render(<Footer columns={columns} />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Returns")).toBeInTheDocument();
  });

  it("renders as a footer element", () => {
    const { container } = render(<Footer columns={columns} />);
    expect(container.querySelector("footer")).toBeInTheDocument();
  });
});
