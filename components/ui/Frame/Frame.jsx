import styles from "./Frame.module.css";

// Light-grey rounded frame that holds white cards (Framer pattern).
// `columns` sets an equal-width grid on desktop; it collapses on smaller screens.
export default function Frame({ as: Tag = "div", columns, className = "", children, ...rest }) {
  return (
    <Tag
      className={`${styles.frame} ${columns ? styles.grid : ""} ${className}`.trim()}
      style={columns ? { "--frame-columns": columns } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
