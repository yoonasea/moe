import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NewsList from "../NewsList";
import { createNewsArticle } from "@/test/factories";

describe("NewsList", () => {
  it("renders a list of articles", () => {
    const articles = [
      createNewsArticle({ id: "1", title: "Article One" }),
      createNewsArticle({ id: "2", title: "Article Two" }),
    ];

    render(<NewsList articles={articles} />);

    expect(screen.getByText("Article One")).toBeInTheDocument();
    expect(screen.getByText("Article Two")).toBeInTheDocument();
  });

  it("renders empty state when no articles", () => {
    render(<NewsList articles={[]} />);

    expect(screen.getByText("No articles found.")).toBeInTheDocument();
  });

  it("has accessible list role", () => {
    const articles = [createNewsArticle()];
    render(<NewsList articles={articles} />);

    expect(screen.getByLabelText("News articles")).toBeInTheDocument();
  });
});
