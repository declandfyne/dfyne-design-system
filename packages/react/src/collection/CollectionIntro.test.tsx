import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CollectionIntro } from "./CollectionIntro";

describe("CollectionIntro", () => {
  it("renders title", () => {
    render(<CollectionIntro title="IMPACT" />);
    expect(screen.getByText("IMPACT")).toBeInTheDocument();
  });

  it("renders category label", () => {
    render(<CollectionIntro title="IMPACT" category="WOMENS" />);
    expect(screen.getByText("WOMENS")).toBeInTheDocument();
  });

  it("renders tags", () => {
    render(
      <CollectionIntro
        title="IMPACT"
        tags={["Supportive", "Mid to low waistband"]}
      />,
    );
    expect(screen.getByText("Supportive")).toBeInTheDocument();
    expect(screen.getByText("Mid to low waistband")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(
      <CollectionIntro
        title="IMPACT"
        description="Built for your toughest sessions."
      />,
    );
    expect(
      screen.getByText("Built for your toughest sessions."),
    ).toBeInTheDocument();
  });

  it("toggles expanded content on Learn more click", async () => {
    const user = userEvent.setup();
    render(
      <CollectionIntro
        title="IMPACT"
        expandedContent={<p>Extra info here</p>}
      />,
    );
    expect(screen.queryByText("Extra info here")).not.toBeVisible();
    await user.click(screen.getByText(/learn more/i));
    expect(screen.getByText("Extra info here")).toBeVisible();
  });
});
