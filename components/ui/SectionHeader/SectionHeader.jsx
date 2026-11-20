import styles from "./SectionHeader.module.css";

// Section headers (Framer):
//   layout "split"  (A): heading left; lead text and action on the right.
//   layout "center" (B): centred heading, lead and action.
// level sets the heading element so the page keeps a correct outline; size sets the look.
export default function SectionHeader({ layout = "split", level = 2, size = "h1", eyebrow, title, lead, action, className = "" }) {
  const Heading = `h${level}`;
  return (
    <header className={`${styles.header} ${styles[layout]} ${className}`.trim()}>
      <div className={styles.titleCol}>
        {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}
        <Heading className={`${styles.title} ${styles[size]}`}>{title}</Heading>
      </div>
      {lead || action ? (
        <div className={styles.side}>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
          {action ? <div className={styles.action}>{action}</div> : null}
        </div>
      ) : null}
    </header>
  );
}
