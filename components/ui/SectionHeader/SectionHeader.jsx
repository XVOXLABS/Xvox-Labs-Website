import RevealWords from "@/components/sections/shared/RevealWords/RevealWords";
import styles from "./SectionHeader.module.css";

// Section headers, as in the Artifacts prototype:
//   layout "stack"   page header (.ph1) and section heading (head()): label, heading, lead, actions in one column.
//   layout "center"  the same, centred.
//   layout "row"     homepage head2(): label in the left column, heading and lead in the right.
//   layout "side"    heading on the left, action on the right, bottom aligned (.related-h, .twocol).
//   layout "closing" the closing call to action (.closing): top line, centred, large heading.
// level sets the heading element so the page keeps a correct outline; size sets the look.
export default function SectionHeader({
  layout = "stack",
  level = 2,
  size = "h1",
  eyebrow,
  title,
  lead,
  action,
  reveal = level === 1 || layout === "closing",
  pageHead = level === 1 && layout === "stack",
  className = "",
}) {
  const Heading = `h${level}`;
  return (
    <header className={`${styles.header} ${styles[layout]} ${className}`.trim()} data-page-head={pageHead ? "" : undefined}>
      {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}
      <div className={styles.main}>
        <div className={styles.text}>
          <Heading className={`${styles.title} ${styles[size]}`}>
            {reveal && typeof title === "string" ? <RevealWords text={title} /> : title}
          </Heading>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
        </div>
        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
    </header>
  );
}
