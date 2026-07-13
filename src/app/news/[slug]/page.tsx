import { notFound } from "next/navigation";
import { getNewsBySlug, getAllNewsSlugs } from "@/lib/api";
import Image from "next/image";
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
      <div className={styles.imageWrapper}>
        <Image
          src={article.image}
          alt={article.alt}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      <RichTextRenderer content={article.body} />
    </article>
  );
}
