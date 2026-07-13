import styles from "./Pagination.module.css";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className={styles.wrapper} aria-label="Pagination">
      <button
        className={styles.button}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        &laquo; Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`${styles.button} ${p === page ? styles.active : ""}`}
          onClick={() => onPageChange(p)}
          aria-label={`Page ${p}`}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      <button
        className={styles.button}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        Next &raquo;
      </button>

      <span className={styles.info}>
        Page {page} of {totalPages}
      </span>
    </nav>
  );
}
