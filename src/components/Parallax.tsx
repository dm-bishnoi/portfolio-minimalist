import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

export function Parallax({ children, amount = 24 }: { children: ReactNode; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  if (reduced) return <div ref={ref}>{children}</div>;

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}
