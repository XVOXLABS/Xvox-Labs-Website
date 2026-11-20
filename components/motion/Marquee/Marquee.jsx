import styles from "./Marquee.module.css";

// Continuously moving row. The content is rendered twice for a seamless loop; the copy is
// hidden from assistive technology. Pauses on hover and focus; static with reduced motion.
// Pure CSS, so it works as a server component.
export default function Marquee({ duration = 40, label, className = "", children }) {
  return (
    <div className={`${styles.marquee} ${className}`.trim()} role="region" aria-label={label} style={{ "--marquee-duration": `${duration}s` }}>
      <div className={styles.track}>
        <div className={styles.group}>{children}</div>
        <div className={styles.group} aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}
