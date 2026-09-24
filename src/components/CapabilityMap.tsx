import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { capabilities, evidenceNodes, type EvidenceNodeId } from "../data/content";
import styles from "./CapabilityMap.module.css";

type Line = { key: string; x1: number; y1: number; x2: number; y2: number };

export function CapabilityMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const capRefs = useRef<(HTMLLIElement | null)[]>([]);
  const nodeRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const active = hovered ?? pinned;

  const recompute = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    setSize({ w: cRect.width, h: cRect.height });

    if (active === null) {
      setLines([]);
      return;
    }

    const capEl = capRefs.current[active];
    if (!capEl) return;
    const capRect = capEl.getBoundingClientRect();
    const x1 = capRect.right - cRect.left;
    const y1 = capRect.top + capRect.height / 2 - cRect.top;

    const sources = capabilities.items[active].sources as EvidenceNodeId[];
    const next: Line[] = sources.map((id) => {
      const nodeEl = nodeRefs.current[id];
      const nRect = nodeEl?.getBoundingClientRect();
      const x2 = nRect ? nRect.left - cRect.left : x1;
      const y2 = nRect ? nRect.top + nRect.height / 2 - cRect.top : y1;
      return { key: `${active}-${id}`, x1, y1, x2, y2 };
    });
    setLines(next);
  }, [active]);

  useEffect(() => {
    recompute();
    // the active row's evidence text expands via a CSS transition; re-measure
    // once it has settled so the connector line lands on the final position.
    const t = setTimeout(recompute, 380);
    window.addEventListener("resize", recompute);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", recompute);
    };
  }, [recompute]);

  const isNodeActive = (id: string) =>
    active !== null && (capabilities.items[active].sources as EvidenceNodeId[]).includes(id as EvidenceNodeId);

  return (
    <div className={styles.map} ref={containerRef}>
      <svg className={styles.svg} width={size.w} height={size.h} aria-hidden="true">
        {lines.map((l) => (
          <motion.line
            key={l.key}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="var(--accent)"
            strokeWidth="1.4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </svg>

      <ul className={styles.capList}>
        {capabilities.items.map((item, i) => (
          <li
            key={item.title}
            ref={(el) => {
              capRefs.current[i] = el;
            }}
          >
            <button
              type="button"
              className={`${styles.capItem} ${active === i ? styles.capActive : ""}`}
              aria-pressed={pinned === i}
              aria-label={`${item.title}. ${item.evidence}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              onClick={() => setPinned((p) => (p === i ? null : i))}
            >
              <span className={styles.capIndex}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.capTitle}>{item.title}</span>
              <span className={styles.mobileSources} aria-hidden="true">
                {(item.sources as EvidenceNodeId[]).map((id) => {
                  const node = evidenceNodes.find((n) => n.id === id);
                  if (!node) return null;
                  return <span key={id}>{node.label}</span>;
                })}
              </span>
              <span className={styles.capEvidence}>{item.evidence}</span>
            </button>
          </li>
        ))}
      </ul>

      <ul className={styles.nodeList}>
        {evidenceNodes.map((node) => (
          <li
            key={node.id}
            ref={(el) => {
              nodeRefs.current[node.id] = el;
            }}
            className={`${styles.node} ${isNodeActive(node.id) ? styles.nodeActive : ""}`}
          >
            <a href={node.href}>{node.label} ↗</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
