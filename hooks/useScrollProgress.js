"use client";

import { useEffect, useRef, useState } from "react";

// Returns [ref, progress]: how far the element has scrolled through the viewport,
// from 0 (its top reaches the top of the viewport) to 1 (its bottom reaches the bottom).
// Used for sticky scroll stages. One requestAnimationFrame per scroll frame.
export default function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const value = travel > 0 ? -rect.top / travel : rect.top <= 0 ? 1 : 0;
      setProgress(Math.min(1, Math.max(0, value)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return [ref, progress];
}
