import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type KeyboardEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./CodeReveal.module.css";

const code = [
  { indent: 0, text: "<Card role={role}>" },
  { indent: 1, text: "<Badge>{role}</Badge>" },
  { indent: 1, text: "<PermissionToggle" },
  { indent: 2, text: "checked={canEdit}" },
  { indent: 1, text: "/>" },
  { indent: 1, text: '<Button variant="primary">' },
  { indent: 2, text: "Save changes" },
  { indent: 1, text: "</Button>" },
  { indent: 0, text: "</Card>" },
];

const REST_PERCENT = 38;

// Pointer events on the track bubble up from every element rendered inside
// the simulated interface. Anything a real user could operate there (the
// role-switch buttons today, and whatever future controls join them) must
// keep its own click/keyboard behavior instead of being swallowed as a
// compare-drag gesture.
const INTERACTIVE_SELECTOR =
  'button, input, textarea, select, a[href], [role="button"], [contenteditable="true"], [contenteditable=""]';

export function CodeReveal() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [role, setRole] = useState<"Admin" | "Viewer">("Admin");
  const percent = useMotionValue(0);
  const springPercent = useSpring(percent, { stiffness: 220, damping: 30, mass: 0.6 });
  const clipPath = useTransform(springPercent, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(springPercent, (v) => `${v}%`);
  // Only used for the ARIA attributes below — the visible handle position is
  // driven by the `left` MotionValue above, committed directly to the DOM by
  // Framer without going through React, so dragging doesn't re-render on every frame.
  const [live, setLive] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastRounded = -1;
    const unsub = springPercent.on("change", (v) => {
      const rounded = Math.round(v);
      if (rounded !== lastRounded) {
        lastRounded = rounded;
        setLive(rounded);
      }
    });
    if (reduced) {
      percent.set(REST_PERCENT);
    } else {
      const raf = requestAnimationFrame(() => percent.set(REST_PERCENT));
      return () => {
        cancelAnimationFrame(raf);
        unsub();
      };
    }
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setFromClientX = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    percent.set(Math.min(100, Math.max(0, pct)));
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    // Let the gesture start the drag only when it targets the comparison
    // surface itself — not a control rendered inside the simulated interface.
    if ((e.target as HTMLElement).closest(INTERACTIVE_SELECTOR)) return;
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };

  const endDrag = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const step = { ArrowLeft: -6, ArrowDown: -6, ArrowRight: 6, ArrowUp: 6, PageDown: -20, PageUp: 20 }[e.key];
    let next: number;
    if (step !== undefined) next = percent.get() + step;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 100;
    else return;
    e.preventDefault();
    percent.set(Math.min(100, Math.max(0, next)));
  };

  return (
    <div className={styles.wrap}>
      <div
        className={styles.track}
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{ touchAction: "none" }}
      >
        <div className={styles.uiLayer}>
          <div className={styles.uiCard}>
            <div className={styles.uiCardHead} aria-hidden="true">
              <span className={styles.uiDot} />
              <span className={styles.uiDot} />
              <span className={styles.uiDot} />
            </div>
            <div className={styles.uiBody}>
              <div className={styles.uiRow}>
                <span className={styles.uiBadge} aria-hidden="true">
                  {role}
                </span>
                <div className={styles.roleSwitch} role="group" aria-label="Preview role">
                  <button
                    type="button"
                    aria-pressed={role === "Admin"}
                    className={role === "Admin" ? styles.roleActive : ""}
                    onClick={() => setRole("Admin")}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    aria-pressed={role === "Viewer"}
                    className={role === "Viewer" ? styles.roleActive : ""}
                    onClick={() => setRole("Viewer")}
                  >
                    Viewer
                  </button>
                </div>
              </div>
              <div className={styles.uiToggleRow} aria-hidden="true">
                <span>Can edit permissions</span>
                <span className={`${styles.toggle} ${role === "Admin" ? styles.toggleOn : ""}`}>
                  <span className={styles.toggleKnob} />
                </span>
              </div>
              <span
                className={`${styles.uiButton} ${role !== "Admin" ? styles.uiButtonDisabled : ""}`}
                aria-hidden="true"
              >
                Save changes
              </span>
              <p className="sr-only" aria-live="polite">
                Previewing the {role} role: permissions are {role === "Admin" ? "editable and changes can be saved" : "locked and changes cannot be saved"}.
              </p>
            </div>
          </div>
        </div>

        <motion.div className={styles.codeLayer} style={{ clipPath }}>
          <div className={styles.codeInner}>
            <div className={styles.codeHead}>component.tsx</div>
            <pre className={styles.codePre}>
              {code.map((line, i) => (
                <div key={i} style={{ paddingLeft: `${line.indent * 1.1}em` }}>
                  {line.text}
                </div>
              ))}
            </pre>
          </div>
        </motion.div>

        <motion.div
          className={styles.handle}
          style={{ left }}
          role="slider"
          tabIndex={0}
          aria-label="Reveal code behind this interface"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={live}
          aria-valuetext={`${live}% code, ${100 - live}% interface`}
          onKeyDown={onKeyDown}
        >
          <span className={styles.handleGrip}>{"</>"}</span>
        </motion.div>
      </div>
    </div>
  );
}
