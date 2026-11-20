"use client";

import useScrollProgress from "@/hooks/useScrollProgress";
import useReducedMotion from "@/hooks/useReducedMotion";
import styles from "./StickyStage.module.css";

// A scroll stage: the outer element is `length` viewport heights tall, the inner stage sticks
// to the top while the visitor scrolls through it. Progress (0-1) is passed to `children`
// as a function and exposed as the CSS variable --progress.
// With reduced motion the stage is a normal static block with progress 1 (final state).
export default function StickyStage({ length = 2, className = "", stageClassName = "", label, children }) {
  const [ref, progress] = useScrollProgress();
  const reduced = useReducedMotion();
  const value = reduced ? 1 : progress;
  const content = typeof children === "function" ? children(value) : children;

  return (
    <section
      ref={ref}
      aria-label={label}
      className={`${styles.track} ${className}`.trim()}
      data-reduced={reduced ? "true" : "false"}
      style={{ "--stage-length": length, "--progress": value }}
    >
      <div className={`${styles.stage} ${stageClassName}`.trim()}>{content}</div>
    </section>
  );
}
