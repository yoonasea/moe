import styles from "../../loading.module.css";

export default function ArticleLoading() {
  return (
    <div className={styles.detailPage} aria-label="Loading">
      <div className={`${styles.skeleton} ${styles.backLink}`} />
      <div className={`${styles.skeleton} ${styles.detailTitle}`} />
      <div className={`${styles.skeleton} ${styles.detailMeta}`} />
      <div className={`${styles.skeleton} ${styles.detailImage}`} />
      <div className={`${styles.skeleton} ${styles.bodyLine}`} />
      <div className={`${styles.skeleton} ${styles.bodyLine}`} />
      <div className={`${styles.skeleton} ${styles.bodyLine}`} />
      <div className={`${styles.skeleton} ${styles.bodyLine}`} />
      <div className={`${styles.skeleton} ${styles.bodyLineShort}`} />
    </div>
  );
}
