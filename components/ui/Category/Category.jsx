import styles from "./Category.module.css";

// Coloured dot + category label (Framer use-case cards; department colour from data/).
export default function Category({ color, className = "", children }) {
  return (
    <span className={`${styles.category} ${className}`.trim()}>
      <span className={styles.dot} style={color ? { background: color } : undefined} aria-hidden="true" />
      <span>{children}</span>
    </span>
  );
}
