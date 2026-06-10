import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AnnouncementBar } from "../src/index";

const slides = [
  { text: "HASSLE-FREE RETURNS", detail: "100-day free returns" },
  { text: "FREE SHIPPING", detail: "On orders over £30" },
];

describe("AnnouncementBar", () => {
  it("renders the first slide text", () => {
    render(<AnnouncementBar slides={slides} />);
    expect(screen.getByText("HASSLE-FREE RETURNS")).toBeInTheDocument();
  });

  it("renders the first slide detail", () => {
    render(<AnnouncementBar slides={slides} />);
    expect(screen.getByText("100-day free returns")).toBeInTheDocument();
  });

  it("renders as a banner role", () => {
    render(<AnnouncementBar slides={slides} />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
