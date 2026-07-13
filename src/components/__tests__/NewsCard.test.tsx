import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NewsCard from "../NewsCard";
import { createNewsArticle } from "@/test/factories";

describe("NewsCard", () => {
  it("renders article title as a link", () => {
    const article = createNewsArticle({ title: "Amazing News" });
    render(<NewsCard article={article} />);

    const link = screen.getByText("Amazing News");
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", `/news/${article.slug}`);
  });

  it("renders category and excerpt", () => {
    const article = createNewsArticle({
      excerpt: "A short summary",
      category: { id: "cat-2", name: "Announcements", slug: "announcements" },
    });
    render(<NewsCard article={article} />);

    expect(screen.getByText("Announcements")).toBeInTheDocument();
    expect(screen.getByText("A short summary")).toBeInTheDocument();
  });

  it("renders image with alt text", () => {
    const article = createNewsArticle({ alt: "Photo of event" });
    render(<NewsCard article={article} />);

    const img = screen.getByAltText("Photo of event");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", article.image);
  });

  it("renders formatted date", () => {
    const article = createNewsArticle({ publishDate: "2025-06-15T10:00:00.000Z" });
    render(<NewsCard article={article} />);

    const time = screen.getByText(/June/i);
    expect(time).toBeInTheDocument();
  });
});
