import { projects, ignytisSpecs } from "../data/content";
import { Reveal } from "../components/Reveal";
import { ProjectFacts } from "../components/ProjectFacts";
import { IgnytisLoopDiagram } from "../components/diagrams/IgnytisLoopDiagram";
import styles from "./Work.module.css";
import ignytisStyles from "./IgnytisCase.module.css";

const project = projects.find((p) => p.id === "ignytis")!;

export function IgnytisCase() {
  return (
    <article id={project.id} className={styles.caseBlock}>
      <Reveal className={styles.caseHead}>
        <div className={styles.meta}>
          <span>{project.kind}</span>
          <span className={ignytisStyles.status}>
            <span className={ignytisStyles.statusDot} aria-hidden="true" />
            {project.year}
          </span>
        </div>
        <h3 className={styles.caseTitle}>{project.name}</h3>
      </Reveal>

      <Reveal delay={0.06} className={styles.narrow}>
        <p className={styles.intro}>{project.context}</p>
      </Reveal>

      <Reveal delay={0.08} className={ignytisStyles.specBlock}>
        <ul className={ignytisStyles.specGrid}>
          {ignytisSpecs.map((spec) => (
            <li key={spec.label}>
              <span className={ignytisStyles.specLabel}>{spec.label}</span>
              <span className={ignytisStyles.specValue}>{spec.value}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.1} className={styles.leadVisual}>
        <div className={styles.leadFrame}>
          <IgnytisLoopDiagram />
        </div>
        <span className={styles.caption}>System diagram — Ignytis's learning loop, not a product screenshot</span>
      </Reveal>

      <div className={styles.narrow}>
        <ProjectFacts project={project} fields={["problem", "contribution"]} />
      </div>
    </article>
  );
}
