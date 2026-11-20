"use client";

import Link from "next/link";
import { VOX_HREF, isExternal, openVox } from "@/lib/actions";
import styles from "./Button.module.css";

// Buttons (Framer styles):
//   primary   black, light text        secondary  grey, dark text
//   small     grey, compact            accent     orange form submit
// href: internal route -> <Link>; "#vox" -> opens the Vox chat; external -> new tab; none -> <button>.
export default function Button({ href, variant = "primary", full = false, arrow = false, className = "", children, onClick, type = "button", ...rest }) {
  const classes = `${styles.button} ${styles[variant]} ${full ? styles.full : ""} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      ) : null}
    </>
  );

  if (href === VOX_HREF) {
    return (
      <button
        type="button"
        className={classes}
        onClick={(e) => {
          onClick?.(e);
          openVox();
        }}
        {...rest}
      >
        {content}
      </button>
    );
  }
  if (href && isExternal(href)) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" onClick={onClick} {...rest}>
        {content}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  );
}
