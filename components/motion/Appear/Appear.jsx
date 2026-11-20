"use client";

import useInView from "@/hooks/useInView";
import useReducedMotion from "@/hooks/useReducedMotion";
import styles from "./Appear.module.css";

// Fades and rises its content in when it scrolls into view.
// The content is always in the HTML; it is only hidden once the client knows motion is allowed.
export default function Appear({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, inView] = useInView();
  const reduced = useReducedMotion();
  const state = reduced ? "static" : inView ? "in" : "out";

  return (
    <Tag
      ref={ref}
      className={`${styles.appear} ${className}`.trim()}
      data-state={state}
      style={delay ? { "--appear-delay": `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
