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

export function CodeReveal() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [role, setRole] = useState<"Admin" | "Viewer">("Admin");
  const percent = useMotionValue(0);
  const springPercent = useSpring(percent, { stiffness: 220, damping: 30, mass: 0.6 });
  const clipPath = useTransform(springPercent, (v) => `inset(0 ${100 - v}% 0 0)`);
  const [live, setLive] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const unsub = springPercent.on("change", setLive);
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
    if (e.key === "ArrowLeft") percent.set(Math.max(0, percent.get() - 6));
    if (e.key === "ArrowRight") percent.set(Math.min(100, percent.get() + 6));
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
            <div className={styles.uiCardHead}>
              <span className={styles.uiDot} />
              <span className={styles.uiDot} />
              <span className={styles.uiDot} />
            </div>
            <div className={styles.uiBody}>
              <div className={styles.uiRow}>
                <span className={styles.uiBadge}>{role}</span>
                <div className={styles.roleSwitch} role="group" aria-label="Preview role">
                  <button
                    type="button"
                    className={role === "Admin" ? styles.roleActive : ""}
                    onClick={() => setRole("Admin")}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    className={role === "Viewer" ? styles.roleActive : ""}
                    onClick={() => setRole("Viewer")}
                  >
                    Viewer
                  </button>
                </div>
              </div>
              <div className={styles.uiToggleRow}>
                <span>Can edit permissions</span>
                <span className={`${styles.toggle} ${role === "Admin" ? styles.toggleOn : ""}`}>
                  <span className={styles.toggleKnob} />
                </span>
              </div>
              <button className={styles.uiButton} disabled={role !== "Admin"} type="button">
                Save changes
              </button>
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
          style={{ left: `${live}%` }}
          role="slider"
          tabIndex={0}
          aria-label="Reveal code behind this interface"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(live)}
          onKeyDown={onKeyDown}
        >
          <span className={styles.handleGrip}>{"</>"}</span>
        </motion.div>
      </div>
      <p className={styles.caption}>Drag to see the code behind the interface</p>
    </div>
  );
}
