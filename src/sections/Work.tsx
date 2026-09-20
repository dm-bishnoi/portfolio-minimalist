import { Reveal } from "../components/Reveal";
import { Parallax } from "../components/Parallax";
import { FlexschemaCase } from "./FlexschemaCase";
import { WebBugPilotCase } from "./WebBugPilotCase";
import { IgnytisCase } from "./IgnytisCase";
import styles from "./Work.module.css";

export function Work() {
  return (
    <section id="work" aria-label="Selected work">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Selected work</p>
        </Reveal>
        <Parallax amount={18}>
          <Reveal delay={0.06}>
            <h2 className={styles.heading}>Three things I can point to and explain in detail.</h2>
          </Reveal>
        </Parallax>

        <div className={styles.list}>
          <FlexschemaCase />
          <WebBugPilotCase />
          <IgnytisCase />
        </div>
      </div>
    </section>
  );
}
