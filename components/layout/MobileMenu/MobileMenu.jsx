"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { VOX_HREF, openCart, openVox } from "@/lib/actions";
import styles from "./MobileMenu.module.css";
import { PURCHASE_ENABLED } from "@/lib/commerce";

// Menu at 1120px and below (Artifacts prototype .menu): a card with the link groups side by side.
// All prototype menu groups and links are kept (data/navigation.js -> lib/navigation).
export default function MobileMenu({ id, open, groups, cartLabel, cartCount, onNavigate }) {
  const panelRef = useRef(null);

  // Move focus into the menu when it opens. preventScroll keeps the page where it is: the phone
  // scroll-padding would otherwise move it. The panel starts at its top so the focused item is visible.
  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;
    panel.scrollTop = 0;
    panel.querySelector("button, a")?.focus({ preventScroll: true });
  }, [open]);

  const row = (link) =>
    link.href === VOX_HREF ? (
      <button
        type="button"
        className={styles.row}
        onClick={() => {
          onNavigate();
          openVox();
        }}
      >
        {link.label}
      </button>
    ) : (
      <Link href={link.href} className={styles.row} onClick={onNavigate}>
        {link.label}
      </Link>
    );

  return (
    <div id={id} ref={panelRef} className={styles.panel} hidden={!open}>
      <nav aria-label="Menu" className={styles.inner}>
        {groups.map((group) => (
          <div key={group.heading} className={styles.group}>
            <p className={styles.groupLabel}>{group.heading}</p>
            <ul role="list">
              {group.links.map((link) => (
                <li key={link.href + link.label}>{row(link)}</li>
              ))}
            </ul>
          </div>
        ))}
        {PURCHASE_ENABLED ? (
          <button
            type="button"
            className={styles.row}
            onClick={() => {
              onNavigate();
              openCart();
            }}
          >
            {cartLabel} ({cartCount})
          </button>
        ) : null}
      </nav>
    </div>
  );
}
