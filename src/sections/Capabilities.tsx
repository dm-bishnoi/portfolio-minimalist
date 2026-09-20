import { capabilities } from "../data/content";
import { Reveal } from "../components/Reveal";
import { Parallax } from "../components/Parallax";
import { CapabilityMap } from "../components/CapabilityMap";
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
        <Reveal delay={0.1}>
          <p className={styles.hint}>Hover or tap a capability to see the project it comes from.</p>
        </Reveal>

        <Reveal delay={0.14} className={styles.mapWrap}>
          <CapabilityMap />
        </Reveal>
      </div>
    </section>
  );
}
