import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./RBACDiagram.module.css";

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const modules = ["Customers", "Workflows", "Permissions"];

export function RBACDiagram() {
  const [role, setRole] = useState<"Admin" | "Viewer">("Admin");

  return (
    <div>
      <div className={styles.toggle} role="group" aria-label="Preview access as role">
        <button type="button" className={role === "Admin" ? styles.active : ""} onClick={() => setRole("Admin")}>
          Admin
        </button>
        <button type="button" className={role === "Viewer" ? styles.active : ""} onClick={() => setRole("Viewer")}>
          Viewer
        </button>
      </div>

      <svg
        viewBox="0 0 400 300"
        role="img"
        aria-label={`Diagram: Angular shell routing configurable CRM modules through a role guard, previewing ${role} access`}
      >
        <title>Angular shell → role guard → configurable CRM modules</title>

        {modules.map((_, i) => (
          <motion.line
            key={`l-${i}`}
            x1="200"
            y1="70"
            x2={200 + (i - 1) * 110}
            y2="240"
            stroke="var(--line-strong)"
            strokeWidth="1"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={lineVariants}
          />
        ))}

        <motion.rect
          x="140"
          y="40"
          width="120"
          height="46"
          rx="4"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.2"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={nodeVariants}
        />
        <text x="200" y="68" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink)">
          Angular Shell
        </text>

        <motion.rect
          x="160"
          y="140"
          width="80"
          height="36"
          rx="18"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.2"
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={nodeVariants}
        />
        <text x="200" y="163" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--accent-text)">
          Role Guard
        </text>

        {modules.map((label, i) => {
          const locked = label === "Permissions" && role === "Viewer";
          return (
            <motion.g
              key={label}
              custom={i + 2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={nodeVariants}
            >
              <motion.rect
                x={200 + (i - 1) * 110 - 55}
                y="240"
                width="110"
                height="42"
                rx="4"
                fill="none"
                stroke={locked ? "var(--line-strong)" : "var(--ink-soft)"}
                strokeDasharray={locked ? "3 3" : undefined}
                strokeWidth="1"
                animate={{ opacity: locked ? 0.45 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.text
                x={200 + (i - 1) * 110}
                y="265"
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="9.5"
                fill={locked ? "var(--ink-faint)" : "var(--ink-soft)"}
                animate={{ opacity: locked ? 0.6 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {label}
                {locked ? " (locked)" : ""}
              </motion.text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
