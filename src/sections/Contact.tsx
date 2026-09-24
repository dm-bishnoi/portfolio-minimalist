import { contact, profile } from "../data/content";
import { Reveal } from "../components/Reveal";
import { Magnetic } from "../components/Magnetic";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contact" aria-label="Contact">
      <div className={`container ${styles.inner}`}>
        <Reveal>
          <p className="eyebrow">Contact</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className={styles.heading}>
            Have something worth <span className={styles.accent}>building well?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12} className={styles.actions}>
          <Magnetic>
            <a href={`mailto:${contact.email}`} className={styles.mailto}>
              {contact.email}
            </a>
          </Magnetic>

          <div className={styles.links}>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="link-underline">
              GitHub
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline">
              LinkedIn
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2} className={styles.signatureWrap}>
        <p className={styles.signature}>{profile.name}</p>
      </Reveal>
    </section>
  );
}
