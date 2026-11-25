"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { itemTypes, items } from "@/data/marketplace";
import { pricingDisplay } from "@/data/pricing";
import { cartDrawer, cartFilled } from "@/data/site";
import Button from "@/components/ui/Button/Button";
import Dialog from "@/components/ui/Dialog/Dialog";
import { OPEN_CART_EVENT } from "@/lib/actions";
import { removeFromCart, useCart } from "@/lib/cart";
import { focusIsLost, restoreFocusIfLost } from "@/lib/focus";
import styles from "./CartDrawer.module.css";

const byId = Object.fromEntries(items.map((i) => [i.id, i]));
const text = (match) => cartDrawer.find((b) => b.text === match || b.text.startsWith(match));
const money = (n) => `$${n.toLocaleString("en-US")}`;

// Cart drawer: the prototype's cart, styled with the Framer card language.
// Prices follow the approved rule: only published prices and totals are shown.
export default function CartDrawer() {
  const cart = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wasOpen = useRef(false);
  const lastPath = useRef(pathname);
  const leaving = useRef(false);
  // A route change (browser Back or Forward, or a link) closes the drawer, as the prototype closes it on
  // every route render. The reset happens while rendering, so Forward cannot bring an old drawer back.
  const [shownPath, setShownPath] = useState(pathname);
  if (shownPath !== pathname) {
    setShownPath(pathname);
    setOpen(false);
  }
  const title = text("Your cart");
  const empty = text("Your cart is empty.");
  const browse = cartDrawer.find((b) => b.tag === "a.btn");
  const note = text("Want something built for you instead?");
  const noteLink = cartDrawer.find((b) => b.tag === "a");

  useEffect(() => {
    const onOpen = () => {
      leaving.current = false;
      setOpen(true);
    };
    window.addEventListener(OPEN_CART_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CART_EVENT, onOpen);
  }, []);

  const lines = cart.map((id) => byId[id]).filter(Boolean);
  const allPublished = lines.every((i) => i.priceStatus === "published");
  const oneTime = lines.filter((i) => i.unit !== "/month").reduce((s, i) => s + i.price, 0);
  const monthly = lines.filter((i) => i.unit === "/month").reduce((s, i) => s + i.price, 0);
  const close = () => setOpen(false);
  // The drawer's own links close it before the route changes, so they are marked as leaving the page.
  const followLink = (event) => {
    leaving.current = event.currentTarget.pathname !== window.location.pathname;
    close();
  };

  // Focus after the drawer closes. The native dialog returns it to the opener; if the opener is gone (the
  // mobile menu's Cart row, a toast, or an in-page button left behind by a navigation) it would fall to
  // <body>. After a normal close it goes to the header Cart button, after a navigation to the page content.
  useEffect(() => {
    const navigated = lastPath.current !== pathname;
    lastPath.current = pathname;
    const closed = wasOpen.current && !open;
    wasOpen.current = open;
    const arrived = navigated && !open && leaving.current;
    if (!closed && !arrived) return undefined;
    // A drawer link was followed and the new page has not arrived yet: wait for it.
    if (!navigated && leaving.current) return undefined;
    leaving.current = false;
    const id = window.setTimeout(() => {
      if (!navigated && focusIsLost()) document.querySelector("[data-cart-trigger]")?.focus({ preventScroll: true });
      restoreFocusIfLost();
    }, 60);
    return () => window.clearTimeout(id);
  }, [open, pathname]);

  return (
    <Dialog open={open} onClose={close} labelledBy="cart-title" placement="drawer">
      <div className={styles.head}>
        <h2 id="cart-title" className={styles.title}>
          {title.text}
        </h2>
        <button type="button" className={styles.close} onClick={close} aria-label="Close cart">
          ✕
        </button>
      </div>

      <div className={styles.body}>
        {lines.length === 0 ? (
          <div className={styles.empty}>
            <p>{empty.text.replace(browse.text, "").trim()}</p>
            <Button href={browse.href} variant="small" onClick={followLink}>
              {browse.text}
            </Button>
          </div>
        ) : (
          <>
            <ul role="list" className={styles.lines}>
              {lines.map((i) => (
                <li key={i.id} className={styles.line}>
                  <span className={styles.thumb} style={{ background: `var(--tint-${itemTypes[i.type].tint})` }} aria-hidden="true">
                    {itemTypes[i.type].glyph}
                  </span>
                  <span className={styles.lineText}>
                    <b>{i.name}</b>
                    <small>
                      {itemTypes[i.type].name} · {i.priceStatus === "published" ? `${money(i.price)}${i.unit === "/month" ? ` ${cartFilled.perMonth}` : ""}` : pricingDisplay.placeholderLabel}
                    </small>
                  </span>
                  <button type="button" className={styles.remove} onClick={() => removeFromCart(i.id)}>
                    {cartFilled.remove}
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles.upsell}>
              <h3>{cartFilled.upsellTitle}</h3>
              <p>
                {cartFilled.upsellText}{" "}
                <Link href={cartFilled.upsellLink.href} onClick={followLink}>
                  {cartFilled.upsellLink.label}
                </Link>
              </p>
            </div>
          </>
        )}
      </div>

      <div className={styles.foot}>
        {lines.length === 0 ? (
          <p className={styles.note}>
            {note.text.replace(noteLink.text, "").trim()}{" "}
            <Link href={noteLink.href} onClick={followLink}>
              {noteLink.text}
            </Link>
          </p>
        ) : (
          <>
            {allPublished ? (
              <>
                {oneTime > 0 ? (
                  <div className={styles.sum}>
                    <span>{cartFilled.oneTime}</span>
                    <b>{money(oneTime)}</b>
                  </div>
                ) : null}
                {monthly > 0 ? (
                  <div className={styles.sum}>
                    <span>{cartFilled.monthly}</span>
                    <b>
                      {money(monthly)} {cartFilled.perMonth}
                    </b>
                  </div>
                ) : null}
              </>
            ) : (
              <div className={styles.discuss}>
                <span>{pricingDisplay.placeholderLabel}</span>
                <Button href={pricingDisplay.placeholderCta.href} variant="small" arrow onClick={followLink}>
                  {pricingDisplay.placeholderCta.label}
                </Button>
              </div>
            )}
            <Button href={cartFilled.checkout.href} full onClick={followLink}>
              {cartFilled.checkout.label}
            </Button>
          </>
        )}
      </div>
    </Dialog>
  );
}
