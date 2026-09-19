import { capabilities } from "../data/content";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { Parallax } from "../components/Parallax";
import styles from "./Capabilities.module.css";

export function Capabilities() {
  return (
    <section id="capabilities" aria-label="Capabilities">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{capabilities.eyebrow}</p>
        </Reveal>
        <Parallax amount={18}>
          <Reveal delay={0.06}>
            <h2 className={styles.heading}>What that looks like in practice.</h2>
          </Reveal>
        </Parallax>

        <RevealGroup className={styles.grid} stagger={0.07}>
          {capabilities.items.map((item, i) => (
            <RevealItem as="div" className={styles.card} key={item.title}>
              <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.evidence}</p>
              <div className={styles.sources}>
                <span className={styles.sourcesLabel}>Evidence</span>
                {item.sources.map((s) => (
                  <a key={s.label} href={s.href} className={styles.sourceChip}>
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
