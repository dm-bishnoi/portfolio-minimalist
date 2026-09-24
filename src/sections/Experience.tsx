import { experience } from "../data/content";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import styles from "./Experience.module.css";

export function Experience() {
  return (
    <section id="experience" aria-label="Experience">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{experience.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className={styles.heading}>One role. Four areas of growing responsibility.</h2>
        </Reveal>

        <Reveal delay={0.1} className={styles.header}>
          <div>
            <h3>{experience.role}</h3>
            <p className={styles.company}>{experience.company}</p>
          </div>
          <span className={styles.period}>{experience.period}</span>
        </Reveal>

        <Reveal delay={0.14}>
          <p className={styles.summary}>{experience.summary}</p>
        </Reveal>

        <RevealGroup className={styles.timeline} stagger={0.09}>
          {experience.areas.map((area, i) => (
            <RevealItem as="div" className={styles.node} key={area.label}>
              <div className={styles.nodeMarker}>
                <span className={styles.nodeDot} />
                {i < experience.areas.length - 1 && <span className={styles.nodeLine} />}
              </div>
              <div className={styles.nodeBody}>
                <span className={styles.nodeIndex} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h4>{area.label}</h4>
                <ul>
                  {area.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <ul className={styles.tech}>
          {experience.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
