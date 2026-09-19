import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>© {new Date().getFullYear()} Dharmender Bishnoi</p>
        <a href="#hero" className="link-underline">
          Back to top
        </a>
      </div>
    </footer>
  );
}
