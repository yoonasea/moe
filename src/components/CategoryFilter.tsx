import type { Category } from "@/lib/types";
import styles from "./CategoryFilter.module.css";

interface Props {
  categories: Category[];
  active: string | undefined;
  onChange: (slug: string | undefined) => void;
}

export default function CategoryFilter({ categories, active, onChange }: Props) {
  return (
    <div className={styles.wrapper} role="group" aria-label="Filter by category">
      <button
        className={`${styles.button} ${!active ? styles.active : ""}`}
        onClick={() => onChange(undefined)}
        aria-pressed={!active}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`${styles.button} ${active === cat.slug ? styles.active : ""}`}
          onClick={() => onChange(cat.slug)}
          aria-pressed={active === cat.slug}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
