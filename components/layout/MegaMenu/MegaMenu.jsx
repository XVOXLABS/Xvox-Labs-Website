"use client";

import Link from "next/link";
import { VOX_HREF, openVox } from "@/lib/actions";
import styles from "./MegaMenu.module.css";

// Desktop dropdown panel (Framer inspiration): full width, columns with hairlines,
// title + description items, and a footer row. Content comes from lib/navigation.
export default function MegaMenu({ id, label, menu, open, onNavigate, onPointerEnter }) {
  const footerLink = (item) => {
    const inner = (
      <>
        {item.dot ? <span className={styles.dot} aria-hidden="true" /> : null}
        <span>{item.label}</span>
      </>
    );
    if (item.href === VOX_HREF) {
      return (
        <button
          key={item.label}
          type="button"
          className={styles.footLink}
          onClick={() => {
            onNavigate();
            openVox();
          }}
        >
          {inner}
        </button>
      );
    }
    return (
      <Link key={item.label} href={item.href} className={styles.footLink} onClick={onNavigate}>
        {inner}
      </Link>
    );
  };

  return (
    <div id={id} className={styles.panel} data-open={open ? "true" : "false"} hidden={!open} onPointerEnter={onPointerEnter} role="region" aria-label={label}>
      <div className={styles.columns} style={{ "--menu-columns": menu.columns.length }}>
        {menu.columns.map((col) => (
          <div key={col.heading} className={styles.column}>
            <Link href={col.href} className={styles.heading} onClick={onNavigate}>
              {col.color ? <span className={styles.swatch} style={{ background: col.color }} aria-hidden="true" /> : null}
              {col.heading}
            </Link>
            <ul role="list" className={styles.list}>
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.entry} onClick={onNavigate}>
                    <span className={styles.title}>{item.title}</span>
                    {item.description ? <span className={styles.description}>{item.description}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.footer}>{menu.footer.map(footerLink)}</div>
    </div>
  );
}
