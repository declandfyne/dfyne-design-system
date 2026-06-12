import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion, AccordionItem } from "./Accordion";

describe("Accordion", () => {
  it("renders all item titles", () => {
    render(
      <Accordion>
        <AccordionItem title="First">Content 1</AccordionItem>
        <AccordionItem title="Second">Content 2</AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("shows content when defaultOpen is true", () => {
    render(
      <Accordion>
        <AccordionItem title="Open" defaultOpen>Visible content</AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("Visible content")).toBeVisible();
  });

  it("hides content by default", () => {
    render(
      <Accordion>
        <AccordionItem title="Closed">Hidden content</AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("Hidden content")).not.toBeVisible();
  });

  it("toggles content on click", async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem title="Toggle">Toggle content</AccordionItem>
      </Accordion>
    );
    await user.click(screen.getByText("Toggle"));
    expect(screen.getByText("Toggle content")).toBeVisible();
    await user.click(screen.getByText("Toggle"));
    expect(screen.getByText("Toggle content")).not.toBeVisible();
  });

  it("single-open mode: opening one closes another", async () => {
    const user = userEvent.setup();
    render(
      <Accordion allowMultiple={false}>
        <AccordionItem title="First" defaultOpen>Content 1</AccordionItem>
        <AccordionItem title="Second">Content 2</AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("Content 1")).toBeVisible();
    await user.click(screen.getByText("Second"));
    expect(screen.getByText("Content 2")).toBeVisible();
    expect(screen.getByText("Content 1")).not.toBeVisible();
  });

  it("multi-open mode: multiple items stay open", async () => {
    const user = userEvent.setup();
    render(
      <Accordion allowMultiple>
        <AccordionItem title="First" defaultOpen>Content 1</AccordionItem>
        <AccordionItem title="Second">Content 2</AccordionItem>
      </Accordion>
    );
    await user.click(screen.getByText("Second"));
    expect(screen.getByText("Content 1")).toBeVisible();
    expect(screen.getByText("Content 2")).toBeVisible();
  });

  it("disabled item does not toggle", async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem title="Disabled" disabled>Should stay hidden</AccordionItem>
      </Accordion>
    );
    await user.click(screen.getByText("Disabled"));
    expect(screen.getByText("Should stay hidden")).not.toBeVisible();
  });
});
