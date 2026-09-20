import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const stages = [
  { x: 60, label: "Game Engine", sub: "core" },
  { x: 240, label: "Plugin API", sub: "contract" },
  { x: 420, label: "Teen Patti", sub: "shipped", accent: true },
  { x: 600, label: "WS Gateway", sub: "realtime" },
];

const Y = 70;
const REPLAY = { x: 700, y: 160 };
const ANALYTICS = { x: 620, y: 160 };

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const nodeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function PipelineDiagram() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = setTimeout(() => setAnimate(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const xs = stages.map((s) => s.x).concat([ANALYTICS.x, REPLAY.x]);
  const ys = stages.map(() => Y).concat([ANALYTICS.y, REPLAY.y]);

  return (
    <svg
      viewBox="0 0 760 200"
      role="img"
      aria-label="Diagram: signal flowing from the game engine core through the plugin API to Teen Patti, the WebSocket gateway, and out to replay and analytics"
    >
      <title>Game engine → plugin API → Teen Patti (shipped) → WebSocket gateway → replay / analytics</title>

      {stages.slice(0, -1).map((s, i) => (
        <motion.line
          key={`l-${i}`}
          x1={s.x + 34}
          y1={Y}
          x2={stages[i + 1].x - 34}
          y2={Y}
          stroke="var(--line-strong)"
          strokeWidth="1.2"
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={lineVariants}
        />
      ))}
      <motion.line
        x1={stages[3].x + 30}
        y1={Y + 10}
        x2={ANALYTICS.x - 10}
        y2={ANALYTICS.y - 14}
        stroke="var(--line-strong)"
        strokeWidth="1"
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={lineVariants}
      />
      <motion.line
        x1={ANALYTICS.x + 40}
        y1={ANALYTICS.y}
        x2={REPLAY.x - 40}
        y2={REPLAY.y}
        stroke="var(--line-strong)"
        strokeWidth="1"
        custom={4}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={lineVariants}
      />

      {animate && (
        <motion.circle
          r="4"
          fill="var(--accent)"
          initial={{ cx: stages[0].x, cy: Y, opacity: 0.9 }}
          animate={{ cx: xs, cy: ys }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "linear", times: [0, 0.22, 0.44, 0.66, 0.83, 1] }}
        />
      )}

      {stages.map((s, i) => (
        <motion.g key={s.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={nodeVariants}>
          <rect
            x={s.x - 40}
            y={Y - 22}
            width="80"
            height="44"
            rx={s.accent ? 22 : 6}
            fill="none"
            stroke={s.accent ? "var(--accent)" : "var(--ink-soft)"}
            strokeWidth={s.accent ? 1.4 : 1}
          />
          <text x={s.x} y={Y - 2} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill={s.accent ? "var(--accent-text)" : "var(--ink)"}>
            {s.label}
          </text>
          <text x={s.x} y={Y + 12} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--ink-faint)">
            {s.sub}
          </text>
        </motion.g>
      ))}

      <motion.g custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={nodeVariants}>
        <rect x={ANALYTICS.x - 36} y={ANALYTICS.y - 16} width="72" height="32" rx="5" fill="none" stroke="var(--ink-soft)" strokeWidth="1" />
        <text x={ANALYTICS.x} y={ANALYTICS.y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-soft)">
          Analytics
        </text>
      </motion.g>
      <motion.g custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={nodeVariants}>
        <rect x={REPLAY.x - 36} y={REPLAY.y - 16} width="72" height="32" rx="5" fill="none" stroke="var(--ink-soft)" strokeWidth="1" />
        <text x={REPLAY.x} y={REPLAY.y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-soft)">
          Replay
        </text>
      </motion.g>
    </svg>
  );
}
