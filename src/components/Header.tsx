import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <Link href="/" className={styles.logo} aria-label="MOE Home">
        Ministry of Education
      </Link>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/news">News</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
