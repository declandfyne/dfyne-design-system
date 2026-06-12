import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Slideshow } from "./Slideshow";

const slides = [
  { image: "/slide1.jpg", alt: "Slide 1", heading: "NEW COLLECTION", caption: "Spring 2024" },
  { image: "/slide2.jpg", alt: "Slide 2", heading: "BEST SELLERS" },
  { image: "/slide3.jpg", alt: "Slide 3", heading: "SALE" },
];

describe("Slideshow", () => {
  it("renders first slide by default", () => {
    render(<Slideshow slides={slides} autoplay={false} />);
    expect(screen.getByText("NEW COLLECTION")).toBeVisible();
  });

  it("renders dot indicators for each slide", () => {
    render(<Slideshow slides={slides} autoplay={false} />);
    const dots = screen.getAllByRole("button", { name: /slide \d/i });
    expect(dots).toHaveLength(3);
  });

  it("changes slide when dot is clicked", async () => {
    const user = userEvent.setup();
    const onSlideChange = vi.fn();
    render(<Slideshow slides={slides} autoplay={false} onSlideChange={onSlideChange} />);
    const dots = screen.getAllByRole("button", { name: /slide \d/i });
    await user.click(dots[1]);
    expect(onSlideChange).toHaveBeenCalledWith(1);
  });

  it("changes slide when next arrow is clicked", async () => {
    const user = userEvent.setup();
    const onSlideChange = vi.fn();
    render(<Slideshow slides={slides} autoplay={false} onSlideChange={onSlideChange} />);
    await user.click(screen.getByRole("button", { name: /next/i }));
    expect(onSlideChange).toHaveBeenCalledWith(1);
  });

  it("wraps to first slide from last", async () => {
    const user = userEvent.setup();
    const onSlideChange = vi.fn();
    render(<Slideshow slides={slides} autoplay={false} activeIndex={2} onSlideChange={onSlideChange} />);
    await user.click(screen.getByRole("button", { name: /next/i }));
    expect(onSlideChange).toHaveBeenCalledWith(0);
  });
});
