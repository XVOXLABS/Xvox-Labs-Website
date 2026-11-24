import { prototypeRoutes } from "./reviewRoutes.js";

// Phase 3 views (self-check, build, checkout) built from the extracted prototype page records.
// Server-side only: it imports the review manifest.

const byHash = (hash) => prototypeRoutes.find((entry) => entry.hash === hash);

export const phase3Pages = {
  selfCheck: byHash("#selfcheck"),
  build: byHash("#build"),
  checkout: byHash("#checkout"),
};

export function sectionBlocks(entry, index) {
  return entry.sections.find((section) => section.index === index).blocks;
}
