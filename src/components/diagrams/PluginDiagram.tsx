import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay: 0.05 + i * 0.09, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const satellites = [
  { label: "Plugin API", x: 70, y: 60 },
  { label: "WS Gateway", x: 330, y: 60 },
  { label: "Replay", x: 60, y: 240 },
  { label: "Analytics", x: 340, y: 240 },
];

export function PluginDiagram() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = setTimeout(() => setPulse(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label="Diagram: plugin-based game engine core connected to platform packages and the Teen Patti plugin, with a live connection to the WebSocket gateway"
    >
      <title>Game-engine core with plugin API, WebSocket gateway, replay and analytics packages, and Teen Patti as the implemented plugin</title>

      {satellites.map((s, i) => (
        <motion.line
          key={s.label}
          x1="200"
          y1="150"
          x2={s.x}
          y2={s.y}
          stroke="var(--line-strong)"
          strokeWidth="1"
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={lineVariants}
        />
      ))}

      {/* live WS connection pulse */}
      <line x1="200" y1="150" x2={satellites[1].x} y2={satellites[1].y} stroke="none" />
      {pulse && (
        <motion.line
          x1="200"
          y1="150"
          x2={satellites[1].x}
          y2={satellites[1].y}
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeDasharray="6 10"
          initial={{ strokeDashoffset: 0, opacity: 0.9 }}
          animate={{ strokeDashoffset: -32 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
      )}

      <motion.line
        x1="200"
        y1="150"
        x2="200"
        y2="250"
        stroke="var(--accent)"
        strokeWidth="1.2"
        custom={4}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={lineVariants}
      />

      <motion.circle
        cx="200"
        cy="150"
        r="34"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.2"
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={nodeVariants}
      />
      <text x="200" y="147" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)">
        Game
      </text>
      <text x="200" y="159" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)">
        Engine
      </text>

      {satellites.map((s, i) => (
        <g key={s.label}>
          <motion.rect
            x={s.x - 44}
            y={s.y - 16}
            width="88"
            height="32"
            rx="4"
            fill="none"
            stroke="var(--ink-soft)"
            strokeWidth="1"
            custom={i + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={nodeVariants}
          />
          <text x={s.x} y={s.y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-soft)">
            {s.label}
          </text>
          {s.label === "Replay" && (
            <g>
              <line x1={s.x - 26} y1={s.y + 20} x2={s.x + 26} y2={s.y + 20} stroke="var(--line-strong)" strokeWidth="1" />
              <circle cx={s.x - 4} cy={s.y + 20} r="2.5" fill="var(--accent-text)" />
            </g>
          )}
        </g>
      ))}

      <motion.rect
        x="146"
        y="250"
        width="108"
        height="36"
        rx="18"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.3"
        custom={5}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={nodeVariants}
      />
      <text x="200" y="272" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--accent-text)">
        Teen Patti (shipped)
      </text>
    </svg>
  );
}
