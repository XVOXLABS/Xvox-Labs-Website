"use client";

import useInView from "@/hooks/useInView";
import useReducedMotion from "@/hooks/useReducedMotion";

// The reference's staggered entrance (.stg): when 15% of the grid is visible, its cards rise into
// place 70ms apart. The cards are always visible; with reduced motion (and on the server) nothing moves.
export default function SolutionStagger({ className, children }) {
  const [ref, inView] = useInView();
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className={className} data-state={reduced ? "static" : inView ? "in" : "out"}>
      {children}
    </div>
  );
}
