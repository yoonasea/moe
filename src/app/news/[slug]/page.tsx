import { notFound } from "next/navigation";
import { getNewsBySlug, getAllNewsSlugs } from "@/lib/api";
import RichTextRenderer from "@/components/RichTextRenderer";
import Link from "next/link";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) notFound();

  const date = new Date(article.publishDate).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className={styles.page}>
      <Link href="/news" className={styles.back}>
        &larr; Back to News
      </Link>
      <h1 className={styles.title}>{article.title}</h1>
      <div className={styles.meta}>
        <span className={styles.category}>{article.category.name}</span>
        <time dateTime={article.publishDate}>{date}</time>
      </div>
      <img
        src={article.image}
        alt={article.alt}
        className={styles.image}
      />
      <RichTextRenderer html={article.body} />
    </article>
  );
}
