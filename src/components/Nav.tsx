import { useEffect, useRef, useState } from "react";
import { nav, profile } from "../data/content";
import styles from "./Nav.module.css";

export function Nav() {
  const [active, setActive] = useState(nav[0].id);
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Closing the overlay normally hands focus back to the toggle; choosing a
  // section instead moves focus to that section, so the restore is skipped.
  const restoreFocusRef = useRef(true);

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
    const target = document.getElementById(id);
    if (!target) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    // Move keyboard focus with the scroll so the next Tab continues from the
    // chosen section instead of jumping back to the top of the page.
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    restoreFocusRef.current = false;
    setOpen(false);
  };

  // Mobile overlay: trap focus while open, restore it to the toggle on close.
  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = true;
    const overlay = overlayRef.current;
    const toggle = toggleRef.current;
    const items = Array.from(overlay?.querySelectorAll<HTMLElement>("button, a[href]") ?? []);
    // The Close toggle sits outside the overlay, so it joins the trap explicitly.
    const focusable = toggle ? [toggle, ...items] : items;
    items[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (restoreFocusRef.current) toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <nav className={styles.rail} aria-label="Section navigation">
        <a href="#hero" className={styles.mark} aria-label={`DB — ${profile.name}, home`}>
          DB
        </a>
        <ul>
          {nav.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={item.id === active ? styles.active : ""}
                onClick={() => go(item.id)}
                aria-current={item.id === active ? "location" : undefined}
              >
                <span className={styles.num}>{item.num}</span>
                <span className={styles.label}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.mobileBar}>
        <a href="#hero" className={styles.mobileMark} aria-label={`DB — ${profile.name}, home`}>
          DB
        </a>
        <button
          ref={toggleRef}
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
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Section navigation"
          ref={overlayRef}
        >
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
