import { useEffect, useState } from "react";
import { nav, profile } from "../data/content";
import styles from "./Nav.module.css";

export function Nav() {
  const [active, setActive] = useState(nav[0].id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav className={styles.rail} aria-label="Section navigation">
        <a href="#hero" className={styles.mark} aria-label={`${profile.name} — home`}>
          DB
        </a>
        <ul>
          {nav.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={item.id === active ? styles.active : ""}
                onClick={() => go(item.id)}
                aria-current={item.id === active ? "true" : undefined}
              >
                <span className={styles.num}>{item.num}</span>
                <span className={styles.label}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.mobileBar}>
        <a href="#hero" className={styles.mobileMark}>
          DB
        </a>
        <button
          type="button"
          className={styles.mobileToggle}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Section navigation">
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <button type="button" onClick={() => go(item.id)}>
                  <span className={styles.num}>{item.num}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
