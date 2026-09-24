import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./BackToTop.module.css";

const SHOW_AFTER = 700;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [footerLift, setFooterLift] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setVisible(window.scrollY > SHOW_AFTER);

      // Lift clear of the footer once it scrolls into view, so the control
      // never sits on top of the footer links.
      const footer = document.querySelector("footer");
      const overlap = footer ? window.innerHeight - footer.getBoundingClientRect().top : 0;
      setFooterLift(Math.max(0, Math.round(overlap)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    // The button unmounts once we're back at the top; hand focus to the start
    // of the main content so keyboard users aren't dropped on <body>.
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          type="button"
          className={styles.button}
          aria-label="Back to top"
          onClick={toTop}
          style={{ "--footer-lift": `${footerLift}px` } as CSSProperties}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.arrow} aria-hidden="true">
            ↑
          </span>
          <span aria-hidden="true">Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
