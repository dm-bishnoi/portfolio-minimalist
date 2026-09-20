import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, delay: 0.15 + 0.08 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const labels = [
  { key: "lesson", label: "Lesson", accent: false },
  { key: "code", label: "Write code", accent: false },
  { key: "execute", label: "Sandboxed run", accent: true },
  { key: "progress", label: "Progress", accent: false },
];

const markers = (
  <defs>
    <marker id="ignytis-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink-soft)" />
    </marker>
    <marker id="ignytis-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
    </marker>
  </defs>
);

// ── Horizontal layout (tablet/desktop) ──────────────────────────────────
const H_NODE_W = 90;
const H_NODE_H = 44;
const H_Y = 40;
const H_CY = H_Y + H_NODE_H / 2;
const H_LOOP_Y = H_CY + 60;
const hNodes = labels.map((n, i) => ({ ...n, x: 8 + i * 120 }));
const hCenter = (x: number) => x + H_NODE_W / 2;
const hDotPath = [
  { x: hCenter(hNodes[0].x), y: H_CY },
  { x: hCenter(hNodes[1].x), y: H_CY },
  { x: hCenter(hNodes[2].x), y: H_CY },
  { x: hCenter(hNodes[3].x), y: H_CY },
  { x: hCenter(hNodes[3].x), y: H_LOOP_Y },
  { x: hCenter(hNodes[0].x), y: H_LOOP_Y },
  { x: hCenter(hNodes[0].x), y: H_CY },
];
const hLoopPath = `M ${hCenter(hNodes[3].x)} ${H_Y + H_NODE_H} V ${H_LOOP_Y} H ${hCenter(hNodes[0].x)} V ${H_Y + H_NODE_H}`;

function HorizontalLoop({ inView }: { inView: boolean }) {
  const state = inView ? "visible" : "hidden";
  return (
    <svg
      viewBox="0 0 460 190"
      role="img"
      aria-label="Learning loop: a lesson leads to writing code, running it in a sandbox, and tracked progress, which loops back into the next lesson."
    >
      <title>Lesson → write code → sandboxed run → progress → next lesson</title>
      {markers}

      {hNodes.slice(0, -1).map((n, i) => (
        <motion.line
          key={`arrow-${n.key}`}
          x1={n.x + H_NODE_W}
          y1={H_CY}
          x2={hNodes[i + 1].x}
          y2={H_CY}
          stroke="var(--ink-soft)"
          strokeWidth="1.2"
          markerEnd="url(#ignytis-arrow)"
          custom={i}
          initial="hidden"
          animate={state}
          variants={lineVariants}
        />
      ))}

      <motion.path
        d={hLoopPath}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        markerEnd="url(#ignytis-arrow-accent)"
        custom={hNodes.length}
        initial="hidden"
        animate={state}
        variants={lineVariants}
      />
      <text
        x={(hCenter(hNodes[0].x) + hCenter(hNodes[3].x)) / 2}
        y={H_LOOP_Y + 16}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill="var(--ink-faint)"
      >
        next lesson
      </text>

      {hNodes.map((n, i) => (
        <motion.g key={n.key} custom={i} initial="hidden" animate={state} variants={nodeVariants}>
          <rect
            x={n.x}
            y={H_Y}
            width={H_NODE_W}
            height={H_NODE_H}
            rx="6"
            fill="none"
            stroke={n.accent ? "var(--accent)" : "var(--ink)"}
            strokeWidth="1.2"
          />
          <text
            x={hCenter(n.x)}
            y={H_CY + 4}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="9.5"
            fill={n.accent ? "var(--accent-text)" : "var(--ink)"}
          >
            {n.label}
          </text>
        </motion.g>
      ))}

      <AnimatedDot path={hDotPath} />
    </svg>
  );
}

