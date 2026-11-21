"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { itemTypes, items } from "@/data/marketplace";
import { pricingDisplay } from "@/data/pricing";
import { cartDrawer, cartFilled } from "@/data/site";
import Button from "@/components/ui/Button/Button";
import Dialog from "@/components/ui/Dialog/Dialog";
import { OPEN_CART_EVENT } from "@/lib/actions";
import { removeFromCart, useCart } from "@/lib/cart";
import styles from "./CartDrawer.module.css";

const byId = Object.fromEntries(items.map((i) => [i.id, i]));
const text = (match) => cartDrawer.find((b) => b.text === match || b.text.startsWith(match));
const money = (n) => `$${n.toLocaleString("en-US")}`;

// Cart drawer: the prototype's cart, styled with the Framer card language.
// Prices follow the approved rule: only published prices and totals are shown.
export default function CartDrawer() {
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const title = text("Your cart");
  const empty = text("Your cart is empty.");
  const browse = cartDrawer.find((b) => b.tag === "a.btn");
  const note = text("Want something built for you instead?");
  const noteLink = cartDrawer.find((b) => b.tag === "a");

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CART_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CART_EVENT, onOpen);
  }, []);

  const lines = cart.map((id) => byId[id]).filter(Boolean);
  const allPublished = lines.every((i) => i.priceStatus === "published");
  const oneTime = lines.filter((i) => i.unit !== "/month").reduce((s, i) => s + i.price, 0);
  const monthly = lines.filter((i) => i.unit === "/month").reduce((s, i) => s + i.price, 0);
  const close = () => setOpen(false);

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
            <Button href={browse.href} variant="small" onClick={close}>
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
                <Link href={cartFilled.upsellLink.href} onClick={close}>
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
            <Link href={noteLink.href} onClick={close}>
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
                <Button href={pricingDisplay.placeholderCta.href} variant="small" arrow onClick={close}>
                  {pricingDisplay.placeholderCta.label}
                </Button>
              </div>
            )}
            <Button href={cartFilled.checkout.href} full onClick={close}>
              {cartFilled.checkout.label}
            </Button>
          </>
        )}
      </div>
    </Dialog>
  );
}
