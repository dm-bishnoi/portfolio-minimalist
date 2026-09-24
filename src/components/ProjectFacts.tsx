import type { projects } from "../data/content";
import { Reveal } from "./Reveal";
import styles from "../sections/Work.module.css";

type Project = (typeof projects)[number];

const allFields = ["context", "problem", "contribution"] as const;
type Field = (typeof allFields)[number];
const labels: Record<Field, string> = { context: "Context", problem: "Problem", contribution: "My contribution" };

export function ProjectFacts({
  project,
  className,
  fields = allFields,
}: {
  project: Project;
  className?: string;
  fields?: readonly Field[];
}) {
  return (
    <Reveal className={className}>
      <dl className={styles.facts}>
        {fields.map((field) => (
          <div key={field}>
            <dt>{labels[field]}</dt>
            <dd>{project[field]}</dd>
          </div>
        ))}
      </dl>

      <ul className={styles.tech}>
        {project.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <p className={styles.scope}>{project.honestScope}</p>

      {"links" in project && project.links?.github && (
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`link-underline ${styles.repoLink}`}
        >
          View repository ↗
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      )}
    </Reveal>
  );
}
