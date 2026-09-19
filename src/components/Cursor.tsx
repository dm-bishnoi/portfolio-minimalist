import { useEffect, useRef, useState } from "react";
import styles from "./Cursor.module.css";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled] = useState(
    () =>
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("has-fine-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement;
      setHovering(Boolean(target.closest("a, button, [data-cursor-hover]")));
    };

    const paint = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      raf = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(paint);

    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-fine-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className={`${styles.dot} ${hovering ? styles.dotHover : ""}`}
      aria-hidden="true"
    />
  );
}
