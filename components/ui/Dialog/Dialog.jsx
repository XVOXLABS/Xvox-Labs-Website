"use client";

import { useEffect, useRef } from "react";
import styles from "./Dialog.module.css";

// Accessible modal on the native <dialog> element: focus moves inside, the page behind is
// inert, Esc and the backdrop close it, and focus returns to the opener.
// placement: "drawer" (slides in from the right) | "sheet" (bottom-right chat panel)
// | "center" (centred modal, native <dialog> centring).
export default function Dialog({ open, onClose, labelledBy, placement = "drawer", className = "", children }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      className={`${styles.dialog} ${styles[placement]} ${className}`.trim()}
      onClose={onClose}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      {children}
    </dialog>
  );
}
