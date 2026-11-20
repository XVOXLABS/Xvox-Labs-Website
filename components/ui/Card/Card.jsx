import Link from "next/link";
import styles from "./Card.module.css";

// White (or agent-tinted) rounded card. With `href`, the whole card is one link.
// tint: "p1" | "p2" | "p3" | "p4" (from data/). padding: "md" (20px) | "lg" (32px).
export default function Card({ as: Tag = "div", href, tint, padding = "md", className = "", children, ...rest }) {
  const classes = `${styles.card} ${styles[padding]} ${href ? styles.link : ""} ${className}`.trim();
  const style = tint ? { background: `var(--tint-${tint})` } : undefined;

  if (href) {
    return (
      <Link href={href} className={classes} style={style} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <Tag className={classes} style={style} {...rest}>
      {children}
    </Tag>
  );
}
