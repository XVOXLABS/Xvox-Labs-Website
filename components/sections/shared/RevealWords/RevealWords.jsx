"use client";

import useInView from "@/hooks/useInView";
import useReducedMotion from "@/hooks/useReducedMotion";
import styles from "./RevealWords.module.css";

// Heading words fade from grey to ink one after another when the heading scrolls into view
// (prototype `rw`: 45ms per word, 0.6s colour transition). The words are real text in the HTML;
// with reduced motion (and on the server) they show in full ink straight away.
// tone "dark" is for dark panels (grey to white).
export default function RevealWords({ text, tone = "light" }) {
  const [ref, inView] = useInView();
  const reduced = useReducedMotion();
  const state = reduced ? "static" : inView ? "in" : "out";
  const words = text.split(" ");
  return (
    <span ref={ref} className={`${styles.words} ${styles[tone]}`} data-state={state}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className={styles.word} style={{ "--i": i }}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
