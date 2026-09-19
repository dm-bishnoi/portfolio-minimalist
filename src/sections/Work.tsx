import { projects } from "../data/content";
import { Reveal } from "../components/Reveal";
import { Parallax } from "../components/Parallax";
import { RBACDiagram } from "../components/diagrams/RBACDiagram";
import { PluginDiagram } from "../components/diagrams/PluginDiagram";
import styles from "./Work.module.css";

const diagrams = {
  rbac: RBACDiagram,
  plugin: PluginDiagram,
};

export function Work() {
  return (
    <section id="work" aria-label="Selected work">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Selected work</p>
        </Reveal>
        <Parallax amount={18}>
          <Reveal delay={0.06}>
            <h2 className={styles.heading}>Two things I can point to and explain in detail.</h2>
          </Reveal>
        </Parallax>

        <div className={styles.list}>
          {projects.map((project, i) => {
            const Diagram = diagrams[project.diagram as keyof typeof diagrams];
            return (
              <article
                id={project.id}
                className={`${styles.project} ${i % 2 === 1 ? styles.reversed : ""}`}
                key={project.id}
              >
                <Reveal className={styles.copy}>
                  <div className={styles.meta}>
                    <span>{project.kind}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3>{project.name}</h3>

                  <ul className={styles.quickFacts}>
                    {project.quickFacts.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>

                  <dl className={styles.facts}>
                    <div>
                      <dt>Context</dt>
                      <dd>{project.context}</dd>
                    </div>
                    <div>
                      <dt>Problem</dt>
                      <dd>{project.problem}</dd>
                    </div>
                    <div>
                      <dt>My contribution</dt>
                      <dd>{project.contribution}</dd>
                    </div>
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
                    </a>
                  )}
                </Reveal>

                <Reveal delay={0.1} className={styles.visual}>
                  <div className={styles.frame}>
                    <Diagram />
                  </div>
                  <span className={styles.caption}>
                    System diagram — {project.name}'s real architecture, not a product screenshot
                  </span>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
