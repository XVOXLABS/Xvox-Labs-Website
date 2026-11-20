import Container from "../Container/Container";
import styles from "./Section.module.css";

// Page section: vertical rhythm + content container.
export default function Section({ as: Tag = "section", id, className = "", containerClassName = "", children, ...rest }) {
  return (
    <Tag id={id} className={`${styles.section} ${className}`.trim()} {...rest}>
      <Container className={`${styles.inner} ${containerClassName}`.trim()}>{children}</Container>
    </Tag>
  );
}
