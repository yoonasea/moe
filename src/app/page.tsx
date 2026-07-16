import Link from "next/link";
import { getHero, getLatestNews } from "@/lib/api";
import HeroSection from "@/components/HeroSection";
import NewsList from "@/components/NewsList";
import styles from "./page.module.css";

export const revalidate = 60;

export default async function Home() {
  const [hero, latestNews] = await Promise.all([
    getHero(),
    getLatestNews(3),
  ]);

  return (
    <>
      <HeroSection hero={hero} />
      <section className={styles.teaser}>
        <div className={styles.headerRow}>
          <h2 className={styles.heading}>Latest News</h2>
          <Link href="/news" className={styles.viewMore}>
            View More &rarr;
          </Link>
        </div>
        <NewsList articles={latestNews} />
      </section>
    </>
  );
}
