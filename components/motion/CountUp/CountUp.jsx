"use client";

import { useEffect, useState } from "react";
import useInView from "@/hooks/useInView";
import useReducedMotion from "@/hooks/useReducedMotion";

// Counts from 0 to `value` when visible. The final value is rendered on the server and is
// always available to screen readers; only the visible digits animate.
export default function CountUp({ value, duration = 1200, prefix = "", suffix = "", className = "" }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return undefined;
    let frame = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, duration]);

  // Server and reduced motion: final value. Client with motion: 0 until visible, then counting.
  const display = reduced ? value : inView ? shown : 0;

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value}
        {suffix}
      </span>
    </span>
  );
}
