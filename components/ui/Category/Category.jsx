import styles from "./Category.module.css";

// Coloured dot + category label (Framer use-case cards; department colour from data/).
// dot={false} for labels above section headings, which carry no marker.
export default function Category({ color, dot = true, className = "", children }) {
  return (
    <span className={`${styles.category} ${className}`.trim()}>
      {dot ? <span className={styles.dot} style={color ? { background: color } : undefined} aria-hidden="true" /> : null}
      <span>{children}</span>
    </span>
  );
}
