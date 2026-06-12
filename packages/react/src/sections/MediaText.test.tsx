import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MediaText } from "./MediaText";

describe("MediaText", () => {
  it("renders heading and body", () => {
    render(<MediaText image={{ src: "/img.jpg", alt: "Hero" }} heading="OUR STORY" body="We started in 2020..." />);
    expect(screen.getByText("OUR STORY")).toBeInTheDocument();
    expect(screen.getByText("We started in 2020...")).toBeInTheDocument();
  });

  it("renders image", () => {
    render(<MediaText image={{ src: "/img.jpg", alt: "Hero" }} heading="H" body="B" />);
    expect(screen.getByRole("img", { name: "Hero" })).toHaveAttribute("src", "/img.jpg");
  });

  it("renders CTA when provided", () => {
    render(<MediaText image={{ src: "/img.jpg", alt: "H" }} heading="H" body="B" cta={{ label: "LEARN MORE", href: "/about" }} />);
    const link = screen.getByText("LEARN MORE");
    expect(link.closest("a")).toHaveAttribute("href", "/about");
  });

  it("does not render CTA when not provided", () => {
    render(<MediaText image={{ src: "/img.jpg", alt: "H" }} heading="H" body="B" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("applies reverse class when reverse is true", () => {
    const { container } = render(<MediaText image={{ src: "/img.jpg", alt: "H" }} heading="H" body="B" reverse />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("flex-row-reverse");
  });
});
