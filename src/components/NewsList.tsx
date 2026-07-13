import type { NewsArticle } from "@/lib/types";
import NewsCard from "./NewsCard";
import styles from "./NewsList.module.css";

interface Props {
  articles: NewsArticle[];
}

export default function NewsList({ articles }: Props) {
  if (articles.length === 0) {
    return <p>No articles found.</p>;
  }

  return (
    <div className={styles.grid} role="list" aria-label="News articles">
      {articles.map((article) => (
        <div role="listitem" key={article.id}>
          <NewsCard article={article} />
        </div>
      ))}
    </div>
  );
}
