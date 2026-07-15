import styles from "./loading.module.css";

export default function Loading() {
  return (
    <>
      <section className={`${styles.skeleton} ${styles.hero}`} aria-label="Loading">
        <div className={`${styles.skeleton} ${styles.heroTitle}`} />
        <div className={`${styles.skeleton} ${styles.heroSubtitle}`} />
        <div className={`${styles.skeleton} ${styles.heroCta}`} />
      </section>

      <section className={styles.teaser}>
        <div className={`${styles.skeleton} ${styles.heading}`} />
        <div className={styles.grid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.card}>
              <div className={`${styles.skeleton} ${styles.cardImage}`} />
              <div className={styles.cardBody}>
                <div className={`${styles.skeleton} ${styles.cardMeta}`} />
                <div className={`${styles.skeleton} ${styles.cardTitle}`} />
                <div className={`${styles.skeleton} ${styles.cardExcerpt}`} />
                <div className={`${styles.skeleton} ${styles.cardExcerptShort}`} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
