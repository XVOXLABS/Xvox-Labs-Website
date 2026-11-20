import styles from "./Badge.module.css";

// Grey rounded badge (e.g. timeline duration), with an optional leading icon.
export default function Badge({ icon, className = "", children }) {
  return (
    <span className={`${styles.badge} ${className}`.trim()}>
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </span>
  );
}
