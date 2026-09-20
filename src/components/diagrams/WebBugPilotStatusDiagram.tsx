import { motion } from "framer-motion";
import styles from "./WebBugPilotStatusDiagram.module.css";

const implemented = [
  "Playwright-driven browser automation, wired end-to-end",
  "AI reasoning loop — local Ollama or an optional cloud provider",
  "Real-time SSE stream — live screenshots, cursor & actions",
  "Bug detection with fingerprint dedup & evidence",
];

const planned = ["Standalone report export (Markdown/HTML file)"];

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function WebBugPilotStatusDiagram() {
  return (
    <div
      className={styles.console}
      role="img"
      aria-label="Build status. Implemented: Playwright-driven browser automation, the AI reasoning loop, real-time SSE streaming of live screenshots and actions, and bug detection with fingerprint dedup. Planned, not yet shipped: standalone report export as a Markdown or HTML file."
    >
      <p className={styles.label}>Current build status</p>

      <ul className={styles.rows}>
        {implemented.map((row, i) => (
          <motion.li
            key={row}
            className={styles.row}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={rowVariants}
          >
            <span className={styles.dotOn} aria-hidden="true" />
            <span className={styles.rowLabel}>{row}</span>
            <span className={styles.tagOn}>Implemented</span>
          </motion.li>
        ))}
      </ul>

      <div className={styles.divider} aria-hidden="true">
        <span>Next</span>
      </div>

      <ul className={styles.rows}>
        {planned.map((row, i) => (
          <motion.li
            key={row}
            className={`${styles.row} ${styles.rowPlanned}`}
            custom={implemented.length + i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={rowVariants}
          >
            <span className={styles.dotOff} aria-hidden="true" />
            <span className={styles.rowLabel}>{row}</span>
            <span className={styles.tagOff}>Planned</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
