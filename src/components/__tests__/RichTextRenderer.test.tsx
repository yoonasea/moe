import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RichTextRenderer from "../RichTextRenderer";

describe("RichTextRenderer", () => {
  it("renders headings from markdown", () => {
    render(<RichTextRenderer content="## Test Heading" />);

    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Heading").tagName).toBe("H2");
  });

  it("renders paragraphs from markdown", () => {
    render(<RichTextRenderer content="A paragraph of text." />);

    expect(screen.getByText("A paragraph of text.")).toBeInTheDocument();
  });

  it("renders unordered lists", () => {
    render(<RichTextRenderer content={`- Item 1
- Item 2`} />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });
});
