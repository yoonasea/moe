import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <p>&copy; {new Date().getFullYear()} Ministry of Education. All rights reserved.</p>
    </footer>
  );
}
