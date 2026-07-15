import styles from "../loading.module.css";

export default function NewsLoading() {
  return (
    <div className={styles.page} aria-label="Loading">
      <div className={`${styles.skeleton} ${styles.pageHeading}`} />
      <div className={styles.filterBar}>
        <div className={`${styles.skeleton} ${styles.filter}`} />
        <div className={`${styles.skeleton} ${styles.filter}`} />
        <div className={`${styles.skeleton} ${styles.filter}`} />
      </div>
      <div className={styles.grid}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
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
    </div>
  );
}
