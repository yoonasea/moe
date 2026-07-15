import styles from "../loading.module.css";

export default function AboutLoading() {
  return (
    <div className={styles.detailPage} aria-label="Loading">
      <div className={`${styles.skeleton} ${styles.detailTitle}`} />
      <div className={`${styles.skeleton} ${styles.bodyLine}`} />
      <div className={`${styles.skeleton} ${styles.bodyLine}`} />
      <div className={`${styles.skeleton} ${styles.bodyLine}`} />
      <div className={`${styles.skeleton} ${styles.bodyLineShort}`} />
    </div>
  );
}
