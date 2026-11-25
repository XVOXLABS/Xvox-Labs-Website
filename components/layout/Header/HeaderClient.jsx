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
import { PURCHASE_ENABLED } from "@/lib/commerce";

const CLOSE_DELAY = 150;
const DESKTOP = "(min-width: 1200px)";

// Pages that sit under another nav item in the prototype (markNav): the self-check and Studio belong to
// Services, the checkout to Marketplace, Trust and Careers to About.
const ALSO_ACTIVE = {
  "/services": ["/safe-ai", "/studio"],
  "/marketplace": ["/checkout"],
  "/about": ["/trust", "/careers"],
};

function isActive(pathname, href) {
  if (!href) return false;
  if (href === "/") return pathname === "/";
  const within = (base) => pathname === base || pathname.startsWith(`${base}/`);
  return within(href) || (ALSO_ACTIVE[href] ?? []).some(within);
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
  const burgerRef = useRef(null);

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
      else if (mobileOpen) burgerRef.current?.focus({ preventScroll: true });
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

  // Lock page scroll while the mobile menu is open. The lock goes on <html>: it has its own overflow-x
  // (globals.css), so an overflow set on <body> would not reach the viewport and would unstick the header.
  // The menu closes when the window grows to desktop width, where it is not shown. The phone scroll-padding
  // is lifted meanwhile, so moving focus within the header and menu cannot nudge the locked page.
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const root = document.documentElement;
    const previous = root.style.overflow;
    const previousPadding = root.style.scrollPaddingBlockStart;
    root.style.overflow = "hidden";
    root.style.scrollPaddingBlockStart = "0px";
    const desktop = window.matchMedia(DESKTOP);
    const onDesktop = (e) => {
      if (e.matches) setMobileOpen(false);
    };
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.style.overflow = previous;
      root.style.scrollPaddingBlockStart = previousPadding;
      desktop.removeEventListener("change", onDesktop);
    };
  }, [mobileOpen]);

  const onMenuBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) scheduleClose();
  };

  return (
    <header ref={headerRef} className={styles.header} data-mobile-open={mobileOpen ? "true" : "false"}>
      <div className={styles.bar}>
        <Logo image priority />

        <nav className={styles.desktopNav} aria-label="Main">
          <ul role="list" className={styles.pill}>
            {nav.links.map((link) =>
              link.menu ? (
                <li key={link.label} className={styles.item} onPointerEnter={() => { cancelClose(); setOpenMenu(link.menu); }} onPointerLeave={scheduleClose} onBlur={onMenuBlur}>
                  <button
                    ref={(el) => (triggerRefs.current[link.menu] = el)}
                    type="button"
                    className={`${styles.link} ${isActive(pathname, link.href) ? styles.active : ""}`}
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
          {PURCHASE_ENABLED ? (
            <button type="button" className={styles.cart} onClick={openCart} data-cart-trigger>
              <span className={styles.cartLabel}>{nav.cartLabel}</span>{" "}
              <span className={styles.cartCount}>{cart.length}</span>
            </button>
          ) : null}
          <Button href={nav.plan.href} variant="secondary" className={styles.desktopOnly}>
            {nav.plan.label}
          </Button>
          <Button href={nav.book.href} className={styles.desktopOnly}>
            {nav.book.label}
          </Button>
          <button
            ref={burgerRef}
            type="button"
            className={styles.burger}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Menu"
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
