import { about } from "../data/content";
import { Reveal } from "../components/Reveal";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" aria-label="About">
      <div className={`container ${styles.grid}`}>
        <div className={styles.left}>
          <h2 className="sr-only">{about.eyebrow}</h2>
          <Reveal>
            <p className="eyebrow" aria-hidden="true">
              {about.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <span className={styles.mark} aria-hidden="true">
              05
            </span>
          </Reveal>
        </div>

        <div className={styles.copy}>
          {about.body.map((line, i) => (
            <Reveal delay={i * 0.08} key={line}>
              <p>{line}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
