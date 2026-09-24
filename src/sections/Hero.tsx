import { motion, useScroll, useTransform } from "framer-motion";
import { profile, contact } from "../data/content";
import { Magnetic } from "../components/Magnetic";
import { CodeReveal } from "../components/CodeReveal";
import styles from "./Hero.module.css";

const headline = ["Product", "thinking,", "shipped", "in", "code."];

export function Hero() {
  // The scroll cue fades out as soon as the reader starts scrolling.
  const { scrollY } = useScroll();
  const cueOpacity = useTransform(scrollY, [0, 160], [1, 0]);

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
            {profile.role}
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

          <motion.p
            className={styles.byline}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.82 }}
          >
            <span className={styles.bylineName}>{profile.name}</span>
            <span aria-hidden="true"> · </span>
            <span>
              {profile.experience} with {profile.stack.join(", ")}
            </span>
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
          <div className={styles.visualHead}>
            <p className={styles.visualLabel}>The interface, and the code that produced it</p>
            <p className={styles.visualHint} aria-hidden="true">
              <span className={styles.hintArrows}>←→</span> Drag to compare
            </p>
          </div>
          <CodeReveal />
        </motion.div>
      </div>

      <motion.div className={styles.scrollCue} style={{ opacity: cueOpacity }} aria-hidden="true">
        <motion.span
          className={styles.scrollCueInner}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <span>Scroll to explore</span>
          <span className={styles.scrollArrow}>↓</span>
        </motion.span>
      </motion.div>
    </section>
  );
}
