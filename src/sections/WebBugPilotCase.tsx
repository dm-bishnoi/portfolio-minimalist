import { useRef } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import type { ReactNode } from "react";
import { projects, webBugPilotStatement, webBugPilotSpecs } from "../data/content";
import { ProjectFacts } from "../components/ProjectFacts";
import { WebBugPilotStatusDiagram } from "../components/diagrams/WebBugPilotStatusDiagram";
import styles from "./Work.module.css";
import wbpStyles from "./WebBugPilotCase.module.css";

const project = projects.find((p) => p.id === "webbugpilot")!;

const EASE = [0.16, 1, 0.3, 1] as const;
const viewportOptions = { once: false, margin: "-10% 0px -10% 0px" } as const;

// This section's reveal must play both entering and leaving the viewport
// (scroll down then back up re-triggers it), unlike the sitewide `Reveal`
// component which is intentionally one-shot. Built with `useInView` (an
// explicit boolean) rather than `whileInView` + shared variants, since
// several sibling elements toggling the same variants object with
// `once: false` produced an intermittent stuck-hidden state. Kept local to
// this file so the rest of the site's motion behavior is untouched.
function RevealR({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, viewportOptions);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, ease: EASE, delay: inView ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
}

function RevealFactRow({
  spec,
  index,
  parentInView,
  stagger,
  delayChildren,
}: {
  spec: { label: string; value: string };
  index: number;
  parentInView: boolean;
  stagger: number;
  delayChildren: number;
}) {
  const transition: Transition = {
    duration: 0.7,
    ease: EASE,
    delay: parentInView ? delayChildren + index * stagger : 0,
  };
  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      animate={parentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={transition}
    >
      <span className={wbpStyles.specLabel}>{spec.label}</span>
      <span className={wbpStyles.specValue}>{spec.value}</span>
    </motion.li>
  );
}

export function WebBugPilotCase() {
  const factsRef = useRef(null);
  const factsInView = useInView(factsRef, viewportOptions);

  return (
    <article id={project.id} className={styles.caseBlock}>
      <RevealR className={styles.caseHead}>
        <div className={styles.meta}>
          <span>{project.kind}</span>
          <span>{project.year}</span>
        </div>
        <h3 className={styles.caseTitle}>{project.name}</h3>
      </RevealR>

      <RevealR delay={0.06} className={wbpStyles.statement}>
        <p>{webBugPilotStatement}</p>
      </RevealR>

      <RevealR delay={0.12} className={styles.narrow}>
        <p className={styles.intro}>{project.context}</p>
      </RevealR>

      <div className={wbpStyles.specBlock}>
        <ul className={wbpStyles.specGrid} ref={factsRef}>
          {webBugPilotSpecs.map((spec, i) => (
            <RevealFactRow
              key={spec.label}
              spec={spec}
              index={i}
              parentInView={factsInView}
              stagger={0.06}
              delayChildren={0.18}
            />
          ))}
        </ul>
      </div>

      <RevealR delay={0.32} className={styles.leadVisual}>
        <div className={styles.leadFrame}>
          <WebBugPilotStatusDiagram />
        </div>
        <span className={styles.caption}>System diagram — WebBugPilot's current build status, not a product screenshot</span>
      </RevealR>

      <div className={styles.narrow}>
        <ProjectFacts project={project} fields={["problem", "contribution"]} />
      </div>
    </article>
  );
}
