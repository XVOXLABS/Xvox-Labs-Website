"use client";

import { useEffect, useRef, useState } from "react";
import { cartFilled } from "@/data/site";
import { openCart } from "@/lib/actions";
import { TOAST_EVENT } from "@/lib/cart";
import styles from "./Toast.module.css";

// The prototype's cart toast: "Added: <name>" with a View cart button, for 3.2 seconds.
export default function Toast() {
  const [message, setMessage] = useState(null);
  const timer = useRef(0);

  useEffect(() => {
    const onToast = (e) => {
      setMessage(e.detail?.name ? `${cartFilled.toastAdded}${e.detail.name}` : cartFilled.toastDefault);
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
        </>
      ) : null}
    </div>
  );
}
