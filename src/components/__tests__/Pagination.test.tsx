import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Pagination from "../Pagination";

describe("Pagination", () => {
  it("renders nothing when totalPages is 1", () => {
    const { container } = render(
      <Pagination page={1} totalPages={1} onPageChange={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders page buttons and info text", () => {
    render(
      <Pagination page={2} totalPages={5} onPageChange={() => {}} />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  it("highlights active page", () => {
    render(
      <Pagination page={3} totalPages={5} onPageChange={() => {}} />
    );

    const activeBtn = screen.getByLabelText("Page 3");
    expect(activeBtn).toHaveAttribute("aria-current", "page");
  });

  it("disables prev button on first page", () => {
    render(
      <Pagination page={1} totalPages={5} onPageChange={() => {}} />
    );

    expect(screen.getByLabelText("Previous page")).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <Pagination page={5} totalPages={5} onPageChange={() => {}} />
    );

    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  it("calls onPageChange with correct page number", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Pagination page={2} totalPages={5} onPageChange={onPageChange} />
    );

    await user.click(screen.getByLabelText("Page 4"));
    expect(onPageChange).toHaveBeenCalledWith(4);

    await user.click(screen.getByLabelText("Next page"));
    expect(onPageChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByLabelText("Previous page"));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("has accessible navigation landmark", () => {
    render(
      <Pagination page={1} totalPages={3} onPageChange={() => {}} />
    );

    expect(screen.getByLabelText("Pagination")).toBeInTheDocument();
  });
});
