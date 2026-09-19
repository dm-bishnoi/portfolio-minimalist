import { motion } from "framer-motion";
import { profile, contact } from "../data/content";
import { Magnetic } from "../components/Magnetic";
import { CodeReveal } from "../components/CodeReveal";
import styles from "./Hero.module.css";

const headline = ["Product", "thinking,", "shipped", "in", "code."];

export function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-label="Introduction">
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <motion.p
            className={`eyebrow ${styles.eyebrow}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {profile.name} — {profile.role}
          </motion.p>

          <h1 className={styles.headline}>
            {headline.map((word, i) => (
              <span className={styles.wordMask} key={word}>
                <motion.span
                  className={styles.word}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.25 + i * 0.07,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className={styles.body}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
          >
            {profile.positioning}
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          >
            <Magnetic>
              <a href="#work" className={styles.primaryBtn}>
                See selected work
              </a>
            </Magnetic>
            <a href={`mailto:${contact.email}`} className={`link-underline ${styles.secondaryLink}`}>
              {contact.email}
            </a>
          </motion.div>
        </div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
        >
          <p className={styles.visualLabel}>The interface, and the code that produced it</p>
          <CodeReveal />
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className={styles.scrollLine} />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
