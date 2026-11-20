import styles from "./Accordion.module.css";

// FAQ accordion (Framer): numbered rows in white cards inside a grey frame, black +/- button.
// Built on <details>/<summary>: works without JavaScript and every answer is in the HTML.
// items: [{ question, answer }]. `numbered` prefixes "1. ", "2. " as on the Framer reference.
export default function Accordion({ items, numbered = true, name, defaultOpen = 0, className = "" }) {
  return (
    <div className={`${styles.frame} ${className}`.trim()}>
      {items.map((item, i) => (
        <details key={item.question} className={styles.item} name={name} open={i === defaultOpen || undefined}>
          <summary className={styles.summary}>
            <span className={styles.question}>
              {numbered ? `${i + 1}. ` : ""}
              {item.question}
            </span>
            <span className={styles.toggle} aria-hidden="true" />
          </summary>
          <div className={styles.answer}>
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
