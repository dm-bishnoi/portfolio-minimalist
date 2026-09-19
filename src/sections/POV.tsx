import { pov } from "../data/content";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import styles from "./POV.module.css";

export function POV() {
  return (
    <section id="pov" aria-label="How I work">
      <div className={`container ${styles.grid}`}>
        <div className={styles.left}>
          <Reveal>
            <p className="eyebrow">{pov.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className={styles.statement}>{pov.statement}</p>
          </Reveal>
        </div>

        <RevealGroup className={styles.pillars} stagger={0.1}>
          {pov.pillars.map((pillar, i) => (
            <RevealItem as="div" className={styles.pillar} key={pillar.title}>
              <span className={styles.pillarNum}>0{i + 1}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
