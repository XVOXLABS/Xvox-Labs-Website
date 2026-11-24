"use client";

import { useId, useRef, useState } from "react";
import styles from "./Tabs.module.css";

// Pill tabs (Framer filter style) with full keyboard support (arrow keys, Home, End).
// items: [{ id, label, content, panelFocusable }]. All panels stay in the HTML; inactive ones are hidden.
// A panel is a tab stop by default; set panelFocusable: false when it already holds focusable controls.
export default function Tabs({ items, label, defaultId, onChange, className = "" }) {
  const baseId = useId();
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  const refs = useRef([]);

  const select = (id, focusIndex) => {
    setActive(id);
    onChange?.(id);
    if (focusIndex !== undefined) refs.current[focusIndex]?.focus();
  };

  const onKeyDown = (e, index) => {
    const last = items.length - 1;
    const next = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(items[next].id, next);
  };

  return (
    <div className={className}>
      <div role="tablist" aria-label={label} className={styles.list}>
        {items.map((item, i) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              ref={(el) => (refs.current[i] = el)}
              role="tab"
              type="button"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              className={styles.tab}
              onClick={() => select(item.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== active}
          className={styles.panel}
          tabIndex={item.panelFocusable === false ? undefined : 0}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
