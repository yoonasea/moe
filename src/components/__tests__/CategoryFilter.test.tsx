import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import CategoryFilter from "../CategoryFilter";
import { createCategory } from "@/test/factories";

describe("CategoryFilter", () => {
  const categories = [
    createCategory({ id: "c1", name: "Press Releases", slug: "press-releases" }),
    createCategory({ id: "c2", name: "Announcements", slug: "announcements" }),
    createCategory({ id: "c3", name: "Speeches", slug: "speeches" }),
  ];

  it("renders All button plus all categories", () => {
    render(
      <CategoryFilter categories={categories} active={undefined} onChange={() => {}} />
    );

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Press Releases")).toBeInTheDocument();
    expect(screen.getByText("Announcements")).toBeInTheDocument();
    expect(screen.getByText("Speeches")).toBeInTheDocument();
  });

  it("highlights All when no category is active", () => {
    render(
      <CategoryFilter categories={categories} active={undefined} onChange={() => {}} />
    );

    expect(screen.getByText("All")).toHaveAttribute("aria-pressed", "true");
  });

  it("highlights active category", () => {
    render(
      <CategoryFilter
        categories={categories}
        active="announcements"
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Announcements")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("All")).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onChange with slug when category clicked", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <CategoryFilter categories={categories} active={undefined} onChange={onChange} />
    );

    await user.click(screen.getByText("Speeches"));
    expect(onChange).toHaveBeenCalledWith("speeches");
  });

  it("calls onChange with undefined when All clicked", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <CategoryFilter
        categories={categories}
        active="press-releases"
        onChange={onChange}
      />
    );

    await user.click(screen.getByText("All"));
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it("has accessible group label", () => {
    render(
      <CategoryFilter categories={categories} active={undefined} onChange={() => {}} />
    );

    expect(screen.getByLabelText("Filter by category")).toBeInTheDocument();
  });
});
