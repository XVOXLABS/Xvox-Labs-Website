"use client";

import { useEffect } from "react";
import { openVox } from "@/lib/actions";

// Legacy hashes are handled in the review index. The site's normal links keep their URLs.
export default function ReviewNavigation({ targets, actions, pricingIsLive }) {
  useEffect(() => {
    let frame;

    function followHash(event) {
      window.cancelAnimationFrame(frame);
      const { hash } = window.location;
      const action = actions[hash];

      if (action?.type === "vox") {
        // Give the shared chat time to register its open listener on a direct load.
        frame = window.requestAnimationFrame(openVox);
        return;
      }

      let id = targets[hash] ?? hash.slice(1);
      if (action?.type === "hire") {
        const previousHash = event?.oldURL ? new URL(event.oldURL).hash : "";
        const currentRecord = document.getElementById(targets[previousHash] ?? previousHash.slice(1));
        const buyingSection = currentRecord?.querySelector("[data-hire-section]");
        if (buyingSection) {
          currentRecord.open = true;
          buyingSection.scrollIntoView();
          window.history.replaceState(window.history.state, "", previousHash);
          return;
        }
        if (pricingIsLive) {
          window.location.assign(action.href);
          return;
        }
        id = targets[action.reviewTarget];
      }

      const destination = document.getElementById(id);
      if (destination instanceof HTMLDetailsElement) {
        destination.open = true;
        destination.scrollIntoView();
      }
    }

    followHash();
    window.addEventListener("hashchange", followHash);
    return () => {
      window.removeEventListener("hashchange", followHash);
      window.cancelAnimationFrame(frame);
    };
  }, [targets, actions, pricingIsLive]);

  return null;
}
