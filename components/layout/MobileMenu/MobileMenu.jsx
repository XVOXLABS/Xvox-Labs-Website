"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import Button from "@/components/ui/Button/Button";
import { VOX_HREF, openCart, openVox } from "@/lib/actions";
import styles from "./MobileMenu.module.css";

// Mobile menu below 1200px (Framer inspiration): full-width panel under the bar,
// accordions for Solutions and Services, plain rows for the rest, black CTA at the bottom.
// All prototype menu groups and links are kept (data/navigation.js -> lib/navigation).
export default function MobileMenu({ id, open, groups, book, cartLabel, cartCount, onNavigate }) {
  const [expanded, setExpanded] = useState(null);
  const panelRef = useRef(null);
  const baseId = useId();

  // Move focus into the menu when it opens.
  useEffect(() => {
    if (open) panelRef.current?.querySelector("button, a")?.focus();
  }, [open]);

  const accordions = groups.slice(0, 2);
  const rest = groups.slice(2);

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
        {accordions.map((group) => {
          const isOpen = expanded === group.heading;
          const listId = `${baseId}-${group.heading}`;
          return (
            <div key={group.heading} className={styles.accordion}>
              <button type="button" className={styles.accordionButton} aria-expanded={isOpen} aria-controls={listId} onClick={() => setExpanded(isOpen ? null : group.heading)}>
                <span>{group.heading}</span>
                <svg className={styles.chevron} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M3 5.5 7 9.5 11 5.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <ul role="list" id={listId} className={styles.sublist} hidden={!isOpen}>
                {group.links.map((link) => (
                  <li key={link.href + link.label}>{row(link)}</li>
                ))}
              </ul>
            </div>
          );
        })}

        <div className={styles.rows}>
          {rest.map((group) => (
            <div key={group.heading} className={styles.group}>
              <p className={styles.groupLabel}>{group.heading}</p>
              <ul role="list">
                {group.links
                  .filter((link) => link.href !== book.href)
                  .map((link) => (
                    <li key={link.href + link.label}>{row(link)}</li>
                  ))}
              </ul>
            </div>
          ))}
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
        </div>

        <Button href={book.href} full className={styles.cta} onClick={onNavigate}>
          {book.label}
        </Button>
      </nav>
    </div>
  );
}
