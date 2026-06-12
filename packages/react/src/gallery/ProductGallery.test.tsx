import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductGallery } from "./ProductGallery";

const images = [
  { src: "/img1.jpg", alt: "Front view" },
  { src: "/img2.jpg", alt: "Back view" },
  { src: "/img3.jpg", alt: "Detail" },
];

describe("ProductGallery", () => {
  it("renders main image with first image by default", () => {
    render(<ProductGallery images={images} />);
    const main = screen.getByRole("img", { name: "Front view" });
    expect(main).toHaveAttribute("src", "/img1.jpg");
  });

  it("renders all thumbnails", () => {
    render(<ProductGallery images={images} />);
    const thumbs = screen.getAllByRole("button");
    expect(thumbs).toHaveLength(3);
  });

  it("changes main image when thumbnail is clicked", async () => {
    const user = userEvent.setup();
    const onIndexChange = vi.fn();
    render(<ProductGallery images={images} onIndexChange={onIndexChange} />);
    const thumbs = screen.getAllByRole("button");
    await user.click(thumbs[1]);
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it("shows active thumbnail with distinct style", () => {
    render(<ProductGallery images={images} activeIndex={1} />);
    const thumbs = screen.getAllByRole("button");
    expect(thumbs[1]).toHaveStyle({ borderColor: "#111111" });
  });

  it("uses activeIndex prop for main image", () => {
    render(<ProductGallery images={images} activeIndex={2} />);
    const main = screen.getByRole("img", { name: "Detail" });
    expect(main).toHaveAttribute("src", "/img3.jpg");
  });
});