// ── Vertical layout (mobile) — same loop, stacked so labels stay readable ──
const V_NODE_W = 170;
const V_NODE_H = 46;
const V_X = 14;
const V_GAP = 50;
const V_BRACKET_X = V_X + V_NODE_W + 40;
const vNodes = labels.map((n, i) => ({ ...n, y: 10 + i * (V_NODE_H + V_GAP) }));
const vCenterX = V_X + V_NODE_W / 2;
const vMidY = (vNodes[0].y + V_NODE_H / 2 + vNodes[3].y + V_NODE_H / 2) / 2;
const vLoopPath = `M ${V_X + V_NODE_W} ${vNodes[3].y + V_NODE_H / 2} H ${V_BRACKET_X} V ${vNodes[0].y + V_NODE_H / 2} H ${V_X + V_NODE_W}`;
const vDotPath = [
  { x: vCenterX, y: vNodes[0].y + V_NODE_H / 2 },
  { x: vCenterX, y: vNodes[1].y + V_NODE_H / 2 },
  { x: vCenterX, y: vNodes[2].y + V_NODE_H / 2 },
  { x: vCenterX, y: vNodes[3].y + V_NODE_H / 2 },
  { x: V_X + V_NODE_W, y: vNodes[3].y + V_NODE_H / 2 },
  { x: V_BRACKET_X, y: vNodes[3].y + V_NODE_H / 2 },
  { x: V_BRACKET_X, y: vNodes[0].y + V_NODE_H / 2 },
  { x: V_X + V_NODE_W, y: vNodes[0].y + V_NODE_H / 2 },
  { x: vCenterX, y: vNodes[0].y + V_NODE_H / 2 },
];
const V_VIEW_H = vNodes[3].y + V_NODE_H + 30;

function VerticalLoop({ inView }: { inView: boolean }) {
  const state = inView ? "visible" : "hidden";
  return (
    <svg
      viewBox={`0 0 260 ${V_VIEW_H}`}
      role="img"
      aria-label="Learning loop: a lesson leads to writing code, running it in a sandbox, and tracked progress, which loops back into the next lesson."
    >
      <title>Lesson → write code → sandboxed run → progress → next lesson</title>
      {markers}

      {vNodes.slice(0, -1).map((n, i) => (
        <motion.line
          key={`arrow-${n.key}`}
          x1={vCenterX}
          y1={n.y + V_NODE_H}
          x2={vCenterX}
          y2={vNodes[i + 1].y}
          stroke="var(--ink-soft)"
          strokeWidth="1.2"
          markerEnd="url(#ignytis-arrow)"
          custom={i}
          initial="hidden"
          animate={state}
          variants={lineVariants}
        />
      ))}

      <motion.path
        d={vLoopPath}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        markerEnd="url(#ignytis-arrow-accent)"
        custom={vNodes.length}
        initial="hidden"
        animate={state}
        variants={lineVariants}
      />
      <text
        x={V_BRACKET_X + 14}
        y={vMidY}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill="var(--ink-faint)"
        transform={`rotate(-90 ${V_BRACKET_X + 14} ${vMidY})`}
      >
        next lesson
      </text>

      {vNodes.map((n, i) => (
        <motion.g key={n.key} custom={i} initial="hidden" animate={state} variants={nodeVariants}>
          <rect
            x={V_X}
            y={n.y}
            width={V_NODE_W}
            height={V_NODE_H}
            rx="6"
            fill="none"
            stroke={n.accent ? "var(--accent)" : "var(--ink)"}
            strokeWidth="1.2"
          />
          <text
            x={vCenterX}
            y={n.y + V_NODE_H / 2 + 4}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="12"
            fill={n.accent ? "var(--accent-text)" : "var(--ink)"}
          >
            {n.label}
          </text>
        </motion.g>
      ))}

      <AnimatedDot path={vDotPath} />
    </svg>
  );
}

function AnimatedDot({ path }: { path: { x: number; y: number }[] }) {
  const [reduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  if (reduced) return null;
  const times = path.map((_, i) => i / (path.length - 1));
  return (
    <motion.circle
      r="4"
      fill="var(--accent)"
      initial={{ cx: path[0].x, cy: path[0].y }}
      animate={{ cx: path.map((p) => p.x), cy: path.map((p) => p.y) }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear", times }}
    />
  );
}

export function IgnytisLoopDiagram() {
  const [isNarrow, setIsNarrow] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const handler = (e: MediaQueryListEvent) => setIsNarrow(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Observe a plain HTML wrapper rather than gating each SVG child shape with
  // its own `whileInView` (WebKit's IntersectionObserver is unreliable when
  // the target is an SVG shape/group element itself, which left the diagram
  // permanently stuck at opacity:0 on iPhone Safari/Chrome — both WebKit —
  // while working fine on desktop Chromium). A plain <div> is the same kind
  // of observation target already used reliably elsewhere in this codebase
  // (see WebBugPilotCase.tsx's useInView on a motion.div).
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { once: true });

  return (
    <div ref={wrapperRef}>
      {isNarrow ? <VerticalLoop inView={inView} /> : <HorizontalLoop inView={inView} />}
    </div>
  );
}
