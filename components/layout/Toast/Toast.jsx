"use client";

import { useEffect, useRef, useState } from "react";
import { cartFilled } from "@/data/site";
import { openCart } from "@/lib/actions";
import { TOAST_EVENT } from "@/lib/cart";
import styles from "./Toast.module.css";

// The prototype's cart toast: "Added: <name>" with a View cart button, for 3.2 seconds.
// A plain message ({ message, viewCart: false }, e.g. "Removed from cart") shows without the button.
export default function Toast() {
  const [message, setMessage] = useState(null);
  const [viewCart, setViewCart] = useState(true);
  const timer = useRef(0);

  useEffect(() => {
    const onToast = (e) => {
      const d = e.detail || {};
      setViewCart(d.viewCart !== false);
      setMessage(d.message ? d.message : d.name ? `${cartFilled.toastAdded}${d.name}` : cartFilled.toastDefault);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setMessage(null), 3200);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className={styles.toast} role="status" data-on={message ? "true" : "false"}>
      {message ? (
        <>
          <span>{message}</span>
          {viewCart ? (
            <button
              type="button"
              className={styles.view}
              onClick={() => {
                setMessage(null);
                openCart();
              }}
            >
              {cartFilled.toastViewCart}
            </button>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
