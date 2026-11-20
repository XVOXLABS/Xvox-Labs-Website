import styles from "./IconButton.module.css";

// Square icon control (Framer): dark (FAQ +/-) or light (card arrow).
// Purely visual by default (`as="span"`), so it can sit inside a link or summary without
// nesting interactive elements. Pass as="button" and a `label` to use it on its own.
export default function IconButton({ as: Tag = "span", tone = "dark", label, className = "", children, ...rest }) {
  const a11y = Tag === "button" ? { type: "button", "aria-label": label } : { "aria-hidden": "true" };
  return (
    <Tag className={`${styles.icon} ${styles[tone]} ${className}`.trim()} {...a11y} {...rest}>
      {children}
    </Tag>
  );
}
