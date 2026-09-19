import { about } from "../data/content";
import { Reveal } from "../components/Reveal";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" aria-label="About">
      <div className={`container ${styles.grid}`}>
        <Reveal>
          <p className="eyebrow">{about.eyebrow}</p>
        </Reveal>

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
