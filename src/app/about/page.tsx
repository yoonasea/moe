import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/api";
import RichTextRenderer from "@/components/RichTextRenderer";
import styles from "./page.module.css";

export const revalidate = 60;

export default async function AboutPage() {
  const page = await getPageBySlug("about");

  if (!page) notFound();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{page.title}</h1>
      <RichTextRenderer html={page.body} />
    </div>
  );
}
