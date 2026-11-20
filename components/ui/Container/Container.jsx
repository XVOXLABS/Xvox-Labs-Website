import styles from "./Container.module.css";

// Content width (1136px) with the responsive side gutter.
export default function Container({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={`${styles.container} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
