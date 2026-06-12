import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SocialIcons } from "./SocialIcons";

const links = [
  { platform: "instagram" as const, href: "https://instagram.com/dfyne" },
  { platform: "tiktok" as const, href: "https://tiktok.com/@dfyne" },
  { platform: "facebook" as const, href: "https://facebook.com/dfyne" },
];

describe("SocialIcons", () => {
  it("renders links for each platform", () => {
    render(<SocialIcons links={links} />);
    const anchors = screen.getAllByRole("link");
    expect(anchors).toHaveLength(3);
  });

  it("sets correct href", () => {
    render(<SocialIcons links={links} />);
    expect(screen.getByRole("link", { name: /instagram/i })).toHaveAttribute(
      "href",
      "https://instagram.com/dfyne",
    );
  });

  it("opens links in new tab", () => {
    render(<SocialIcons links={links} />);
    const anchors = screen.getAllByRole("link");
    anchors.forEach((a) => expect(a).toHaveAttribute("target", "_blank"));
  });

  it("has accessible labels", () => {
    render(<SocialIcons links={links} />);
    expect(
      screen.getByRole("link", { name: /instagram/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /tiktok/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /facebook/i }),
    ).toBeInTheDocument();
  });
});
