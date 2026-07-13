import Link from "next/link";
import Image from "next/image";
import type { NewsArticle } from "@/lib/types";
import styles from "./NewsCard.module.css";

interface Props {
  article: NewsArticle;
}

export default function NewsCard({ article }: Props) {
  const date = new Date(article.publishDate).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={article.image}
          alt={article.alt}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{article.category.name}</span>
          <time className={styles.date} dateTime={article.publishDate}>
            {date}
          </time>
        </div>
        <h2 className={styles.title}>
          <Link href={`/news/${article.slug}`}>{article.title}</Link>
        </h2>
        <p className={styles.excerpt}>{article.excerpt}</p>
      </div>
    </article>
  );
}
