import styles from "./Tag.module.css";

// Small uppercase label on a translucent white background (agent traits, item types).
export default function Tag({ className = "", children }) {
  return <span className={`${styles.tag} ${className}`.trim()}>{children}</span>;
}
