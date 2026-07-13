import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <Link href="/" className={styles.logo} aria-label="MOE Home">
        <Image
          src="/images/moe-logo.svg"
          alt="Ministry of Education"
          width={60}
          height={20}
          priority
        />
      </Link>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/news">News</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
