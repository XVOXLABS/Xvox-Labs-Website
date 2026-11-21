"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "../Logo/Logo";
import MegaMenu from "../MegaMenu/MegaMenu";
import MobileMenu from "../MobileMenu/MobileMenu";
import Button from "@/components/ui/Button/Button";
import { useCart } from "@/lib/cart";
import { openCart } from "@/lib/actions";
import styles from "./Header.module.css";

const CLOSE_DELAY = 150;

function isActive(pathname, href) {
  if (!href) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

// Header (Framer inspiration): desktop (>= 1200px) floating link pill with hover/click dropdowns;
// below 1200px a bar with a black burger that opens the mobile menu.
export default function HeaderClient({ nav, menus, mobile }) {
  const pathname = usePathname();
  const cart = useCart();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(0);
  const triggerRefs = useRef({});
  const headerRef = useRef(null);

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), CLOSE_DELAY);
  };
  const closeAll = useCallback(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, []);

  // Esc closes any open menu and returns focus to its trigger.
  useEffect(() => {
    if (!openMenu && !mobileOpen) return undefined;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (openMenu) triggerRefs.current[openMenu]?.focus();
      closeAll();
    };
    const onPointerDown = (e) => {
      if (openMenu && headerRef.current && !headerRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu, mobileOpen, closeAll]);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const onMenuBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) scheduleClose();
  };

  return (
    <header ref={headerRef} className={styles.header} data-mobile-open={mobileOpen ? "true" : "false"}>
      <div className={styles.bar}>
        <Logo priority />

        <nav className={styles.desktopNav} aria-label="Main">
          <ul role="list" className={styles.pill}>
            {nav.links.map((link) =>
              link.menu ? (
                <li key={link.label} className={styles.item} onPointerEnter={() => { cancelClose(); setOpenMenu(link.menu); }} onPointerLeave={scheduleClose} onBlur={onMenuBlur}>
                  <button
                    ref={(el) => (triggerRefs.current[link.menu] = el)}
                    type="button"
                    className={`${styles.link} ${isActive(pathname, link.href) || openMenu === link.menu ? styles.active : ""}`}
                    aria-expanded={openMenu === link.menu}
                    aria-controls={`menu-${link.menu}`}
                    onClick={() => setOpenMenu(openMenu === link.menu ? null : link.menu)}
                  >
                    {link.label}
                    <svg className={styles.chevron} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                      <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <MegaMenu id={`menu-${link.menu}`} label={link.label} menu={menus[link.menu]} open={openMenu === link.menu} onNavigate={closeAll} onPointerEnter={cancelClose} />
                </li>
              ) : (
                <li key={link.label} className={styles.item}>
                  <Link href={link.href} className={`${styles.link} ${isActive(pathname, link.href) ? styles.active : ""}`} aria-current={isActive(pathname, link.href) ? "page" : undefined}>
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button type="button" className={styles.cart} onClick={openCart} aria-label={`${nav.cartLabel}, ${cart.length} item${cart.length === 1 ? "" : "s"}`}>
            <span className={styles.cartLabel}>{nav.cartLabel}</span>
            <span className={styles.cartCount}>{cart.length}</span>
          </button>
          <Button href={nav.plan.href} variant="secondary" className={styles.desktopOnly}>
            {nav.plan.label}
          </Button>
          <Button href={nav.book.href} className={styles.desktopOnly}>
            {nav.book.label}
          </Button>
          <button
            type="button"
            className={styles.burger}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className={styles.burgerLines} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <MobileMenu id="mobile-menu" open={mobileOpen} groups={mobile} book={nav.book} cartLabel={nav.cartLabel} cartCount={cart.length} onNavigate={closeAll} />
    </header>
  );
}
