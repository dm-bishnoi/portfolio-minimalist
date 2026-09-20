import { projects } from "../data/content";
import { Reveal } from "../components/Reveal";
import { ProjectFacts } from "../components/ProjectFacts";
import styles from "./Work.module.css";

const project = projects.find((p) => p.id === "flexschema")!;

export function FlexschemaCase() {
  return (
    <article id={project.id} className={styles.caseBlock}>
      <Reveal className={styles.caseHead}>
        <div className={styles.meta}>
          <span>{project.kind}</span>
          <span>{project.year}</span>
        </div>
        <h3 className={styles.caseTitle}>{project.name}</h3>
      </Reveal>

      <Reveal delay={0.06} className={styles.narrow}>
        <ul className={styles.quickFacts}>
          {project.quickFacts!.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </Reveal>

      <div className={styles.narrow}>
        <ProjectFacts project={project} />
      </div>
    </article>
  );
}
