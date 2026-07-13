import Link from "next/link";
import type { Hero } from "@/lib/types";
import styles from "./HeroSection.module.css";

interface Props {
  hero: Hero;
}

export default function HeroSection({ hero }: Props) {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      aria-label="Hero banner"
    >
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <h1 className={styles.title}>{hero.title}</h1>
        <p className={styles.subtitle}>{hero.subtitle}</p>
        <Link href={hero.ctaLink} className={styles.cta}>
          {hero.ctaText}
        </Link>
      </div>
    </section>
  );
}
